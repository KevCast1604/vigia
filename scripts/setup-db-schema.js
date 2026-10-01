const fs = require('fs');
const path = require('path');

// Load credentials from environment or .env.local
let envToken = process.env.SUPABASE_ACCESS_TOKEN;
let envRef = process.env.SUPABASE_PROJECT_REF;

const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      if (match[1] === 'SUPABASE_ACCESS_TOKEN') envToken = match[2].trim();
      if (match[1] === 'SUPABASE_PROJECT_REF') envRef = match[2].trim();
    }
  });
}

const token = envToken || process.env.SUPABASE_ACCESS_TOKEN;
const ref = envRef || process.env.SUPABASE_PROJECT_REF;

const sqlScript = `
-- 1. Tabla de denuncias oficiales policiales
CREATE TABLE IF NOT EXISTS official_incidents (
    id BIGSERIAL PRIMARY KEY,
    anio INT NOT NULL,
    mes INT NOT NULL,
    departamento VARCHAR(100) NOT NULL,
    provincia VARCHAR(100) NOT NULL,
    distrito VARCHAR(100) NOT NULL,
    ubigeo VARCHAR(10) NOT NULL,
    modalidad VARCHAR(100) NOT NULL,
    cantidad INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices de alto rendimiento
CREATE INDEX IF NOT EXISTS idx_official_incidents_ubigeo ON official_incidents(ubigeo);
CREATE INDEX IF NOT EXISTS idx_official_incidents_anio ON official_incidents(anio);
CREATE INDEX IF NOT EXISTS idx_official_incidents_modalidad ON official_incidents(modalidad);
CREATE INDEX IF NOT EXISTS idx_official_incidents_distrito ON official_incidents(distrito);
CREATE INDEX IF NOT EXISTS idx_official_incidents_lookup ON official_incidents(distrito, modalidad, anio);

-- Seguridad RLS
ALTER TABLE official_incidents ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'official_incidents' AND policyname = 'Allow public read access to official_incidents'
    ) THEN
        CREATE POLICY "Allow public read access to official_incidents"
        ON official_incidents FOR SELECT
        TO anon, authenticated
        USING (true);
    END IF;
END $$;

-- 2. Vista agregada para radar distrital de extorsión
CREATE OR REPLACE VIEW district_extorsion_summary AS
SELECT 
    ubigeo,
    distrito,
    SUM(cantidad) AS total_denuncias,
    SUM(CASE WHEN anio = 2024 THEN cantidad ELSE 0 END) AS denuncias_2024,
    SUM(CASE WHEN anio = 2025 THEN cantidad ELSE 0 END) AS denuncias_2025,
    SUM(CASE WHEN anio = 2026 THEN cantidad ELSE 0 END) AS denuncias_2026
FROM official_incidents
WHERE modalidad = 'Extorsión'
GROUP BY ubigeo, distrito;

-- 3. Tabla de reportes ciudadanos anónimos
CREATE TABLE IF NOT EXISTS community_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(50) NOT NULL,
    threat_modality VARCHAR(100),
    economic_demand NUMERIC,
    currency VARCHAR(10) DEFAULT 'PEN',
    district VARCHAR(100) NOT NULL,
    ubigeo VARCHAR(10),
    incident_date TIMESTAMPTZ,
    evidence_count INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'PENDING',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_community_reports_district ON community_reports(district);
CREATE INDEX IF NOT EXISTS idx_community_reports_status ON community_reports(status);

ALTER TABLE community_reports ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'community_reports' AND policyname = 'Allow anonymous report submission'
    ) THEN
        CREATE POLICY "Allow anonymous report submission"
        ON community_reports FOR INSERT
        TO anon, authenticated
        WITH CHECK (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'community_reports' AND policyname = 'Allow public read of validated community reports'
    ) THEN
        CREATE POLICY "Allow public read of validated community reports"
        ON community_reports FOR SELECT
        TO anon, authenticated
        USING (status IN ('VALIDATED', 'PENDING'));
    END IF;
END $$;

-- 4. Tabla de identificadores extorsivos con HMAC-SHA256
CREATE TABLE IF NOT EXISTS verified_extortion_identifiers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hash_identifier VARCHAR(64) NOT NULL UNIQUE,
    identifier_type VARCHAR(20) NOT NULL,
    alias_coerced VARCHAR(100),
    incident_count INT DEFAULT 1,
    first_reported_at TIMESTAMPTZ DEFAULT NOW(),
    last_reported_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_verified_identifiers_hash ON verified_extortion_identifiers(hash_identifier);

ALTER TABLE verified_extortion_identifiers ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'verified_extortion_identifiers' AND policyname = 'Allow public lookup of hashed identifiers'
    ) THEN
        CREATE POLICY "Allow public lookup of hashed identifiers"
        ON verified_extortion_identifiers FOR SELECT
        TO anon, authenticated
        USING (true);
    END IF;
END $$;
`;

async function run() {
  console.log('Deploying schema to Supabase project:', ref);
  const response = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: sqlScript })
  });

  const resText = await response.text();
  console.log('Response status:', response.status);
  console.log('Response body:', resText);
}

run().catch(console.error);
