import React, { useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-scroll';
import { personalInfo } from '../data';

function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animFrame;
    const particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.3,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.6 + 0.2,
        color: Math.random() > 0.5 ? '34,211,238' : '167,139,250',
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.opacity})`;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });

      // Lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34,211,238,${0.1 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animFrame = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
    }} />
  );
}

export default function Hero() {
  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '6rem 2rem 4rem',
    }}>
      <ParticleField />

      {/* Background gradient orbs */}
      <div style={{
        position: 'absolute', top: '15%', left: '8%',
        width: 350, height: 350, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)',
        animation: 'float 7s ease-in-out infinite', zIndex: 0,
        filter: 'blur(40px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', right: '10%',
        width: 280, height: 280, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)',
        animation: 'float 9s ease-in-out infinite reverse', zIndex: 0,
        filter: 'blur(40px)',
      }} />
      <div style={{
        position: 'absolute', top: '55%', left: '50%',
        width: 200, height: 200, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)',
        animation: 'float 11s ease-in-out infinite', zIndex: 0,
        filter: 'blur(30px)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 1,
        textAlign: 'center', maxWidth: 780,
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
          padding: '0.4rem 1.2rem',
          background: 'rgba(34,211,238,0.08)',
          border: '1px solid rgba(34,211,238,0.25)',
          borderRadius: 50, marginBottom: '1.8rem',
          fontSize: '0.85rem', color: 'var(--cyan-300)',
          fontWeight: 500, letterSpacing: '0.05em',
          animation: 'fadeInUp 0.6s ease forwards',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--cyan-400)', animation: 'pulse-glow 2s infinite', display: 'inline-block' }} />
          Available for Opportunities
        </div>

        <h1 style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 'clamp(2.8rem, 7vw, 5rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          marginBottom: '1.2rem',
          animation: 'fadeInUp 0.7s ease 0.1s both',
        }}>
          Hi, I'm{' '}
          <span className="gradient-text">Anjali</span>
        </h1>

        <div style={{
          fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
          fontFamily: 'Syne, sans-serif',
          fontWeight: 600,
          color: 'var(--text-secondary)',
          marginBottom: '1.5rem',
          minHeight: '2.5rem',
          animation: 'fadeInUp 0.7s ease 0.2s both',
        }}>
          <TypeAnimation
            sequence={[
              'Full Stack Developer 🚀',
              2000,
              'React.js Enthusiast ⚛️',
              2000,
              'FastAPI Developer ⚡',
              2000,
              'NLP & ML Explorer 🤖',
              2000,
              'Problem Solver 💡',
              2000,
            ]}
            wrapper="span"
            speed={50}
            style={{ color: 'var(--cyan-400)' }}
            repeat={Infinity}
          />
        </div>

        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.75,
          maxWidth: 600,
          margin: '0 auto 2.5rem',
          animation: 'fadeInUp 0.7s ease 0.3s both',
        }}>
          {personalInfo.summary}
        </p>

        <div style={{
          display: 'flex', gap: '1rem', justifyContent: 'center',
          flexWrap: 'wrap',
          animation: 'fadeInUp 0.7s ease 0.4s both',
        }}>
          <Link to="contact" smooth duration={600} offset={-70}>
            <button className="btn-primary">
              Get In Touch ✉️
            </button>
          </Link>
          <a
            href="/resume.pdf"
            download="Anjali_Kamble_Resume.pdf"
            className="btn-outline"
          >
            Download CV 📄
          </a>
          <Link to="projects" smooth duration={600} offset={-70}>
            <button className="btn-outline" style={{ borderColor: 'var(--purple-400)', color: 'var(--purple-300)' }}>
              View Projects 🚀
            </button>
          </Link>
        </div>

        {/* Social links */}
        <div style={{
          display: 'flex', gap: '1.2rem', justifyContent: 'center',
          marginTop: '2.5rem',
          animation: 'fadeInUp 0.7s ease 0.5s both',
        }}>
          {[
            { href: personalInfo.github, label: 'GitHub', icon: '⌥' },
            { href: personalInfo.linkedin, label: 'LinkedIn', icon: '🔗' },
            { href: `mailto:${personalInfo.email}`, label: 'Email', icon: '✉' },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                color: 'var(--text-secondary)', fontSize: '0.85rem',
                textDecoration: 'none', transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--cyan-400)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              <span>{s.icon}</span> {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 1,
        animation: 'fadeInUp 1s ease 0.8s both',
      }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{
          width: 24, height: 40, border: '1.5px solid rgba(34,211,238,0.4)',
          borderRadius: 12, display: 'flex', justifyContent: 'center', paddingTop: 6,
        }}>
          <div style={{
            width: 4, height: 8, background: 'var(--cyan-400)',
            borderRadius: 2, animation: 'float 1.8s ease-in-out infinite',
          }} />
        </div>
      </div>
    </section>
  );
}
