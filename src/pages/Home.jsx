import React, { useEffect, useRef, useState, useCallback } from "react";
import profile from "../assets/profile.png";
import SHAMIL_K_C from "../assets/SHAMIL_K_C.pdf";
import project1 from "../assets/project1.png";
import project2 from "../assets/project2.png";
import { FaDownload, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaCode, FaLaptopCode, FaLightbulb } from "react-icons/fa";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { FiArrowUpRight, FiSend, FiX, FiMessageCircle } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

gsap.registerPlugin(ScrollTrigger);

const techStack = ["HTML5", "CSS3", "JavaScript", "Node.js", "React", "Git", "GitHub", "MongoDB", "Express"];

const skills = [
  { icon: <FaHtml5 />, name: "HTML5", color: "#e34c26", level: 6 },
  { icon: <FaCss3Alt />, name: "CSS3", color: "#264de4", level: 5 },
  { icon: <FaJs />, name: "JavaScript", color: "#f0db4f", level: 6 },
  { icon: <FaReact />, name: "React", color: "#61DBFB", level: 4 },
  { icon: <FaNodeJs />, name: "Node.js", color: "#3c873a", level: 5 },
  { icon: <SiMongodb />, name: "MongoDB", color: "#4DB33D", level: 4 },
  { icon: <FaGitAlt />, name: "Git", color: "#f34f29", level: 5 },
  { icon: <FaGithub />, name: "GitHub", color: "#ffffff", level: 6 },
];

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

/* ── Chatbot keyword replies ── */
const BOT_REPLIES = [
  { keywords: ["hello", "hi", "hey"],                    reply: "Hey there! 👋 How can I help you today?" },
  { keywords: ["skill", "tech", "stack"],                 reply: "I work with the MERN stack — MongoDB, Express, React & Node.js. Also HTML5, CSS3, JavaScript, Git and GitHub!" },
  { keywords: ["project", "work", "built"],               reply: "I've built PetZtore (full-stack MERN pet adoption app) and an Image Gallery with React. Check the Projects section!" },
  { keywords: ["contact", "email", "reach", "message"],  reply: "You can reach me at shamilkc@gmail.com or use the contact form on this page!" },
  { keywords: ["github"],                                 reply: "My GitHub → github.com/kcshamil. Feel free to explore my repositories!" },
  { keywords: ["linkedin"],                               reply: "Find me on LinkedIn → linkedin.com/in/shamil-k-c 🔗" },
  { keywords: ["resume", "cv", "download"],               reply: "Download my resume using the Resume button at the top of the page!" },
  { keywords: ["hire", "available", "job", "freelance"], reply: "I'm currently open to freelance projects and full-time opportunities. Let's connect!" },
  { keywords: ["experience", "background", "bca"],       reply: "I'm a BCA graduate and a passionate Full Stack Developer with hands-on MERN stack experience." },
  { keywords: ["about", "who", "yourself"],              reply: "I'm Shamil KC — a Full Stack Developer who loves building responsive, user-friendly web apps using the MERN stack." },
];

