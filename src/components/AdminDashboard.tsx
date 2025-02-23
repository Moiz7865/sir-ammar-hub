
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Upload, Loader2 } from "lucide-react";
import { useToast } from "./ui/use-toast";

const AdminDashboard = () => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (subject: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    try {
      // Implement Supabase upload logic here
      // const { data, error } = await supabase.storage
      //   .from('notes')
      //   .upload(`${subject}/${file.name}`, file);
      //
      // if (error) throw error;
      //
      // const { data: noteData, error: noteError } = await supabase
      //   .from('notes')
      //   .insert([
      //     {
      //       title: file.name,
      //       subject,
      //       url: data.path,
      //       created_at: new Date().toISOString(),
      //     },
      //   ]);

      toast({
        title: "Success!",
        description: "Note uploaded successfully",
        variant: "default",
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

            {['islamiyat', 'pakistan-studies'].map((subject) => (
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
                  <CardContent>
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
