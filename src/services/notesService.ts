import { Octokit } from '@octokit/rest';

export interface Note {
  id: string;
  title: string;
  subject: 'islamiyat' | 'pakistan-studies';
  fileName: string;
  filePath: string;
  createdAt: string;
}

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const REPO_OWNER = import.meta.env.VITE_REPO_OWNER;
const REPO_NAME = import.meta.env.VITE_REPO_NAME;
const BRANCH = 'main';

// Add token validation
const validateGithubConfig = () => {
  console.log('Checking GitHub configuration...');
  console.log('Token exists:', !!GITHUB_TOKEN);
  console.log('Repo Owner:', REPO_OWNER);
  console.log('Repo Name:', REPO_NAME);

  if (!GITHUB_TOKEN) {
    throw new Error('GitHub token is missing. Please check VITE_GITHUB_TOKEN in your environment variables.');
  }
  if (!REPO_OWNER || !REPO_NAME) {
    throw new Error('Repository configuration is missing. Please check VITE_REPO_OWNER and VITE_REPO_NAME.');
  }
};

// Initialize Octokit with error handling
const createOctokitInstance = () => {
  validateGithubConfig();
  console.log('Creating Octokit instance...');
  return new Octokit({ 
    auth: GITHUB_TOKEN,
    log: {
      debug: (message: string) => console.debug(message),
      info: (message: string) => console.log(message),
      warn: (message: string) => console.warn(message),
      error: (message: string) => console.error(message)
    }
  });
};

// Create Octokit instance
const octokit = createOctokitInstance();

// Helper function to get raw content URL
const getRawContentUrl = (filePath: string) => {
  return `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}${filePath}`;
};

// Helper function to parse file path and extract note info
const parseFileInfo = (path: string, sha: string): Note => {
  const pathParts = path.split('/');
  const fileName = pathParts[pathParts.length - 1];
  const subject = pathParts[pathParts.length - 2] === 'pakistan-studies' ? 'pakistan-studies' : 'islamiyat';
  
  // Use the title from the filename (without extension) for display
  const title = fileName.replace(/\.[^/.]+$/, "").split('-').join(' ').replace(/_/g, ' ');
  
  return {
    id: sha,
    title: title,
    subject,
    fileName,
    filePath: `/${path}`,
    createdAt: new Date().toISOString()
  };
};

export const notesService = {
  getNotes: async (): Promise<Note[]> => {
    try {
      validateGithubConfig();
      console.log('Fetching notes...');

      // Test authentication first
      try {
        await octokit.rest.users.getAuthenticated();
        console.log('GitHub authentication successful');
      } catch (authError) {
        console.error('GitHub authentication failed:', authError);
        throw new Error('GitHub authentication failed. Please check if your token is valid and has the correct permissions.');
      }

      // Get all files in the public/notes directory
      const response = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: 'public/notes',
        ref: BRANCH,
      });

      if (!Array.isArray(response.data)) {
        throw new Error('Invalid response from GitHub');
      }

      // Get contents of each subject directory
      const notesPromises = response.data.map(async (subjectDir) => {
        if (subjectDir.type !== 'dir') return [];

        const files = await octokit.repos.getContent({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          path: subjectDir.path,
          ref: BRANCH,
        });

        if (!Array.isArray(files.data)) return [];

        return files.data.map(file => parseFileInfo(file.path, file.sha));
      });

      const notesArrays = await Promise.all(notesPromises);
      return notesArrays.flat();
    } catch (error: any) {
      console.error('Failed to fetch notes:', error);
      console.error('Error details:', {
        status: error.status,
        message: error.message,
        response: error.response?.data
      });

      if (error.status === 404) {
        throw new Error('Notes directory not found. Please check your repository structure.');
      } else if (error.status === 401 || error.status === 403) {
        throw new Error(`Authentication failed. Please check your GitHub token. Error: ${error.message}`);
      }
      throw new Error(`Failed to fetch notes: ${error.message}`);
    }
  },

  saveNote: async (note: Omit<Note, 'id' | 'createdAt' | 'filePath'> & { file: File }) => {
    try {
      if (!GITHUB_TOKEN || !REPO_OWNER || !REPO_NAME) {
        throw new Error('GitHub configuration is missing. Please check your environment variables.');
      }

      const filePath = `public/notes/${note.subject}/${note.fileName}`;
      
      // Convert file to base64
      const buffer = await note.file.arrayBuffer();
      const base64Content = btoa(
        new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );

      // Upload file to GitHub
      const response = await octokit.repos.createOrUpdateFileContents({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: filePath,
        message: `Add note: ${note.title}`,
        content: base64Content,
        branch: BRANCH,
      });

      // Return the new note object
      return parseFileInfo(filePath, response.data.content?.sha || '');
    } catch (error: any) {
      console.error('Failed to save note:', error);
      if (error.status === 404) {
        throw new Error('Repository not found. Please check your repository settings.');
      } else if (error.status === 401) {
        throw new Error('Authentication failed. Please check your GitHub token.');
      }
      throw new Error('Failed to upload note to GitHub. Please try again.');
    }
  },

  deleteNote: async (id: string) => {
    try {
      if (!GITHUB_TOKEN || !REPO_OWNER || !REPO_NAME) {
        throw new Error('GitHub configuration is missing. Please check your environment variables.');
      }

      // Get all notes to find the one to delete
      const allNotes = await notesService.getNotes();
      const noteToDelete = allNotes.find(note => note.id === id);

      if (!noteToDelete) {
        throw new Error('Note not found.');
      }

      // Get the file's SHA
      const { data: fileData } = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: noteToDelete.filePath.substring(1), // Remove leading slash
        ref: BRANCH,
      });

      if (!('sha' in fileData)) {
        throw new Error('Could not get file information from GitHub.');
      }

      // Delete file from GitHub
      await octokit.repos.deleteFile({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: noteToDelete.filePath.substring(1),
        message: `Delete note: ${noteToDelete.title}`,
        sha: fileData.sha,
        branch: BRANCH,
      });

    } catch (error: any) {
      console.error('Failed to delete note:', error);
      if (error.status === 404) {
        throw new Error('Note not found. It may have been already deleted.');
      } else if (error.status === 401) {
        throw new Error('Authentication failed. Please check your GitHub token.');
      }
      throw new Error('Failed to delete note from GitHub. Please try again.');
    }
  },

  viewNote: (note: Note) => {
    const pdfUrl = getRawContentUrl(note.filePath);
    window.open(`/view-note?url=${encodeURIComponent(pdfUrl)}`, '_blank');
  },
};
