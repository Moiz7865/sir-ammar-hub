
import { GraduationCap, Award, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { TypeAnimation } from 'react-type-animation';
import { motion } from "framer-motion";

const Hero = () => {
  const handleEnroll = () => {
    window.open("https://wa.me/+923123456789", "_blank");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-red-950/40 to-black">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Top section with image and title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-900 rounded-full blur-xl opacity-50" />
            <img
              src="/sir-ammar.jpg"
              alt="Sir Ammar Khan"
              className="relative w-full h-full object-cover rounded-full border-4 border-red-700/50"
            />
          </motion.div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block rounded-full bg-gradient-to-r from-red-800 to-red-600 p-[2px]"
            >
              <div className="rounded-full bg-black/90 px-6 py-2">
                <span className="text-red-100">O-Level Education Expert</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-200 to-red-100">
                Master Your Future with
              </span>
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
                className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300"
                repeat={Infinity}
              />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-red-200/70 max-w-2xl mx-auto"
            >
              Join Sir Ammar Khan's comprehensive O-Level program and excel in your studies 
              with personalized attention and proven teaching methods.
            </motion.p>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-6 justify-center mb-16"
        >
          <Button
            size="lg"
            onClick={handleEnroll}
            className="bg-gradient-to-r from-red-700 to-red-600 hover:from-red-800 hover:to-red-700 text-white text-lg px-8 py-6 shadow-lg shadow-red-900/25"
          >
            Start Learning Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => window.location.href = '/notes'}
            className="border-red-700/30 text-red-300 hover:bg-red-950/30 text-lg px-8 py-6"
          >
            View Study Notes
          </Button>
        </motion.div>

        {/* Features grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
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
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + (i * 0.1) }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-700 to-red-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-1000" />
              <div className="relative px-6 py-8 bg-black/60 backdrop-blur-sm rounded-xl border border-red-900/50">
                <feature.icon className="h-10 w-10 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-red-100 mb-2">{feature.title}</h3>
                <p className="text-red-300/80">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
