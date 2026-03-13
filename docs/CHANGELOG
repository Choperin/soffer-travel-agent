# 📝 CHANGELOG — AGENTE DE VIAJES SOFFER

**Registro acumulativo de cambios** en el proyecto desde Sesión 1 hasta estado actual.

---

## [Sesión 3 - Fase 2.5 y Fase 3 (40%)] - 2026-03-11

### ✅ Agregado (Added)

#### Frontend
- **Tarjetas dinámicas en portal** - `index.html` ahora muestra viajes reales desde Supabase
- **Submenú expandible** en tarjetas con 3 opciones: Boceto, Panel, Itinerario
- **Badges de estado** dinámicos según `tripstatus`:
  - "Confirmado" (verde) para `reservado`
  - "En planeación" (amarillo) para `boceto-pre`
  - "En reserva" (azul) para `boceto-post`
  - "Completado" (gris) para `completado`
- **Bloqueo inteligente de Itinerario** hasta que reservas estén 100% confirmadas
- **Función `formatDateRange()`** - Convierte fechas ISO a formato legible "8-11 abr 2026"
- **Función `formatPrice()`** - Formatea números a "145,063"
- **Función `statusBadge()`** - Genera HTML de badges según estado

#### Backend
- **Edge Function `create-trip-request`** - POST funcional que crea solicitudes en `triprequests`
- **Dashboard de viajeros** - `js/dashboard-travelers.js` con clase `TravelersManager`
- **Tabla de viajeros** renderizada en `dashboard.html` con datos de Supabase

#### Archivos Creados
- `js/dashboard-travelers.js` (nuevo)
- Documentos de sesión (logs)

### 🔧 Cambiado (Changed)

#### Correcciones de Schema
- **`supabase-client.js`** - Corregido nombre de columna `startdate` → `datestart`
- **`getTrips()`** - Ordenamiento ajustado a columnas reales
- **Mapeo de enums** - `tripTypeMap` para conversión correcta

#### Correcciones HTML
- **`index.html`** - Eliminado script duplicado de `supabase-client.js`
- **`index.html`** - Eliminados placeholders `{{TRIP_YEAR}}` de bloques `<script>`
- **Simplificación de `loadTrips()`** - Solo log en consola por ahora

#### Edge Functions
- **CORS configurado explícitamente** en `create-trip-request`
- **JWT verification desactivada** para llamadas desde frontend
- **Mapeo de arrays** a formato PostgreSQL `{val1,val2}`

### 🐛 Corregido (Fixed)

#### Errores Resueltos (12+ errores)
1. **"SupabaseClient already declared"** - Script duplicado en `<head>`
2. **"Unexpected token"** - Placeholders dentro de `<script>`
3. **"column trips.startdate does not exist"** - Nombre de columna incorrecto
4. **Enum case-sensitivity** - Valores exactos documentados
5. **Array format Postgres** - Cambio de JSON a `{val1,val2}`
6. **CORS bloqueado** - Headers explícitos agregados
7. **JWT verification error** - Desactivado para funciones públicas
8. **NOT NULL constraint** - Campos obligatorios provistos
9. **Variable hoisting** - Orden de declaración con `const` respetado
10. **Nombres de columnas** - Verificados contra schema real
11. **Doble referencia a supabase-client.js** - Una sola en `<head>`
12. **Placeholders en código ejecutable** - Eliminados de JS

### ⚠️ Conocido (Known Issues)

1. **Viajes nuevos no aparecen como tarjetas** - `create-trip-request` inserta en `triprequests`, pero portal lee de `trips`
2. **Boceto con placeholders** - `boceto.html` necesita script dinámico
3. **Panel con placeholders** - `panel-reservas.html` necesita script dinámico
4. **Edge Functions esqueleto** - `get-trip-details` y `update-reservation` sin lógica
5. **Dashboard HTML roto** - Doble `</body></html>` y sección millas sin cerrar
6. **Sin enlace a dashboard** - Portal no tiene icono/link a `dashboard.html`
7. **Dashboard sin KPIs** - `{{TRIPS_CARDS}}` y placeholders sin reemplazar

---

## [Sesión 2 - Fase 2] - 2026-03-11

### ✅ Agregado (Added)

#### Infraestructura
- **Repositorio GitHub** creado: `choperin/soffer-travel-agent`
- **GitHub Pages** activado en `https://choperin.github.io/soffer-travel-agent/`
- **SSL automático** habilitado

#### Archivos Desplegados (8 archivos)
1. `index.html` - Portal principal
2. `solicitud.html` - Formulario de solicitud
3. `boceto.html` - Vista de boceto
4. `dashboard.html` - Dashboard del agente
5. `panel-reservas.html` - Panel de reservas
6. `itinerario.html` - Itinerario de viaje
7. `recomendaciones.html` - Recomendaciones
8. `css/shared-styles.css` - Estilos compartidos

