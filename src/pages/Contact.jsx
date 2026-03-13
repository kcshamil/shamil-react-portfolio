import React, { useEffect, useRef } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

gsap.registerPlugin(ScrollTrigger);

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
      gsap.fromTo(".contact-inner > *",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 82%" } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .contact-section { background: var(--navy); padding: 100px 0; position: relative; overflow: hidden; }
        .contact-orb { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(80px); opacity: 0.18; animation: contact-float 8s ease-in-out infinite alternate; }
        .contact-orb-1 { width: 420px; height: 420px; background: radial-gradient(circle, #ff6b4a, transparent 70%); top: -80px; left: -100px; animation-duration: 9s; }
        .contact-orb-2 { width: 320px; height: 320px; background: radial-gradient(circle, #4a90ff, transparent 70%); bottom: -60px; right: -60px; animation-duration: 11s; animation-delay: -3s; }
        .contact-orb-3 { width: 200px; height: 200px; background: radial-gradient(circle, #ff6b4a, transparent 70%); bottom: 30%; left: 60%; opacity: 0.1; animation-duration: 13s; animation-delay: -6s; }
        @keyframes contact-float { 0%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-25px) scale(1.08)} 100%{transform:translate(-15px,20px) scale(0.95)} }
        .contact-ring { position: absolute; border-radius: 50%; border: 1px solid rgba(255,107,74,0.12); pointer-events: none; animation: spin-slow 20s linear infinite; }
        .contact-ring-1 { width: 500px; height: 500px; top: -120px; right: -160px; animation-duration: 22s; }
        .contact-ring-2 { width: 300px; height: 300px; bottom: -80px; left: -80px; border-style: dashed; animation-direction: reverse; animation-duration: 30s; opacity: 0.5; }
        .contact-badge { display: inline-block; font-size: 11px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: var(--accent); background: rgba(255,107,74,0.1); border: 1px solid rgba(255,107,74,0.25); padding: 6px 18px; border-radius: 100px; margin-bottom: 20px; font-family: var(--dm); }
        .contact-heading { font-family: var(--syne); font-size: clamp(2rem,5vw,3.2rem); font-weight: 800; line-height: 1.15; color: var(--text); margin-bottom: 16px; letter-spacing: -0.03em; }
        .contact-heading span { color: var(--accent); }
        .contact-sub { font-family: var(--dm); font-size: 0.95rem; color: var(--muted); line-height: 1.7; max-width: 460px; margin: 0 auto 42px; }
        .contact-card { background: rgba(255,255,255,0.04); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.10); border-radius: 24px; padding: 40px 36px; position: relative; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08); }
        .contact-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,107,74,0.6), transparent); }
        .contact-card::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,107,74,0.04) 0%, transparent 50%, rgba(74,144,255,0.03) 100%); pointer-events: none; border-radius: 24px; }
        .contact-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .contact-form-group { margin-bottom: 16px; text-align: left; }
        .contact-form-group label { display: block; font-family: var(--dm); font-size: 11px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; color: rgba(226,234,244,0.45); margin-bottom: 8px; }
        .contact-input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.10); border-radius: 12px; padding: 12px 16px; font-family: var(--dm); font-size: 14px; color: var(--text); outline: none; transition: border-color 0.25s, box-shadow 0.25s, background 0.25s; backdrop-filter: blur(8px); }
        .contact-input::placeholder { color: rgba(226,234,244,0.2); }
        .contact-input:focus { border-color: rgba(255,107,74,0.5); background: rgba(255,107,74,0.06); box-shadow: 0 0 0 3px rgba(255,107,74,0.10), 0 0 20px rgba(255,107,74,0.06); }
        textarea.contact-input { resize: vertical; min-height: 130px; }
        .contact-submit { width: 100%; margin-top: 8px; padding: 14px 24px; background: linear-gradient(135deg, var(--accent), #ff8f73); color: #fff; border: none; border-radius: 12px; font-family: var(--syne); font-size: 14px; font-weight: 700; letter-spacing: 0.5px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: transform 0.2s, box-shadow 0.2s, filter 0.2s; box-shadow: 0 4px 22px rgba(255,107,74,0.35); position: relative; overflow: hidden; }
        .contact-submit::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent); opacity: 0; transition: opacity 0.25s; }
        .contact-submit:hover::before { opacity: 1; }
        .contact-submit:hover { transform: translateY(-2px); box-shadow: 0 10px 36px rgba(255,107,74,0.5); }
        .contact-divider { width: 100%; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent); margin: 40px 0; }
        .contact-links { display: flex; justify-content: center; gap: 14px; flex-wrap: wrap; }
        .contact-link-item { display: flex; align-items: center; gap: 9px; padding: 11px 20px; border-radius: 12px; background: rgba(255,255,255,0.04); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.09); color: var(--muted); font-family: var(--dm); font-size: 13px; font-weight: 500; text-decoration: none; transition: all 0.25s cubic-bezier(0.16,1,0.3,1); }
        .contact-link-item:hover { background: rgba(255,107,74,0.10); border-color: rgba(255,107,74,0.30); color: var(--accent); transform: translateY(-3px); box-shadow: 0 6px 20px rgba(255,107,74,0.12); }

        @media (max-width: 768px) {
          .contact-form-row { grid-template-columns: 1fr; }
          .contact-card { padding: 28px 20px; }
        }
      `}</style>

      <section id="contact" className="contact-section panel" ref={sectionRef}>
        <div className="contact-orb contact-orb-1" />
        <div className="contact-orb contact-orb-2" />
        <div className="contact-orb contact-orb-3" />
        <div className="contact-ring contact-ring-1" />
        <div className="contact-ring contact-ring-2" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="contact-inner text-center" style={{ maxWidth: 680, margin: "0 auto" }}>
            <div className="contact-badge">Get In Touch</div>
            <h2 className="contact-heading">Let's Work <span>Together</span></h2>
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

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover draggable theme="colored" />
    </>
  );
}

export default Contact;