const jwt = require('jsonwebtoken');
exports.verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(403).json({ message: 'No se proporcionó token' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.usuarioId = decoded.cod_usuario;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido' });
    }
};