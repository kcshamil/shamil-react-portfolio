import React, { useEffect, useRef } from "react";
import { FaGithub, FaLinkedin, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  { icon: <MdEmail size={18} />, label: "Email", value: "shamilkc@gmail.com", href: "mailto:shamilkc@gmail.com" },
  { icon: <FaMapMarkerAlt size={16} />, label: "Location", value: "Kerala, India", href: null },
];

function Contact() {
  const sectionRef = useRef(null);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm("service_h4vu7vr", "template_ai3u565", form.current, "ihSGeOfLFg3Fycblb")
      .then(() => {
        toast.success("Message sent successfully!", { position: "top-right", autoClose: 3000, theme: "colored" });
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to send message!", { position: "top-right", autoClose: 3000, theme: "colored" });
      });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-left > *",
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.75, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%" } });
      gsap.fromTo(".contact-right",
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%" } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .contact-section {
          background: var(--navy);
          padding: 100px 0;
          position: relative;
          overflow: hidden;
        }

        /* background accents */
        .contact-orb { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(80px); }
        .contact-orb-1 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(255,107,74,0.12), transparent 70%); top: -80px; left: -80px; }
        .contact-orb-2 { width: 300px; height: 300px; background: radial-gradient(circle, rgba(74,144,255,0.08), transparent 70%); bottom: -60px; right: -60px; }
        .contact-ring { position: absolute; border-radius: 50%; border: 1px solid rgba(255,107,74,0.08); pointer-events: none; animation: spin-slow 30s linear infinite; }
        .contact-ring-1 { width: 520px; height: 520px; top: -140px; right: -160px; }
        .contact-ring-2 { width: 280px; height: 280px; bottom: -70px; left: -70px; border-style: dashed; animation-direction: reverse; opacity: 0.5; }

        /* layout */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 48px;
          align-items: start;
          position: relative;
          z-index: 1;
        }

        /* left column */
        .contact-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.68rem; font-weight: 600; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--accent);
          background: rgba(255,107,74,0.08); border: 1px solid rgba(255,107,74,0.2);
          padding: 5px 16px; border-radius: 100px;
          font-family: var(--dm); margin-bottom: 20px;
        }
        .contact-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent); animation: edu-blink 1.8s ease-in-out infinite;
        }
        @keyframes edu-blink { 0%,100%{opacity:1} 50%{opacity:0.25} }

        .contact-heading {
          font-family: var(--syne);
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 800; line-height: 1.15;
          color: var(--text); margin-bottom: 14px;
          letter-spacing: -0.03em;
        }
        .contact-heading span { color: var(--accent); }

        .contact-sub {
          font-family: var(--dm); font-size: 0.9rem;
          color: var(--muted); line-height: 1.75;
          margin-bottom: 36px; max-width: 360px;
        }

        /* info pills */
        .contact-info-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px; }
        .contact-info-item {
          display: flex; align-items: center; gap: 14px;
          padding: 13px 18px; border-radius: 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          transition: border-color 0.25s, transform 0.25s;
        }
        .contact-info-item:hover { border-color: rgba(255,107,74,0.3); transform: translateX(4px); }
        .contact-info-icon {
          width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
          background: rgba(255,107,74,0.1); border: 1px solid rgba(255,107,74,0.2);
          display: flex; align-items: center; justify-content: center;
          color: var(--accent);
        }
        .contact-info-label {
          font-family: var(--dm); font-size: 0.68rem;
          font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--muted);
        }
        .contact-info-value {
          font-family: var(--dm); font-size: 0.88rem;
          font-weight: 500; color: var(--text); margin-top: 1px;
        }

        /* social row */
        .contact-social { display: flex; gap: 10px; }
        .contact-social-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 9px 18px; border-radius: 100px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          color: var(--muted); font-family: var(--dm);
          font-size: 0.8rem; font-weight: 500;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
        }
        .contact-social-btn:hover {
          background: rgba(255,107,74,0.1);
          border-color: rgba(255,107,74,0.3);
          color: var(--accent); transform: translateY(-2px);
        }

        /* right column — form card */
        .contact-card {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 24px; padding: 36px 32px;
          position: relative; overflow: hidden;
          box-shadow: 0 8px 40px rgba(0,0,0,0.3);
        }
        .contact-card::before {
          content: ''; position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,107,74,0.5), transparent);
        }
        .contact-card-title {
          font-family: var(--syne); font-size: 1.1rem;
          font-weight: 700; color: var(--text);
          margin-bottom: 24px; padding-bottom: 18px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex; align-items: center; gap: 10px;
        }
        .contact-card-title-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 8px rgba(255,107,74,0.6);
        }

        .contact-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .contact-form-group { margin-bottom: 14px; }
        .contact-form-group label {
          display: block; font-family: var(--dm);
          font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(226,234,244,0.4); margin-bottom: 8px;
        }
        .contact-input {
          width: 100%; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 12px; padding: 11px 15px;
          font-family: var(--dm); font-size: 0.9rem;
          color: var(--text); outline: none;
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
        }
        .contact-input::placeholder { color: rgba(226,234,244,0.18); }
        .contact-input:focus {
          border-color: rgba(255,107,74,0.45);
          background: rgba(255,107,74,0.05);
          box-shadow: 0 0 0 3px rgba(255,107,74,0.08);
        }
        textarea.contact-input { resize: vertical; min-height: 120px; }

        .contact-submit {
          width: 100%; margin-top: 6px; padding: 13px 24px;
          background: linear-gradient(135deg, var(--accent), #ff8f73);
          color: #fff; border: none; border-radius: 12px;
          font-family: var(--syne); font-size: 0.88rem;
          font-weight: 700; letter-spacing: 0.04em;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; gap: 9px;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(255,107,74,0.3);
        }
        .contact-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(255,107,74,0.45);
        }

        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr; gap: 40px; }
          .contact-sub { max-width: 100%; }
        }
        @media (max-width: 576px) {
          .contact-form-row { grid-template-columns: 1fr; }
          .contact-card { padding: 24px 18px; }
          .contact-social { flex-wrap: wrap; }
        }
      `}</style>

      <section id="contact" className="contact-section panel" ref={sectionRef}>
        <div className="contact-orb contact-orb-1" />
        <div className="contact-orb contact-orb-2" />
        <div className="contact-ring contact-ring-1" />
        <div className="contact-ring contact-ring-2" />

        <div className="container">
          <h2 className="section-heading">Get In <span>Touch</span></h2>

          <div className="contact-grid">

            {/* ── Left: info ── */}
            <div className="contact-left">
              <div className="contact-badge">
                <span className="contact-badge-dot" /> Available for work
              </div>
              <h3 className="contact-heading">
                Let's Build Something <span>Together</span>
              </h3>
              <p className="contact-sub">
                I'm currently open to freelance projects and full-time opportunities.
                If you have a project in mind or just want to connect, feel free to reach out.
              </p>

              <div className="contact-info-list">
                {contactInfo.map((item) => (
                  <div className="contact-info-item" key={item.label}>
                    <div className="contact-info-icon">{item.icon}</div>
                    <div>
                      <div className="contact-info-label">{item.label}</div>
                      {item.href
                        ? <a href={item.href} className="contact-info-value" style={{ textDecoration: "none", color: "var(--text)" }}>{item.value}</a>
                        : <div className="contact-info-value">{item.value}</div>
                      }
                    </div>
                  </div>
                ))}
              </div>

              <div className="contact-social">
                <a href="https://github.com/kcshamil" target="_blank" rel="noreferrer" className="contact-social-btn">
                  <FaGithub size={14} /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/shamil-k-c" target="_blank" rel="noreferrer" className="contact-social-btn">
                  <FaLinkedin size={14} /> LinkedIn
                </a>
              </div>
            </div>

            {/* ── Right: form ── */}
            <div className="contact-right">
              <form ref={form} onSubmit={sendEmail} className="contact-card">
                <div className="contact-card-title">
                  <span className="contact-card-title-dot" />
                  Send a Message
                </div>
                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" className="contact-input" placeholder="Your name" required />
                  </div>
                  <div className="contact-form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" className="contact-input" placeholder="your@email.com" required />
                  </div>
                </div>
                <div className="contact-form-group">
                  <label>Subject</label>
                  <input type="text" name="subject" className="contact-input" placeholder="What's this about?" />
                </div>
                <div className="contact-form-group">
                  <label>Message</label>
                  <textarea className="contact-input" name="message" placeholder="Tell me about your project or idea…" required />
                </div>
                <button type="submit" className="contact-submit">
                  Send Message <FiSend size={14} />
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover draggable theme="colored" />
    </>
  );
}

export default Contact;