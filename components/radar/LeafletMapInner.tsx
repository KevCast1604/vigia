'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { DistrictKey, DistrictStats } from '@/lib/types';
import { LIMA_DISTRICTS } from '@/lib/districts-data';

interface LeafletMapInnerProps {
  selectedDistrict: DistrictKey;
  onDistrictSelect: (district: DistrictKey) => void;
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

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Crear instancia de Leaflet centrada en Lima Metropolitana
    const map = L.map(mapContainerRef.current, {
      center: [-12.0464, -77.03],
      zoom: 11.5,
      zoomControl: false,
      attributionControl: false
    });

    // Control de zoom en la esquina inferior derecha
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Tiles CartoDB Positron (Claro, de alto contraste y limpio)
    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      {
        maxZoom: 18,
        subdomains: 'abcd'
      }
    ).addTo(map);

    mapInstanceRef.current = map;

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
        `<strong>${dist.name}</strong><br/><span style="font-size: 10px; color: #475569;">${dist.officialComplaints} denuncias oficiales</span>`,
        { direction: 'top', offset: [0, -10], opacity: 0.95 }
      );

      marker.on('click', () => {
        onDistrictSelect(dist.key);
      });

      markersRef.current[dist.key] = marker;
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [onDistrictSelect]);

  // Sincronizar foco y animación cuando cambia el distrito seleccionado
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const target = LIMA_DISTRICTS[selectedDistrict];
    if (target) {
      mapInstanceRef.current.flyTo(target.coordinates, 13, {
        animate: true,
        duration: 0.8
      });

      // Resaltar marcador seleccionado
      Object.entries(markersRef.current).forEach(([key, marker]) => {
        if (key === selectedDistrict) {
          marker.setRadius(16);
          marker.setStyle({ weight: 4 });
        } else {
          marker.setRadius(12);
          marker.setStyle({ weight: 2 });
        }
      });
    }
  }, [selectedDistrict]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
};
