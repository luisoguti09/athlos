class DashboardManager extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 20px;
                    text-align: center;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 30px;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 15px;
                }
                h1 {
                    color: #333;
                    margin: 0;
                }
                button {
                    background-color: #dc3545;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 1em;
                    transition: background-color 0.3s ease;
                }
                button:hover {
                    background-color: #c82333;
                }
                .dashboard-content {
                    margin-top: 20px;
                    background-color: #f9f9f9;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                }
            </style>
            <div class="header">
                <h1>Bienvenido al Dashboard</h1>
                <button id="logoutButton">Cerrar Sesión</button>
            </div>
            <div id="dashboardContainer" class="dashboard-content">
                <!-- El componente del dashboard específico se cargará aquí -->
            </div>
        `;
    }

    connectedCallback() {
        this.role = localStorage.getItem('userRole');
        this.loadDashboardComponent();
        this.shadowRoot.getElementById('logoutButton').addEventListener('click', this.handleLogout.bind(this));
    }

    disconnectedCallback() {
        this.shadowRoot.getElementById('logoutButton').removeEventListener('click', this.handleLogout.bind(this));
    }

    loadDashboardComponent() {
        const container = this.shadowRoot.getElementById('dashboardContainer');
        container.innerHTML = ''; // Limpiar contenido existente

        let componentName = '';
        let componentPath = '';

        switch (this.role) {
            case 'admin':
                componentName = 'admin-dashboard';
                componentPath = './components/admin-dashboard.js';
                break;
            case 'tesorero':
                componentName = 'treasurer-dashboard';
                componentPath = './components/treasurer-dashboard.js';
                break;
            case 'socio':
                componentName = 'member-dashboard';
                componentPath = './components/member-dashboard.js';
                break;
            default:
                container.innerHTML = '<p>No se encontró un dashboard para su rol.</p>';
                return;
        }

        // Importar dinámicamente el componente
        import(componentPath)
            .then(() => {
                const dashboardElement = document.createElement(componentName);
                container.appendChild(dashboardElement);
            })
            .catch(error => {
                console.error(`Error al cargar el componente ${componentName}:`, error);
                container.innerHTML = `<p>Error al cargar el dashboard para el rol '${this.role}'.</p>`;
            });
    }

    handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        // Emitir evento de logout
        this.dispatchEvent(new CustomEvent('logout-success', {
            bubbles: true,
            composed: true
        }));
    }
}

customElements.define('dashboard-manager', DashboardManager);
