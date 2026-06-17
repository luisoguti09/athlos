class AdminDashboard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 20px;
                    border: 1px solid #0056b3;
                    background-color: #e6f7ff;
                    border-radius: 8px;
                    text-align: left;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    color: #333;
                }
                h2 {
                    color: #0056b3;
                    margin-top: 0;
                }
                p {
                    line-height: 1.6;
                }
                .card {
                    background-color: #ffffff;
                    border: 1px solid #b3d9ff;
                    border-radius: 5px;
                    padding: 15px;
                    margin-top: 15px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                }
            </style>
            <h2>Dashboard de Administrador</h2>
            <p>Aquí tienes una vista general de la administración del club.</p>
            <div class="card">
                <h3>Gestión de Usuarios</h3>
                <p>Acceso completo para crear, editar y eliminar usuarios y sus roles.</p>
                <ul>
                    <li>Ver todos los socios</li>
                    <li>Asignar roles</li>
                    <li>Gestionar permisos</li>
                </ul>
            </div>
            <div class="card">
                <h3>Configuración del Sistema</h3>
                <p>Ajustes globales de la aplicación.</p>
            </div>
            <div class="card approval-card">
                <h3>Aprobaciones Pendientes de Socios</h3>
                <div id="pendingUsersList">
                    <p>Cargando usuarios pendientes...</p>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        console.log("Admin Dashboard cargado.");
        this.loadPendingUsers();
    }

    async loadPendingUsers() {
        const pendingUsersListDiv = this.shadowRoot.getElementById('pendingUsersList');
        pendingUsersListDiv.innerHTML = '<p>Cargando usuarios pendientes...</p>'; // Mostrar mensaje de carga

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/admin/pending-approvals', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                if (data.length === 0) {
                    pendingUsersListDiv.innerHTML = '<p>No hay socios pendientes de aprobación.</p>';
                } else {
                    const ul = document.createElement('ul');
                    ul.style.listStyle = 'none';
                    ul.style.padding = '0';
                    data.forEach(user => {
                        const li = document.createElement('li');
                        li.style.display = 'flex';
                        li.style.justifyContent = 'space-between';
                        li.style.alignItems = 'center';
                        li.style.backgroundColor = '#f0f0f0';
                        li.style.padding = '10px';
                        li.style.marginBottom = '8px';
                        li.style.borderRadius = '5px';
                        li.innerHTML = `
                            <span>${user.email} (Registrado: ${new Date(user.createdAt).toLocaleDateString()})</span>
                            <button data-user-id="${user.id}">Aprobar</button>
                        `;
                        const approveButton = li.querySelector('button');
                        approveButton.style.backgroundColor = '#28a745';
                        approveButton.style.color = 'white';
                        approveButton.style.border = 'none';
                        approveButton.style.padding = '8px 15px';
                        approveButton.style.borderRadius = '4px';
                        approveButton.style.cursor = 'pointer';
                        approveButton.style.transition = 'background-color 0.3s ease';
                        approveButton.addEventListener('mouseover', () => approveButton.style.backgroundColor = '#218838');
                        approveButton.addEventListener('mouseout', () => approveButton.style.backgroundColor = '#28a745');
                        approveButton.addEventListener('click', () => this.approveUser(user.id));
                        ul.appendChild(li);
                    });
                    pendingUsersListDiv.innerHTML = '';
                    pendingUsersListDiv.appendChild(ul);
                }
            } else {
                pendingUsersListDiv.innerHTML = `<p>Error al cargar usuarios: ${data.message || 'Error desconocido'}</p>`;
            }
        } catch (error) {
            console.error('Error al cargar usuarios pendientes:', error);
            pendingUsersListDiv.innerHTML = '<p>Error de conexión al cargar usuarios pendientes.</p>';
        }
    }

    async approveUser(userId) {
        if (!confirm('¿Está seguro de que desea aprobar a este usuario?')) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/admin/approve-user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                this.loadPendingUsers(); // Recargar la lista de usuarios pendientes
            } else {
                alert(data.message || 'Error al aprobar usuario.');
            }
        } catch (error) {
            console.error('Error al aprobar usuario:', error);
            alert('Error de conexión al aprobar usuario.');
        }
    }
}

customElements.define('admin-dashboard', AdminDashboard);
