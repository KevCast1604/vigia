const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { createClient } = require('@supabase/supabase-js');

// Load env variables if not in process.env
const envFile = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
    env[match[1]] = value.trim();
  }
});

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Error: Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false }
});

const csvPath = path.join(__dirname, '..', 'docs', 'DATASET_Denuncias_Policiales_Ene 2018 a Julio 2026.csv');

// District metadata for all 43 districts: coordinates, friendly title, and representative critical sectors
const DISTRICT_METADATA = {
  '150101': { key: 'lima', name: 'Lima Cercado', sector: 'Mesa Redonda / Mercado Central / Av. Abancay', coords: [-12.0464, -77.0428] },
  '150102': { key: 'ancon', name: 'Ancón', sector: 'Bahía de Ancón / San Francisco / Variante', coords: [-11.7731, -77.1764] },
  '150103': { key: 'ate', name: 'Ate Vitarte', sector: 'Huaycán / Carretera Central / Ceres', coords: [-12.0253, -76.9174] },
  '150104': { key: 'barranco', name: 'Barranco', sector: 'Plaza de Armas / Malecón Paul Harris / El Sol', coords: [-12.1489, -77.0208] },
  '150105': { key: 'brena', name: 'Breña', sector: 'Av. Brasil / Av. Arica / Chacra Colorada', coords: [-12.0592, -77.0514] },
  '150106': { key: 'carabayllo', name: 'Carabayllo', sector: 'Tungasuca / El Progreso / San Pedro', coords: [-11.9022, -77.0347] },
  '150107': { key: 'chaclacayo', name: 'Chaclacayo', sector: 'Ñaña / Morón / Carretera Central', coords: [-11.9739, -76.7686] },
  '150108': { key: 'chorrillos', name: 'Chorrillos', sector: 'Huertos de Villa / Matellini / Túpac Amaru', coords: [-12.1819, -77.0189] },
  '150109': { key: 'cieneguilla', name: 'Cieneguilla', sector: 'Valle de Lurín / Tambo Viejo / Campiña', coords: [-12.0911, -76.7686] },
  '150110': { key: 'comas', name: 'Comas', sector: 'Av. Túpac Amaru / Universitaria / Collique', coords: [-11.9328, -77.0543] },
  '150111': { key: 'el-agustino', name: 'El Agustino', sector: 'Riva Agüero / Cerro San Pedro / El Ángel', coords: [-12.0489, -77.0003] },
  '150112': { key: 'independencia', name: 'Independencia', sector: 'Tahuantinsuyo / Túpac Amaru / MegaPlaza', coords: [-11.9931, -77.0544] },
  '150113': { key: 'jesus-maria', name: 'Jesús María', sector: 'Av. Salaverry / San Felipe / Real Plaza', coords: [-12.0747, -77.0486] },
  '150114': { key: 'la-molina', name: 'La Molina', sector: 'Raúl Ferrero / Javier Prado Este / La Planicie', coords: [-12.0769, -76.9428] },
  '150115': { key: 'la-victoria', name: 'La Victoria', sector: 'Emporio Comercial Gamarra / 28 de Julio / Manzanilla', coords: [-12.0664, -77.0178] },
  '150116': { key: 'lince', name: 'Lince', sector: 'Av. Arenales / Risso / Mariscal Miller', coords: [-12.0833, -77.0353] },
  '150117': { key: 'los-olivos', name: 'Los Olivos', sector: 'Antúnez de Mayolo / Izaguirre / Pro / Huandoy', coords: [-11.9686, -77.0722] },
  '150118': { key: 'lurigancho', name: 'Lurigancho - Chosica', sector: 'Chosica Central / Carretera Central / Moyopampa', coords: [-11.9367, -76.7028] },
  '150119': { key: 'lurin', name: 'Lurín', sector: 'Antigua Panamericana Sur / Mamacona / Km 40', coords: [-12.2744, -76.8711] },
  '150120': { key: 'magdalena', name: 'Magdalena del Mar', sector: 'Plaza Túpac Amaru / Sucre / Javier Prado Oeste', coords: [-12.0917, -77.0717] },
  '150121': { key: 'pueblo-libre', name: 'Pueblo Libre', sector: 'Plaza Bolívar / Av. Sucre / La Marina', coords: [-12.0736, -77.0658] },
  '150122': { key: 'miraflores', name: 'Miraflores', sector: 'Óvalo de Miraflores / Larcomar / Av. Benavides', coords: [-12.1217, -77.0297] },
  '150123': { key: 'pachacamac', name: 'Pachacámac', sector: 'Valle de Pachacámac / Paul Poblet / Manchay', coords: [-12.2294, -76.8622] },
  '150124': { key: 'pucusana', name: 'Pucusana', sector: 'Puerto Pucusana / Gruta del Pescador / Boquerón', coords: [-12.4822, -76.7978] },
  '150125': { key: 'puente-piedra', name: 'Puente Piedra', sector: 'Óvalo de Puente Piedra / Zapallal / Panamericana Norte', coords: [-11.8661, -77.0772] },
  '150126': { key: 'punta-hermosa', name: 'Punta Hermosa', sector: 'El Silencio / Señoritas / Balneario', coords: [-12.3361, -76.8258] },
  '150127': { key: 'punta-negra', name: 'Punta Negra', sector: 'La Pocita / Guaneras / Balneario', coords: [-12.3667, -76.8000] },
  '150128': { key: 'rimac', name: 'Rímac', sector: 'Jr. Trujillo / Caquetá / Prolongación Tacna / Piedra Liza', coords: [-12.0322, -77.0306] },
  '150129': { key: 'san-bartolo', name: 'San Bartolo', sector: 'San José / Malecón Sur / Av. San Martín', coords: [-12.3889, -76.7778] },
  '150130': { key: 'san-borja', name: 'San Borja', sector: 'Av. Aviación / San Borja Sur / Javier Prado', coords: [-12.0864, -77.0003] },
  '150131': { key: 'san-isidro', name: 'San Isidro', sector: 'Centro Financiero / Canaval y Moreyra / El Olivar', coords: [-12.0975, -77.0361] },
  '150132': { key: 'sjl', name: 'San Juan de Lurigancho', sector: 'Canto Grande / Bayóvar / Huáscar / Zárate / Las Flores', coords: [-11.9754, -76.9981] },
  '150133': { key: 'sjm', name: 'San Juan de Miraflores', sector: 'Ciudad de Dios / Pista Nueva / Av. San Juan', coords: [-12.1611, -76.9739] },
  '150134': { key: 'san-luis', name: 'San Luis', sector: 'Av. San Luis / Circunvalación / Yerbateros', coords: [-12.0758, -76.9972] },
  '150135': { key: 'smp', name: 'San Martín de Porres', sector: 'Fiori / Av. Habich / Zarumilla / Av. Perú', coords: [-11.9961, -77.0851] },
  '150136': { key: 'san-miguel', name: 'San Miguel', sector: 'Plaza San Miguel / Av. La Marina / Elmer Faucett', coords: [-12.0767, -77.0931] },
  '150137': { key: 'santa-anita', name: 'Santa Anita', sector: 'Mercado Mayorista / Los Ruiseñores / Huarochirí', coords: [-12.0469, -76.9714] },
  '150138': { key: 'santa-maria-del-mar', name: 'Santa María del Mar', sector: 'Balneario Santa María / Playa Grande', coords: [-12.4042, -76.7725] },
  '150139': { key: 'santa-rosa', name: 'Santa Rosa', sector: 'Playa Chica / Autopista Panamericana Norte Km 43', coords: [-11.8028, -77.1653] },
  '150140': { key: 'surco', name: 'Santiago de Surco', sector: 'Monterrico / La Bolichera / Chacarilla / Benavides', coords: [-12.1408, -76.9922] },
  '150141': { key: 'surquillo', name: 'Surquillo', sector: 'Av. Angamos / Tomás Marsano / Mercado N° 1', coords: [-12.1122, -77.0189] },
  '150142': { key: 'ves', name: 'Villa El Salvador', sector: 'Parque Industrial / Av. Central / Pastor Sevilla / Álamos', coords: [-12.2104, -76.9383] },
  '150143': { key: 'vmt', name: 'Villa María del Triunfo', sector: 'Curva de Nueva Esperanza / José Carlos Mariátegui / Tablada', coords: [-12.1583, -76.9381] },
};

