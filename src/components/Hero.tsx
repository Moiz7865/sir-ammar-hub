
import { GraduationCap, Award, BookOpen, ChevronRight, User, Clock, Star } from "lucide-react";
import { Button } from "./ui/button";
import { TypeAnimation } from 'react-type-animation';
import { useEffect, useState } from "react";

const Hero = () => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    setIsInView(true); // Trigger animations on component mount
  }, []);

  const handleEnroll = () => {
    window.open("https://wa.me/+923123456789", "_blank");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-red-950 via-black to-black pb-16">
      {/* Video Background */}
      <video 
        autoPlay 
        muted 
        loop 
        className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
      >
        <source src="/books-bg.mp4" type="video/mp4" />
      </video>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90 z-10"></div>
      
      <div className="container mx-auto px-4 py-8 relative z-20">
        {/* Mobile Profile Image - Visible only on small screens */}
        <div className="block lg:hidden w-full mb-10">
          <div className="relative w-48 h-48 mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 to-red-700 opacity-70 blur-xl"></div>
            <div className="relative h-full w-full rounded-full border-4 border-red-500/50 overflow-hidden shadow-lg shadow-red-500/20 hover:scale-105 hover:border-red-400 transition-all duration-500">
              <img
                src="/sir-ammar.jpg"
                alt="Sir Ammar Khan"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          </div>
          <div className="text-center mt-4">
            <h3 className="text-xl font-bold text-white">Sir Ammar Khan</h3>
            <p className="text-red-400 text-sm">O-Level Education Specialist</p>
          </div>
        </div>

        <div className="flex flex-col items-center lg:items-start lg:mt-16">
          
          {/* Header Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-950/50 rounded-full border border-red-500/30 mb-12 hover:bg-red-900/40 transition-colors duration-300 animate-fade-in">
            <GraduationCap className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-medium">Expert O-Level Tutor</span>
          </div>
          
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 w-full items-center">
            
            {/* Left Column - Text Content */}
            <div className={`space-y-8 text-center lg:text-left ${isInView ? 'animate-fade-up' : 'opacity-0'}`} style={{animationDelay: '200ms'}}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white space-y-3">
                <span className="block">Unlock Your</span>
                <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent inline-block">
                  Academic Potential
                </span>
              </h1>
              
              <div className="h-12 text-xl md:text-2xl text-gray-300 font-light">
                <TypeAnimation
                  sequence={[
                    'Master Islamic Studies',
                    2000,
                    'Excel in Pakistan History',
                    2000,
                    'Achieve Top Grades',
                    2000
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </div>
              
              <p className="text-lg text-gray-300 max-w-xl mx-auto lg:mx-0">
                Join Sir Ammar Khan's specialized O-Level program with 8+ years of 
                proven excellence in Islamiyat and Pakistan Studies education.
              </p>
              
              <div className="flex flex-wrap gap-5 justify-center lg:justify-start">
                <Button
                  size="lg"
                  onClick={handleEnroll}
                  className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white border-0 shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transition-all duration-300 hover:translate-y-[-4px] hover:scale-105"
                >
                  Start Learning
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.location.href = '/notes'}
                  className="border-red-500 text-red-400 hover:bg-red-500/20 shadow-lg hover:shadow-red-500/30 transition-all duration-300 hover:translate-y-[-4px] hover:scale-105"
                >
                  Study Materials
                  <BookOpen className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                </Button>
              </div>
            </div>
            
            {/* Desktop Profile Image - Visible only on large screens */}
            <div className={`hidden lg:block ${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '500ms'}}>
              <div className="perspective-card-container w-full max-w-md aspect-[4/5] relative group mx-auto">
                <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-red-800 to-red-950 p-1 transform transition-all duration-500 hover:scale-[1.02] hover:rotate-2 shadow-xl hover:shadow-red-500/30 perspective-card group">
                  
                  {/* Profile Image */}
                  <div className="absolute left-0 right-0 mx-auto top-8 w-48 h-48 rounded-full border-4 border-red-500/50 overflow-hidden shadow-lg shadow-red-500/20 group-hover:scale-105 group-hover:border-red-400 transition-all duration-500">
                    <img
                      src="/sir-ammar.jpg"
                      alt="Sir Ammar Khan"
                      className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Content Box */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm rounded-b-xl p-6 border-t border-red-500/30">
                    <h3 className="text-2xl font-bold text-white mb-2 text-center">Sir Ammar Khan</h3>
                    <p className="text-red-400 text-center mb-4 text-sm">O-Level Education Specialist</p>
                    
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 rounded-lg hover:bg-red-900/20 transition-colors">
                        <User className="w-5 h-5 mx-auto text-red-400 mb-1" />
                        <p className="text-xs text-gray-300">1000+ Students</p>
                      </div>
                      <div className="p-2 rounded-lg hover:bg-red-900/20 transition-colors">
                        <Clock className="w-5 h-5 mx-auto text-red-400 mb-1" />
                        <p className="text-xs text-gray-300">8+ Years</p>
                      </div>
                      <div className="p-2 rounded-lg hover:bg-red-900/20 transition-colors">
                        <Star className="w-5 h-5 mx-auto text-red-400 mb-1" />
                        <p className="text-xs text-gray-300">90%+ A*-B</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-red-500/20 blur-xl"></div>
                  <div className="absolute bottom-32 left-4 w-12 h-12 rounded-full bg-red-700/30 blur-lg"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Features Section */}
          <div className="w-full mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <GraduationCap className="text-red-400 h-10 w-10" />,
                title: "Expert Knowledge",
                desc: "Specialized in O-Level Islamiyat and Pakistan Studies curricula"
              },
              {
                icon: <Award className="text-red-400 h-10 w-10" />,
                title: "Proven Results",
                desc: "Consistent record of students achieving A* to B grades"
              },
              {
                icon: <BookOpen className="text-red-400 h-10 w-10" />,
                title: "Comprehensive Resources",
                desc: "Access to complete study materials, notes and practice papers"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`glass-card p-6 rounded-xl border border-red-500/20 flex flex-col items-center text-center group hover:bg-red-950/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:shadow-red-500/20 ${isInView ? 'animate-fade-up' : 'opacity-0'}`}
                style={{animationDelay: `${800 + (index * 200)}ms`}}
              >
                <div className="mb-4 p-4 rounded-full bg-gradient-to-br from-red-900/30 to-red-700/10 group-hover:from-red-800/40 group-hover:to-red-600/20 transition-colors duration-300 transform group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-card-container {
          perspective: 1000px;
        }
        
        .perspective-card {
          transform-style: preserve-3d;
          backface-visibility: hidden;
          transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .perspective-card:hover {
          transform: rotateY(5deg) rotateX(5deg);
          box-shadow: 0 25px 50px -12px rgba(220, 38, 38, 0.25);
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}} />
    </div>
  );
};

export default Hero;
