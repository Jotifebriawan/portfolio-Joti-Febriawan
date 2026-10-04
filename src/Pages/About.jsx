import React, { useEffect, useState, memo, useMemo } from "react"
import { FileText, Code, Award, Globe, ArrowUpRight, Sparkles, UserCheck } from "lucide-react"
import AOS from 'aos'
import 'aos/dist/aos.css'

// Memoized Components
const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2 
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]" 
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p 
      className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-purple-400" />
      BISA KARENA TERBIASA
      <Sparkles className="w-5 h-5 text-purple-400" />
    </p>
  </div>
));

const ProfileImage = memo(() => {
  const [lanyardSway, setLanyardSway] = useState(0);

  return (
  <div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
    <div 
      className="relative isolate group" 
      data-aos="zoom-in-up"
      data-aos-duration="1200"
    >
      <div className="relative profile-float">
        <div aria-hidden="true" className="profile-lanyard absolute -top-[min(28vh,12rem)] left-1/2 z-0 h-[min(28vh,12rem)] w-16 -translate-x-1/2">
          <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 64 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="profile-lanyard-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#cffafe" stopOpacity="0.9" />
                <stop offset="55%" stopColor="#a5b4fc" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path
              d={`M 31 14 C ${31 + lanyardSway * 0.3} 65, ${21 + lanyardSway} 145, 20 200`}
              fill="none"
              stroke="url(#profile-lanyard-gradient)"
              strokeWidth="5"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 5px rgba(129,140,248,0.65))" }}
            />
            <path
              d={`M 33 14 C ${33 + lanyardSway * 0.3} 65, ${43 + lanyardSway} 145, 44 200`}
              fill="none"
              stroke="url(#profile-lanyard-gradient)"
              strokeWidth="5"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 5px rgba(129,140,248,0.65))" }}
            />
          </svg>
          <div className="absolute left-1/2 top-0 z-30 flex -translate-x-1/2 flex-col items-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-gradient-to-br from-slate-700 via-indigo-950 to-slate-950 shadow-[0_0_18px_rgba(129,140,248,0.55)]">
              <div className="h-3 w-3 rounded-full border-2 border-cyan-100 bg-indigo-900 shadow-[0_0_10px_rgba(165,243,252,0.8)]" />
            </div>
            <div className="-mt-1 h-4 w-[4px] rounded-full bg-gradient-to-b from-cyan-100 to-indigo-400 shadow-[0_0_8px_rgba(165,243,252,0.7)]" />
          </div>
          <div className="absolute bottom-0 left-1/2 z-20 h-5 w-8 -translate-x-1/2 translate-y-1/2 rounded-md border border-white/50 bg-gradient-to-r from-cyan-200 to-violet-500 shadow-[0_0_14px_rgba(129,140,248,0.45)]" />
        </div>
        <div
          aria-hidden="true"
          className="absolute -inset-[5px] rounded-[1.4rem] bg-gradient-to-br from-cyan-300 via-indigo-500 to-fuchsia-500 opacity-80 blur-[1px] transition-transform duration-700 motion-safe:group-hover:rotate-2"
        />
        <div
          aria-hidden="true"
          className="absolute -inset-3 rounded-[1.7rem] border border-white/15 transition-transform duration-700 motion-safe:group-hover:-rotate-6"
        />
        <div
          className="relative aspect-[3/4] w-[min(68vw,16rem)] overflow-hidden rounded-[1.15rem] border border-white/20 bg-slate-950 shadow-[0_18px_60px_rgba(49,46,129,0.35)] transition-transform duration-500 motion-safe:group-hover:-translate-y-1 sm:w-64 md:w-72"
          onPointerMove={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect();
            event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
            event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
            const horizontalPosition = (event.clientX - bounds.left) / bounds.width - 0.5;
            setLanyardSway(Math.round(Math.max(-16, Math.min(16, horizontalPosition * 32))));
          }}
          onPointerLeave={(event) => {
            setLanyardSway(0);
          }}
        >
          <img
            src="/foto.jpeg"
            alt="Joti Febriawan"
            className="h-full w-full scale-110 object-cover object-[center_45%] transition-transform duration-700 motion-safe:group-hover:scale-[1.55]"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090513]/35 via-transparent to-white/10" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1.2px, transparent 1.8px)",
              backgroundSize: "14px 14px",
              maskImage: "radial-gradient(circle at var(--pointer-x, 50%) var(--pointer-y, 50%), black 0, transparent 112px)",
              WebkitMaskImage: "radial-gradient(circle at var(--pointer-x, 50%) var(--pointer-y, 50%), black 0, transparent 112px)",
            }}
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-2 rounded-[0.85rem] border border-white/25" />
        </div>
      </div>
    </div>
  </div>
  );
});

const StatCard = memo(({ icon: Icon, color, value, label, description, animation }) => (
  <div data-aos={animation} data-aos-duration={1300} className="relative group">
    <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
      <div className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <span 
          className="text-4xl font-bold text-white"
          data-aos="fade-up-left"
          data-aos-duration="1500"
          data-aos-anchor-placement="top-bottom"
        >
          {value}
        </span>
      </div>

      <div>
        <p 
          className="text-sm uppercase tracking-wider text-gray-300 mb-2"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-anchor-placement="top-bottom"
        >
          {label}
        </p>
        <div className="flex items-center justify-between">
          <p 
            className="text-xs text-gray-400"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-anchor-placement="top-bottom"
          >
            {description}
          </p>
          <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  </div>
));