#### Configuración
- **`js/config.js`** creado con:
  - `SUPABASE.url`
  - `SUPABASE.anonKey`
  - `SUPABASE.apiVersion`
  - `API_ENDPOINTS` (Edge Functions)
  - `SYSTEM_URLS` (páginas)

- **`js/supabase-client.js`** creado con clase `SupabaseClient` y métodos:
  - `query()` - Query genérico
  - `getTrips()` - Obtener viajes
  - `getTripBySlug()` - Viaje por slug
  - `getReservations()` - Reservas de un viaje
  - `getTripTravelers()` - Viajeros de un viaje
  - `createTripRequest()` - Crear solicitud
  - `updateReservation()` - Actualizar reserva
  - `testConnection()` - Verificar conexión

#### Estructura de Directorio
```
soffer-travel-agent/
├── index.html
├── solicitud.html
├── boceto.html
├── dashboard.html
├── panel-reservas.html
├── itinerario.html
├── recomendaciones.html
├── css/
│   └── shared-styles.css
├── js/
│   ├── config.js
│   └── supabase-client.js
└── README.md
```

### 🔧 Cambiado (Changed)

- **Repositorio configurado como privado** con GitHub Pages activo
- **Decisión de seguridad:** Aceptar exposición de `anonKey` (llave pública con RLS)
- **Sin dominio custom** - Mantener URL de GitHub Pages por ahora

### 🐛 Corregido (Fixed)

#### Errores de Integración
1. **"SupabaseClient already declared"** - Script incluido dos veces en `index.html`
2. **"Unexpected token"** - Placeholders `{{TRIP_YEAR}}` dentro de `<script>`
3. **"column trips.startdate does not exist"** - Ordenamiento con columna inexistente

#### Ajustes Provisionales
- **`getTrips()` simplificado** - Sin `order()` hasta confirmar schema

### ✅ Verificado (Verified)

- ✅ Sitio público accesible en URL de GitHub Pages
- ✅ Todos los templates HTML desplegados
- ✅ Portal carga sin errores de sintaxis JS
- ✅ Supabase responde correctamente a `getTrips()` (Array de 2 viajes en consola)
- ✅ Conexión funcional entre frontend y Supabase

---

## [Sesión 1 - Fase 1] - 2026-03-10

### ✅ Agregado (Added)

#### Base de Datos (Supabase)

**5 Tablas Principales:**
1. **`trips`** - Viajes principales
   - Columnas: `tripid`, `tripname`, `slug`, `destination`, `datestart`, `dateend`, `triptype`, `tripstatus`, `totalcost`, `createdat`, `updatedat`
   
2. **`triprequests`** - Solicitudes de viaje
   - Columnas: `requestid`, `tripid`, `destinations`, `datestart`, `dateend`, `triptype`, `budget`, `travelers`, `preferences`, `status`, `createdat`
   
3. **`travelers`** - Datos de viajeros
   - Columnas: `travelerid`, `firstname`, `lastname`, `email`, `phone`, `date_of_birth`, `passport_number`, `passport_country`, `passport_expiry_date`, `dietary_restrictions`, `createdat`, `updatedat`
   
4. **`reservations`** - Reservas (vuelos, hoteles, actividades)
   - Columnas: `reservationid`, `tripid`, `groupname`, `category`, `code`, `details`, `pricemxn`, `priceusd`, `reservationstatus`, `createdat`, `updatedat`
   
5. **`trip_travelers`** - Relación viajes-viajeros
   - Columnas: `tripid`, `travelerid`, `role`, `assignedat`

**6 Enums Definidos:**
1. `triptype`: `'Familiar'`, `'Negocios'`, `'Religioso'`, `'Recreativo'`
2. `tripstatus`: `'boceto-pre'`, `'boceto-post'`, `'reservado'`, `'completado'`, `'solicitud'`
3. `reservationstatus`: `'pendiente'`, `'confirmado'`, `'cancelado'`
4. `groupname`: `'Vuelo'`, `'Hospedaje'`, `'Traslado'`, `'Tours y Actividades'`, `'Restaurante'`, `'Renta de Auto'`, `'Tickets'`, `'Otros'`
5. `travelerrole`: `'Adulto'`, `'Menor'`, `'Infante'`
6. `category`: `'Aerolínea'`, `'Hotel'`, `'Tour'`, `'Transportación'`, `'Comida'`, `'Renta'`, `'Entrada'`, `'Misc'`

**Foreign Keys (4):**
- `reservations.tripid` → `trips.tripid`
- `triprequests.tripid` → `trips.tripid`
- `trip_travelers.tripid` → `trips.tripid`
- `trip_travelers.travelerid` → `travelers.travelerid`

