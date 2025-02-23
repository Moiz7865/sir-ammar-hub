
import { GraduationCap, Award, BookOpen } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  const handleEnroll = () => {
    window.open("https://wa.me/+923123456789", "_blank");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/10 to-primary-light/10 -z-10" />
      
      <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="w-full lg:w-1/2 space-y-6 animate-fade-up">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium animate-fade-in">
            O-Level Education Expert
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Welcome to
            <span className="text-primary block">Sir Ammar Khan's</span>
            Teaching Hub
          </h1>
          
          <p className="text-lg text-gray-600 max-w-xl">
            Dedicated O-Level teacher specializing in Islamiyat and Pakistan Studies, 
            with over 8 years of experience helping students achieve excellence.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              onClick={handleEnroll}
              className="bg-primary hover:bg-primary-dark text-white transition-all"
            >
              Enroll Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/notes'}
              className="border-primary text-primary hover:bg-primary/10"
            >
              View Notes
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="glass-card p-6 rounded-xl space-y-2">
              <GraduationCap className="text-primary h-8 w-8" />
              <h3 className="font-semibold">Experienced</h3>
              <p className="text-sm text-gray-600">8+ years teaching</p>
            </div>
            <div className="glass-card p-6 rounded-xl space-y-2">
              <Award className="text-primary h-8 w-8" />
              <h3 className="font-semibold">Certified</h3>
              <p className="text-sm text-gray-600">O-Level Expert</p>
            </div>
            <div className="glass-card p-6 rounded-xl space-y-2">
              <BookOpen className="text-primary h-8 w-8" />
              <h3 className="font-semibold">Comprehensive</h3>
              <p className="text-sm text-gray-600">Complete Notes</p>
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 relative animate-fade-in">
          <div className="aspect-square relative rounded-2xl overflow-hidden glass-card">
            <img
              src="https://placehold.co/600x600/png"
              alt="Sir Ammar Khan"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
