
import { saveAs } from 'file-saver';

export interface Note {
  id: string;
  title: string;
  subject: 'islamiyat' | 'pakistan-studies';
  fileName: string;
  filePath: string;
  createdAt: string;
}

const NOTES_KEY = 'teaching_hub_notes';

// Helper function to convert File to Base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const notesService = {
  getNotes: (): Note[] => {
    const notes = localStorage.getItem(NOTES_KEY);
    return notes ? JSON.parse(notes) : [];
  },

  saveNote: async (note: Omit<Note, 'id' | 'createdAt' | 'filePath'> & { file: File }) => {
    try {
      const notes = notesService.getNotes();
      const base64File = await fileToBase64(note.file);
      
      // Create a file path based on subject and filename
      const filePath = `notes/${note.subject}/${note.fileName}`;
      
      const newNote: Note = {
        ...note,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        filePath: filePath,
      };

      // Store the file content in localStorage (temporary solution)
      // In production, you would upload this to a server or GitHub repository
      localStorage.setItem(`file_${newNote.id}`, base64File);

      notes.push(newNote);
      localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
      return newNote;
    } catch (error) {
      console.error('Error saving note:', error);
      throw error;
    }
  },

  deleteNote: (id: string) => {
    const notes = notesService.getNotes().filter(note => note.id !== id);
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    // Remove the file content from localStorage
    localStorage.removeItem(`file_${id}`);
  },

  downloadNote: async (note: Note) => {
    try {
      // Get file content from localStorage
      const base64File = localStorage.getItem(`file_${note.id}`);
      if (!base64File) throw new Error('File not found');

      // Convert base64 to blob
      const response = await fetch(base64File);
      const blob = await response.blob();

      // Download the file
      saveAs(blob, note.fileName);
    } catch (error) {
      console.error('Error downloading note:', error);
      throw error;
    }
  },

  // Function to export all notes (for backup)
  exportNotes: () => {
    const notes = notesService.getNotes();
    const files: { [key: string]: string } = {};
    
    notes.forEach(note => {
      const fileContent = localStorage.getItem(`file_${note.id}`);
      if (fileContent) {
        files[note.id] = fileContent;
      }
    });

    return {
      notes,
      files
    };
  },

  // Function to import notes (for restoration)
  importNotes: (data: { notes: Note[], files: { [key: string]: string } }) => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(data.notes));
    Object.entries(data.files).forEach(([id, content]) => {
      localStorage.setItem(`file_${id}`, content);
    });
  }
};
