// js/dashboard-travelers.js
// Lectura básica de viajeros para el dashboard usando el cliente global supabase

async function loadTravelersForDashboard() {
  try {
    // Usa el cliente Supabase que ya tienes definido en supabase-client.js
    const travelers = await supabase.query('/travelers', {
      params: { select: '*' }
    });

    renderTravelersTable(travelers);
  } catch (err) {
    console.error('Error cargando travelers:', err);
    const container = document.getElementById('travelersTable');
    if (container) {
      container.innerHTML = '<p class="text-muted">Error al cargar viajeros.</p>';
    }
  }
}

function renderTravelersTable(travelers) {
  const container = document.getElementById('travelersTable');
  if (!container) return;

  if (!travelers || travelers.length === 0) {
    container.innerHTML = '<p class="text-muted">No hay viajeros registrados.</p>';
    return;
  }

  const rows = travelers.map(t => `
    <tr>
      <td>${t.firstname || ''} ${t.lastname || ''}</td>
      <td>${t.email || '-'}</td>
      <td>${t.phone || '-'}</td>
      <td>${t.birthdate || '-'}</td>
    </tr>
  `).join('');

  container.innerHTML = `
    <table class="simple-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Fecha de nacimiento</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

// Ejecutar automáticamente cuando cargue el dashboard
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('travelersTable')) {
    loadTravelersForDashboard();
  }
});
