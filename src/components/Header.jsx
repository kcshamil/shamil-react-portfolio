import { useState, useEffect } from "react";

const navLinks = ["About", "Skills", "Projects", "Contact"];

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
          --navy: #0b1622;
          --navy-glass: rgba(11, 22, 34, 0.88);
          --orange: #e8542a;
          --orange-dim: rgba(232, 84, 42, 0.15);
          --white: #f0ece6;
          --muted: rgba(240, 236, 230, 0.45);
          --border: rgba(240, 236, 230, 0.08);
        }
        body { background: var(--navy); font-family: 'DM Sans', sans-serif; min-height: 200vh; }
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          padding: 0 48px; height: 72px;
          display: flex; align-items: center; justify-content: space-between;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border-bottom: 1px solid transparent;
        }
        .navbar.scrolled {
          background: var(--navy-glass);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid var(--border);
          height: 64px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.3);
        }
        .logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; font-family: 'Syne', sans-serif;
          font-weight: 800; font-size: 22px; letter-spacing: -0.5px;
          color: var(--white); cursor: pointer; position: relative;
        }
        .logo-divider {
          width: 2px; height: 28px;
          background: linear-gradient(to bottom, transparent, var(--orange), transparent);
          margin-right: 4px;
        }
        .logo span { color: var(--orange); }
        .logo::after {
          content: ''; position: absolute; bottom: -4px; left: 0;
          width: 0; height: 1px; background: var(--orange);
          transition: width 0.3s ease;
        }
        .logo:hover::after { width: 100%; }
        .nav-links { display: flex; align-items: center; gap: 6px; list-style: none; }
        .nav-links li a {
          position: relative; font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 500; letter-spacing: 0.4px;
          color: var(--muted); text-decoration: none;
          padding: 8px 16px; border-radius: 8px;
          transition: color 0.25s ease, background 0.25s ease;
          display: block;
        }
        .nav-links li a::before {
          content: attr(data-text); position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          color: var(--orange); font-weight: 600;
          clip-path: inset(100% 0 0 0);
          transition: clip-path 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-links li a:hover { color: transparent; background: var(--orange-dim); }
        .nav-links li a:hover::before { clip-path: inset(0 0 0 0); }
        .nav-links li a.active { color: var(--orange); background: var(--orange-dim); }
        .nav-links li a.active::after {
          content: ''; position: absolute; bottom: 4px;
          left: 50%; transform: translateX(-50%);
          width: 4px; height: 4px; border-radius: 50%;
          background: var(--orange);
        }
        .nav-cta {
          font-family: 'Syne', sans-serif;
          font-size: 13px; font-weight: 600; letter-spacing: 0.5px;
          color: var(--white); background: var(--orange);
          border: none; cursor: pointer;
          padding: 9px 22px; border-radius: 8px;
          text-decoration: none; position: relative; overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          display: flex; align-items: center; gap: 8px;
          box-shadow: 0 4px 20px rgba(232, 84, 42, 0.35);
        }
        .nav-cta::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.2s;
        }
        .nav-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(232, 84, 42, 0.5); }
        .nav-cta:hover::before { opacity: 1; }
        .nav-cta:active { transform: translateY(0); }
        .hamburger {
          display: none; flex-direction: column; gap: 5px;
          cursor: pointer; background: none; border: none; padding: 4px;
        }
        .hamburger span {
          display: block; width: 24px; height: 2px;
          background: var(--white); border-radius: 2px;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        .mobile-menu {
          display: none; position: fixed; top: 64px; left: 0; right: 0;
          background: rgba(11, 22, 34, 0.97);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          padding: 16px 24px 24px;
          transform: translateY(-10px); opacity: 0; pointer-events: none;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .mobile-menu.open { transform: translateY(0); opacity: 1; pointer-events: all; }
        .mobile-menu ul { list-style: none; display: flex; flex-direction: column; gap: 4px; }
        .mobile-menu ul li a {
          display: block; padding: 12px 16px; border-radius: 8px;
          font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 600;
          color: var(--muted); text-decoration: none;
          transition: all 0.2s ease; border: 1px solid transparent;
        }
        .mobile-menu ul li a:hover, .mobile-menu ul li a.active {
          color: var(--orange); background: var(--orange-dim);
          border-color: rgba(232, 84, 42, 0.2);
        }
        .mobile-cta { margin-top: 16px; display: flex; justify-content: center; }
        @media (max-width: 768px) {
          .navbar { padding: 0 24px; }
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: flex; }
          .mobile-menu { display: block; }
        }
        .scroll-bar {
          position: fixed; top: 0; left: 0; height: 2px;
          background: linear-gradient(90deg, var(--orange), #ff8c5a);
          z-index: 1001; transition: width 0.1s linear;
          box-shadow: 0 0 8px rgba(232, 84, 42, 0.6);
        }
      `}</style>

            <ScrollBar />

            <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
                <a className="logo" href="#home">
                    <span className="logo-divider"></span>
                    Shamil K<span> C.</span>
                </a>

                <ul className="nav-links">
                    {navLinks.map((link) => (
                        <li key={link}>

                            <a href={`#${link.toLowerCase()}`}
                                data-text={link}
                                className={active === link ? "active" : ""}
                                onClick={() => setActive(link)}
                            >
                                {link}
                            </a>
                        </li>
                    ))}
                </ul>

                <a className="nav-cta" href="#contact">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    Hire Me
                </a>

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

            <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
                <ul>
                    {navLinks.map((link) => (
                        <li key={link}>

                            <a href={`#${link.toLowerCase()}`}
                                className={active === link ? "active" : ""}
                                onClick={() => { setActive(link); setMenuOpen(false); }}
                            >
                                {link}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="mobile-cta">
                    <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        Hire Me
                    </a>
                </div>
            </div>
        </>
    );
}