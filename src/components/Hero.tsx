
import { GraduationCap, Award, BookOpen, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  const handleEnroll = () => {
    window.open("https://wa.me/+923123456789", "_blank");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-red-950 via-black to-red-950">
      <div className="absolute inset-0 bg-[url('/books-bg.mp4')] opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
      
      {/* Mobile Profile Image (visible only on mobile) */}
      <div className="lg:hidden relative z-10 pt-8 px-4">
        <div className="relative w-48 h-48 mx-auto">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 to-red-700 blur-lg animate-pulse" />
          <div className="relative w-full h-full rounded-full border-4 border-red-500 overflow-hidden animate-fade-in">
            <img
              src="/sir-ammar.jpg"
              alt="Sir Ammar Khan"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen py-8 lg:py-0">
          {/* Content Section */}
          <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500/20 to-red-700/20 rounded-full px-4 py-2 border border-red-500/20">
              <GraduationCap className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-medium">O-Level Education Expert</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
                <span className="block mb-2 animate-fade-up">Transform Your</span>
                <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent inline-block animate-fade-up [--tw-animate-delay:200ms]">
                  Academic Journey
                </span>
              </h1>
              
              <div className="text-xl md:text-2xl text-gray-400 font-light animate-fade-up [--tw-animate-delay:400ms]">
                <TypeAnimation
                  sequence={[
                    'Master Islamiyat',
                    2000,
                    'Excel in Pakistan Studies',
                    2000,
                  ]}
                  repeat={Infinity}
                />
              </div>
            </div>

            <p className="text-lg text-gray-300 max-w-xl mx-auto lg:mx-0 animate-fade-up [--tw-animate-delay:600ms]">
              Join the journey of academic excellence with Sir Ammar Khan, 
              bringing over 8 years of specialized experience in O-Level education.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-up [--tw-animate-delay:800ms]">
              <Button
                size="lg"
                onClick={handleEnroll}
                className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white border-0 shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transition-all duration-300"
              >
                Start Learning
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.location.href = '/notes'}
                className="border-red-500 text-red-400 hover:bg-red-500/10"
              >
                View Notes
                <BookOpen className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12 animate-fade-up [--tw-animate-delay:1000ms]">
              <div className="glass-card p-4 rounded-xl space-y-2 hover:bg-red-500/5 transition-colors duration-300">
                <GraduationCap className="text-red-400 h-6 w-6 mx-auto lg:mx-0" />
                <h3 className="font-semibold">8+ Years</h3>
                <p className="text-sm text-gray-400">Teaching Experience</p>
              </div>
              <div className="glass-card p-4 rounded-xl space-y-2 hover:bg-red-500/5 transition-colors duration-300">
                <Award className="text-red-400 h-6 w-6 mx-auto lg:mx-0" />
                <h3 className="font-semibold">90%+ Results</h3>
                <p className="text-sm text-gray-400">A* to B Grades</p>
              </div>
              <div className="glass-card p-4 rounded-xl space-y-2 hover:bg-red-500/5 transition-colors duration-300 col-span-2 md:col-span-1">
                <BookOpen className="text-red-400 h-6 w-6 mx-auto lg:mx-0" />
                <h3 className="font-semibold">Complete Notes</h3>
                <p className="text-sm text-gray-400">Study Material</p>
              </div>
            </div>
          </div>

          {/* Desktop Profile Image (visible only on desktop) */}
          <div className="hidden lg:block w-1/2 relative animate-fade-in [--tw-animate-delay:1200ms]">
            <div className="relative w-[500px] h-[500px] mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 to-red-700 blur-xl animate-pulse" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border-4 border-red-500 overflow-hidden">
                <img
                  src="/sir-ammar.jpg"
                  alt="Sir Ammar Khan"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-red-500/10 rounded-full blur-xl" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-700/10 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
