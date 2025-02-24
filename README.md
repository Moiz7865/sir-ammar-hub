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

### 4. Setting up GitHub Pages Deployment
1. Go to your repository settings
2. Scroll to "Pages" section in the left sidebar
3. Under "Build and deployment":
   - Source: "GitHub Actions"
   - Branch: "main"

### 5. Create GitHub Actions Workflow
1. In your repository, create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v3
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

### 6. Configure Vite for GitHub Pages
Update your `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ... other config
})
```
Replace `your-repo-name` with your actual repository name.

### 7. How the API Integration Works

The project uses the `@octokit/rest` package to interact with GitHub's API. Here's how different operations work:

#### File Upload Process:
1. When a note is uploaded through the admin panel:
   - File is converted to base64
   - Uploaded to GitHub repository using `octokit.repos.createOrUpdateFileContents`
   - Stored in `public/notes/{subject}/{filename}`
   - File info is saved in localStorage

#### File Deletion Process:
1. When a note is deleted:
   - Gets file's SHA from GitHub
   - Deletes file using `octokit.repos.deleteFile`
   - Removes entry from localStorage

#### Viewing Files:
- Files are served through GitHub Pages
- Accessible at: `https://{username}.github.io/{repo-name}/notes/{subject}/{filename}`

### 8. Troubleshooting

Common issues and solutions:

1. **"GitHub token not configured" error**
   - Check if your `.env` file exists
   - Verify token is correctly copied
   - Make sure environment variables start with `VITE_`

2. **File upload fails**
   - Check token permissions
   - Ensure file size is under GitHub's limit (100MB)
   - Verify repository name and owner are correct

3. **Files not appearing on GitHub Pages**
   - Wait a few minutes for deployment
   - Check GitHub Actions tab for build status
   - Verify the correct branch is being deployed

4. **API Rate Limiting**
   - GitHub API has rate limits
   - Authenticated requests get higher limits
   - Check remaining rate limit in GitHub API response headers

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

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/7571d6e1-f17b-45d3-9eea-cb5c3663a6e0) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
