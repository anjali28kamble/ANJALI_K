import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { skills } from '../data';

function SkillCard({ category, icon, items, delay }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
    setTilt({ x, y });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(0)`
          : 'translateY(40px)',
        transition: hovered
          ? 'opacity 0.6s ease, box-shadow 0.3s ease, background 0.3s ease'
          : 'all 0.6s ease',
        transitionDelay: `${delay}ms`,
        background: hovered ? 'var(--glass-hover)' : 'var(--glass-bg)',
        border: `1px solid ${hovered ? 'rgba(34,211,238,0.35)' : 'var(--glass-border)'}`,
        backdropFilter: 'blur(16px)',
        borderRadius: 16,
        padding: '1.6rem',
        boxShadow: hovered ? 'var(--glow-cyan)' : 'none',
        cursor: 'default',
        willChange: 'transform',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
        <span style={{ fontSize: '1.6rem' }}>{icon}</span>
        <h3 style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem',
          color: hovered ? 'var(--cyan-300)' : 'var(--white)',
          transition: 'color 0.3s',
        }}>{category}</h3>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {items.map(item => (
          <span key={item} className="tech-tag">{item}</span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" style={{
      padding: '6rem 0',
      background: 'linear-gradient(180deg, transparent 0%, rgba(6,14,36,0.5) 50%, transparent 100%)',
    }}>
      <div className="section-container">
        <h2 className="section-title">Technical Skills</h2>
        <div className="section-divider" />
        <p className="section-subtitle">Technologies I work with</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {skills.map((skill, i) => (
            <SkillCard key={skill.category} {...skill} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
