import { useState } from 'react';
import { pb } from './pocketbase';
import robotBg from '../assets/avatar.png';

export default function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await pb.collection('users').authWithPassword(email.trim(), password);
      setError('');
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setError(err.message || 'Correo o contraseña incorrectos.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#050807',
      backgroundImage: `linear-gradient(rgba(5, 8, 7, 0.88), rgba(5, 8, 7, 0.94)), url(${robotBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      boxSizing: 'border-box',
      fontFamily: "'Segoe UI', Roboto, sans-serif"
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: 'rgba(13, 22, 18, 0.9)',
        border: '1px solid #1e3a2b',
        borderRadius: '16px',
        padding: '30px',
        color: '#ffffff',
        backdropFilter: 'blur(4px)',
        boxSizing: 'border-box'
      }}>
        <h2 style={{ textAlign: 'center', color: '#22c55e', marginTop: 0 }}>Iniciar Sesión</h2>

        {error && (
          <div style={{ color: '#f87171', marginBottom: '15px', textAlign: 'center', fontSize: '0.9rem' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#cbd5e1' }}>
              Correo electrónico
            </label>
            <input 
              type="email" 
              name="email"
              autoComplete="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="tu_correo@gmail.com"
              required 
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #274e37',
                backgroundColor: '#070d0a',
                color: '#ffffff',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#cbd5e1' }}>
              Contraseña
            </label>
            <input 
              type="password" 
              name="password"
              autoComplete="current-password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••••••"
              required 
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #274e37',
                backgroundColor: '#070d0a',
                color: '#ffffff',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          </div>

          <button 
            type="submit"
            style={{
              backgroundColor: '#16a34a',
              color: '#ffffff',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              marginTop: '10px',
              transition: 'background 0.2s'
            }}
          >
            Entrar al Panel
          </button>
        </form>
      </div>
    </div>
  );
} 