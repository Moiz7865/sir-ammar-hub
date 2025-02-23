
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Book, FileText } from "lucide-react";

const NotesSection = () => {
  const [subject, setSubject] = useState("islamiyat");

  return (
    <div className="min-h-screen bg-secondary py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Study Materials</h2>
          <p className="text-gray-600 text-center mb-12">
            Access comprehensive notes for both Islamiyat and Pakistan Studies
          </p>

          <Tabs defaultValue="islamiyat" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="islamiyat">Islamiyat</TabsTrigger>
              <TabsTrigger value="pakistan-studies">Pakistan Studies</TabsTrigger>
            </TabsList>

            <TabsContent value="islamiyat" className="space-y-4">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Islamiyat Notes</CardTitle>
                  <CardDescription>
                    Comprehensive study materials for O-Level Islamiyat
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    {/* Note: This is a placeholder. In the real app, these would be loaded from Supabase */}
                    {['Chapter 1: Introduction', 'Chapter 2: Basics', 'Chapter 3: Advanced'].map((chapter) => (
                      <div key={chapter} className="flex items-center justify-between p-4 rounded-lg bg-white/50">
                        <div className="flex items-center gap-3">
                          <FileText className="text-primary h-5 w-5" />
                          <span>{chapter}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pakistan-studies" className="space-y-4">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Pakistan Studies Notes</CardTitle>
                  <CardDescription>
                    Detailed notes covering O-Level Pakistan Studies syllabus
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    {/* Note: This is a placeholder. In the real app, these would be loaded from Supabase */}
                    {['Geography', 'History', 'Current Affairs'].map((topic) => (
                      <div key={topic} className="flex items-center justify-between p-4 rounded-lg bg-white/50">
                        <div className="flex items-center gap-3">
                          <FileText className="text-primary h-5 w-5" />
                          <span>{topic}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
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

export default NotesSection;
