# Deployment Guide - HTTP Backend Integration

This guide helps you deploy the LancerScape authentication system when your backend runs on HTTP.

## 🚨 Mixed Content Security Issue

When your frontend is deployed on HTTPS (like Bolt Hosting) but your backend runs on HTTP, browsers block the requests due to **Mixed Content Security Policy**.

### Error Messages You'll See:
```
Mixed Content: The page at 'https://your-site.com' was loaded over HTTPS, 
but requested an insecure XMLHttpRequest endpoint 'http://your-backend.com'. 
This request has been blocked; the content must be served over HTTPS.
```

## 🔧 Solutions (Ranked by Recommendation)

### 1. **RECOMMENDED: Add HTTPS to Your Backend**

#### Option A: Using Let's Encrypt (Free SSL)
```bash
# On your AWS EC2 instance
sudo apt update
sudo apt install certbot nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Update your backend to use HTTPS
# Then update your frontend environment:
VITE_API_BASE_URL=https://your-domain.com:3000
```

#### Option B: AWS Application Load Balancer
```bash
# Create ALB with SSL certificate
# Point ALB to your EC2 instance
# Update frontend to use ALB HTTPS endpoint
VITE_API_BASE_URL=https://your-alb-endpoint.amazonaws.com
```

### 2. **DEVELOPMENT: Local HTTP Testing**

For development and testing, run the frontend locally:

```bash
# Clone and run locally
git clone <your-repo>
cd lancerscape-auth
npm install
npm run dev

# Access via: http://localhost:5173
# This allows HTTP backend connections
```

### 3. **PROXY SOLUTION: HTTPS Tunnel**

#### Option A: Using ngrok
```bash
# Install ngrok
npm install -g ngrok

# Create HTTPS tunnel to your backend
ngrok http 3000

# Use the HTTPS URL in your frontend:
VITE_API_BASE_URL=https://abc123.ngrok.io
```

#### Option B: Using Cloudflare Tunnel
```bash
# Install cloudflared
# Create tunnel to your backend
cloudflared tunnel --url http://localhost:3000

# Use the provided HTTPS URL
```

### 4. **CORS PROXY (Not Recommended for Production)**

Use a CORS proxy service:
```javascript
// In your axios config
const baseURL = `https://cors-anywhere.herokuapp.com/http://ec2-3-238-114-176.compute-1.amazonaws.com:3000`;
```

## 🚀 Quick Setup for AWS EC2

### Step 1: Install SSL Certificate
```bash
# SSH into your EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install Certbot
sudo apt update
sudo apt install snapd
sudo snap install --classic certbot

# Get certificate (replace with your domain)
sudo certbot certonly --standalone -d your-domain.com
```

### Step 2: Update Your Backend
```javascript
// If using Express.js
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/your-domain.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/your-domain.com/fullchain.pem')
};

https.createServer(options, app).listen(3000, () => {
  console.log('HTTPS Server running on port 3000');
});
```

### Step 3: Update Frontend Environment
```env
VITE_API_BASE_URL=https://your-domain.com:3000
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

### Step 4: Update Security Groups
```bash
# Allow HTTPS traffic in AWS Security Group
# Add inbound rule: HTTPS (443) from 0.0.0.0/0
# Keep HTTP (80) for redirect
```

## 🔒 Security Considerations

### Production Checklist:
- [ ] SSL certificate installed and valid
- [ ] HTTP redirects to HTTPS
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] Environment variables secured
- [ ] Database connections encrypted

### CORS Configuration:
```javascript
// Backend CORS setup
app.use(cors({
  origin: [
    'https://authentication-onboa-nxe7.bolt.host',
    'https://your-custom-domain.com',
    'http://localhost:5173' // Development only
  ],
  credentials: true
}));
```

## 🧪 Testing Your Setup

### 1. Test SSL Certificate
```bash
# Check certificate validity
openssl s_client -connect your-domain.com:443 -servername your-domain.com
```

### 2. Test API Endpoints
```bash
# Test HTTPS endpoint
curl -X POST https://your-domain.com:3000/login/login \
  -H "Content-Type: application/json" \
  -d '{"data":{"type":"email_account","attributes":{"email":"test@example.com","password":"test123"}}}'
```

### 3. Browser Developer Tools
- Check Network tab for successful HTTPS requests
- Verify no mixed content warnings in Console
- Test all authentication flows

## 🆘 Troubleshooting

### Common Issues:

1. **Certificate Not Trusted**
   ```bash
   # Renew certificate
   sudo certbot renew
   ```

2. **Port 443 Not Accessible**
   ```bash
   # Check if port is open
   sudo netstat -tlnp | grep :443
   
   # Update security group in AWS
   ```

3. **CORS Errors**
   ```javascript
   // Update backend CORS configuration
   app.use(cors({
     origin: 'https://authentication-onboa-nxe7.bolt.host',
     credentials: true
   }));
   ```

4. **Mixed Content Still Occurring**
   - Clear browser cache
   - Check all API calls use HTTPS
   - Verify environment variables

## 📞 Support

If you need help with SSL setup or deployment:
1. Check AWS documentation for SSL certificates
2. Use Let's Encrypt community forums
3. Consider using AWS Certificate Manager for easier SSL management

---

**Remember**: Never use HTTP in production for authentication systems. Always use HTTPS to protect user credentials and session tokens.