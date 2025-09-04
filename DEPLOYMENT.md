# HackMate Platform - Deployment Guide

## Netlify Deployment

### Prerequisites
- GitHub repository with the HackMate Platform code
- Netlify account

### Steps to Deploy

1. **Connect Repository to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Select the repository containing HackMate Platform

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: `18`

3. **Set Environment Variables**
   In Netlify dashboard, go to Site settings > Environment variables and add:
   ```
   JWT_SECRET=your-super-secret-jwt-key-here
   NODE_ENV=production
   ```

4. **Deploy**
   - Click "Deploy site"
   - Wait for the build to complete

### Important Notes

- **Database**: The app uses an in-memory SQLite database on Netlify (data won't persist between deployments)
- **Authentication**: Works for demo purposes but data resets on each deployment
- **API Routes**: Next.js API routes are automatically handled by Netlify

### For Production Use

To make this production-ready, you'll need to:

1. **Replace SQLite with a cloud database**:
   - Use PlanetScale, Supabase, or Neon
   - Update `src/db/index.ts` to use the cloud database
   - Set `DATABASE_URL` environment variable

2. **Set up proper authentication**:
   - Use NextAuth.js or similar
   - Configure OAuth providers
   - Set up proper session management

3. **Add file storage**:
   - Use Cloudinary, AWS S3, or similar
   - For user avatars and file uploads

## Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd hackmate-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your values
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Open [http://localhost:3000](http://localhost:3000)

## Troubleshooting

### Common Issues

1. **Build fails on Netlify**
   - Check Node.js version (should be 18)
   - Ensure all dependencies are in package.json
   - Check build logs for specific errors

2. **Database errors**
   - The app automatically falls back to in-memory database on Netlify
   - For local development, ensure the database file is created

3. **Authentication not working**
   - Check JWT_SECRET environment variable
   - Ensure API routes are properly configured

### Support

For issues or questions, please check the GitHub repository issues or create a new one.
