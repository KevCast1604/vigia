'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { DistrictKey, DistrictStats } from '@/lib/types';
import { LIMA_DISTRICTS } from '@/lib/districts-data';

interface LeafletMapInnerProps {
  selectedDistrict: DistrictKey | null;
  onDistrictSelect: (district: DistrictKey | null) => void;
}

const RISK_COLORS: Record<DistrictStats['riskLevel'], { border: string; fill: string }> = {
  'very-high': { border: '#dc2626', fill: '#ef4444' },
  high: { border: '#ea580c', fill: '#f97316' },
  medium: { border: '#ca8a04', fill: '#eab308' },
  moderate: { border: '#2563eb', fill: '#3b82f6' }
};

export const LeafletMapInner: React.FC<LeafletMapInnerProps> = ({
  selectedDistrict,
  onDistrictSelect
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.CircleMarker>>({});
  const beaconMarkerRef = useRef<L.Marker | null>(null);
  const isFirstRunRef = useRef<boolean>(true);
  const selectedDistrictRef = useRef<DistrictKey | null>(selectedDistrict);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Límites geográficos holgados para Perú y alrededores inmediatos
    const southWest = L.latLng(-22.0, -86.0);
    const northEast = L.latLng(3.5, -65.0);
    const peruBounds = L.latLngBounds(southWest, northEast);

    // Coordenadas iniciales del distrito seleccionado o centro de Lima
    const initialCoords: [number, number] = selectedDistrict && LIMA_DISTRICTS[selectedDistrict]
      ? LIMA_DISTRICTS[selectedDistrict].coordinates
      : [-12.0464, -77.03];
    const initialZoom = selectedDistrict ? 12.5 : 11.5;

    // Crear instancia de Leaflet centrada directamente con paneo suave
    const map = L.map(mapContainerRef.current, {
      center: initialCoords,
      zoom: initialZoom,
      minZoom: 5,
      maxZoom: 18,
      maxBounds: peruBounds,
      maxBoundsViscosity: 0.3, // Viscosidad suave para eliminar el temblor o vibración al arrastrar
      bounceAtZoomLimits: false,
      zoomControl: false,
      attributionControl: false
    });

    // Control de zoom en la esquina inferior derecha
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Capa de tiles oficial de OpenStreetMap (100% libre, sin requerir API key)
    L.tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }
    ).addTo(map);

    mapInstanceRef.current = map;

    // Observar cambios de tamaño del contenedor para recalcular el mapa al colapsar/expandir el sidebar
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(mapContainerRef.current);

    // Agregar círculos de calor y marcadores para cada distrito
    Object.values(LIMA_DISTRICTS).forEach((dist) => {
      const colors = RISK_COLORS[dist.riskLevel];

      // Círculo de calor zonal (área agregada difusa)
      L.circle(dist.coordinates, {
        radius: 1800,
        color: 'transparent',
        fillColor: colors.fill,
        fillOpacity: 0.15,
        interactive: false
      }).addTo(map);

      // Marcador interactivo
      const marker = L.circleMarker(dist.coordinates, {
        radius: 12,
        color: colors.border,
        weight: 2,
        fillColor: colors.fill,
        fillOpacity: 0.85
      }).addTo(map);

      // Tooltip informativo
      marker.bindTooltip(
        `<strong>${dist.name}</strong><br/><span style="font-size: 10px; color: #475569;">${dist.officialComplaints.toLocaleString()} denuncias oficiales (PNP)</span>`,
        { direction: 'top', offset: [0, -10], opacity: 0.95 }
      );

      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        if (selectedDistrictRef.current === dist.key) {
          onDistrictSelect(null); // Al volver a pulsar el seleccionado, se deselecciona!
        } else {
          onDistrictSelect(dist.key);
        }
      });

      markersRef.current[dist.key] = marker;
    });

    // Clic en cualquier área libre del mapa para deseleccionar el distrito
    map.on('click', () => {
      onDistrictSelect(null);
    });

    return () => {
      resizeObserver.disconnect();
      if (beaconMarkerRef.current) {
        beaconMarkerRef.current.remove();
        beaconMarkerRef.current = null;
      }
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [onDistrictSelect]);

  // Sincronizar foco y redirección suave cuando cambia el distrito seleccionado
  useEffect(() => {
    selectedDistrictRef.current = selectedDistrict;
    if (!mapInstanceRef.current) return;

    if (!selectedDistrict) {
      // Deseleccionar: remover baliza radar y restaurar marcadores base
      if (beaconMarkerRef.current) {
        beaconMarkerRef.current.remove();
        beaconMarkerRef.current = null;
      }

      Object.entries(markersRef.current).forEach(([key, marker]) => {
        const d = LIMA_DISTRICTS[key as DistrictKey];
        const colors = RISK_COLORS[d.riskLevel];
        marker.setRadius(12);
        marker.setStyle({
          weight: 2,
          color: colors.border,
          fillColor: colors.fill,
          opacity: 1,
          fillOpacity: 0.85
        });
      });

      // Redirigir la cámara suavemente a la vista general de Lima Metropolitana
      if (!isFirstRunRef.current) {
        mapInstanceRef.current.setView([-12.0464, -77.03], 11.5, {
          animate: true
        });
      } else {
        isFirstRunRef.current = false;
      }
      return;
    }

    const target = LIMA_DISTRICTS[selectedDistrict];
    if (target) {
      if (isFirstRunRef.current) {
        isFirstRunRef.current = false;
      } else {
        const currentZoom = mapInstanceRef.current.getZoom();
        if (currentZoom < 12) {
          // Si el mapa estaba muy alejado, acercar con transición suave
          mapInstanceRef.current.setView(target.coordinates, 12.5, {
            animate: true
          });
        } else {
          // Redirigir la vista con un paneo continuo y fluido (sin saltos bruscos ni teletransportación)
          mapInstanceRef.current.panTo(target.coordinates, {
            animate: true,
            duration: 1.25,
            easeLinearity: 0.25
          });
        }
      }

      // Actualizar estilo de los marcadores base
      Object.entries(markersRef.current).forEach(([key, marker]) => {
        const d = LIMA_DISTRICTS[key as DistrictKey];
        const colors = RISK_COLORS[d.riskLevel];
        if (key === selectedDistrict) {
          marker.setStyle({
            opacity: 0,
            fillOpacity: 0
          });
        } else {
          marker.setRadius(12);
          marker.setStyle({
            weight: 2,
            color: colors.border,
            fillColor: colors.fill,
            opacity: 1,
            fillOpacity: 0.85
          });
        }
      });

      // Remover baliza anterior si existe
      if (beaconMarkerRef.current) {
        beaconMarkerRef.current.remove();
        beaconMarkerRef.current = null;
      }

      // Crear baliza radar animada de alta visibilidad para el distrito seleccionado
      const colors = RISK_COLORS[target.riskLevel];
      const beaconIcon = L.divIcon({
        className: 'vigia-selection-beacon',
        iconSize: [0, 0],
        iconAnchor: [0, 0],
        html: `
          <div style="position: relative; display: flex; align-items: center; justify-content: center; pointer-events: none;">
            <!-- Onda sonar animada primaria -->
            <div class="vigia-beacon-pulse" style="position: absolute; width: 68px; height: 68px; border-radius: 9999px; background: rgba(37, 99, 235, 0.22); border: 2.5px solid rgba(37, 99, 235, 0.85);"></div>
            <!-- Onda sonar animada secundaria -->
            <div class="vigia-beacon-pulse-delayed" style="position: absolute; width: 96px; height: 96px; border-radius: 9999px; background: rgba(59, 130, 246, 0.12); border: 1.5px dashed rgba(59, 130, 246, 0.55);"></div>

            <!-- Baliza central con borde de alto contraste -->
            <div style="position: absolute; width: 36px; height: 36px; border-radius: 9999px; background: #ffffff; border: 3.5px solid #1e40af; box-shadow: 0 0 20px rgba(37, 99, 235, 0.6), 0 4px 10px rgba(0,0,0,0.3); transform: translate(-50%, -50%); display: flex; align-items: center; justify-content: center; z-index: 50;">
              <div style="width: 16px; height: 16px; border-radius: 9999px; background-color: ${colors.fill}; border: 2.5px solid #ffffff; box-shadow: 0 0 6px rgba(0,0,0,0.25);"></div>
            </div>

            <!-- Etiqueta flotante superior de distrito activo -->
            <div style="position: absolute; bottom: 26px; left: 50%; transform: translateX(-50%); white-space: nowrap; background: #0f172a; color: #ffffff; padding: 5px 12px; border-radius: 10px; border: 1.5px solid rgba(255, 255, 255, 0.35); box-shadow: 0 8px 20px rgba(0,0,0,0.35); z-index: 60; display: flex; align-items: center; gap: 7px;">
              <span style="display: inline-block; width: 8px; height: 8px; border-radius: 9999px; background: #38bdf8; box-shadow: 0 0 8px #38bdf8;"></span>
              <span style="font-size: 12px; font-weight: 800; letter-spacing: -0.01em;">${target.name}</span>
              <span style="font-size: 9px; font-weight: 800; color: #93c5fd; background: rgba(37, 99, 235, 0.35); border: 1px solid rgba(147, 197, 253, 0.3); padding: 1.5px 6px; border-radius: 5px; text-transform: uppercase;">Activo</span>
            </div>
          </div>
        `
      });

      const beacon = L.marker(target.coordinates, {
        icon: beaconIcon,
        zIndexOffset: 1500,
        interactive: false
      }).addTo(mapInstanceRef.current);

      beaconMarkerRef.current = beacon;
    }
  }, [selectedDistrict]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
};
