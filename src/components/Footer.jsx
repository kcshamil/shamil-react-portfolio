import React from 'react'
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --navy: #0b1622;
          --orange: #e8542a;
          --orange-dim: rgba(232, 84, 42, 0.12);
          --orange-border: rgba(232, 84, 42, 0.25);
          --white: #f0ece6;
          --muted: rgba(240, 236, 230, 0.45);
          --border: rgba(240, 236, 230, 0.08);
        }

        .footer-wrapper {
          background: var(--navy);
          border-top: 1px solid var(--border);
          padding: 48px 48px 32px;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .footer-wrapper::before {
          content: '';
          position: absolute;
          bottom: -80px; left: 50%; transform: translateX(-50%);
          width: 400px; height: 200px;
          background: radial-gradient(ellipse, rgba(232, 84, 42, 0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .footer-inner {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
        }

        .footer-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 28px;
          letter-spacing: -0.5px;
          color: var(--white);
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }

        .footer-logo-divider {
          width: 2px; height: 32px;
          background: linear-gradient(to bottom, transparent, var(--orange), transparent);
        }

        .footer-logo span { color: var(--orange); }

        .footer-tagline {
          font-size: 13px;
          color: var(--muted);
          letter-spacing: 2px;
          text-transform: uppercase;
          font-weight: 400;
          margin-top: -16px;
        }

        .footer-divider {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent, var(--border), var(--orange-border), var(--border), transparent);
        }

        .footer-nav {
          display: flex;
          gap: 32px;
          list-style: none;
          padding: 0; margin: 0;
        }

        .footer-nav li a {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: var(--muted);
          text-decoration: none;
          letter-spacing: 0.5px;
          transition: color 0.2s ease;
          position: relative;
        }

        .footer-nav li a::after {
          content: '';
          position: absolute; bottom: -2px; left: 0;
          width: 0; height: 1px;
          background: var(--orange);
          transition: width 0.25s ease;
        }

        .footer-nav li a:hover { color: var(--orange); }
        .footer-nav li a:hover::after { width: 100%; }

        .footer-socials {
          display: flex;
          gap: 12px;
        }

        .footer-socials a {
          width: 42px; height: 42px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: rgba(240, 236, 230, 0.05);
          border: 1px solid var(--border);
          color: var(--muted);
          font-size: 16px;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .footer-socials a:hover {
          background: var(--orange-dim);
          border-color: var(--orange-border);
          color: var(--orange);
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(232, 84, 42, 0.2);
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 12px;
          color: var(--muted);
          letter-spacing: 0.3px;
        }

        .footer-bottom .heart {
          color: var(--orange);
          font-size: 13px;
          animation: pulse 1.8s ease-in-out infinite;
        }

        .footer-bottom strong {
          color: var(--white);
          font-weight: 500;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.8; }
        }

        @media (max-width: 600px) {
          .footer-wrapper { padding: 40px 24px 28px; }
          .footer-nav { gap: 20px; flex-wrap: wrap; justify-content: center; }
          .footer-logo { font-size: 24px; }
        }
      `}</style>

      <footer className="footer-wrapper">
        <div className="footer-inner">

          {/* Logo */}
          <a className="footer-logo" href="#home">
            <span className="footer-logo-divider"></span>
            Shamil K<span> C.</span>
          </a>

          <p className="footer-tagline">Full Stack Developer</p>

          <div className="footer-divider"></div>

          {/* Nav Links */}
          <ul className="footer-nav">
            {["About", "Skills", "Projects", "Contact"].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`}>{item}</a>
              </li>
            ))}
          </ul>

          {/* Social Icons */}
          <div className="footer-socials">
            <a href="mailto:your@email.com" aria-label="Email">
              <FaEnvelope />
            </a>
            <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>

          <div className="footer-divider"></div>

          {/* Bottom */}
          <div className="footer-bottom">
            <span>© {currentYear} Designed & Developed with</span>
            <span className="heart">♥</span>
            <span>by <strong>Shamil K C</strong>. All rights reserved.</span>
          </div>

        </div>
      </footer>
    </>
  )
}

export default Footer