require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const { sequelize } = require('./models'); // Importa la instancia de Sequelize

// Importar rutas
const authRoutes = require('./routes/auth');

// Middleware para parsear JSON
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Basic route for the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Sincronizar la base de datos y luego iniciar el servidor
sequelize.sync({ alter: true }) // `alter: true` intentará realizar los cambios necesarios en la DB para que coincida con los modelos
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Base de datos sincronizada.`);
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error al sincronizar la base de datos:', err);
    });
