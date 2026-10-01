import { DistrictKey, DistrictStats } from './types';

export const LIMA_DISTRICTS: Record<DistrictKey, DistrictStats> = {
  sjl: {
    key: 'sjl',
    name: 'San Juan de Lurigancho',
    ubigeo: '150132',
    officialComplaints: 1482,
    communityPatterns: 14,
    sectorName: 'Canto Grande / Huáscar',
    coordinates: [-11.9754, -76.9981],
    riskLevel: 'very-high',
    yearlyTrend: [
      { year: 2020, count: 380 },
      { year: 2022, count: 670 },
      { year: 2024, count: 1140 },
      { year: 2026, count: 1482 }
    ]
  },
  smp: {
    key: 'smp',
    name: 'San Martín de Porres',
    ubigeo: '150135',
    officialComplaints: 1120,
    communityPatterns: 9,
    sectorName: 'Fiori / Habich / Zarumilla',
    coordinates: [-11.9961, -77.0851],
    riskLevel: 'high',
    yearlyTrend: [
      { year: 2020, count: 290 },
      { year: 2022, count: 520 },
      { year: 2024, count: 880 },
      { year: 2026, count: 1120 }
    ]
  },
  comas: {
    key: 'comas',
    name: 'Comas',
    ubigeo: '150110',
    officialComplaints: 984,
    communityPatterns: 8,
    sectorName: 'Av. Túpac Amaru / Universitaria',
    coordinates: [-11.9328, -77.0543],
    riskLevel: 'high',
    yearlyTrend: [
      { year: 2020, count: 240 },
      { year: 2022, count: 460 },
      { year: 2024, count: 790 },
      { year: 2026, count: 984 }
    ]
  },
  ate: {
    key: 'ate',
    name: 'Ate Vitarte',
    ubigeo: '150103',
    officialComplaints: 765,
    communityPatterns: 6,
    sectorName: 'Huaycán / Carretera Central',
    coordinates: [-12.0253, -76.9174],
    riskLevel: 'medium',
    yearlyTrend: [
      { year: 2020, count: 180 },
      { year: 2022, count: 340 },
      { year: 2024, count: 580 },
      { year: 2026, count: 765 }
    ]
  },
  lima: {
    key: 'lima',
    name: 'Lima Cercado',
    ubigeo: '150101',
    officialComplaints: 1240,
    communityPatterns: 11,
    sectorName: 'Mesa Redonda / Mercado Central / Abancay',
    coordinates: [-12.0464, -77.0428],
    riskLevel: 'very-high',
    yearlyTrend: [
      { year: 2020, count: 310 },
      { year: 2022, count: 590 },
      { year: 2024, count: 970 },
      { year: 2026, count: 1240 }
    ]
  },
  ves: {
    key: 'ves',
    name: 'Villa El Salvador',
    ubigeo: '150142',
    officialComplaints: 590,
    communityPatterns: 5,
    sectorName: 'Parque Industrial / Av. Central',
    coordinates: [-12.2104, -76.9383],
    riskLevel: 'moderate',
    yearlyTrend: [
      { year: 2020, count: 130 },
      { year: 2022, count: 250 },
      { year: 2024, count: 440 },
      { year: 2026, count: 590 }
    ]
  },
  'los-olivos': {
    key: 'los-olivos',
    name: 'Los Olivos',
    ubigeo: '150117',
    officialComplaints: 840,
    communityPatterns: 7,
    sectorName: 'Av. Antúnez de Mayolo / Pro',
    coordinates: [-11.9686, -77.0722],
    riskLevel: 'high',
    yearlyTrend: [
      { year: 2020, count: 210 },
      { year: 2022, count: 390 },
      { year: 2024, count: 670 },
      { year: 2026, count: 840 }
    ]
  },
  chorrillos: {
    key: 'chorrillos',
    name: 'Chorrillos',
    ubigeo: '150108',
    officialComplaints: 520,
    communityPatterns: 4,
    sectorName: 'Tupac Amaru / Huertos de Villa',
    coordinates: [-12.1819, -77.0189],
    riskLevel: 'moderate',
    yearlyTrend: [
      { year: 2020, count: 110 },
      { year: 2022, count: 220 },
      { year: 2024, count: 390 },
      { year: 2026, count: 520 }
    ]
  }
};
