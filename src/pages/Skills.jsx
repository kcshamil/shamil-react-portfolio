import React, { useEffect, useRef } from "react";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { icon: <FaHtml5 />, name: "HTML5",      color: "#e34c26", level: 6 },
  { icon: <FaCss3Alt />, name: "CSS3",     color: "#264de4", level: 5 },
  { icon: <FaJs />, name: "JavaScript",    color: "#f0db4f", level: 6 },
  { icon: <FaReact />, name: "React",      color: "#61DBFB", level: 4 },
  { icon: <FaNodeJs />, name: "Node.js",   color: "#3c873a", level: 5 },
  { icon: <SiMongodb />, name: "MongoDB",  color: "#4DB33D", level: 4 },
  { icon: <FaGitAlt />, name: "Git",       color: "#f34f29", level: 5 },
  { icon: <FaGithub />, name: "GitHub",    color: "#ffffff", level: 6 },
];

function Skills() {
  const sectionRef = useRef(null);
  const dotRowRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".skill-row-item",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.09, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } });

      dotRowRefs.current.forEach((row) => {
        if (!row) return;
        const dots = row.querySelectorAll(".dot.active");
        gsap.fromTo(dots,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, stagger: 0.08, ease: "back.out(2)", scrollTrigger: { trigger: row, start: "top 85%" } });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .skills-section { background: var(--navy); padding: 100px 0; }
        .skill-row-item {
          display: flex; align-items: center; gap: 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 18px 24px;
          transition: border-color 0.25s, transform 0.25s;
        }
        .skill-row-item:hover { border-color: rgba(255,107,74,0.35); transform: translateY(-3px); }
        .skill-icon-wrap { font-size: 1.6rem; flex-shrink: 0; }
        .skill-name { font-family: var(--syne); font-size: 0.85rem; font-weight: 700; color: var(--text); letter-spacing: 0.04em; min-width: 90px; }
        .dot-track { display: flex; gap: 7px; flex-wrap: nowrap; }
        .dot { width: 11px; height: 11px; border-radius: 50%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); flex-shrink: 0; }
        .dot.active { background: var(--accent); border-color: var(--accent); box-shadow: 0 0 6px rgba(255,107,74,0.5); }
      `}</style>

      <section id="skills" className="skills-section panel" ref={sectionRef}>
        <div className="container">
          <h2 className="section-heading">Tech <span>Skills</span></h2>
          <div className="row justify-content-center gy-4">
            {skills.map((s, i) => (
              <div className="col-md-5" key={s.name}>
                <div className="skill-row-item" ref={el => dotRowRefs.current[i] = el}>
                  <span className="skill-icon-wrap" style={{ color: s.color }}>{s.icon}</span>
                  <span className="skill-name">{s.name}</span>
                  <div className="dot-track ms-auto">
                    {Array.from({ length: 8 }).map((_, d) => (
                      <div key={d} className={`dot${d < s.level ? " active" : ""}`} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Skills;