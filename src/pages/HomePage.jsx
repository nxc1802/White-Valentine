import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import '../styles/home.css';

const CARDS = [
  {
    to: '/music',
    icon: '🎵',
    label: 'Our Songs',
    name: 'Giai Điệu Tình Yêu',
    desc: 'Những bài hát gợi nhớ về mình',
    color: 'card-music',
    accent: '♪',
  },
  {
    to: '/letter',
    icon: '💌',
    label: 'Love Letters',
    name: 'Thư Tình',
    desc: 'Những tâm sự từ trái tim của hai đứa',
    color: 'card-letter',
    accent: '✉',
  },
  {
    to: '/gallery',
    icon: '🖼️',
    label: 'Our Memories',
    name: 'Kỷ Niệm',
    desc: 'Những khoảnh khắc mình sẽ không bao giờ quên',
    color: 'card-gallery',
    accent: '◈',
  },
  {
    to: '/photobooth',
    icon: '📷',
    label: 'Photobooth',
    name: 'Photo Booth',
    desc: 'Ảnh booth chụp cùng nhau 🎞️',
    color: 'card-photobooth',
    accent: '◻',
  },
  {
    to: '/wishlist',
    icon: '✨',
    label: 'Wishlist',
    name: 'Điều Ước',
    desc: 'Những điều mình muốn cùng nhau thực hiện',
    color: 'card-wishlist',
    accent: '★',
  },
  {
    to: '/gift',
    icon: '🎁',
    label: 'Special Gift',
    name: 'Quà Valentine',
    desc: 'Có gì đó thật đặc biệt đang chờ em...',
    color: 'card-gift',
    special: true,
    accent: '♡',
  },
];

function PetalsBg() {
  const icons = ['🌸', '🌺', '✿', '❀', '🌷', '✨', '⭐', '🤍'];
  const petals = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    icon: icons[i % icons.length],
    left: `${(i / 20) * 100}%`,
    size: `${0.6 + Math.random() * 0.8}rem`,
    dur:  `${14 + Math.random() * 12}s`,
    delay:`${Math.random() * 14}s`,
    drift:`${Math.random() * 80 - 40}px`,
    opacity: 0.2 + Math.random() * 0.35,
  }));
  return (
    <div className="petals-bg">
      {petals.map(p => (
        <span key={p.id} className="petal" style={{
          left: p.left, fontSize: p.size,
          animationDuration: p.dur, animationDelay: p.delay,
          '--drift': p.drift,
          opacity: p.opacity,
        }}>{p.icon}</span>
      ))}
    </div>
  );
}

export default function HomePage() {
  const headerRef = useRef(null);
  const gridRef   = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from(headerRef.current, { opacity: 0, y: -35, duration: 0.8 })
      .from(gridRef.current.children, {
        opacity: 0, y: 55, scale: 0.88,
        stagger: 0.1, duration: 0.65,
        ease: 'back.out(1.3)',
      }, '-=0.3')
      .from(footerRef.current, { opacity: 0, y: 15, duration: 0.5 }, '-=0.2');
  }, []);

  return (
    <div className="home-page">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
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

      {/* Bento grid */}
      <nav className="menu-bento" ref={gridRef}>
        {CARDS.map(card => (
          <Link
            key={card.to}
            to={card.to}
            className={`menu-card ${card.color} ${card.special ? 'card-special' : ''}`}
          >
            <div className="card-accent-bar" />
            {card.special && <span className="card-special-badge">Special ✨</span>}
            <div className="card-icon-wrap">{card.icon}</div>
            <span className="card-label">{card.label}</span>
            <h2 className="card-name">{card.name}</h2>
            <p className="card-desc">{card.desc}</p>
            <span className="card-arrow">→</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <footer className="home-footer" ref={footerRef}>
        <p>
          Made with{' '}
          <span className="animate-heartbeat" style={{ display: 'inline-block' }}>🤍</span>
          {' '}just for you — White Valentine 2026
        </p>
      </footer>
    </div>
  );
}
