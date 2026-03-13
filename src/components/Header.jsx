import { useState, useEffect } from "react";

const navLinks = ["About", "Skills", "Projects", "Education", "Contact"];

function ScrollBar() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const percent = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setWidth(percent || 0);
    };
    window.addEventListener("scroll", update);
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <div className="scroll-bar" style={{ width: `${width}%` }} />;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("About");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --navy:        #07111b;
          --navy-glass:  rgba(7, 17, 27, 0.85);
          --accent:      #ff6b4a;
          --accent-dim:  rgba(255, 107, 74, 0.1);
          --accent-border: rgba(255, 107, 74, 0.25);
          --text:        #e2eaf4;
          --muted:       rgba(226, 234, 244, 0.45);
          --border:      rgba(255, 255, 255, 0.07);
          --syne:        'Syne', sans-serif;
          --dm:          'DM Sans', sans-serif;
        }

        /* ── SCROLL PROGRESS ── */
        .scroll-bar {
          position: fixed; top: 0; left: 0; height: 2px;
          background: linear-gradient(90deg, #ff6b4a, #ff8f73);
          z-index: 1001; transition: width 0.1s linear;
          box-shadow: 0 0 10px rgba(255, 107, 74, 0.5);
        }

        /* ── NAVBAR ── */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          padding: 0 48px; height: 70px;
          display: flex; align-items: center; justify-content: space-between;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .navbar.scrolled {
          background: var(--navy-glass);
          backdrop-filter: blur(24px) saturate(160%);
          -webkit-backdrop-filter: blur(24px) saturate(160%);
          border-bottom: 1px solid var(--border);
          height: 62px;
          box-shadow: 0 4px 32px rgba(0, 0, 0, 0.25);
        }

        /* ── LOGO ── */
        .logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; font-family: var(--syne);
          font-weight: 800; font-size: 22px; letter-spacing: -0.5px;
          color: var(--text); cursor: pointer; position: relative;
        }

        .logo-divider {
          width: 2px; height: 28px;
          background: linear-gradient(to bottom, transparent, var(--accent), transparent);
          margin-right: 4px;
          flex-shrink: 0;
        }

        .logo span { color: var(--accent); }

        .logo::after {
          content: ''; position: absolute; bottom: -4px; left: 0;
          width: 0; height: 1px; background: var(--accent);
          transition: width 0.3s ease;
        }
        .logo:hover::after { width: 100%; }

        /* ── NAV LINKS ── */
        .nav-links {
          display: flex; align-items: center; gap: 2px;
          list-style: none;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 5px;
        }

        .nav-links li a {
          position: relative; font-family: var(--dm);
          font-size: 13.5px; font-weight: 500; letter-spacing: 0.2px;
          color: var(--muted); text-decoration: none;
          padding: 7px 15px; border-radius: 8px;
          transition: color 0.2s, background 0.2s;
          display: block; white-space: nowrap;
        }

        .nav-links li a:hover {
          color: var(--text);
          background: rgba(255, 255, 255, 0.06);
        }

        .nav-links li a.active {
          color: var(--accent);
          background: var(--accent-dim);
        }

        .nav-links li a.active::after {
          content: '';
          position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%);
          width: 3px; height: 3px; border-radius: 50%;
          background: var(--accent);
        }

        /* ── CONTACT BUTTON ── */
        .nav-cta {
          font-family: var(--dm);
          font-size: 13.5px; font-weight: 500;
          color: var(--accent);
          background: var(--accent-dim);
          border: 1px solid var(--accent-border);
          cursor: pointer; padding: 8px 20px;
          border-radius: 10px; text-decoration: none;
          display: flex; align-items: center; gap: 7px;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
        }

        .nav-cta svg { transition: transform 0.25s; flex-shrink: 0; }

        .nav-cta:hover {
          background: rgba(255, 107, 74, 0.18);
          border-color: rgba(255, 107, 74, 0.4);
          color: var(--accent);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(255, 107, 74, 0.18);
        }

        .nav-cta:hover svg { transform: translateX(2px); }

        /* ── HAMBURGER ── */
        .hamburger {
          display: none; flex-direction: column; gap: 5px;
          cursor: pointer; background: none; border: none; padding: 6px;
          border-radius: 8px;
          transition: background 0.2s;
        }
        .hamburger:hover { background: rgba(255, 255, 255, 0.06); }

        .hamburger span {
          display: block; height: 1.5px; border-radius: 2px;
          background: var(--text);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hamburger span:nth-child(1) { width: 22px; }
        .hamburger span:nth-child(2) { width: 16px; }
        .hamburger span:nth-child(3) { width: 20px; }

        .hamburger.open span:nth-child(1) { width: 22px; transform: translateY(6.5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { width: 22px; transform: translateY(-6.5px) rotate(-45deg); }

        /* ── MOBILE MENU ── */
        .mobile-menu {
          display: none;
          position: fixed; top: 62px; left: 0; right: 0;
          background: rgba(7, 17, 27, 0.97);
          backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid var(--border);
          padding: 12px 20px 20px;
          transform: translateY(-8px); opacity: 0; pointer-events: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mobile-menu.open {
          transform: translateY(0); opacity: 1; pointer-events: all;
        }

        .mobile-menu ul {
          list-style: none; display: flex; flex-direction: column; gap: 3px;
        }

        .mobile-menu ul li a {
          display: flex; align-items: center; justify-content: space-between;
          padding: 11px 14px; border-radius: 10px;
          font-family: var(--syne); font-size: 15px; font-weight: 600;
          color: var(--muted); text-decoration: none;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }

        .mobile-menu ul li a:hover,
        .mobile-menu ul li a.active {
          color: var(--accent);
          background: var(--accent-dim);
          border-color: var(--accent-border);
        }

        .mobile-menu ul li a .link-arrow {
          font-size: 12px; opacity: 0;
          transition: opacity 0.2s, transform 0.2s;
        }

        .mobile-menu ul li a:hover .link-arrow,
        .mobile-menu ul li a.active .link-arrow {
          opacity: 1; transform: translateX(3px);
        }

        .mobile-divider {
          height: 1px;
          background: var(--border);
          margin: 12px 0;
        }

        .mobile-cta {
          display: flex; justify-content: stretch;
        }

        .mobile-cta .nav-cta {
          flex: 1; justify-content: center;
          padding: 12px 20px; border-radius: 10px; font-size: 14px;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .nav-links { display: none; }
        }

        @media (max-width: 768px) {
          .navbar { padding: 0 20px; }
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: flex; }
          .mobile-menu { display: block; }
        }

        @media (min-width: 769px) and (max-width: 900px) {
          .navbar { padding: 0 28px; }
          .nav-cta { display: flex; }
        }
      `}</style>

      <ScrollBar />

      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>

        {/* Logo */}
        <a className="logo" href="#home">
          <span className="logo-divider"></span>
          Shamil K<span> C.</span>
        </a>

        {/* Desktop Nav Links */}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                data-text={link}
                className={active === link ? "active" : ""}
                onClick={() => setActive(link)}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Contact CTA */}
        <a className="nav-cta" href="#contact" onClick={() => setActive("Contact")}>
          Contact
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <ul>
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className={active === link ? "active" : ""}
                onClick={() => { setActive(link); setMenuOpen(false); }}
              >
                {link}
                <span className="link-arrow">→</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mobile-divider" />

        <div className="mobile-cta">
          <a className="nav-cta" href="#contact" onClick={() => { setActive("Contact"); setMenuOpen(false); }}>
            Contact Me
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}