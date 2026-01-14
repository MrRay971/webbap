# 🚀 Guide de Démarrage Rapide - Woulé

## ⚡ En 5 minutes, votre plateforme est opérationnelle !

---

## 📋 Étape 1 : Installation (2 minutes)

### Prérequis
- **Node.js 16+** installé ([Télécharger ici](https://nodejs.org/))

### Commandes

```bash
# Ouvrir un terminal dans le dossier du projet

# 1. Installer les dépendances
npm install

# 2. Créer le fichier d'environnement
# Sur Mac/Linux :
cp .env.example .env

# Sur Windows :
copy .env.example .env

# 3. Initialiser la base de données
npm run seed
```

---

## 🎯 Étape 2 : Lancer le serveur (30 secondes)

```bash
npm start
```

Vous devriez voir :

```
✨ PLATEFORME WOULÉ - SERVEUR DÉMARRÉ ✨
🌐 URL: http://localhost:3000
```

---

## 🌐 Étape 3 : Ouvrir dans votre navigateur

Ouvrez votre navigateur et allez sur :

```
http://localhost:3000
```

Vous verrez la page d'accueil Woulé ! 🎉

---

## 🔐 Étape 4 : Se connecter avec les comptes de test

### Option 1 : Connexion Admin (Recommandé)

1. Cliquez sur **"Déjà inscrit ? Connectez-vous ici"**
2. Entrez les identifiants :

```
Email: admin@woule.com
Mot de passe: admin123
```

3. Vous accédez au **Dashboard Administrateur** avec :
   - Statistiques globales
   - Module de matching intelligent
   - Gestion complète

### Option 2 : Connexion Ambassadeur

```
Email: ambassadeur@test.com
Mot de passe: password123
```

Vous verrez :
- Vos campagnes actives
- Vos statistiques (km, gains, impressions)
- Design jaune #FFDB15

### Option 3 : Connexion Annonceur

```
Email: annonceur@test.com
Mot de passe: password123
```

Vous verrez :
- Vos campagnes
- Budget et impressions
- Design bleu #131726

---

## 🎯 Étape 5 : Tester le Module de Matching (Admin)

**Le module star de Woulé !** 🌟

1. Connectez-vous en tant qu'**admin** (voir Étape 4)
2. Scrollez jusqu'à la section **"Module de Matching Intelligent"**
3. Dans le menu déroulant, sélectionnez une campagne (par ex. "Lancement Menu Caraïbes")
4. **Boom !** 💥 Vous voyez tous les candidats classés par score (0-100)

### Comprendre les scores

```
Score 80-100 : 🟢 Excellent match
Score 60-79  : 🟡 Bon match
Score 0-59   : 🔴 Match faible
```

Le score est calculé automatiquement selon :
- ✅ Zone géographique (30 pts)
- ✅ Type de véhicule (20 pts)
- ✅ Historique de performance (20 pts)
- ✅ Fréquence de déplacement (15 pts)
- ✅ Centres d'intérêts (15 pts)

5. Cliquez sur **"✅ Affecter"** pour affecter un ambassadeur à la campagne

---

## 📊 Ce qui est déjà dans la base de données

Après `npm run seed`, vous avez :

- **19 utilisateurs** (ambassadeurs, annonceurs, admin)
- **12 ambassadeurs** (particuliers + entreprises)
- **5 annonceurs** (Caraïb'Foods, TotalEnergies, Casino, Orange, Decathlon)
- **8 campagnes** (actives, programmées, terminées)
- **40+ candidatures** avec scores calculés
- **5 factures**

Tout est prêt pour tester ! 🎉

---

## 🧪 Tester l'API directement

### Via le navigateur

Ouvrez :
```
http://localhost:3000/api/health
```

Vous devriez voir :
```json
{
  "success": true,
  "message": "API Woulé opérationnelle",
  "timestamp": "2026-01-13T18:30:00.000Z"
}
```

### Via cURL ou Postman

**Exemple : Login**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@woule.com","password":"admin123"}'
```

**Exemple : Obtenir les stats (avec token)**
```bash
curl http://localhost:3000/api/admin/stats \
  -H "Authorization: Bearer VOTRE_TOKEN_JWT"
```

---

## 🔧 Commandes Utiles

```bash
# Démarrer le serveur
npm start

# Démarrer avec auto-reload (développement)
npm run dev

# Réinitialiser la base de données
rm woule.db           # Supprimer l'ancienne base
npm run seed          # Recréer avec données de test

# Arrêter le serveur
Ctrl + C (dans le terminal)
```

---

## 🐛 Problèmes Courants

### Le serveur ne démarre pas

**Erreur : "Port 3000 already in use"**

Solution : Changer le port dans `.env`
```
PORT=8080
```

Puis relancer `npm start`

### Erreur "Cannot find module"

Solution :
```bash
rm -rf node_modules
npm install
```

### Base de données corrompue

Solution :
```bash
rm woule.db
npm run seed
npm start
```

---

## 📱 Interfaces Disponibles

| URL | Interface | Compte de test |
|-----|-----------|----------------|
| `http://localhost:3000` | Page d'accueil | - |
| `http://localhost:3000/login.html` | Connexion | Tous |
| `http://localhost:3000/dashboard-ambassadeur.html` | Dashboard Ambassadeur | `ambassadeur@test.com` |
| `http://localhost:3000/dashboard-annonceur.html` | Dashboard Annonceur | `annonceur@test.com` |
| `http://localhost:3000/admin-dashboard.html` | Dashboard Admin | `admin@woule.com` |

---

## 🎨 Personnalisation Rapide

### Changer les couleurs

Éditez `frontend/css/global.css` :

```css
:root {
  --woule-yellow: #FFDB15;    /* Votre jaune */
  --woule-blue: #131726;      /* Votre bleu */
  --woule-purple: #8b5cf6;    /* Votre violet */
}
```

### Modifier le nom de l'entreprise

Cherchez et remplacez "Woulé" dans tous les fichiers HTML.

---

## 📖 Documentation Complète

Pour plus d'informations, consultez le **README.md** qui contient :

- 📋 Documentation API complète
- 🗂️ Structure détaillée du projet
- 🚀 Guide de déploiement (Railway, Render, Vercel)
- 🔒 Bonnes pratiques de sécurité
- 🐛 Troubleshooting avancé

---

## 🎯 Prochaines Étapes Suggérées

### Développement

1. **Tester toutes les fonctionnalités** dans le navigateur
2. **Explorer l'API** avec Postman ou cURL
3. **Modifier le code** selon vos besoins
4. **Ajouter de nouvelles fonctionnalités**

### Production

1. **Modifier JWT_SECRET** dans `.env` (sécurité !)
2. **Choisir un hébergeur** (Railway, Render, Vercel)
3. **Configurer les variables d'environnement**
4. **Déployer** avec `git push` ou upload

---

## 🆘 Besoin d'Aide ?

- **README.md** : Documentation complète
- **Console du navigateur** (F12) : Voir les erreurs JavaScript
- **Terminal** : Voir les logs du serveur

---

## ✅ Checklist de Vérification

Avant de commencer le développement, vérifiez :

- ✅ Node.js installé (`node --version`)
- ✅ `npm install` exécuté sans erreur
- ✅ `npm run seed` créé la base `woule.db`
- ✅ `npm start` démarre le serveur
- ✅ `http://localhost:3000` accessible dans le navigateur
- ✅ Connexion admin fonctionne
- ✅ Dashboard admin affiche les statistiques
- ✅ Module de matching affiche les candidats

**Tout fonctionne ?** 🎉 **Vous êtes prêt !**

---

## 🌟 Félicitations !

Vous avez maintenant une **plateforme Woulé complète et fonctionnelle** !

**Backend :** ✅ API REST opérationnelle
**Frontend :** ✅ 3 dashboards fonctionnels  
**Base de données :** ✅ Données de test chargées  
**Matching :** ✅ Algorithme intelligent actif

**Bon développement ! 🚗💨**

---

**Développé avec ❤️ pour les Antilles et la Guyane**

Martinique 🇲🇶 • Guadeloupe 🇬🇵 • Guyane 🇬🇫
