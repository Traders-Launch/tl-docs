import React, { useState, useEffect } from 'react';

const PASSWORD = 'tl';
const STORAGE_KEY = 'tl-docs-auth';

export default function Root({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if already authenticated
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'true');
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#1b1b1d',
        color: '#fff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}>
        <div style={{
          padding: '2rem',
          borderRadius: '8px',
          backgroundColor: '#242526',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
          textAlign: 'center',
          maxWidth: '320px',
          width: '100%',
        }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Traders Launch Docs</h1>
          <p style={{ color: '#999', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Enter password to continue
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: error ? '1px solid #e74c3c' : '1px solid #444',
                backgroundColor: '#1b1b1d',
                color: '#fff',
                fontSize: '1rem',
                marginBottom: '1rem',
                boxSizing: 'border-box',
              }}
            />
            {error && (
              <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginBottom: '1rem' }}>
                Incorrect password
              </p>
            )}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: '#25c2a0',
                color: '#fff',
                fontSize: '1rem',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
