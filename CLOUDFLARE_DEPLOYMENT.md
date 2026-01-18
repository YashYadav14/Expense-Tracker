# Cloudflare Deployment Guide

This guide explains how to deploy your Expense Tracker app to Cloudflare using Wrangler.

## Architecture

- **Frontend**: Deployed to Cloudflare Pages/Workers (via wrangler)
- **Backend**: Deployed separately to Railway.app (or another platform)

## Prerequisites

1. Cloudflare account (free)
2. Railway.app account (free)
3. Node.js 16+ installed
4. Git installed

## Step 1: Install Wrangler

```bash
npm install -g wrangler
```

Verify installation:
```bash
wrangler --version
```

## Step 2: Login to Cloudflare

```bash
wrangler login
```

This will open a browser to authenticate with your Cloudflare account.

## Step 3: Build Frontend

```bash
npm run build
```

This creates `client/dist/` folder with optimized production build.

## Step 4: Deploy to Cloudflare

### Option A: Deploy to Cloudflare Pages (Recommended)

```bash
wrangler pages deploy client/dist
```

### Option B: Deploy as Worker

```bash
npm run deploy
```

For production:
```bash
npm run deploy:prod
```

## Step 5: Configure Backend URL

After your backend is deployed to Railway, update the environment variables:

### In Cloudflare Dashboard:

1. Go to **Workers & Pages**
2. Select your project
3. Click **Settings** → **Environment variables**
4. Add: `API_URL = https://your-railway-url.railway.app/api`

### Or update wrangler.jsonc:

```jsonc
{
  "env": {
    "production": {
      "vars": {
        "API_URL": "https://your-railway-url.railway.app/api"
      }
    }
  }
}
```

## Deployment Checklist

- [ ] Wrangler installed globally
- [ ] Logged in to Cloudflare
- [ ] Frontend built (`client/dist/` exists)
- [ ] Backend deployed to Railway
- [ ] API_URL configured in environment
- [ ] Pushed to GitHub
- [ ] Run `npm run deploy` or `wrangler pages deploy`

## File Structure

```
expense-tracker/
├── wrangler.jsonc          ← Cloudflare config
├── src/
│   └── index.js           ← Worker script
├── package.json           ← Root scripts
├── client/
│   ├── dist/              ← Built frontend
│   └── ...
├── server/
│   └── ... (deployed separately)
```

## Troubleshooting

### "Command not found: wrangler"
```bash
npm install -g wrangler
wrangler --version
```

### "Not authenticated"
```bash
wrangler login
```

### Build fails
```bash
cd client
npm install
npm run build
cd ..
npm run deploy
```

### Backend not reachable
1. Ensure backend is deployed to Railway
2. Check API_URL in environment variables
3. Verify CORS is enabled on backend

## Backend Deployment (Railway)

See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for backend setup.

## Local Testing

Test locally before deploying:

```bash
# Terminal 1: Backend
cd server
npm start

# Terminal 2: Frontend
cd client
npm run dev
```

Then visit: `http://localhost:3000`

## Monitoring

After deployment, monitor your app:

1. **Cloudflare Dashboard**: https://dash.cloudflare.com/
2. **Analytics**: Check Workers/Pages analytics
3. **Logs**: View real-time logs in dashboard

## Support

For issues, check:
- [Wrangler Docs](https://developers.cloudflare.com/workers/wrangler/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- GitHub Issues in repo
