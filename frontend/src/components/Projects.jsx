import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { projects } from '../data';

function ProjectCard({ project, index }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
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
          ? `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(${hovered ? -8 : 0}px)`
          : 'translateY(50px)',
        transition: hovered
          ? 'transform 0.1s ease, opacity 0.6s ease, box-shadow 0.3s'
          : 'all 0.7s ease',
        transitionDelay: inView ? `${index * 120}ms` : '0ms',
        background: hovered
          ? 'linear-gradient(135deg, rgba(22,43,94,0.7), rgba(15,32,68,0.7))'
          : 'var(--glass-bg)',
        border: `1px solid ${hovered ? 'rgba(34,211,238,0.4)' : 'var(--glass-border)'}`,
        backdropFilter: 'blur(16px)',
        borderRadius: 20,
        padding: '2rem',
        boxShadow: hovered ? '0 20px 60px rgba(34,211,238,0.2)' : 'none',
        cursor: 'default',
        willChange: 'transform',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
        <span style={{ fontSize: '2.5rem' }}>{project.icon}</span>
        <span style={{
          padding: '0.3rem 0.9rem',
          background: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(167,139,250,0.15))',
          border: '1px solid rgba(34,211,238,0.3)',
          borderRadius: 20, fontSize: '0.78rem', fontWeight: 700,
          color: 'var(--cyan-300)',
        }}>{project.highlight}</span>
      </div>

      <h3 style={{
        fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.15rem',
        color: hovered ? 'var(--cyan-300)' : 'var(--white)',
        marginBottom: '0.75rem', transition: 'color 0.3s',
      }}>{project.name}</h3>

      <p style={{
        color: 'var(--text-secondary)', fontSize: '0.88rem',
        lineHeight: 1.75, marginBottom: '1.5rem', flex: 1,
      }}>{project.description}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
        {project.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
      </div>

      {/* Shine effect */}
      {hovered && (
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 20,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
      )}
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" style={{
      padding: '6rem 0',
      background: 'linear-gradient(180deg, transparent 0%, rgba(6,14,36,0.5) 50%, transparent 100%)',
    }}>
      <div className="section-container">
        <h2 className="section-title">Projects</h2>
        <div className="section-divider" />
        <p className="section-subtitle">Things I've built</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.8rem',
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
