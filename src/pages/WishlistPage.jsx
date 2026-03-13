import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import '../styles/wishlist.css';
import { insertWishItem, toggleWishItem, updateWishItem, deleteWishItem } from '../lib/supabase';
import { getWishlist, invalidateWishlist } from '../lib/prefetch';

const GIFT_ICONS  = ['🎁','💝','👗','💍','👜','🌸','🍰','💄','🎀','📱','✈️','🛍️','💎','🕯️','🌹','🧸','🎧','📷','💐','🍫'];
const EVENT_ICONS = ['🌟','🎡','🏖️','🍽️','🎬','📸','🌃','💃','🎠','🌄','🎭','🏕️','🎪','🚢','🌺','🎢','🎆','🛳️','🗺️','🌙'];

const GIFT_COLORS = [
  { bg: '#fffaf0', border: 'rgba(184,146,42,0.2)',  text: '#8b6914' },
  { bg: '#fdf8f5', border: 'rgba(232,180,190,0.28)', text: '#c97080' },
  { bg: '#f5f3ff', border: 'rgba(155,138,222,0.2)', text: '#7060b0' },
  { bg: '#f0fdf8', border: 'rgba(90,158,128,0.2)',  text: '#5a9e80' },
  { bg: '#fff5f8', border: 'rgba(232,180,190,0.22)', text: '#b07080' },
];
const EVENT_COLORS = [
  { bg: '#fdf5e0', border: 'rgba(232,196,120,0.28)', text: '#a08020' },
  { bg: '#f0f5ff', border: 'rgba(143,196,232,0.28)', text: '#5a8eb0' },
  { bg: '#fdf0f5', border: 'rgba(232,180,190,0.28)', text: '#c07080' },
  { bg: '#f5f0ff', border: 'rgba(180,155,222,0.22)', text: '#7060b0' },
  { bg: '#f0fff8', border: 'rgba(90,200,160,0.22)',  text: '#3a9e70' },
];

