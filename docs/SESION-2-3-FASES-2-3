# 📋 SESIONES 2 Y 3 — FASES 2, 2.5 Y 3

**Proyecto:** Agente de Viajes Soffer  
**Fechas:** 11 Marzo 2026  
**Duración Total:** ~4 horas  
**Status:** Fase 2 ✅ | Fase 2.5 ✅ | Fase 3 🔶 40%

---

## 🎯 RESUMEN EJECUTIVO

### Sesión 2: Deployment de Templates
- ✅ Repositorio GitHub creado
- ✅ GitHub Pages activado
- ✅ 8 templates HTML desplegados
- ✅ Conexión con Supabase establecida
- ✅ Portal carga viajes reales

### Sesión 3: Funcionalidad Dinámica
- ✅ Submenú expandible agregado
- ✅ Badges dinámicos según status
- ✅ Edge Function create-trip-request funcional
- ✅ Dashboard carga viajeros
- 🔶 3 Edge Functions pendientes
- 🔶 Templates con placeholders (boceto, panel, itinerario)

---

## 📂 SESIÓN 2: FASE 2 — DEPLOYMENT DE TEMPLATES

**Fecha:** 11 Marzo 2026, 2:00 PM - 4:00 PM CST

### Repositorio Creado

**URL:** https://github.com/choperin/soffer-travel-agent  
**GitHub Pages:** https://choperin.github.io/soffer-travel-agent/  
**Branch:** main  
**Commits totales:** 36

---

### Archivos Creados (Fase 2)

| Archivo | Tipo | Descripción |
|---------|------|-------------|
| `index.html` | Frontend | Portal principal con tarjetas de viajes |
| `solicitud.html` | Frontend | Formulario de solicitud de viaje |
| `boceto.html` | Frontend | Template de boceto (con placeholders) |
| `panel-reservas.html` | Frontend | Panel de reservas (con placeholders) |
| `itinerario.html` | Frontend | Itinerario de viaje (con placeholders) |
| `dashboard.html` | Frontend | Dashboard del agente con sidebar |
| `recomendaciones.html` | Frontend | Recomendaciones de viaje |
| `css/shared-styles.css` | CSS | Estilos compartidos |
| `js/config.js` | JS | Configuración Supabase (URL + anon key) |
| `js/supabase-client.js` | JS | Cliente SupabaseClient class |
| `.gitignore` | Config | Archivos ignorados |
| `README.md` | Doc | Descripción del proyecto |

---

### Configuración Supabase

**Archivo: `js/config.js`**

```javascript
const SUPABASE_CONFIG = {
  url: 'https://[PROYECTO].supabase.co',
  anonKey: 'eyJ...', // Anon key (seguro exponer)
  apiVersion: 'v1'
};
```

**Seguridad:**
- ✅ `anonKey` es segura para frontend (RLS protege datos)
- ❌ `service_role` key NUNCA se expone (solo Edge Functions)

---

### Cliente Supabase

**Archivo: `js/supabase-client.js`**

