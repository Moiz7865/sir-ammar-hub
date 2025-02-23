
export interface Note {
  id: string;
  title: string;
  subject: 'islamiyat' | 'pakistan-studies';
  file: File;
  fileName: string;
  createdAt: string;
}

const NOTES_KEY = 'teaching_hub_notes';

export const notesService = {
  getNotes: (): Note[] => {
    const notes = localStorage.getItem(NOTES_KEY);
    return notes ? JSON.parse(notes) : [];
  },

  saveNote: async (note: Omit<Note, 'id' | 'createdAt'>) => {
    const notes = notesService.getNotes();
    const newNote: Note = {
      ...note,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    // Create object URL for the file
    const fileUrl = URL.createObjectURL(note.file);
    
    // Store file in indexed DB
    const request = indexedDB.open('NotesDB', 1);
    
    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains('files')) {
        db.createObjectStore('files', { keyPath: 'id' });
      }
    };

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['files'], 'readwrite');
      const store = transaction.objectStore('files');
      store.put({ id: newNote.id, file: note.file });
    };

    notes.push(newNote);
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    return newNote;
  },

  deleteNote: (id: string) => {
    const notes = notesService.getNotes().filter(note => note.id !== id);
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));

    // Delete file from indexed DB
    const request = indexedDB.open('NotesDB', 1);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['files'], 'readwrite');
      const store = transaction.objectStore('files');
      store.delete(id);
    };
  },

  getFileById: async (id: string): Promise<File | null> => {
    return new Promise((resolve) => {
      const request = indexedDB.open('NotesDB', 1);
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(['files'], 'readonly');
        const store = transaction.objectStore('files');
        const getRequest = store.get(id);
        
        getRequest.onsuccess = () => {
          resolve(getRequest.result?.file || null);
        };
        
        getRequest.onerror = () => {
          resolve(null);
        };
      };
    });
  }
};
