import React from 'react';
import { supabase } from '../lib/supabaseClient';

const SUPABASE_ACTIVE = !!(import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL?.includes('GANTI'));

const Navbar = ({ onStart, onLogin, user }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const getAvatar = () => user?.user_metadata?.avatar_url || null;
  const getName = () => user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'Pengguna';
  const getInitial = () => getName()[0]?.toUpperCase() || 'U';

  return (
    <nav className="glass" style={{
      position: 'fixed', top: '1rem', left: '50%', transform: 'translateX(-50%)',
      width: 'min(90%, 1100px)', display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', padding: '0.8rem 2rem', zIndex: 1000,
      border: '1px solid var(--glass-border)'
    }}>
      {/* Logo */}
      <div onClick={() => window.location.reload()} style={{ fontSize: '1.3rem', fontWeight: 800, cursor: 'pointer' }}>
        Nusantara<span className="text-gradient">AI</span>
      </div>

      {/* Nav Links + Auth */}
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Fitur</a>

        {SUPABASE_ACTIVE && user ? (
          /* ── Sudah Login ── */
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <button className="btn-primary" onClick={onStart}
              style={{ padding: '0.5rem 1.3rem', fontSize: '0.85rem' }}>
              ✨ Buat PRD
            </button>

            {/* Avatar + Nama + Keluar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.4rem 0.8rem', borderRadius: '999px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.04)' }}>
              {getAvatar() ? (
                <img src={getAvatar()} alt="avatar" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(0,163,255,0.5)' }} />
              ) : (
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg,#00a3ff,#7000ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>
                  {getInitial()}
                </div>
              )}
              <span style={{ fontSize: '0.85rem', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{getName()}</span>
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#ff4d6d', fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit', padding: '0 0.2rem' }}>
                Keluar
              </button>
            </div>
          </div>
        ) : (
          /* ── Belum Login ── */
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            {SUPABASE_ACTIVE && (
              <button className="btn-secondary" onClick={onLogin}
                style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}>
                Masuk
              </button>
            )}
            <button className="btn-primary" onClick={onStart}
              style={{ padding: '0.5rem 1.3rem', fontSize: '0.85rem' }}>
              ✨ Mulai Gratis
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
