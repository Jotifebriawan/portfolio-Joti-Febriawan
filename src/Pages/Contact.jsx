import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send, Copy, Check } from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import Komentar from "../components/Commentar";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const CONTACT_INFO = {
  email: "jotifebriawan07@gmail.com",
  whatsappNumber: "087849095310",
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedValue, setCopiedValue] = useState("");

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const getWhatsAppLink = () => {
    if (!CONTACT_INFO.whatsappNumber) {
      return "https://wa.me/?text=Halo%20Joti%2C%20saya%20tertarik%20dengan%20portofolio%20Anda.";
    }

    const digitsOnly = CONTACT_INFO.whatsappNumber.replace(/\D/g, "");
    return `https://wa.me/${digitsOnly}?text=${encodeURIComponent("Halo Joti, saya tertarik dengan portofolio Anda.")}`;
  };

  const handleCopy = async (type) => {
    try {
      if (type === "email") {
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_INFO.email)}`;
        window.open(gmailLink, "_blank", "noopener,noreferrer");
        setCopiedValue(type);
        setTimeout(() => setCopiedValue(""), 1800);
        return;
      }

      const waLink = getWhatsAppLink();
      await navigator.clipboard.writeText(CONTACT_INFO.whatsappNumber || waLink);
      setCopiedValue(type);
      setTimeout(() => setCopiedValue(""), 1800);

      if (CONTACT_INFO.whatsappNumber) {
        window.open(waLink, "_blank", "noopener,noreferrer");
      }
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: 'Mengirim Pesan...',
      html: 'Harap tunggu selagi kami mengirim pesan Anda',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const formSubmitUrl = 'https://formsubmit.co/ajax/jotifebriawan07@gmail.com';

      await axios.post(formSubmitUrl, {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        _subject: 'Pesan Baru dari Website Portfolio',
        _captcha: false,
        _template: 'table',
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      Swal.fire({
        title: 'Berhasil!',
        text: 'Permintaan Pesan Telah Berhasil di Kirim, Terimakasih Atas Kunjungan Anda. ❤️',
        icon: 'success',
        confirmButtonColor: '#6366f1',
        timer: 2000,
        timerProgressBar: true
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });

    } catch (error) {
      Swal.fire({
        title: 'Gagal!',
        text: 'Pesan belum terkirim. Periksa koneksi lalu coba lagi.',
        icon: 'error',
        confirmButtonColor: '#6366f1'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-[5%] sm:px-[5%] lg:px-[10%]">
      <div className="text-center lg:mt-[5%] mt-10 mb-2 sm:px-0 px-[5%]">
        <h2 data-aos="fade-down" data-aos-duration="1000" className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: "#6366f1",
            backgroundImage: "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Hubungi Saya
          </span>
        </h2>
        <p data-aos="fade-up" data-aos-duration="1100" className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Punya pertanyaan? Kirimi saya pesan, dan saya akan segera membalasnya.
        </p>
      </div>

      <div className="h-auto py-10 flex items-center justify-center 2xl:pr-[3.1%] lg:pr-[3.8%] md:px-0" id="Contact">
        <div className="container px-[1%] grid grid-cols-1 gap-12 lg:grid-cols-[45%_55%] 2xl:grid-cols-[35%_65%]">
          <div className="rounded-3xl bg-white/5 p-5 py-10 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:shadow-[#6366f1]/10 sm:p-10">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <h2 className="mb-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-4xl font-bold text-transparent">
                  Hubungi
                </h2>
                <p className="text-gray-400">
                  Ada yang ingin didiskusikan? Kirim saya pesan dan mari kita bicara.
                </p>
              </div>
              <Share2 className="h-10 w-10 text-[#6366f1] opacity-50" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div data-aos="fade-up" data-aos-delay="100" className="group relative">
                <User className="absolute left-4 top-4 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-[#6366f1]" />
                <input
                  type="text"
                  name="name"
                  placeholder="Nama Anda"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-white/20 bg-white/10 p-4 pl-12 text-white placeholder-gray-500 transition-all duration-300 hover:border-[#6366f1]/30 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 disabled:opacity-50"
                  required
                />
              </div>
              <div data-aos="fade-up" data-aos-delay="200" className="group relative">
                <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-[#6366f1]" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Anda"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-white/20 bg-white/10 p-4 pl-12 text-white placeholder-gray-500 transition-all duration-300 hover:border-[#6366f1]/30 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 disabled:opacity-50"
                  required
                />
              </div>
              <div data-aos="fade-up" data-aos-delay="300" className="group relative">
                <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-[#6366f1]" />
                <textarea
                  name="message"
                  placeholder="Pesan Anda"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="h-[9.9rem] w-full resize-none rounded-xl border border-white/20 bg-white/10 p-4 pl-12 text-white placeholder-gray-500 transition-all duration-300 hover:border-[#6366f1]/30 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 disabled:opacity-50"
                  required
                />
              </div>
              <button
                data-aos="fade-up"
                data-aos-delay="400"
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#6366f1]/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
              >
                <Send className="h-5 w-5" />
                {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </form>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => handleCopy("email")}
                className="copy-action-button flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-400/50 hover:bg-white/10"
              >
                {copiedValue === "email" ? <Check className="h-4 w-4 text-green-400" /> : <Mail className="h-4 w-4" />}
                {copiedValue === "email" ? "Gmail Terbuka" : "Chat Gmail"}
              </button>

              <button
                type="button"
                onClick={() => handleCopy("whatsapp")}
                className="copy-action-button flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-400/50 hover:bg-white/10"
              >
                {copiedValue === "whatsapp" ? <Check className="h-4 w-4 text-green-400" /> : <MessageSquare className="h-4 w-4" />}
                {copiedValue === "whatsapp" ? "Tersalin" : "WhatsApp"}
              </button>
            </div>

            <div className="mt-10 flex justify-center space-x-6 border-t border-white/10 pt-6">
              <SocialLinks />
            </div>
          </div>

          <div className="rounded-3xl bg-white/5 p-3 py-3 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:shadow-[#6366f1]/10 md:p-10 md:py-8">
            <Komentar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;