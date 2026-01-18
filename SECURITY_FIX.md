# Security Alert Fix - Secrets Detected

## ⚠️ Issue
GitHub detected exposed secrets in your repository. This is a critical security issue that needs to be addressed immediately.

## 🔧 Steps to Fix

### 1. **Rotate Your Secrets (IMMEDIATE)**
Since your credentials were exposed, you must:
- **MongoDB Atlas**: 
  - Go to https://cloud.mongodb.com
  - Delete the compromised database user
  - Create a new user with a strong password
  - Update connection string
  
- **JWT Secret**: 
  - Generate a new strong secret:
  ```bash
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```

### 2. **Clean Git History**
If `.env` or sensitive files were committed, use `git filter-branch` or `BFG Repo-Cleaner`:

```bash
# Using BFG (simpler, recommended)
bfg --delete-files .env

# Or using git filter-branch
git filter-branch --tree-filter 'rm -f server/.env' -- --all
```

Then force push:
```bash
git push origin --force --all
```

### 3. **Ensure Proper .gitignore**
✅ Your `.gitignore` already contains:
```
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

### 4. **Setup Environment Variables Correctly**

**Local Development:**
```bash
cd server
cp .env.example .env
# Edit .env with YOUR actual credentials (NOT committed)
```

**GitHub Secrets (for CI/CD):**
Add these to your repository secrets:
- Go to Settings → Secrets and variables → Actions
- Add:
  - `MONGODB_URI`: Your MongoDB connection string
  - `JWT_SECRET`: Your JWT secret key
  - `PORT`: 5000

### 5. **Update .env.example**
Keep only PLACEHOLDER values:

```env
# Server Configuration
PORT=5000

# MongoDB Configuration
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/expense-tracker

# For MongoDB Atlas (cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker

# JWT Secret Key
# IMPORTANT: Change this to a strong, random string in production
# You can generate one using: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 6. **Verify Security**
After making changes:

1. Check git history for exposed secrets:
   ```bash
   git log --all -p server/.env | head -20
   ```

2. Make sure `.env` is in `.gitignore`:
   ```bash
   git check-ignore -v server/.env
   ```

3. No tracked `.env` files:
   ```bash
   git ls-files | grep .env
   ```

## ✅ Checklist
- [ ] Rotated MongoDB user credentials
- [ ] Generated new JWT_SECRET
- [ ] Cleaned git history (if needed)
- [ ] Updated `.env.example` with placeholders only
- [ ] Added repository secrets to GitHub
- [ ] Verified `.gitignore` is correct
- [ ] Force pushed changes
- [ ] Confirmed no `.env` in tracked files

## 📚 Best Practices Going Forward

1. **Never commit** `.env` files
2. **Use environment variables** from:
   - Local `.env` (git-ignored)
   - GitHub Secrets (for CI/CD)
   - Cloud provider (for production)
3. **Document** required variables in `.env.example`
4. **Rotate secrets** periodically in production
5. **Use different secrets** per environment

## 🚀 Deployment Security

For production deployment:
- Use managed secrets (Azure Key Vault, AWS Secrets Manager, etc.)
- Never hardcode credentials
- Use IAM roles and managed identities
- Rotate credentials regularly

---

**Questions?** Check GitHub's security documentation or MongoDB Atlas security guide.
