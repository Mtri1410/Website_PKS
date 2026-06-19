import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import promoModel from '../../assets/promo_model.webp';
import { useLanguage } from '../../context/LanguageContext';

interface NewsletterPopupProps {
  onUnlockDiscount: (discountPercentage: number) => void;
}

export const NewsletterPopup: React.FC<NewsletterPopupProps> = ({ onUnlockDiscount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const { t } = useLanguage();

  useEffect(() => {
    // Check if user has already interacted with popup
    const popupShown = localStorage.getItem('genxpks_popup_interacted');
    if (!popupShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500); // 1.5s delay for luxury e-commerce entrance
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('genxpks_popup_interacted', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSuccess(true);
      onUnlockDiscount(15); // Applies 15% discount automatically
      setTimeout(() => {
        handleClose();
      }, 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Background Overlay */}
      <div 
        className="overlay active" 
        onClick={handleClose} 
        style={{ zIndex: 1000 }} 
      />

      {/* Modal Container */}
      <div 
        className="modal active" 
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          overflow: 'hidden',
          zIndex: 1001,
          maxWidth: '840px',
        }}
      >
        {/* Left Column: Model Image */}
        <div style={{
          position: 'relative',
          backgroundColor: 'var(--color-card-bg)',
          height: '100%',
          minHeight: '480px'
        }}>
          <img 
            src={promoModel} 
            alt="Unlock 15% Discount" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Right Column: Information & Form */}
        <div style={{
          padding: '48px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          textAlign: 'center'
        }}>
          {/* Close button */}
          <button 
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-primary)'
            }}
          >
            <X size={20} />
          </button>

          {!success ? (
            <>
              <span style={{
                fontSize: '11px',
                color: 'var(--color-text-light)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: '16px',
                display: 'block'
              }}>
                {t('popup_exclusive_offer')}
              </span>
              
              <h2 className="font-serif" style={{
                fontSize: '32px',
                lineHeight: 1.25,
                fontWeight: 500,
                marginBottom: '16px'
              }}>
                {t('popup_discount_title')}
              </h2>
              
              <p style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                marginBottom: '28px'
              }}>
                {t('popup_discount_desc')}
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input 
                  type="email" 
                  placeholder={t('footer_subscribe_placeholder')} 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  style={{ textAlign: 'center' }}
                />
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ height: '48px' }}
                >
                  {t('popup_unlock_btn')}
                </button>
              </form>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', animation: 'scaleUp 0.3s ease' }}>
              <span style={{ fontSize: '48px' }}>🎉</span>
              <h2 className="font-serif" style={{ fontSize: '28px' }}>{t('popup_success_title')}</h2>
              <p style={{ fontSize: '14px', color: 'var(--color-success)', fontWeight: 600 }}>
                {t('popup_success_desc')}
              </p>
              <p style={{ fontSize: '12px', color: 'var(--color-text-light)' }}>
                {t('popup_closing_msg')}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Styles for responsive modal */}
      <style>{`
        @media (max-width: 768px) {
          .modal {
            grid-template-columns: 1fr !important;
          }
          .modal > div:first-child {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