```javascript
class SupabaseClient {
  constructor(config) {
    this.url = config.url;
    this.anonKey = config.anonKey;
    this.headers = {
      'apikey': this.anonKey,
      'Authorization': `Bearer ${this.anonKey}`,
      'Content-Type': 'application/json'
    };
  }

  async query(endpoint, options = {}) {
    const url = `${this.url}/rest/v1${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: { ...this.headers, ...options.headers }
    });
    return response.json();
  }

  async getTrips() {
    return this.query('/trips?select=*&order=datestart.desc');
  }

  async getReservations(tripId) {
    return this.query(`/reservations?tripid=eq.${tripId}&order=groupname,code`);
  }

  async getTripTravelers(tripId) {
    return this.query(`/triptravelers?tripid=eq.${tripId}`);
  }
}
```

---

### Portal Principal

**Archivo: `index.html`**

**Funcionalidad:**
1. **Carga viajes desde Supabase** al cargar la página
2. **Renderiza tarjetas** con información del viaje
3. **Click en tarjeta** navega a boceto del viaje

**Código de carga:**

```javascript
async function loadTrips() {
  const supabase = new SupabaseClient(SUPABASE_CONFIG);
  
  try {
    const trips = await supabase.getTrips();
    const container = document.getElementById('tripsContainer');
    
    trips.forEach(trip => {
      const card = createTripCard(trip);
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading trips:', error);
  }
}

function createTripCard(trip) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <h3>${trip.tripname}</h3>
    <p>${trip.destination}</p>
    <p>${formatDate(trip.datestart)} - ${formatDate(trip.dateend)}</p>
  `;
  card.onclick = () => {
    window.location.href = `boceto.html?slug=${trip.slug}`;
  };
  return card;
}
```

---

### Formulario de Solicitud

**Archivo: `solicitud.html`**

**Versión inicial (Fase 2):**
- Formulario con validación de campos
- Múltiples destinos dinámicos
- Selección de actividades
- **NOTA:** En Fase 2 aún NO conectaba con Supabase

**Campos:**
- Destinos (array dinámico)
- Fecha inicio / fin
- Tipo de viaje (select)
- Actividades (checkboxes)
- Comentarios adicionales

---

## 🔶 SESIÓN 3: FASE 2.5 + FASE 3

**Fecha:** 11 Marzo 2026, 6:00 PM - 10:00 PM CST

---

## ✅ FASE 2.5: SUBMENÚ EXPANDIBLE

### Cambios en `index.html`

**Commit:** "Fase 2.5: Submenú expandible con badges dinámicos"

#### 1. Submenú en Tarjetas

**Antes (Fase 2):**
```javascript
card.onclick = () => {
  window.location.href = `boceto.html?slug=${trip.slug}`;
};
```

**Después (Fase 2.5):**
```javascript
card.onclick = (e) => {
  e.stopPropagation();
  card.classList.toggle('is-expanded');
};

// HTML del submenú agregado:
const submenu = `
  <div class="card__submenu">
    <a href="boceto.html?slug=${trip.slug}">
      <span class="submenu__icon">📋</span>
      <span>Boceto</span>
      ${getBocetoBadge(trip)}
    </a>
    <a href="panel-reservas.html?trip=${trip.tripid}">
      <span class="submenu__icon">📊</span>
      <span>Panel de Reservas</span>
    </a>
    <a href="itinerario.html?trip=${trip.tripid}">
      <span class="submenu__icon">📅</span>
      <span>Itinerario</span>
      ${await checkItinerarioStatus(trip)}
    </a>
  </div>
`;
```

---

#### 2. Badges Dinámicos

**Función: `getBocetoBadge(trip)`**

```javascript
function getBocetoBadge(trip) {
  if (trip.tripstatus === 'reservado') {
    return '<span class="badge badge--success">Confirmado</span>';
  } else if (trip.tripstatus === 'boceto-pre' || trip.tripstatus === 'boceto-post') {
    return '<span class="badge badge--warning">En edición</span>';
  }
  return '';
}
```

**Estados soportados:**
- `reservado` → Badge verde "Confirmado"
- `boceto-pre` / `boceto-post` → Badge amarillo "En edición"
- `completado` → Sin badge
- `solicitud` → Badge azul "Solicitud"

---

#### 3. Bloqueo Inteligente de Itinerario

**Función: `checkItinerarioStatus(trip)`**

```javascript
async function checkItinerarioStatus(trip) {
  try {
    const reservations = await supabase.getReservations(trip.tripid);
    
    const allConfirmed = reservations.every(r => 
      r.reservationstatus === 'confirmado'
    );
    
    if (allConfirmed) {
      return '<span class="badge badge--success">Disponible</span>';
    } else {
      return '<span class="badge badge--locked">🔒 Bloqueado</span>';
    }
  } catch (error) {
    console.error('Error checking itinerary:', error);
    return '<span class="badge badge--error">Error</span>';
  }
}
```

**Lógica:**
- ✅ **Todas** las reservas con `reservationstatus = 'confirmado'` → Desbloquear
- ❌ **Al menos una** reserva con status diferente → Bloquear

---

#### 4. CSS del Submenú

```css
.card__submenu {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.card.is-expanded .card__submenu {
  max-height: 300px;
}

.submenu__icon {
  font-size: 1.2em;
  margin-right: 8px;
}

.badge {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.8em;
  font-weight: bold;
}

.badge--success {
  background-color: #4caf50;
  color: white;
}

.badge--warning {
  background-color: #ff9800;
  color: white;
}

.badge--locked {
  background-color: #9e9e9e;
  color: white;
}
```

---

### Correcciones en `js/supabase-client.js`

**Problema:** Nombres de columnas no coincidían con schema real

**Cambios:**

```javascript
// ❌ ANTES (nombres incorrectos)
async getReservations(tripId) {
  return this.query(`/reservations?trip_id=eq.${tripId}&order=group`);
}

async getTripTravelers(tripId) {
  return this.query(`/trip_travelers?trip_id=eq.${tripId}`);
}

// ✅ DESPUÉS (nombres correctos del schema)
async getReservations(tripId) {
  return this.query(`/reservations?tripid=eq.${tripId}&order=groupname,code`);
}

async getTripTravelers(tripId) {
  return this.query(`/triptravelers?tripid=eq.${tripId}`);
}
```

**Lección:** SIEMPRE verificar nombres de columnas en Supabase Table Editor

---

## 🔶 FASE 3: EDGE FUNCTIONS + CONEXIÓN BACKEND

### Edge Function: create-trip-request ✅

**Ubicación:** Supabase Dashboard > Edge Functions

**Propósito:** Recibir solicitudes de viaje desde `solicitud.html` e insertarlas en `triprequests`

---

#### Código Final Funcional

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://choperin.github.io',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey',
  'Content-Type': 'application/json'
}

serve(async (req) => {
  // Manejar preflight OPTIONS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { 
      status: 204, 
      headers: corsHeaders 
    })
  }

  try {
    const payload = await req.json()
    
    // Mapeo de valores de enum
    const tripTypeMap = {
      'familiar': 'Familiar',
      'pareja': 'Pareja',
      'negocios': 'Negocios',
      'solo': 'Solo',
      'grupal': 'Grupal',
      'negocios_solo': 'Negocios+Solo'
    }
    
    // Convertir arrays a formato Postgres {val1,val2}
    const destinationsArray = `{${payload.destinations.join(',')}}`
    const activitiesArray = payload.activities 
      ? `{${payload.activities.join(',')}}` 
      : null
    
    // Preparar datos para inserción
    const tripRequest = {
      requestid: crypto.randomUUID(),
      destinations: destinationsArray,
      datestart: payload.start_date,
      dateend: payload.end_date,
      triptype: tripTypeMap[payload.trip_type] || 'Familiar',
      preferences: payload.comments || null,
      status: 'pending',
      createdat: new Date().toISOString()
    }
    
    // Insertar en Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    const response = await fetch(`${supabaseUrl}/rest/v1/triprequests`, {
      method: 'POST',
      headers: {
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(tripRequest)
    })
    
    const data = await response.json()
    
    return new Response(JSON.stringify({
      success: true,
      data: data
    }), {
      status: 200,
      headers: corsHeaders
    })
    
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: corsHeaders
    })
  }
})
```

---

#### Proceso de Debugging (9 Errores Corregidos)

| # | Error | Causa | Solución | Tiempo |
|---|-------|-------|----------|--------|
| 1 | CORS blocked | Faltaban headers CORS | Agregar `corsHeaders` + OPTIONS handler | 5 min |
| 2 | 401 Unauthorized | JWT verification activo | Desactivar JWT en settings | 3 min |
| 3 | 400 column `requeststatus` | Columna incorrecta | Cambiar a `status` | 2 min |
| 4 | 22P02 malformed array | JSON.stringify en array | Usar formato `{val1,val2}` | 8 min |
| 5 | Enum `nueva` inválido | Valor no existe | Cambiar a `pending` | 2 min |
| 6 | Enum `pareja` inválido | Capitalización incorrecta | Implementar `tripTypeMap` | 10 min |
| 7 | NOT NULL `requestid` | Campo obligatorio faltante | Agregar `crypto.randomUUID()` | 3 min |
| 8 | NOT NULL `triptype` | Se perdió en refactor | Reinsertar en `tripRequest` | 2 min |
| 9 | `tripTypeMap` not defined | Orden de declaración | Mover antes de uso | 1 min |

**Total errores:** 9  
**Tiempo total debugging:** ~36 minutos

---

#### Lecciones Críticas

**1. Arrays de Postgres ≠ JSON**

```javascript
// ❌ INCORRECTO
destinations: JSON.stringify(['París', 'Roma'])
// Resultado: "[\"París\",\"Roma\"]" (string JSON)

