const jwt = require('jsonwebtoken');

/**
 * Middleware d'authentification JWT
 * Vérifie le token JWT dans le header Authorization
 */
const authMiddleware = (req, res, next) => {
  try {
    // Récupérer le token depuis le header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Token manquant. Veuillez vous connecter.'
      });
    }

    // Extraire le token (format: "Bearer <token>")
    const token = authHeader.split(' ')[1];

    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'woule_secret_key_change_in_production');

    // Ajouter les informations utilisateur à la requête
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role
    };

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expiré. Veuillez vous reconnecter.'
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token invalide.'
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Erreur d\'authentification.'
    });
  }
};

module.exports = authMiddleware;
