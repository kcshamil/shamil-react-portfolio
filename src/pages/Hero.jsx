import React, { useEffect, useRef } from "react";
import profile from "../assets/profile.png";
import SHAMIL_K_C from "../assets/SHAMIL_K_C.pdf";
import { FaDownload, FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const techStack = ["HTML5", "CSS3", "JavaScript", "Node.js", "React", "Git", "GitHub", "MongoDB", "Express"];

function Hero() {
  const heroRef = useRef(null);
  const orbRef = useRef(null);
  const heroImgRef = useRef(null);
  const tickerRef = useRef(null);

  /* ── Hero entrance ── */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.fromTo(".hero-greeting", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
      .fromTo(".hero-name-line", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5")
      .fromTo(".hero-title", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.55")
      .fromTo(".hero-cta", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.45")
      .fromTo(heroImgRef.current, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.1, ease: "back.out(1.4)" }, "-=0.9");
  }, []);

  /* ── Mouse parallax on hero orb ── */
  useEffect(() => {
    const section = heroRef.current;
    const orb = orbRef.current;
    const onMove = (e) => {
      const { innerWidth: W, innerHeight: H } = window;
      const dx = (e.clientX / W - 0.5) * 60;
      const dy = (e.clientY / H - 0.5) * 40;
      gsap.to(orb, { x: dx, y: dy, duration: 1.2, ease: "power2.out" });
      gsap.to(".hero-img-wrap", { x: dx * 0.15, y: dy * 0.1, duration: 1.4, ease: "power2.out" });
    };
    section.addEventListener("mousemove", onMove);
    return () => section.removeEventListener("mousemove", onMove);
  }, []);

  /* ── Ticker marquee ── */
  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;
    gsap.to(ticker, { xPercent: -50, ease: "none", duration: 18, repeat: -1 });
  }, []);

  return (
    <>
      <style>{`

        *, *::before, *::after { box-sizing: border-box; }

        :root {
          --navy:   #07111b;
          --navy2:  #0c1d2b;
          --navy3:  #0e2232;
          --accent: #ff6b4a;
          --accent2:#ff8f73;
          --text:   #e2eaf4;
          --muted:  #7a9ab5;
          --syne:   'Syne', sans-serif;
          --dm:     'DM Sans', sans-serif;
        }

        body { background: var(--navy); color: var(--text); }

        @keyframes spin-slow { to { transform: rotate(360deg); } }

        .section-heading {
          font-family: var(--syne);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800; color: var(--text);
          letter-spacing: -0.03em; text-align: center; margin-bottom: 60px;
        }
        .section-heading span { color: var(--accent); }

        .tech-pill {
          font-size: 0.7rem; font-weight: 500;
          color: #7dd3fc; background: rgba(125,211,252,0.08);
          border: 1px solid rgba(125,211,252,0.18);
          padding: 3px 10px; border-radius: 100px;
          display: inline-block; margin: 3px; font-family: var(--dm);
        }

        /* ── HERO ── */
        .hero-section {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--navy2) 0%, var(--navy) 100%);
          display: flex; align-items: center;
          position: relative; overflow: hidden;
        }
        .hero-bg-orb {
          position: absolute; width: 680px; height: 680px; border-radius: 50%;
          background: radial-gradient(circle, rgba(255,107,74,0.13) 0%, transparent 70%);
          top: 50%; right: -140px; transform: translateY(-50%);
          pointer-events: none; z-index: 0; filter: blur(40px);
        }
        .hero-grid-lines {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,107,74,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,74,0.04) 1px, transparent 1px);
          background-size: 60px 60px; z-index: 0;
          mask-image: radial-gradient(ellipse at center, transparent 30%, black 100%);
        }
        .hero-content { position: relative; z-index: 1; }
        .hero-greeting { font-family: var(--dm); font-size: 1.1rem; font-weight: 400; color: var(--muted); letter-spacing: 0.04em; }
        .hero-greeting .dot-accent { color: var(--accent); font-size: 1.4rem; }
        .hero-name-line { display: flex; align-items: center; gap: 14px; margin: 10px 0; }
        .hero-line-bar { width: 48px; height: 2px; background: var(--accent); border-radius: 2px; flex-shrink: 0; }
        .hero-name-text { font-family: var(--syne); font-size: 1.25rem; font-weight: 600; color: var(--text); }
        .hero-name-text span { color: var(--accent);font-size:2rem }
        .hero-title {
          font-family: var(--syne); font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 800; color: var(--text); line-height: 1.1;
          letter-spacing: -0.03em; margin-bottom: 32px;
        }
        .hero-title em { color: var(--accent); font-style: normal; }
        .btn-resume {
          font-family: var(--dm); font-size: 0.85rem; font-weight: 500;
          color: #fff; background: var(--accent); border: 2px solid var(--accent);
          padding: 11px 26px; border-radius: 100px;
          display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
          transition: background 0.25s, color 0.25s, transform 0.2s;
        }
        .btn-resume:hover { background: transparent; color: var(--accent); transform: translateY(-2px); }
        .icon-box {
          width: 44px; height: 44px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.06); color: white; font-size: 18px;
          border: 1px solid rgba(255,255,255,0.1);
          transition: background 0.25s, transform 0.2s; text-decoration: none;
        }
        .icon-box:hover { background: var(--accent); transform: translateY(-3px); color: white; }
        .hero-img-wrap { position: relative; display: inline-flex; justify-content: center; align-items: center; will-change: transform; }
        .hero-ring { position: absolute; border-radius: 50%; border: 2px solid rgba(255,107,74,0.25); }
        .hero-ring.r1 { width: 340px; height: 340px; animation: spin-slow 18s linear infinite; }
        .hero-ring.r2 { width: 420px; height: 420px; border-style: dashed; animation: spin-slow 28s linear infinite reverse; opacity: 0.4; }
        .profile-img { width: 270px; border-radius: 50%; border: 6px solid var(--accent); position: relative; z-index: 2; box-shadow: 0 0 60px rgba(255,107,74,0.25); }

        /* ── TICKER ── */
        .ticker-section { background: var(--accent); overflow: hidden; padding: 14px 0; position: relative; z-index: 2; }
        .ticker-track-outer { overflow: hidden; }
        .ticker-track { display: flex; width: max-content; will-change: transform; }
        .ticker-item { font-family: var(--syne); font-size: 0.85rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #fff; padding: 0 32px; display: flex; align-items: center; gap: 14px; white-space: nowrap; }
        .ticker-sep { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,0.5); flex-shrink: 0; }

        @media (max-width: 768px) {
          .hero-section { text-align: center; padding-top: 80px; }
          .hero-name-line { justify-content: center; }
          .hero-cta { justify-content: center; }
          .hero-ring.r1 { width: 260px; height: 260px; }
          .hero-ring.r2 { width: 320px; height: 320px; }
          .profile-img { width: 200px; }
        }
      `}</style>

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section id="hero" className="hero-section" ref={heroRef}>
        <div className="hero-bg-orb" ref={orbRef} />
        <div className="hero-grid-lines" />
        <div className="container hero-content">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="hero-greeting mb-0">Hello<span className="dot-accent">.</span></p>
              <div className="hero-name-line">
                <div className="hero-line-bar" />
                <span className="hero-name-text">I'm <span>Shamil</span></span>
              </div>
              <h1 className="hero-title">Full Stack<br /><em>Developer</em></h1>
              <div className="d-flex align-items-center gap-4 flex-wrap justify-content-center justify-content-md-start hero-cta">
                <a href={SHAMIL_K_C} target="_blank" download rel="noreferrer" className="btn-resume">
                  Resume <FaDownload size={13} />
                </a>
                <div className="d-flex gap-3">
                  <a href="https://github.com/kcshamil" target="_blank" rel="noreferrer" className="icon-box"><FaGithub /></a>
                  <a href="https://www.linkedin.com/in/shamil-k-c" target="_blank" rel="noreferrer" className="icon-box"><FaLinkedin /></a>
                  <a href="mailto:shamilkc@gmail.com?subject=Project Inquiry&body=Hello Shamil," className="icon-box"><MdEmail /></a>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex justify-content-center mt-5 mt-md-0" ref={heroImgRef}>
              <div className="hero-img-wrap">
                <div className="hero-ring r1" />
                <div className="hero-ring r2" />
                <img src={profile} alt="Shamil" className="profile-img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TICKER ───────────────────────────────────────── */}
      <div className="ticker-section">
        <div className="ticker-track-outer">
          <div className="ticker-track" ref={tickerRef}>
            {[...techStack, ...techStack].map((t, i) => (
              <span className="ticker-item" key={i}>{t} <span className="ticker-sep" /></span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;