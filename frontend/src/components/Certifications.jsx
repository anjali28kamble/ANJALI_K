import React from 'react';
import { useInView } from 'react-intersection-observer';
import { certifications, achievements } from '../data';

function CertCard({ cert, index }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div ref={ref} className="glass-card" style={{
      padding: '1.2rem 1.4rem',
      display: 'flex', alignItems: 'center', gap: '1rem',
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateX(0)' : 'translateX(-30px)',
      transition: 'all 0.6s ease',
      transitionDelay: `${index * 70}ms`,
    }}>
      <span style={{ fontSize: '1.6rem', flexShrink: 0 }}>{cert.icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--white)' }}>{cert.name}</div>
        <div style={{ fontSize: '0.78rem', color: 'var(--cyan-400)', marginTop: 3 }}>{cert.date}</div>
      </div>
      <div style={{
        width: 8, height: 8, borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--cyan-400), var(--purple-400))',
        flexShrink: 0,
      }} />
    </div>
  );
}

function AchievementCard({ item, index }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <div ref={ref} className="glass-card" style={{
      padding: '1.8rem',
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.7s ease',
      transitionDelay: `${index * 150}ms`,
      borderColor: 'rgba(167,139,250,0.2)',
    }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '2rem', flexShrink: 0 }}>{item.icon}</span>
        <div>
          <h4 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'var(--white)', marginBottom: '0.3rem' }}>{item.title}</h4>
          <div style={{ fontSize: '0.8rem', color: 'var(--purple-300)', marginBottom: '0.6rem' }}>{item.event}</div>
          <p style={{ fontSize: '0.87rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{item.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function Certifications() {
  return (
    <section id="certifications" style={{ padding: '6rem 0' }}>
      <div className="section-container">
        <h2 className="section-title">Certifications & Achievements</h2>
        <div className="section-divider" />
        <p className="section-subtitle">Recognition and continuous learning</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
          gap: '3rem',
          alignItems: 'start',
        }}>
          {/* Certifications */}
          <div>
            <h3 style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.1rem',
              color: 'var(--cyan-300)', marginBottom: '1.5rem',
              display: 'flex', alignItems: 'center', gap: '0.6rem',
            }}>
              <span>📜</span> Certifications
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {certifications.map((cert, i) => (
                <CertCard key={cert.name} cert={cert} index={i} />
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.1rem',
              color: 'var(--purple-300)', marginBottom: '1.5rem',
              display: 'flex', alignItems: 'center', gap: '0.6rem',
            }}>
              <span>🏆</span> Achievements
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {achievements.map((item, i) => (
                <AchievementCard key={i} item={item} index={i} />
              ))}
            </div>

            {/* Extra callout */}
            <div style={{
              marginTop: '1.5rem', padding: '1.4rem',
              background: 'linear-gradient(135deg, rgba(34,211,238,0.06), rgba(167,139,250,0.06))',
              border: '1px solid rgba(34,211,238,0.2)',
              borderRadius: 16,
            }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem', color: 'var(--white)', marginBottom: '0.4rem' }}>
                🎯 Research Published
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                Research on "Early Detection of Depression in Teenagers" presented at an international e-conference, October 2025.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #certifications .section-container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
