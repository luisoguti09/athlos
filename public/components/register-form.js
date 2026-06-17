class RegisterForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    max-width: 400px;
                    margin: 40px auto;
                    padding: 30px;
                    background-color: #ffffff;
                    border-radius: 10px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }
                h2 {
                    text-align: center;
                    color: #28a745;
                    margin-bottom: 25px;
                    font-size: 1.8em;
                }
                .form-group {
                    margin-bottom: 20px;
                }
                label {
                    display: block;
                    margin-bottom: 8px;
                    color: #333;
                    font-weight: 600;
                    font-size: 0.95em;
                }
                input[type="email"],
                input[type="password"],
                select {
                    width: calc(100% - 20px);
                    padding: 12px 10px;
                    border: 1px solid #ccc;
                    border-radius: 6px;
                    font-size: 1em;
                    transition: border-color 0.3s ease;
                }
                input[type="email"]:focus,
                input[type="password"]:focus,
                select:focus {
                    border-color: #28a745;
                    outline: none;
                }
                button {
                    width: 100%;
                    padding: 14px;
                    background-color: #28a745;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    font-size: 1.1em;
                    font-weight: 700;
                    cursor: pointer;
                    transition: background-color 0.3s ease, transform 0.1s ease;
                }
                button:hover {
                    background-color: #218838;
                }
                button:active {
                    transform: translateY(1px);
                }
                .error-message {
                    color: #dc3545;
                    text-align: center;
                    margin-top: 15px;
                    font-size: 0.9em;
                }
                .success-message {
                    color: #28a745;
                    text-align: center;
                    margin-top: 15px;
                    font-size: 0.9em;
                }
            </style>
            <h2>Registrarse</h2>
            <form id="registerForm">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <div class="form-group">
                    <label for="role">Rol</label>
                    <select id="role" name="role" required>
                        <option value="socio">Socio</option>
                        <option value="tesorero">Tesorero</option>
                        <option value="admin">Administrador</option>
                    </select>
                </div>
                <button type="submit">Registrar</button>
                <div id="message" class="error-message"></div>
            </form>
        `;
    }

    connectedCallback() {
        this.shadowRoot.getElementById('registerForm').addEventListener('submit', this.handleSubmit.bind(this));
    }

    disconnectedCallback() {
        this.shadowRoot.getElementById('registerForm').removeEventListener('submit', this.handleSubmit.bind(this));
    }

    async handleSubmit(event) {
        event.preventDefault();
        const email = this.shadowRoot.getElementById('email').value;
        const password = this.shadowRoot.getElementById('password').value;
        const role = this.shadowRoot.getElementById('role').value;
        const messageDiv = this.shadowRoot.getElementById('message');
        messageDiv.textContent = ''; // Limpiar mensajes previos
        messageDiv.className = 'error-message';

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, role }),
            });

            const data = await response.json();

            if (response.ok) {
                messageDiv.textContent = 'Registro exitoso. ¡Ahora puedes iniciar sesión!';
                messageDiv.className = 'success-message';
                // Opcional: emitir un evento de registro exitoso si es necesario
                this.dispatchEvent(new CustomEvent('register-success', {
                    bubbles: true,
                    composed: true
                }));
            } else {
                messageDiv.textContent = data.message || 'Error al registrar usuario.';
            }
        } catch (error) {
            console.error('Error en la solicitud de registro:', error);
            messageDiv.textContent = 'Error de conexión. Inténtelo de nuevo.';
        }
    }
}

customElements.define('register-form', RegisterForm);
