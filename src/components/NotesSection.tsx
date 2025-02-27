
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { FileText, Eye, Clock } from "lucide-react";
import { Note, notesService } from "@/services/notesService";
import { useToast } from "./ui/use-toast";

const NotesSection = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const fetchedNotes = await notesService.getNotes();
        setNotes(fetchedNotes);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch notes';
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
          className: "bg-red-950 border-red-500 text-white",
        });
      }
    };

    fetchNotes();
  }, [toast]);

  const handleView = (note: Note) => {
    notesService.viewNote(note);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-950 to-black text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-red-400 pt-8">Study Materials</h2>
          <p className="text-gray-400 text-center mb-12">
            Access comprehensive notes for both Islamiyat and Pakistan Studies
          </p>

          <Tabs defaultValue="islamiyat" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-800">
              <TabsTrigger 
                value="islamiyat"
                className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
              >
                Islamiyat
              </TabsTrigger>
              <TabsTrigger 
                value="pakistan-studies"
                className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
              >
                Pakistan Studies
              </TabsTrigger>
            </TabsList>

            {['islamiyat', 'pakistan-studies'].map((subject) => (
              <TabsContent key={subject} value={subject}>
                <Card className="glass-card border-red-500/20">
                  <CardHeader>
                    <CardTitle className="text-2xl text-red-400 flex items-center gap-2">
                      <FileText className="h-6 w-6" />
                      {subject === 'islamiyat' ? 'Islamiyat' : 'Pakistan Studies'} Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {notes
                        .filter(note => note.subject === subject)
                        .map((note) => (
                          <div key={note.id} 
                            className="flex items-center justify-between p-4 rounded-lg bg-black/40 hover:bg-black/60 transition-all group"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="text-red-400 h-5 w-5" />
                              <div>
                                <h3 className="font-medium text-white">{note.title}</h3>
                                <p className="text-xs text-gray-400 flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {new Date(note.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleView(note)}
                              className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white group-hover:scale-105 transition-all"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default NotesSection;
