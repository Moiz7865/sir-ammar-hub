
# Welcome to your Lovable project

## GitHub API Integration Guide

### 1. Create a GitHub Repository
1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top-right corner and select "New repository"
3. Name your repository (e.g., "sir-ammar-hub")
4. Make it public
5. Initialize with a README (optional)
6. Click "Create repository"

### 2. Generate a Personal Access Token (Classic)
1. Go to GitHub Settings (click your profile picture → Settings)
2. Scroll down to "Developer settings" (bottom of left sidebar)
3. Click "Personal access tokens" → "Tokens (classic)"
4. Click "Generate new token (classic)"
5. Name your token (e.g., "Teaching Hub Access")
6. Set the expiration as needed
7. Select these permissions:
   - `repo` (Full control of private repositories)
   - `workflow` (Update GitHub Action workflows)
8. Click "Generate token"
9. **IMPORTANT**: Copy your token immediately! You won't see it again

### 3. Configure Environment Variables
1. Create a `.env` file in your project root:
```env
VITE_GITHUB_TOKEN=your_token_here
VITE_REPO_OWNER=your_github_username
VITE_REPO_NAME=your_repo_name
```
2. Replace placeholders with your actual values:
   - `your_token_here`: The personal access token you just created
   - `your_github_username`: Your GitHub username
   - `your_repo_name`: The name of the repository you created

### 4. Deploying to Cloudflare Pages

1. **Sign up for Cloudflare**
   - Go to [Cloudflare](https://cloudflare.com)
   - Create an account or sign in

2. **Connect your GitHub repository**
   - Go to Cloudflare Dashboard
   - Click on "Pages"
   - Click "Create a project"
   - Choose "Connect to Git"
   - Select your repository

3. **Configure your build settings**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node.js version: 18 (or your preferred version)

4. **Add Environment Variables**
   - In your Cloudflare Pages project settings
   - Go to "Environment variables"
   - Add the same variables from your `.env` file:
     ```
     VITE_GITHUB_TOKEN
     VITE_REPO_OWNER
     VITE_REPO_NAME
     ```

5. **Deploy**
   - Cloudflare will automatically build and deploy your site
   - It will provide you with a `.pages.dev` URL
   - You can add a custom domain in the Pages settings

### Project Information

**URL**: https://lovable.dev/projects/7571d6e1-f17b-45d3-9eea-cb5c3663a6e0

## Technologies Used

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Octokit (GitHub API client)

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/7571d6e1-f17b-45d3-9eea-cb5c3663a6e0) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

