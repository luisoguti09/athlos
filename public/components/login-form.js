class LoginForm extends HTMLElement {
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
                    color: #0056b3;
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
                input[type="password"] {
                    width: calc(100% - 20px);
                    padding: 12px 10px;
                    border: 1px solid #ccc;
                    border-radius: 6px;
                    font-size: 1em;
                    transition: border-color 0.3s ease;
                }
                input[type="email"]:focus,
                input[type="password"]:focus {
                    border-color: #007bff;
                    outline: none;
                }
                button {
                    width: 100%;
                    padding: 14px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    font-size: 1.1em;
                    font-weight: 700;
                    cursor: pointer;
                    transition: background-color 0.3s ease, transform 0.1s ease;
                }
                button:hover {
                    background-color: #0056b3;
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
            <h2>Iniciar Sesión</h2>
            <form id="loginForm">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit">Entrar</button>
                <div id="message" class="error-message"></div>
            </form>
        `;
    }

    connectedCallback() {
        this.shadowRoot.getElementById('loginForm').addEventListener('submit', this.handleSubmit.bind(this));
    }

    disconnectedCallback() {
        this.shadowRoot.getElementById('loginForm').removeEventListener('submit', this.handleSubmit.bind(this));
    }

    async handleSubmit(event) {
        event.preventDefault();
        const email = this.shadowRoot.getElementById('email').value;
        const password = this.shadowRoot.getElementById('password').value;
        const messageDiv = this.shadowRoot.getElementById('message');
        messageDiv.textContent = ''; // Limpiar mensajes previos
        messageDiv.className = 'error-message';

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userRole', data.role);
                messageDiv.textContent = 'Inicio de sesión exitoso. Redirigiendo...';
                messageDiv.className = 'success-message';
                // Emitir evento de login exitoso
                this.dispatchEvent(new CustomEvent('login-success', {
                    bubbles: true,
                    composed: true,
                    detail: { role: data.role }
                }));
            } else {
                messageDiv.textContent = data.message || 'Error al iniciar sesión.';
            }
        } catch (error) {
            console.error('Error en la solicitud de login:', error);
            messageDiv.textContent = 'Error de conexión. Inténtelo de nuevo.';
        }
    }
}

customElements.define('login-form', LoginForm);
