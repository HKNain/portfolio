"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillGroups } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 85%" } }
      );

      const cards = cardsRef.current?.children
        ? Array.from(cardsRef.current.children)
        : [];

      gsap.fromTo(cards,
        { opacity: 0, scale: 0.88, y: 40 },
        {
          opacity: 1, scale: 1, y: 0, duration: 0.55, ease: "back.out(1.4)",
          stagger: 0.1,
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%" }
        }
      );

      // Animate each skill pill inside cards
      cards.forEach(card => {
        const pills = Array.from(card.querySelectorAll(".skill-pill"));
        gsap.fromTo(pills,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1, scale: 1, duration: 0.35, stagger: 0.05, ease: "back.out(1.5)",
            scrollTrigger: { trigger: card, start: "top 80%" }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 px-4 max-w-6xl mx-auto"
    >
      {/* Heading */}
      <div ref={headRef} className="text-center mb-16">
        <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">Toolbox</p>
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Skills & Technologies</h2>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Technologies I{"'"}ve worked with across different layers of the stack.
        </p>
      </div>

      {/* Skill group cards */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 sm:grid-cols-2 gap-5"
      >
        {skillGroups.map(group => (
          <div
            key={group.label}
            className={`rounded-2xl border bg-linear-to-br p-6 ${group.color} transition-all duration-300 glow-on-hover`}
          >
            <h3 className={`text-sm font-semibold uppercase tracking-widest mb-4 ${group.iconColor}`}>
              {group.label}
            </h3>

            {/* Skill pills */}
            <div className="flex flex-wrap gap-2.5">
              {group.skills.map(skill => (
                <span
                  key={skill}
                  className="skill-pill px-3.5 py-1.5 rounded-full text-sm font-medium
                    bg-white/10 border border-white/10 text-white
                    hover:bg-white/20 cursor-default select-none"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}