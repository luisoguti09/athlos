const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const router = express.Router();

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No se proporcionó token.' });
  }

  // Expects "Bearer TOKEN"
  if (token.startsWith('Bearer ')) {
    const tokenWithoutBearer = token.slice(7, token.length);
    jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Fallo la autenticación del token.' });
      }
      req.userId = decoded.id;
      req.userRole = decoded.role;
      next();
    });
  } else {
    return res.status(403).json({ message: 'Formato de token inválido.' });
  }
};

// Ruta de registro de usuario
router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;

  // Validar rol
  const validRoles = ['admin', 'tesorero', 'socio'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: 'Rol inválido.' });
  }

  try {
    const user = await User.create({ email, password, role });
    res.status(201).json({ message: 'Usuario registrado exitosamente.', user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'El email ya está registrado.' });
    }
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: error.errors[0].message });
    }
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
});

// Ruta de inicio de sesión de usuario
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !user.isValidPassword(password)) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos.' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expira en 1 hora
    );

    res.status(200).json({ message: 'Inicio de sesión exitoso.', token, role: user.role });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
});

// Ruta de ejemplo protegida
router.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: `Bienvenido usuario ${req.userId} con rol: ${req.userRole}` });
});


module.exports = router;
