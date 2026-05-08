"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {  ExternalLink, Mail, Star } from "lucide-react";
import { projects } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 85%" } }
      );
      gsap.fromTo(
        gridRef.current?.children ? Array.from(gridRef.current.children) : [],
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: gridRef.current, start: "top 80%" }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 px-4 max-w-6xl mx-auto">
      {/* Heading */}
      <div ref={headRef} className="text-center mb-16">
        <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">Work</p>
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Featured Projects</h2>
        <p className="text-zinc-400 max-w-xl mx-auto">
          A selection of things I{"'"}ve built — from full-stack apps to CLI tools.
        </p>
      </div>

      {/* Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map(proj => (
          <div
            key={proj.title}
            className={`relative group rounded-2xl border p-6 bg-white/2 hover:bg-white/5 transition-all duration-300 glow-on-hover ${
              proj.featured
                ? "border-violet-500/30 md:col-span-1"
                : "border-white/10"
            }`}
          >
            {proj.featured && (
              <span className="absolute top-4 right-4 flex items-center gap-1 text-xs text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-full border border-yellow-400/20">
                <Star size={11} fill="currentColor" /> Featured
              </span>
            )}

            <h3 className="text-lg font-semibold mb-2 group-hover:text-violet-300 transition-colors">
              {proj.title}
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">{proj.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {proj.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-3">
              <a
                href={proj.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                <Mail size={15} /> Code
              </a>
              {proj.live && (
                <a
                  href={proj.live}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 transition-colors"
                >
                  <ExternalLink size={15} /> Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}