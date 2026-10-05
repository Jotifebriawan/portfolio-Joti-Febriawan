import { useEffect, useState } from "react";

const formatWitaTime = () =>
  new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Makassar",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [currentTime, setCurrentTime] = useState(formatWitaTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(formatWitaTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer>
      <center>
        <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
        <div className="flex flex-wrap items-center justify-center gap-x-2 pb-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <span>
            © {currentYear}{" "}
            <a href="https://portfolio-joti-febriawan.vercel.app" className="hover:underline">
              Joti Febriawan
            </a>
            . All Rights Reserved.
          </span>
          <span aria-label="Waktu saat ini dalam Waktu Indonesia Tengah">
            {currentTime} WITA
          </span>
        </div>
      </center>
    </footer>
  );
};

export default Footer;