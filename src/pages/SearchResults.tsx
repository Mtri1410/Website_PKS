import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import type { Product, ColorOption } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface SearchResultsProps {
  products: Product[];
  query: string;
  onQuickView?: (product: Product) => void;
  onAddToBag: (product: Product, size: string, color: ColorOption, qty: number) => void;
  onPageChange: (page: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  products,
  query,
  onAddToBag,
  onPageChange,
  onSelectProduct
}) => {
  const { language, t, tProduct } = useLanguage();

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
      <div style={{ marginBottom: '48px', borderBottom: '1px solid var(--color-border)', paddingBottom: '24px', textAlign: 'left' }}>
        <h1 className="font-serif" style={{ fontSize: '38px', marginBottom: '8px', fontWeight: 400 }}>{t('search_results_title')}</h1>
        <p style={{ color: 'var(--color-text-light)', fontSize: '14px' }} dangerouslySetInnerHTML={{ __html: t('search_results_desc', { count: products.length, query: query }) }} />
      </div>

      {products.length === 0 ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '100px 0',
          textAlign: 'center',
          gap: '24px'
        }}>
          <p style={{ color: 'var(--color-text-light)', fontSize: '15px', maxWidth: '450px', lineHeight: 1.6 }}>
            {t('search_empty_desc')}
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button onClick={() => onPageChange('home')} className="btn btn-secondary" style={{ width: 'auto', padding: '12px 28px' }}>
              {t('checkout_go_home')}
            </button>
            <button onClick={() => onPageChange('shop')} className="btn btn-primary" style={{ width: 'auto', padding: '12px 28px' }}>
              {language === 'vi' ? 'Xem tất cả sản phẩm' : 'Browse All Products'}
            </button>
          </div>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => {
            const localized = tProduct(product);
            return (
              <div 
                key={product.id} 
                className="product-card"
                onClick={() => onSelectProduct(product)}
              >
                {/* Image Container */}
                <div className="product-image-container">
                  <img 
                    src={product.image} 
                    alt={localized.name} 
                    className="product-image"
                  />

                  {/* Wishlist Heart Icon */}
                  <button 
                    className="wishlist-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(t('added_to_wishlist', { name: localized.name }));
                    }}
                  >
                    <Heart size={17} />
                  </button>

                  {/* Quick Add Shopping Bag Icon */}
                  <button 
                    className="quick-add-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToBag(product, product.sizes[0], product.colors[0], 1);
                    }}
                  >
                    <ShoppingBag size={17} />
                  </button>
                </div>

                {/* Product Details Info */}
                <div className="product-info" style={{ textAlign: 'left' }}>
                  <span className="product-name" style={{ display: 'block', fontSize: '15px', color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                    {localized.name}
                  </span>
                  <span className="product-price" style={{ fontSize: '14px', fontWeight: 500 }}>
                    ${product.price}
                  </span>
                  
                  {/* Render color choices dots if they have multiple colors */}
                  {product.colors.length > 1 && (
                    <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
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
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
