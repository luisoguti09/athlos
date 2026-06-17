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
        `;
    }

    connectedCallback() {
        console.log("Admin Dashboard cargado.");
        // Lógica para cargar datos específicos del admin
    }
}

customElements.define('admin-dashboard', AdminDashboard);
