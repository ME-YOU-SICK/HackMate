# 🗄️ HackMate Database Setup Guide

This guide explains how to set up and use the Drizzle database system for HackMate platform.

## 📋 Overview

The database system is designed with a **hybrid approach**:
- **Authentication**: Uses real database with SQLite + Drizzle ORM
- **All Other Data**: Remains as mock data (unchanged)
- **Future Ready**: Complete schema available for gradual migration

## 🚀 Quick Start

### 1. Environment Setup

Copy the environment template and configure your settings:

```bash
cp env.database.example .env.local
```

Edit `.env.local` with your configuration:

```env
DATABASE_URL="file:./hackmate.db"
JWT_SECRET="your-super-secret-jwt-key-here-change-this-in-production"
JWT_EXPIRES_IN="7d"
BCRYPT_ROUNDS=12
NODE_ENV="development"
```

### 2. Initialize Database

```bash
# Push schema to database (creates tables)
npm run db:push

# Seed with sample data
npm run db:seed
```

### 3. Verify Setup

```bash
# Open Drizzle Studio (database GUI)
npm run db:studio
```

## 🛠️ Available Commands

| Command | Description |
|---------|-------------|
| `npm run db:generate` | Generate migration files |
| `npm run db:migrate` | Apply migrations |
| `npm run db:push` | Push schema changes (development) |
| `npm run db:studio` | Open Drizzle Studio GUI |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:reset` | Reset database and reseed |

## 📊 Database Schema

### Auth Tables (Active)
- `users` - User authentication and basic info
- `user_sessions` - JWT session management

### Complete Schema (Ready for Future)
- `events` - Event management
- `event_panels` - Event organization
- `teams` - Team formation
- `messages` - Communication system
- `job_postings` - Recruitment system
- `sponsorship_requests` - Funding system
- `skills` - Skills and learning paths

## 🔐 Authentication System

### Features
- ✅ Secure password hashing (bcrypt)
- ✅ JWT token management
- ✅ Session expiration
- ✅ Role-based access control
- ✅ Row Level Security policies

### API Endpoints
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/signin` - Authenticate user
- `POST /api/auth/logout` - End session
- `GET /api/auth/verify` - Verify token

### Sample Accounts
After seeding, you can use these test accounts:

| Role | Email | Password |
|------|-------|----------|
| Participant | participant@example.com | password123 |
| Organizer | organizer@example.com | password123 |
| Recruiter | recruiter@example.com | password123 |
| Sponsor | sponsor@example.com | password123 |

## 🔒 Security Features

### Row Level Security (RLS)
- Users can only access their own data
- Active users only policies
- Role-based access controls
- Session validation

### Password Security
- bcrypt hashing with configurable rounds
- Minimum password requirements
- Secure session management

## 🚀 Deployment

### Netlify Functions
The API endpoints are designed to work with Netlify Functions:

```typescript
// Example usage in frontend
const response = await fetch('/api/auth/signin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password, role })
});
```

### Environment Variables
Set these in your Netlify dashboard:
- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `BCRYPT_ROUNDS`

## 📁 File Structure

```
src/
├── db/
│   ├── index.ts                 # Database connection
│   ├── schema/
│   │   ├── auth.ts             # Auth tables (active)
│   │   ├── events.ts           # Event system (ready)
│   │   ├── teams.ts            # Team management (ready)
│   │   ├── messages.ts         # Communication (ready)
│   │   ├── recruitment.ts      # Job system (ready)
│   │   ├── sponsorship.ts      # Funding system (ready)
│   │   ├── skills.ts           # Skills system (ready)
│   │   └── index.ts            # Export all schemas
│   ├── migrations/             # Auto-generated
│   └── seed.ts                 # Seed data
├── lib/
│   ├── db-auth.ts              # Database auth functions
│   └── rls-policies.ts         # Row Level Security
└── api/
    └── auth/                   # Auth API endpoints
        ├── signup.ts
        ├── signin.ts
        ├── logout.ts
        └── verify.ts
```

## 🔄 Migration Strategy

### Current State
- Authentication: Database-driven
- All other features: Mock data

### Future Migration Options

#### Option 1: Keep Hybrid
- Real auth + mock data forever
- Perfect for demos and prototypes

#### Option 2: Gradual Migration
1. User profiles → Database
2. Events and teams → Database
3. Messages and notifications → Database
4. Recruitment and sponsorship → Database

#### Option 3: Full Migration
- Move everything to database
- Start with this hybrid approach

## 🐛 Troubleshooting

### Common Issues

1. **Database not found**
   ```bash
   npm run db:push
   ```

2. **Migration errors**
   ```bash
   npm run db:reset
   ```

3. **Type errors**
   ```bash
   npm run type-check
   ```

4. **Environment variables**
   - Ensure `.env.local` exists
   - Check JWT_SECRET is set
   - Verify DATABASE_URL path

### Debug Mode
```bash
# Enable verbose logging
DEBUG=drizzle:* npm run dev
```

## 📚 Resources

- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [bcrypt Security](https://github.com/kelektiv/node.bcrypt.js)

## 🤝 Contributing

When adding new features:
1. Update schema files in `src/db/schema/`
2. Add RLS policies in `src/lib/rls-policies.ts`
3. Create API endpoints in `src/api/`
4. Update seed data if needed
5. Test with `npm run db:reset`

---

**Note**: This database system is designed to work alongside the existing mock data without breaking any current functionality. Only authentication is database-driven, everything else remains unchanged.
