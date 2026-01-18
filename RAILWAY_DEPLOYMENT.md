# Railway Deployment Guide

Deploy your Express backend to Railway.app (free tier available).

## Prerequisites

1. Railway.app account (create at https://railway.app)
2. GitHub account with your repo
3. Backend ready to deploy

## Step 1: Create Railway Account

1. Go to https://railway.app
2. Sign up with GitHub
3. Authorize Railway access

## Step 2: Create New Project

1. Click **New Project**
2. Select **Deploy from GitHub repo**
3. Find your `YashYadav14/Expense-Tracker` repo
4. Click **Deploy**

## Step 3: Configure Environment

Railway will auto-detect it's a Node.js project.

### Add Environment Variables:

1. Click **Variables** in Railway dashboard
2. Add these:

```
PORT=5000
NODE_ENV=production
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-generated-secret-key>
```

**For MongoDB:**
- Use local: `mongodb://localhost:27017/expense-tracker`
- Or Atlas: `mongodb+srv://<username>:<password>@cluster.mongodb.net/expense-tracker`

## Step 4: Configure Root Directory

1. In Railway, go to **Settings**
2. Set **Root Directory** to `server/`
3. Save

## Step 5: Deploy

Railway will automatically:
1. Detect `package.json` in `server/`
2. Run `npm install`
3. Run `npm start`
4. Deploy to their servers

## Step 6: Get Your Backend URL

After deployment:

1. Go to **Deployments**
2. Find the latest deployment
3. Copy the URL (looks like: `https://expense-tracker-prod.railway.app`)
4. Note the full API URL: `https://expense-tracker-prod.railway.app/api`

## Step 7: Update Frontend

Update your Cloudflare config with the backend URL:

**In wrangler.jsonc:**
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

Then redeploy frontend:
```bash
npm run deploy:prod
```

## Environment Variables (Reference)

```env
# Server Configuration
PORT=5000

# MongoDB
MONGODB_URI=<your-mongodb-connection-string>

# JWT
JWT_SECRET=<your-generated-secret-key>

# Environment
NODE_ENV=production
```

## Railway Pricing

- **Free tier**: 
  - Up to 5GB storage
  - $5/month included credit
  - Great for personal projects

- **Paid**: Pay-as-you-go after free tier

## Troubleshooting

### "Build failed"
Check logs in Railway dashboard:
1. Click **Deployments**
2. Find failed deployment
3. Click to view full logs

### "Cannot connect to MongoDB"
1. Check MongoDB connection string
2. If using MongoDB Atlas, whitelist Railway IP
3. Verify username/password

### "API not responding"
1. Check backend logs in Railway
2. Verify `npm start` command works locally
3. Check PORT variable is set to 5000

### "CORS errors"
Update `server/server.js`:
```javascript
const cors = require('cors');
app.use(cors({
  origin: ['https://your-cloudflare-url', 'http://localhost:3000'],
  credentials: true
}));
```

## Monitoring

After deployment:

1. **Railway Dashboard**: Monitor CPU, memory, logs
2. **Health Check**: Visit `/api/health` endpoint
3. **Logs**: Real-time logs in deployments

## Redeployment

To redeploy after code changes:

1. Push to GitHub:
```bash
git push origin main
```

2. Railway automatically redeploys (takes 1-2 minutes)

## Custom Domain (Optional)

Add your own domain:

1. In Railway, go to **Settings** → **Networking**
2. Add custom domain
3. Update DNS records at your registrar

## Support

- [Railway Docs](https://docs.railway.app/)
- [Support](https://railway.app/support)
- GitHub Issues

---

**Next:** Once backend is deployed, update Cloudflare frontend with API URL!
