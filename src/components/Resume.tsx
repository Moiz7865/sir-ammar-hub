
import { Briefcase, GraduationCap, Code } from "lucide-react";

const Resume = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-950 to-black text-white py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-red-400 animate-fade-in">Resume</h2>
          
          <div className="relative pl-8 space-y-16">
            {/* Timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 to-red-900"></div>
            
            {/* Education Section */}
            <div className="relative animate-fade-up">
              <div className="absolute -left-8 p-2 rounded-full bg-black border border-red-500 hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-4 h-4 text-red-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-red-400">Education</h3>
              <div className="glass-card p-6 rounded-xl hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 transform hover:scale-[1.02] hover:bg-black/50">
                <h4 className="font-semibold">Teaching Experience</h4>
                <p className="text-gray-400 mt-2">
                  Over 8 years of dedicated teaching experience in O-Level subjects,
                  specializing in Islamiyat and Pakistan Studies.
                </p>
              </div>
            </div>

            {/* Skills Section */}
            <div className="relative animate-fade-up [--tw-animate-delay:200ms]">
              <div className="absolute -left-8 p-2 rounded-full bg-black border border-red-500 hover:scale-110 transition-transform duration-300">
                <Code className="w-4 h-4 text-red-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-red-400">Expertise</h3>
              <div className="glass-card p-6 rounded-xl space-y-4 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 transform hover:scale-[1.02] hover:bg-black/50">
                <div>
                  <h4 className="font-semibold">Islamiyat</h4>
                  <p className="text-gray-400 mt-2">
                    Comprehensive understanding of Islamic studies, teaching methodology,
                    and exam preparation techniques.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Pakistan Studies</h4>
                  <p className="text-gray-400 mt-2">
                    Expert knowledge in Pakistani history, geography, and current affairs,
                    with proven success in student achievements.
                  </p>
                </div>
              </div>
            </div>

            {/* Projects/Achievements Section */}
            <div className="relative animate-fade-up [--tw-animate-delay:400ms]">
              <div className="absolute -left-8 p-2 rounded-full bg-black border border-red-500 hover:scale-110 transition-transform duration-300">
                <Briefcase className="w-4 h-4 text-red-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-red-400">Achievements</h3>
              <div className="glass-card p-6 rounded-xl hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 transform hover:scale-[1.02] hover:bg-black/50">
                <ul className="space-y-4">
                  <li>
                    <h4 className="font-semibold">Student Success Rate</h4>
                    <p className="text-gray-400 mt-2">
                      Consistently achieving 90%+ A* to B grades in O-Level examinations.
                    </p>
                  </li>
                  <li>
                    <h4 className="font-semibold">Teaching Portfolio</h4>
                    <p className="text-gray-400 mt-2">
                      Developed comprehensive study materials and modern teaching methodologies.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
