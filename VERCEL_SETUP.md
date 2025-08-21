# 🚀 Vercel Deployment Setup Guide

This guide will walk you through connecting your ChatGPT Clone to Vercel for automatic deployment.

## ✨ What You'll Get

- **Automatic Deployment** - Every push to main deploys to production
- **Global CDN** - Your app served from the edge worldwide
- **SSL Certificates** - Automatic HTTPS for security
- **Custom Domains** - Use your own domain name
- **Preview Deployments** - Test changes before going live
- **Analytics** - Built-in performance monitoring

## 🛠️ Step-by-Step Setup

### **Step 1: Create Vercel Account**

1. **Visit [Vercel.com](https://vercel.com)**
2. **Click "Sign Up"** or "Login"
3. **Choose "Continue with GitHub"** (recommended)
4. **Authorize Vercel** to access your GitHub account

### **Step 2: Import Your Repository**

1. **In Vercel Dashboard**, click **"New Project"**
2. **Find your repository**: `kp123kdk3/Clone-ChatGPT`
3. **Click "Import"**

### **Step 3: Configure Project Settings**

#### **Basic Configuration**
- **Project Name**: `chatgpt-clone` (or your preferred name)
- **Framework Preset**: `Next.js` (should auto-detect)
- **Root Directory**: `./` (leave as default)
- **Build Command**: `npm run build` (should auto-detect)
- **Output Directory**: `.next` (should auto-detect)

#### **Advanced Configuration**
- **Install Command**: `npm install` (should auto-detect)
- **Development Command**: `npm run dev` (should auto-detect)

### **Step 4: Set Environment Variables**

**⚠️ IMPORTANT**: Add these environment variables in Vercel:

```env
# Database
DATABASE_URL=your_postgresql_connection_string

# Authentication
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your-secure-random-string-32-chars-min

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key

# JWT
JWT_SECRET=your-jwt-secret-32-chars-min
```

#### **How to Add Environment Variables in Vercel:**

1. **In your project dashboard**, go to **"Settings"**
2. **Click "Environment Variables"**
3. **Add each variable** with the correct name and value
4. **Select environments**: Production, Preview, and Development
5. **Click "Save"**

#### **Generate Secure Secrets:**

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate JWT_SECRET
openssl rand -base64 32
```

### **Step 5: Deploy**

1. **Click "Deploy"**
2. **Wait for build** (usually 2-5 minutes)
3. **Your app will be live** at `https://your-app-name.vercel.app`

## 🔑 Get Vercel Credentials for GitHub Actions

After successful deployment, you need these for automatic deployment:

### **1. Get Project ID and Organization ID**

1. **Go to your project dashboard**
2. **Click "Settings"**
3. **Scroll down to "General"**
4. **Copy "Project ID"**
5. **Copy "Team ID"** (this is your Organization ID)

### **2. Create Vercel Token**

1. **Go to [Vercel Account Settings](https://vercel.com/account/tokens)**
2. **Click "Create"**
3. **Name**: `GitHub Actions Deploy`
4. **Expiration**: `No expiration` (or set a date)
5. **Copy the token**

### **3. Add GitHub Secrets**

1. **Go to your GitHub repository**
2. **Click "Settings"**
3. **Click "Secrets and variables" → "Actions"**
4. **Add these secrets**:

| Secret Name | Value |
|-------------|-------|
| `VERCEL_TOKEN` | Your Vercel token |
| `ORG_ID` | Your Team/Organization ID |
| `PROJECT_ID` | Your Project ID |

## 🔄 Test Automatic Deployment

### **1. Make a Change**
```bash
# Make a small change to any file
echo "# Test Vercel Deployment" >> TEST.md
```

### **2. Push to GitHub**
```bash
npm run update
```

### **3. Watch Deployment**
- **Check GitHub Actions**: https://github.com/kp123kdk3/Clone-ChatGPT/actions
- **Check Vercel Dashboard**: Your project dashboard
- **Visit your live site**: `https://your-app-name.vercel.app`

## 🌐 Custom Domain (Optional)

### **Add Custom Domain:**

1. **In Vercel Dashboard**, go to **"Settings" → "Domains"**
2. **Click "Add Domain"**
3. **Enter your domain**: `chat.yourdomain.com`
4. **Follow DNS instructions** to point your domain to Vercel
5. **Update NEXTAUTH_URL** to your custom domain

### **Update Environment Variables:**
```env
NEXTAUTH_URL=https://chat.yourdomain.com
```

## 📊 Monitor Your Deployment

### **Vercel Dashboard Features:**
- **Deployment History** - See all deployments
- **Performance Analytics** - Core Web Vitals
- **Function Logs** - API endpoint monitoring
- **Edge Network** - Global performance metrics

### **GitHub Actions Integration:**
- **Automatic deployment** on every push to main
- **Preview deployments** for pull requests
- **Build status** in your repository

## 🐛 Troubleshooting

### **Common Issues:**

#### **Build Failures**
```bash
# Check build logs in Vercel dashboard
# Common causes:
# - Missing environment variables
# - Build command errors
# - Dependency issues
```

#### **Environment Variable Issues**
```bash
# Ensure all required variables are set
# Check variable names match exactly
# Verify values are correct
```

#### **Database Connection Issues**
```bash
# Check DATABASE_URL format
# Ensure database is accessible from Vercel
# Check firewall/network settings
```

### **Debug Commands:**
```bash
# Test build locally
npm run build

# Check environment variables
echo $DATABASE_URL

# Test database connection
npx prisma db pull
```

## 🔒 Security Best Practices

### **Environment Variables:**
- ✅ **Never commit** `.env` files to git
- ✅ **Use strong secrets** (32+ characters)
- ✅ **Rotate secrets** regularly
- ✅ **Limit access** to production secrets

### **Database Security:**
- ✅ **Use connection pooling** in production
- ✅ **Enable SSL** for database connections
- ✅ **Restrict database access** to Vercel IPs
- ✅ **Regular backups** of your database

## 📈 Performance Optimization

### **Vercel Optimizations:**
- **Edge Functions** for API routes
- **Image Optimization** with Next.js
- **Automatic CDN** distribution
- **Serverless Functions** scaling

### **Next.js Optimizations:**
- **Static Generation** where possible
- **Image optimization** with `next/image`
- **Code splitting** and lazy loading
- **Bundle analysis** with `@next/bundle-analyzer`

## 🎯 Next Steps After Deployment

### **1. Test Your Live App**
- Visit your Vercel URL
- Test authentication
- Test chat functionality
- Test on mobile devices

### **2. Set Up Monitoring**
- Enable Vercel Analytics
- Set up error tracking (Sentry)
- Monitor API performance
- Set up alerts

### **3. Configure CI/CD**
- Verify GitHub Actions are working
- Test automatic deployment
- Set up branch protection
- Configure review requirements

## 🆘 Need Help?

### **Vercel Support:**
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Vercel Support](https://vercel.com/support)

### **Project-Specific Help:**
- Check [DEPLOYMENT.md](./DEPLOYMENT.md)
- Open an issue in your repository
- Check [SUPPORT.md](./.github/SUPPORT.md)

---

**🎉 Congratulations! Once you complete these steps, your ChatGPT Clone will automatically deploy to Vercel on every push to GitHub!**

**Your workflow will be:**
1. **Make changes** to your code
2. **Run `npm run update`** to commit and push
3. **GitHub Actions** automatically test and build
4. **Vercel** automatically deploys to production
5. **Your app is live** in seconds! 🚀
