import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const eduEntries = [
  {
    num: "01",
    years: "2019 – 2021",
    degree: "Higher Secondary — Science Stream",
    school: "PMSAHSS Elankur — District Malappuram (Kerala)",
    tags: ["Biology", "Physics", "Mathematics", "Chemistry"],
    stats: [{ value: "74.7%", label: "Score" }],
    color: "#3dd598",
    pinBg: "rgba(61,213,152,0.1)",
    pinBorder: "rgba(61,213,152,0.3)",
    accentLine: "linear-gradient(90deg, rgba(61,213,152,0.75), rgba(61,213,152,0.1))",
    yearBg: "rgba(61,213,152,0.08)",
    yearBorder: "rgba(61,213,152,0.2)",
  },
  {
    num: "02",
    years: "2021 – 2024",
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Al Jamia Arts & Science College (Calicut University), Poopalam, Perinthalmanna",
    tags: ["Data Structures", "DBMS", "Software Engineering", "Networking"],
    stats: [{ value: "6.95", label: "CGPA" }],
    color: "#7dd3fc",
    pinBg: "rgba(125,211,252,0.1)",
    pinBorder: "rgba(125,211,252,0.3)",
    accentLine: "linear-gradient(90deg, rgba(125,211,252,0.75), rgba(125,211,252,0.1))",
    yearBg: "rgba(125,211,252,0.08)",
    yearBorder: "rgba(125,211,252,0.2)",
  },
];

