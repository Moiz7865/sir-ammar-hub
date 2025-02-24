
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
const GITHUB_TOKEN = process.env.VITE_GITHUB_TOKEN;
const REPO_OWNER = process.env.VITE_REPO_OWNER;
const REPO_NAME = process.env.VITE_REPO_NAME;
const BRANCH = 'main';

const octokit = GITHUB_TOKEN ? new Octokit({ auth: GITHUB_TOKEN }) : null;

export const notesService = {
  getNotes: (): Note[] => {
    const notes = localStorage.getItem(NOTES_KEY);
    return notes ? JSON.parse(notes) : [];
  },

  saveNote: async (note: Omit<Note, 'id' | 'createdAt' | 'filePath'> & { file: File }) => {
    try {
      if (!octokit) {
        throw new Error('GitHub token not configured');
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
        owner: REPO_OWNER!,
        repo: REPO_NAME!,
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
    } catch (error) {
      console.error('Error saving note:', error);
      throw error;
    }
  },

  deleteNote: async (id: string) => {
    try {
      if (!octokit) {
        throw new Error('GitHub token not configured');
      }

      const notes = notesService.getNotes();
      const noteToDelete = notes.find(note => note.id === id);

      if (noteToDelete) {
        // Get the current file's SHA
        const { data: fileData } = await octokit.repos.getContent({
          owner: REPO_OWNER!,
          repo: REPO_NAME!,
          path: noteToDelete.filePath.substring(1), // Remove leading slash
          ref: BRANCH,
        });

        if ('sha' in fileData) {
          // Delete file from GitHub
          await octokit.repos.deleteFile({
            owner: REPO_OWNER!,
            repo: REPO_NAME!,
            path: noteToDelete.filePath.substring(1),
            message: `Delete note: ${noteToDelete.title}`,
            sha: fileData.sha,
            branch: BRANCH,
          });
        }
      }

      const updatedNotes = notes.filter(note => note.id !== id);
      localStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  },

  viewNote: (note: Note) => {
    // Construct the GitHub Pages URL for the file
    const githubPagesUrl = `https://${REPO_OWNER}.github.io/${REPO_NAME}${note.filePath}`;
    window.open(githubPagesUrl, '_blank');
  },
};
