# SparkleClean Ireland

Nuxt booking site for home cleaning. Submissions are stored in SQLite and emailed to the team.

## Setup

```bash
npm install
cp .env.example .env
```

Fill in Gmail SMTP settings in `.env` (use a [Google App Password](https://support.google.com/accounts/answer/185833)):

```env
NUXT_NOTIFY_EMAIL=mayanping1030@gmail.com
NUXT_SMTP_HOST=smtp.gmail.com
NUXT_SMTP_PORT=587
NUXT_SMTP_USER=mayanping1030@gmail.com
NUXT_SMTP_PASS=your-gmail-app-password
```

Without SMTP credentials, bookings still save to the database; email is skipped with a server warning.

## Development

```bash
npm run dev
```

## Production

```bash
npm run build
npm run preview
```

SQLite data lives under `.data/` (gitignored).
