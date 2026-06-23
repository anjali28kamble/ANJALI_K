import React from 'react';
import { useInView } from 'react-intersection-observer';
import { personalInfo, education } from '../data';

function StatCard({ value, label }) {
  return (
    <div className="glass-card" style={{
      padding: '1.4rem 1rem', textAlign: 'center', flex: 1, minWidth: 100,
    }}>
      <div style={{
        fontFamily: 'Syne, sans-serif', fontSize: '2rem', fontWeight: 800,
      }} className="gradient-text">{value}</div>
      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.3 }}>{label}</div>
    </div>
  );
}

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id="about" style={{ padding: '6rem 0' }}>
      <div className="section-container" ref={ref}>
        <h2 className="section-title">About Me</h2>
        <div className="section-divider" />
        <p className="section-subtitle">Get to know me better</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.3fr)',
          gap: '3rem',
          alignItems: 'center',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s ease',
        }}>
          {/* Avatar side */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <div style={{
              width: 220, height: 220, borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(167,139,250,0.15))',
              border: '2px solid rgba(34,211,238,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '6rem',
              animation: 'float 6s ease-in-out infinite',
              boxShadow: '0 0 60px rgba(34,211,238,0.15)',
              position: 'relative',
            }}>
              👩‍💻
              {/* orbit dot */}
              <div style={{
                position: 'absolute', width: 12, height: 12, borderRadius: '50%',
                background: 'var(--cyan-400)',
                animation: 'orbit 4s linear infinite',
                boxShadow: '0 0 10px var(--cyan-400)',
              }} />
            </div>

            {/* Stats */}
            
            
          </div>

          {/* Text side */}
          <div>
            <h3 style={{
              fontFamily: 'Syne, sans-serif', fontSize: '1.6rem', fontWeight: 700,
              marginBottom: '1rem', color: 'var(--white)',
            }}>
              Passionate about building{' '}
              <span className="gradient-text">impactful solutions</span>
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              {personalInfo.summary}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '2rem' }}>
              {[
                { label: '📍 Location', value: personalInfo.location },
                { label: '📧 Email', value: personalInfo.email },
                { label: '📱 Phone', value: personalInfo.phone },
                { label: '🎓 Degree', value: 'M.Sc. Computer Science ' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', minWidth: 130 }}>{item.label}</span>
                  <span style={{ color: 'var(--text-primary)', fontSize: '0.88rem' }}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* Education cards */}
            <h4 style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem',
              color: 'var(--cyan-300)', marginBottom: '1rem', letterSpacing: '0.05em',
            }}>EDUCATION</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {education.map((edu, i) => (
                <div key={i} className="glass-card" style={{ padding: '1rem 1.2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.4rem' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--white)' }}>{edu.degree}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 2 }}>{edu.institution}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span className="tech-tag">{edu.score}</span>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4 }}>{edu.period}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .section-container > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
