// dashboard-trips.js — Carga viajes para el dashboard
(async function loadTripsForDashboard() {
  const container = document.getElementById('tripsTable');
  if (!container) return;

  try {
    const trips = await supabase.getTrips();
    if (!trips || trips.length === 0) {
      container.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:20px">No hay viajes registrados</p>';
      return;
    }

    let html = '<table style="width:100%;border-collapse:collapse;font-size:14px">';
    html += '<thead><tr style="border-bottom:2px solid var(--border,#E2DDD4);text-align:left">';
    html += '<th style="padding:10px">Destino</th>';
    html += '<th style="padding:10px">Fechas</th>';
    html += '<th style="padding:10px">Tipo</th>';
    html += '<th style="padding:10px">Status</th>';
    html += '<th style="padding:10px">Acciones</th>';
    html += '</tr></thead><tbody>';

    trips.forEach(trip => {
      const startDate = trip.start_date ? new Date(trip.start_date).toLocaleDateString('es-MX') : 'Sin fecha';
      const endDate = trip.end_date ? new Date(trip.end_date).toLocaleDateString('es-MX') : 'Sin fecha';
      const tripType = trip.trip_type || 'No especificado';
      const status = trip.status || 'pending';
      
      // Badge de status con colores
      let statusBadge = '';
      if (status === 'confirmed') {
        statusBadge = '<span style="background:#d4edda;color:#155724;padding:4px 8px;border-radius:4px;font-size:12px">Confirmado</span>';
      } else if (status === 'pending') {
        statusBadge = '<span style="background:#fff3cd;color:#856404;padding:4px 8px;border-radius:4px;font-size:12px">Pendiente</span>';
      } else if (status === 'completed') {
        statusBadge = '<span style="background:#d1ecf1;color:#0c5460;padding:4px 8px;border-radius:4px;font-size:12px">Completado</span>';
      } else {
        statusBadge = '<span style="background:#f8d7da;color:#721c24;padding:4px 8px;border-radius:4px;font-size:12px">Cancelado</span>';
      }

      html += '<tr style="border-bottom:1px solid var(--border,#E2DDD4)">';
      html += `<td style="padding:10px"><strong>${trip.destination || 'Sin destino'}</strong></td>`;
      html += `<td style="padding:10px">${startDate} - ${endDate}</td>`;
      html += `<td style="padding:10px">${tripType}</td>`;
      html += `<td style="padding:10px">${statusBadge}</td>`;
      html += `<td style="padding:10px">`;
      html += `<button onclick="viewTrip('${trip.id}')" style="background:var(--color-primary);color:white;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:12px">Ver detalles</button>`;
      html += `</td>`;
      html += '</tr>';
    });

    html += '</tbody></table>';
    container.innerHTML = html;

  } catch (error) {
    console.error('Error cargando viajes:', error);
    container.innerHTML = '<p style="color:red;text-align:center;padding:20px">Error al cargar viajes</p>';
  }
})();

// Función para ver detalles de un viaje
function viewTrip(tripId) {
  window.location.href = `itinerario.html?trip_id=${tripId}`;
}