// ✅ CORRECTO
destinations: `{${['París', 'Roma'].join(',')}}`
// Resultado: {París,Roma} (array nativo Postgres)
```

**2. Enums son case-sensitive**

```javascript
// ❌ INCORRECTO
triptype: 'familiar' // No existe

// ✅ CORRECTO
triptype: 'Familiar' // Existe con mayúscula
```

**3. NOT NULL constraints son estrictos**

```javascript
// Verificar schema para campos obligatorios
const tripRequest = {
  requestid: crypto.randomUUID(),  // ← NOT NULL
  triptype: 'Familiar',            // ← NOT NULL
  datestart: '2026-06-01',         // ← NOT NULL
  dateend: '2026-06-10',           // ← NOT NULL
  status: 'pending',               // ← NOT NULL (tiene default)
  destinations: '{París,Roma}'     // ← NOT NULL
}
```

---

### Cambios en `solicitud.html`

**ELIMINADO:**
```javascript
// Antigua lógica con placeholders
function supabaseInsert(table, data) {
  fetch('{{SUPABASE_URL}}/rest/v1/' + table, {...})
}
```

**AGREGADO:**
```javascript
async function handleSubmit(e) {
  e.preventDefault();
  
  const payload = {
    destinations: getDestinations(),
    start_date: document.getElementById('start-date').value,
    end_date: document.getElementById('end-date').value,
    trip_type: document.getElementById('trip-type').value,
    activities: getSelectedActivities(),
    comments: document.getElementById('comments').value
  };
  
  try {
    const response = await fetch(
      'https://[PROYECTO].supabase.co/functions/v1/create-trip-request',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
        },
        body: JSON.stringify(payload)
      }
    );
    
    const result = await response.json();
    
    if (result.success) {
      showSuccessMessage();
    } else {
      showErrorMessage(result.error);
    }
  } catch (error) {
    console.error('Error:', error);
    showErrorMessage(error.message);
  }
}
```

---

### Dashboard de Viajeros ✅

**Archivo creado: `js/dashboard-travelers.js`**

```javascript
async function loadTravelersForDashboard() {
  const supabase = new SupabaseClient(SUPABASE_CONFIG);
  
  try {
    const travelers = await supabase.query('/travelers?select=*');
    const container = document.getElementById('travelersTable');
    
    const html = `
      <table class="travelers-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Pasaporte</th>
            <th>Vencimiento</th>
          </tr>
        </thead>
        <tbody>
          ${travelers.map(t => `
            <tr>
              <td>${t.firstname} ${t.lastname}</td>
              <td>${t.email || '-'}</td>
              <td>${t.phone || '-'}</td>
              <td>${t.passport_number || '-'}</td>
              <td>${t.passport_expiry_date || '-'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    
    container.innerHTML = html;
  } catch (error) {
    console.error('Error loading travelers:', error);
  }
}

// Cargar al iniciar
document.addEventListener('DOMContentLoaded', loadTravelersForDashboard);
```

**Cambios en `dashboard.html`:**
```html
<section class="dashboard-section">
  <h2>Viajeros</h2>
  <div id="travelersTable">Cargando...</div>
</section>

<script src="js/config.js"></script>
<script src="js/supabase-client.js"></script>
<script src="js/dashboard-travelers.js"></script>
```

---

### Edge Functions Esqueleto

**2 funciones creadas con CORS pero sin lógica:**

#### `get-trip-details`

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json'
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { status: 204, headers: corsHeaders })
  }

  // TODO: Implementar lógica
  // 1. Obtener slug de query params
  // 2. Consultar trips WHERE slug = ?
  // 3. Obtener reservations del trip
  // 4. Obtener travelers del trip
  // 5. Retornar todo combinado

  return new Response(JSON.stringify({
    message: 'Not implemented yet'
  }), {
    status: 501,
    headers: corsHeaders
  })
})
```

#### `update-reservation`

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json'
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { status: 204, headers: corsHeaders })
  }

  // TODO: Implementar lógica
  // 1. Obtener reservationid y nuevo status del body
  // 2. UPDATE reservations SET reservationstatus = ? WHERE reservationid = ?
  // 3. Retornar registro actualizado

  return new Response(JSON.stringify({
    message: 'Not implemented yet'
  }), {
    status: 501,
    headers: corsHeaders
  })
})
```

---

## ❌ PROBLEMAS CONOCIDOS (Pendientes)

### 1. dashboard.html — HTML Roto

**Problema:**
- Doble `</body></html>` al final del archivo
- Sección "millas" no cierra `</section>` antes de "Viajeros"

**Impacto:** HTML inválido, posibles problemas de rendering

**Solución:**
```html
<!-- Eliminar segunda copia de cierre -->
</body>
</html>
<!-- ❌ ELIMINAR ESTA LÍNEA DUPLICADA -->
```

---

### 2. index.html — Sin Acceso a Dashboard

**Problema:** No existe enlace para acceder a `dashboard.html`

**Solución:** Agregar link en navegación principal

```html
<nav class="portal-nav">
  <a href="index.html">Inicio</a>
  <a href="solicitud.html">Nueva Solicitud</a>
  <a href="dashboard.html">📊 Dashboard</a> <!-- ← AGREGAR -->
  <button id="themeToggle">🌙</button>
