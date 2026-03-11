// config.js - Configuración de Supabase para Agente de Viajes Soffer
// Fase 2: Deployment de Templates
// Última actualización: 11 Marzo 2026

const SUPABASE_CONFIG = {
  url: 'https://afvigphyjeytmmwkhnpf.supabase.co',
  anonKey: 'sb_publishable_Q3ZrKJmdsrVaRjlTNVFReQ_H43hzU-O',
  apiVersion: 'v1'
};

// Configuración de endpoints
const API_ENDPOINTS = {
  trips: '/rest/v1/trips',
  reservations: '/rest/v1/reservations',
  travelers: '/rest/v1/travelers',
  tripTravelers: '/rest/v1/trip_travelers',
  tripRequests: '/rest/v1/trip_requests'
};

// URLs del sistema (actualizar después del deployment)
const SYSTEM_URLS = {
  portal: 'index.html',
  solicitud: 'solicitud.html',
  boceto: 'boceto.html',
  dashboard: 'dashboard.html',
  panelReservas: 'panel-reservas.html',
  itinerario: 'itinerario.html',
  recomendaciones: 'recomendaciones.html'
};

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SUPABASE_CONFIG, API_ENDPOINTS, SYSTEM_URLS };
}
