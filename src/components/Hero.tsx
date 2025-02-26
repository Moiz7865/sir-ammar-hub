
import { GraduationCap, Award, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { TypeAnimation } from 'react-type-animation';
import { motion } from "framer-motion";

const Hero = () => {
  const handleEnroll = () => {
    window.open("https://wa.me/+923123456789", "_blank");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/books-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 min-h-screen flex flex-col justify-center">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-red-600/20 rounded-full blur-2xl" />
              <img
                src="/sir-ammar.jpg"
                alt="Sir Ammar Khan"
                className="relative rounded-2xl w-full max-w-md mx-auto shadow-2xl border-2 border-red-500/20"
              />
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-1 md:order-2 text-center md:text-left space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-block rounded-full px-4 py-1 bg-red-500/10 border border-red-500/20 text-red-300"
            >
              O-Level Education Expert
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold leading-tight"
            >
              Transform Your 
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
                className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600"
                repeat={Infinity}
              />
              <br />
              Journey
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-gray-300 max-w-xl"
            >
              Experience comprehensive O-Level education with personalized guidance 
              and proven success strategies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start pt-4"
            >
              <Button
                size="lg"
                onClick={handleEnroll}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8"
              >
                Start Learning <ArrowRight className="ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.location.href = '/notes'}
                className="border-red-500/30 text-red-300 hover:bg-red-950/30"
              >
                View Notes
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
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
              transition={{ delay: 0.8 + (i * 0.1) }}
              className="group"
            >
              <div className="relative p-6 bg-black/40 backdrop-blur border border-red-500/10 rounded-xl hover:bg-red-950/20 transition duration-300">
                <feature.icon className="h-8 w-8 text-red-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
