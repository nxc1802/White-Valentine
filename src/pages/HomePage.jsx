import { useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import '../styles/home.css';

const CARDS = [
  { to: '/music',      icon: '🎵', title: 'Our Songs',    desc: 'Songs that remind me of us',                color: 'card-music' },
  { to: '/letter',     icon: '💌', title: 'Thư Tình',     desc: 'Những tâm sự từ trái tim của hai đứa',     color: 'card-letter' },
  { to: '/gallery',    icon: '🖼️', title: 'Our Memories', desc: 'Những khoảnh khắc mình sẽ không bao giờ quên', color: 'card-gallery' },
  { to: '/photobooth', icon: '📷', title: 'Photobooth',   desc: 'Ảnh booth chụp cùng nhau 🎞️',             color: 'card-photobooth' },
  { to: '/wishlist',   icon: '✨', title: 'Điều Ước',     desc: 'Những điều mình muốn cùng nhau thực hiện', color: 'card-wishlist' },
  { to: '/gift',       icon: '🎁', title: 'Quà Valentine',desc: 'Có gì đó thật đặc biệt đang chờ em...',    color: 'card-gift', special: true },
];

const PETAL_ICONS = ['🌸', '🌺', '🌷', '✨', '💮', '💕'];

function PetalsBg() {
  // useMemo so petals are stable across re-renders (avoids animation restart)
  const petals = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      icon: PETAL_ICONS[i % PETAL_ICONS.length],
      left: `${(i / 18) * 100}%`,
      size: `${0.7 + (i % 5) * 0.18}rem`,
      dur:  `${13 + (i % 7) * 1.8}s`,
      delay:`${(i % 9) * 1.4}s`,
      drift:`${(i % 2 === 0 ? 1 : -1) * (20 + (i % 4) * 15)}px`,
    })), []);

  return (
    <div className="petals-bg">
      {petals.map(p => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            fontSize: p.size,
            animationDuration: p.dur,
            animationDelay: p.delay,
            '--drift': p.drift,
          }}
        >{p.icon}</span>
      ))}
    </div>
  );
}

export default function HomePage() {
  const headerRef = useRef(null);
  const gridRef   = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out', force3D: true },
    });
    tl.from(headerRef.current, { opacity: 0, y: -40, duration: 0.85 })
      .from(Array.from(gridRef.current.children), {
        opacity: 0, y: 60, scale: 0.88,
        stagger: 0.12, duration: 0.65,
        ease: 'back.out(1.35)',
        force3D: true,
      }, '-=0.4')
      .from(footerRef.current, { opacity: 0, y: 18, duration: 0.5 }, '-=0.2');
  }, []);

  return (
    <div className="home-page">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <PetalsBg />

      {/* Header */}
      <header className="home-header" ref={headerRef}>
        <div className="home-event-tag">
          <span>🤍</span>
          Valentine Trắng · 14 tháng 3, 2026
          <span>🤍</span>
        </div>
        <h1 className="page-title home-title">Hộp Quà Của Em</h1>
        <p className="home-subtitle">A little piece of my heart, made just for you</p>
        <div className="home-divider">
          <span className="home-divider-line" />
          <span className="home-divider-heart">❋</span>
          <span className="home-divider-line" />
        </div>
      </header>

      {/* 2-column grid */}
      <nav className="menu-grid" ref={gridRef}>
        {CARDS.map(card => (
          <Link
            key={card.to}
            to={card.to}
            className={`menu-card ${card.color} ${card.special ? 'card-special' : ''}`}
          >
            <div className="card-glow" />
            {card.special && <span className="card-badge">Special ✨</span>}
            <div className="card-icon">{card.icon}</div>
            <div className="card-text-wrap">
              <h2 className="card-title">{card.title}</h2>
              <p className="card-desc">{card.desc}</p>
            </div>
            <span className="card-arrow">→</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <footer className="home-footer" ref={footerRef}>
        <p>
          Made with{' '}
          <span className="animate-heartbeat" style={{ display: 'inline-block' }}>🩷</span>
          {' '}just for you — White Valentine 2026
        </p>
      </footer>
    </div>
  );
}
