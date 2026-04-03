import React, { useState } from 'react';

const PRDForm = ({ onSubmit, onBack }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    productName: '',
    vision: '',
    targetAudience: '',
    coreFeatures: '',
    technicalScale: 'Medium'
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="glass fade-in" style={{ padding: '3rem', maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ color: 'var(--accent-primary)', fontWeight: 'bold', marginBottom: '0.5rem' }}>Langkah {step} dari 3</p>
        <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
          <div style={{ 
            width: `${(step / 3) * 100}%`, 
            height: '100%', 
            background: 'var(--accent-primary)', 
            borderRadius: '2px',
            transition: 'width 0.4s ease'
          }}></div>
        </div>
      </div>

      {step === 1 && (
        <div className="fade-in">
          <h2 style={{ marginBottom: '1.5rem' }}>Apa nama produk Anda?</h2>
          <input 
            type="text" 
            name="productName"
            placeholder="Contoh: TokoKita, SaaS Tracker..."
            value={formData.productName}
            onChange={handleChange}
            className="glass"
            style={{ 
              width: '100%', 
              padding: '1rem', 
              marginBottom: '1.5rem', 
              color: 'white',
              fontSize: '1.1rem'
            }}
          />
          <h2 style={{ marginBottom: '1.5rem' }}>Apa visi utama produk ini?</h2>
          <textarea 
            name="vision"
            placeholder="Jelaskan masalah yang ingin Anda selesaikan..."
            value={formData.vision}
            onChange={handleChange}
            className="glass"
            style={{ 
              width: '100%', 
              padding: '1rem', 
              height: '150px',
              color: 'white',
              fontSize: '1rem'
            }}
          />
        </div>
      )}

      {step === 2 && (() => {
        const audienceOptions = [
          { value: 'Mahasiswa & Pelajar', icon: '🎓', desc: 'Usia 17-25 tahun' },
          { value: 'Pemilik UMKM', icon: '🏪', desc: 'Bisnis kecil menengah' },
          { value: 'Profesional Korporat', icon: '💼', desc: 'B2B & Enterprise' },
          { value: 'Developer & Tech Enthusiast', icon: '💻', desc: 'Pengguna teknis' },
          { value: 'Ibu Rumah Tangga', icon: '👩‍👧', desc: 'Konsumer umum' },
          { value: 'Content Creator', icon: '🎨', desc: 'Kreator digital' },
          { value: 'Petani & UMKM Agrikultur', icon: '🌾', desc: 'Sektor pertanian' },
          { value: 'Pemerintah & Instansi', icon: '🏛️', desc: 'Sektor publik' },
        ];
        const featureOptions = [
          { value: 'Dashboard & Analitik', icon: '📊' },
          { value: 'Autentikasi & Manajemen User', icon: '🔐' },
          { value: 'Pembayaran & Transaksi', icon: '💳' },
          { value: 'Notifikasi Real-time', icon: '🔔' },
          { value: 'AI & Machine Learning', icon: '🤖' },
          { value: 'Manajemen Konten (CMS)', icon: '📝' },
          { value: 'Chat & Komunikasi', icon: '💬' },
          { value: 'Laporan & Ekspor', icon: '📄' },
          { value: 'Integrasi API Pihak Ketiga', icon: '🔌' },
          { value: 'Manajemen Inventaris', icon: '📦' },
          { value: 'Penjadwalan & Kalender', icon: '📅' },
          { value: 'Geolokasi & Peta', icon: '🗺️' },
        ];

        const selectedAudiences = formData.targetAudience ? formData.targetAudience.split(',').map(s => s.trim()) : [];
        const selectedFeatures = formData.coreFeatures ? formData.coreFeatures.split(',').map(s => s.trim()) : [];

        const toggleAudience = (val) => {
          const current = selectedAudiences;
          const updated = current.includes(val) ? current.filter(v => v !== val) : [...current, val];
          setFormData({ ...formData, targetAudience: updated.join(', ') });
        };

        const toggleFeature = (val) => {
          const current = selectedFeatures;
          const updated = current.includes(val) ? current.filter(v => v !== val) : current.length < 6 ? [...current, val] : current;
          setFormData({ ...formData, coreFeatures: updated.join(', ') });
        };

        return (
          <div className="fade-in">
            <h2 style={{ marginBottom: '0.5rem' }}>Siapa target audiens Anda?</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.2rem' }}>Pilih satu atau lebih</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))', gap: '0.8rem', marginBottom: '2rem' }}>
              {audienceOptions.map(opt => {
                const selected = selectedAudiences.includes(opt.value);
                return (
                  <div key={opt.value} onClick={() => toggleAudience(opt.value)} style={{
                    padding: '1rem', borderRadius: '12px', cursor: 'pointer', textAlign: 'center',
                    border: selected ? '2px solid var(--accent-primary)' : '1px solid var(--glass-border)',
                    background: selected ? 'rgba(0,163,255,0.12)' : 'rgba(255,255,255,0.03)',
                    transition: 'all 0.2s ease', transform: selected ? 'scale(1.03)' : 'scale(1)'
                  }}>
                    <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>{opt.icon}</div>
                    <p style={{ fontWeight: 600, fontSize: '0.82rem', marginBottom: '0.2rem' }}>{opt.value}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{opt.desc}</p>
                  </div>
                );
              })}
            </div>

            <h2 style={{ marginBottom: '0.5rem' }}>Pilih fitur utama</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.2rem' }}>
              Pilih hingga 6 fitur · Terpilih: <strong style={{ color: 'var(--accent-primary)' }}>{selectedFeatures.length}/6</strong>
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '0.8rem' }}>
              {featureOptions.map(opt => {
                const selected = selectedFeatures.includes(opt.value);
                const disabled = !selected && selectedFeatures.length >= 6;
                return (
                  <div key={opt.value} onClick={() => !disabled && toggleFeature(opt.value)} style={{
                    padding: '0.9rem 1rem', borderRadius: '10px', cursor: disabled ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', gap: '0.7rem',
                    border: selected ? '2px solid var(--accent-secondary)' : '1px solid var(--glass-border)',
                    background: selected ? 'rgba(112,0,255,0.12)' : disabled ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.03)',
                    opacity: disabled ? 0.4 : 1, transition: 'all 0.2s ease',
                  }}>
                    <span style={{ fontSize: '1.3rem' }}>{opt.icon}</span>
                    <p style={{ fontSize: '0.82rem', fontWeight: selected ? 600 : 400 }}>{opt.value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}


      {step === 3 && (
        <div className="fade-in">
          <h2 style={{ marginBottom: '1.5rem' }}>Skala Teknis</h2>
          <select 
            name="technicalScale"
            value={formData.technicalScale}
            onChange={handleChange}
            className="glass"
            style={{ width: '100%', padding: '1rem', marginBottom: '2rem', color: 'white', background: '#111' }}
          >
            <option value="Small">Kecil (MVP, &lt; 1000 user)</option>
            <option value="Medium">Menengah (Bisnis, 10k+ user)</option>
            <option value="Large">Besar (Enterprise, 1M+ user)</option>
          </select>
          <div style={{ padding: '1rem', borderRadius: '8px', background: 'rgba(0,163,255,0.1)', border: '1px solid var(--accent-primary)', marginBottom: '2rem' }}>
            <p style={{ color: 'var(--accent-primary)', fontSize: '0.9rem' }}>
              💡 Skala besar akan menghasilkan arsitektur yang lebih kompleks dengan Microservices dan Load Balancing.
            </p>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
        {step > 1 ? (
          <button className="btn-secondary" onClick={prevStep}>Kembali</button>
        ) : (
          <button className="btn-secondary" onClick={onBack}>Batal</button>
        )}
        
        {step < 3 ? (
          <button className="btn-primary" onClick={nextStep} disabled={!formData.productName}>Lanjut</button>
        ) : (
          <button className="btn-primary" onClick={() => onSubmit(formData)}>Hasilkan PRD Kompleks ✨</button>
        )}
      </div>
    </div>
  );
};

export default PRDForm;
