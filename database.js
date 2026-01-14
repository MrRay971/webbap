const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Chemin vers la base de données
const dbPath = process.env.DATABASE_PATH || path.join(__dirname, '..', 'woule.db');

// Créer/Ouvrir la base de données
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Erreur de connexion à la base de données:', err.message);
  } else {
    console.log('✅ Connecté à la base de données SQLite');
  }
});

// Activer les clés étrangères
db.run('PRAGMA foreign_keys = ON;');

// Fonction pour initialiser les tables
const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Table users
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          role TEXT NOT NULL CHECK(role IN ('ambassador', 'advertiser', 'admin')),
          status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'validated', 'suspended', 'rejected')),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) reject(err);
      });

      // Table ambassadors
      db.run(`
        CREATE TABLE IF NOT EXISTS ambassadors (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER UNIQUE NOT NULL,
          first_name TEXT NOT NULL,
          last_name TEXT NOT NULL,
          phone TEXT,
          type TEXT NOT NULL CHECK(type IN ('individual', 'company')),
          company_name TEXT,
          siret TEXT,
          zones TEXT NOT NULL,
          vehicle_type TEXT,
          vehicle_brand TEXT,
          vehicle_model TEXT,
          frequency TEXT CHECK(frequency IN ('daily', '3-5x/week', '1-2x/week', 'occasional')),
          interests TEXT,
          score REAL DEFAULT 0,
          total_km INTEGER DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `, (err) => {
        if (err) reject(err);
      });

      // Table advertisers
      db.run(`
        CREATE TABLE IF NOT EXISTS advertisers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER UNIQUE NOT NULL,
          company_name TEXT NOT NULL,
          siret TEXT NOT NULL,
          sector TEXT,
          address TEXT,
          phone TEXT,
          total_spent REAL DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `, (err) => {
        if (err) reject(err);
      });

      // Table campaigns
      db.run(`
        CREATE TABLE IF NOT EXISTS campaigns (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          advertiser_id INTEGER NOT NULL,
          name TEXT NOT NULL,
          description TEXT,
          budget REAL NOT NULL,
          status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'pending', 'scheduled', 'active', 'completed', 'cancelled')),
          start_date DATE,
          end_date DATE,
          zones TEXT,
          target_vehicle_types TEXT,
          target_interests TEXT,
          target_ambassadors INTEGER DEFAULT 0,
          impressions INTEGER DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (advertiser_id) REFERENCES advertisers(id) ON DELETE CASCADE
        )
      `, (err) => {
        if (err) reject(err);
      });

      // Table applications
      db.run(`
        CREATE TABLE IF NOT EXISTS applications (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          campaign_id INTEGER NOT NULL,
          ambassador_id INTEGER NOT NULL,
          score INTEGER DEFAULT 0,
          status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'accepted', 'rejected')),
          applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE,
          FOREIGN KEY (ambassador_id) REFERENCES ambassadors(id) ON DELETE CASCADE,
          UNIQUE(campaign_id, ambassador_id)
        )
      `, (err) => {
        if (err) reject(err);
      });

      // Table campaign_ambassadors (assignments)
      db.run(`
        CREATE TABLE IF NOT EXISTS campaign_ambassadors (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          campaign_id INTEGER NOT NULL,
          ambassador_id INTEGER NOT NULL,
          km_driven INTEGER DEFAULT 0,
          impressions_generated INTEGER DEFAULT 0,
          earnings REAL DEFAULT 0,
          assignment_status TEXT DEFAULT 'active' CHECK(assignment_status IN ('active', 'completed', 'cancelled')),
          assigned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE,
          FOREIGN KEY (ambassador_id) REFERENCES ambassadors(id) ON DELETE CASCADE,
          UNIQUE(campaign_id, ambassador_id)
        )
      `, (err) => {
        if (err) reject(err);
      });

      // Table invoices
      db.run(`
        CREATE TABLE IF NOT EXISTS invoices (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          advertiser_id INTEGER NOT NULL,
          invoice_number TEXT UNIQUE NOT NULL,
          amount REAL NOT NULL,
          status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'paid', 'overdue', 'cancelled')),
          due_date DATE,
          paid_at DATETIME,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (advertiser_id) REFERENCES advertisers(id) ON DELETE CASCADE
        )
      `, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log('✅ Tables créées avec succès');
          resolve();
        }
      });
    });
  });
};

// Fermer la base de données proprement
const closeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        console.error('❌ Erreur lors de la fermeture de la base de données:', err.message);
        reject(err);
      } else {
        console.log('✅ Base de données fermée');
        resolve();
      }
    });
  });
};

module.exports = {
  db,
  initializeDatabase,
  closeDatabase
};
