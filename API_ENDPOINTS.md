# 🔌 API Endpoints - Plateforme Woulé

## Base URL

```
http://localhost:3000/api
```

**En production :** Remplacer `localhost:3000` par votre domaine.

---

## 🔐 Authentication

Toutes les routes avec 🔒 nécessitent un **Bearer Token** dans le header :

```
Authorization: Bearer <votre_token_jwt>
```

---

## 📋 Table des matières

- [Authentication](#authentication)
- [Ambassadors](#ambassadors)
- [Advertisers](#advertisers)
- [Campaigns](#campaigns)
- [Matching](#matching-star)
- [Admin](#admin)

---

## Authentication

### POST `/auth/register`
Inscription d'un nouvel utilisateur (ambassadeur ou annonceur).

**Accès :** Public

**Body :**
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
  "vehicle_type": "citadine"
}
```

**Response 201 :**
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

---

### POST `/auth/login`
Connexion utilisateur.

**Accès :** Public

**Body :**
```json
{
  "email": "ambassadeur@test.com",
  "password": "password123"
}
```

**Response 200 :**
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

---

### GET `/auth/me` 🔒
Obtenir le profil de l'utilisateur connecté.

**Accès :** Tous les utilisateurs authentifiés

**Response 200 :**
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

## Ambassadors

### GET `/ambassadors/me/campaigns` 🔒
Obtenir les campagnes affectées à l'ambassadeur connecté.

**Accès :** Ambassadeur uniquement

**Response 200 :**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Lancement Menu Caraïbes",
      "advertiser_name": "Caraïb'Foods SAS",
      "km_driven": 450,
      "impressions_generated": 12500,
      "earnings": 125.50,
      "assignment_status": "active",
      "assigned_at": "2026-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### GET `/ambassadors/me/stats` 🔒
Obtenir les statistiques personnelles de l'ambassadeur.

**Accès :** Ambassadeur uniquement

**Response 200 :**
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

---

### GET `/ambassadors` 🔒
Liste tous les ambassadeurs (avec filtres optionnels).

**Accès :** Admin uniquement

**Query params :**
- `status` : `pending`, `validated`, `suspended`, `rejected`
- `type` : `individual`, `company`

**Exemple :** `/ambassadors?status=validated&type=individual`

**Response 200 :**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "first_name": "Marc",
      "last_name": "Duval",
      "email": "marc.duval@gmail.com",
      "type": "individual",
      "score": 4.8,
      "vehicle_brand": "Peugeot",
      "vehicle_model": "208",
      "user_status": "validated"
    }
  ]
}
```

---

## Advertisers

### GET `/advertisers/me/stats` 🔒
Obtenir les statistiques de l'annonceur connecté.

**Accès :** Annonceur uniquement

**Response 200 :**
```json
{
  "success": true,
  "data": {
    "total_spent": 12500,
    "total_campaigns": 5,
    "active_campaigns": 2,
    "completed_campaigns": 3,
    "total_budget": 25000,
    "total_impressions": 500000
  }
}
```

---

### GET `/advertisers` 🔒
Liste tous les annonceurs.

**Accès :** Admin uniquement

**Query params :**
- `status` : `pending`, `validated`, `suspended`, `rejected`

**Response 200 :**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "user_id": 2,
      "company_name": "Caraïb'Foods SAS",
      "siret": "85234567800012",
      "sector": "Agroalimentaire",
      "email": "caraibfoods@company.mq",
      "total_spent": 12500,
      "user_status": "validated"
    }
  ]
}
```

---

## Campaigns

### GET `/campaigns` 🔒
Liste des campagnes (filtrées selon le rôle de l'utilisateur).

**Accès :** Tous les utilisateurs authentifiés

**Comportement :**
- **Ambassadeur** : Voit uniquement les campagnes `active` ou `scheduled`
- **Annonceur** : Voit ses propres campagnes
- **Admin** : Voit toutes les campagnes

**Query params :**
- `status` : `draft`, `pending`, `scheduled`, `active`, `completed`, `cancelled`
- `advertiser_id` : ID de l'annonceur

**Response 200 :**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Lancement Menu Caraïbes",
      "advertiser_id": 2,
      "advertiser_name": "Caraïb'Foods SAS",
      "budget": 5000,
      "status": "active",
      "start_date": "2026-01-01",
      "end_date": "2026-02-28",
      "impressions": 234567,
      "target_ambassadors": 25
    }
  ]
}
```

---

### GET `/campaigns/:id` 🔒
Obtenir les détails d'une campagne spécifique.

**Accès :** Tous les utilisateurs authentifiés

**Response 200 :**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Lancement Menu Caraïbes",
    "description": "Promotion du nouveau menu...",
    "advertiser_name": "Caraïb'Foods SAS",
    "budget": 5000,
    "status": "active",
    "zones": "[\"Fort-de-France\",\"Lamentin\"]",
    "target_vehicle_types": "[\"citadine\",\"suv\"]",
    "assigned_ambassadors": 8
  }
}
```

---

### POST `/campaigns` 🔒
Créer une nouvelle campagne.

**Accès :** Annonceur ou Admin

**Body :**
```json
{
  "name": "Nouvelle Campagne",
  "description": "Description de la campagne",
  "start_date": "2026-03-01",
  "end_date": "2026-04-30",
  "budget": 5000,
  "zones": ["Fort-de-France", "Lamentin"],
  "target_ambassadors": 20,
  "target_vehicle_types": ["citadine", "suv"],
  "target_interests": ["famille", "shopping"]
}
```

**Pour Admin :** Ajouter `advertiser_id` obligatoire

**Response 201 :**
```json
{
  "success": true,
  "message": "Campagne créée avec succès",
  "data": {
    "id": 9
  }
}
```

---

### POST `/campaigns/:id/apply` 🔒
Postuler à une campagne.

**Accès :** Ambassadeur uniquement

**Response 201 :**
```json
{
  "success": true,
  "message": "Candidature envoyée avec succès"
}
```

**Erreur 400 (déjà postulé) :**
```json
{
  "success": false,
  "message": "Vous avez déjà postulé à cette campagne"
}
```

---

### POST `/campaigns/:id/assign` 🔒
Affecter un ambassadeur à une campagne.

**Accès :** Admin uniquement

**Body :**
```json
{
  "ambassador_id": 5
}
```

**Response 201 :**
```json
{
  "success": true,
  "message": "Ambassadeur affecté avec succès"
}
```

---

### GET `/campaigns/:id/applications` 🔒
Obtenir les candidatures d'une campagne.

**Accès :** Admin uniquement

**Response 200 :**
```json
{
  "success": true,
  "data": [
    {
      "id": 2,
      "campaign_id": 1,
      "ambassador_id": 2,
      "first_name": "Marc",
      "last_name": "Duval",
      "company_name": null,
      "vehicle_brand": "Peugeot",
      "vehicle_model": "208",
      "score": 92,
      "ambassador_score": 4.8,
      "status": "pending",
      "applied_at": "2026-01-10T14:25:00.000Z"
    }
  ]
}
```

---

## Matching ⭐

### GET `/matching/campaigns/:id/candidates` 🔒
**Module de matching intelligent** : Obtenir les candidats avec scores calculés automatiquement.

**Accès :** Admin uniquement

**Description :** 
Algorithme de scoring qui évalue chaque candidat sur 100 points selon 5 critères :
- Zone géographique (30 pts)
- Type de véhicule (20 pts)
- Historique/Performance (20 pts)
- Fréquence de déplacement (15 pts)
- Centres d'intérêts (15 pts)

Les candidats sont triés du meilleur score au moins bon.

**Response 200 :**
```json
{
  "success": true,
  "data": {
    "campaign": {
      "id": 1,
      "name": "Lancement Menu Caraïbes",
      "target_ambassadors": 25,
      "zones": "[\"Fort-de-France\",\"Lamentin\"]",
      "target_vehicle_types": "[\"citadine\",\"suv\"]",
      "target_interests": "[\"famille\",\"shopping\"]"
    },
    "candidates": [
      {
        "application_id": 2,
        "ambassador_id": 2,
        "first_name": "Marc",
        "last_name": "Duval",
        "type": "individual",
        "email": "marc.duval@gmail.com",
        "vehicle_brand": "Peugeot",
        "vehicle_model": "208",
        "vehicle_type": "citadine",
        "zones": "[\"Fort-de-France\",\"Lamentin\",\"Schoelcher\"]",
        "frequency": "daily",
        "interests": "[\"famille\",\"shopping\",\"sport\"]",
        "ambassador_score": 4.8,
        "total_km": 1250,
        "matching_score": 92,
        "score_details": {
          "zoneScore": 30,
          "vehicleScore": 20,
          "historyScore": 19,
          "frequencyScore": 15,
          "interestScore": 8,
          "total": 92
        },
        "applied_at": "2026-01-10T14:25:00.000Z"
      }
    ],
    "total_candidates": 15
  }
}
```

---

### POST `/matching/campaigns/:id/recalculate` 🔒
Recalculer les scores de toutes les applications d'une campagne.

**Accès :** Admin uniquement

**Response 200 :**
```json
{
  "success": true,
  "message": "15 scores recalculés avec succès"
}
```

---

## Admin

### GET `/admin/stats` 🔒
Obtenir les statistiques globales de la plateforme.

**Accès :** Admin uniquement

**Response 200 :**
```json
{
  "success": true,
  "data": {
    "users": [
      { "role": "ambassador", "status": "validated", "count": 12 },
      { "role": "advertiser", "status": "validated", "count": 5 },
      { "role": "admin", "status": "validated", "count": 1 }
    ],
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
      { "status": "scheduled", "count": 1 },
      { "status": "completed", "count": 3 },
      { "status": "pending", "count": 2 }
    ],
    "total_impressions": 1048237,
    "total_revenue": 51700
  }
}
```

---

### PATCH `/admin/users/:id/validate` 🔒
Valider, rejeter ou suspendre un utilisateur.

**Accès :** Admin uniquement

**Body :**
```json
{
  "action": "validate"
}
```

**Actions possibles :**
- `validate` : Valider le compte
- `reject` : Rejeter le compte
- `suspend` : Suspendre le compte

**Response 200 :**
```json
{
  "success": true,
  "message": "Utilisateur validated"
}
```

**Erreur 404 :**
```json
{
  "success": false,
  "message": "Utilisateur non trouvé"
}
```

---

## 🔒 Codes de Statut HTTP

| Code | Signification |
|------|---------------|
| 200 | Succès (GET, PATCH) |
| 201 | Créé avec succès (POST) |
| 204 | Succès sans contenu (DELETE) |
| 400 | Requête invalide (données manquantes/incorrectes) |
| 401 | Non authentifié (token manquant/invalide) |
| 403 | Non autorisé (rôle insuffisant) |
| 404 | Ressource non trouvée |
| 500 | Erreur serveur |

---

## 🧪 Exemples avec cURL

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@woule.com","password":"admin123"}'
```

