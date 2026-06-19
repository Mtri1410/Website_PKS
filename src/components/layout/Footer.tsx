import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { language, t } = useLanguage();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer style={{
      backgroundColor: '#FAF9F6',
      borderTop: '1px solid var(--color-border)',
      paddingTop: '64px',
      paddingBottom: '48px',
      fontSize: '13px',
      color: 'var(--color-text-primary)'
    }}>
      <div className="container footer-grid-container" style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1.2fr 1.2fr 2fr',
        gap: '40px',
        textAlign: 'left'
      }}>
        
        {/* Column 1: Contact Us */}
        <div>
          <h4 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-light)', marginBottom: '20px' }}>{t('footer_contact_us')}</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
            <li style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>GenX PKS</li>
            <li>{language === 'vi' ? 'Địa chỉ văn phòng: ' : 'Office address: '}133/3 Đỗ Xuân Hợp, Khu phố 9, Phường Tăng Nhơn Phú, Thành Phố Hồ Chí Minh, Việt Nam</li>
            <li>Hotline: (+84) 559636255</li>
            <li>Email: <a href="mailto:info@genxpks.edu.vn" className="footer-link">info@genxpks.edu.vn</a></li>
          </ul>
        </div>

        {/* Column 2: Customers */}
        <div>
          <h4 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-light)', marginBottom: '20px' }}>{t('footer_customers')}</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--color-text-secondary)' }}>
            <li><a href="#" className="footer-link">{t('footer_start_return')}</a></li>
            <li><a href="#" className="footer-link">{t('footer_return_policy')}</a></li>
            <li><a href="#" className="footer-link">{t('footer_faq')}</a></li>
            <li><a href="#" className="footer-link">{t('footer_catalogs')}</a></li>
            <li><a href="#" className="footer-link">{t('footer_group_gifting')}</a></li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div>
          <h4 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-light)', marginBottom: '20px' }}>{t('footer_company')}</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--color-text-secondary)' }}>
            <li><a href="#" className="footer-link">{t('footer_about_us')}</a></li>
            <li><a href="#" className="footer-link">{t('footer_sustainability')}</a></li>
            <li><a href="#" className="footer-link">{t('footer_discover_revive')}</a></li>
            <li><a href="#" className="footer-link">{t('footer_careers')}</a></li>
            <li><a href="#" className="footer-link">{t('footer_privacy_policy')}</a></li>
            <li><a href="#" className="footer-link">{t('footer_terms')}</a></li>
          </ul>
        </div>

        {/* Column 4: Newsletter Signup */}
        <div>
          <h4 style={{ 
            fontSize: '15px', 
            fontWeight: 500, 
            lineHeight: 1.4,
            marginBottom: '20px',
            color: 'var(--color-text-primary)'
          }}>
            {t('footer_subscribe_header')}
          </h4>
          
          <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '380px' }}>
            <input
              type="email"
              placeholder={t('footer_subscribe_placeholder')}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid var(--color-border)',
                borderRadius: '2px',
                fontSize: '13px',
                backgroundColor: 'var(--color-white)',
                color: 'var(--color-text-primary)',
                outline: 'none'
              }}
            />
            <span style={{ fontSize: '11px', color: 'var(--color-text-light)', lineHeight: 1.4 }}>
              {t('footer_subscribe_agree')}
            </span>
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                padding: '12px 24px',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                width: 'max-content'
              }}
            >
              {t('footer_subscribe_btn')}
            </button>
          </form>
          {subscribed && (
            <p style={{ color: 'var(--color-success)', fontSize: '12px', marginTop: '12px', fontWeight: 500 }}>
              {t('footer_subscribed_msg')}
            </p>
          )}
        </div>
      </div>

      {/* Copyright Bottom */}
      <div className="container" style={{
        marginTop: '64px',
        borderTop: '1px solid var(--color-border)',
        paddingTop: '24px',
        fontSize: '11px',
        color: 'var(--color-text-light)',
        textAlign: 'left'
      }}>
        <span>&copy; GenX PKS</span>
      </div>

      <style>{`
        .footer-link:hover {
          color: var(--color-text-primary);
          text-decoration: underline;
        }
        @media (max-width: 900px) {
          .footer-grid-container {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid-container {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </footer>
  );
};
