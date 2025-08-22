---
layout: default
title: Installation
parent: Developer Guide
nav_order: 1
---

# Installation Guide
{: .no_toc }

Complete installation instructions for setting up the Tech Interview 2.0 development environment.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Prerequisites

### System Requirements

| Requirement | Minimum Version | Recommended |
|-------------|----------------|-------------|
| **Node.js** | 18.17.0 | 20.x LTS |
| **npm** | 9.0.0 | Latest |
| **Git** | 2.20+ | Latest |
| **OS** | macOS 10.15+, Windows 10+, Ubuntu 18.04+ | Latest |

### Development Tools

**Required:**
- **Code Editor**: VS Code, WebStorm, or similar
- **Terminal**: Built-in terminal or iTerm2/Windows Terminal
- **Browser**: Chrome, Firefox, Safari, or Edge (latest versions)

**Recommended:**
- **Git GUI**: GitHub Desktop, SourceTree, or GitKraken
- **Database GUI**: TablePlus, Sequel Pro (if using databases)
- **API Testing**: Postman, Insomnia, or Thunder Client

## Step 1: Install Node.js

### Option A: Official Installer (Recommended)

1. Visit [nodejs.org](https://nodejs.org/)
2. Download the LTS version (20.x)
3. Run the installer and follow the prompts
4. Verify installation:

```bash
node --version  # Should output v20.x.x
npm --version   # Should output 10.x.x
```

### Option B: Node Version Manager (Advanced)

**For macOS/Linux:**
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal or source bash profile
source ~/.bashrc

# Install and use Node.js LTS
nvm install --lts
nvm use --lts
nvm alias default lts/*
```

**For Windows:**
```powershell
# Install nvm-windows from GitHub releases
# https://github.com/coreybutler/nvm-windows/releases

# Install and use Node.js LTS
nvm install lts
nvm use lts
```

## Step 2: Clone Repository

### Option A: HTTPS (Recommended for beginners)

```bash
git clone https://github.com/your-username/tech_interview_2_0.git
cd tech_interview_2_0
```

### Option B: SSH (Recommended for regular contributors)

```bash
# First, set up SSH key with GitHub
git clone git@github.com:your-username/tech_interview_2_0.git
cd tech_interview_2_0
```

### Option C: GitHub CLI

```bash
# Install GitHub CLI first: https://cli.github.com/
gh repo clone your-username/tech_interview_2_0
cd tech_interview_2_0
```

## Step 3: Install Dependencies

```bash
# Install all dependencies
npm install

# Verify installation
npm list --depth=0
```

**What gets installed:**
- **Framework**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS, CSS modules
- **Content**: MDX, gray-matter, remark/rehype plugins
- **Testing**: Vitest, React Testing Library, Playwright
- **Development**: ESLint, Prettier, Husky (git hooks)
- **Analytics**: Plausible integration
- **Internationalization**: next-intl

## Step 4: Environment Configuration

### Create Environment File

```bash
# Copy example environment file
cp .env.example .env.local

# Or create manually
touch .env.local
```

### Configure Environment Variables

Add the following to `.env.local`:

```bash
# Required for development
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional: Analytics (for development testing)
NEXT_PUBLIC_ANALYTICS_DOMAIN=localhost
NEXT_PUBLIC_ANALYTICS_SITE_ID=your-site-id

# Optional: Contact form (for testing)
CONTACT_EMAIL=test@example.com

# Optional: Content management
CONTENT_SECURITY_KEY=your-secret-key
```

### Environment File Security

```bash
# Ensure .env.local is in .gitignore (already included)
echo ".env.local" >> .gitignore

# Never commit real API keys or secrets
# Use placeholder values for development
```

## Step 5: Verify Installation

### Start Development Server

```bash
npm run dev
```

**Expected output:**
```
▲ Next.js 15.5.0
- Local:        http://localhost:3000
- Network:      http://192.168.1.100:3000

✓ Ready in 2.3s
```

### Test Basic Functionality

1. **Homepage**: Visit `http://localhost:3000`
   - Should load without errors
   - Navigation should work
   - Language switcher should function

2. **About Page**: Visit `http://localhost:3000/en/about`
   - Should display content in English
   - Try other locales: `/zh-Hans/about`, `/zh-Hant/about`

3. **Blog**: Visit `http://localhost:3000/en/blog`
   - Should list blog posts (if any exist)
   - MDX rendering should work

### Run Tests

```bash
# Unit tests
npm run test

# Expected output:
# ✓ All tests passing
# Coverage report generated

# E2E tests (requires dev server running)
npm run test:e2e

# Type checking
npm run type-check

# Linting
npm run lint
```

## Step 6: VS Code Setup (Recommended)

### Install Extensions

**Required Extensions:**
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "unifiedjs.vscode-mdx"
  ]
}
```

### Configure Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  },
  "files.associations": {
    "*.mdx": "mdx"
  }
}
```

### Create Workspace

Create `.vscode/workspace.code-workspace`:

```json
{
  "folders": [
    {
      "path": "."
    }
  ],
  "settings": {
    "editor.formatOnSave": true
  },
  "extensions": {
    "recommendations": [
      "bradlc.vscode-tailwindcss",
      "esbenp.prettier-vscode",
      "dbaeumer.vscode-eslint"
    ]
  }
}
```

## Troubleshooting

### Common Issues

#### 1. Node.js Version Conflicts

**Problem**: Different projects require different Node.js versions

**Solution**: Use Node Version Manager
```bash
# Create .nvmrc file
echo "20" > .nvmrc

# Use project-specific version
nvm use
```

#### 2. npm Permission Errors (macOS/Linux)

**Problem**: `EACCES` errors when installing packages globally

**Solution**: Configure npm to use different directory
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

#### 3. Port Already in Use

**Problem**: `Error: listen EADDRINUSE :::3000`

**Solution**: Kill process or use different port
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- --port 3001
```

#### 4. TypeScript Errors

**Problem**: Type checking failures

**Solution**: Update dependencies and restart TypeScript server
```bash
npm update
# In VS Code: Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

#### 5. Git Clone Failures

**Problem**: Authentication or network issues

**Solutions**:
```bash
# Use GitHub token for HTTPS
git clone https://username:token@github.com/user/repo.git

# Configure Git credentials
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Set up SSH key (recommended)
ssh-keygen -t ed25519 -C "your@email.com"
# Add ~/.ssh/id_ed25519.pub to GitHub
```

### Performance Issues

#### Slow npm install

**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Use different registry (if behind firewall)
npm config set registry https://registry.npmjs.org/

# Increase memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
```

#### Slow Development Server

**Solutions**:
```bash
# Clear Next.js cache
rm -rf .next

# Reduce file watching
echo "fs.inotify.max_user_watches=524288" | sudo tee -a /etc/sysctl.conf

# Disable source maps (faster builds)
# Add to next.config.js: productionBrowserSourceMaps: false
```

## Post-Installation Steps

### 1. Configure Git Hooks

Git hooks are automatically installed via Husky:

```bash
# Verify hooks are installed
ls -la .git/hooks/

# Test pre-commit hook
git add .
git commit -m "test commit"  # Should run linting and tests
```

### 2. Set Up IDE Integration

**TypeScript**: Ensure your editor recognizes `tsconfig.json`
**ESLint**: Configure automatic fixing on save
**Prettier**: Set as default formatter

### 3. Understand Project Structure

Explore key directories:
```bash
# Component library
ls src/components/

# Page routing
ls src/app/

# Utility functions
ls src/lib/

# Content files
ls src/content/

# Internationalization
ls src/messages/
```

### 4. Join Development Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/your-feature
```

---

## Next Steps

1. **[Development Workflow](./development.html)**: Learn the daily development process
2. **[Testing Guide](./testing.html)**: Understand the testing strategy
3. **[Architecture Overview](../architecture/)**: Understand the system design

## Need Help?

- **GitHub Issues**: Report installation problems
- **Documentation**: Check other sections in this guide
- **Community**: Join discussions for additional support