import React, { useState, useEffect } from 'react';

const TYPING_WORDS = ['Database Schema', 'System Architecture', 'API Docs', 'User Stories', 'Product Roadmap'];

const Hero = ({ onStart }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  // Typing animation
  useEffect(() => {
    const word = TYPING_WORDS[wordIndex];
    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(word.slice(0, displayed.length + 1));
        if (displayed.length + 1 === word.length) {
          setTimeout(() => setIsDeleting(true), 1400);
        }
      } else {
        setDisplayed(word.slice(0, displayed.length - 1));
        if (displayed.length === 0) {
          setIsDeleting(false);
          setWordIndex((wordIndex + 1) % TYPING_WORDS.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [displayed, isDeleting, wordIndex]);

  useEffect(() => {
    const t = setTimeout(() => setStatsVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  const stats = [
    { value: '15+', label: 'Seksi PRD' },
    { value: '<30s', label: 'Waktu Generasi' },
    { value: '100%', label: 'Berbasis AI' },
  ];

  const features = [
    { icon: '🗄️', text: 'Skema Database SQL' },
    { icon: '🏗️', text: 'Arsitektur Sistem' },
    { icon: '🔌', text: 'Dokumentasi API' },
    { icon: '🗺️', text: 'Product Roadmap' },
    { icon: '📖', text: 'User Stories' },
    { icon: '⚙️', text: 'Spesifikasi Teknis' },
  ];

  return (
    <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '6rem 2rem 4rem' }}>

      {/* BG Orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: '400px', height: '400px', background: 'rgba(0,163,255,0.12)', borderRadius: '50%', filter: 'blur(100px)', animation: 'floatA 8s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '350px', height: '350px', background: 'rgba(112,0,255,0.12)', borderRadius: '50%', filter: 'blur(100px)', animation: 'floatB 10s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '50%', left: '45%', width: '200px', height: '200px', background: 'rgba(0,255,195,0.06)', borderRadius: '50%', filter: 'blur(80px)', animation: 'floatA 12s ease-in-out infinite reverse' }} />
      </div>

      {/* Grid lines */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize: '60px 60px', zIndex: 0, pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', textAlign: 'center' }}>

        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,163,255,0.1)', border: '1px solid rgba(0,163,255,0.3)', borderRadius: '999px', padding: '0.4rem 1.2rem', marginBottom: '2rem', animation: 'slideDown 0.6s ease forwards' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#06d6a0', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
          <span style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: 600 }}>AI PRD Generator — Powered by OpenRouter</span>
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', lineHeight: 1.1, marginBottom: '1.2rem', animation: 'slideDown 0.7s ease 0.1s both' }}>
          Buat PRD Lengkap<br />
          <span className="text-gradient">termasuk </span>
          <span style={{ color: 'var(--accent-primary)', borderRight: '3px solid var(--accent-primary)', paddingRight: '4px', minWidth: '220px', display: 'inline-block', textAlign: 'left', animation: 'blink 1s step-end infinite' }}>
            {displayed}
          </span>
        </h1>

        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto 2.5rem', lineHeight: 1.7, animation: 'slideDown 0.7s ease 0.2s both' }}>
          Buat Dokumen Persyaratan Produk yang komprehensif — lengkap dengan skema database SQL, arsitektur sistem, dokumentasi API, dan roadmap dalam hitungan detik.
        </p>

        {/* CTA */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3.5rem', animation: 'slideDown 0.7s ease 0.3s both' }}>
          <button className="btn-primary" onClick={onStart} style={{ padding: '1rem 2.5rem', fontSize: '1.05rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            ✨ Bikin PRD Sekarang
          </button>
          <button className="btn-secondary" onClick={onStart} style={{ padding: '1rem 2rem', fontSize: '1.05rem', borderRadius: '12px' }}>
            Lihat Contoh →
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', marginBottom: '4rem', animation: 'slideDown 0.7s ease 0.4s both' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '2rem', fontWeight: 800, background: 'linear-gradient(135deg,var(--accent-primary),var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.value}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Feature Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', justifyContent: 'center', marginBottom: '4rem', animation: 'slideDown 0.7s ease 0.5s both' }}>
          {features.map((f, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.5rem 1.1rem', borderRadius: '999px',
              background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)',
              fontSize: '0.85rem', fontWeight: 500,
              animation: `slideDown 0.5s ease ${0.1 * i + 0.6}s both`,
              transition: 'all 0.25s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,163,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(0,163,255,0.4)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <span>{f.icon}</span> {f.text}
            </div>
          ))}
        </div>

        {/* Live Preview Window */}
        <div style={{ animation: 'slideUp 0.8s ease 0.5s both' }}>
          <div className="glass" style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px var(--glass-border)', textAlign: 'left' }}>
            {/* Window Bar */}
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '0.8rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid var(--glass-border)' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
              <span style={{ marginLeft: '0.8rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>prd-generator.ai • output.json</span>
            </div>
            {/* Code Body */}
            <div style={{ padding: '1.5rem', fontFamily: 'monospace', fontSize: '0.83rem', lineHeight: '1.8', animation: 'typing 0.5s steps(1,end) infinite' }}>
              <p><span style={{ color: '#7000ff' }}>const</span> <span style={{ color: '#00a3ff' }}>prd</span> = <span style={{ color: '#ffd60a' }}>await</span> generatePRD({'{'}name: <span style={{ color: '#06d6a0' }}>"Produk Anda"</span>{'}'});</p>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>// ✅ Visi & Overview dihasilkan</p>
              <p style={{ color: 'var(--text-muted)' }}>// ✅ 5 Tabel PostgreSQL dibuat</p>
              <p style={{ color: 'var(--text-muted)' }}>// ✅ 12 Endpoint API didokumentasikan</p>
              <p style={{ color: 'var(--text-muted)' }}>// ✅ Roadmap 3 fase disusun</p>
              <p style={{ marginTop: '0.5rem' }}><span style={{ color: '#06d6a0' }}>▶ PRD siap dalam </span><span style={{ color: '#ffd60a', fontWeight: 700 }}>18 detik</span> 🚀</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -30px) scale(1.05); }
        }
        @keyframes floatB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-25px, 20px) scale(1.08); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
        @keyframes blink {
          0%, 100% { border-color: var(--accent-primary); }
          50% { border-color: transparent; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
