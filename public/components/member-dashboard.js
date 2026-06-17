class MemberDashboard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 20px;
                    border: 1px solid #28a745;
                    background-color: #eafbea;
                    border-radius: 8px;
                    text-align: left;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    color: #333;
                }
                h2 {
                    color: #28a745;
                    margin-top: 0;
                }
                p {
                    line-height: 1.6;
                }
                .card {
                    background-color: #ffffff;
                    border: 1px solid #d4edda;
                    border-radius: 5px;
                    padding: 15px;
                    margin-top: 15px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                }
            </style>
            <h2>Dashboard de Socio</h2>
            <p>Bienvenido, Socio. Aquí puedes ver tu información y estado de cuotas.</p>
            <div class="card">
                <h3>Mi Perfil</h3>
                <p>Consulta y actualiza tus datos personales.</p>
            </div>
            <div class="card">
                <h3>Mis Cuotas</h3>
                <p>Revisa el estado de tus pagos y cuotas pendientes.</p>
                <ul>
                    <li>Último pago: 15/05/2026</li>
                    <li>Próximo vencimiento: 15/06/2026</li>
                </ul>
            </div>
        `;
    }

    connectedCallback() {
        console.log("Member Dashboard cargado.");
        // Lógica para cargar datos específicos del socio
    }
}

customElements.define('member-dashboard', MemberDashboard);
