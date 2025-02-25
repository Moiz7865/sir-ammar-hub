
# Welcome to your Lovable project

## Deployment Guide (Direct dist upload)

### 1. GitHub Storage Setup

#### 1.1. Create a GitHub Repository
1. Go to [GitHub](https://github.com) and sign in
2. Create a new repository (e.g., "sir-ammar-hub")
3. Make it public
4. Check "Add a README file"
5. Click "Create repository"

#### 1.2. Create Required Folders
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

#### 1.3. Generate GitHub Token
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Configure:
   - Note: "Teaching Hub Access"
   - Select permissions:
     - ✓ `repo` (Full control of repositories)
     - ✓ `workflow` (Update GitHub Action workflows)
   - Click "Generate token"
4. **IMPORTANT**: Copy your token immediately!

### 2. Local Build Setup

1. Clone and set up the project:
```sh
# Clone repository
git clone <YOUR_REPO_URL>
cd <PROJECT_NAME>

# Install dependencies
npm install
```

2. Create `.env` file:
```env
VITE_GITHUB_TOKEN=your_token_here
VITE_REPO_OWNER=your_github_username
VITE_REPO_NAME=your_repo_name
```

3. Build the project:
```sh
npm run build
```
This will create a `dist` folder with your built application.

### 3. Cloudflare Pages Deployment (Direct Upload)

#### 3.1. Deploy dist folder
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click "Pages"
3. Click "Create a project"
4. Choose "Direct Upload"
5. Drag and drop your local `dist` folder
6. Click "Deploy site"

#### 3.2. Add Environment Variables
1. After deployment, go to your project settings
2. Find "Environment variables"
3. Add these variables:
   ```
   VITE_GITHUB_TOKEN=your_token_here
   VITE_REPO_OWNER=your_github_username
   VITE_REPO_NAME=your_repo_name
   ```
4. Click "Save"
5. Trigger a new deployment for the changes to take effect

### How File Storage Works

#### File Management
- Files are stored in your GitHub repository
- Files are uploaded through admin dashboard to `public/notes/{subject}/`
- File metadata is saved in localStorage
- Files are served through GitHub's raw content URLs

### Local Development
To run the project locally:
```sh
npm run dev
```

### Project Information

**URL**: https://lovable.dev/projects/7571d6e1-f17b-45d3-9eea-cb5c3663a6e0

## Technologies Used
- Vite + React + TypeScript
- shadcn-ui + Tailwind CSS
- Octokit (GitHub API client)
- GitHub (file storage)
- Cloudflare Pages (hosting)
