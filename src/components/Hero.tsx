import { GraduationCap, Award, BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  const handleEnroll = () => {
    window.open("https://wa.me/+923123456789", "_blank");
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white">
      <video autoPlay muted loop className="video-background">
        <source src="/books-bg.mp4" type="video/mp4" />
      </video>
      <div className="overlay" />
      
      <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
        <div className="w-full lg:w-1/2 space-y-6">
          <span className="inline-block px-4 py-2 rounded-full bg-red-500/20 text-red-400 font-medium animate-fade-in">
            O-Level Education Expert
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-up [--tw-animate-delay:200ms]">
            Welcome to
            <span className="text-red-400 block animate-fade-up [--tw-animate-delay:400ms]">
              Sir Ammar Khan's
            </span>
            <span className="animate-fade-up [--tw-animate-delay:600ms] block">
              Teaching Hub
            </span>
          </h1>
          
          <p className="text-lg text-gray-300 max-w-xl animate-fade-up [--tw-animate-delay:800ms]">
            Dedicated O-Level teacher specializing in Islamiyat and Pakistan Studies, 
            with over 8 years of experience helping students achieve excellence.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              onClick={handleEnroll}
              className="bg-red-500 hover:bg-red-600 text-white transition-all"
            >
              Enroll Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/notes'}
              className="border-red-500 text-red-400 hover:bg-red-500/10"
            >
              View Notes
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="glass-card p-6 rounded-xl space-y-2">
              <GraduationCap className="text-red-400 h-8 w-8" />
              <h3 className="font-semibold">Experienced</h3>
              <p className="text-sm text-gray-300">8+ years teaching</p>
            </div>
            <div className="glass-card p-6 rounded-xl space-y-2">
              <Award className="text-red-400 h-8 w-8" />
              <h3 className="font-semibold">Certified</h3>
              <p className="text-sm text-gray-300">O-Level Expert</p>
            </div>
            <div className="glass-card p-6 rounded-xl space-y-2">
              <BookOpen className="text-red-400 h-8 w-8" />
              <h3 className="font-semibold">Comprehensive</h3>
              <p className="text-sm text-gray-300">Complete Notes</p>
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 relative animate-fade-in [--tw-animate-delay:1000ms]">
          <div className="aspect-square relative rounded-2xl overflow-hidden glass-card">
            <img
              src="/sir-ammar.jpg"
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
