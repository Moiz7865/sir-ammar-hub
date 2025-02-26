
import { Octokit } from '@octokit/rest';

export interface Note {
  id: string;
  title: string;
  subject: 'islamiyat' | 'pakistan-studies';
  fileName: string;
  filePath: string;
  createdAt: string;
}

const NOTES_KEY = 'teaching_hub_notes';

// GitHub configuration
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const REPO_OWNER = import.meta.env.VITE_REPO_OWNER;
const REPO_NAME = import.meta.env.VITE_REPO_NAME;
const BRANCH = 'main';

const octokit = GITHUB_TOKEN ? new Octokit({ auth: GITHUB_TOKEN }) : null;

// Helper function to get raw content URL
const getRawContentUrl = (filePath: string) => {
  return `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}${filePath}`;
};

export const notesService = {
  getNotes: (): Note[] => {
    const notes = localStorage.getItem(NOTES_KEY);
    return notes ? JSON.parse(notes) : [];
  },

  saveNote: async (note: Omit<Note, 'id' | 'createdAt' | 'filePath'> & { file: File }) => {
    try {
      if (!octokit) {
        throw new Error('GitHub token not configured. Please check your environment variables.');
      }

      if (!REPO_OWNER || !REPO_NAME) {
        throw new Error('GitHub repository details not configured. Please check your environment variables.');
      }

      const notes = notesService.getNotes();
      const filePath = `public/notes/${note.subject}/${note.fileName}`;
      
      // Convert file to base64
      const buffer = await note.file.arrayBuffer();
      const base64Content = btoa(
        new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );

      // Upload file to GitHub
      await octokit.repos.createOrUpdateFileContents({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: filePath,
        message: `Add note: ${note.title}`,
        content: base64Content,
        branch: BRANCH,
      });

      const newNote: Note = {
        ...note,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        filePath: `/${filePath}`,
      };

      notes.push(newNote);
      localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
      return newNote;
    } catch (error: any) {
      console.error('Detailed error:', error);
      if (error.status === 404) {
        throw new Error('Repository not found. Please check your repository settings.');
      } else if (error.status === 401) {
        throw new Error('Authentication failed. Please check your GitHub token.');
      } else if (error.message) {
        throw new Error(`GitHub Error: ${error.message}`);
      } else {
        throw new Error('Failed to upload note to GitHub. Please try again.');
      }
    }
  },

  deleteNote: async (id: string) => {
    try {
      if (!octokit) {
        throw new Error('GitHub token not configured. Please check your environment variables.');
      }

      if (!REPO_OWNER || !REPO_NAME) {
        throw new Error('GitHub repository details not configured. Please check your environment variables.');
      }

      const notes = notesService.getNotes();
      const noteToDelete = notes.find(note => note.id === id);

      if (!noteToDelete) {
        throw new Error('Note not found.');
      }

      try {
        // Get the current file's SHA
        const { data: fileData } = await octokit.repos.getContent({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          path: noteToDelete.filePath.substring(1), // Remove leading slash
          ref: BRANCH,
        });

        if ('sha' in fileData) {
          // Delete file from GitHub
          await octokit.repos.deleteFile({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path: noteToDelete.filePath.substring(1),
            message: `Delete note: ${noteToDelete.title}`,
            sha: fileData.sha,
            branch: BRANCH,
          });
        }
      } catch (error: any) {
        if (error.status === 404) {
          console.warn('File not found in repository, proceeding with local deletion');
        } else {
          throw error;
        }
      }

      const updatedNotes = notes.filter(note => note.id !== id);
      localStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
    } catch (error: any) {
      console.error('Delete error:', error);
      if (error.status === 404) {
        throw new Error('Repository or file not found. Please check your repository settings.');
      } else if (error.status === 401) {
        throw new Error('Authentication failed. Please check your GitHub token.');
      } else if (error.message) {
        throw new Error(`GitHub Error: ${error.message}`);
      } else {
        throw new Error('Failed to delete note from GitHub. Please try again.');
      }
    }
  },

  viewNote: (note: Note) => {
    // Use raw content URL for PDF viewing
    const pdfUrl = getRawContentUrl(note.filePath);
    // Open in new tab with our PDF viewer
    window.open(`/view-note?url=${encodeURIComponent(pdfUrl)}`, '_blank');
  },
};
