const bcrypt = require('bcryptjs');
const { db, initializeDatabase, closeDatabase } = require('./database');

console.log('🌱 Initialisation du seed de la base de données...\n');

// Fonction pour exécuter les seeds
async function seed() {
  try {
    // Initialiser la base de données
    await initializeDatabase();

    // Hash des mots de passe
    const hashedPassword = await bcrypt.hash('password123', 10);
    const hashedAdminPassword = await bcrypt.hash('admin123', 10);

    console.log('👥 Création des utilisateurs...');

    // Créer les utilisateurs
    const users = [
      { email: 'admin@woule.com', password: hashedAdminPassword, role: 'admin', status: 'validated' },
      { email: 'ambassadeur@test.com', password: hashedPassword, role: 'ambassador', status: 'validated' },
      { email: 'marc.duval@gmail.com', password: hashedPassword, role: 'ambassador', status: 'validated' },
      { email: 'sophie.martin@hotmail.fr', password: hashedPassword, role: 'ambassador', status: 'validated' },
      { email: 'annonceur@test.com', password: hashedPassword, role: 'advertiser', status: 'validated' },
      { email: 'caraibfoods@company.mq', password: hashedPassword, role: 'advertiser', status: 'validated' },
      { email: 'techcarib@business.gp', password: hashedPassword, role: 'advertiser', status: 'validated' }
    ];

    for (const user of users) {
      await new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO users (email, password, role, status) VALUES (?, ?, ?, ?)',
          [user.email, user.password, user.role, user.status],
          function(err) {
            if (err) reject(err);
            else resolve(this.lastID);
          }
        );
      });
    }

    console.log('✅ Utilisateurs créés\n');

    console.log('🚗 Création des profils ambassadeurs...');

    // Créer les profils ambassadeurs
    const ambassadors = [
      {
        user_id: 2,
        first_name: 'Jean',
        last_name: 'Ambassadeur',
        phone: '0696111111',
        type: 'individual',
        zones: '["Fort-de-France","Lamentin"]',
        vehicle_type: 'citadine',
        vehicle_brand: 'Renault',
        vehicle_model: 'Clio',
        frequency: 'daily',
        interests: '["famille","shopping"]',
        score: 4.5,
        total_km: 800
      },
      {
        user_id: 3,
        first_name: 'Marc',
        last_name: 'Duval',
        phone: '0696123456',
        type: 'individual',
        zones: '["Fort-de-France","Lamentin","Schoelcher"]',
        vehicle_type: 'citadine',
        vehicle_brand: 'Peugeot',
        vehicle_model: '208',
        frequency: 'daily',
        interests: '["famille","shopping","sport"]',
        score: 4.8,
        total_km: 1250
      },
      {
        user_id: 4,
        first_name: 'Sophie',
        last_name: 'Martin',
        phone: '0696654321',
        type: 'individual',
        zones: '["Fort-de-France","Rivière-Salée"]',
        vehicle_type: 'suv',
        vehicle_brand: 'Toyota',
        vehicle_model: 'RAV4',
        frequency: '3-5x/week',
        interests: '["gastronomie","nature"]',
        score: 4.2,
        total_km: 950
      }
    ];

    for (const amb of ambassadors) {
      await new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO ambassadors (
            user_id, first_name, last_name, phone, type, zones,
            vehicle_type, vehicle_brand, vehicle_model, frequency, interests, score, total_km
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            amb.user_id, amb.first_name, amb.last_name, amb.phone, amb.type, amb.zones,
            amb.vehicle_type, amb.vehicle_brand, amb.vehicle_model, amb.frequency, amb.interests, amb.score, amb.total_km
          ],
          function(err) {
            if (err) reject(err);
            else resolve(this.lastID);
          }
        );
      });
    }

    console.log('✅ Profils ambassadeurs créés\n');

    console.log('🏢 Création des profils annonceurs...');

    // Créer les profils annonceurs
    const advertisers = [
      {
        user_id: 5,
        company_name: 'Test Annonceur SAS',
        siret: '12345678900011',
        sector: 'Services',
        address: 'Fort-de-France',
        phone: '0596999999',
        total_spent: 5000
      },
      {
        user_id: 6,
        company_name: 'Caraïb\'Foods SAS',
        siret: '85234567800012',
        sector: 'Agroalimentaire',
        address: 'Lamentin',
        phone: '0596123456',
        total_spent: 12500
      },
      {
        user_id: 7,
        company_name: 'TechCarib Solutions',
        siret: '98765432100013',
        sector: 'Technologies',
        address: 'Pointe-à-Pitre',
        phone: '0590654321',
        total_spent: 8000
      }
    ];

    for (const adv of advertisers) {
      await new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO advertisers (
            user_id, company_name, siret, sector, address, phone, total_spent
          ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            adv.user_id, adv.company_name, adv.siret, adv.sector, adv.address, adv.phone, adv.total_spent
          ],
          function(err) {
            if (err) reject(err);
            else resolve(this.lastID);
          }
        );
      });
    }

    console.log('✅ Profils annonceurs créés\n');

    console.log('📢 Création des campagnes...');

    // Créer des campagnes
    const campaigns = [
      {
        advertiser_id: 2,
        name: 'Lancement Menu Caraïbes',
        description: 'Promotion du nouveau menu saveurs caraïbes',
        budget: 5000,
        status: 'active',
        start_date: '2026-01-01',
        end_date: '2026-02-28',
        zones: '["Fort-de-France","Lamentin"]',
        target_vehicle_types: '["citadine","suv"]',
        target_interests: '["famille","shopping"]',
        target_ambassadors: 25,
        impressions: 234567
      },
      {
        advertiser_id: 3,
        name: 'Nouvelle Gamme Smartphones',
        description: 'Lancement de la nouvelle série de smartphones',
        budget: 8000,
        status: 'scheduled',
        start_date: '2026-03-01',
        end_date: '2026-04-30',
        zones: '["Fort-de-France","Pointe-à-Pitre"]',
        target_vehicle_types: '["citadine","berline"]',
        target_interests: '["technologie","jeunes"]',
        target_ambassadors: 30,
        impressions: 0
      },
      {
        advertiser_id: 2,
        name: 'Fête des Mères 2026',
        description: 'Offres spéciales fête des mères',
        budget: 3000,
        status: 'draft',
        start_date: '2026-05-15',
        end_date: '2026-05-31',
        zones: '["Fort-de-France"]',
        target_vehicle_types: '["citadine"]',
        target_interests: '["famille"]',
        target_ambassadors: 15,
        impressions: 0
      }
    ];

    for (const camp of campaigns) {
      await new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO campaigns (
            advertiser_id, name, description, budget, status, start_date, end_date,
            zones, target_vehicle_types, target_interests, target_ambassadors, impressions
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            camp.advertiser_id, camp.name, camp.description, camp.budget, camp.status, 
            camp.start_date, camp.end_date, camp.zones, camp.target_vehicle_types, 
            camp.target_interests, camp.target_ambassadors, camp.impressions
          ],
          function(err) {
            if (err) reject(err);
            else resolve(this.lastID);
          }
        );
      });
    }

    console.log('✅ Campagnes créées\n');

    console.log('📝 Création des candidatures...');

    // Créer des candidatures
    const applications = [
      { campaign_id: 1, ambassador_id: 1, score: 85, status: 'accepted' },
      { campaign_id: 1, ambassador_id: 2, score: 92, status: 'pending' },
      { campaign_id: 1, ambassador_id: 3, score: 78, status: 'pending' },
      { campaign_id: 2, ambassador_id: 2, score: 88, status: 'pending' }
    ];

    for (const app of applications) {
      await new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO applications (campaign_id, ambassador_id, score, status) VALUES (?, ?, ?, ?)',
          [app.campaign_id, app.ambassador_id, app.score, app.status],
          function(err) {
            if (err) reject(err);
            else resolve(this.lastID);
          }
        );
      });
    }

    console.log('✅ Candidatures créées\n');

    console.log('✅ Création des affectations ambassadeurs-campagnes...');

    // Créer des affectations
    const assignments = [
      {
        campaign_id: 1,
        ambassador_id: 1,
        km_driven: 450,
        impressions_generated: 12500,
        earnings: 125.50,
        assignment_status: 'active'
      },
      {
        campaign_id: 1,
        ambassador_id: 2,
        km_driven: 680,
        impressions_generated: 18900,
        earnings: 189.00,
        assignment_status: 'active'
      }
    ];

    for (const assign of assignments) {
      await new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO campaign_ambassadors (
            campaign_id, ambassador_id, km_driven, impressions_generated, earnings, assignment_status
          ) VALUES (?, ?, ?, ?, ?, ?)`,
          [
            assign.campaign_id, assign.ambassador_id, assign.km_driven,
            assign.impressions_generated, assign.earnings, assign.assignment_status
          ],
          function(err) {
            if (err) reject(err);
            else resolve(this.lastID);
          }
        );
      });
    }

    console.log('✅ Affectations créées\n');

    console.log('═══════════════════════════════════════════════════════════');
    console.log('✅ SEED TERMINÉ AVEC SUCCÈS !');
    console.log('═══════════════════════════════════════════════════════════\n');
    console.log('📊 Données créées:');
    console.log('   • 7 utilisateurs (1 admin, 3 ambassadeurs, 3 annonceurs)');
    console.log('   • 3 profils ambassadeurs');
    console.log('   • 3 profils annonceurs');
    console.log('   • 3 campagnes');
    console.log('   • 4 candidatures');
    console.log('   • 2 affectations\n');
    console.log('🔐 Comptes de test:');
    console.log('   Admin: admin@woule.com / admin123');
    console.log('   Ambassadeur: ambassadeur@test.com / password123');
    console.log('   Annonceur: annonceur@test.com / password123\n');
    console.log('🚀 Lancez le serveur avec: npm start');
    console.log('═══════════════════════════════════════════════════════════\n');

    await closeDatabase();
  } catch (error) {
    console.error('❌ Erreur lors du seed:', error);
    process.exit(1);
  }
}

// Exécuter le seed
seed();
