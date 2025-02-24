
export interface Note {
  id: string;
  title: string;
  subject: 'islamiyat' | 'pakistan-studies';
  fileName: string;
  filePath: string;
  createdAt: string;
}

const NOTES_KEY = 'teaching_hub_notes';

export const notesService = {
  getNotes: (): Note[] => {
    const notes = localStorage.getItem(NOTES_KEY);
    return notes ? JSON.parse(notes) : [];
  },

  saveNote: async (note: Omit<Note, 'id' | 'createdAt' | 'filePath'> & { file: File }) => {
    try {
      const notes = notesService.getNotes();
      
      // Create a file path based on subject and filename
      const filePath = `/notes/${note.subject}/${note.fileName}`;
      
      const newNote: Note = {
        ...note,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        filePath: filePath,
      };

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
  },

  viewNote: (note: Note) => {
    // Open the PDF in a new window using the public URL
    window.open(note.filePath, '_blank');
  },
};
