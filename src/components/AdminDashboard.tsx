
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";

const AdminDashboard = () => {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (subject: string, event: React.ChangeEvent<HTMLInputElement>) => {
    // Note: This is a placeholder. In the real app, this would upload to Supabase
    const file = event.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    // Implement Supabase upload logic here
    setUploading(false);
  };

  return (
    <div className="min-h-screen bg-secondary py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Admin Dashboard</h2>
          <p className="text-gray-600 text-center mb-12">
            Manage and upload study materials for your students
          </p>

          <Tabs defaultValue="islamiyat" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="islamiyat">Islamiyat</TabsTrigger>
              <TabsTrigger value="pakistan-studies">Pakistan Studies</TabsTrigger>
            </TabsList>

            <TabsContent value="islamiyat">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Upload Islamiyat Notes</CardTitle>
                  <CardDescription>
                    Upload new study materials for Islamiyat
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-white/50 border-primary/20 hover:bg-primary/5">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 mb-3 text-primary" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PDF, DOCX (MAX. 10MB)</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.docx"
                        onChange={(e) => handleFileUpload('islamiyat', e)}
                      />
                    </label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pakistan-studies">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Upload Pakistan Studies Notes</CardTitle>
                  <CardDescription>
                    Upload new study materials for Pakistan Studies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-white/50 border-primary/20 hover:bg-primary/5">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 mb-3 text-primary" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PDF, DOCX (MAX. 10MB)</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.docx"
                        onChange={(e) => handleFileUpload('pakistan-studies', e)}
                      />
                    </label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
