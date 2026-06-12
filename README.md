# 🥋 Team Family Sports

**Système de Gestion Intégrée pour Club d'Arts Martiaux (SaaS Multi-Tenant)**

![Laravel](https://img.shields.io/badge/Laravel-13-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

**Team Family Sports** est une plateforme complète conçue pour digitaliser l'écosystème d'un dojo ou d'un club d'arts martiaux. De la vitrine publique à la gestion financière stricte, en passant par le suivi des ceintures et la génération d'arbres de tournois, cette application centralise toute l'administration sportive et opérationnelle.

---

## ✨ Fonctionnalités Principales

### 🔒 Gateway & Workflow d'Approbation
- Inscription publique avec sélection de la discipline (Karaté, Kickboxing, etc.).
- Système de sas de validation : tout nouveau compte est en statut `pending` jusqu'à l'approbation de l'Administrateur.

### 👑 Espace Administrateur (Propriétaire)
- **Gestion des utilisateurs :** Approbation, suspension et gestion des rôles.
- **Gestion Financière :** Suivi strict des abonnements (cycle automatisé de 30 jours, alertes de retard).
- **Tournois :** Création d'événements, gestion des catégories (poids/âge) et génération automatique d'arbres de combats (brackets).
- **Dashboard :** Vue d'ensemble des statistiques du club (revenus, présences, inscriptions).

### 🥋 Espace Coach (Entraîneur)
- **Autonomie de Planification :** Création et gestion de ses propres sessions d'entraînement.
- **Roll Call Numérique :** Interface mobile-first pour marquer les présences (Présent, Absent, Excusé) directement sur le tatami.
- **Suivi Pédagogique :** Évaluation et promotion des grades (ceintures) des apprenants.
- **Profil Public :** Affichage des diplômes, Dan, et années d'expérience.

### 🥊 Espace Apprenant (Player)
- **Suivi de Progression :** Historique des grades et des présences.
- **Gestion Financière :** Visibilité sur l'état de l'abonnement et la prochaine échéance.
- **Planning :** Consultation des sessions à venir pour sa discipline et son groupe.

---

## 🛠️ Stack Technique

### Backend (API RESTful)
- **Framework :** Laravel 13
- **Base de données :** MySQL
- **Authentification :** Laravel Sanctum (Token-based)
- **Infrastructure :** Docker / Laravel Sail

### Frontend (SPA)
- **Bibliothèque :** React.js
- **Styling :** Tailwind CSS
- **Requêtes HTTP :** Axios & TanStack Query (React Query) pour le state management asynchrone.

---

## 🚀 Installation & Démarrage (Environnement de Développement)

Prérequis : `Docker`, `Docker Compose`, `Git`, `Node.js` (pour le frontend).

### 1. Cloner le projet

```bash
git clone https://github.com/votre-compte/team-family-sports.git
cd team-family-sports
```

### 2. Configuration du Backend (Laravel Sail)

```bash
cp .env.example .env

docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v $(pwd):/var/www/html \
    -w /var/www/html \
    laravelsail/php83-composer:latest \
    composer install --ignore-platform-reqs
```

```bash
./vendor/bin/sail up -d
```

```bash
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate:fresh --seed
```

### 3. Configuration du Frontend (React)

```bash
npm install
npm run dev
```

## 📅 Roadmap du Projet (Phases Agile)

- [ ] Phase 1 : Configuration Docker/Sail, base de données (ERD) et authentification (Sanctum) avec le sas de validation Admin.
- [ ] Phase 2 : API CRUD pour la gestion des profils globaux (Coach/Apprenant), des disciplines et de la vitrine publique.
- [ ] Phase 3 : Moteur de gestion pédagogique (création des groupes, autonomie de planification des Coaches et système de Roll call).
- [ ] Phase 4 : Module financier (automatisation du cycle de paiement date-à-date) et Dashboard Admin.
- [ ] Phase 5 : Module compétitif (architecture des tournois, catégories de poids/âge et brackets).

## 🤝 Contribution & Équipe

Ce projet est conçu avec une approche Agile/Scrum. Les développements sont répartis sous forme de User Stories assignées lors des sprints de développement.

Maintenu par l'équipe de développement de Team Family Sports.