/* ─── Modal ─────────────────────────────────────────────────── */
function WishModal({ initial, onSave, onClose }) {
  const overlayRef = useRef(null);
  const cardRef    = useRef(null);
  const isEdit     = !!initial;
  const [form, setForm] = useState(initial
    ? { type: initial.type, author: initial.author, icon: initial.icon, title: initial.title, description: initial.description || '' }
    : { type: 'gift', author: 'Đạt', icon: '🎁', title: '', description: '' }
  );
  const [saving, setSaving] = useState(false);
  const icons = form.type === 'gift' ? GIFT_ICONS : EVENT_ICONS;

  useEffect(() => {
    gsap.from(overlayRef.current, { opacity: 0, duration: 0.25 });
    gsap.from(cardRef.current, { opacity: 0, scale: 0.9, y: 30, duration: 0.4, ease: 'back.out(1.5)' });
  }, []);

  function close() { gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, onComplete: onClose }); }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim() || saving) return;
    setSaving(true);
    await onSave({ ...form, title: form.title.trim(), description: form.description.trim() || null });
    close();
  }

  return (
    <div className="wish-overlay" ref={overlayRef} onClick={close}>
      <div className="wish-modal" ref={cardRef} onClick={e => e.stopPropagation()}>
        <button className="wish-modal-close" onClick={close}>✕</button>
        <h2 className="wish-modal-title">
          {isEdit ? '✏️ Sửa mục' : '✨ Thêm điều ước mới'}
        </h2>
        <form className="wish-form" onSubmit={handleSubmit}>
          {!isEdit && (
            <div className="wish-form-field">
              <label className="wish-form-label">Loại</label>
              <div className="wish-type-selector">
                <button type="button" className={`wish-type-btn ${form.type === 'gift' ? 'active-gift' : ''}`}
                  onClick={() => setForm(f => ({ ...f, type: 'gift', icon: '🎁' }))}>🎁 Quà muốn nhận</button>
                <button type="button" className={`wish-type-btn ${form.type === 'event' ? 'active-event' : ''}`}
                  onClick={() => setForm(f => ({ ...f, type: 'event', icon: '🌟' }))}>🌟 Kỷ niệm muốn có</button>
              </div>
            </div>
          )}
          <div className="wish-form-field">
            <label className="wish-form-label">Ai muốn?</label>
            <div className="wish-author-selector">
              {['Đạt', 'Linh'].map(a => (
                <button key={a} type="button"
                  className={`wish-author-btn ${form.author === a ? (a === 'Đạt' ? 'sel-anh' : 'sel-em') : ''}`}
                  onClick={() => setForm(prev => ({ ...prev, author: a }))}>
                  {a === 'Đạt' ? '💙' : '🩷'} {a}
                </button>
              ))}
            </div>
          </div>
          <div className="wish-form-field">
            <label className="wish-form-label">Icon</label>
            <div className="wish-icon-picker">
              {icons.map(ic => (
                <button key={ic} type="button"
                  className={`wish-icon-btn ${form.icon === ic ? 'selected' : ''}`}
                  onClick={() => setForm(f => ({ ...f, icon: ic }))}>{ic}</button>
              ))}
            </div>
          </div>
          <div className="wish-form-field">
            <label className="wish-form-label">Tên *</label>
            <input className="wish-form-input" placeholder={form.type === 'gift' ? 'Tên món quà...' : 'Tên sự kiện...'}
              value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} maxLength={80} required />
          </div>
          <div className="wish-form-field">
            <label className="wish-form-label">Mô tả (tùy chọn)</label>
            <textarea className="wish-form-textarea" rows={3}
              placeholder={form.type === 'gift' ? 'Link, màu sắc, size...' : 'Muốn đi đâu, làm gì...'}
              value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          </div>
          <div className="wish-form-actions">
            <button type="button" className="wish-btn-cancel" onClick={close}>Hủy</button>
            <button type="submit" className="wish-btn-save" disabled={saving}>
              {saving ? 'Đang lưu...' : isEdit ? 'Lưu thay đổi 💾' : 'Thêm vào danh sách ✨'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── Wish Card ─────────────────────────────────────────────── */
function WishCard({ item, colorPalette, onToggle, onEdit, onDeleteConfirm, isDeleteConfirm }) {
  const col  = colorPalette[item.id % colorPalette.length] ?? colorPalette[0];
  const done = item.status === 'done';
  return (
    <div className={`wish-card ${done ? 'wish-done' : ''} ${isDeleteConfirm ? 'wish-deleting' : ''}`}
      style={{ '--wc-bg': col.bg, '--wc-border': col.border, '--wc-text': col.text }}>
      <div className="wish-card-deco">{item.type === 'gift' ? '🎀' : '⭐'}</div>
      <div className="wish-card-icon">{item.icon}</div>
      <h3 className="wish-card-title">{item.title}</h3>
      <span className={`wish-author-badge ${item.author === 'Đạt' ? 'badge-anh' : 'badge-em'}`}>
        {item.author === 'Đạt' ? '💙' : '🩷'} {item.author}
      </span>
      {item.description && <p className="wish-card-desc">{item.description}</p>}
      <div className="wish-card-actions">
        <button className={`wish-toggle-btn ${done ? 'toggle-done' : ''}`}
          onClick={e => { e.stopPropagation(); onToggle(item); }}>
          {done
            ? (item.type === 'gift' ? '🎉 Đã nhận' : '✅ Đã trải nghiệm')
            : (item.type === 'gift' ? '○ Chưa nhận' : '○ Chưa làm')}
        </button>
        <button className="wish-edit-btn" onClick={e => { e.stopPropagation(); onEdit(item); }}>✏️</button>
      </div>
      {isDeleteConfirm && (
        <div className="wish-delete-overlay" onClick={e => e.stopPropagation()}>
          <p className="wish-delete-text">Xoá mục này?</p>
          <div className="wish-delete-actions">
            <button className="wish-del-cancel" onClick={e => { e.stopPropagation(); onDeleteConfirm(null); }}>Huỷ</button>
            <button className="wish-del-confirm" onClick={e => { e.stopPropagation(); onDeleteConfirm(item.id); }}>Xoá 🗑️</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────── */
export default function WishlistPage() {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setTab]   = useState('gift');
  const [showForm, setShowForm]   = useState(false);
  const [editItem, setEditItem]   = useState(null);
  const [deleteId, setDeleteId]   = useState(null);
  const longPressTimer = useRef(null);
  const didLongPress   = useRef(false);
  const boardRef  = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    getWishlist()
      .then(data => {
        // Normalize names for consistent filtering and display
        setItems(data.map(i => {
          let author = i.author;
          if (author === 'Anh') author = 'Đạt';
          if (author === 'Em')  author = 'Linh';
          return { ...i, author };
        }));
      })
      .catch(err => {
        console.error('Fetch wishlist error:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading) return;
    if (headerRef.current) gsap.from(headerRef.current, { opacity: 0, y: -30, duration: 0.6, ease: 'power2.out' });
    if (boardRef.current) {
      const cards = boardRef.current.querySelectorAll('.wish-card, .wish-add-card');
      gsap.from(cards, { opacity: 0, y: 40, scale: 0.92, stagger: 0.07, duration: 0.45, ease: 'back.out(1.3)', delay: 0.15 });
    }
  }, [loading, activeTab]);

  const displayed  = items.filter(i => i.type === activeTab);
  const giftCount  = items.filter(i => i.type === 'gift').length;
  const eventCount = items.filter(i => i.type === 'event').length;
  const giftDone   = items.filter(i => i.type === 'gift'  && i.status === 'done').length;
  const eventDone  = items.filter(i => i.type === 'event' && i.status === 'done').length;

  async function handleAdd(form) {
    try {
      const saved = await insertWishItem(form);
      setItems(prev => [...prev, saved]);
      invalidateWishlist();
    } catch (err) { 
      console.error('Add wish error:', err);
      alert('Không thể thêm mục mới. Vui lòng thử lại!');
    }
  }

  async function handleEditSave(id, form) {
    try {
      await updateWishItem(id, form);
      setItems(prev => prev.map(i => i.id === id ? { ...i, ...form } : i));
      invalidateWishlist();
    } catch (err) { console.error(err); }
    setEditItem(null);
  }

  async function handleToggle(item) {
    const next = item.status === 'done' ? 'pending' : 'done';
    try {
      await toggleWishItem(item.id, next);
      setItems(prev => prev.map(i => i.id === item.id ? { ...i, status: next } : i));
      invalidateWishlist();
    } catch (err) { console.error(err); }
  }

  async function handleDelete(id) {
    setDeleteId(null);
    if (!id) return;
    try {
      await deleteWishItem(id);
      setItems(prev => prev.filter(i => i.id !== id));
      invalidateWishlist();
    } catch (err) { console.error(err); }
  }

  function startLongPress(id) {
    didLongPress.current = false;
    longPressTimer.current = setTimeout(() => { didLongPress.current = true; setDeleteId(id); }, 650);
  }
  function cancelLongPress() { clearTimeout(longPressTimer.current); }

  const colorPalette = activeTab === 'gift' ? GIFT_COLORS : EVENT_COLORS;

  return (
    <div className="wish-page">
      <div className="orb orb-1" /><div className="orb orb-2" />
      <div className="wish-bg" />
      <Link to="/home" className="back-btn">← Back</Link>

      <div className="wish-header" ref={headerRef}>
        <h1 className="page-title">Danh Sách Ước Mơ ✨</h1>
        <p className="page-subtitle">Những điều Đạt và Linh muốn thực hiện cùng nhau 🤍</p>
        <span className="gold-divider" />
        <div className="wish-tabs" style={{ marginTop: '1rem' }}>
          <button className={`wish-tab ${activeTab === 'gift' ? 'active' : ''}`} onClick={() => setTab('gift')}>
            🎁 Wishes
            <span className="wish-tab-badge">{giftDone}/{giftCount}</span>
          </button>
          <button className={`wish-tab ${activeTab === 'event' ? 'active' : ''}`} onClick={() => setTab('event')}>
            🌟 Plans
            <span className="wish-tab-badge">{eventDone}/{eventCount}</span>
          </button>
        </div>
      </div>

      <div className="wish-board" ref={boardRef}>
        {loading && <div className="wish-loading">Đang tải... ✨</div>}
        {displayed.map(item => (
          <div key={item.id}
            onMouseDown={() => startLongPress(item.id)}
            onMouseUp={cancelLongPress}
            onMouseLeave={cancelLongPress}
            onTouchStart={() => startLongPress(item.id)}
            onTouchEnd={cancelLongPress}
            onTouchMove={cancelLongPress}>
            <WishCard item={item} colorPalette={colorPalette}
              onToggle={handleToggle}
              onEdit={item => { if (!didLongPress.current) setEditItem(item); didLongPress.current = false; }}
              onDeleteConfirm={handleDelete}
              isDeleteConfirm={deleteId === item.id} />
          </div>
        ))}
        <div className="wish-add-card" onClick={() => setShowForm(true)}>
          <span className="wish-add-icon">+</span>
          <p className="wish-add-text">Thêm điều ước mới</p>
        </div>
      </div>

      {showForm  && <WishModal onSave={handleAdd} onClose={() => setShowForm(false)} />}
      {editItem  && <WishModal initial={editItem} onSave={form => handleEditSave(editItem.id, form)} onClose={() => setEditItem(null)} />}
    </div>
  );
}
