import React from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import type { Product } from '../types';
import { MOCK_PRODUCTS } from '../data/mockData';
import dropdownModel from '../assets/dropdown_model.webp';
import heroModel from '../assets/hero_model.webp';
import igModel from '../assets/ig_model.webp';
import promoModel from '../assets/promo_model.webp';
import classicPantImg from '../assets/product_classic_pant.webp';
import crewneckModelImg from '../assets/product_crewneck_model.webp';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';


interface HomeProps {
  onPageChange: (page: string) => void;
  onQuickView?: (product: Product) => void;
  onAddToBag: (product: Product, size: string, color: any, qty: number) => void;
  onCategorySelect: (category: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const Home: React.FC<HomeProps> = ({
  onPageChange,
  onQuickView,
  onAddToBag,
  onCategorySelect,
  onSelectProduct
}) => {
  const { language, t, tProduct } = useLanguage();

  const { toggleWishlist, isInWishlist } = useCart();


  // Display first 5 products for "What to Wear Now"
  const whatToWearProducts = MOCK_PRODUCTS.slice(0, 5);

  // Instagram Feed Items (5 Items matching mockup)
  const igItems = [
    { id: 'ig1', image: MOCK_PRODUCTS[0].image, icon: false },
    { id: 'ig2', image: igModel, icon: false },
    { id: 'ig3', image: promoModel, icon: false },
    { id: 'ig4', image: dropdownModel, icon: true }, // 4th image has the IG icon overlay in center
    { id: 'ig5', image: crewneckModelImg, icon: false }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '80px' }}>

      {/* 1. Full-Bleed Hero Landing Banner (Landing - desktop.png) */}
      <section style={{
        position: 'relative',
        height: '620px',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#E5E5E5'
      }} className="hero-banner-section">
        {/* Background image */}
        <img
          src={heroModel}
          alt="GenX PKS. Editorial Campaign"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* Subtle Text Contrast Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.05)'
        }} />

        {/* Text Overlay (Left-aligned with container) */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10,
          pointerEvents: 'none'
        }} className="hero-text-overlay">
          <div className="container" style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            paddingBottom: '80px',
            textAlign: 'left',
            pointerEvents: 'auto'
          }}>
            <h1 style={{
              fontSize: '36px',
              fontWeight: 500,
              color: '#ffffff',
              marginBottom: '16px',
              lineHeight: 1.2,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              letterSpacing: '0.01em',
              textAlign: 'left'
            }}>
              {t('hero_title')}
            </h1>
            <p style={{
              fontSize: '36px',
              color: '#ffffff',
              marginBottom: '28px',
              lineHeight: 1.2,
              letterSpacing: '0.01em',
              fontWeight: 500,
              textShadow: '0 1px 3px rgba(0,0,0,0.15)',
              textAlign: 'left'
            }}>
              {t('hero_subtitle')}
            </p>
            <button
              onClick={() => onPageChange('shop')}
              style={{
                backgroundColor: '#ffffff',
                color: '#000000',
                border: 'none',
                width: 'max-content',
                padding: '12px 24px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                borderRadius: '2px',
                boxShadow: 'var(--shadow-sm)',
                transition: 'var(--transition-fast)'
              }}
              className="hero-cta-btn"
            >
              {t('hero_shop_now')}
            </button>
          </div>
        </div>
      </section>

      {/* 2. Intro Philosophy Block (Left-aligned with explicit padding and text-align) */}
      <section
        style={{
          padding: '32px 80px 0',
          textAlign: 'left',
          display: 'flex',
          justifyContent: 'flex-start'
        }}
      >
        <p
          style={{
            fontSize: '16px',
            lineHeight: 1.6,
            maxWidth: '560px',
            margin: 0,
            textAlign: 'left',
            color: 'var(--color-text-primary)'
          }}
          dangerouslySetInnerHTML={{ __html: t('intro_text') }}
        />
      </section>

      {/* 3. Three Editorial Category Cards Grid */}
      <section className="container" style={{ padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="categories-grid-home">

          {/* Card 1: New Arrivals */}
          <div
            onClick={() => {
              onCategorySelect('');
              onPageChange('shop');
            }}
            style={{
              position: 'relative',
              aspectRatio: '1 / 1.25',
              overflow: 'hidden',
              cursor: 'pointer',
              borderRadius: '2px'
            }}
            className="editorial-card-home"
          >
            <img
              src={igModel}
              alt={t('editorial_new_arrivals')}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-slow)' }}
              className="editorial-card-image"
            />
            <div style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              color: '#ffffff',
              fontSize: '18px',
              fontWeight: 500,
              letterSpacing: '0.02em',
              textShadow: '0 1px 4px rgba(0,0,0,0.4)'
            }}>
              {t('editorial_new_arrivals')}
            </div>
          </div>

          {/* Card 2: The Casual Edit */}
          <div
            onClick={() => {
              onCategorySelect('Lounge');
              onPageChange('shop');
            }}
            style={{
              position: 'relative',
              aspectRatio: '1 / 1.25',
              overflow: 'hidden',
              cursor: 'pointer',
              borderRadius: '2px'
            }}
            className="editorial-card-home"
          >
            <img
              src={classicPantImg}
              alt={t('editorial_casual_edit')}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-slow)' }}
              className="editorial-card-image"
            />
            <div style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              color: '#ffffff',
              fontSize: '18px',
              fontWeight: 500,
              letterSpacing: '0.02em',
              textShadow: '0 1px 4px rgba(0,0,0,0.4)'
            }}>
              {t('editorial_casual_edit')}
            </div>
          </div>

          {/* Card 3: Best-Sellers */}
          <div
            onClick={() => {
              onCategorySelect('');
              onPageChange('shop');
            }}
            style={{
              position: 'relative',
              aspectRatio: '1 / 1.25',
              overflow: 'hidden',
              cursor: 'pointer',
              borderRadius: '2px'
            }}
            className="editorial-card-home"
          >
            <img
              src={crewneckModelImg}
              alt={t('editorial_best_sellers')}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-slow)' }}
              className="editorial-card-image"
            />
            <div style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              color: '#ffffff',
              fontSize: '18px',
              fontWeight: 500,
              letterSpacing: '0.02em',
              textShadow: '0 1px 4px rgba(0,0,0,0.4)'
            }}>
              {t('editorial_best_sellers')}
            </div>
          </div>

        </div>
      </section>

      {/* 4. What to Wear Now Title & 5-Column Product Grid */}
      <section className="container" style={{ padding: '0 48px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '40px',
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: '16px'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('what_to_wear_now')}</h2>
          <button
            onClick={() => onPageChange('shop')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              fontWeight: 500
            }}
          >
            {t('shop_all_items')}
          </button>
        </div>

        {/* 5-Column Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }} className="what-to-wear-grid">
          {whatToWearProducts.map((product) => {
            const localized = tProduct(product);
            return (
              <div key={product.id} className="product-card" onClick={() => onSelectProduct(product)}>
                {/* Image Container */}
                <div className="product-image-container">
                  <img
                    src={product.image}
                    alt={localized.name}
                    className="product-image"
                  />

                  {/* Quick View Hover overlay */}
                  <div 
                    className="quick-view-overlay"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onQuickView) onQuickView(product);
                    }}
                  >
                    <span>{language === 'vi' ? 'Xem nhanh' : 'Quick View'}</span>
                  </div>

                  {/* Wishlist Heart Icon */}

                  <button
                    className="wishlist-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    title="Add to Wishlist"
                  >
                    <Heart size={18} fill={isInWishlist(product.id) ? "var(--color-text-primary)" : "none"} />
                  </button>


                  {/* Bottom Plus Add to Bag Icon */}
                  <button
                    className="quick-add-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToBag(product, product.sizes[0], product.colors[0], 1);
                    }}
                    title="Add to Bag"
                  >
                    <ShoppingBag size={18} />
                  </button>
                </div>

                {/* Info panel */}
                <div className="product-info" style={{ textAlign: 'left' }}>
                  <span className="product-name">{localized.name}</span>
                  <span className="product-price">${product.price}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Two-Column Editorial Image Split (The Smart Chic / Ready To Go) */}
      <section className="container" style={{ padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }} className="editorial-split-grid">

          {/* Card 1: The Smart Chic */}
          <div
            onClick={() => onPageChange('shop')}
            style={{
              position: 'relative',
              aspectRatio: '1.15 / 1',
              overflow: 'hidden',
              cursor: 'pointer',
              borderRadius: '2px',
              backgroundColor: 'var(--color-card-bg)'
            }}
            className="editorial-split-card"
          >
            <img
              src={dropdownModel}
              alt={t('editorial_smart_chic')}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-slow)' }}
              className="editorial-split-image"
              loading="lazy"
            />
            <div style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              color: '#ffffff',
              fontSize: '20px',
              fontWeight: 500,
              letterSpacing: '0.02em',
              textShadow: '0 1px 4px rgba(0,0,0,0.4)'
            }} className="font-serif">
              {t('editorial_smart_chic')}
            </div>
          </div>

          {/* Card 2: Ready To Go */}
          <div
            onClick={() => onPageChange('shop')}
            style={{
              position: 'relative',
              aspectRatio: '1.15 / 1',
              overflow: 'hidden',
              cursor: 'pointer',
              borderRadius: '2px',
              backgroundColor: 'var(--color-card-bg)'
            }}
            className="editorial-split-card"
          >
            <img
              src={promoModel}
              alt={t('editorial_ready_to_go')}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-slow)' }}
              className="editorial-split-image"
              loading="lazy"
            />
            <div style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              color: '#ffffff',
              fontSize: '20px',
              fontWeight: 500,
              letterSpacing: '0.02em',
              textShadow: '0 1px 4px rgba(0,0,0,0.4)'
            }} className="font-serif">
              {t('editorial_ready_to_go')}
            </div>
          </div>

        </div>
      </section>

      {/* 6. Philosophy Header & Text Section */}
      <section style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', padding: '80px 0', backgroundColor: '#ffffff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 className="font-serif" style={{ fontSize: '28px', fontWeight: 400, color: 'var(--color-text-primary)', marginBottom: '24px', letterSpacing: '0.02em' }}>
            {t('philosophy_title')}
          </h2>
          <p style={{
            fontSize: '14px',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.8,
            letterSpacing: '0.015em',
            margin: '0 auto'
          }}>
            {t('philosophy_text')}
          </p>
        </div>
      </section>

      {/* 7. Shop Instagram 5-Image Feed Widget */}
      <section className="container" style={{ paddingTop: '0' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 className="font-serif" style={{ fontSize: '24px', fontWeight: 400, letterSpacing: '0.02em' }}>{t('shop_instagram')}</h2>
        </div>

        {/* 5-Column Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }} className="ig-grid-home">
          {igItems.map((item) => (
            <div
              key={item.id}
              style={{
                position: 'relative',
                aspectRatio: '1',
                borderRadius: '2px',
                overflow: 'hidden',
                cursor: 'pointer',
                backgroundColor: 'var(--color-card-bg)'
              }}
              className="ig-item-home"
              onClick={() => onPageChange('shop')}
            >
              <img
                src={item.image}
                alt="Instagram feed item"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-slow)' }}
                className="ig-image-home"
                loading="lazy"
              />

              {/* Visual default overlay icon for 4th item */}
              {item.icon && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-sm)',
                  zIndex: 2
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#000000' }}>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
              )}

              {/* Shop overlay on hover */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                opacity: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-white)',
                transition: 'opacity var(--transition-fast)'
              }} className="ig-overlay-home">
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 500 }}>
                  <ShoppingBag size={15} /> {t('shop_look')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Styled Micro-animations */}
      <style>{`
        .editorial-card-home:hover .editorial-card-image {
          transform: scale(1.03);
        }
        .editorial-split-card:hover .editorial-split-image {
          transform: scale(1.03);
        }
        .ig-item-home:hover .ig-image-home {
          transform: scale(1.03);
        }
        .ig-item-home:hover .ig-overlay-home {
          opacity: 1 !important;
        }
        .hero-cta-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        @media (max-width: 900px) {
          .hero-text-overlay {
            padding-left: 40px !important;
          }
          .hero-text-overlay h1 {
            fontSize: 42px !important;
          }
          .categories-grid-home {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .what-to-wear-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .editorial-split-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .ig-grid-home {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 500px) {
          .what-to-wear-grid {
            grid-template-columns: 1fr !important;
          }
          .ig-grid-home {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
};
