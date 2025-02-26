
import { GraduationCap, Award, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { TypeAnimation } from 'react-type-animation';
import { motion } from "framer-motion";

const Hero = () => {
  const handleEnroll = () => {
    window.open("https://wa.me/+923123456789", "_blank");
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="space-y-6 text-center md:text-left">
            <div className="inline-block rounded-full bg-gradient-to-r from-pink-500 to-violet-500 p-[2px] mb-6">
              <div className="rounded-full bg-black/90 px-4 py-1">
                <span className="text-sm text-gray-100">O-Level Education Expert</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Master Your 
              <br />
              <TypeAnimation
                sequence={[
                  'Islamiyat',
                  2000,
                  'Pakistan Studies',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
                repeat={Infinity}
              />
              <br />
              with Expert Guidance
            </h1>

            <p className="text-lg text-gray-400 max-w-xl">
              Join Sir Ammar Khan's comprehensive O-Level program and excel in your studies 
              with personalized attention and proven teaching methods.
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Button
                size="lg"
                onClick={handleEnroll}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/25"
              >
                Start Learning Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.location.href = '/notes'}
                className="border-purple-500/20 text-purple-400 hover:bg-purple-500/10"
              >
                View Study Notes
              </Button>
            </div>

            {/* Stats/Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
              {[
                {
                  icon: GraduationCap,
                  title: "Expert Teaching",
                  desc: "8+ years experience"
                },
                {
                  icon: Award,
                  title: "Proven Results",
                  desc: "Excellence in O-Levels"
                },
                {
                  icon: BookOpen,
                  title: "Complete Notes",
                  desc: "Comprehensive material"
                }
              ].map((feature, i) => (
                <div 
                  key={i}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                  <div className="relative px-4 py-6 bg-gray-900 rounded-lg flex flex-col items-center text-center space-y-2">
                    <feature.icon className="h-8 w-8 text-purple-400" />
                    <h3 className="font-semibold text-gray-100">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Image */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-900">
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent z-10" />
              <img
                src="/sir-ammar.jpg"
                alt="Sir Ammar Khan"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