### Obtenir les stats admin (avec token)
```bash
curl http://localhost:3000/api/admin/stats \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Obtenir les candidats matching
```bash
curl http://localhost:3000/api/matching/campaigns/1/candidates \
  -H "Authorization: Bearer <votre_token>"
```

### Affecter un ambassadeur
```bash
curl -X POST http://localhost:3000/api/campaigns/1/assign \
  -H "Authorization: Bearer <votre_token>" \
  -H "Content-Type: application/json" \
  -d '{"ambassador_id": 5}'
```

---

## 📊 Format de Réponse Standard

Toutes les réponses API suivent ce format :

**Succès :**
```json
{
  "success": true,
  "message": "Message de succès (optionnel)",
  "data": { ... }
}
```

**Erreur :**
```json
{
  "success": false,
  "message": "Description de l'erreur"
}
```

---

## 🔐 Rôles et Permissions

| Endpoint | Ambassadeur | Annonceur | Admin |
|----------|-------------|-----------|-------|
| `/auth/register` | ✅ | ✅ | ❌ |
| `/auth/login` | ✅ | ✅ | ✅ |
| `/auth/me` | ✅ | ✅ | ✅ |
| `/ambassadors/me/*` | ✅ | ❌ | ❌ |
| `/ambassadors` | ❌ | ❌ | ✅ |
| `/advertisers/me/*` | ❌ | ✅ | ❌ |
| `/advertisers` | ❌ | ❌ | ✅ |
| `/campaigns` (GET) | ✅ | ✅ | ✅ |
| `/campaigns` (POST) | ❌ | ✅ | ✅ |
| `/campaigns/:id/apply` | ✅ | ❌ | ❌ |
| `/campaigns/:id/assign` | ❌ | ❌ | ✅ |
| `/matching/*` | ❌ | ❌ | ✅ |
| `/admin/*` | ❌ | ❌ | ✅ |

---

## 💡 Tips

1. **Toujours inclure le header `Content-Type: application/json`** pour les POST/PATCH
2. **Stocker le token JWT** après login pour les requêtes suivantes
3. **Le token expire après 7 jours** (configurable dans .env)
4. **Les erreurs 401 déconnectent automatiquement** l'utilisateur côté frontend
5. **Les candidats du matching sont triés du meilleur au moins bon score**

---

**Documentation complète dans README.md**

🚗💨 Plateforme Woulé - API REST
