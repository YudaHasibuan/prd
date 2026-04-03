import React, { useState } from 'react';

const Badge = ({ text, color = 'var(--accent-primary)' }) => (
  <span style={{
    background: `${color}22`, color, border: `1px solid ${color}44`,
    padding: '0.2rem 0.7rem', borderRadius: '999px', fontSize: '0.75rem',
    fontWeight: 600, display: 'inline-block'
  }}>{text}</span>
);

const Card = ({ title, children, span = 1, accent = 'var(--accent-primary)' }) => (
  <div className="glass" style={{ gridColumn: `span ${span}`, padding: '2rem' }}>
    <h3 style={{ color: accent, marginBottom: '1.2rem', fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
      {title}
    </h3>
    {children}
  </div>
);

const PRDResult = ({ data, loading, onReset }) => {
  const [copied, setCopied] = useState(false);
  const [showRaw, setShowRaw] = useState(false);

  const buildText = () => {
    if (!data) return '';
    const lines = [];
    lines.push(`# PRD: ${data.title} (v${data.version || '1.0.0'})\n`);
    lines.push(`## VISI\n${data.vision}\n`);
    lines.push(`## RINGKASAN\n${data.overview}\n`);
    if (data.userStories?.length) {
      lines.push(`## USER STORIES`);
      data.userStories.forEach(s => {
        lines.push(`[${s.epic}] [${s.priority} / ${s.storyPoints}pts] Sebagai ${s.role}, saya ingin ${s.action} sehingga ${s.benefit}.`);
        (s.acceptanceCriteria || []).forEach(a => lines.push(`  ✓ ${a}`));
      });
      lines.push('');
    }
    if (data.functionalSpecs?.length) {
      lines.push(`## SPESIFIKASI FUNGSIONAL`);
      data.functionalSpecs.forEach(m => {
        lines.push(`### ${m.module}: ${m.description}`);
        (m.features || []).forEach(f => lines.push(`  - ${f}`));
      });
      lines.push('');
    }
    lines.push(`## SKEMA DATABASE\n\`\`\`sql\n${data.databaseSchema}\n\`\`\`\n`);
    if (data.techStack) {
      lines.push(`## TECH STACK`);
      Object.entries(data.techStack).forEach(([k, v]) => lines.push(`${k}: ${(Array.isArray(v) ? v : [v]).join(', ')}`));
      lines.push('');
    }
    lines.push(`## ARSITEKTUR SISTEM\n${data.systemArchitecture}\n`);
    if (data.apiDocs?.length) {
      lines.push(`## API DOCS`);
      data.apiDocs.forEach(a => lines.push(`[${a.method}] ${a.endpoint} (${a.auth}) — ${a.desc}`));
      lines.push('');
    }
    if (data.roadmap?.length) {
      lines.push(`## ROADMAP`);
      data.roadmap.forEach(r => lines.push(`${r.phase} (${r.duration}) → ${r.milestone}: ${(r.deliverables || []).join(', ')}`));
      lines.push('');
    }
    lines.push(`## TIP DESAIN UI/UX\n${data.designTips}`);
    return lines.join('\n');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildText()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 0' }}>
        <div style={{
          width: '56px', height: '56px', margin: '0 auto 1.5rem',
          border: '4px solid rgba(0,163,255,0.2)', borderTopColor: 'var(--accent-primary)',
          borderRadius: '50%', animation: 'spin 1s linear infinite'
        }} />
        <h2 style={{ marginBottom: '0.5rem' }}>Menganalisis & Merancang PRD...</h2>
        <p style={{ color: 'var(--text-muted)' }}>AI sedang menyusun database, arsitektur, dan roadmap Anda.</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!data) return null;

  const pColor = (p) => p === 'High' ? '#ff4d6d' : p === 'Medium' ? '#ffd60a' : '#06d6a0';

  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <Badge text={`v${data.version || '1.0.0'}`} />
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>{data.title}</h1>
        </div>
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={handleCopy}
            style={{ background: copied ? 'linear-gradient(135deg,#00c97d,#00a36a)' : undefined }}>
            {copied ? '✅ Tersalin!' : '📋 Salin ke AI Lain'}
          </button>
          <button className="btn-secondary" onClick={() => setShowRaw(!showRaw)}>
            {showRaw ? 'Tutup' : '📄 Lihat Teks'}
          </button>
          <button className="btn-secondary" onClick={onReset}>Buat Baru</button>
        </div>
      </div>

      {/* Raw Text Panel */}
      {showRaw && (
        <div className="glass fade-in" style={{ marginBottom: '2rem', padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ color: 'var(--accent-primary)' }}>📋 Teks PRD (Siap untuk AI Lain)</h3>
            <button className="btn-primary" onClick={handleCopy} style={{ fontSize: '0.85rem', padding: '0.5rem 1.2rem' }}>
              {copied ? '✅ Tersalin!' : 'Salin Semua'}
            </button>
          </div>
          <pre style={{
            background: '#0a0a0a', padding: '1.5rem', borderRadius: '12px', fontSize: '0.8rem',
            border: '1px solid var(--glass-border)', color: '#e0e0e0',
            whiteSpace: 'pre-wrap', wordBreak: 'break-word',
            maxHeight: '450px', overflowY: 'auto', lineHeight: '1.6', userSelect: 'all'
          }}>{buildText()}</pre>
        </div>
      )}

      {/* Bento Grid — 3 kolom */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>

        {/* Visi */}
        <Card title="🎯 Visi Produk" span={2}>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1rem' }}>{data.vision}</p>
          <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', margin: '1rem 0' }} />
          <p style={{ lineHeight: '1.7', fontSize: '0.9rem' }}>{data.overview}</p>
        </Card>

        {/* Tech Stack */}
        <Card title="🛠️ Tech Stack">
          {data.techStack && Object.entries(data.techStack).map(([layer, techs]) => (
            <div key={layer} style={{ marginBottom: '0.8rem' }}>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{layer}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {(Array.isArray(techs) ? techs : [techs]).map((t, i) => <Badge key={i} text={t} />)}
              </div>
            </div>
          ))}
        </Card>

        {/* User Stories */}
        <Card title="📖 User Stories" span={3}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {(data.userStories || []).map((s) => (
              <div key={s.id} className="glass" style={{ padding: '1.2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.7rem', flexWrap: 'wrap', gap: '0.4rem' }}>
                  <Badge text={s.epic || 'Epic'} color="var(--accent-secondary)" />
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <Badge text={s.priority} color={pColor(s.priority)} />
                    <Badge text={`${s.storyPoints}pts`} />
                  </div>
                </div>
                <p style={{ fontSize: '0.87rem', lineHeight: '1.5', marginBottom: '0.7rem' }}>
                  Sebagai <strong>{s.role}</strong>, saya ingin <strong>{s.action}</strong> sehingga {s.benefit}.
                </p>
                {(s.acceptanceCriteria || []).map((a, i) => (
                  <p key={i} style={{ fontSize: '0.77rem', color: '#06d6a0', marginBottom: '0.2rem' }}>✓ {a}</p>
                ))}
              </div>
            ))}
          </div>
        </Card>

        {/* Spesifikasi Fungsional */}
        <Card title="⚙️ Spesifikasi Fungsional" span={2}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: '1rem' }}>
            {(data.functionalSpecs || []).map((m, i) => (
              <div key={i} className="glass" style={{ padding: '1rem' }}>
                <p style={{ fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '0.4rem', fontSize: '0.9rem' }}>{m.module}</p>
                <p style={{ fontSize: '0.77rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>{m.description}</p>
                {(m.features || []).map((f, fi) => <p key={fi} style={{ fontSize: '0.8rem', marginBottom: '0.2rem' }}>• {f}</p>)}
              </div>
            ))}
          </div>
        </Card>

        {/* Arsitektur */}
        <Card title="🏗️ Arsitektur Sistem">
          <p style={{ lineHeight: '1.7', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{data.systemArchitecture}</p>
        </Card>

        {/* Database Schema */}
        <Card title="🗄️ Skema Database (PostgreSQL)" span={3} accent="#00ffc3">
          <pre style={{
            background: '#050d0a', padding: '1.5rem', borderRadius: '12px',
            fontSize: '0.83rem', overflowX: 'auto', overflowY: 'auto', maxHeight: '380px',
            border: '1px solid rgba(0,255,195,0.2)', color: '#00ffc3', lineHeight: '1.7'
          }}>{data.databaseSchema}</pre>
        </Card>

        {/* API Docs */}
        <Card title="🔌 Dokumentasi API" span={2}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.6rem', textAlign: 'left' }}>Method</th>
                  <th style={{ padding: '0.6rem', textAlign: 'left' }}>Endpoint</th>
                  <th style={{ padding: '0.6rem', textAlign: 'left' }}>Auth</th>
                  <th style={{ padding: '0.6rem', textAlign: 'left' }}>Deskripsi</th>
                </tr>
              </thead>
              <tbody>
                {(data.apiDocs || []).map((api, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                    <td style={{ padding: '0.6rem' }}>
                      <Badge text={api.method} color={api.method === 'POST' ? '#ffd60a' : api.method === 'DELETE' ? '#ff4d6d' : '#06d6a0'} />
                    </td>
                    <td style={{ padding: '0.6rem', fontFamily: 'monospace', color: 'var(--accent-primary)' }}>{api.endpoint}</td>
                    <td style={{ padding: '0.6rem', fontSize: '0.77rem', color: 'var(--text-muted)' }}>{api.auth}</td>
                    <td style={{ padding: '0.6rem', color: 'var(--text-muted)' }}>{api.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Roadmap */}
        <Card title="🗺️ Product Roadmap">
          {(data.roadmap || []).map((r, i) => (
            <div key={i} style={{ marginBottom: '1rem', padding: '0.9rem', background: `rgba(0,163,255,${0.05 + i * 0.03})`, borderRadius: '10px', borderLeft: '3px solid var(--accent-primary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <p style={{ fontWeight: 700, fontSize: '0.88rem' }}>{r.phase}</p>
                <Badge text={r.duration} />
              </div>
              <p style={{ fontSize: '0.77rem', color: 'var(--accent-primary)', marginBottom: '0.4rem' }}>🏁 {r.milestone}</p>
              {(r.deliverables || []).map((d, di) => (
                <p key={di} style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>→ {d}</p>
              ))}
            </div>
          ))}
        </Card>

        {/* Tip Desain */}
        <Card title="🎨 Tip Desain UI/UX" span={3}>
          <p style={{ lineHeight: '1.8', color: 'var(--text-muted)' }}>{data.designTips}</p>
        </Card>

      </div>
    </div>
  );
};

export default PRDResult;
