import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";
import { toSlug } from "../utils/slug";

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      console.log("ProjectLink kosong");
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };

  const handleDetails = (e) => {
    if (!id) {
      console.log("ID kosong");
      e.preventDefault();
      alert("Project details are not available");
    }
  };

  return (
    <div className="group relative w-full">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 shadow-[0_18px_40px_rgba(15,23,42,0.35)] backdrop-blur-lg transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/40 hover:shadow-[0_24px_60px_rgba(99,102,241,0.18)]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute -inset-x-full top-0 h-full rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shine" />
        </div>

        <div className="relative z-10 p-5">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={Img}
              alt={Title}
              className="aspect-[16/8] w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            />
          </div>

          <div className="mt-4 space-y-3">
            <h3 className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-xl font-semibold text-transparent">
              {Title}
            </h3>

            <p className="text-sm leading-relaxed text-gray-300/80 line-clamp-2">
              {Description}
            </p>

            <div className="flex items-center justify-between pt-4">
              {ProjectLink ? (
                <a
                  href={ProjectLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="inline-flex items-center gap-2 text-blue-400 transition-all duration-200 hover:-translate-y-0.5 hover:text-blue-300"
                >
                  <span className="text-sm font-medium">Live Demo</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                <span className="text-sm text-gray-500">Demo Not Available</span>
              )}

              {id ? (
                <Link
                  to={`/project/${toSlug(Title)}`}
                  onClick={handleDetails}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white/90 transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-500/40 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <span className="text-sm font-medium">Details</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <span className="text-sm text-gray-500">Details Not Available</span>
              )}
            </div>
          </div>

          <div className="absolute inset-0 -z-10 rounded-2xl border border-transparent transition-colors duration-300 group-hover:border-purple-500/40" />
        </div>
      </div>
    </div>
  );
};

export default CardProject;
