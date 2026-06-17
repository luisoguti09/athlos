const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const router = express.Router();

// Middleware para verificar el token JWT y el rol de administrador
const verifyTokenAndAdmin = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No se proporcionó token.' });
  }

  if (token.startsWith('Bearer ')) {
    const tokenWithoutBearer = token.slice(7, token.length);
    jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Fallo la autenticación del token.' });
      }
      if (decoded.role !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado: Se requiere rol de administrador.' });
      }
      req.userId = decoded.id;
      req.userRole = decoded.role;
      next();
    });
  } else {
    return res.status(403).json({ message: 'Formato de token inválido.' });
  }
};

// Ruta para obtener usuarios pendientes de aprobación (solo administradores)
router.get('/pending-approvals', verifyTokenAndAdmin, async (req, res) => {
  try {
    const pendingUsers = await User.findAll({
      where: {
        role: 'socio',
        isApproved: false
      },
      attributes: ['id', 'email', 'role', 'isApproved', 'createdAt'] // Seleccionar solo campos relevantes
    });
    res.status(200).json(pendingUsers);
  } catch (error) {
    console.error('Error al obtener usuarios pendientes de aprobación:', error);
    res.status(500).json({ message: 'Error interno del servidor al obtener usuarios pendientes.' });
  }
});

// Ruta para aprobar un usuario (solo administradores)
router.put('/approve-user/:id', verifyTokenAndAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    if (user.role !== 'socio') {
      return res.status(400).json({ message: 'Solo se pueden aprobar usuarios con rol "socio".' });
    }

    if (user.isApproved) {
      return res.status(400).json({ message: 'El usuario ya está aprobado.' });
    }

    user.isApproved = true;
    await user.save();

    res.status(200).json({ message: `Usuario ${user.email} aprobado exitosamente.`, user: { id: user.id, email: user.email, role: user.role, isApproved: user.isApproved } });
  } catch (error) {
    console.error('Error al aprobar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor al aprobar usuario.' });
  }
});

module.exports = router;
