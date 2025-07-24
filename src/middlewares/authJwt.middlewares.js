const jwt = require('jsonwebtoken');
exports.verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(403).json({ message: 'No se proporcionó token' });
    }
    try {
      // src/middlewares/authJwt.middlewares.js
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res
            .status(err.name === 'TokenExpiredError' ? 401 : 403)
            .json({
              message: err.name === 'TokenExpiredError'
                ? 'Token expirado'
                : 'Token inválido'
            });
        }
        req.user = decoded;
        next();
      });
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido' });
    }
};