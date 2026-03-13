import React from 'react'
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <style>{`
        .footer-wrapper {
          background: #07111b;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding: 24px 32px;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .footer-wrapper::before {
          content: '';
          position: absolute;
          bottom: -60px; left: 50%; transform: translateX(-50%);
          width: 300px; height: 120px;
          background: radial-gradient(ellipse, rgba(255, 107, 74, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .footer-inner {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .footer-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 18px;
          letter-spacing: -0.3px;
          color: #e2eaf4;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .footer-logo span { color: #ff6b4a; }

        .footer-center {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: rgba(226, 234, 244, 0.35);
          letter-spacing: 0.2px;
        }

        .footer-center .heart {
          color: #ff6b4a;
          font-size: 11px;
          animation: ft-pulse 1.8s ease-in-out infinite;
        }

        .footer-center strong {
          color: rgba(226, 234, 244, 0.6);
          font-weight: 500;
        }

        @keyframes ft-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.35); }
        }

        .footer-socials {
          display: flex;
          gap: 8px;
        }

        .footer-socials a {
          width: 34px; height: 34px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(226, 234, 244, 0.45);
          font-size: 14px;
          text-decoration: none;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .footer-socials a:hover {
          background: rgba(255, 107, 74, 0.1);
          border-color: rgba(255, 107, 74, 0.3);
          color: #ff6b4a;
          transform: translateY(-2px);
        }

        @media (max-width: 600px) {
          .footer-inner {
            flex-direction: column;
            align-items: center;
            gap: 14px;
            text-align: center;
          }
          .footer-wrapper { padding: 20px 24px; }
        }
      `}</style>

      <footer className="footer-wrapper">
        <div className="footer-inner">

          <a className="footer-logo" href="#home">
            Shamil K<span> C.</span>
          </a>

          <div className="footer-center">
            <span>© {currentYear} Designed & built with</span>
            <span className="heart">♥</span>
            <span>by <strong>Shamil K C</strong></span>
          </div>

          <div className="footer-socials">
            <a href="mailto:shamilkc@gmail.com" aria-label="Email"><FaEnvelope /></a>
            <a href="https://github.com/kcshamil" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/shamil-k-c" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>

        </div>
      </footer>
    </>
  )
}

export default Footer