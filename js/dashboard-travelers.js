// js/dashboard-travelers.js
// Lectura básica de viajeros para dashboard.html

async function loadTravelersForDashboard() {
  try {
    const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/travelers?select=*`, {
      headers: {
        apikey: SUPABASE_CONFIG.anonKey,
        Authorization: `Bearer ${SUPABASE_CONFIG.anonKey}`
      }
    });

    if (!res.ok) {
      console.error('Error cargando travelers:', await res.text());
      return;
    }

    const travelers = await res.json();
    renderTravelersTable(travelers);
  } catch (err) {
    console.error('Error de red cargando travelers:', err);
  }
}

function renderTravelersTable(travelers) {
  const container = document.getElementById('travelersTable');
  if (!container) return;

  if (!travelers.length) {
    container.innerHTML = '<p>No hay viajeros registrados.</p>';
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

// auto-run si estamos en dashboard
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('travelersTable')) {
    loadTravelersForDashboard();
  }
});
