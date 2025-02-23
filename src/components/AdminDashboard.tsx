
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Upload, Loader2, Trash2, FileText } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { Note, notesService } from "@/services/notesService";
import { Input } from "./ui/input";

const AdminDashboard = () => {
  const [uploading, setUploading] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    setNotes(notesService.getNotes());
  }, []);

  const handleFileUpload = async (subject: 'islamiyat' | 'pakistan-studies', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!title) {
      toast({
        title: "Error",
        description: "Please enter a title for the note",
        variant: "destructive",
      });
      return;
    }
    
    setUploading(true);
    try {
      const newNote = await notesService.saveNote({
        title,
        subject,
        file,
        fileName: file.name,
      });

      setNotes(notesService.getNotes());
      setTitle("");
      toast({
        title: "Success!",
        description: "Note uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload note",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (id: string) => {
    notesService.deleteNote(id);
    setNotes(notesService.getNotes());
    toast({
      title: "Success!",
      description: "Note deleted successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-red-400">Admin Dashboard</h2>
          <p className="text-gray-400 text-center mb-12">
            Manage and upload study materials for your students
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

            {(['islamiyat', 'pakistan-studies'] as const).map((subject) => (
              <TabsContent key={subject} value={subject}>
                <Card className="glass-card border-red-500/20">
                  <CardHeader>
                    <CardTitle className="text-red-400">
                      Upload {subject === 'islamiyat' ? 'Islamiyat' : 'Pakistan Studies'} Notes
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Upload new study materials for students
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Input
                      placeholder="Enter note title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-black/40 border-red-500/20 text-white"
                    />
                    
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-black/40 border-red-500/20 hover:bg-red-500/5">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {uploading ? (
                            <Loader2 className="w-10 h-10 text-red-400 animate-spin" />
                          ) : (
                            <>
                              <Upload className="w-10 h-10 mb-3 text-red-400" />
                              <p className="mb-2 text-sm text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">PDF, DOCX (MAX. 10MB)</p>
                            </>
                          )}
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.docx"
                          onChange={(e) => handleFileUpload(subject, e)}
                          disabled={uploading}
                        />
                      </label>
                    </div>

                    <div className="mt-8 space-y-4">
                      <h3 className="text-lg font-semibold text-red-400">Uploaded Notes</h3>
                      {notes
                        .filter(note => note.subject === subject)
                        .map((note) => (
                          <div key={note.id} 
                            className="flex items-center justify-between p-4 rounded-lg bg-black/40"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="text-red-400 h-5 w-5" />
                              <span>{note.title}</span>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(note.id)}
                              className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                            >
                              <Trash2 className="h-4 w-4" />
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

export default AdminDashboard;
