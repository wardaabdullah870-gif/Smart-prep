// src/Auth.jsx
import { useState } from 'react';
import { supabase } from './supabase';
import { Utensils, Mail, Lock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage("Account created! You can now log in.");
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      
      {/* LEFT PANEL: The Visuals */}
      <div 
        className="auth-left-panel"
        style={{ 
          flex: 1, 
          backgroundImage: 'url(https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2000&auto=format&fit=crop)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px 60px',
          overflow: 'hidden'
        }}
      >
        {/* Dark, luxurious gradient overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, rgba(4, 120, 87, 0.95), rgba(6, 78, 59, 0.8))' }}></div>
        
        <div style={{ position: 'relative', zIndex: 1, color: 'white', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', fontWeight: '700', letterSpacing: '-0.5px' }}>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '8px', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
            <Utensils size={24} color="white" />
          </div>
          SmartPrep
        </div>

        <div style={{ position: 'relative', zIndex: 1, color: 'white', maxWidth: '480px' }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '24px', lineHeight: '1.1', letterSpacing: '-1.5px' }}>
            Eat healthy. <br/> Without the stress.
          </h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, lineHeight: '1.6', fontWeight: '400' }}>
            SmartPrep automatically plans your week, filters out harmful ingredients based on your health, and generates precise grocery lists for your family.
          </p>
        </div>

        {/* Feature Tags instead of fake numbers */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', padding: '10px 16px', borderRadius: '50px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <ShieldCheck size={18} color="white" /> 
            <span style={{ color: 'white', fontSize: '0.9rem', fontWeight: '500' }}>Health Filters</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', padding: '10px 16px', borderRadius: '50px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <Sparkles size={18} color="white" /> 
            <span style={{ color: 'white', fontSize: '0.9rem', fontWeight: '500' }}>Auto-Groceries</span>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: The Form */}
      <div style={{ 
        flex: 1.2, 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '40px',
        background: '#fafafa',
        position: 'relative'
      }}>
        
        {/* Subtle background decoration */}
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '400px', height: '400px', background: '#ecfdf5', borderRadius: '50%', filter: 'blur(80px)', zIndex: 0 }}></div>

        <div style={{ 
          width: '100%', 
          maxWidth: '440px', 
          background: '#ffffff', 
          padding: '50px', 
          borderRadius: '32px', 
          boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.05)',
          position: 'relative',
          zIndex: 1,
          border: '1px solid #f1f5f9'
        }}>
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '8px', color: '#0f172a', fontWeight: '800', letterSpacing: '-0.5px' }}>
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h1>
            <p style={{ color: '#64748b', fontSize: '1rem' }}>
              {isLogin ? 'Enter your details to access your plan.' : 'Start planning your healthy week today.'}
            </p>
          </div>

          {error && <div style={{ background: '#fef2f2', color: '#dc2626', padding: '14px', borderRadius: '12px', marginBottom: '24px', fontSize: '0.9rem', textAlign: 'center', fontWeight: '500' }}>{error}</div>}
          {message && <div style={{ background: '#f0fdf4', color: '#16a34a', padding: '14px', borderRadius: '12px', marginBottom: '24px', fontSize: '0.9rem', textAlign: 'center', fontWeight: '500' }}>{message}</div>}

          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '0.85rem', color: '#475569' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={20} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="name@example.com"
                  style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '14px', border: 'none', fontSize: '1rem', background: '#f1f5f9', boxSizing: 'border-box', outline: 'none', transition: 'all 0.2s', color: '#0f172a' }} 
                  onFocus={(e) => { e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 2px #10b981'; }}
                  onBlur={(e) => { e.target.style.background = '#f1f5f9'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '0.85rem', color: '#475569' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={20} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="password" 
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••"
                  style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '14px', border: 'none', fontSize: '1rem', background: '#f1f5f9', boxSizing: 'border-box', outline: 'none', transition: 'all 0.2s', color: '#0f172a' }} 
                  onFocus={(e) => { e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 2px #10b981'; }}
                  onBlur={(e) => { e.target.style.background = '#f1f5f9'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                marginTop: '10px', 
                padding: '18px', 
                fontSize: '1rem', 
                fontWeight: '700',
                color: 'white',
                background: '#0f172a', 
                border: 'none',
                borderRadius: '14px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                transition: 'all 0.2s',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseOver={(e) => { e.target.style.background = '#1e293b'; }}
              onMouseOut={(e) => { e.target.style.background = '#0f172a'; }}
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.95rem', color: '#64748b' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(null); setMessage(null); }} 
              style={{ background: 'none', border: 'none', color: '#0f172a', fontWeight: '700', cursor: 'pointer', padding: 0 }}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}