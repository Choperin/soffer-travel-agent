## Registro de Cambios v8.0-sp → v9.0-simple (marzo 2026)

### Secciones modificadas (lógica técnica del stack):
- Metadata/encabezado: nombre de versión y stack actualizado
- S0.7: Resumen operativo actualizado con nuevo stack
- S0.6: Orden de herramientas externas → reemplaza Amadeus + Browserless
- S35: APIs Externas → reemplaza Amadeus + Browserless + LangGraph
- S35b: Cache → sin cambios de lógica, referencias actualizadas a Firecrawl
- S37: Auto-actualización → sub-agentes como n8n workflows en lugar de Python
- S45: Modelos → LIGERO cambia de Gemini Flash a GPT-4o-mini

### Secciones SIN cambios (lógica de viajes intacta):
S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15,
S16, S17, S18, S19, S20, S21, S22, S23, S24, S25, S26, S27, S28,
S29, S30, S31, S32, S33, S34, S36, S38, S39, S40, S41, S42, S43, S44, S46

### Herramientas deprecadas:
- ❌ Amadeus Self-Service API → reemplazada por Firecrawl
- ❌ Browserless → reemplazado por n8n + Playwright (incluido en n8n)
- ❌ LangGraph (Python) → reemplazado por n8n workflows visuales
- ❌ Gemini 3 Flash como LIGERO → reemplazado por GPT-4o-mini

### Herramientas nuevas:
- ✅ Firecrawl API (scraping vuelos, hoteles, actividades, restaurantes)
- ✅ n8n Playwright node (navegación y automatización de reservas)
- ✅ GPT-4o-mini como modelo LIGERO estándar
- ✅ n8n AI Agent workflows (orquestación visual multi-agente)
