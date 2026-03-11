import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import '../styles/password.css';
import { PASSWORDS } from '../config/passwords';
import { prefetchAll, getPasswords } from '../lib/prefetch';

function getSessionEntry(list) {
  const cached = sessionStorage.getItem('vt_pw_idx');
  if (cached !== null) {
    const idx = parseInt(cached, 10);
    return list[idx % list.length] ?? list[0];
  }
  const idx = Math.floor(Math.random() * list.length);
  sessionStorage.setItem('vt_pw_idx', String(idx));
  return list[idx];
}

/* White petals rain */
function PetalsRain() {
  const petals = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    icon: ['🌸', '🌺', '🤍', '✿', '❀', '✨', '🌷', '⭐'][i % 8],
    left: `${(i / 24) * 100}%`,
    size: `${0.7 + Math.random() * 0.9}rem`,
    dur:  `${12 + Math.random() * 14}s`,
    delay:`${Math.random() * 12}s`,
    drift:`${Math.random() * 70 - 35}px`,
    opacity: 0.25 + Math.random() * 0.5,
  }));
  return (
    <div className="petals-rain">
      {petals.map(p => (
        <span key={p.id} className="rain-petal" style={{
          left: p.left,
          fontSize: p.size,
          animationDuration: p.dur,
          animationDelay: p.delay,
          '--drift': p.drift,
          opacity: p.opacity,
        }}>{p.icon}</span>
      ))}
    </div>
  );
}

export default function PasswordPage() {
  const navigate = useNavigate();
  const [entry, setEntry] = useState(() => getSessionEntry(PASSWORDS));
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const cardRef = useRef(null);
  const iconRef = useRef(null);
  const explosionRef = useRef(null);

  useEffect(() => {
    if (sessionStorage.getItem('vt_unlocked') === 'true') {
      navigate('/home', { replace: true });
      return;
    }

    getPasswords().then(data => {
      if (data && data.length > 0) setEntry(getSessionEntry(data));
    });

    gsap.from(cardRef.current, {
      opacity: 0, y: 60, scale: 0.9,
      duration: 1.1, ease: 'back.out(1.5)',
    });
  }, [navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    if (password.trim().toLowerCase() === entry.password.toLowerCase()) {
      handleSuccess();
    } else {
      handleError();
    }
  }

  function handleError() {
    setError(true);
    setPassword('');
    setTimeout(() => setError(false), 3000);
    gsap.to(cardRef.current, {
      keyframes: { x: [-10, 10, -8, 8, -4, 4, 0] },
      duration: 0.55, ease: 'none',
    });
    gsap.to(iconRef.current, { rotation: -12, duration: 0.1, yoyo: true, repeat: 5 });
  }

  function handleSuccess() {
    triggerExplosion();
    gsap.timeline()
      .to(iconRef.current, { rotation: 360, scale: 1.25, duration: 0.7, ease: 'back.out(2)' })
      .to(cardRef.current, {
        opacity: 0, scale: 0.9, y: -40, duration: 0.5, delay: 1.1,
        onComplete: () => {
          sessionStorage.setItem('vt_unlocked', 'true');
          prefetchAll();
          navigate('/home');
        },
      });
  }

  function triggerExplosion() {
    const container = explosionRef.current;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const particles = ['🤍', '💛', '🌸', '✨', '🌺', '⭐', '💮', '🌼'];
    for (let i = 0; i < 52; i++) {
      const el = document.createElement('div');
      el.className = 'explode-particle';
      el.textContent = particles[Math.floor(Math.random() * particles.length)];
      const angle = (i / 52) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const d1 = 60 + Math.random() * 160;
      const d2 = 140 + Math.random() * 300;
      el.style.left = cx + 'px';
      el.style.top  = cy + 'px';
      el.style.setProperty('--vx',   Math.cos(angle) * d1 + 'px');
      el.style.setProperty('--vy',   Math.sin(angle) * d1 + 'px');
      el.style.setProperty('--vx2',  Math.cos(angle) * d2 + 'px');
      el.style.setProperty('--vy2',  Math.sin(angle) * d2 + 'px');
      el.style.setProperty('--rot',  (Math.random() - 0.5) * 340 + 'deg');
      el.style.setProperty('--rot2', (Math.random() - 0.5) * 480 + 'deg');
      el.style.setProperty('--dur',  (0.7 + Math.random() * 0.8) + 's');
      el.style.animationDelay = (Math.random() * 0.25) + 's';
      el.style.fontSize = (0.9 + Math.random() * 1.6) + 'rem';
      container.appendChild(el);
      setTimeout(() => el.remove(), 2200);
    }
  }

  return (
    <div className="pw-page">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <PetalsRain />
      <div className="pw-ring pw-ring-1" />
      <div className="pw-ring pw-ring-2" />
      <div className="explosion-container" ref={explosionRef} />

      <div className="pw-card" ref={cardRef}>
        {/* Date badge */}
        <div className="pw-date-badge">Valentine Trắng · 14.03.2026</div>

        {/* Icon */}
        <div className="pw-icon-wrap">
          <div className="pw-icon animate-float" ref={iconRef}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="44" height="44">
              <defs>
                <linearGradient id="heartGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#e8c97a" />
                  <stop offset="50%"  stopColor="#c9a040" />
                  <stop offset="100%" stopColor="#8b6914" />
                </linearGradient>
              </defs>
              <path d="M50 85C50 85 12 56 12 33C12 18 24 8 38 8C44 8 50 11 50 11C50 11 56 8 62 8C76 8 88 18 88 33C88 56 50 85 50 85Z"
                fill="url(#heartGold)" />
            </svg>
          </div>
          <span className="pw-corner pw-corner-tl">✦</span>
          <span className="pw-corner pw-corner-tr">✦</span>
          <span className="pw-corner pw-corner-bl">✦</span>
          <span className="pw-corner pw-corner-br">✦</span>
        </div>

        <h1 className="pw-title">For My Love</h1>
        <p className="pw-subtitle">Nhập mật khẩu để mở hộp quà của em 🤍</p>

        <form className="pw-form" onSubmit={handleSubmit}>
          <div className="pw-input-wrap">
            <input
              type="password"
              className="pw-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Mật khẩu bí mật của mình..."
              autoComplete="off"
              spellCheck="false"
              maxLength={30}
            />
          </div>

          {error && (
            <p className="pw-error-msg">
              <span>💔</span> Sai rồi, thử lại nhé em...
            </p>
          )}

          <button type="submit" className="btn-gold" style={{ width: '100%' }}>
            Mở hộp quà ✨
          </button>
        </form>

        <div className="pw-hint-wrap">
          <span className="pw-hint-icon">💡</span>
          <div>
            <span className="pw-hint-label">Gợi ý</span>
            <span className="pw-hint-text">{entry.hint}</span>
          </div>
        </div>

        <p className="pw-footer">
          Made with 🤍 just for you · White Valentine 2026
        </p>
      </div>
    </div>
  );
}
