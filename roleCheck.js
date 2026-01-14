/**
 * Middleware de vérification du rôle utilisateur
 * Vérifie que l'utilisateur a le(s) rôle(s) autorisé(s)
 * 
 * @param {string|string[]} allowedRoles - Rôle(s) autorisé(s) ('ambassador', 'advertiser', 'admin')
 */
const roleCheck = (allowedRoles) => {
  return (req, res, next) => {
    try {
      // Vérifier que l'utilisateur est authentifié
      if (!req.user || !req.user.role) {
        return res.status(401).json({
          success: false,
          message: 'Authentification requise.'
        });
      }

      // Convertir en tableau si c'est une string
      const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

      // Vérifier si l'utilisateur a un des rôles autorisés
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: 'Accès interdit. Permissions insuffisantes.'
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la vérification des permissions.'
      });
    }
  };
};

module.exports = roleCheck;