**Índices (8):**
- `trips_slug_idx` en `trips(slug)`
- `trips_status_idx` en `trips(tripstatus)`
- `reservations_trip_idx` en `reservations(tripid)`
- `reservations_status_idx` en `reservations(reservationstatus)`
- `travelers_email_idx` en `travelers(email)`
- Otros índices de optimización

#### Datos de Prueba

**Viaje 1: Cuatro Ciénegas (Real)**
- Destino: Cuatro Ciénegas, Coahuila
- Fechas: 8-11 abril 2026
- Tipo: Familiar
- Status: Reservado
- Viajeros: Moisés, Teresa, Sion, Marcos, Jacqueline
- Reservas: 30 (vuelos, hotel, tours, comidas)
- Costo total: $145,063 MXN

**Viaje 2: Tokio (Prueba)**
- Destino: Tokio
- Fechas: 15-25 junio 2026
- Tipo: Familiar
- Status: Boceto-pre
- Viajeros: (por asignar)
- Reservas: 30 (vuelos, hotel, actividades)
- Costo total: (por calcular)

**5 Viajeros Registrados:**
1. Moisés Choppe Rinquet
2. Teresa Rinquet Camhi
3. Sion Choppe Rinquet
4. Marcos Choppe Rinquet
5. Jacqueline Choppe Rinquet

**Total:** 73 registros insertados (2 trips + 5 travelers + 60 reservations + 5 trip_travelers + 1 triprequest)

#### Archivos Generados

1. `schema-trip-requests-3.sql` - Schema v8.0 con DDL completo
2. `DATA-6.md` - Dataset documentado con todos los valores
3. `reservations-7.json` - Reservas en formato JSON
4. Scripts SQL de inserción
5. `FASE-1-CIERRE-CONTROL.md` - Documento de cierre de sesión
6. `FASE-1-LOG-ERRORES.md` - Log de debugging con lecciones

### 🔧 Cambiado (Changed)

- **Nomenclatura migrada a v8.0** desde versiones anteriores
- **Schema unificado** - Consolidación de tablas fragmentadas

### 🐛 Corregido (Fixed)

#### Errores de Inserción (26% del tiempo de debugging)
1. **Enum case-sensitivity** - Valores corregidos (`Familiar` no `familiar`)
2. **Column count mismatch** - Conteo de columnas vs valores verificado
3. **UUID duplicates** - UUIDs únicos generados para cada registro
4. **Foreign key violations** - Orden de inserción corregido (parents antes que children)
5. **NOT NULL constraints** - Todos los campos obligatorios provistos

### ✅ Verificado (Verified)

- ✅ Todas las tablas creadas sin errores
- ✅ Foreign keys funcionando correctamente
- ✅ Enums con valores válidos
- ✅ Datos de prueba cargados y consultables
- ✅ Queries de test ejecutados correctamente

### 📚 Lecciones Aprendidas

1. Enums son **case-sensitive** — usar capitalización correcta
2. Siempre **verificar valores de enum** antes de INSERT
3. **Contar columnas = valores** en INSERT
4. Usar **UUID únicos** para cada registro
5. Insertar **parents antes que children** (foreign keys)
6. Documentar schema **inmediatamente** después de cambios

---

## 📊 Resumen de Cambios por Tipo

### Por Sesión

| Sesión | Archivos Agregados | Archivos Modificados | Errores Corregidos |
|--------|-------------------|----------------------|--------------------|
| 1      | 6                 | 0                    | 5+                 |
| 2      | 10                | 0                    | 3                  |
| 3      | 1                 | 3                    | 12+                |
| **Total** | **17**         | **3**                | **20+**            |

### Por Categoría

| Categoría        | Cambios |
|------------------|---------|
| Frontend (HTML)  | 8 archivos creados, 2 modificados |
| Backend (Edge)   | 3 funciones creadas |
| JavaScript       | 2 archivos creados, 2 modificados |
| CSS              | 1 archivo creado |
| Base de Datos    | 5 tablas, 6 enums, 73 registros |
| Documentación    | 6 archivos generados |

---

## 🎯 Próximos Cambios Planeados (Sesión 4)

### Alta Prioridad
1. Corregir HTML roto en `dashboard.html`
2. Agregar enlace a Dashboard en `index.html`
3. Modificar `create-trip-request` para insertar también en `trips`
4. Implementar script dinámico en `boceto.html`
5. Implementar script dinámico en `panel-reservas.html`

### Media Prioridad
6. Completar lógica de `get-trip-details` Edge Function
7. Completar lógica de `update-reservation` Edge Function
8. Renderizar KPIs en Dashboard
9. Implementar gestión de viajeros completa (edición)

### Baja Prioridad
10. Sistema de alertas de pasaportes
11. Formularios de edición de datos personales
12. Documentación de APIs

---

**Última actualización:** 11 Marzo 2026, 10:19 PM CST  
**Próxima revisión:** Post-Sesión 4
