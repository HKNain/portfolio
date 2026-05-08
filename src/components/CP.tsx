"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Trophy } from "lucide-react";
import { cpPlatforms } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

// Platform logos as inline SVG/text identifiers
const PLATFORM_ICONS: Record<string, string> = {
  Codeforces: "CF",
  LeetCode: "LC",
  CodeChef: "CC",
  AtCoder: "AC",
};

function RatingCard({
  platform,
  visible,
}: {
  platform: typeof cpPlatforms[0];
  visible: boolean;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const pct = Math.min((platform.rating / platform.maxRating) * 100, 100);

  useEffect(() => {
    if (!visible) return;
    // Animate the bar fill
    if (barRef.current) {
      barRef.current.style.width = "0%";
      setTimeout(() => {
        if (barRef.current) barRef.current.style.width = `${pct}%`;
      }, 200);
    }
    // Count-up animation
    if (numRef.current) {
      let start = 0;
      const end = platform.rating;
      const step = Math.ceil(end / 60);
      const timer = setInterval(() => {
        start += step;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        if (numRef.current) numRef.current.textContent = start.toString();
      }, 22);
      return () => clearInterval(timer);
    }
  }, [visible, pct, platform.rating]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/3 hover:bg-white/6 p-6 transition-all duration-300 glow-on-hover group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Platform icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold"
            style={{ backgroundColor: platform.barColor + "22", color: platform.barColor }}
          >
            {PLATFORM_ICONS[platform.name]}
          </div>
          <div>
            <p className="font-semibold text-white">{platform.name}</p>
            <p className="text-xs text-zinc-500">@{platform.handle}</p>
          </div>
        </div>
        <a
          href={platform.profileUrl}
          target="_blank"
          rel="noreferrer"
          className="text-zinc-600 hover:text-violet-400 transition-colors mt-1"
        >
          <ExternalLink size={16} />
        </a>
      </div>

      {/* Rating number */}
      <div className="flex items-end gap-2 mb-1">
        <span
          ref={numRef}
          className="text-3xl font-bold tabular-nums"
          style={{ color: platform.barColor }}
        >
          0
        </span>
        <span className="text-xs text-zinc-500 mb-1">/ {platform.maxRating}</span>
      </div>

      {/* Rank badge */}
      <div className="flex items-center gap-2 mb-4">
        <Trophy size={13} style={{ color: platform.rankColor }} />
        <span
          className="text-sm font-medium"
          style={{ color: platform.rankColor }}
        >
          {platform.rank}
        </span>
      </div>

      {/* Rating bar */}
      <div className="rating-bar">
        <div
          ref={barRef}
          className="rating-fill"
          style={{ backgroundColor: platform.barColor }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-zinc-600">0</span>
        <span className="text-xs text-zinc-600">{pct.toFixed(0)}%</span>
        <span className="text-xs text-zinc-600">{platform.maxRating}</span>
      </div>
    </div>
  );
}

export default function CP() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 85%" } }
      );

      ScrollTrigger.create({
        trigger: gridRef.current,
        start: "top 80%",
        onEnter: () => setVisible(true),
      });

      gsap.fromTo(
        gridRef.current?.children ? Array.from(gridRef.current.children) : [],
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.55, stagger: 0.13, ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 80%" }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="cp" ref={sectionRef} className="py-24 px-4 max-w-6xl mx-auto">
      {/* Heading */}
      <div ref={headRef} className="text-center mb-16">
        <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">Competitive Programming</p>
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">CP Ratings</h2>
        <p className="text-zinc-400 max-w-xl mx-auto">
          My ratings across major competitive programming platforms.
        </p>
      </div>

      {/* Cards grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {cpPlatforms.map(p => (
          <RatingCard key={p.name} platform={p} visible={visible} />
        ))}
      </div>
    </section>
  );
}