const AboutPage = () => {
  // Memoized calculations
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalCertificates: 0,
    YearExperience: 0,
  });

  useEffect(() => {
    const updateStats = () => {
      const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
      const storedCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");
      
      const startDate = new Date("2021-11-06");
      const today = new Date();
      const experience = today.getFullYear() - startDate.getFullYear() -
        (today < new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate()) ? 1 : 0);

      setStats({
        totalProjects: storedProjects.length,
        totalCertificates: storedCertificates.length,
        YearExperience: experience
      });
    };

    updateStats();

    window.addEventListener('storage', updateStats);
    window.addEventListener('portfolioDataUpdated', updateStats);

    return () => {
      window.removeEventListener('storage', updateStats);
      window.removeEventListener('portfolioDataUpdated', updateStats);
    };
  }, []);

  const { totalProjects, totalCertificates, YearExperience } = stats;

  // Optimized AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: false, 
      });
    };

    initAOS();
    
    // Debounced resize handler
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAOS, 250);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Memoized stats data
  const statsData = useMemo(() => [
    {
      icon: Code,
      color: "from-[#6366f1] to-[#a855f7]",
      value: totalProjects,
      label: "Total Projects",
      description: "Innovative web solutions crafted",
      animation: "fade-right",
    },
    {
      icon: Award,
      color: "from-[#a855f7] to-[#6366f1]",
      value: totalCertificates,
      label: "Certificates",
      description: "Professional skills validated",
      animation: "fade-up",
    },
    {
      icon: Globe,
      color: "from-[#6366f1] to-[#a855f7]",
      value: YearExperience,
      label: "Years of Experience",
      description: "Continuous learning journey",
      animation: "fade-left",
    },
  ], [totalProjects, totalCertificates, YearExperience]);

  return (
    <div
      className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm-mt-0" 
      id="About"
     itemScope
  itemType="https://schema.org/Person"

    >
      <Header />

      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                Hello, I'm
              </span>
              <span 
                className="block mt-2 text-gray-200"
                data-aos="fade-right"
                data-aos-duration="1300"
                itemProp="name"
              >
                Joti Febriawan
              </span>
            </h2>
            
            <p 
              className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-justify pb-4 sm:pb-0"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              Fresh graduate S1 Rekayasa Sistem Komputer dari Institut Bisnis dan Teknologi Indonesia (INSTIKI), dengan minat pada pengembangan web dan mobile, jaringan komputer, IoT, serta AI. Berpengalaman mengembangkan proyek teknologi dan aktif berorganisasi, saya memiliki kemampuan komunikasi, kerja sama tim, kepemimpinan, dan problem solving. Cepat belajar, adaptif, serta siap berkontribusi dan berkembang di industri teknologi informasi.
            </p>

               {/* Quote Section */}
      <div 
        className="relative bg-gradient-to-br from-[#6366f1]/5 via-transparent to-[#a855f7]/5 border border-gradient-to-r border-[#6366f1]/30 rounded-2xl p-4 my-6 backdrop-blur-md shadow-2xl overflow-hidden"
        data-aos="fade-up"
        data-aos-duration="1700"
      >
        {/* Floating orbs background */}
        <div className="absolute top-2 right-4 w-16 h-16 bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -left-2 w-12 h-12 bg-gradient-to-r from-[#a855f7]/20 to-[#6366f1]/20 rounded-full blur-lg"></div>
        
        {/* Quote icon */}
        <div className="absolute top-3 left-4 text-[#6366f1] opacity-30">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
          </svg>
        </div>
        
        <blockquote className="text-gray-300 text-center italic font-medium text-sm relative z-10">
          "becoming and giving"
        </blockquote>
      </div>

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-4 lg:px-0 w-full">
              <a href="https://drive.google.com/file/d/1fEfgFX5PIBHdYpBB3fr0CJIDs7HccFcJ/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="w-full lg:w-auto">
              <button 
                data-aos="fade-up"
                data-aos-duration="800"
                className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 shadow-lg hover:shadow-xl "
              >
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> Download CV
              </button>
              </a>
              <a href="#Portofolio" className="w-full lg:w-auto">
              <button 
                data-aos="fade-up"
                data-aos-duration="1000"
                className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg border border-[#a855f7]/50 text-[#a855f7] font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 hover:bg-[#a855f7]/10 "
              >
                <Code className="w-4 h-4 sm:w-5 sm:h-5" /> View Projects
              </button>
              </a>
            </div>
          </div>

          <ProfileImage />
        </div>

        <a href="#Portofolio">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 cursor-pointer">
            {statsData.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </a>
      </div>

      <style jsx>{`
        .profile-float {
          animation: profile-float 4.5s ease-in-out infinite;
          transform-origin: center top;
        }
        @keyframes profile-float {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          50% { transform: translate3d(0, -8px, 0) rotate(0.5deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .profile-float { animation: none; }
          .profile-lanyard { transition: none; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slower {
          to { transform: rotate(360deg); }
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(AboutPage);