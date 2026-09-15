# GoTube React + Laravel 12

Converted from the provided GoTube HTML theme into a Laravel 12 API backend with a React/Vite frontend.

## What Is Included

- React SPA with home feed, video detail, channels, categories, library pages, auth screens, pricing, help, privacy, terms, settings, upload modal, search, sidebar, and dark mode.
- Laravel 12 API with videos, channels, categories, comments, auth, upload, like, watch-later, history endpoints.
- Original theme assets copied into `public/assets`, with extra React-specific polish in `resources/css/app.css`.
- MySQL-ready migrations and seed data.

## Setup

Create the MySQL database and user first (set your own password, then put it in `DB_PASSWORD` in `.env`):

```sql
CREATE DATABASE gotube CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'gotube'@'localhost' IDENTIFIED BY 'your-password';
GRANT ALL PRIVILEGES ON gotube.* TO 'gotube'@'localhost';
FLUSH PRIVILEGES;
```

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
npm install
npm run dev
php artisan serve
```

Open `http://127.0.0.1:8000`.

Demo login after seeding:

```text
Email: admin@gotube.test
Password: password
```

## Notes

- This project targets Laravel 12 as requested. On this machine PHP was not available in PATH, so backend runtime commands could not be executed here.
- If you run Vite separately on `127.0.0.1:5173`, keep the Laravel API on `127.0.0.1:8000`.