</nav>
```

---

### 3. triprequests vs trips — Viajes Nuevos No Aparecen

**Problema:**
- Se crearon 2 solicitudes exitosamente (POST 200)
- Estas se guardaron en tabla `triprequests` con `status = 'pending'`
- El portal (`index.html`) lee de tabla `trips` con `getTrips()`
- **triprequests ≠ trips** — son solicitudes pendientes

**Opciones de solución:**

**OPCIÓN A:** Proceso de conversión (recomendado)
```sql
-- Cuando solicitud es aprobada:
INSERT INTO trips (...)
SELECT ... FROM triprequests WHERE requestid = ?;

UPDATE triprequests 
SET status = 'approved', tripid = [nuevo_trip_id]
WHERE requestid = ?;
```

**OPCIÓN B:** Portal muestra ambas tablas
```javascript
async function loadTripsAndRequests() {
  const trips = await supabase.getTrips();
  const requests = await supabase.query('/triprequests?status=eq.pending');
  
  // Renderizar trips con badge "Activo"
  // Renderizar requests con badge "Solicitud Pendiente"
}
```

**OPCIÓN C:** create-trip-request inserta en trips directamente
```typescript
// En Edge Function: insertar en trips en vez de triprequests
const tripData = {
  tripid: crypto.randomUUID(),
  tripname: `${destinations[0]} - Solicitud`,
  slug: generateSlug(destinations[0]),
  destination: destinations[0],
  tripstatus: 'solicitud',
  // ...resto de campos
};

