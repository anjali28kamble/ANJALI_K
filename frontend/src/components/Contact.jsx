import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { personalInfo } from '../data';

const initialForm = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
  const API_URL = "https://anjali-k.onrender.com";
  const res = await axios.post(`${API_URL}/api/contact`, form);

      if (res.data.success) {
        toast.success(res.data.message, { duration: 5000 });
        setForm(initialForm);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (name) => ({
    width: '100%',
    padding: '0.85rem 1.1rem',
    background: focused === name ? 'rgba(34,211,238,0.05)' : 'rgba(15,32,68,0.5)',
    border: `1.5px solid ${focused === name ? 'var(--cyan-400)' : 'rgba(34,211,238,0.15)'}`,
    borderRadius: 10,
    color: 'var(--text-primary)',
    fontSize: '0.92rem',
    fontFamily: 'Space Grotesk, sans-serif',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    boxShadow: focused === name ? '0 0 0 3px rgba(34,211,238,0.1)' : 'none',
  });

  const labelStyle = {
    display: 'block',
    fontSize: '0.82rem',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    marginBottom: '0.45rem',
    letterSpacing: '0.04em',
  };

  return (
    <section id="contact" style={{
      padding: '6rem 0 4rem',
      background: 'linear-gradient(180deg, transparent 0%, rgba(6,14,36,0.6) 100%)',
    }}>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0a1628',
            color: '#f0f9ff',
            border: '1px solid rgba(34,211,238,0.3)',
            fontFamily: 'Space Grotesk, sans-serif',
          },
        }}
      />
      <div className="section-container" ref={ref}>
        <h2 className="section-title">Get In Touch</h2>
        <div className="section-divider" />
        <p className="section-subtitle">Let's work together or just say hi!</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,0.9fr) minmax(0,1.1fr)',
          gap: '3rem',
          alignItems: 'start',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s ease',
        }}>
          {/* Left — info */}
          <div>
            <h3 style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.5rem',
              color: 'var(--white)', marginBottom: '1rem',
            }}>
              Let's build something <span className="gradient-text">amazing</span> together
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.95rem' }}>
              I'm currently looking for new opportunities. Whether you have a question, a project idea, or just want to say hello — my inbox is always open!
            </p>

            {[
              { icon: '📍', label: 'Location', value: personalInfo.location },
              { icon: '📧', label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
              { icon: '📱', label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
            ].map(item => (
              <div key={item.label} className="glass-card" style={{
                padding: '1.1rem 1.3rem', marginBottom: '0.9rem',
                display: 'flex', alignItems: 'center', gap: '1rem',
              }}>
                <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 2 }}>{item.label}</div>
                  {item.href ? (
                    <a href={item.href} style={{ color: 'var(--cyan-300)', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 500 }}>
                      {item.value}
                    </a>
                  ) : (
                    <div style={{ color: 'var(--white)', fontSize: '0.9rem', fontWeight: 500 }}>{item.value}</div>
                  )}
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                className="btn-outline" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>
                GitHub
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                className="btn-outline" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem', borderColor: 'var(--purple-400)', color: 'var(--purple-300)' }}>
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div className="glass-card" style={{ padding: '2.2rem' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Your Name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused('')}
                    placeholder="Anjali Kamble"
                    style={inputStyle('name')}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused('')}
                    placeholder="hello@example.com"
                    style={inputStyle('email')}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Subject *</label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  onFocus={() => setFocused('subject')}
                  onBlur={() => setFocused('')}
                  placeholder="Job Opportunity / Collaboration / Hello!"
                  style={inputStyle('subject')}
                />
              </div>

              <div>
                <label style={labelStyle}>Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused('')}
                  placeholder="Tell me about your project or opportunity..."
                  rows={5}
                  style={{ ...inputStyle('message'), resize: 'vertical', minHeight: 130 }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{
                  justifyContent: 'center',
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '1rem',
                  padding: '0.9rem',
                }}
              >
                {loading ? (
                  <>
                    <span style={{
                      display: 'inline-block', width: 16, height: 16,
                      border: '2px solid rgba(2,8,24,0.3)',
                      borderTopColor: 'var(--navy-950)',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite',
                    }} />
                    Sending...
                  </>
                ) : '✉️ Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          #contact .section-container > div > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
