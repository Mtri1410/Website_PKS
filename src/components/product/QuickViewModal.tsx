import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Product, ColorOption } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToBag: (product: Product, size: string, color: ColorOption, quantity: number) => void;
  onViewFullDetails: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToBag,
  onViewFullDetails,
}) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);

  const { language, t, tProduct } = useLanguage();

  // Sync state on product load
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || '');
      setSelectedColor(product.colors[0] || null);
    }
  }, [product]);

  if (!product) return null;

  const handleAddClick = () => {
    if (selectedColor) {
      onAddToBag(product, selectedSize, selectedColor, 1);
      onClose();
    }
  };

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

  const localized = tProduct(product);

  return (
    <>
      {/* Background Overlay */}
      <div 
        className={`overlay ${isOpen ? 'active' : ''}`} 
        onClick={onClose}
        style={{ pointerEvents: isOpen ? 'auto' : 'none', zIndex: 101 }}
      />

      {/* Modal Container */}
      <div 
        className={`modal ${isOpen ? 'active' : ''}`}
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          zIndex: 102,
          maxHeight: '85vh',
          width: '940px',
        }}
      >
        {/* Left: Scrollable image list container (as seen in mockup) */}
        <div style={{
          position: 'relative',
          backgroundColor: 'var(--color-card-bg)',
          height: '520px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '24px'
        }} className="modal-gallery-scroll">
          <img 
            src={product.image} 
            alt={localized.name} 
            style={{ width: '100%', aspectRatio: '1 / 1.15', objectFit: 'cover' }}
          />
          {/* Secondary mock view representing mockup's multiple image scroll */}
          <img 
            src={product.image} 
            alt={`${localized.name} View 2`} 
            style={{ width: '100%', aspectRatio: '1 / 1.15', objectFit: 'cover', filter: 'brightness(95%)' }}
          />
        </div>

        {/* Right: Product details panel */}
        <div style={{
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          maxHeight: '520px',
          overflowY: 'auto'
        }}>
          {/* Close button */}
          <button 
            onClick={onClose}
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

          {/* Product Title */}
          <h2 style={{
            fontSize: '22px',
            fontWeight: 400,
            marginBottom: '8px',
            letterSpacing: '0.02em',
            fontFamily: 'var(--font-sans)',
            lineHeight: 1.2
          }}>
            {localized.name}
          </h2>

          {/* Price */}
          <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '24px' }}>
            ${product.price}
          </div>

          {/* Color Selector */}
          <div style={{ marginBottom: '20px' }}>
            <span className="form-label" style={{ fontSize: '11px', color: 'var(--color-text-light)', marginBottom: '8px' }}>
              {language === 'vi' ? 'Màu sắc:' : 'Product Color:'} {selectedColor ? (language === 'vi' ? (colorTranslationMap[selectedColor.name] || selectedColor.name) : selectedColor.name) : ''}
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  className={`color-circle ${selectedColor?.name === color.name ? 'active' : ''}`}
                  onClick={() => setSelectedColor(color)}
                >
                  <div className="color-circle-fill" style={{ backgroundColor: color.hex }} />
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '8px' }}>
              <span className="form-label" style={{ color: 'var(--color-text-light)' }}>{language === 'vi' ? 'Kích thước:' : 'Product Size:'}</span>
              <span style={{ textDecoration: 'underline', cursor: 'pointer', color: 'var(--color-text-light)' }} onClick={() => alert(language === 'vi' ? 'Đang mở Bảng kích cỡ...' : 'Size guide display.')}>
                {language === 'vi' ? 'Bảng kích cỡ' : 'Size Chart'}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-box ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Bag action */}
          <button
            onClick={handleAddClick}
            className="btn btn-primary"
            style={{ height: '48px', marginBottom: '20px' }}
          >
            {t('add_to_bag')}
          </button>

          {/* Link to detail page */}
          <button
            onClick={() => {
              onViewFullDetails(product);
              onClose();
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-primary)',
              fontSize: '13px',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              width: 'max-content',
              margin: '0 auto'
            }}
          >
            {t('view_full_details')}
          </button>
        </div>
      </div>

      <style>{`
        .modal-gallery-scroll::-webkit-scrollbar {
          width: 4px;
        }
        @media (max-width: 800px) {
          .modal {
            grid-template-columns: 1fr !important;
          }
          .modal-gallery-scroll {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
