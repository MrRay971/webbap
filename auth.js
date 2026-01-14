/**
 * Gestion de l'authentification côté client
 */

/**
 * Vérifier si l'utilisateur est connecté
 */
function isAuthenticated() {
  const token = localStorage.getItem('woule_token');
  const user = localStorage.getItem('woule_user');
  return !!(token && user);
}

/**
 * Obtenir l'utilisateur connecté
 */
function getCurrentUser() {
  const userStr = localStorage.getItem('woule_user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (e) {
    return null;
  }
}

/**
 * Sauvegarder les informations de connexion
 */
function saveAuth(token, user) {
  localStorage.setItem('woule_token', token);
  localStorage.setItem('woule_user', JSON.stringify(user));
}

/**
 * Déconnexion
 */
function logout() {
  localStorage.removeItem('woule_token');
  localStorage.removeItem('woule_user');
  window.location.href = '/login.html';
}

/**
 * Vérifier l'authentification et rediriger si nécessaire
 */
function checkAuth(requiredRole = null) {
  if (!isAuthenticated()) {
    window.location.href = '/login.html';
    return false;
  }

  const user = getCurrentUser();
  
  if (requiredRole && user.role !== requiredRole) {
    // Rediriger vers le bon dashboard selon le rôle
    redirectByRole(user.role);
    return false;
  }

  return true;
}

/**
 * Rediriger vers le dashboard approprié selon le rôle
 */
function redirectByRole(role) {
  const redirects = {
    'ambassador': '/dashboard-ambassadeur.html',
    'advertiser': '/dashboard-annonceur.html',
    'admin': '/admin-dashboard.html'
  };

  const target = redirects[role] || '/login.html';
  window.location.href = target;
}

/**
 * Initialiser les événements de déconnexion
 */
function initLogoutButtons() {
  const logoutButtons = document.querySelectorAll('[data-logout]');
  
  logoutButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
        logout();
      }
    });
  });
}

/**
 * Afficher les informations utilisateur dans le header
 */
function displayUserInfo() {
  const user = getCurrentUser();
  if (!user) return;

  // Mettre à jour l'email/nom dans le header
  const userEmailElement = document.querySelector('[data-user-email]');
  const userNameElement = document.querySelector('[data-user-name]');
  
  if (userEmailElement) {
    userEmailElement.textContent = user.email;
  }
  
  if (userNameElement) {
    userNameElement.textContent = user.profile?.first_name 
      ? `${user.profile.first_name} ${user.profile.last_name || ''}`
      : user.profile?.company_name || user.email;
  }

  // Afficher le badge rôle
  const roleBadge = document.querySelector('[data-user-role]');
  if (roleBadge) {
    const roleLabels = {
      'ambassador': '🚗 Ambassadeur',
      'advertiser': '👔 Annonceur',
      'admin': '👨‍💼 Administrateur'
    };
    roleBadge.textContent = roleLabels[user.role] || user.role;
  }
}

// Initialiser au chargement de la page
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initLogoutButtons();
    displayUserInfo();
  });
} else {
  initLogoutButtons();
  displayUserInfo();
}
