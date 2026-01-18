# Environment Setup Guide

## 🔒 Security First

This project uses environment variables to store sensitive credentials. **NEVER commit `.env` files to version control.**

## Setup Instructions

### 1. Create Local Environment File

```bash
cd server
cp .env.example .env
```

### 2. Configure Your Secrets

Edit `server/.env` and add your actual credentials:

```env
PORT=5000
MONGODB_URI=<your-actual-mongodb-connection-string>
JWT_SECRET=<your-generated-secret-key>
NODE_ENV=development
```

⚠️ **Important:** Replace the angle bracket placeholders with your actual values. Do NOT use the examples as-is.

### Getting Your MongoDB Connection String

**For MongoDB Atlas (Cloud):**
1. Go to https://cloud.mongodb.com
2. Select your cluster
3. Click "Connect"
4. Choose "Connect your application"
5. Copy the connection string
6. Replace `<password>` and `<username>` with your credentials

**For Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/expense-tracker
```

### Generating a Strong JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy the output to your `.env` file as `JWT_SECRET`.

## File Structure

```
server/
├── .env                  ❌ NEVER commit (git-ignored)
├── .env.example          ✅ Safe to commit (placeholders only)
└── ...
```

## Git Configuration

Verify `.env` is ignored:
```bash
git check-ignore -v server/.env
```

Should output: `server/.env`

## ✅ Checklist Before First Run

- [ ] Copied `.env.example` to `.env`
- [ ] Added MongoDB connection string to `.env`
- [ ] Generated and added JWT_SECRET to `.env`
- [ ] Verified `.env` is NOT tracked by git
- [ ] `.env` is in `.gitignore`

## Production Deployment

For production, use platform-specific secret management:

### Azure (Recommended)
- Use **Azure Key Vault**
- Reference secrets in deployment

### AWS
- Use **AWS Secrets Manager** or **Parameter Store**

### Heroku/Railway
- Set config vars in platform dashboard

### Docker/Kubernetes
- Use secrets management tools
- Never hardcode in images

## Troubleshooting

**"Cannot find module" errors:**
- Verify all required values are in `.env`
- Check `.env` syntax (no quotes around values unless needed)

**"Connection refused" for MongoDB:**
- Ensure MongoDB is running locally, OR
- Verify MongoDB Atlas connection string is correct
- Check username/password for typos

**"JWT errors" on login:**
- Verify JWT_SECRET is set
- Ensure it's a reasonably long string (32+ characters)

## Security Best Practices

1. **Rotate credentials** periodically
2. **Use strong passwords** (20+ characters)
3. **Different secrets** per environment
4. **Never share** `.env` files
5. **Use managed secrets** in production
6. **Enable audit logs** for credential access

---

For more information, see [SECURITY_FIX.md](../SECURITY_FIX.md)
