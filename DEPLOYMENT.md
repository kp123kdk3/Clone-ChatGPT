# Deployment Guide

This guide covers deploying your ChatGPT Clone to various platforms.

## 🚀 Vercel Deployment (Recommended)

Vercel is the easiest way to deploy Next.js applications and is the recommended approach.

### Prerequisites
- GitHub account
- Vercel account
- PostgreSQL database (Neon, Supabase, or similar)

### Step-by-step Guide

1. **Prepare your repository**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Set up database**
   - Create a PostgreSQL database on [Neon](https://neon.tech/), [Supabase](https://supabase.com/), or [PlanetScale](https://planetscale.com/)
   - Copy the connection string

3. **Deploy to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables (see below)
   - Deploy

4. **Configure Environment Variables**
   In your Vercel project settings, add these environment variables:
   ```
   DATABASE_URL=your_postgresql_connection_string
   NEXTAUTH_URL=https://your-app-name.vercel.app
   NEXTAUTH_SECRET=your-secure-random-string
   OPENAI_API_KEY=your-openai-api-key
   JWT_SECRET=your-jwt-secret
   ```

5. **Run database migrations**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations
   npx prisma db push
   ```

### Custom Domain (Optional)
1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update NEXTAUTH_URL to your custom domain

## 🐳 Docker Deployment

### Create Dockerfile
```dockerfile
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/chatgpt_clone
      - NEXTAUTH_URL=http://localhost:3000
      - NEXTAUTH_SECRET=your-secret
      - OPENAI_API_KEY=your-api-key
      - JWT_SECRET=your-jwt-secret
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=chatgpt_clone
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

## 🌊 Railway Deployment

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and initialize**
   ```bash
   railway login
   railway init
   ```

3. **Add PostgreSQL**
   ```bash
   railway add --plugin postgresql
   ```

4. **Set environment variables**
   ```bash
   railway variables set NEXTAUTH_URL=https://your-app.railway.app
   railway variables set NEXTAUTH_SECRET=your-secret
   railway variables set OPENAI_API_KEY=your-api-key
   railway variables set JWT_SECRET=your-jwt-secret
   ```

5. **Deploy**
   ```bash
   railway up
   ```

## 🎯 Netlify Deployment

While Netlify primarily hosts static sites, you can deploy the frontend and use serverless functions.

### Build Configuration
Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NEXT_TELEMETRY_DISABLED = "1"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 🏗️ Self-Hosted VPS Deployment

### Using PM2
1. **Set up your server**
   ```bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2
   npm install -g pm2
   ```

2. **Deploy your code**
   ```bash
   git clone your-repository
   cd chatgpt-clone
   npm install
   npm run build
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your production values
   ```

4. **Start with PM2**
   ```bash
   pm2 start npm --name "chatgpt-clone" -- start
   pm2 save
   pm2 startup
   ```

### Using Nginx (Reverse Proxy)
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔒 Environment Variables

### Required Variables
```bash
# Database
DATABASE_URL="postgresql://user:password@host:5432/database"

# Authentication
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-secure-random-string-32-chars-min"

# OpenAI
OPENAI_API_KEY="sk-your-openai-api-key"

# JWT
JWT_SECRET="your-jwt-secret-32-chars-min"
```

### Optional Variables
```bash
# Database connection pooling
DATABASE_URL_UNPOOLED="direct-connection-string"

# Analytics
NEXT_PUBLIC_GA_ID="GA-TRACKING-ID"

# Error reporting
SENTRY_DSN="your-sentry-dsn"
```

## 🗄️ Database Setup

### Neon (Recommended)
1. Visit [Neon](https://neon.tech/)
2. Create a new project
3. Copy the connection string
4. Add to environment variables

### Supabase
1. Visit [Supabase](https://supabase.com/)
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string
5. Add to environment variables

### PlanetScale
1. Visit [PlanetScale](https://planetscale.com/)
2. Create a new database
3. Create a new branch
4. Get connection string
5. Add to environment variables

## 🔄 Continuous Deployment

### GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build application
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-args: '--prod'
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🔍 Health Checks

Add health check endpoint in `src/app/api/health/route.ts`:
```typescript
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`
    
    return NextResponse.json({ 
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
        api: 'running'
      }
    })
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'unhealthy',
        error: 'Database connection failed'
      },
      { status: 503 }
    )
  }
}
```

## 📊 Monitoring

### Performance Monitoring
- Use Vercel Analytics for deployment metrics
- Add Sentry for error tracking
- Monitor API response times

### Database Monitoring
- Set up connection pooling
- Monitor query performance
- Set up alerts for connection issues

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check environment variables
   - Ensure all dependencies are installed
   - Verify TypeScript compilation

2. **Database Connection Issues**
   - Verify connection string format
   - Check firewall/network settings
   - Ensure database is accessible

3. **Authentication Problems**
   - Verify NEXTAUTH_URL matches deployment URL
   - Check NEXTAUTH_SECRET is set
   - Ensure JWT_SECRET is configured

4. **API Rate Limits**
   - Monitor OpenAI API usage
   - Implement rate limiting
   - Add error handling for API failures

### Debug Mode
Enable debug logging:
```bash
DEBUG=1 npm start
```

## 📋 Deployment Checklist

- [ ] Environment variables configured
- [ ] Database schema migrated
- [ ] SSL certificate installed
- [ ] Domain configured
- [ ] Health checks working
- [ ] Error monitoring setup
- [ ] Backup strategy implemented
- [ ] Performance monitoring active
- [ ] Security headers configured
- [ ] Rate limiting implemented

---

**Need help with deployment? Check our [troubleshooting guide](TROUBLESHOOTING.md) or [create an issue](issues).**