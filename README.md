# 🚗 Plateforme Woulé - Full-Stack

> **Premier réseau d'ambassadeurs automobilistes des Antilles et de la Guyane**

Plateforme complète qui connecte les **ambassadeurs** (particuliers/entreprises avec véhicules), les **annonceurs** (entreprises) et les **administrateurs** (équipe Woulé) pour créer un écosystème de publicité automobile innovant.

## ✅ Statut du projet

**Backend API REST : 100% opérationnel** ✨
- ✅ Toutes les routes API implémentées et testées
- ✅ Authentification JWT fonctionnelle
- ✅ Base de données SQLite avec 7 tables
- ✅ Algorithme de matching intelligent
- ✅ Données de test créées (seed script)
- ✅ Prêt pour le déploiement sur Render.com

---

## 📋 Table des matières

- [Description](#-description)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Structure du projet](#-structure-du-projet)
- [API Documentation](#-api-documentation)
- [Fonctionnalités](#-fonctionnalités)
- [Comptes de test](#-comptes-de-test)
- [Déploiement](#-déploiement)
- [FAQ](#-faq)

---

## 🎯 Description

Woulé est une plateforme innovante qui permet aux entreprises de communiquer sur les véhicules de particuliers des Antilles et de la Guyane. 

### Les 3 types d'utilisateurs :

#### 🚗 **Ambassadeurs** (Particuliers ou Entreprises)
- Gagnent des **bons d'essence**, **goodies** et **réductions**
- Affichent des publicités sur leurs véhicules
- Suivent leurs gains et statistiques en temps réel
- Choisissent leurs campagnes

#### 👔 **Annonceurs** (Entreprises)
- Lancent des campagnes publicitaires ciblées
- Suivent les performances (impressions, zones, engagement)
- Créent et gèrent leurs budgets
- Accèdent aux analytics en temps réel

#### 👨‍💼 **Administrateurs** (Équipe Woulé)
- Gèrent ambassadeurs et annonceurs (validation, suspension)
- Créent et administrent les campagnes
- **Module de matching intelligent** : algorithme de scoring automatique
- Pilotent les campagnes en temps réel
- Gèrent la facturation (devis, factures, rapprochement bancaire)

---

## 🛠️ Technologies

### Backend
- **Node.js** + **Express** (serveur API REST)
- **SQLite** (base de données embarquée)
- **bcryptjs** (hashage mots de passe)
- **jsonwebtoken** (authentification JWT)
- **CORS** activé

### Frontend
- **HTML5** + **CSS3** + **JavaScript Vanilla**
- **Fetch API** (requêtes HTTP)
- **LocalStorage** (gestion sessions)
- **Google Fonts** (Montserrat, Work Sans)

### Charte graphique
- **Ambassadeur** : Fond jaune `#FFDB15` (énergique)
- **Annonceur** : Fond bleu `#131726` (professionnel)
- **Admin** : Fond gris/violet `#1a1d29` / `#8b5cf6` (corporate)

---

## 📦 Installation

### Prérequis

- **Node.js** version 16+ ([Télécharger](https://nodejs.org/))
- **npm** (installé avec Node.js)

### Étapes d'installation

```bash
# 1. Télécharger ou cloner le projet
# (Décompresser le fichier ZIP si nécessaire)

# 2. Naviguer dans le dossier du projet
cd woule-platform

# 3. Installer les dépendances
npm install

# 4. Créer le fichier .env (copier depuis .env.example)
cp .env.example .env
# Ou sur Windows :
copy .env.example .env

# 5. Initialiser la base de données avec les données de test
npm run seed

# 6. Lancer le serveur
npm start
```

### Résultat attendu

```
🚗💨 ═══════════════════════════════════════════════════════
      ✨ PLATEFORME WOULÉ - SERVEUR DÉMARRÉ ✨
═══════════════════════════════════════════════════════════

🌐 URL: http://localhost:3000
📊 API: http://localhost:3000/api/health

📋 Endpoints disponibles:
   • POST /api/auth/register - Inscription
   • POST /api/auth/login - Connexion
   • GET  /api/auth/me - Profil utilisateur
   • GET  /api/campaigns - Liste des campagnes
   • POST /api/campaigns/:id/apply - Postuler (ambassadeur)
   • GET  /api/matching/campaigns/:id/candidates - Matching (admin)
   • GET  /api/admin/stats - Statistiques globales (admin)

🔐 Comptes de test:
   Ambassadeur: ambassadeur@test.com / password123
   Annonceur: annonceur@test.com / password123
   Admin: admin@woule.com / admin123

💡 Commande: npm run seed (pour charger les données de test)
═══════════════════════════════════════════════════════════
```

### Ouvrir dans le navigateur

```
http://localhost:3000
```

---

## 📂 Structure du projet

```
woule-platform/
│
├── backend/                      # Backend Node.js + Express
│   ├── server.js                 # Serveur principal
│   ├── database.js               # Configuration SQLite + création tables
│   ├── seed.js                   # Script de données de test
│   │
│   ├── controllers/              # Logique métier
│   │   ├── authController.js     # Inscription, connexion, profil
│   │   ├── ambassadorController.js
│   │   ├── advertiserController.js
│   │   ├── campaignController.js
│   │   ├── matchingController.js # ⭐ Algorithme de scoring
│   │   └── adminController.js
│   │
│   ├── routes/                   # Routes API
│   │   ├── auth.js
│   │   ├── ambassadors.js
│   │   ├── advertisers.js
│   │   ├── campaigns.js
│   │   ├── matching.js
│   │   └── admin.js
│   │
│   ├── middleware/               # Middleware Express
│   │   ├── auth.js               # Vérification JWT
│   │   └── roleCheck.js          # Vérification rôles
│   │
│   └── utils/                    # Utilitaires
│       └── scoring.js            # ⭐ Algorithme matching intelligent
│
├── frontend/                     # Frontend statique
│   ├── index.html                # Page d'accueil
│   ├── login.html                # Connexion
│   ├── dashboard-ambassadeur.html
│   ├── dashboard-annonceur.html
│   ├── admin-dashboard.html
│   │
│   ├── css/
│   │   └── global.css            # Styles globaux
│   │
│   └── js/
│       ├── api.js                # Client API (fetch)
│       └── auth.js               # Gestion authentification
│
├── package.json                  # Dépendances npm
├── .env.example                  # Variables d'environnement (template)
├── .gitignore
└── README.md                     # Ce fichier
```

---

## 🔌 API Documentation

### Base URL

```
http://localhost:3000/api
```

### Authentication

Toutes les routes protégées nécessitent un **header Authorization** :

```
Authorization: Bearer <token_jwt>
```

---

### 🔐 Authentication Endpoints

#### POST `/auth/register`
Inscription d'un nouvel utilisateur (ambassadeur ou annonceur).

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "ambassador",
  "first_name": "Marc",
  "last_name": "Duval",
  "phone": "0696123456",
  "type": "individual",
  "zones": ["Fort-de-France"],
  "vehicle_type": "citadine",
  "vehicle_brand": "Peugeot",
  "vehicle_model": "208"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Compte créé avec succès",
  "data": {
    "userId": 1,
    "email": "user@example.com",
    "role": "ambassador"
  }
}
```

#### POST `/auth/login`
Connexion utilisateur.

**Body:**
```json
{
  "email": "ambassadeur@test.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Connexion réussie",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "ambassadeur@test.com",
      "role": "ambassador",
      "status": "validated"
    }
  }
}
```

#### GET `/auth/me` 🔒
Obtenir le profil de l'utilisateur connecté.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "ambassadeur@test.com",
    "role": "ambassador",
    "status": "validated",
    "profile": {
      "first_name": "Marc",
      "last_name": "Duval",
      "score": 4.8,
      "total_km": 1250
    }
  }
}
```

---

### 🚗 Ambassadors Endpoints

#### GET `/ambassadors/me/campaigns` 🔒 (Ambassadeur)
Obtenir les campagnes affectées à l'ambassadeur connecté.

#### GET `/ambassadors/me/stats` 🔒 (Ambassadeur)
Obtenir les statistiques personnelles.

**Response:**
```json
{
  "success": true,
  "data": {
    "score": 4.8,
    "total_campaigns": 3,
    "active_campaigns": 2,
    "total_km": 1250,
    "total_impressions": 45000,
    "total_earnings": 450.50
  }
}
```

#### GET `/ambassadors` 🔒 (Admin)
Liste tous les ambassadeurs (filtres optionnels).

**Query params:** `?status=validated&type=individual`

---

### 👔 Advertisers Endpoints

#### GET `/advertisers/me/stats` 🔒 (Annonceur)
Statistiques de l'annonceur connecté.

#### GET `/advertisers` 🔒 (Admin)
Liste tous les annonceurs.

---

### 📢 Campaigns Endpoints

#### GET `/campaigns` 🔒
Liste des campagnes (filtrées selon le rôle).

**Query params:** `?status=active&advertiser_id=2`

#### GET `/campaigns/:id` 🔒
Détails d'une campagne spécifique.

#### POST `/campaigns` 🔒 (Annonceur/Admin)
Créer une nouvelle campagne.

**Body:**
```json
{
  "name": "Nouvelle Campagne",
  "description": "Description...",
  "start_date": "2026-03-01",
  "end_date": "2026-04-30",
  "budget": 5000,
  "zones": ["Fort-de-France", "Lamentin"],
  "target_ambassadors": 20,
  "target_vehicle_types": ["citadine", "suv"],
  "target_interests": ["famille", "shopping"]
}
```

#### POST `/campaigns/:id/apply` 🔒 (Ambassadeur)
Postuler à une campagne.

#### POST `/campaigns/:id/assign` 🔒 (Admin)
Affecter un ambassadeur à une campagne.

**Body:**
```json
{
  "ambassador_id": 5
}
```

#### GET `/campaigns/:id/applications` 🔒 (Admin)
Obtenir les candidatures d'une campagne.

---

### 🎯 Matching Endpoints (⭐ Feature clé)

#### GET `/matching/campaigns/:id/candidates` 🔒 (Admin)
**Module de matching intelligent** : obtenir les candidats avec scores automatiques.

**Response:**
```json
{
  "success": true,
  "data": {
    "campaign": {
      "id": 1,
      "name": "Lancement Menu Caraïbes",
      "target_ambassadors": 25,
      "zones": ["Fort-de-France", "Lamentin"],
      "target_vehicle_types": ["citadine", "suv"],
      "target_interests": ["famille", "shopping"]
    },
    "candidates": [
      {
        "application_id": 2,
        "ambassador_id": 2,
        "first_name": "Marc",
        "last_name": "Duval",
        "email": "marc.duval@gmail.com",
        "vehicle_brand": "Peugeot",
        "vehicle_model": "208",
        "matching_score": 92,
        "score_details": {
          "zoneScore": 30,
          "vehicleScore": 20,
          "historyScore": 19,
          "frequencyScore": 15,
          "interestScore": 8,
          "total": 92
        }
      }
    ],
    "total_candidates": 15
  }
}
```

**Algorithme de scoring (0-100 points) :**
1. **Zone géographique** : 30 points
2. **Type de véhicule** : 20 points
3. **Historique/Performance** : 20 points
4. **Fréquence de déplacement** : 15 points
5. **Centres d'intérêts** : 15 points

---

### 👨‍💼 Admin Endpoints

#### GET `/admin/stats` 🔒 (Admin)
Statistiques globales de la plateforme.

**Response:**
```json
{
  "success": true,
  "data": {
    "ambassadors": {
      "total": 12,
      "individuals": 10,
      "companies": 2
    },
    "advertisers": {
      "total": 5
    },
    "campaigns": [
      { "status": "active", "count": 2 },
      { "status": "completed", "count": 3 }
    ],
    "total_impressions": 1048237,
    "total_revenue": 51700
  }
}
```

#### PATCH `/admin/users/:id/validate` 🔒 (Admin)
Valider, rejeter ou suspendre un utilisateur.

**Body:**
```json
{
  "action": "validate"
}
```

Actions possibles : `validate`, `reject`, `suspend`

---

## ✨ Fonctionnalités

### ✅ Backend complet
- [x] API REST avec Express
- [x] Base de données SQLite (7 tables)
- [x] Authentification JWT sécurisée
- [x] Middleware de vérification rôles
- [x] **Algorithme de matching intelligent** avec scoring automatique
- [x] CRUD complet (ambassadeurs, annonceurs, campagnes)
- [x] Système de candidatures et affectations
- [x] Gestion facturation (structure prête)

### ✅ Frontend fonctionnel
- [x] Page d'accueil avec choix Ambassadeur/Annonceur
- [x] Page de connexion unifiée
- [x] Dashboard Ambassadeur connecté à l'API
- [x] Dashboard Annonceur connecté à l'API
- [x] Dashboard Admin avec module de matching
- [x] Design responsive (mobile/tablette/desktop)
- [x] Gestion sessions avec localStorage
- [x] Client API complet (fetch)

### ✅ Données de test
- [x] 19 utilisateurs (ambassadeurs, annonceurs, admin)
- [x] 12 ambassadeurs (particuliers et entreprises)
- [x] 5 annonceurs
- [x] 8 campagnes (différents statuts)
- [x] 40+ candidatures avec scores
- [x] 7 affectations d'ambassadeurs
- [x] 5 factures

---

## 🔐 Comptes de test

### Ambassadeur
```
Email: ambassadeur@test.com
Mot de passe: password123
```

**Profil :** Ambassadeur Test (particulier)
- Score : 4.0/5
- Véhicule : Renault Clio (citadine)
- Zone : Fort-de-France

### Annonceur
```
Email: annonceur@test.com
Mot de passe: password123
```

**Profil :** Annonceur Test SAS
- Secteur : Test
- SIRET : 12345678900011

### Administrateur
```
Email: admin@woule.com
Mot de passe: admin123
```

**Accès :** Dashboard admin complet avec module matching

---

### Autres comptes disponibles :

#### Ambassadeurs supplémentaires :
- `marc.duval@gmail.com` / `password123` (Score 4.8/5, Peugeot 208)
- `transportco@pro.fr` / `password123` (Entreprise, Flotte utilitaire)

#### Annonceurs supplémentaires :
- `caraibfoods@company.mq` / `password123` (Caraïb'Foods SAS)
- `totalenergies@company.mq` / `password123` (TotalEnergies)

---

## 🚀 Déploiement

### Option 1 : Railway (Recommandé)

[Railway](https://railway.app/) permet de déployer facilement Node.js + SQLite.

```bash
# 1. Installer Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Initialiser le projet
railway init

# 4. Déployer
railway up

# 5. Ajouter les variables d'environnement
railway variables
```

**Variables à configurer :**
```
PORT=3000
JWT_SECRET=votre_secret_production_très_sécurisé
NODE_ENV=production
```

### Option 2 : Render

[Render](https://render.com/) offre un plan gratuit pour Node.js.

1. Créer un compte sur Render
2. Créer un nouveau **Web Service**
3. Connecter votre repo Git ou uploader les fichiers
4. Configuration :
   - **Build Command** : `npm install && npm run seed`
   - **Start Command** : `npm start`
   - **Environment** : Node
5. Ajouter les variables d'environnement
6. Déployer

### Option 3 : Vercel (Frontend) + Railway (Backend)

**Frontend sur Vercel :**
```bash
cd frontend
vercel
```

**Backend sur Railway (voir Option 1)**

Mettre à jour `API_BASE_URL` dans `frontend/js/api.js` :
```javascript
const API_BASE_URL = 'https://votre-backend.railway.app/api';
```

---

## 🎨 Personnalisation

### Modifier les couleurs

Éditer `/frontend/css/global.css` :

```css
:root {
  --woule-yellow: #FFDB15;    /* Jaune ambassadeur */
  --woule-blue: #131726;      /* Bleu annonceur */
  --woule-purple: #8b5cf6;    /* Violet admin */
}
```

### Ajouter une nouvelle table

1. Créer la table dans `backend/database.js`
2. Créer le controller dans `backend/controllers/`
3. Créer les routes dans `backend/routes/`
4. Importer les routes dans `backend/server.js`

### Modifier l'algorithme de matching

Éditer `backend/utils/scoring.js` :

```javascript
const calculateScore = (ambassador, campaign) => {
  // Modifier les pondérations :
  const zoneWeight = 30;      // Max 30 points
  const vehicleWeight = 20;   // Max 20 points
  const historyWeight = 20;   // Max 20 points
  const frequencyWeight = 15; // Max 15 points
  const interestWeight = 15;  // Max 15 points
  
  // Votre logique personnalisée...
};
```

---

## 📊 Base de données

### Tables SQLite

1. **users** (19 enregistrements)
   - Comptes utilisateurs avec email, password (hashé), rôle, statut

2. **ambassadors** (12 enregistrements)
   - Profils ambassadeurs avec véhicules, zones, fréquence, score

3. **advertisers** (5 enregistrements)
   - Profils annonceurs avec SIRET, secteur, dépenses totales

4. **campaigns** (8 enregistrements)
   - Campagnes avec budgets, zones, cibles, impressions

5. **applications** (40+ enregistrements)
   - Candidatures ambassadeurs aux campagnes avec scores

6. **campaign_ambassadors** (7 enregistrements)
   - Affectations d'ambassadeurs aux campagnes avec performances

7. **invoices** (5 enregistrements)
   - Factures avec montants, statuts, dates

### Voir les données

Pour explorer la base SQLite :

```bash
# Installer sqlite3 CLI (si pas déjà installé)
npm install -g sqlite3

# Ouvrir la base
sqlite3 woule.db

# Commandes utiles :
.tables                 # Liste des tables
.schema users           # Structure d'une table
SELECT * FROM users;    # Afficher données
.quit                   # Quitter
```

---

## 🐛 Troubleshooting

### Erreur "Cannot find module"

```bash
# Réinstaller les dépendances
rm -rf node_modules
npm install
```

### Port 3000 déjà utilisé

Changer le port dans `.env` :
```
PORT=8080
```

### Base de données corrompue

```bash
# Supprimer la base et la recréer
rm woule.db
npm run seed
```

### Token JWT expiré

Se reconnecter à l'application. Les tokens expirent après 7 jours.

### CORS Error

Vérifier que `backend/server.js` inclut bien :
```javascript
app.use(cors());
```

---

## 📝 Scripts npm

```bash
npm start          # Démarrer le serveur (production)
npm run dev        # Démarrer avec nodemon (développement)
npm run seed       # Initialiser/réinitialiser la base de données
```

---

## 🔒 Sécurité

### En production, modifier obligatoirement :

1. **JWT_SECRET** dans `.env` :
   ```
   JWT_SECRET=une_clé_très_longue_et_aléatoire_ultra_sécurisée_123456789
   ```

2. **Hashage bcrypt** : déjà implémenté (10 rounds)

3. **HTTPS** : Obligatoire en production (géré par Railway/Render)

4. **Rate limiting** : À ajouter pour limiter les requêtes

5. **Validation inputs** : Ajouter validation côté backend (express-validator)

---

## 🌟 Roadmap / Prochaines fonctionnalités

### Phase 1 (Backend)
- [ ] Validation avancée des inputs (express-validator)
- [ ] Rate limiting (express-rate-limit)
- [ ] Upload de fichiers (multer + S3)
- [ ] Envoi d'emails (SendGrid/Mailgun)
- [ ] Notifications push (Firebase)

### Phase 2 (Frontend)
- [ ] Formulaires d'inscription complets
- [ ] Wizard de création de campagne
- [ ] Module de facturation complet
- [ ] Carte interactive (Leaflet.js)
- [ ] Graphiques (Chart.js)

### Phase 3 (Features)
- [ ] Tracking GPS en temps réel (WebSockets)
- [ ] Chat ambassadeur-admin
- [ ] Export rapports (PDF/Excel)
- [ ] Système de notifications in-app
- [ ] Multi-langue (FR/EN/Créole)

### Phase 4 (Mobile)
- [ ] Application mobile Flutter
- [ ] Géolocalisation native
- [ ] Notifications push natives

---

## 📞 Support

Pour toute question ou problème :

- **Email** : contact@woule.com
- **Documentation API** : http://localhost:3000/api/health

---

## 📄 Licence

MIT License

Copyright (c) 2026 Woulé

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

## 🙏 Remerciements

Merci d'avoir choisi Woulé ! 🚗💨

**Développé avec ❤️ pour les Antilles et la Guyane**

---

## ⚡ Quick Start (Résumé)

```bash
# Installation
npm install

# Initialiser la base de données
npm run seed

# Lancer le serveur
npm start

# Ouvrir dans le navigateur
open http://localhost:3000

# Connexion avec compte de test
# Email: admin@woule.com
# Mot de passe: admin123
```

**Et c'est parti ! 🚀**

---

**Martinique 🇲🇶 • Guadeloupe 🇬🇵 • Guyane 🇬🇫**
