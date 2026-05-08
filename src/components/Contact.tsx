"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Send, Copy, Check } from "lucide-react";
import { contact, personal } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

// Discord SVG icon (not in Lucide)
function DiscordIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.11 18.102.127 18.115a19.916 19.916 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

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

const SOCIAL_LINKS = [
  {
    icon: Mail,
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
    color: "hover:border-red-500/50 hover:bg-red-500/5 hover:text-red-400",
    copyable: true,
  },
  {
    icon: GitHubIcon,
    label: "GitHub",
    value: `@${contact.github}`,
    href: contact.githubUrl,
    color: "hover:border-white/30 hover:bg-white/5 hover:text-white",
    copyable: false,
  },
  {
    icon: TwitterIcon,
    label: "Twitter / X",
    value: contact.twitter,
    href: contact.twitterUrl,
    color: "hover:border-sky-500/50 hover:bg-sky-500/5 hover:text-sky-400",
    copyable: false,
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    value: `in/${contact.linkedin}`,
    href: contact.linkedinUrl,
    color: "hover:border-blue-500/50 hover:bg-blue-500/5 hover:text-blue-400",
    copyable: false,
  },
  {
    icon: DiscordIcon,
    label: "Discord",
    value: contact.discord,
    href: contact.discordUrl,
    color:
      "hover:border-indigo-500/50 hover:bg-indigo-500/5 hover:text-indigo-400",
    copyable: false,
  },
];

function SocialCard({ item }: { item: (typeof SOCIAL_LINKS)[0] }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    if (!item.copyable) return;
    e.preventDefault();
    navigator.clipboard.writeText(item.value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const Icon = item.icon;

  return (
    <a
      href={item.href}
      target={item.href.startsWith("mailto") ? "_self" : "_blank"}
      rel="noreferrer"
      onClick={item.copyable ? handleCopy : undefined}
      className={`group flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/2 transition-all duration-200 ${item.color}`}
    >
      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 group-hover:scale-110 transition-transform">
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-zinc-500 mb-0.5">{item.label}</p>
        <p className="text-sm text-white truncate">{item.value}</p>
      </div>
      {item.copyable ? (
        copied ? (
          <Check size={15} className="text-green-400 shrink-0" />
        ) : (
          <Copy
            size={15}
            className="text-zinc-600 group-hover:text-current shrink-0"
          />
        )
      ) : (
        <Send
          size={13}
          className="text-zinc-600 group-hover:text-current shrink-0 rotate-40"
        />
      )}
    </a>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 85%" },
        },
      );
      gsap.fromTo(
        contentRef.current?.children
          ? Array.from(contentRef.current.children)
          : [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: contentRef.current, start: "top 80%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 px-4 max-w-6xl mx-auto"
    >
      {/* Heading */}
      <div ref={headRef} className="text-center mb-16">
        <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">
          Get in Touch
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Contact Me</h2>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Open to opportunities, collaborations, or just a good conversation
          about code. Reach out through any of these.
        </p>
      </div>

      {/* Content */}
      <div ref={contentRef} className="max-w-2xl mx-auto space-y-3">
        {SOCIAL_LINKS.map((item) => (
          <SocialCard key={item.label} item={item} />
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-16 text-zinc-600 text-sm">
        <p>Built with HKNain Studios</p>
        <p className="mt-1">
          © {new Date().getFullYear()} {personal.name}
        </p>
      </div>
    </section>
  );
}
