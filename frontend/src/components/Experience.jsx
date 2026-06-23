import React from 'react';
import { useInView } from 'react-intersection-observer';
import { experience } from '../data';

function ExperienceCard({ item, index }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} style={{
      display: 'grid',
      gridTemplateColumns: '1fr 60px 1fr',
      gap: 0,
      alignItems: 'start',
      marginBottom: '2.5rem',
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(40px)',
      transition: 'all 0.7s ease',
      transitionDelay: `${index * 150}ms`,
    }}>
      {/* Left */}
      <div style={{ padding: '0 2rem 0 0', display: isLeft ? 'block' : 'none' }}>
        {isLeft && <Card item={item} />}
      </div>
      <div style={{ padding: '0 2rem 0 0', display: !isLeft ? 'block' : 'none' }} />

      {/* Center dot */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          width: 20, height: 20, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--cyan-400), var(--purple-400))',
          border: '3px solid var(--navy-950)',
          boxShadow: '0 0 0 3px rgba(34,211,238,0.3)',
          zIndex: 1, flexShrink: 0, marginTop: '1.5rem',
          animation: 'pulse-glow 3s infinite',
        }} />
      </div>

      {/* Right */}
      <div style={{ padding: '0 0 0 2rem', display: !isLeft ? 'block' : 'none' }}>
        {!isLeft && <Card item={item} />}
      </div>
      <div style={{ padding: '0 0 0 2rem', display: isLeft ? 'block' : 'none' }} />
    </div>
  );
}

function Card({ item }) {
  return (
    <div className="glass-card" style={{ padding: '1.6rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <div>
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: 'var(--white)' }}>
            {item.role}
          </h3>
          <div style={{ color: 'var(--cyan-400)', fontWeight: 600, fontSize: '0.9rem', marginTop: 3 }}>
            {item.company}
          </div>
        </div>
        <span style={{
          padding: '0.3rem 0.9rem',
          background: 'rgba(167,139,250,0.1)',
          border: '1px solid rgba(167,139,250,0.25)',
          color: 'var(--purple-300)',
          borderRadius: 20, fontSize: '0.78rem', fontWeight: 500,
          height: 'fit-content',
        }}>{item.period}</span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
        {item.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
      </div>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
        {item.points.map((pt, i) => (
          <li key={i} style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start', fontSize: '0.87rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
            <span style={{ color: 'var(--cyan-400)', flexShrink: 0, marginTop: 2 }}>▸</span>
            {pt}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" style={{ padding: '6rem 0' }}>
      <div className="section-container">
        <h2 className="section-title">Experience</h2>
        <div className="section-divider" />
        <p className="section-subtitle">My professional journey</p>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Center line */}
          <div style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0,
            width: 2, transform: 'translateX(-50%)',
            background: 'linear-gradient(180deg, var(--cyan-400), var(--purple-400))',
            opacity: 0.3,
          }} />

          {experience.map((item, i) => (
            <ExperienceCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          #experience .section-container > div > div {
            grid-template-columns: 20px 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