function Home() {
  const heroRef     = useRef(null);
  const orbRef      = useRef(null);
  const heroTextRef = useRef(null);
  const heroImgRef  = useRef(null);
  const tickerRef   = useRef(null);
  const aboutRef    = useRef(null);
  const skillsRef   = useRef(null);
  const projectsRef = useRef(null);
  const contactRef  = useRef(null);
  const cardRefs    = useRef([]);
  const dotRowRefs  = useRef([]);
  const form        = useRef();

  /* ── Chatbot state ── */
  const [chatOpen,  setChatOpen]  = useState(false);
  const [messages,  setMessages]  = useState([
    { from: "bot", text: "Hello! I'm Shamil KC. Welcome to my portfolio. Feel free to explore my work 😊" },
  ]);
  const [inputVal,  setInputVal]  = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const chatBottomRef = useRef(null);

  /* auto-scroll */
  useEffect(() => {
    if (chatOpen) chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatOpen, botTyping]);

  const getBotReply = useCallback((text) => {
    const lower = text.toLowerCase();
    for (const { keywords, reply } of BOT_REPLIES) {
      if (keywords.some(k => lower.includes(k))) return reply;
    }
    return "That's interesting! For more details feel free to explore my portfolio or use the contact form 😊";
  }, []);

  const sendMessage = useCallback(() => {
    const trimmed = inputVal.trim();
    if (!trimmed) return;
    setMessages(prev => [...prev, { from: "user", text: trimmed }]);
    setInputVal("");
    setBotTyping(true);
    setTimeout(() => {
      setBotTyping(false);
      setMessages(prev => [...prev, { from: "bot", text: getBotReply(trimmed) }]);
    }, 900);
  }, [inputVal, getBotReply]);

  const handleQuickReply = useCallback((q) => {
    setMessages(prev => [...prev, { from: "user", text: q }]);
    setBotTyping(true);
    setTimeout(() => {
      setBotTyping(false);
      setMessages(prev => [...prev, { from: "bot", text: getBotReply(q) }]);
    }, 900);
  }, [getBotReply]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  /* ── EmailJS ── */
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      "service_h4vu7vr",
      "template_ai3u565",
      form.current,
      "ihSGeOfLFg3Fycblb"
    )
      .then(() => {
        toast.success(" Message sent successfully!", {
          position: "top-right", autoClose: 3000, theme: "colored",
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to send message!", {
          position: "top-right", autoClose: 3000, theme: "colored",
        });
      });
  };

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

  /* ── ScrollTrigger reveals ── */
  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(".about-img-wrap",
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".about-img-wrap", start: "top 82%" } });

      gsap.fromTo(".about-text-col > *",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ".about-text-col", start: "top 82%" } });

      gsap.fromTo(".skill-row-item",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.09, ease: "power3.out",
          scrollTrigger: { trigger: skillsRef.current, start: "top 80%" } });

      dotRowRefs.current.forEach((row) => {
        if (!row) return;
        const dots = row.querySelectorAll(".dot.active");
        gsap.fromTo(dots,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, stagger: 0.08, ease: "back.out(2)",
            scrollTrigger: { trigger: row, start: "top 85%" } });
      });

      gsap.utils.toArray(".section-heading").forEach(h => {
        gsap.fromTo(h,
          { y: 50, opacity: 0, skewY: 2 },
          { y: 0, opacity: 1, skewY: 0, duration: 0.9, ease: "power4.out",
            scrollTrigger: { trigger: h, start: "top 85%" } });
      });

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { y: 80, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 1, delay: i * 0.12, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" } });

        const img = card.querySelector(".card-parallax-img");
        if (img) {
          gsap.to(img, {
            yPercent: -14, ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
          });
        }
      });

      gsap.fromTo(".contact-inner > *",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: contactRef.current, start: "top 82%" } });

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
      card._cleanup = () => { card.removeEventListener("mousemove", onMove); card.removeEventListener("mouseleave", onLeave); };
    });
    return () => cardRefs.current.forEach(c => c?._cleanup?.());
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        :root {
          --navy:  #07111b;
          --navy2: #0c1d2b;
          --navy3: #0e2232;
          --accent:#ff6b4a;
          --accent2:#ff8f73;
          --text:  #e2eaf4;
          --muted: #7a9ab5;
          --syne:  'Syne', sans-serif;
          --dm:    'DM Sans', sans-serif;
        }

        body { background: var(--navy); color: var(--text); }

        /* ── HERO ── */
        .hero-section {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--navy2) 0%, var(--navy) 100%);
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .hero-bg-orb {
          position: absolute;
          width: 680px; height: 680px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,107,74,0.13) 0%, transparent 70%);
          top: 50%; right: -140px;
          transform: translateY(-50%);
          pointer-events: none;
          z-index: 0;
          filter: blur(40px);
        }

        .hero-grid-lines {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,107,74,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,74,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          z-index: 0;
          mask-image: radial-gradient(ellipse at center, transparent 30%, black 100%);
        }

        .hero-content { position: relative; z-index: 1; }

        .hero-greeting {
          font-family: var(--dm);
          font-size: 1.1rem;
          font-weight: 400;
          color: var(--muted);
          letter-spacing: 0.04em;
        }

        .hero-greeting .dot-accent { color: var(--accent); font-size: 1.4rem; }

        .hero-name-line {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 10px 0;
        }

        .hero-line-bar {
          width: 48px; height: 2px;
          background: var(--accent);
          border-radius: 2px;
          flex-shrink: 0;
        }

        .hero-name-text {
          font-family: var(--syne);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text);
        }

        .hero-name-text span { color: var(--accent); }

        .hero-title {
          font-family: var(--syne);
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 800;
          color: var(--text);
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 32px;
        }

        .hero-title em { color: var(--accent); font-style: normal; }

        .btn-resume {
          font-family: var(--dm);
          font-size: 0.85rem;
          font-weight: 500;
          color: #fff;
          background: var(--accent);
          border: 2px solid var(--accent);
          padding: 11px 26px;
          border-radius: 100px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          transition: background 0.25s, color 0.25s, transform 0.2s;
        }

        .btn-resume:hover { background: transparent; color: var(--accent); transform: translateY(-2px); }

        .icon-box {
          width: 44px; height: 44px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.06);
          color: white; font-size: 18px;
          border: 1px solid rgba(255,255,255,0.1);
          transition: background 0.25s, transform 0.2s;
          text-decoration: none;
        }

        .icon-box:hover { background: var(--accent); transform: translateY(-3px); color: white; }

        .hero-img-wrap {
          position: relative;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          will-change: transform;
        }

        .hero-ring {
          position: absolute;
          border-radius: 50%;
          border: 2px solid rgba(255,107,74,0.25);
        }

        .hero-ring.r1 { width: 340px; height: 340px; animation: spin-slow 18s linear infinite; }
        .hero-ring.r2 { width: 420px; height: 420px; border-style: dashed; animation: spin-slow 28s linear infinite reverse; opacity: 0.4; }

        @keyframes spin-slow { to { transform: rotate(360deg); } }

        .profile-img {
          width: 270px;
          border-radius: 50%;
          border: 6px solid var(--accent);
          position: relative;
          z-index: 2;
          box-shadow: 0 0 60px rgba(255,107,74,0.25);
        }

        /* ── TICKER ── */
        .ticker-section {
          background: var(--accent);
          overflow: hidden;
          padding: 14px 0;
          position: relative;
          z-index: 2;
        }

        .ticker-track-outer { overflow: hidden; }

        .ticker-track {
          display: flex;
          gap: 0;
          width: max-content;
          will-change: transform;
        }

        .ticker-item {
          font-family: var(--syne);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #fff;
          padding: 0 32px;
          display: flex;
          align-items: center;
          gap: 14px;
          white-space: nowrap;
        }

        .ticker-sep { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,0.5); flex-shrink: 0; }

        /* ── ABOUT ── */
        .about-section {
          background: linear-gradient(135deg, var(--navy2) 0%, var(--navy3) 100%);
          padding: 100px 0;
          overflow: hidden;
        }

        .section-heading {
          font-family: var(--syne);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: var(--text);
          letter-spacing: -0.03em;
          text-align: center;
          margin-bottom: 60px;
        }

        .section-heading span { color: var(--accent); }

        .about-img-wrap {
          display: inline-flex;
          position: relative;
          justify-content: center;
        }

        .about-img-ring {
          position: absolute;
          inset: -14px;
          border-radius: 50%;
          border: 3px solid var(--accent);
          opacity: 0.6;
        }

        .about-img {
          width: 260px; height: 260px;
          object-fit: cover;
          border-radius: 50%;
          position: relative;
          z-index: 1;
        }

        .about-name { color: var(--accent); }

        .about-text {
          font-family: var(--dm);
          color: var(--muted);
          line-height: 1.8;
          font-size: 0.95rem;
        }

        .skill-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 13px 20px;
          margin-bottom: 12px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          font-family: var(--dm);
          font-size: 0.9rem;
          color: var(--text);
          transition: border-color 0.25s, transform 0.25s, background 0.25s;
        }

        .skill-card:hover {
          border-color: var(--accent);
          background: rgba(255,107,74,0.06);
          transform: translateX(6px);
        }

        .skill-icon { color: var(--accent); font-size: 1.1rem; }

        /* ── SKILLS ── */
        .skills-section {
          background: var(--navy);
          padding: 100px 0;
        }

        .skill-row-item {
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 18px 24px;
          transition: border-color 0.25s, transform 0.25s;
        }

        .skill-row-item:hover {
          border-color: rgba(255,107,74,0.35);
          transform: translateY(-3px);
        }

        .skill-icon-wrap { font-size: 1.6rem; flex-shrink: 0; }

        .skill-name {
          font-family: var(--syne);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text);
          letter-spacing: 0.04em;
          min-width: 90px;
        }

        .dot-track { display: flex; gap: 7px; flex-wrap: nowrap; }

        .dot {
          width: 11px; height: 11px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.15);
          flex-shrink: 0;
        }

        .dot.active {
          background: var(--accent);
          border-color: var(--accent);
          box-shadow: 0 0 6px rgba(255,107,74,0.5);
        }

        /* ── PROJECTS ── */
        .projects-section {
          background: linear-gradient(135deg, var(--navy2) 0%, var(--navy3) 100%);
          padding: 100px 0;
          overflow: hidden;
        }

        .project-card {
          background: linear-gradient(150deg, #0d1f2e 0%, #112237 100%);
          border: 1px solid rgba(255,107,74,0.1);
          border-radius: 24px;
          overflow: hidden;
          transform-style: preserve-3d;
          will-change: transform;
          position: relative;
          transition: border-color 0.3s;
          height: 100%;
        }

        .project-card:hover { border-color: rgba(255,107,74,0.4); }

        .card-shine {
          position: absolute; inset: 0;
          border-radius: 24px;
          pointer-events: none;
          z-index: 3;
        }

        .card-num {
          font-family: var(--syne);
          font-size: 4.5rem;
          font-weight: 800;
          color: rgba(255,107,74,0.05);
          position: absolute;
          top: 10px; right: 18px;
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }

        .card-img-wrap {
          overflow: hidden;
          border-radius: 16px;
          margin: 16px 16px 0;
          height: 210px;
        }

        .card-parallax-img {
          width: 100%; height: 130%;
          object-fit: cover;
          display: block;
          border-radius: 12px;
        }

        .card-tag {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          background: rgba(255,107,74,0.1);
          border: 1px solid rgba(255,107,74,0.2);
          padding: 4px 12px;
          border-radius: 100px;
          display: inline-block;
        }

        .card-title {
          font-family: var(--syne);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.02em;
          margin: 10px 0 10px;
        }

        .card-desc {
          font-family: var(--dm);
          color: var(--muted);
          font-size: 0.88rem;
          line-height: 1.75;
          margin-bottom: 16px;
        }

        .tech-pill {
          font-size: 0.7rem;
          font-weight: 500;
          color: #7dd3fc;
          background: rgba(125,211,252,0.08);
          border: 1px solid rgba(125,211,252,0.18);
          padding: 3px 10px;
          border-radius: 100px;
          display: inline-block;
          margin: 3px;
          font-family: var(--dm);
        }

        .card-divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin: 16px 0;
        }

        .btn-repo {
          font-family: var(--dm);
          font-size: 0.82rem;
          font-weight: 500;
          color: #cbd5e1;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 9px 20px;
          border-radius: 100px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          text-decoration: none;
          transition: background 0.22s, color 0.22s, transform 0.2s;
        }

        .btn-repo:hover { background: rgba(255,255,255,0.1); color: #fff; transform: translateY(-2px); }

        .btn-live {
          font-family: var(--dm);
          font-size: 0.82rem;
          font-weight: 600;
          color: #fff;
          background: var(--accent);
          border: none;
          padding: 9px 20px;
          border-radius: 100px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          text-decoration: none;
          transition: filter 0.22s, transform 0.2s;
        }

        .btn-live:hover { filter: brightness(1.15); transform: translateY(-2px); }
        .btn-live.disabled { opacity: 0.35; pointer-events: none; }

        /* ── CONTACT ── */
        .contact-section {
          background: var(--navy);
          padding: 100px 0;
        }

        .contact-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--accent);
          background: rgba(255,107,74,0.1);
          border: 1px solid rgba(255,107,74,0.25);
          padding: 6px 18px;
          border-radius: 100px;
          margin-bottom: 20px;
          font-family: var(--dm);
        }

        .contact-heading {
          font-family: var(--syne);
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 800;
          line-height: 1.15;
          color: var(--text);
          margin-bottom: 16px;
          letter-spacing: -0.03em;
        }

        .contact-heading span { color: var(--accent); }

        .contact-sub {
          font-family: var(--dm);
          font-size: 0.95rem;
          color: var(--muted);
          line-height: 1.7;
          max-width: 460px;
          margin: 0 auto 42px;
        }

        .contact-card {
          background: linear-gradient(135deg, #0c2133, #1b3850);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 24px;
          padding: 40px 36px;
          position: relative;
          overflow: hidden;
        }

        .contact-card::before {
          content:'';
          position:absolute; top:0; left:0; right:0; height:1px;
          background: linear-gradient(90deg, transparent, rgba(255,107,74,0.5), transparent);
        }

        .contact-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .contact-form-group { margin-bottom: 16px; text-align: left; }

        .contact-form-group label {
          display: block;
          font-family: var(--dm);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: rgba(226,234,244,0.4);
          margin-bottom: 8px;
        }

        .contact-input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 12px;
          padding: 12px 16px;
          font-family: var(--dm);
          font-size: 14px;
          color: var(--text);
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
        }

        .contact-input::placeholder { color: rgba(226,234,244,0.2); }

        .contact-input:focus {
          border-color: rgba(255,107,74,0.45);
          background: rgba(255,107,74,0.04);
          box-shadow: 0 0 0 3px rgba(255,107,74,0.08);
        }

        textarea.contact-input { resize: vertical; min-height: 120px; }

        .contact-submit {
          width: 100%;
          margin-top: 8px;
          padding: 14px 24px;
          background: var(--accent);
          color: #fff;
          border: none;
          border-radius: 12px;
          font-family: var(--syne);
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
          box-shadow: 0 4px 22px rgba(255,107,74,0.3);
        }

        .contact-submit:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(255,107,74,0.45); filter: brightness(1.1); }

        .contact-divider {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
          margin: 40px 0;
        }

        .contact-links { display: flex; justify-content: center; gap: 14px; flex-wrap: wrap; }

        .contact-link-item {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 11px 20px;
          border-radius: 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          color: var(--muted);
          font-family: var(--dm);
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .contact-link-item:hover {
          background: rgba(255,107,74,0.08);
          border-color: rgba(255,107,74,0.28);
          color: var(--accent);
          transform: translateY(-3px);
        }

        /* ══════════════════════════════
           CHATBOT STYLES
        ══════════════════════════════ */

        /* slide-up open animation */
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        .chat-window {
          animation: chatSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* pulse ring on toggle button */
        @keyframes pulseRing {
          0%   { transform: scale(1);    opacity: 0.55; }
          100% { transform: scale(1.6);  opacity: 0;    }
        }
        .chat-bubble-btn::before {
          content: '';
          position: absolute; inset: -5px;
          border-radius: 50%;
          background: var(--accent);
          animation: pulseRing 2s ease-out infinite;
          z-index: -1;
        }

        /* custom scrollbar inside chat */
        .chat-messages::-webkit-scrollbar { width: 4px; }
        .chat-messages::-webkit-scrollbar-track { background: transparent; }
        .chat-messages::-webkit-scrollbar-thumb { background: rgba(255,107,74,0.3); border-radius: 4px; }

        /* animated typing dots */
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0);   opacity: 0.4; }
          30%            { transform: translateY(-5px); opacity: 1;   }
        }
        .typing-dot:nth-child(1) { animation: typingBounce 1.2s ease infinite 0s;   }
        .typing-dot:nth-child(2) { animation: typingBounce 1.2s ease infinite 0.2s; }
        .typing-dot:nth-child(3) { animation: typingBounce 1.2s ease infinite 0.4s; }

        @media (max-width: 768px) {
          .hero-section { text-align: center; padding-top: 80px; }
          .hero-name-line { justify-content: center; }
          .hero-cta { justify-content: center; }
          .contact-form-row { grid-template-columns: 1fr; }
          .contact-card { padding: 28px 20px; }
          .hero-ring.r1 { width: 260px; height: 260px; }
          .hero-ring.r2 { width: 320px; height: 320px; }
          .profile-img { width: 200px; }
          /* chatbot smaller on mobile */
          .chat-window { width: calc(100vw - 32px) !important; right: 0 !important; }
        }
      `}</style>

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-bg-orb" ref={orbRef} />
        <div className="hero-grid-lines" />
        <div className="container hero-content">
          <div className="row align-items-center">

            <div className="col-md-6 text-center text-md-start">
              <p className="hero-greeting mb-0">
                Hello<span className="dot-accent">.</span>
              </p>

              <div className="hero-name-line hero-name-line">
                <div className="hero-line-bar" />
                <span className="hero-name-text">I'm <span>Shamil KC</span></span>
              </div>

              <h1 className="hero-title hero-title">
                Full Stack<br /><em>Developer</em>
              </h1>

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
              <span className="ticker-item" key={i}>
                {t} <span className="ticker-sep" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── ABOUT ────────────────────────────────────────── */}
      <section id="about" className="about-section" ref={aboutRef}>
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

      {/* ─── SKILLS ───────────────────────────────────────── */}
      <section id="skills" className="skills-section" ref={skillsRef}>
        <div className="container">
          <h2 className="section-heading">Tech <span>Skills</span></h2>
          <div className="row justify-content-center gy-4">
            {skills.map((s, i) => {
              const total = 8;
              return (
                <div className="col-md-5" key={s.name}>
                  <div
                    className="skill-row-item"
                    ref={el => dotRowRefs.current[i] = el}
                  >
                    <span className="skill-icon-wrap" style={{ color: s.color }}>{s.icon}</span>
                    <span className="skill-name">{s.name}</span>
                    <div className="dot-track ms-auto">
                      {Array.from({ length: total }).map((_, d) => (
                        <div key={d} className={`dot${d < s.level ? " active" : ""}`} />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── PROJECTS ─────────────────────────────────────── */}
      <section id="projects" className="projects-section" ref={projectsRef}>
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

      {/* ─── CONTACT ──────────────────────────────────────── */}
      <section id="contact" className="contact-section" ref={contactRef}>
        <div className="container">
          <div className="contact-inner text-center" style={{ maxWidth: 680, margin: "0 auto" }}>

            <div className="contact-badge">Get In Touch</div>

            <h2 className="contact-heading">
              Let's Work <span>Together</span>
            </h2>

            <p className="contact-sub">
              Have a project in mind or just want to say hello? I'd love to hear from you.
              Send me a message and I'll get back to you soon.
            </p>

            <form ref={form} onSubmit={sendEmail} className="contact-card">
              <div className="contact-form-row">
                <div className="contact-form-group">
                  <label>Your Name</label>
                  <input type="text" name="name" className="contact-input" placeholder="John Doe" />
                </div>
                <div className="contact-form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" className="contact-input" placeholder="john@example.com" />
                </div>
              </div>

              <div className="contact-form-group">
                <label>Subject</label>
                <input type="text" name="subject" className="contact-input" placeholder="Project Inquiry" />
              </div>

              <div className="contact-form-group">
                <label>Message</label>
                <textarea className="contact-input" name="message" placeholder="Tell me about your project…" />
              </div>

              <button type="submit" className="contact-submit">
                Send Message <FiSend size={14} />
              </button>
            </form>

            <div className="contact-divider" />

            <div className="contact-links">
              <a href="mailto:shamilkc@gmail.com" className="contact-link-item"><MdEmail /> shamilkc@gmail.com</a>
              <a href="https://github.com/kcshamil" target="_blank" rel="noreferrer" className="contact-link-item"><FaGithub /> github.com/kcshamil</a>
              <a href="https://www.linkedin.com/in/shamil-k-c" target="_blank" rel="noreferrer" className="contact-link-item"><FaLinkedin /> linkedin.com/in/shamil-k-c</a>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FLOATING CHATBOT
      ══════════════════════════════════════════════════════ */}
      <div style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 12,
      }}>

        {/* ── Chat Window ── */}
        {chatOpen && (
          <div
            className="chat-window"
            style={{
              width: 340,
              height: 500,
              display: "flex",
              flexDirection: "column",
              borderRadius: 24,
              overflow: "hidden",
              background: "#0d1f2e",
              border: "1px solid rgba(255,107,74,0.22)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,107,74,0.06)",
            }}
          >
            {/* Header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "14px 18px",
              background: "linear-gradient(135deg,#0c2133,#112338)",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              flexShrink: 0,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {/* avatar + green dot */}
                <div style={{ position: "relative" }}>
                  <img
                    src={profile} alt="Shamil"
                    style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--accent)" }}
                  />
                  <span style={{
                    position: "absolute", bottom: 0, right: 0,
                    width: 10, height: 10, borderRadius: "50%",
                    background: "#4ade80", border: "2px solid #0c2133",
                  }} />
                </div>
                <div>
                  <p style={{ fontFamily: "var(--syne)", fontSize: 13, fontWeight: 700, color: "var(--text)", margin: 0, lineHeight: 1 }}>
                    Chat with Me
                  </p>
                  <p style={{ fontFamily: "var(--dm)", fontSize: 11, color: "#4ade80", margin: "3px 0 0" }}>
                    ● Online
                  </p>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => setChatOpen(false)}
                style={{
                  width: 30, height: 30, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(255,255,255,0.07)",
                  border: "none", cursor: "pointer",
                  color: "var(--muted)",
                  transition: "background 0.2s, color 0.2s, transform 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,107,74,0.18)"; e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.transform = "rotate(90deg)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.transform = "rotate(0deg)"; }}
              >
                <FiX size={14} />
              </button>
            </div>

            {/* Messages */}
            <div
              className="chat-messages"
              style={{
                flex: 1, overflowY: "auto",
                padding: "14px 14px 8px",
                display: "flex", flexDirection: "column", gap: 10,
              }}
            >
              {messages.map((msg, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: msg.from === "user" ? "flex-end" : "flex-start", alignItems: "flex-end", gap: 7 }}>
                  {/* Bot avatar */}
                  {msg.from === "bot" && (
                    <img
                      src={profile} alt=""
                      style={{ width: 24, height: 24, borderRadius: "50%", objectFit: "cover", border: "1.5px solid var(--accent)", flexShrink: 0, marginBottom: 2 }}
                    />
                  )}
                  <div style={{
                    maxWidth: "75%",
                    padding: "9px 13px",
                    borderRadius: msg.from === "bot" ? "18px 18px 18px 4px" : "18px 18px 4px 18px",
                    background: msg.from === "bot" ? "rgba(255,255,255,0.07)" : "var(--accent)",
                    color: "var(--text)",
                    fontFamily: "var(--dm)",
                    fontSize: 13,
                    lineHeight: 1.55,
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing dots */}
              {botTyping && (
                <div style={{ display: "flex", alignItems: "flex-end", gap: 7 }}>
                  <img src={profile} alt="" style={{ width: 24, height: 24, borderRadius: "50%", objectFit: "cover", border: "1.5px solid var(--accent)", flexShrink: 0 }} />
                  <div style={{
                    padding: "10px 14px", borderRadius: "18px 18px 18px 4px",
                    background: "rgba(255,255,255,0.07)",
                    display: "flex", gap: 5, alignItems: "center",
                  }}>
                    <span className="typing-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--muted)", display: "inline-block" }} />
                    <span className="typing-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--muted)", display: "inline-block" }} />
                    <span className="typing-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--muted)", display: "inline-block" }} />
                  </div>
                </div>
              )}

              {/* Quick reply chips — only shown on first message */}
              {messages.length === 1 && !botTyping && (
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
                  {["My tech skills", "View my projects", "How to hire me?", "Contact info"].map(q => (
                    <button
                      key={q}
                      onClick={() => handleQuickReply(q)}
                      style={{
                        fontFamily: "var(--dm)", fontSize: 12, textAlign: "left",
                        padding: "8px 13px", borderRadius: 12,
                        background: "rgba(255,107,74,0.09)",
                        color: "var(--accent)",
                        border: "1px solid rgba(255,107,74,0.22)",
                        cursor: "pointer",
                        transition: "background 0.18s, transform 0.18s",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,107,74,0.18)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,107,74,0.09)"; e.currentTarget.style.transform = "translateY(0)"; }}
                    >
                      {q} →
                    </button>
                  ))}
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Input bar */}
            <div style={{
              padding: "10px 12px",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.02)",
              display: "flex", gap: 8, alignItems: "center",
              flexShrink: 0,
            }}>
              <input
                type="text"
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  padding: "9px 14px",
                  fontFamily: "var(--dm)",
                  fontSize: 13,
                  color: "var(--text)",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={e => e.target.style.borderColor = "rgba(255,107,74,0.45)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
              />
              <button
                onClick={sendMessage}
                disabled={!inputVal.trim()}
                style={{
                  width: 38, height: 38, borderRadius: 11,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: inputVal.trim() ? "var(--accent)" : "rgba(255,107,74,0.3)",
                  border: "none", cursor: inputVal.trim() ? "pointer" : "default",
                  color: "#fff",
                  transition: "background 0.2s, transform 0.15s",
                  flexShrink: 0,
                }}
                onMouseEnter={e => { if (inputVal.trim()) e.currentTarget.style.transform = "scale(1.08)"; }}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                <FiSend size={14} />
              </button>
            </div>
          </div>
        )}

        {/* ── Toggle Bubble ── */}
        <button
          className="chat-bubble-btn"
          onClick={() => setChatOpen(o => !o)}
          style={{
            position: "relative",
            width: 54, height: 54,
            borderRadius: "50%",
            background: "var(--accent)",
            border: "none",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff",
            boxShadow: "0 6px 28px rgba(255,107,74,0.5)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 10px 36px rgba(255,107,74,0.65)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(255,107,74,0.5)"; }}
          aria-label="Toggle chat"
        >
          {chatOpen ? <FiX size={22} /> : <FiMessageCircle size={22} />}
        </button>

      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}

export default Home;