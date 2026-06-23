import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';

const navLinks = [
  { label: 'Home', to: 'home' },
  { label: 'About', to: 'about' },
  { label: 'Skills', to: 'skills' },
  { label: 'Experience', to: 'experience' },
  { label: 'Projects', to: 'projects' },
  { label: 'Certifications', to: 'certifications' },
  { label: 'Contact', to: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '0.85rem 2rem',
      background: scrolled
        ? 'rgba(2,8,24,0.92)'
        : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(34,211,238,0.1)' : 'none',
      transition: 'all 0.4s ease',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      {/* Logo */}
      <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.4rem' }}>
        <span className="gradient-text">AK</span>
        <span style={{ color: 'var(--cyan-400)', marginLeft: 2 }}>.</span>
      </div>

      {/* Desktop links */}
      <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}
           className="nav-desktop">
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            spy smooth duration={600}
            offset={-70}
            onSetActive={() => setActive(link.to)}
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: '0.88rem',
              fontWeight: 500,
              color: active === link.to ? 'var(--cyan-400)' : 'var(--text-secondary)',
              background: active === link.to ? 'rgba(34,211,238,0.08)' : 'transparent',
              transition: 'all 0.25s',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={e => { if (active !== link.to) e.target.style.color = 'var(--white)'; }}
            onMouseLeave={e => { if (active !== link.to) e.target.style.color = 'var(--text-secondary)'; }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="nav-hamburger"
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'none', flexDirection: 'column', gap: 5, padding: 4,
        }}
        aria-label="Toggle menu"
      >
        {[0,1,2].map(i => (
          <span key={i} style={{
            display: 'block', width: 24, height: 2,
            background: menuOpen ? 'var(--cyan-400)' : 'var(--text-secondary)',
            borderRadius: 2,
            transition: 'all 0.3s',
            transform: menuOpen
              ? i === 0 ? 'rotate(45deg) translate(5px,5px)'
              : i === 2 ? 'rotate(-45deg) translate(5px,-5px)'
              : 'scaleX(0)'
              : 'none',
          }} />
        ))}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 60, left: 0, right: 0,
          background: 'rgba(2,8,24,0.97)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(34,211,238,0.15)',
          padding: '1.5rem 2rem',
          display: 'flex', flexDirection: 'column', gap: '0.75rem',
        }}>
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              spy smooth duration={600}
              offset={-70}
              onClick={() => setMenuOpen(false)}
              style={{
                color: active === link.to ? 'var(--cyan-400)' : 'var(--text-secondary)',
                fontSize: '1rem', fontWeight: 500, cursor: 'pointer',
                padding: '0.5rem 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
