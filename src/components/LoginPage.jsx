import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../lib/supabaseClient';

const LoginPage = () => {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', position: 'relative', overflow: 'hidden',
      background: 'var(--bg-dark)'
    }}>
      {/* Floating orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '10%', left: '10%', width: '380px', height: '380px', background: 'rgba(0,163,255,0.13)', borderRadius: '50%', filter: 'blur(110px)', animation: 'floatA 8s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '320px', height: '320px', background: 'rgba(112,0,255,0.13)', borderRadius: '50%', filter: 'blur(110px)', animation: 'floatB 10s ease-in-out infinite' }} />
      </div>

      {/* Grid pattern */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '60px 60px', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '420px', padding: '0 1.5rem' }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Nusantara<span style={{
              background: 'linear-gradient(135deg,#00a3ff,#7000ff)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>AI</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Masuk untuk mulai membuat PRD kompleks Anda
          </p>
        </div>

        {/* Auth Box */}
        <div style={{
          background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px',
          padding: '2rem', boxShadow: '0 25px 70px rgba(0,0,0,0.6)'
        }}>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#00a3ff',
                    brandAccent: '#7000ff',
                    brandButtonText: 'white',
                    defaultButtonBackground: 'rgba(255,255,255,0.06)',
                    defaultButtonBackgroundHover: 'rgba(255,255,255,0.1)',
                    inputBackground: 'rgba(255,255,255,0.05)',
                    inputBorder: 'rgba(255,255,255,0.12)',
                    inputBorderHover: '#00a3ff',
                    inputBorderFocus: '#00a3ff',
                    inputText: '#ffffff',
                    inputPlaceholder: '#666666',
                    messageText: '#a0a0a0',
                    anchorTextColor: '#00a3ff',
                    anchorTextHoverColor: '#7000ff',
                  },
                  radii: {
                    borderRadiusButton: '10px',
                    inputBorderRadius: '10px',
                  },
                  fontSizes: {
                    baseBodySize: '14px',
                    baseInputSize: '14px',
                  }
                }
              },
              style: {
                button: { fontWeight: '600', letterSpacing: '0.02em' },
                input: { color: '#ffffff' },
                label: { color: '#a0a0a0', fontSize: '0.82rem' },
                anchor: { fontWeight: '600' },
                container: { color: '#ffffff' },
                message: { color: '#a0a0a0' }
              }
            }}
            providers={['google']}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Alamat Email',
                  password_label: 'Kata Sandi',
                  email_input_placeholder: 'email@anda.com',
                  password_input_placeholder: 'Kata sandi Anda',
                  button_label: 'Masuk',
                  loading_button_label: 'Sedang masuk...',
                  social_provider_text: 'Masuk dengan {{provider}}',
                  link_text: 'Sudah punya akun? Masuk',
                },
                sign_up: {
                  email_label: 'Alamat Email',
                  password_label: 'Buat Kata Sandi',
                  email_input_placeholder: 'email@anda.com',
                  password_input_placeholder: 'Minimal 8 karakter',
                  button_label: 'Daftar Sekarang',
                  loading_button_label: 'Sedang mendaftar...',
                  social_provider_text: 'Daftar dengan {{provider}}',
                  link_text: 'Belum punya akun? Daftar',
                  confirmation_text: 'Cek email Anda untuk konfirmasi pendaftaran'
                },
                forgotten_password: {
                  link_text: 'Lupa kata sandi?',
                  button_label: 'Kirim instruksi reset',
                  loading_button_label: 'Mengirim...',
                  email_label: 'Alamat Email',
                  email_input_placeholder: 'email@anda.com',
                  confirmation_text: 'Cek email Anda untuk link reset kata sandi'
                }
              }
            }}
          />
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          Dengan masuk, Anda menyetujui Syarat Penggunaan dan Kebijakan Privasi kami.
        </p>
      </div>

      <style>{`
        @keyframes floatA { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-30px)} }
        @keyframes floatB { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-25px,20px)} }
      `}</style>
    </div>
  );
};

export default LoginPage;
