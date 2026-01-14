require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { initializeDatabase } = require('./database');

// Import des routes
const authRoutes = require('./routes/auth');
const ambassadorRoutes = require('./routes/ambassadors');
const advertiserRoutes = require('./routes/advertisers');
const campaignRoutes = require('./routes/campaigns');
const matchingRoutes = require('./routes/matching');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir les fichiers statiques du frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/ambassadors', ambassadorRoutes);
app.use('/api/advertisers', advertiserRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/matching', matchingRoutes);
app.use('/api/admin', adminRoutes);

// Route de health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API Woulé fonctionne correctement',
    timestamp: new Date().toISOString()
  });
});

// Route racine - Rediriger vers le frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée'
  });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err);
  res.status(500).json({
    success: false,
    message: 'Erreur serveur interne'
  });
});

// Initialiser la base de données et démarrer le serveur
initializeDatabase()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log('\n🚗💨 ═══════════════════════════════════════════════════════');
      console.log('      ✨ PLATEFORME WOULÉ - SERVEUR DÉMARRÉ ✨');
      console.log('═══════════════════════════════════════════════════════════\n');
      console.log(`🌐 URL: http://localhost:${PORT}`);
      console.log(`📊 API: http://localhost:${PORT}/api/health\n`);
      console.log('📋 Endpoints disponibles:');
      console.log('   • POST /api/auth/register - Inscription');
      console.log('   • POST /api/auth/login - Connexion');
      console.log('   • GET  /api/auth/me - Profil utilisateur');
      console.log('   • GET  /api/campaigns - Liste des campagnes');
      console.log('   • POST /api/campaigns/:id/apply - Postuler (ambassadeur)');
      console.log('   • GET  /api/matching/campaigns/:id/candidates - Matching (admin)');
      console.log('   • GET  /api/admin/stats - Statistiques globales (admin)\n');
      console.log('🔐 Comptes de test:');
      console.log('   Ambassadeur: ambassadeur@test.com / password123');
      console.log('   Annonceur: annonceur@test.com / password123');
      console.log('   Admin: admin@woule.com / admin123\n');
      console.log('💡 Commande: npm run seed (pour charger les données de test)');
      console.log('═══════════════════════════════════════════════════════════\n');
    });
  })
  .catch((err) => {
    console.error('❌ Erreur lors de l\'initialisation de la base de données:', err);
    process.exit(1);
  });

// Gestion de l'arrêt propre
process.on('SIGINT', () => {
  console.log('\n\n🛑 Arrêt du serveur...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n\n🛑 Arrêt du serveur...');
  process.exit(0);
});
