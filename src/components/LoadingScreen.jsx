import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Code2, Github, Globe, User } from "lucide-react";

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index += 1;
      } else {
        clearInterval(timer);
      }
    }, 170);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="inline-flex items-center gap-2 text-transparent bg-gradient-to-r from-indigo-300 to-violet-500 bg-clip-text">
      {displayText}
      <span className="animate-pulse text-indigo-300">|</span>
    </span>
  );
};

const LoadingScreen = ({ onLoadingComplete }) => {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => onLoadingComplete?.(), 3200);
    return () => window.clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      role="status"
      aria-label="Memuat portofolio Joti Febriawan"
      aria-live="polite"
      className="fixed inset-0 z-[100] flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#090513] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.04, filter: "blur(8px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(128,90,213,0.18),_transparent_35%),radial-gradient(circle_at_50%_60%,_rgba(168,85,247,0.12),_transparent_38%)]" />
      </div>

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-center px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-8 flex items-center justify-center gap-4 sm:gap-6 md:gap-8"
        >
          {[Code2, User, Github].map((Icon, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-violet-500/10 shadow-[0_0_35px_rgba(168,85,247,0.5)] backdrop-blur-sm sm:h-24 sm:w-24"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 to-violet-500/20 blur-lg" />
              <Icon className="relative h-8 w-8 text-white sm:h-10 sm:w-10" strokeWidth={2.2} />
            </motion.div>
          ))}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl font-black leading-none tracking-[-0.07em] text-white sm:text-6xl md:text-[7rem]"
        >
          <span className="mb-2 block text-white">Welcome To My</span>
          <span className="block bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
            Portfolio Website
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 flex items-center justify-center gap-3 rounded-full bg-white/0 px-2 py-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-violet-500/10 text-indigo-200 shadow-[0_0_18px_rgba(168,85,247,0.5)]">
            <Globe className="h-4 w-4" strokeWidth={2.2} />
          </div>
          <span className="text-xl font-medium tracking-[-0.05em] text-white/90 sm:text-2xl md:text-[2rem]">
            <TypewriterEffect text="fbrwnn.com" />
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