function Education() {
  const eduRowRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ".edu-grid",
        start: "top 82%",
        once: true,
        onEnter: () => {
          eduRowRefs.current.forEach((row, i) => {
            if (!row) return;
            setTimeout(() => row.classList.add("edu-visible"), i * 200);
          });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .edu-section {
          background: linear-gradient(135deg, var(--navy2) 0%, var(--navy3) 100%);
          padding: 100px 0; position: relative; overflow: hidden;
        }
        .edu-section::before {
          content: ''; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,107,74,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,74,0.025) 1px, transparent 1px);
          background-size: 72px 72px; pointer-events: none;
        }
        .edu-section::after {
          content: ''; position: absolute; width: 560px; height: 560px; border-radius: 50%;
          background: radial-gradient(circle, rgba(255,107,74,0.05) 0%, transparent 70%);
          top: 50%; left: 50%; transform: translate(-50%, -50%);
          pointer-events: none; filter: blur(80px);
        }
        .edu-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--dm); font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--accent); background: rgba(255,107,74,0.08);
          border: 1px solid rgba(255,107,74,0.2);
          padding: 6px 18px; border-radius: 100px; margin-bottom: 16px;
        }
        .edu-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent); animation: edu-blink 1.8s ease-in-out infinite;
        }
        @keyframes edu-blink { 0%,100%{opacity:1} 50%{opacity:0.25} }
        .edu-grid {
          display: flex; flex-direction: column; gap: 20px;
          max-width: 740px; margin: 0 auto; position: relative; z-index: 1;
        }
        .edu-grid::before {
          content: ''; position: absolute; left: 27px; top: 24px; bottom: 24px; width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(255,107,74,0.3) 12%, rgba(255,107,74,0.3) 88%, transparent);
        }
        .edu-card-row {
          display: grid; grid-template-columns: 56px 1fr;
          gap: 0 22px; align-items: start;
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.55s ease, transform 0.55s cubic-bezier(0.34,1.2,0.64,1);
        }
        .edu-card-row.edu-visible { opacity: 1; transform: translateY(0); }
        .edu-pin-col { display: flex; justify-content: center; padding-top: 18px; }
        .edu-pin-icon {
          width: 54px; height: 54px; border-radius: 15px; border: 1px solid;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--syne); font-size: 1rem; font-weight: 800; flex-shrink: 0;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s;
        }
        .edu-pin-icon:hover { transform: scale(1.1) rotate(-4deg); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
        .edu-card-body {
          background: rgba(10,24,36,0.8); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px; padding: 24px 28px;
          position: relative; overflow: hidden; backdrop-filter: blur(10px);
          transition: border-color 0.25s, transform 0.25s;
        }
        .edu-card-body:hover { border-color: rgba(255,255,255,0.13); transform: translateX(5px); }
        .edu-card-body::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: var(--edu-line); border-radius: 20px 20px 0 0;
        }
        .edu-card-ghost { position: absolute; right: 20px; bottom: 6px; font-family: var(--syne); font-size: 5rem; font-weight: 900; color: rgba(255,255,255,0.025); line-height: 1; user-select: none; pointer-events: none; }
        .edu-card-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; margin-bottom: 10px; flex-wrap: wrap; }
        .edu-card-degree { font-family: var(--syne); font-size: 1rem; font-weight: 700; color: var(--text); line-height: 1.35; flex: 1; min-width: 180px; }
        .edu-card-year { font-family: var(--dm); font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; padding: 4px 14px; border-radius: 100px; white-space: nowrap; flex-shrink: 0; border: 1px solid; color: var(--edu-color); background: var(--edu-year-bg); border-color: var(--edu-year-border); }
        .edu-card-school { font-family: var(--dm); font-size: 0.82rem; color: var(--muted); margin-bottom: 14px; display: flex; align-items: center; gap: 7px; }
        .edu-card-school::before { content: ''; display: inline-block; width: 14px; height: 1px; background: var(--muted); opacity: 0.4; flex-shrink: 0; }
        .edu-tag-row { display: flex; flex-wrap: wrap; gap: 6px; }
        .edu-stats { display: flex; gap: 28px; flex-wrap: wrap; margin-top: 14px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.05); }
        .edu-stat-item { display: flex; flex-direction: column; gap: 2px; }
        .edu-stat-value { font-family: var(--syne); font-size: 1rem; font-weight: 700; }
        .edu-stat-label { font-family: var(--dm); font-size: 0.68rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; }
        .edu-footer { margin-top: 48px; display: flex; justify-content: center; position: relative; z-index: 1; }
        .edu-footer-track { display: flex; align-items: center; gap: 20px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 100px; padding: 10px 24px; flex-wrap: wrap; justify-content: center; }
        .edu-footer-item { display: flex; align-items: center; gap: 8px; font-family: var(--dm); font-size: 0.78rem; color: var(--muted); }
        .edu-footer-swatch { width: 26px; height: 3px; border-radius: 2px; flex-shrink: 0; }
        .edu-footer-sep { width: 1px; height: 16px; background: rgba(255,255,255,0.08); }

        @media (max-width: 576px) {
          .edu-grid::before { left: 21px; }
          .edu-card-row { grid-template-columns: 44px 1fr; gap: 0 14px; }
          .edu-pin-icon { width: 44px; height: 44px; border-radius: 12px; font-size: 0.88rem; }
          .edu-card-body { padding: 18px 16px; }
          .edu-card-degree { font-size: 0.92rem; }
          .edu-card-ghost { display: none; }
          .edu-card-header { flex-direction: column; gap: 8px; }
        }
      `}</style>

      <section id="education" className="edu-section panel">
        <div className="container" style={{ position: "relative", zIndex: 1 }}>

          <div className="text-center mb-5">
            <div className="edu-badge">
              <span className="edu-badge-dot" />
              Academic Background
            </div>
            <h2 className="section-heading mb-2">
              Education <span>Roadmap</span>
            </h2>
            <p style={{ fontFamily: "var(--dm)", color: "var(--muted)", fontSize: "0.9rem", maxWidth: 420, margin: "0 auto" }}>
              The journey so far — every milestone shaped the developer I am today.
            </p>
          </div>

          <div className="edu-grid">
            {eduEntries.map((e, i) => (
              <div
                className="edu-card-row"
                key={i}
                ref={el => eduRowRefs.current[i] = el}
              >
                <div className="edu-pin-col">
                  <div className="edu-pin-icon" style={{ color: e.color, background: e.pinBg, borderColor: e.pinBorder }}>
                    {e.num}
                  </div>
                </div>
                <div
                  className="edu-card-body"
                  style={{ "--edu-line": e.accentLine, "--edu-color": e.color, "--edu-year-bg": e.yearBg, "--edu-year-border": e.yearBorder }}
                >
                  <div className="edu-card-ghost">{e.num}</div>
                  <div className="edu-card-header">
                    <div className="edu-card-degree">{e.degree}</div>
                    <span className="edu-card-year">{e.years}</span>
                  </div>
                  <div className="edu-card-school">{e.school}</div>
                  <div className="edu-tag-row">
                    {e.tags.map(t => <span className="tech-pill" key={t}>{t}</span>)}
                  </div>
                  <div className="edu-stats">
                    {e.stats.map(s => (
                      <div className="edu-stat-item" key={s.label}>
                        <span className="edu-stat-value" style={{ color: e.color }}>{s.value}</span>
                        <span className="edu-stat-label">{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="edu-footer">
            <div className="edu-footer-track">
              {[
                { color: "#3dd598", label: "Higher secondary" },
                { color: "#7dd3fc", label: "Degree" },
              ].map((item, i, arr) => (
                <React.Fragment key={item.label}>
                  <span className="edu-footer-item">
                    <span className="edu-footer-swatch" style={{ background: item.color }} />
                    {item.label}
                  </span>
                  {i < arr.length - 1 && <span className="edu-footer-sep" />}
                </React.Fragment>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default Education;