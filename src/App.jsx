import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PRDForm from './components/PRDForm';
import PRDResult from './components/PRDResult';
import LoginPage from './components/LoginPage';
import { supabase } from './lib/supabaseClient';
import { samplePRD } from './data/samplePRD';
import './index.css';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ACTIVE = SUPABASE_URL && !SUPABASE_URL.includes('GANTI');

function App() {
  const [view, setView] = useState('hero');
  const [prdData, setPrdData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Supabase Auth listener
  useEffect(() => {
    if (!SUPABASE_ACTIVE) {
      setAuthLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const startGeneration = () => {
    // Jika Supabase aktif dan user belum login, tampilkan halaman login
    if (SUPABASE_ACTIVE && !user) {
      setView('login');
      return;
    }
    setView('form');
  };

  const handleViewExample = () => {
    setPrdData(samplePRD);
    setView('result');
  };

  const repairJSON = (str) => {
    try {
      return str.trim().replace(/,\s*([}\]])/g, '$1');
    } catch (e) { return str; }
  };

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    setView('result');
    try {
      console.log("🚀 Menjalankan Mode: Groq Cloud (Llama 3 70B - Lightning Fast)");
      
      const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
      const endpoint = "https://api.groq.com/openai/v1/chat/completions";

      const systemPrompt = `Anda adalah Senior Product Manager dan Software Architect.
Tugas: Buat PRD PROFESIONAL LENGKAP dan DETAIL dalam Bahasa Indonesia.
Format Output: WAJIB JSON VALID. Jangan sertakan teks penjelasan di luar JSON.

Skema JSON:
{
  "title": "Nama Produk",
  "version": "1.0.0",
  "vision": "Visi produk (2-3 kalimat)",
  "overview": "Ringkasan produk komprehensif",
  "userStories": [{"id": 1, "epic": "Epic", "role": "Role", "action": "Action", "benefit": "Benefit", "priority": "High", "storyPoints": 3, "acceptanceCriteria": ["Criteria"]}],
  "functionalSpecs": [{"module": "Modul", "features": ["Fitur"], "description": "Deskripsi"}],
  "databaseSchema": "SQL CREATE TABLE (PostgreSQL) minimal 4 tabel.",
  "techStack": {"frontend": [], "backend": [], "database": [], "infrastructure": []},
  "systemArchitecture": "Deskripsi arsitektur",
  "apiDocs": [{"method": "GET", "endpoint": "/api", "auth": "None", "desc": "Desc"}],
  "roadmap": [{"phase": "P1", "duration": "1W", "deliverables": [], "milestone": "M1"}],
  "designTips": "UI/UX Guide"
}`;

      const userPrompt = `Buat PRD Lengkap untuk produk:\nNama: ${formData.productName}\nVisi: ${formData.vision}\nTarget: ${formData.targetAudience}\nFitur: ${formData.coreFeatures}\nSkala: ${formData.technicalScale}`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile", // Model terbaru, tercepat & pintar
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          response_format: { type: "json_object" }, // Memastikan output JSON
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(`Groq API Error: ${errData.error?.message || response.statusText}`);
      }

      const result = await response.json();
      const content = result.choices?.[0]?.message?.content;

      if (!content) throw new Error("Gagal mendapatkan respons dari Groq.");

      try {
        setPrdData(JSON.parse(content));
      } catch (e) {
        console.error("Parse Error:", content);
        throw new Error("Gagal mengolah format AI. Silakan coba lagi.");
      }


    } catch (error) {
      alert(`Terjadi kesalahan: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Loading screen
  if (SUPABASE_ACTIVE && authLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '44px', height: '44px', margin: '0 auto 1rem', border: '3px solid rgba(0,163,255,0.2)', borderTopColor: '#00a3ff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <p style={{ color: 'var(--text-muted)' }}>Memuat...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  const goToLogin = () => setView('login');

  return (
    <div className="App">
      <Navbar 
        user={user} 
        onStart={startGeneration} 
        onLogin={goToLogin}
        onViewExample={handleViewExample}
      />

      <main style={{ flex: 1, padding: '1rem' }}>
        {view === 'hero' && (
          <Hero 
            onStart={startGeneration} 
            onViewExample={handleViewExample} 
          />
        )}
        {view === 'login' && (
          <div style={{ minHeight: '100vh' }}>
            <LoginPage />
          </div>
        )}
        {view === 'form' && (
          <div className="container section-padding">
            <PRDForm onSubmit={handleFormSubmit} onBack={() => setView('hero')} />
          </div>
        )}
        {view === 'result' && (
          <div className="container section-padding">
            <PRDResult data={prdData} loading={isLoading} onReset={() => setView('hero')} />
          </div>
        )}
      </main>
      <footer style={{
        padding: '2rem 0', textAlign: 'center',
        borderTop: '1px solid var(--glass-border)', marginTop: '4rem',
        color: 'var(--text-muted)', fontSize: '0.9rem'
      }}>
        © 2026 Nusantara AI
      </footer>
    </div>
  );
}

export default App;
