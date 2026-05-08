"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowDown, Download } from "lucide-react";
import { personal, contact } from "@/lib/data";

const ROLES = [
  "Full Stack Developer",
  "Competitive Programmer",
  "Problem Solver",
];

// GitHub SVG icon
function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0.297c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577 0-.285-.01-1.04-.016-2.04-3.338.726-4.042-1.612-4.042-1.612-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.303-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.51 11.51 0 0 1 3.003-.404c1.018.005 2.045.137 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.625-5.475 5.921.43.371.814 1.102.814 2.222 0 1.605-.015 2.898-.015 3.293 0 .32.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

// Twitter SVG icon
function TwitterIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.64 7.584H.474l8.6-9.83L0 1.153h7.594l5.243 6.932 6.064-6.932Zm-1.29 19.494h2.039L6.486 3.24H4.298l13.313 17.407Z" />
    </svg>
  );
}

// LinkedIn SVG icon
function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11.75 20h-2.5v-9h2.5v9zm-1.25-10.359c-.804 0-1.453-.666-1.453-1.488 0-.822.649-1.488 1.453-1.488s1.453.666 1.453 1.488c0 .822-.649 1.488-1.453 1.488zm13 10.359h-2.5v-4.847c0-1.156-.021-2.643-1.609-2.643-1.61 0-1.856 1.257-1.856 2.561v4.929h-2.5v-9h2.398v1.233h.035c.334-.633 1.148-1.302 2.364-1.302 2.527 0 2.992 1.664 2.992 3.827v5.242z" />
    </svg>
  );
}

export default function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const roleIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  // Entry GSAP timeline
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      nameRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.9 },
    )
      .fromTo(
        roleRef.current?.parentElement ?? null,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.4",
      )
      .fromTo(
        bioRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.4",
      )
      .fromTo(
        btnsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3",
      )
      .fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.1",
      );
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!roleRef.current) return;
    let timer: ReturnType<typeof setTimeout>;
    const type = () => {
      const word = ROLES[roleIdx.current];
      if (!deleting.current) {
        charIdx.current++;
        roleRef.current!.textContent = word.slice(0, charIdx.current);
        if (charIdx.current === word.length) {
          deleting.current = true;
          timer = setTimeout(type, 1800);
          return;
        }
      } else {
        charIdx.current--;
        roleRef.current!.textContent = word.slice(0, charIdx.current);
        if (charIdx.current === 0) {
          deleting.current = false;
          roleIdx.current = (roleIdx.current + 1) % ROLES.length;
        }
      }
      timer = setTimeout(type, deleting.current ? 55 : 90);
    };
    timer = setTimeout(type, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center dot-grid overflow-hidden"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-150 h-150 rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          Available for work
        </div>

        {/* Name */}
        <h1
          ref={nameRef}
          className="text-5xl sm:text-7xl font-bold tracking-tight mb-4 opacity-0"
        >
          Hi, I{"'"}m{" "}
          <span className="bg-linear-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {personal.name}
          </span>
        </h1>

        {/* Typewriter */}
        <div className="text-xl sm:text-2xl text-zinc-400 mb-6 h-8 flex items-center justify-center gap-1">
          <span ref={roleRef} className="text-white font-medium" />
          <span className="cursor text-violet-400 font-light">|</span>
        </div>

        {/* Bio */}
        <p
          ref={bioRef}
          className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed opacity-0"
        >
          {personal.bio}
        </p>

        {/* Buttons */}
        <div
          ref={btnsRef}
          className="flex flex-wrap items-center justify-center gap-4 mb-16 opacity-0"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium transition-all duration-200 hover:scale-105 active:scale-95"
          >
            View Projects
          </a>
          <a
            href={personal.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-xl border border-white/10 hover:border-violet-500/50 bg-white/5 hover:bg-white/10 text-white font-medium flex items-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Download size={16} /> Resume
          </a>

          {/* Social icons */}
          <div className="flex items-center gap-3 ml-2">
            {[
              { icon: GitHubIcon, href: contact.githubUrl, label: "GitHub" },
              {
                icon: LinkedInIcon,
                href: contact.linkedinUrl,
                label: "LinkedIn",
              },
              { icon: TwitterIcon, href: contact.twitterUrl, label: "Twitter" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 hover:border-violet-500/50 hover:bg-violet-500/10 flex items-center justify-center text-zinc-400 hover:text-violet-400 transition-all duration-200"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollRef}
          className="flex flex-col items-center gap-2 text-zinc-600 opacity-0"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ArrowDown size={16} className="animate-bounce" />
        </div>
      </div>
    </section>
  );
}
