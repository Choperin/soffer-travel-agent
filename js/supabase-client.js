// supabase-client.js - Cliente para interactuar con Supabase
// Agente de Viajes Soffer v8.0
// Última actualización: 11 Marzo 2026

class SupabaseClient {
  constructor(config) {
    this.url = config.url;
    this.key = config.anonKey;
    this.headers = {
      'apikey': this.key,
      'Authorization': `Bearer ${this.key}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    };
  }

  // Método genérico para hacer queries
  async query(endpoint, options = {}) {
    const { method = 'GET', body = null, params = {} } = options;
    
    // Construir URL con parámetros
    const url = new URL(`${this.url}/rest/v1${endpoint}`);
    Object.keys(params).forEach(key => {
      url.searchParams.append(key, params[key]);
    });

    const fetchOptions = {
      method,
      headers: this.headers
    };

    if (body && (method === 'POST' || method === 'PATCH')) {
      fetchOptions.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url.toString(), fetchOptions);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Supabase query error:', error);
      throw error;
    }
  }

  // Obtener todos los viajes
async getTrips() {
  return this.query('/trips', {
    params: { 
      select: '*',
      order: 'datestart.asc'
    }
  });
}



  // Obtener un viaje por slug
  async getTripBySlug(slug) {
    const trips = await this.query('/trips', {
      params: { 
        slug: `eq.${slug}`,
        select: '*'
      }
    });
    return trips[0] || null;
  }

  // Obtener reservas de un viaje
async getReservations(tripId) {
  return this.query('/reservations', {
    params: { 
      tripid: `eq.${tripId}`,        // antes: trip_id
      select: '*',
      order: 'group,code'            // antes: group_name,code
    }
  });
}

// Obtener viajeros de un viaje
async getTripTravelers(tripId) {
  return this.query('/triptravelers', {   // antes: /trip_travelers
    params: { 
      tripid: `eq.${tripId}`,            // antes: trip_id
      select: 'travelerid,role,travelers(*)' // antes: traveler_id
    }
  });
}
  // Crear nueva solicitud de viaje
  async createTripRequest(data) {
    return this.query('/trip_requests', {
      method: 'POST',
      body: {
        destinations: data.destinations,
        start_date: data.start_date,
        end_date: data.end_date,
        num_travelers: data.num_travelers,
        trip_type: data.trip_type,
        budget_min: data.budget_min,
        budget_max: data.budget_max,
        activities: data.activities,
        comments: data.comments,
        request_status: 'nueva'
      }
    });
  }

  // Actualizar estado de reserva
  async updateReservation(reservationId, updates) {
    return this.query(`/reservations?id=eq.${reservationId}`, {
      method: 'PATCH',
      body: updates
    });
  }

  // Verificar conexión
  async testConnection() {
    try {
      await this.query('/trips', { params: { limit: 1 } });
      console.log('✅ Conexión a Supabase exitosa');
      return true;
    } catch (error) {
      console.error('❌ Error de conexión a Supabase:', error);
      return false;
    }
  }
}

// Inicializar cliente global
const supabase = new SupabaseClient(SUPABASE_CONFIG);

// Test de conexión al cargar (solo en desarrollo)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  supabase.testConnection();
}

// Exportar
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SupabaseClient;
}
