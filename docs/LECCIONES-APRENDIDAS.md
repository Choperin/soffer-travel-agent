# 🎓 LECCIONES APRENDIDAS — AGENTE DE VIAJES SOFFER

**Documento de debugging y mejores prácticas** acumuladas durante el desarrollo del proyecto.

---

## 📚 Índice

1. [Lecciones de Sesión 3 (Fase 3)](#sesión-3-fase-3)
2. [Lecciones de Sesión 2 (Fase 2)](#sesión-2-fase-2)
3. [Lecciones de Sesión 1 (Fase 1)](#sesión-1-fase-1)
4. [Mejores Prácticas Generales](#mejores-prácticas-generales)
5. [Errores Comunes y Soluciones](#errores-comunes-y-soluciones)

---

## 🔶 SESIÓN 3 (FASE 3) - 11 Marzo 2026

### Lección #1: Verificar nombres de columnas ANTES de escribir queries

**Problema:**
```javascript
// ❌ INCORRECTO
.order('startdate.desc')

// Error: column trips.startdate does not exist
```

**Causa:** Asumí que la columna se llamaba `startdate`, pero en el schema real es `datestart`.

**Solución:**
```javascript
// ✅ CORRECTO
.order('datestart', { ascending: false })
```

**Regla:**
- **SIEMPRE** verificar nombres de columnas en Supabase Table Editor antes de escribir código
- **NUNCA** asumir nombres de columnas basándose en convenciones
- Mantener documentación de schema actualizada

---

### Lección #2: Enums de Postgres son case-sensitive

**Problema:**
```sql
INSERT INTO trips (triptype) VALUES ('familiar');
-- Error: invalid input value for enum triptype: "familiar"
```

**Causa:** El enum está definido con `'Familiar'` (mayúscula), pero intenté insertar `'familiar'` (minúscula).

**Solución:**
```sql
-- ✅ CORRECTO
INSERT INTO trips (triptype) VALUES ('Familiar');
```

**Valores exactos documentados:**
```javascript
const validTripTypes = ['Familiar', 'Negocios', 'Religioso', 'Recreativo'];
const validTripStatus = ['boceto-pre', 'boceto-post', 'reservado', 'completado', 'solicitud'];
const validReservationStatus = ['pendiente', 'confirmado', 'cancelado'];
```

**Regla:**
- **Documentar** todos los valores de enum con capitalización exacta
- **Crear mapeos** en JavaScript para conversión automática
- **Validar** valores antes de enviar a la base de datos

---

### Lección #3: Arrays de Postgres NO son JSON

**Problema:**
```javascript
// ❌ INCORRECTO
destinations: JSON.stringify(['París', 'Roma'])
// Resultado en DB: "[\"París\",\"Roma\"]" (string JSON, no array)
```

**Causa:** PostgreSQL tiene su propio formato de arrays: `{val1,val2}`

**Solución:**
```javascript
// ✅ CORRECTO
destinations: `{${destinations.join(',')}}`
// Resultado en DB: {París,Roma} (array nativo de Postgres)
```

**Regla:**
- **NO usar** `JSON.stringify()` para arrays de Postgres
- **Usar** formato `{val1,val2}` con template literals
- **Alternativa:** Usar `ARRAY['val1', 'val2']` en SQL directo

---

### Lección #4: Edge Functions requieren CORS explícito

**Problema:**
```typescript
// ❌ Sin CORS configurado
return new Response(JSON.stringify(data));
// Error en frontend: CORS policy blocked
```

**Solución:**
```typescript
// ✅ CORS completo
return new Response(JSON.stringify(data), {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  }
});
```

**Regla:**
- **SIEMPRE** incluir headers CORS en Edge Functions llamadas desde frontend
- **Manejar** método OPTIONS para preflight requests
- **Especificar** origins permitidos (o `*` para desarrollo)

---

### Lección #5: JWT verification debe desactivarse para funciones públicas

**Problema:**
```typescript
// Edge Function con JWT habilitado por defecto
// Error: Missing or invalid JWT
```

**Causa:** Edge Functions de Supabase verifican JWT automáticamente, pero llamadas desde frontend sin auth fallan.

**Solución:**
```typescript
// En Supabase Dashboard > Edge Functions > Settings
// Desactivar "Require JWT" para funciones públicas
```

**O en código:**
```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Manejar OPTIONS request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  
  // Tu lógica aquí
})
```

**Regla:**
- **Desactivar** JWT verification para Edge Functions llamadas desde frontend sin autenticación
- **Activar** solo para funciones que requieren autenticación
- **Usar** RLS (Row Level Security) en tablas para seguridad

---

### Lección #6: NOT NULL constraints causan errores silenciosos

**Problema:**
```javascript
// ❌ Falta campo obligatorio
const payload = {
  tripname: 'París',
  destination: 'París, Francia'
  // Falta triptype (NOT NULL)
};
// Error: null value in column "triptype" violates not-null constraint
```

**Solución:**
```javascript
// ✅ Todos los campos obligatorios presentes
const payload = {
  tripname: 'París',
  destination: 'París, Francia',
  triptype: 'Familiar', // ← Campo obligatorio
  datestart: '2026-06-01',
  dateend: '2026-06-10'
};
```

**Regla:**
- **Verificar** schema para identificar campos `NOT NULL`
- **Validar** payload antes de enviar a Edge Function
- **Proveer** valores default cuando sea apropiado
- **Loggear** errores completos en desarrollo

---

### Lección #7: Orden de declaración de variables con `const`

**Problema:**
```javascript
// ❌ Usar variable antes de declararla
const trip = await fetchTrip(tripId);
const tripId = params.get('trip'); // Error: Cannot access 'tripId' before initialization
```

**Causa:** `const` y `let` NO tienen hoisting como `var`.

**Solución:**
```javascript
// ✅ Declarar antes de usar
const tripId = params.get('trip');
const trip = await fetchTrip(tripId);
```

**Regla:**
- **Declarar** variables en orden de uso
- **NO asumir** hoisting con `const`/`let`
- **Estructurar** código de arriba hacia abajo

---

### Lección #8: Trabajar cambio por cambio, error por error

**Experiencia:**
Intentar resolver 5 errores simultáneamente resultó en confusión y regresiones.

**Estrategia efectiva:**
1. **Identificar** un solo error
2. **Reproducir** el error de forma aislada
3. **Resolver** ese error específico
4. **Verificar** que el fix funciona
5. **Commit** el cambio
6. **Repetir** con siguiente error

**Regla:**
- **NO intentar** arreglar todo de golpe
- **Hacer commits** pequeños y frecuentes
- **Probar** después de cada cambio
- **Documentar** cada solución

---

### Lección #9: Instrucciones exactas > Archivos completos

**Preferencia del usuario:**
```
❌ "Aquí está el archivo HTML completo actualizado (500 líneas)"
✅ "Busca línea 42: `<div class="old">` y reemplázala por `<div class="new">`"
```

**Razones:**
- Usuario edita directo en GitHub
- 0 conocimiento en programación
- Archivos completos son difíciles de comparar
- Instrucciones exactas son más rápidas

**Regla:**
- **Especificar** exactamente qué buscar
- **Proveer** la línea exacta a reemplazar
- **Indicar** ubicación en el archivo (inicio, fin, antes de X)
- **NO enviar** archivos completos a menos que sea necesario

---

### Lección #10: NO quitar funcionalidad para resolver errores

**Anti-patrón:**
```javascript
// ❌ Comentar código que da error
// const trips = await supabase.getTrips();
// return trips;
```

**Mejor enfoque:**
```javascript
// ✅ Corregir el error de raíz
const trips = await supabase
  .from('trips')
  .select('*')
  .order('datestart', { ascending: false }); // ← Columna corregida
return trips;
```

**Regla:**
- **NUNCA** comentar/eliminar funcionalidad para "resolver" un error
- **Encontrar** la causa raíz del problema
- **Corregir** el problema de fondo
- **Mantener** toda la funcionalidad operativa

---

## 🔷 SESIÓN 2 (FASE 2) - 11 Marzo 2026

### Lección #11: Script duplicado en `<head>` causa errores

**Problema:**
```html
<head>
  <script src="js/supabase-client.js"></script>
</head>
<body>
  <!-- contenido -->
  <script src="js/supabase-client.js"></script> <!-- ❌ Duplicado -->
</body>
```

**Error:**
```
Uncaught SyntaxError: Identifier 'SupabaseClient' has already been declared
```

**Solución:**
```html
<head>
  <script src="js/config.js"></script>
  <script src="js/supabase-client.js"></script> <!-- ✅ Una sola vez -->
</head>
<body>
  <!-- contenido -->
  <script>
    // Usar SupabaseClient aquí
  </script>
</body>
```

**Regla:**
- **Una sola referencia** a cada script en el documento
- **En `<head>`** para scripts que definen clases/configuración
- **Antes de `</body>`** para scripts que manipulan DOM

---

### Lección #12: Placeholders en bloques `<script>` rompen JavaScript

**Problema:**
```html
<script>
  const year = {{TRIP_YEAR}}; // ❌ Placeholder dentro de JS
  const month = {{TRIP_MONTH}};
</script>
```

**Error:**
```
Uncaught SyntaxError: Unexpected token '{'
```

**Solución:**
```html
<!-- ✅ Opción 1: Eliminar placeholders de JS ejecutable -->
<script>
  const year = 2026; // Valor real
  const month = 4;
</script>

<!-- ✅ Opción 2: Cargar datos dinámicamente -->
<script>
  async function loadTripData() {
    const trip = await supabase.getTripBySlug(slug);
    const year = new Date(trip.datestart).getFullYear();
  }
</script>
```

**Regla:**
- **NUNCA** usar placeholders `{{VAR}}` dentro de bloques `<script>`
- **Placeholders** solo en HTML/texto visible
- **Datos dinámicos** desde JavaScript (consultas a Supabase)

---

### Lección #13: Exposición de anon key es segura con RLS

**Duda inicial:**
> "¿Es seguro exponer `anonKey` en `config.js` público?"

**Respuesta:**
✅ **SÍ**, es seguro porque:
1. `anonKey` es una **llave pública** diseñada para frontend
2. **Row Level Security (RLS)** protege los datos en Supabase
3. `anonKey` tiene **permisos limitados** (solo lectura pública)
4. `service_role` key **NUNCA** debe exponerse

**Configuración correcta:**
```javascript
// config.js (público)
const SUPABASE = {
  url: 'https://proyecto.supabase.co',
  anonKey: 'eyJ...' // ✅ OK exponer
};

// .env.local (privado, NUNCA subir a GitHub)
SUPABASE_SERVICE_ROLE_KEY=eyJ... // ❌ NUNCA exponer
```

**Regla:**
- **`anonKey`** → Seguro en frontend
- **`service_role` key** → Solo en backend/Edge Functions
- **RLS habilitado** → Protección de datos en base de datos

---

## 🔵 SESIÓN 1 (FASE 1) - 10 Marzo 2026

### Lección #14: Enums deben verificarse antes de INSERT

**Problema:**
```sql
INSERT INTO trips (triptype) VALUES ('vacation');
-- Error: invalid input value for enum triptype: "vacation"
```

**Causa:** Enum no tiene valor `'vacation'`, solo `'Familiar'`, `'Negocios'`, `'Religioso'`, `'Recreativo'`.

**Solución:**
```sql
-- 1. Verificar valores del enum
SELECT enum_range(NULL::triptype);
-- Resultado: {Familiar,Negocios,Religioso,Recreativo}

-- 2. Usar valor válido
INSERT INTO trips (triptype) VALUES ('Familiar');
```

**Regla:**
- **Consultar** `enum_range(NULL::enumtype)` para ver valores válidos
- **Documentar** enums en archivo separado (SCHEMA.md)
- **Crear** diccionarios/mapeos en código

---

### Lección #15: Contar columnas = valores en INSERT

**Problema:**
```sql
INSERT INTO trips (tripid, tripname, destination)
VALUES ('uuid', 'París'); -- ❌ Faltan valores
-- Error: INSERT has more target columns than expressions
```

**Solución:**
```sql
INSERT INTO trips (tripid, tripname, destination)
VALUES ('uuid', 'París', 'París, Francia'); -- ✅ Mismo número
```

**Regla:**
- **Contar** columnas en lista
- **Contar** valores en VALUES
- **Verificar** que números coincidan

---

### Lección #16: UUID deben ser únicos

**Problema:**
```sql
INSERT INTO trips (tripid) VALUES ('550e8400-...');
INSERT INTO trips (tripid) VALUES ('550e8400-...'); -- ❌ Duplicado
-- Error: duplicate key value violates unique constraint
```

**Solución:**
```sql
-- Generar UUID único
SELECT gen_random_uuid();
-- Resultado: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'

INSERT INTO trips (tripid) VALUES ('a1b2c3d4-e5f6-7890-abcd-ef1234567890');
```

**Herramientas:**
- Supabase UI: Auto-genera UUIDs
- SQL: `gen_random_uuid()`
- JavaScript: `crypto.randomUUID()`

---

### Lección #17: Foreign keys requieren orden de inserción

**Problema:**
```sql
-- ❌ Insertar hijo antes que padre
INSERT INTO reservations (tripid) VALUES ('trip-uuid-1'); -- Error: foreign key violation
INSERT INTO trips (tripid) VALUES ('trip-uuid-1');
```

**Solución:**
```sql
-- ✅ Insertar padre primero
INSERT INTO trips (tripid) VALUES ('trip-uuid-1');
INSERT INTO reservations (tripid) VALUES ('trip-uuid-1'); -- Ahora funciona
```

**Orden correcto:**
1. `trips` (parent)
2. `travelers` (parent)
3. `triprequests` (child de trips)
4. `reservations` (child de trips)
5. `trip_travelers` (child de trips + travelers)

---

## 📋 MEJORES PRÁCTICAS GENERALES

### Desarrollo Frontend

1. **Verificar schema antes de escribir queries**
   ```javascript
   // Consultar en Supabase Table Editor primero
   // Luego escribir código
   ```

2. **Validar datos antes de enviar**
   ```javascript
   if (!triptype || !validTripTypes.includes(triptype)) {
     throw new Error('Invalid trip type');
   }
   ```

3. **Manejar errores explícitamente**
   ```javascript
   try {
     const data = await supabase.getTrips();
   } catch (error) {
     console.error('Error loading trips:', error);
     showErrorMessage(error.message);
   }
   ```

4. **Usar funciones helper para formateo**
   ```javascript
   const formatDate = (date) => new Date(date).toLocaleDateString('es-MX');
   const formatPrice = (num) => num.toLocaleString('es-MX');
   ```

---

### Desarrollo Backend (Edge Functions)

1. **Siempre incluir CORS**
   ```typescript
   const corsHeaders = {
     'Access-Control-Allow-Origin': '*',
     'Content-Type': 'application/json'
   };
   ```

2. **Validar payload completo**
   ```typescript
   const requiredFields = ['tripname', 'destination', 'datestart'];
   const missing = requiredFields.filter(f => !payload[f]);
   if (missing.length > 0) {
     throw new Error(`Missing fields: ${missing.join(', ')}`);
   }
   ```

3. **Loggear para debugging**
   ```typescript
   console.log('Received payload:', JSON.stringify(payload));
   console.log('Database result:', data);
   ```

4. **Retornar respuestas consistentes**
   ```typescript
   return new Response(JSON.stringify({
     success: true,
     data: result
   }), { headers: corsHeaders });
   ```

---

### Debugging

1. **Aislar el problema**
   - Reproducir error en contexto mínimo
   - Eliminar variables no relacionadas
   - Probar una cosa a la vez

2. **Verificar datos en cada paso**
   ```javascript
   console.log('1. Params:', params);
   console.log('2. Slug:', slug);
   console.log('3. Trip:', trip);
   ```

3. **Consultar documentación oficial**
   - Supabase Docs
   - PostgreSQL Docs
   - MDN Web Docs

4. **Documentar soluciones**
   - Agregar a este archivo
   - Comentar código con explicación
   - Actualizar README si aplica

---

## 🔴 ERRORES COMUNES Y SOLUCIONES

### Error: "column does not exist"

**Causa:** Nombre de columna incorrecto  
**Solución:** Verificar schema en Supabase Table Editor

---

### Error: "invalid input value for enum"

**Causa:** Valor de enum con capitalización incorrecta  
**Solución:** Usar valores exactos documentados en SCHEMA.md

---

### Error: "CORS policy blocked"

**Causa:** Headers CORS faltantes en Edge Function  
**Solución:** Agregar headers CORS completos

---

### Error: "SupabaseClient already declared"

**Causa:** Script incluido dos veces  
**Solución:** Una sola referencia en `<head>`

---

### Error: "Unexpected token {"

**Causa:** Placeholders `{{VAR}}` dentro de `<script>`  
**Solución:** Eliminar placeholders de JS ejecutable

---

### Error: "foreign key violation"

**Causa:** Insertar child antes que parent  
**Solución:** Insertar parents primero (trips, travelers), luego children

---

### Error: "null value violates not-null constraint"

**Causa:** Campo obligatorio faltante  
**Solución:** Proveer todos los campos NOT NULL

---

## 🎯 Resumen de Lecciones Clave

1. ✅ Verificar schema antes de escribir queries
2. ✅ Enums son case-sensitive
3. ✅ Arrays de Postgres usan formato `{val1,val2}`
4. ✅ Edge Functions necesitan CORS explícito
5. ✅ JWT verification desactivar para funciones públicas
6. ✅ NOT NULL constraints verificar antes de INSERT
7. ✅ Variables `const` declarar en orden de uso
8. ✅ Trabajar un error a la vez
9. ✅ Instrucciones exactas > archivos completos
10. ✅ NO quitar funcionalidad, corregir de raíz
11. ✅ Scripts únicos en documento
12. ✅ Placeholders solo en HTML, no en JS
13. ✅ `anonKey` es seguro exponer con RLS
14. ✅ Verificar enums antes de INSERT
15. ✅ Contar columnas = valores
16. ✅ UUIDs únicos siempre
17. ✅ Foreign keys: parents antes que children

---

**Última actualización:** 11 Marzo 2026, 10:19 PM CST  
**Mantenido por:** Equipo de desarrollo
