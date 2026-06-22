import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import type { Product, ColorOption } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

interface WishlistProps {
  onQuickView?: (product: Product) => void;
  onAddToBag: (product: Product, size: string, color: ColorOption, qty: number) => void;
  onPageChange: (page: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const Wishlist: React.FC<WishlistProps> = ({
  onQuickView,
  onAddToBag,
  onPageChange,
  onSelectProduct
}) => {

  const { language, t, tProduct, formatPrice } = useLanguage();
  const { wishlistItems, toggleWishlist, isInWishlist } = useCart();

  const colorTranslationMap: Record<string, string> = {
    'Oatmeal': 'Màu yến mạch',
    'Black': 'Màu đen',
    'Light Blue': 'Xanh nhạt',
    'Grey': 'Màu xám',
    'Sand': 'Màu cát',
    'Brown': 'Màu nâu',
    'Champagne': 'Sâm-panh',
    'White': 'Màu trắng',
    'Blue': 'Màu xanh',
    'Dark Brown': 'Nâu sẫm'
  };

  return (
    <div className="container" style={{ padding: '60px 48px 100px' }}>
      {/* 1. Header Section */}
      <div style={{ marginBottom: '48px', borderBottom: '1px solid var(--color-border)', paddingBottom: '24px', textAlign: 'left' }}>
        <h1 className="font-serif" style={{ fontSize: '38px', marginBottom: '8px', fontWeight: 400 }}>
          {t('wishlist_title')}
        </h1>
        <p 
          style={{ color: 'var(--color-text-light)', fontSize: '14px' }} 
          dangerouslySetInnerHTML={{ __html: t('wishlist_desc', { count: wishlistItems.length }) }} 
        />
      </div>

      {/* 2. Empty State */}
      {wishlistItems.length === 0 ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '100px 0',
          textAlign: 'center',
          gap: '24px'
        }}>
          <p style={{ color: 'var(--color-text-primary)', fontSize: '16px', fontWeight: 500 }}>
            {t('wishlist_empty')}
          </p>
          <p style={{ color: 'var(--color-text-light)', fontSize: '14px', maxWidth: '450px', lineHeight: 1.6, marginTop: '-12px' }}>
            {t('wishlist_empty_desc')}
          </p>
          <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
            <button onClick={() => onPageChange('home')} className="btn btn-secondary" style={{ width: 'auto', padding: '12px 28px' }}>
              {t('checkout_go_home')}
            </button>
            <button onClick={() => onPageChange('shop')} className="btn btn-primary" style={{ width: 'auto', padding: '12px 28px' }}>
              {language === 'vi' ? 'Xem tất cả sản phẩm' : 'Browse All Products'}
            </button>
          </div>
        </div>
      ) : (
        /* 3. Wishlist Product Grid */
        <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {wishlistItems.map((product) => {
            const localized = tProduct(product);
            return (
              <div 
                key={product.id} 
                className="product-card"
                onClick={() => onSelectProduct(product)}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
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

                  {/* Wishlist Heart Icon (Filled active because it's liked) */}

                  <button 
                    className="wishlist-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    title={t('wishlist_remove')}
                  >
                    <Heart size={17} fill={isInWishlist(product.id) ? "var(--color-text-primary)" : "none"} />
                  </button>

                  {/* Quick Add Shopping Bag Icon */}
                  <button 
                    className="quick-add-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToBag(product, product.sizes[0], product.colors[0], 1);
                    }}
                    title={t('add_to_bag')}
                  >
                    <ShoppingBag size={17} />
                  </button>
                </div>

                {/* Product Details Info */}
                <div className="product-info" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <span className="product-name" style={{ display: 'block', fontSize: '15px', color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                    {localized.name}
                  </span>
                  <span className="product-price" style={{ fontSize: '14px', fontWeight: 500, marginBottom: '6px' }}>
                    {formatPrice(product.price)}
                  </span>
                  
                  {/* Render color choices dots if they have multiple colors */}
                  {product.colors.length > 1 && (
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                      {product.colors.map(col => (
                        <div 
                          key={col.name} 
                          style={{
                            backgroundColor: col.hex,
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            border: '1px solid var(--color-border)'
                          }}
                          title={language === 'vi' ? (colorTranslationMap[col.name] || col.name) : col.name}
                        />
                      ))}
                    </div>
                  )}

                  {/* Direct Add to Bag CTA Button */}
                  <div style={{ marginTop: 'auto' }}>
                    <button 
                      style={{ 
                        width: '100%', 
                        padding: '10px 14px', 
                        fontSize: '12px',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        border: '1px solid var(--color-border)',
                        backgroundColor: '#ffffff',
                        cursor: 'pointer',
                        transition: 'var(--transition-fast)'
                      }}
                      className="btn btn-secondary wishlist-add-to-bag-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToBag(product, product.sizes[0], product.colors[0], 1);
                      }}
                    >
                      {t('add_to_bag')}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Styled CTA Micro-animations */}
      <style>{`
        .wishlist-add-to-bag-btn:hover {
          background-color: var(--color-text-primary) !important;
          color: var(--color-white) !important;
          border-color: var(--color-text-primary) !important;
        }
      `}</style>
    </div>
  );
};
