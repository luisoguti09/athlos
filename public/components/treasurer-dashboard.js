class TreasurerDashboard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 20px;
                    border: 1px solid #ffc107;
                    background-color: #fffde7;
                    border-radius: 8px;
                    text-align: left;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    color: #333;
                }
                h2 {
                    color: #ffc107;
                    margin-top: 0;
                }
                p {
                    line-height: 1.6;
                }
                .card {
                    background-color: #ffffff;
                    border: 1px solid #ffeeba;
                    border-radius: 5px;
                    padding: 15px;
                    margin-top: 15px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                }
            </style>
            <h2>Dashboard de Tesorero</h2>
            <p>Bienvenido, Tesorero. Aquí puedes gestionar las finanzas del club.</p>
            <div class="card">
                <h3>Gestión de Cuotas</h3>
                <p>Administrar el estado de las cuotas de los socios.</p>
                <ul>
                    <li>Ver pagos pendientes</li>
                    <li>Registrar nuevos pagos</li>
                    <li>Generar informes financieros</li>
                </ul>
            </div>
            <div class="card">
                <h3>Estado Financiero</h3>
                <p>Resumen de ingresos y egresos.</p>
            </div>
        `;
    }

    connectedCallback() {
        console.log("Treasurer Dashboard cargado.");
        // Lógica para cargar datos específicos del tesorero
    }
}

customElements.define('treasurer-dashboard', TreasurerDashboard);
