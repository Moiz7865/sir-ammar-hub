
# Welcome to your Lovable project

## Complete Setup Guide

### 1. GitHub Repository & Storage Setup

#### 1.1. Create a GitHub Repository
1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top-right corner and select "New repository"
3. Name your repository (e.g., "sir-ammar-hub")
4. Make it public
5. Check "Add a README file"
6. Click "Create repository"

#### 1.2. Enable GitHub Pages
1. Go to your repository settings
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select "Deploy from a branch"
4. Select "main" branch and "/(root)" folder
5. Click "Save"
6. Wait a few minutes for GitHub Pages to activate

#### 1.3. Create Required Folders
1. In your repository, create these folders:
   ```
   public/
   └── notes/
       ├── islamiyat/
       └── pakistan-studies/
   ```
2. You can do this by:
   - Click "Add file" → "Create new file"
   - Type `public/notes/islamiyat/.gitkeep`
   - Click "Commit new file"
   - Repeat for `public/notes/pakistan-studies/.gitkeep`

#### 1.4. Generate GitHub Token
1. Go to GitHub Settings (click profile picture → Settings)
2. Scroll to "Developer settings" (bottom of left sidebar)
3. Click "Personal access tokens" → "Tokens (classic)"
4. Click "Generate new token (classic)"
5. Configure token:
   - Note: "Teaching Hub Access"
   - Expiration: Choose as needed
   - Permissions:
     - ✓ `repo` (Full control of repositories)
     - ✓ `workflow` (Update GitHub Action workflows)
   - Click "Generate token"
6. **IMPORTANT**: Copy your token immediately! You won't see it again

### 2. Environment Setup

#### 2.1. Environment Variables
Create a `.env` file in your project root:
```env
VITE_GITHUB_TOKEN=your_token_here
VITE_REPO_OWNER=your_github_username
VITE_REPO_NAME=your_repo_name
```

Replace with your values:
- `your_token_here`: The personal access token from step 1.4
- `your_github_username`: Your GitHub username
- `your_repo_name`: Your repository name

### 3. Cloudflare Pages Deployment

#### 3.1. Connect to Cloudflare
1. Sign up/login at [Cloudflare](https://cloudflare.com)
2. Go to "Pages" in the dashboard
3. Click "Create a project"
4. Choose "Connect to Git"
5. Select your repository

#### 3.2. Configure Build Settings
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: 18

#### 3.3. Environment Variables
1. In Cloudflare Pages project settings
2. Go to "Environment variables"
3. Add these variables:
   ```
   VITE_GITHUB_TOKEN=your_token_here
   VITE_REPO_OWNER=your_github_username
   VITE_REPO_NAME=your_repo_name
   ```

### 4. How File Storage Works

#### 4.1. File Upload Process
1. When a note is uploaded:
   - File is converted to base64
   - Uploaded to GitHub repository using Octokit
   - Stored in `public/notes/{subject}/` directory
   - File metadata saved in localStorage

#### 4.2. File Access
1. Files are served through GitHub Pages
2. URL format: `https://{username}.github.io/{repo-name}/notes/{subject}/{filename}`
3. File metadata stored locally includes:
   - ID
   - Title
   - Subject
   - File name
   - File path
   - Creation date

#### 4.3. File Management
- **Upload**: Files uploaded through admin dashboard
- **Delete**: Removes file from GitHub and updates local metadata
- **View**: Opens file in new tab using GitHub Pages URL

### 5. Local Development

```sh
# Clone repository
git clone <YOUR_REPO_URL>

# Navigate to project
cd <PROJECT_NAME>

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your values

# Start development server
npm run dev
```

### Project Information

**URL**: https://lovable.dev/projects/7571d6e1-f17b-45d3-9eea-cb5c3663a6e0

## Technologies Used
- Vite + React + TypeScript
- shadcn-ui + Tailwind CSS
- Octokit (GitHub API client)
- GitHub Pages (file storage)
- Cloudflare Pages (hosting)

