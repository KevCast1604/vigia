import { DistrictKey, DistrictStats } from './types';
import statsJson from '@/data/lima-official-stats.json';

// Consolidado oficial de Lima Metropolitana y Callao
export const METRO_STATS: DistrictStats = statsJson.metroStats as unknown as DistrictStats;

// Todos los 50 distritos de Lima Metropolitana y Callao con datos reales del dataset policial PNP
export const LIMA_DISTRICTS: Record<DistrictKey, DistrictStats> = statsJson.districts as unknown as Record<DistrictKey, DistrictStats>;

// Lista ordenada por volumen de denuncias oficiales de extorsión descendente
export const DISTRICTS_RANKED: DistrictStats[] = statsJson.rankedList as unknown as DistrictStats[];

/**
 * Obtener estadísticas de un distrito por clave o ubigeo
 */
export function getDistrict(keyOrUbigeo: string): DistrictStats | undefined {
  if (LIMA_DISTRICTS[keyOrUbigeo]) {
    return LIMA_DISTRICTS[keyOrUbigeo];
  }
  return DISTRICTS_RANKED.find(d => d.ubigeo === keyOrUbigeo || d.key === keyOrUbigeo);
}

/**
 * Búsqueda predictiva de distritos por nombre, sector o ubigeo
 */
export function searchDistricts(term: string): DistrictStats[] {
  const q = term.toLowerCase().trim();
  if (!q) return DISTRICTS_RANKED;
  return DISTRICTS_RANKED.filter(
    d => d.name.toLowerCase().includes(q) ||
         d.sectorName.toLowerCase().includes(q) ||
         d.ubigeo.includes(q)
  );
}
