# 🧳 Agente de Viajes Soffer

**Sistema completo de gestión de viajes** con agente IA conversacional, automatización de reservas y gestión inteligente de itinerarios para la familia Soffer.

![Estado del Proyecto](https://img.shields.io/badge/Estado-Fase%203%20(40%25)-orange)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-success)
![Supabase](https://img.shields.io/badge/Database-Supabase-green)

---

## 🌐 Enlaces Principales

- **🌍 Sitio Web:** [https://choperin.github.io/soffer-travel-agent/](https://choperin.github.io/soffer-travel-agent/)
- **📊 Base de Datos:** [Supabase Dashboard](https://afvigphyjeytmmwkhnpf.supabase.co)
- **📂 Repositorio:** [GitHub - soffer-travel-agent](https://github.com/choperin/soffer-travel-agent/)

---

## 📖 Estado Actual del Proyecto

| Fase   | Nombre                          | Estado          | Fecha Completada |
|--------|--------------------------------|-----------------|------------------|
| **Fase 1** | Fundación Base de Datos         | ✅ **COMPLETADA**   | 10 Mar 2026      |
| **Fase 2** | Deployment de Templates         | ✅ **COMPLETADA**   | 11 Mar 2026      |
| **Fase 2.5**| Submenú Expandible + Badges    | ✅ **COMPLETADA**   | 11 Mar 2026      |
| **Fase 3** | Edge Functions + Conexión       | 🔶 **40% AVANCE**  | En progreso      |
| Fase 4 | Agente IA Conversacional        | ⬜ PENDIENTE    | —                |
| Fase 5 | Interfaces Dinámicas            | ⬜ PENDIENTE    | —                |
| Fase 6 | Notificaciones y Automatización | ⬜ PENDIENTE    | —                |
| Fase 7 | Testing y Refinamiento          | ⬜ PENDIENTE    | —                |
| Fase 8 | Producción y Monitoreo          | ⬜ PENDIENTE    | —                |

### 📊 Métricas del Proyecto

- **Total commits:** 36+
- **Archivos en repositorio:** 12
- **Tablas en Supabase:** 5 principales
- **Edge Functions:** 3 (1 funcional, 2 esqueletos)
- **Páginas con datos reales:** 3
- **Errores resueltos (Sesión 3):** 12+

---

## 🏗️ Arquitectura del Sistema

### Stack Tecnológico

| Capa                | Tecnología               | Estado       |
|---------------------|--------------------------|--------------|
| **Frontend**        | HTML/CSS/JS estático     | ✅ Desplegado |
| **Hosting**         | GitHub Pages             | ✅ Activo     |
| **Base de Datos**   | Supabase (PostgreSQL 15) | ✅ Operacional|
| **Backend API**     | Supabase Edge Functions  | 🔶 En progreso|
| **Orquestación**    | n8n Cloud                | ⬜ Pendiente  |
| **Agente IA**       | Perplexity API (Sonar)   | ⬜ Pendiente  |

### Estructura de Archivos

```
soffer-travel-agent/
├── index.html                 # Portal principal de viajes
├── solicitud.html             # Formulario de solicitud de viaje
├── dashboard.html             # Dashboard del agente
├── panel-reservas.html        # Panel de gestión de reservas
├── itinerario.html            # Itinerario de viaje
├── boceto.html                # Vista previa de boceto
├── recomendaciones.html       # Recomendaciones personalizadas
├── css/
│   └── shared-styles.css      # Estilos compartidos
├── js/
│   ├── config.js              # Configuración de Supabase
│   ├── supabase-client.js     # Cliente REST para Supabase
│   └── dashboard-travelers.js # Gestión de viajeros (Fase 3.2)
├── docs/
│   ├── ROADMAP.md             # Plan completo de implementación
│   ├── SCHEMA.md              # Schema de base de datos
│   ├── CHANGELOG.md           # Historial de cambios
│   ├── sessions/              # Logs de sesiones de trabajo
│   └── guides/                # Guías de configuración
└── README.md                  # Este archivo
```

---

## 🗄️ Base de Datos (Fase 1 ✅)

### Tablas Principales

1. **`trips`** - Viajes principales
2. **`triprequests`** - Solicitudes de viaje
3. **`travelers`** - Datos de viajeros
4. **`reservations`** - Reservas (vuelos, hoteles, actividades)
5. **`trip_travelers`** - Relación viajes-viajeros

### Enums Definidos (6 tipos)

- `triptype`: `'Familiar'`, `'Negocios'`, `'Religioso'`, `'Recreativo'`
- `tripstatus`: `'boceto-pre'`, `'boceto-post'`, `'reservado'`, `'completado'`, `'solicitud'`
- `reservationstatus`: `'pendiente'`, `'confirmado'`, `'cancelado'`
- `groupname`: `'Vuelo'`, `'Hospedaje'`, `'Traslado'`, etc.
- `travelerrole`: `'Adulto'`, `'Menor'`, `'Infante'`

### Datos de Prueba Cargados

- **2 viajes:** Cuatro Ciénegas (real) + Tokio (prueba)
- **5 viajeros:** Moisés, Teresa, Sion, Marcos, Jacqueline
- **60 reservas** distribuidas entre ambos viajes

📄 **Ver detalles completos:** [docs/SCHEMA.md](docs/SCHEMA.md)

---

## 🌐 Frontend y Deployment (Fase 2 ✅)

### Configuración GitHub Pages

- **Repositorio:** Privado con deployment automático
- **URL:** [https://choperin.github.io/soffer-travel-agent/](https://choperin.github.io/soffer-travel-agent/)
- **SSL:** Habilitado por defecto
- **Branch:** `main` (carpeta root)

### Integración con Supabase

```javascript
// config.js
const SUPABASE = {
  url: 'https://afvigphyjeytmmwkhnpf.supabase.co',
  anonKey: 'sbpublishable-Q3ZrKJmds...', // Llave pública con RLS
  apiVersion: 'v1'
};
```

### Funcionalidades Implementadas

- ✅ Portal muestra **2 tarjetas de viajes** con datos reales de Supabase
- ✅ Badges dinámicos según `tripstatus` (Confirmado, En planeación, Solicitud Pendiente)
- ✅ Submenú expandible con 3 opciones: Boceto, Panel de Reservas, Itinerario
- ✅ Bloqueo inteligente de Itinerario hasta que reservas estén 100% confirmadas
- ✅ Formulario de solicitud conectado a Edge Function `create-trip-request`

📄 **Ver detalles completos:** [docs/sessions/SESION-2-FASE-2.md](docs/sessions/SESION-2-FASE-2.md)

---

## 🔌 Backend y APIs (Fase 3 🔶 40% completada)

### Edge Functions en Supabase

| Función                | Estado         | Descripción                           |
|------------------------|----------------|---------------------------------------|
| `create-trip-request`  | ✅ **FUNCIONAL** | POST - Crear solicitud de viaje       |
| `get-trip-details`     | ⬜ Esqueleto    | GET - Obtener detalles de un viaje    |
| `update-reservation`   | ⬜ Esqueleto    | PATCH - Actualizar estado de reserva  |

### Subsecciones Completadas de Fase 3

#### 3.1 ✅ Solicitud de Viaje (COMPLETADO)
- Edge Function `create-trip-request`: **POST funcional**
- `solicitud.html` conectado: envía datos, recibe confirmación
- Mapeo de enums correcto (`tripTypeMap`)
- 9 errores encontrados y corregidos
- **Resultado:** POST 200, registro creado en `triprequests`

#### 3.2 ✅ Dashboard — Viajeros (COMPLETADO)
- `dashboard-travelers.js` carga 5 viajeros desde Supabase
- Tabla renderizada en sección "Viajeros" del dashboard

### Pendientes de Fase 3

#### 3.3 ⬜ Acceso a Dashboard desde Portal
- Agregar enlace/icono a `dashboard.html` en navegación de `index.html`

#### 3.4 ⬜ Viajes Nuevos No Aparecen como Tarjetas
- **Problema:** 2 solicitudes creadas en `triprequests` (status: `pending`)
- Portal lee de tabla `trips`, NO de `triprequests`
- **Decisión necesaria:** Crear proceso de conversión `triprequest → trip` automático

#### 3.5 ⬜ Boceto con Datos Reales
- `boceto.html` tiene placeholders `{{DESTINO}}`, `{{HERO_IMAGE_ALT}}`, etc.
- Necesita JS que lea parámetro `slug` de URL, consulte Supabase, e inyecte datos

#### 3.6 ⬜ Panel de Reservas con Datos Reales
- `panel-reservas.html` tiene placeholders
- Necesita JS que lea parámetro `trip` de URL, consulte `reservations`

#### 3.7 ⬜ Edge Function: `get-trip-details`
- Esqueleto con CORS creado, sin lógica
- Debe retornar: datos del viaje + reservas + viajeros asociados

#### 3.8 ⬜ Edge Function: `update-reservation`
- Esqueleto con CORS creado, sin lógica
- Debe permitir actualizar `reservationstatus` de una reserva

#### 3.9 ⬜ Dashboard — Viajes Activos y KPIs
- Reemplazar `{{TRIPS_CARDS}}` con tarjetas reales
- Calcular KPIs: viajes activos, próximo viaje, etc.

#### 3.10 ⬜ Correcciones HTML Dashboard
- Eliminar doble `</body></html>`
- Cerrar `</section>` de millas antes de Viajeros

📄 **Ver plan detallado:** [docs/ROADMAP.md](docs/ROADMAP.md) (Fase 3 expandida)

---

## 📚 Documentación Adicional

### 📖 Guías de Configuración

- **[SUPABASE-SETUP.md](docs/guides/SUPABASE-SETUP.md)** - Configurar API keys y Edge Functions
- **[GITHUB-PAGES-SETUP.md](docs/guides/GITHUB-PAGES-SETUP.md)** - Configurar deployment automático
- **[LECCIONES-APRENDIDAS.md](docs/guides/LECCIONES-APRENDIDAS.md)** - 10 lecciones clave de debugging

### 📝 Logs de Sesiones de Trabajo

- **[SESION-1-FASE-1.md](docs/sessions/SESION-1-FASE-1.md)** - Fundación de base de datos (10 Mar 2026)
- **[SESION-2-FASE-2.md](docs/sessions/SESION-2-FASE-2.md)** - Deployment de templates (11 Mar 2026)
- **[SESION-3-FASE-2.5.md](docs/sessions/SESION-3-FASE-2.5.md)** - Submenú expandible (11 Mar 2026)
- **[SESION-4-FASE-3.md](docs/sessions/SESION-4-FASE-3.md)** - Edge Functions (En progreso)

### 📊 Roadmap y Schema

- **[ROADMAP.md](docs/ROADMAP.md)** - Plan completo de implementación v4.0
- **[SCHEMA.md](docs/SCHEMA.md)** - Schema de base de datos v8.0
- **[CHANGELOG.md](docs/CHANGELOG.md)** - Historial de cambios acumulativo

---

## 🎯 Próximos Pasos (Sesión 4)

### Prioridad 1: Completar Fase 3 (1-2 sesiones restantes)

1. **Corregir HTML dashboard** (5 min)
   - Cerrar `</section>` de millas
   - Eliminar doble `</body></html>`

2. **Agregar enlace a Dashboard** (10 min)
   - Icono de grilla 4 cuadros en navegación de `index.html`

3. **Resolver viajes nuevos como tarjetas** (30 min)
   - Modificar `create-trip-request` para insertar también en `trips`
   - Agregar badge "Solicitud Pendiente" en portal

4. **Boceto con datos reales** (45 min)
   - Script que lee `slug` de URL
   - Consulta `getTripBySlug()`
   - Reemplaza placeholders dinámicamente

5. **Panel de Reservas con datos reales** (30 min)
   - Script que lee `trip` de URL
   - Consulta `getReservations(tripId)`
   - Renderiza tabla con badges de estado

6. **Completar Edge Functions** (30 min)
   - Implementar lógica de `get-trip-details`
   - Implementar lógica de `update-reservation`

### Prioridad 2: Dashboard KPIs (Fase 3.9)

- Calcular viajes activos
- Mostrar próximo viaje
- Estadísticas de reservas

📄 **Ver plan completo:** [docs/sessions/SESION-4-FASE-3.md](docs/sessions/SESION-4-FASE-3.md)

---

## 🛠️ Comandos Útiles

### Desarrollo Local

```bash
# Clonar repositorio
git clone https://github.com/choperin/soffer-travel-agent.git
cd soffer-travel-agent

# Abrir en navegador local (sin servidor)
# Solo abre index.html con navegador
```

### Deployment (Automático)

```bash
# Hacer cambios y subir a GitHub
git add .
git commit -m "Descripción del cambio"
git push origin main

# GitHub Pages se actualiza automáticamente en 1-2 minutos
```

### Probar Edge Functions (Supabase)

```bash
# Llamar a create-trip-request desde terminal
curl -X POST \
  https://afvigphyjeytmmwkhnpf.supabase.co/functions/v1/create-trip-request \
  -H "Content-Type: application/json" \
  -d '{
    "destinations": ["París"],
    "datestart": "2026-06-01",
    "dateend": "2026-06-10",
    "triptype": "Familiar"
  }'
```

---

## 🐛 Troubleshooting

### Error: "Viajes no se muestran en portal"

**Causa:** Columna `startdate` no existe en tabla `trips`  
**Solución:** Usar `datestart` en vez de `startdate` en `getTrips()`

```javascript
// ❌ INCORRECTO
.order('startdate.desc')

// ✅ CORRECTO
.order('datestart', { ascending: false })
```

### Error: "Enums no coinciden"

**Causa:** Enums de Postgres son case-sensitive  
**Solución:** Verificar valores exactos en Supabase antes de INSERT

```javascript
// Valores correctos de triptype
const validTripTypes = ['Familiar', 'Negocios', 'Religioso', 'Recreativo'];
```

### Error: "Arrays de Postgres no se insertan"

**Causa:** Arrays NO son JSON  
**Solución:** Usar formato PostgreSQL `{val1,val2}`

```javascript
// ❌ INCORRECTO
destinations: JSON.stringify(['París', 'Roma'])

// ✅ CORRECTO
destinations: '{París,Roma}'
```

📄 **Ver más:** [docs/guides/LECCIONES-APRENDIDAS.md](docs/guides/LECCIONES-APRENDIDAS.md)

---

## 👥 Equipo

- **Desarrollador Principal:** Moisés Choppe Rinquet
- **Asistente IA:** Perplexity
- **Familia Usuaria:** Familia Soffer

---

## 📄 Licencia

Este proyecto es privado y de uso exclusivo para la familia Soffer.

---

**Última actualización:** 11 Marzo 2026, 10:19 PM CST  
**Versión del Roadmap:** v4.0  
**Estado:** Fase 3 (40% completada)
