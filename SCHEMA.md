# 🗄️ SCHEMA DE BASE DE DATOS v8.0

**Sistema:** Agente de Viajes Soffer  
**Base de Datos:** Supabase (PostgreSQL 15)  
**Última actualización:** 10 Marzo 2026

---

## 📋 Índice

1. [Resumen General](#resumen-general)
2. [Tablas Principales](#tablas-principales)
3. [Enums](#enums)
4. [Foreign Keys](#foreign-keys)
5. [Índices](#índices)
6. [Queries Útiles](#queries-útiles)

---

## 📊 Resumen General

### Estadísticas

- **Tablas principales:** 5
- **Enums:** 6 tipos
- **Foreign keys:** 4
- **Índices:** 8
- **Registros cargados:** 73 (datos de prueba)

### Tablas

| Tabla            | Descripción                          | Registros |
|------------------|--------------------------------------|-----------|
| `trips`          | Viajes principales                   | 2         |
| `triprequests`   | Solicitudes de viaje                 | 1         |
| `travelers`      | Datos de viajeros                    | 5         |
| `reservations`   | Reservas (vuelos, hoteles, etc.)     | 60        |
| `trip_travelers` | Relación viajes-viajeros (many-to-many) | 5      |

---

## 📁 TABLAS PRINCIPALES

### 1. `trips` - Viajes Principales

Almacena los viajes aprobados y en ejecución.

#### Columnas

| Columna       | Tipo         | Constraints           | Descripción                              |
|---------------|--------------|-----------------------|------------------------------------------|
| `tripid`      | `UUID`       | `PRIMARY KEY`         | Identificador único del viaje            |
| `tripname`    | `TEXT`       | `NOT NULL`            | Nombre del viaje                         |
| `slug`        | `TEXT`       | `UNIQUE`, `NOT NULL`  | URL-friendly identifier                  |
| `destination` | `TEXT`       | `NOT NULL`            | Destino principal                        |
| `datestart`   | `DATE`       | `NOT NULL`            | Fecha de inicio                          |
| `dateend`     | `DATE`       | `NOT NULL`            | Fecha de fin                             |
| `triptype`    | `ENUM`       | `NOT NULL`            | Tipo de viaje (ver enum `triptype`)      |
| `tripstatus`  | `ENUM`       | `NOT NULL`            | Estado del viaje (ver enum `tripstatus`) |
| `totalcost`   | `NUMERIC`    | `DEFAULT 0`           | Costo total en MXN                       |
| `createdat`   | `TIMESTAMPTZ`| `DEFAULT NOW()`       | Fecha de creación                        |
| `updatedat`   | `TIMESTAMPTZ`| `DEFAULT NOW()`       | Última actualización                     |

#### Ejemplo de registro

```sql
INSERT INTO trips (
  tripid, tripname, slug, destination, datestart, dateend, 
  triptype, tripstatus, totalcost
) VALUES (
  '550e8400-e29b-41d4-a716-446655440001',
  'Cuatro Ciénegas 2026',
  'cuatro-cienegas',
  'Cuatro Ciénegas, Coahuila',
  '2026-04-08',
  '2026-04-11',
  'Familiar',
  'reservado',
  145063.00
);
```

---

### 2. `triprequests` - Solicitudes de Viaje

Almacena las solicitudes de viaje antes de ser aprobadas.

#### Columnas

| Columna       | Tipo         | Constraints           | Descripción                              |
|---------------|--------------|-----------------------|------------------------------------------|
| `requestid`   | `UUID`       | `PRIMARY KEY`         | Identificador único de solicitud         |
| `tripid`      | `UUID`       | `FOREIGN KEY`         | Referencia a `trips.tripid` (nullable)   |
| `destinations`| `TEXT[]`     | `NOT NULL`            | Array de destinos                        |
| `datestart`   | `DATE`       | `NOT NULL`            | Fecha de inicio propuesta                |
| `dateend`     | `DATE`       | `NOT NULL`            | Fecha de fin propuesta                   |
| `triptype`    | `ENUM`       | `NOT NULL`            | Tipo de viaje (ver enum `triptype`)      |
| `budget`      | `NUMERIC`    |                       | Presupuesto estimado                     |
| `travelers`   | `INTEGER`    |                       | Número de viajeros                       |
| `preferences` | `TEXT`       |                       | Preferencias y notas                     |
| `status`      | `TEXT`       | `DEFAULT 'pending'`   | Estado: `pending`, `approved`, `rejected`|
| `createdat`   | `TIMESTAMPTZ`| `DEFAULT NOW()`       | Fecha de solicitud                       |

#### Ejemplo de registro

```sql
INSERT INTO triprequests (
  requestid, destinations, datestart, dateend, triptype, 
  budget, travelers, preferences, status
) VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '{París,Roma}',
  '2026-06-01',
  '2026-06-10',
  'Familiar',
  80000,
  4,
  'Hoteles 4 estrellas, vuelos directos',
  'pending'
);
```

---

### 3. `travelers` - Datos de Viajeros

Información personal de los viajeros de la familia Soffer.

#### Columnas

| Columna                  | Tipo         | Constraints           | Descripción                        |
|--------------------------|--------------|-----------------------|------------------------------------|
| `travelerid`             | `UUID`       | `PRIMARY KEY`         | Identificador único del viajero    |
| `firstname`              | `TEXT`       | `NOT NULL`            | Nombre                             |
| `lastname`               | `TEXT`       | `NOT NULL`            | Apellido                           |
| `email`                  | `TEXT`       | `UNIQUE`              | Correo electrónico                 |
| `phone`                  | `TEXT`       |                       | Teléfono de contacto               |
| `date_of_birth`          | `DATE`       |                       | Fecha de nacimiento                |
| `passport_number`        | `TEXT`       |                       | Número de pasaporte                |
| `passport_country`       | `TEXT`       |                       | País del pasaporte (código ISO)    |
| `passport_expiry_date`   | `DATE`       |                       | Fecha de vencimiento del pasaporte |
| `dietary_restrictions`   | `TEXT`       |                       | Restricciones alimentarias         |
| `createdat`              | `TIMESTAMPTZ`| `DEFAULT NOW()`       | Fecha de registro                  |
| `updatedat`              | `TIMESTAMPTZ`| `DEFAULT NOW()`       | Última actualización               |

#### Ejemplo de registro

```sql
INSERT INTO travelers (
  travelerid, firstname, lastname, email, phone, 
  passport_number, passport_country, passport_expiry_date
) VALUES (
  '11111111-1111-1111-1111-111111111111',
  'Moisés',
  'Choppe Rinquet',
  'moises@soffer.com',
  '+52-555-1234567',
  'M12345678',
  'MEX',
  '2028-12-31'
);
```

---

### 4. `reservations` - Reservas

Todas las reservas asociadas a un viaje (vuelos, hoteles, tours, etc.).

#### Columnas

| Columna             | Tipo         | Constraints           | Descripción                            |
|---------------------|--------------|-----------------------|----------------------------------------|
| `reservationid`     | `UUID`       | `PRIMARY KEY`         | Identificador único de reserva         |
| `tripid`            | `UUID`       | `FOREIGN KEY`, `NOT NULL` | Referencia a `trips.tripid`        |
| `groupname`         | `ENUM`       | `NOT NULL`            | Categoría (Vuelo, Hospedaje, etc.)     |
| `category`          | `ENUM`       |                       | Subcategoría (Aerolínea, Hotel, etc.)  |
| `code`              | `TEXT`       |                       | Código de confirmación                 |
| `details`           | `JSONB`      |                       | Detalles adicionales en JSON           |
| `pricemxn`          | `NUMERIC`    |                       | Precio en MXN                          |
| `priceusd`          | `NUMERIC`    |                       | Precio en USD                          |
| `reservationstatus` | `ENUM`       | `DEFAULT 'pendiente'` | Estado (ver enum `reservationstatus`)  |
| `createdat`         | `TIMESTAMPTZ`| `DEFAULT NOW()`       | Fecha de creación                      |
| `updatedat`         | `TIMESTAMPTZ`| `DEFAULT NOW()`       | Última actualización                   |

#### Ejemplo de registro

```sql
INSERT INTO reservations (
  reservationid, tripid, groupname, category, code, 
  pricemxn, priceusd, reservationstatus
) VALUES (
  'r1111111-1111-1111-1111-111111111111',
  '550e8400-e29b-41d4-a716-446655440001',
  'Vuelo',
  'Aerolínea',
  'AM4567',
  12500.00,
  750.00,
  'confirmado'
);
```

---

### 5. `trip_travelers` - Relación Viajes-Viajeros

Tabla intermedia para la relación many-to-many entre viajes y viajeros.

#### Columnas

| Columna       | Tipo         | Constraints                   | Descripción                        |
|---------------|--------------|-------------------------------|------------------------------------|
| `tripid`      | `UUID`       | `FOREIGN KEY`, `NOT NULL`     | Referencia a `trips.tripid`        |
| `travelerid`  | `UUID`       | `FOREIGN KEY`, `NOT NULL`     | Referencia a `travelers.travelerid`|
| `role`        | `ENUM`       | `DEFAULT 'Adulto'`            | Rol del viajero (Adulto, Menor, Infante) |
| `assignedat`  | `TIMESTAMPTZ`| `DEFAULT NOW()`               | Fecha de asignación                |

#### Constraint

```sql
PRIMARY KEY (tripid, travelerid)
```

#### Ejemplo de registro

```sql
INSERT INTO trip_travelers (tripid, travelerid, role) VALUES (
  '550e8400-e29b-41d4-a716-446655440001',
  '11111111-1111-1111-1111-111111111111',
  'Adulto'
);
```

---

## 🏷️ ENUMS

### 1. `triptype` - Tipo de Viaje

```sql
CREATE TYPE triptype AS ENUM (
  'Familiar',
  'Negocios',
  'Religioso',
  'Recreativo'
);
```

**Valores válidos:**
- `'Familiar'` - Viaje en familia
- `'Negocios'` - Viaje de negocios
- `'Religioso'` - Peregrinación o evento religioso
- `'Recreativo'` - Vacaciones o recreación

---

### 2. `tripstatus` - Estado del Viaje

```sql
CREATE TYPE tripstatus AS ENUM (
  'boceto-pre',
  'boceto-post',
  'reservado',
  'completado',
  'solicitud'
);
```

**Valores válidos:**
- `'boceto-pre'` - Boceto inicial antes de aprobación
- `'boceto-post'` - Boceto aprobado, en proceso de reserva
- `'reservado'` - Reservas confirmadas
- `'completado'` - Viaje finalizado
- `'solicitud'` - Solicitud pendiente de aprobación

**Flujo de estados:**
```
solicitud → boceto-pre → boceto-post → reservado → completado
```

---

### 3. `reservationstatus` - Estado de Reserva

```sql
CREATE TYPE reservationstatus AS ENUM (
  'pendiente',
  'confirmado',
  'cancelado'
);
```

**Valores válidos:**
- `'pendiente'` - Reserva en proceso
- `'confirmado'` - Reserva confirmada
- `'cancelado'` - Reserva cancelada

---

### 4. `groupname` - Categoría de Reserva

```sql
CREATE TYPE groupname AS ENUM (
  'Vuelo',
  'Hospedaje',
  'Traslado',
  'Tours y Actividades',
  'Restaurante',
  'Renta de Auto',
  'Tickets',
  'Otros'
);
```

---

### 5. `travelerrole` - Rol del Viajero

```sql
CREATE TYPE travelerrole AS ENUM (
  'Adulto',
  'Menor',
  'Infante'
);
```

---

### 6. `category` - Subcategoría de Reserva

```sql
CREATE TYPE category AS ENUM (
  'Aerolínea',
  'Hotel',
  'Tour',
  'Transportación',
  'Comida',
  'Renta',
  'Entrada',
  'Misc'
);
```

---

## 🔗 FOREIGN KEYS

### 1. `reservations → trips`

```sql
ALTER TABLE reservations
  ADD CONSTRAINT fk_reservations_trip
  FOREIGN KEY (tripid) REFERENCES trips(tripid)
  ON DELETE CASCADE;
```

**Comportamiento:** Si se elimina un viaje, se eliminan todas sus reservas.

---

### 2. `triprequests → trips`

```sql
ALTER TABLE triprequests
  ADD CONSTRAINT fk_triprequests_trip
  FOREIGN KEY (tripid) REFERENCES trips(tripid)
  ON DELETE SET NULL;
```

**Comportamiento:** Si se elimina un viaje, la solicitud queda huérfana (tripid = NULL).

---

### 3. `trip_travelers → trips`

```sql
ALTER TABLE trip_travelers
  ADD CONSTRAINT fk_trip_travelers_trip
  FOREIGN KEY (tripid) REFERENCES trips(tripid)
  ON DELETE CASCADE;
```

---

### 4. `trip_travelers → travelers`

```sql
ALTER TABLE trip_travelers
  ADD CONSTRAINT fk_trip_travelers_traveler
  FOREIGN KEY (travelerid) REFERENCES travelers(travelerid)
  ON DELETE CASCADE;
```

---

## 🔍 ÍNDICES

### Índices de Optimización

```sql
-- Búsqueda por slug (usado en URLs)
CREATE INDEX trips_slug_idx ON trips(slug);

-- Filtrado por estado de viaje
CREATE INDEX trips_status_idx ON trips(tripstatus);

-- Consultas de reservas por viaje
CREATE INDEX reservations_trip_idx ON reservations(tripid);

-- Filtrado de reservas por estado
CREATE INDEX reservations_status_idx ON reservations(reservationstatus);

-- Búsqueda de viajeros por email
CREATE UNIQUE INDEX travelers_email_idx ON travelers(email);

-- Consultas de viajeros por viaje
CREATE INDEX trip_travelers_trip_idx ON trip_travelers(tripid);

-- Consultas de viajes por viajero
CREATE INDEX trip_travelers_traveler_idx ON trip_travelers(travelerid);

-- Ordenamiento de viajes por fecha
CREATE INDEX trips_datestart_idx ON trips(datestart);
```

---

## 📝 QUERIES ÚTILES

### Obtener todos los viajes con conteo de reservas

```sql
SELECT 
  t.slug, 
  t.destination, 
  t.datestart,
  t.dateend,
  t.tripstatus,
  COUNT(r.reservationid) AS total_reservas,
  SUM(r.pricemxn) AS total_mxn
FROM trips t
LEFT JOIN reservations r ON t.tripid = r.tripid
GROUP BY t.tripid
ORDER BY t.datestart DESC;
```

---

### Obtener viaje por slug con detalles completos

```sql
SELECT 
  t.*,
  json_agg(DISTINCT jsonb_build_object(
    'travelerid', tr.travelerid,
    'firstname', tr.firstname,
    'lastname', tr.lastname,
    'role', tt.role
  )) AS travelers,
  json_agg(DISTINCT jsonb_build_object(
    'reservationid', r.reservationid,
    'groupname', r.groupname,
    'code', r.code,
    'pricemxn', r.pricemxn,
    'status', r.reservationstatus
  )) AS reservations
FROM trips t
LEFT JOIN trip_travelers tt ON t.tripid = tt.tripid
LEFT JOIN travelers tr ON tt.travelerid = tr.travelerid
LEFT JOIN reservations r ON t.tripid = r.tripid
WHERE t.slug = 'cuatro-cienegas'
GROUP BY t.tripid;
```

---

### Obtener reservas de un viaje agrupadas por categoría

```sql
SELECT 
  groupname,
  COUNT(*) AS cantidad,
  SUM(pricemxn) AS total_mxn,
  SUM(priceusd) AS total_usd,
  array_agg(code) AS codigos
FROM reservations
WHERE tripid = '550e8400-e29b-41d4-a716-446655440001'
GROUP BY groupname
ORDER BY groupname;
```

---

### Verificar pasaportes por vencer (< 6 meses)

```sql
SELECT 
  firstname,
  lastname,
  passport_number,
  passport_expiry_date,
  (passport_expiry_date - CURRENT_DATE) AS dias_restantes
FROM travelers
WHERE passport_expiry_date IS NOT NULL
  AND passport_expiry_date < CURRENT_DATE + INTERVAL '6 months'
ORDER BY passport_expiry_date ASC;
```

---

### Calcular porcentaje de reservas confirmadas por viaje

```sql
SELECT 
  t.slug,
  t.destination,
  COUNT(r.reservationid) AS total_reservas,
  COUNT(r.reservationid) FILTER (WHERE r.reservationstatus = 'confirmado') AS confirmadas,
  ROUND(
    COUNT(r.reservationid) FILTER (WHERE r.reservationstatus = 'confirmado')::NUMERIC / 
    NULLIF(COUNT(r.reservationid), 0) * 100, 
    2
  ) AS porcentaje_confirmado
FROM trips t
LEFT JOIN reservations r ON t.tripid = r.tripid
WHERE t.tripstatus != 'completado'
GROUP BY t.tripid
ORDER BY porcentaje_confirmado DESC;
```

---

### Obtener próximos viajes (futuro)

```sql
SELECT 
  slug,
  destination,
  datestart,
  dateend,
  tripstatus,
  (datestart - CURRENT_DATE) AS dias_hasta_viaje
FROM trips
WHERE datestart > CURRENT_DATE
ORDER BY datestart ASC
LIMIT 5;
```

---

## 🛡️ Row Level Security (RLS)

### Políticas Recomendadas

```sql
-- Habilitar RLS en todas las tablas
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE triprequests ENABLE ROW LEVEL SECURITY;
ALTER TABLE travelers ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_travelers ENABLE ROW LEVEL SECURITY;

-- Permitir lectura pública (solo con anon key)
CREATE POLICY "Allow public read access" ON trips
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON reservations
  FOR SELECT USING (true);

-- Permitir escritura solo con service_role key
CREATE POLICY "Service role can insert" ON trips
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can update" ON trips
  FOR UPDATE USING (auth.role() = 'service_role');
```

---

## 📊 Diagrama de Relaciones

```
┌─────────────┐
│   trips     │
│  (viajes)   │
└──────┬──────┘
       │
       ├──────────┐
       │          │
       ▼          ▼
┌──────────┐  ┌────────────────┐
│triprequests│  │  reservations  │
│(solicitudes)│  │   (reservas)   │
└────────────┘  └────────────────┘
       │
       │
       ▼
┌──────────────┐
│trip_travelers│ ◄──── many-to-many
│ (relación)   │
└──────┬───────┘
       │
       ▼
┌─────────────┐
│  travelers  │
│ (viajeros)  │
└─────────────┘
```

---

**Última actualización:** 10 Marzo 2026  
**Versión:** 8.0  
**Mantenido por:** Moisés Choppe Rinquet