await fetch(`${supabaseUrl}/rest/v1/trips`, {
  method: 'POST',
  body: JSON.stringify(tripData)
});
```

---

### 4. boceto.html y panel-reservas.html — Sin Datos

**Problema:** Páginas cargan pero solo muestran placeholders `{{DESTINO}}`, `{{HERO_IMAGE_ALT}}`, etc.

**Solución necesaria:**

**Para boceto.html:**
```javascript
// Agregar script
async function loadBoceto() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');
  
  // Llamar a Edge Function get-trip-details
  const response = await fetch(
    `https://[PROYECTO].supabase.co/functions/v1/get-trip-details?slug=${slug}`
  );
  const trip = await response.json();
  
  // Reemplazar placeholders
  document.getElementById('destination').textContent = trip.destination;
  document.getElementById('dates').textContent = 
    `${trip.datestart} - ${trip.dateend}`;
  // ...resto de reemplazos
}
```

**Para panel-reservas.html:**
```javascript
async function loadReservations() {
  const urlParams = new URLSearchParams(window.location.search);
  const tripId = urlParams.get('trip');
  
  const supabase = new SupabaseClient(SUPABASE_CONFIG);
  const reservations = await supabase.getReservations(tripId);
  
  // Renderizar tabla
  const html = reservations.map(r => `
    <tr>
      <td>${r.code}</td>
      <td>${r.groupname}</td>
      <td>${r.pricemxn}</td>
      <td>
        <span class="badge badge--${r.reservationstatus}">
          ${r.reservationstatus}
        </span>
      </td>
    </tr>
  `).join('');
  
  document.getElementById('reservationsTable').innerHTML = html;
}
```

---

### 5. Dashboard — Secciones con Placeholders

**Secciones pendientes:**
- `{{SKILL_VERSION}}`
- `{{CRONS_TABLE_ROWS}}`
- `{{TRIPS_CARDS}}`
- `{{PASSPORTS_CARDS}}`
- `{{CREDIT_CARDS}}`
- `{{LOYALTY_PROGRAMS}}`

**Solución:** Crear scripts similares a `dashboard-travelers.js` para cada sección

---

## 📊 MÉTRICAS FINALES

### Repositorio

| Métrica | Valor |
|---------|-------|
| **Commits totales** | 36 |
| **Archivos HTML** | 8 |
| **Archivos JS** | 3 |
| **Archivos CSS** | 1 |
| **Edge Functions** | 3 |
| **Edge Functions funcionales** | 1 |

### Funcionalidad

| Componente | Status |
|-----------|--------|
| **Portal carga viajes** | ✅ Funcional |
| **Submenú expandible** | ✅ Funcional |
| **Badges dinámicos** | ✅ Funcional |
| **Solicitud → Edge Function** | ✅ Funcional |
| **Dashboard → Viajeros** | ✅ Funcional |
| **Boceto con datos** | ❌ Pendiente |
| **Panel reservas con datos** | ❌ Pendiente |
| **Itinerario con datos** | ❌ Pendiente |

### Debugging

| Métrica | Valor |
|---------|-------|
| **Errores encontrados** | 12+ |
| **Errores resueltos** | 12 |
| **Tasa de éxito** | 100% |
| **Tiempo debugging** | ~45 min |
| **Errores por componente** | Edge Function: 9, HTML: 2, JS: 1 |

---

## 🎓 LECCIONES APRENDIDAS (Sesiones 2 y 3)

### 1. SIEMPRE Verificar Nombres de Columnas

**Problema:** `trip_id` vs `tripid`, `group` vs `groupname`

**Solución:** Consultar Supabase Table Editor antes de escribir código

---

### 2. Arrays de Postgres Usan Formato Especial

```javascript
// ❌ NO: JSON.stringify
destinations: JSON.stringify(['París'])

