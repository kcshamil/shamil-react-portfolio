import React, { useEffect } from "react";
import profile from "../assets/profile.png";
import { FaCode, FaLaptopCode, FaLightbulb } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function About() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-img-wrap",
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".about-img-wrap", start: "top 82%" } });
      gsap.fromTo(".about-text-col > *",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ".about-text-col", start: "top 82%" } });
      gsap.utils.toArray(".section-heading").forEach(h => {
        gsap.fromTo(h,
          { y: 50, opacity: 0, skewY: 2 },
          { y: 0, opacity: 1, skewY: 0, duration: 0.9, ease: "power4.out", scrollTrigger: { trigger: h, start: "top 85%" } });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .about-section { background: linear-gradient(135deg, var(--navy2) 0%, var(--navy3) 100%); padding: 100px 0; overflow: hidden; }
        .about-img-wrap { display: inline-flex; position: relative; justify-content: center; }
        .about-img-ring { position: absolute; inset: -14px; border-radius: 50%; border: 3px solid var(--accent); opacity: 0.6; }
        .about-img { width: 260px; height: 260px; object-fit: cover; border-radius: 50%; position: relative; z-index: 1; }
        .about-name { color: var(--accent); }
        .about-text { font-family: var(--dm); color: var(--muted); line-height: 1.8; font-size: 0.95rem; }
        .skill-card {
          display: flex; align-items: center; gap: 14px;
          padding: 13px 20px; margin-bottom: 12px;
          border-radius: 14px; border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          font-family: var(--dm); font-size: 0.9rem; color: var(--text);
          transition: border-color 0.25s, transform 0.25s, background 0.25s;
        }
        .skill-card:hover { border-color: var(--accent); background: rgba(255,107,74,0.06); transform: translateX(6px); }
        .skill-icon { color: var(--accent); font-size: 1.1rem; }
      `}</style>

      <section id="about" className="about-section panel">
        <div className="container">
          <h2 className="section-heading">About <span>Me</span></h2>
          <div className="row align-items-center">
            <div className="col-md-5 text-center mb-5 mb-md-0">
              <div className="about-img-wrap">
                <div className="about-img-ring" />
                <img src={profile} alt="profile" className="about-img" />
              </div>
            </div>
            <div className="col-md-7 about-text-col">
              <h3 className="mb-3" style={{ fontFamily: "var(--syne)", fontWeight: 700, color: "var(--text)" }}>
                I'm <span className="about-name">Shamil K C</span>
              </h3>
              <p className="about-text">
                I am a passionate <strong style={{ color: "var(--text)" }}>Full Stack Developer</strong> with a BCA background.
                I build modern and responsive web applications using the MERN stack — React.js, Node.js, Express.js and MongoDB.
              </p>
              <p className="about-text">
                I enjoy solving real-world problems, crafting user-friendly interfaces, and continuously
                learning new technologies to sharpen my development craft.
              </p>
              <div className="mt-4">
                <div className="skill-card"><FaCode className="skill-icon" /> Web Application Development</div>
                <div className="skill-card"><FaLaptopCode className="skill-icon" /> Responsive Web Development</div>
                <div className="skill-card"><FaLightbulb className="skill-icon" /> Problem Solving</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;