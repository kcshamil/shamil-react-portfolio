import React, { useEffect, useRef } from "react";
import project1 from "../assets/project1.png";
import project2 from "../assets/project2.png";
import { FaGithub } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    image: project1,
    num: "01",
    title: "PetZtore",
    tag: "Full Stack · MERN",
    description: "A full-stack MERN application that allows users to browse pets available for adoption and purchase pet-related products. Includes secure REST APIs, search and filtering, and a smooth admin approval flow.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    repo: "https://github.com/kcshamil/PetZtore-frontend.git",
    live: "",
  },
  {
    image: project2,
    num: "02",
    title: "Image Gallery",
    tag: "Frontend · React",
    description: "A responsive masonry image gallery built with React. Features modal previews, keyboard navigation, and smooth UI interactions focused on performance and clean browsing experience.",
    tech: ["React", "Masonry", "Modal", "Vercel"],
    repo: "https://github.com/kcshamil/ImageGallery.git",
    live: "https://image-gallery-sigma-ochre.vercel.app/",
  },
];

function Projects() {
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { y: 80, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 1, delay: i * 0.12, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 88%" } });
        const img = card.querySelector(".card-parallax-img");
        if (img) {
          gsap.to(img, { yPercent: -14, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } });
        }
      });
    });
    return () => ctx.revert();
  }, []);

  /* ── 3-D card tilt ── */
  useEffect(() => {
    cardRefs.current.forEach(card => {
      if (!card) return;
      const onMove = e => {
        const r = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -10;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 10;
        gsap.to(card, { rotateX: rx, rotateY: ry, transformPerspective: 800, duration: 0.4, ease: "power2.out" });
        const shine = card.querySelector(".card-shine");
        const sx = ((e.clientX - r.left) / r.width) * 100;
        const sy = ((e.clientY - r.top) / r.height) * 100;
        shine.style.background = `radial-gradient(circle at ${sx}% ${sy}%, rgba(255,107,74,0.08) 0%, transparent 65%)`;
      };
      const onLeave = () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "elastic.out(1,0.75)" });
        card.querySelector(".card-shine").style.background = "transparent";
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      card._cleanup = () => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      };
    });
    return () => cardRefs.current.forEach(c => c?._cleanup?.());
  }, []);

  return (
    <>
      <style>{`
        .projects-section { background: linear-gradient(135deg, var(--navy2) 0%, var(--navy3) 100%); padding: 100px 0; overflow: hidden; }
        .project-card { background: linear-gradient(150deg, #0d1f2e 0%, #112237 100%); border: 1px solid rgba(255,107,74,0.1); border-radius: 24px; overflow: hidden; transform-style: preserve-3d; will-change: transform; position: relative; transition: border-color 0.3s; height: 100%; }
        .project-card:hover { border-color: rgba(255,107,74,0.4); }
        .card-shine { position: absolute; inset: 0; border-radius: 24px; pointer-events: none; z-index: 3; }
        .card-num { font-family: var(--syne); font-size: 4.5rem; font-weight: 800; color: rgba(255,107,74,0.05); position: absolute; top: 10px; right: 18px; line-height: 1; pointer-events: none; user-select: none; }
        .card-img-wrap { overflow: hidden; border-radius: 16px; margin: 16px 16px 0; height: 210px; }
        .card-parallax-img { width: 100%; height: 130%; object-fit: cover; display: block; border-radius: 12px; }
        .card-tag { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); background: rgba(255,107,74,0.1); border: 1px solid rgba(255,107,74,0.2); padding: 4px 12px; border-radius: 100px; display: inline-block; }
        .card-title { font-family: var(--syne); font-size: 1.5rem; font-weight: 700; color: var(--text); letter-spacing: -0.02em; margin: 10px 0; }
        .card-desc { font-family: var(--dm); color: var(--muted); font-size: 0.88rem; line-height: 1.75; margin-bottom: 16px; }
        .card-divider { border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 16px 0; }
        .btn-repo { font-family: var(--dm); font-size: 0.82rem; font-weight: 500; color: #cbd5e1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 9px 20px; border-radius: 100px; display: inline-flex; align-items: center; gap: 7px; text-decoration: none; transition: background 0.22s, color 0.22s, transform 0.2s; }
        .btn-repo:hover { background: rgba(255,255,255,0.1); color: #fff; transform: translateY(-2px); }
        .btn-live { font-family: var(--dm); font-size: 0.82rem; font-weight: 600; color: #fff; background: var(--accent); border: none; padding: 9px 20px; border-radius: 100px; display: inline-flex; align-items: center; gap: 7px; text-decoration: none; transition: filter 0.22s, transform 0.2s; }
        .btn-live:hover { filter: brightness(1.15); transform: translateY(-2px); }
        .btn-live.disabled { opacity: 0.35; pointer-events: none; }
      `}</style>

      <section id="projects" className="projects-section panel">
        <div className="container">
          <h2 className="section-heading">My <span>Projects</span></h2>
          <div className="row justify-content-center g-4">
            {projects.map((p, i) => (
              <div className="col-lg-6" key={i}>
                <div
                  className="project-card"
                  ref={el => cardRefs.current[i] = el}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="card-shine" />
                  <span className="card-num">{p.num}</span>
                  <div className="card-img-wrap">
                    <img src={p.image} alt={p.title} className="card-parallax-img" />
                  </div>
                  <div className="p-4">
                    <span className="card-tag">{p.tag}</span>
                    <h3 className="card-title">{p.title}</h3>
                    <p className="card-desc">{p.description}</p>
                    <div className="mb-3">
                      {p.tech.map(t => <span className="tech-pill" key={t}>{t}</span>)}
                    </div>
                    <hr className="card-divider" />
                    <div className="d-flex gap-2 flex-wrap">
                      <a href={p.repo} className="btn-repo" target="_blank" rel="noreferrer">
                        <FaGithub size={13} /> Repository
                      </a>
                      <a
                        href={p.live || undefined}
                        className={`btn-live${!p.live ? " disabled" : ""}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Project <FiArrowUpRight size={14} />
                      </a>
                    </div>
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

export default Projects;