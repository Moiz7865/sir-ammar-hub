
import Hero from "@/components/Hero";
import Resume from "@/components/Resume";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  return (
    <ScrollArea className="h-screen">
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <Hero />
        <Resume />
      </div>
    </ScrollArea>
  );
};

export default Index;