async function main() {
  console.log('--- VIGIA ETL: Ingesting Official Police Dataset into Supabase ---');
  console.log('Source CSV:', csvPath);

  const fileStream = fs.createReadStream(csvPath, { encoding: 'utf8' });
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  const rowsToInsert = [];
  const districtStats = {};

  // Initialize stats for 43 districts
  Object.entries(DISTRICT_METADATA).forEach(([ubigeo, meta]) => {
    districtStats[ubigeo] = {
      ubigeo,
      key: meta.key,
      name: meta.name,
      sectorName: meta.sector,
      coordinates: meta.coords,
      officialComplaints: 0,
      yearlyTrendMap: {},
      crimesSummary: {}
    };
  });

  let lineCount = 0;
  let limaCount = 0;

  for await (const line of rl) {
    lineCount++;
    if (lineCount === 1) continue; // Skip header

    if (!line.startsWith('"20')) continue;
    const parts = line.split(',').map(s => s.replace(/^"|"$/g, ''));
    if (parts.length < 8) continue;

    const [anioStr, mesStr, dpto, prov, dist, ubigeo, mod, cantStr] = parts;

    // Filter strictly for Lima Metropolitana
    if (dpto === 'LIMA METROPOLITANA' || (ubigeo && ubigeo.startsWith('1501'))) {
      limaCount++;
      const anio = parseInt(anioStr, 10);
      const mes = parseInt(mesStr, 10);
      const cantidad = parseInt(cantStr, 10) || 0;
      const modalidad = mod.trim();
      const ubg = ubigeo.trim();

      rowsToInsert.push({
        anio,
        mes,
        departamento: dpto.trim(),
        provincia: prov.trim(),
        distrito: dist.trim(),
        ubigeo: ubg,
        modalidad,
        cantidad
      });

      // Update in-memory aggregate stats
      if (districtStats[ubg]) {
        districtStats[ubg].crimesSummary[modalidad] = (districtStats[ubg].crimesSummary[modalidad] || 0) + cantidad;
        if (modalidad.toLowerCase().includes('extor')) {
          districtStats[ubg].officialComplaints += cantidad;
          districtStats[ubg].yearlyTrendMap[anio] = (districtStats[ubg].yearlyTrendMap[anio] || 0) + cantidad;
        }
      }
    }
  }

  console.log(`Processed ${lineCount} total lines from CSV.`);
  console.log(`Filtered ${limaCount} records for Lima Metropolitana.`);

  const force = process.argv.includes('--force');
  const { count: currentCount } = await supabase.from('official_incidents').select('*', { count: 'exact', head: true });
  
  if (currentCount && currentCount >= limaCount && !force) {
    console.log(`Supabase already contains ${currentCount} records. Skipping re-insertion (use --force to overwrite).`);
  } else {
    // 1. Clear existing records in Supabase "official_incidents"
    console.log('Clearing existing records in Supabase "official_incidents"...');
    const { error: delError } = await supabase.from('official_incidents').delete().neq('id', 0);
    if (delError) {
      console.warn('Warning when deleting existing rows:', delError.message);
    }

    // 2. Batch insert into Supabase
    const BATCH_SIZE = 1000;
    const totalBatches = Math.ceil(rowsToInsert.length / BATCH_SIZE);
    console.log(`Inserting ${rowsToInsert.length} records in ${totalBatches} batches of ${BATCH_SIZE}...`);

    for (let i = 0; i < totalBatches; i++) {
      const chunk = rowsToInsert.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);
      const { error: insError } = await supabase.from('official_incidents').insert(chunk);
      if (insError) {
        console.error(`Error inserting batch ${i + 1}:`, insError.message);
        throw insError;
      }
      const percent = (((i + 1) / totalBatches) * 100).toFixed(1);
      process.stdout.write(`\rInserted batch ${i + 1}/${totalBatches} (${percent}%)`);
    }
    console.log('\nAll batches inserted into Supabase successfully!');
  }

  // Verify count from Supabase
  const { count, error: countErr } = await supabase
    .from('official_incidents')
    .select('*', { count: 'exact', head: true });
  console.log('Verified Supabase total row count:', count);

  // 3. Generate structured dataset for client and server
  const formattedDistricts = {};
  const districtList = [];

  Object.values(districtStats).forEach(stat => {
    // Build yearly trend array
    const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
    const yearlyTrend = years.map(y => ({
      year: y,
      count: stat.yearlyTrendMap[y] || 0
    }));

    // Calculate risk level based on official complaints
    let riskLevel = 'moderate';
    if (stat.officialComplaints > 2000) riskLevel = 'very-high';
    else if (stat.officialComplaints > 1000) riskLevel = 'high';
    else if (stat.officialComplaints > 500) riskLevel = 'medium';

    // Baseline comunitario honesto: inicia en 0 hasta que los comerciantes reporten
    const communityPatterns = 0;

    const item = {
      key: stat.key,
      name: stat.name,
      ubigeo: stat.ubigeo,
      officialComplaints: stat.officialComplaints,
      communityPatterns,
      sectorName: stat.sectorName,
      coordinates: stat.coordinates,
      riskLevel,
      yearlyTrend,
      crimesSummary: stat.crimesSummary
    };

    formattedDistricts[stat.key] = item;
    districtList.push(item);
  });

  // Sort district list by official complaints descending
  districtList.sort((a, b) => b.officialComplaints - a.officialComplaints);

  // Calculate Lima Metropolitana consolidated yearly trend
  const metroYearlyTrend = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026].map(y => {
    const totalForYear = districtList.reduce((acc, d) => {
      const match = d.yearlyTrend.find(item => item.year === y);
      return acc + (match ? match.count : 0);
    }, 0);
    return { year: y, count: totalForYear };
  });

  const totalMetroComplaints = districtList.reduce((acc, d) => acc + d.officialComplaints, 0);

  const metroStats = {
    key: 'lima-metro',
    name: 'Lima Metropolitana',
    ubigeo: '150100',
    officialComplaints: totalMetroComplaints,
    communityPatterns: 0,
    sectorName: 'Todos los 43 distritos monitoreados (Consolidado Oficial)',
    coordinates: [-12.0464, -77.03],
    riskLevel: 'very-high',
    yearlyTrend: metroYearlyTrend
  };

  // Write JSON artifact to data/
  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const jsonOutPath = path.join(dataDir, 'lima-official-stats.json');
  fs.writeFileSync(jsonOutPath, JSON.stringify({
    generatedAt: new Date().toISOString(),
    totalDistricts: districtList.length,
    metroStats,
    districts: formattedDistricts,
    rankedList: districtList
  }, null, 2), 'utf8');
  console.log('Saved compiled dataset to:', jsonOutPath);

  console.log('ETL completed successfully!');
}

main().catch(err => {
  console.error('ETL script failed:', err);
  process.exit(1);
});
