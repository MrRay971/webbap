/**
 * Client API pour la plateforme Woulé
 * Gère toutes les requêtes HTTP vers le backend
 */

const API_BASE_URL = '/api';

/**
 * Fonction helper pour faire des requêtes HTTP
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('woule_token');
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  };

  // Ajouter le token JWT si présent
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      // Si erreur 401, déconnecter l'utilisateur
      if (response.status === 401) {
        localStorage.removeItem('woule_token');
        localStorage.removeItem('woule_user');
        window.location.href = '/login.html';
      }
      
      throw new Error(data.message || 'Erreur API');
    }

    return data;
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
}

/**
 * API Authentication
 */
const API = {
  auth: {
    /**
     * Inscription
     */
    register: async (userData) => {
      return request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
    },

    /**
     * Connexion
     */
    login: async (email, password) => {
      return request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
    },

    /**
     * Obtenir le profil utilisateur
     */
    me: async () => {
      return request('/auth/me');
    }
  },

  /**
   * API Ambassadeurs
   */
  ambassadors: {
    /**
     * Obtenir mes campagnes (ambassadeur)
     */
    getMyCampaigns: async () => {
      return request('/ambassadors/me/campaigns');
    },

    /**
     * Obtenir mes statistiques (ambassadeur)
     */
    getMyStats: async () => {
      return request('/ambassadors/me/stats');
    },

    /**
     * Obtenir tous les ambassadeurs (admin)
     */
    getAll: async (filters = {}) => {
      const params = new URLSearchParams(filters);
      return request(`/ambassadors?${params}`);
    }
  },

  /**
   * API Annonceurs
   */
  advertisers: {
    /**
     * Obtenir mes statistiques (annonceur)
     */
    getMyStats: async () => {
      return request('/advertisers/me/stats');
    },

    /**
     * Obtenir tous les annonceurs (admin)
     */
    getAll: async (filters = {}) => {
      const params = new URLSearchParams(filters);
      return request(`/advertisers?${params}`);
    }
  },

  /**
   * API Campagnes
   */
  campaigns: {
    /**
     * Obtenir toutes les campagnes
     */
    getAll: async (filters = {}) => {
      const params = new URLSearchParams(filters);
      return request(`/campaigns?${params}`);
    },

    /**
     * Obtenir une campagne par ID
     */
    getById: async (id) => {
      return request(`/campaigns/${id}`);
    },

    /**
     * Créer une nouvelle campagne
     */
    create: async (campaignData) => {
      return request('/campaigns', {
        method: 'POST',
        body: JSON.stringify(campaignData)
      });
    },

    /**
     * Postuler à une campagne (ambassadeur)
     */
    apply: async (campaignId) => {
      return request(`/campaigns/${campaignId}/apply`, {
        method: 'POST'
      });
    },

    /**
     * Affecter un ambassadeur (admin)
     */
    assignAmbassador: async (campaignId, ambassadorId) => {
      return request(`/campaigns/${campaignId}/assign`, {
        method: 'POST',
        body: JSON.stringify({ ambassador_id: ambassadorId })
      });
    },

    /**
     * Obtenir les candidatures d'une campagne
     */
    getApplications: async (campaignId) => {
      return request(`/campaigns/${campaignId}/applications`);
    }
  },

  /**
   * API Matching
   */
  matching: {
    /**
     * Obtenir les candidats avec scores (admin)
     */
    getCandidates: async (campaignId) => {
      return request(`/matching/campaigns/${campaignId}/candidates`);
    },

    /**
     * Recalculer les scores
     */
    recalculateScores: async (campaignId) => {
      return request(`/matching/campaigns/${campaignId}/recalculate`, {
        method: 'POST'
      });
    }
  },

  /**
   * API Admin
   */
  admin: {
    /**
     * Obtenir les statistiques globales
     */
    getStats: async () => {
      return request('/admin/stats');
    },

    /**
     * Valider/Rejeter/Suspendre un utilisateur
     */
    validateUser: async (userId, action) => {
      return request(`/admin/users/${userId}/validate`, {
        method: 'PATCH',
        body: JSON.stringify({ action })
      });
    }
  }
};

// Exporter pour utilisation dans d'autres scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = API;
}