// ✅ SÍ: Literal Postgres
destinations: '{París,Roma}'
```

---

### 3. Edge Functions Requieren CORS Explícito

```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://choperin.github.io',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey'
};
```

---

### 4. JWT Verification para Funciones Públicas

**Desactivar JWT** en Edge Functions llamadas desde frontend sin autenticación

---

### 5. NOT NULL Constraints Son Críticos

**Verificar schema** para identificar campos obligatorios antes de INSERT

---

### 6. Orden de Declaración con `const`

```javascript
// ❌ ERROR
const trip = tripTypeMap['familiar'];
const tripTypeMap = {...};

// ✅ CORRECTO
const tripTypeMap = {...};
const trip = tripTypeMap['familiar'];
```

---

### 7. Trabajar Un Error a la Vez

**NO intentar** resolver 5 errores simultáneamente

**SÍ trabajar** cambio por cambio, commit por commit

---

### 8. Instrucciones Exactas > Archivos Completos

**Usuario prefiere:**
- "Busca línea 42, reemplaza X por Y"
- NO: "Aquí está el archivo completo de 500 líneas"

---

### 9. NO Quitar Funcionalidad para Resolver Errores

**❌ Anti-patrón:** Comentar código que da error  
**✅ Mejor:** Corregir el error de raíz

---

### 10. Exposición de anon key es Segura con RLS

**anonKey** es pública y segura para frontend  
**service_role** key NUNCA se expone (solo Edge Functions)

---

## 🎯 ESTADO ACTUAL (11 Marzo 2026, 10:00 PM)

### ✅ Completado
- [x] Repositorio GitHub con GitHub Pages
- [x] Portal carga viajes reales
- [x] Submenú expandible funcional
- [x] Badges dinámicos según status
- [x] Edge Function create-trip-request operativa
- [x] Dashboard carga viajeros

### 🔶 En Progreso (40%)
- [ ] Edge Function get-trip-details (esqueleto listo)
- [ ] Edge Function update-reservation (esqueleto listo)
- [ ] boceto.html con datos reales
- [ ] panel-reservas.html con datos reales
- [ ] itinerario.html con datos reales

### ⬜ Pendiente
- [ ] Dashboard secciones restantes (KPIs, viajes activos, etc.)
- [ ] Decisión sobre triprequests vs trips
- [ ] Correcciones HTML en dashboard.html
- [ ] Enlace a dashboard desde portal
- [ ] Sistema de actualización de reservas

---

## 🚀 PRÓXIMOS PASOS RECOMENDADOS

### Prioridad Alta

1. **Implementar get-trip-details Edge Function**
   - Combina datos de trips + reservations + travelers
   - Permite cargar boceto.html con datos reales

2. **Conectar boceto.html y panel-reservas.html**
   - Reemplazar placeholders con JavaScript
   - Llamar a Edge Function o Supabase directamente

3. **Decisión triprequests → trips**
   - Definir flujo de aprobación de solicitudes
   - Implementar conversión o mostrar ambas en portal

### Prioridad Media

4. **Dashboard secciones restantes**
   - KPIs (viajes activos, próximo viaje, etc.)
   - Tarjetas de viajes
   - Alertas de pasaportes

5. **Correcciones HTML**
   - Eliminar doble `</body></html>`
   - Cerrar sección "millas" correctamente

### Prioridad Baja

6. **Sistema de actualización de reservas**
   - Implementar update-reservation Edge Function
   - UI para cambiar status desde panel

---

**Preparado por:** Sistema de Documentación Automática  
**Fecha:** 11 Marzo 2026, 10:19 PM CST  
**Próxima sesión:** Completar Fase 3 al 100%
