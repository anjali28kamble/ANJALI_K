import React from 'react';
import { personalInfo } from '../data';

export default function Footer() {
  return (
    <footer style={{
      padding: '2.5rem',
      borderTop: '1px solid rgba(34,211,238,0.1)',
      textAlign: 'center',
    }}>
      <div style={{
        fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.5rem',
        marginBottom: '0.5rem',
      }}>
        <span className="gradient-text">AK</span>
        <span style={{ color: 'var(--cyan-400)' }}>.</span>
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
        Full Stack Developer · Pune, India
      </p>
      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
        {[
          { href: personalInfo.github, label: 'GitHub' },
          { href: personalInfo.linkedin, label: 'LinkedIn' },
          { href: `mailto:${personalInfo.email}`, label: 'Email' },
        ].map(s => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = 'var(--cyan-400)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
          >
            {s.label}
          </a>
        ))}
      </div>
      <p style={{ color: 'var(--navy-700)', fontSize: '0.78rem' }}>
        © {new Date().getFullYear()} Anjali Ravindra Kamble · Built with React + Vite + MongoDB
      </p>
    </footer>
  );
}
