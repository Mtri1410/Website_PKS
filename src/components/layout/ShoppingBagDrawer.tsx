import React from 'react';
import { X, Plus, Minus } from 'lucide-react';
import type { CartItem } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface ShoppingBagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, size: string, colorName: string, quantity: number) => void;
  onRemoveItem: (productId: string, size: string, colorName: string) => void;
  onCheckout: () => void;
  onViewCart: () => void;
}

export const ShoppingBagDrawer: React.FC<ShoppingBagDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const { language, t, tProduct } = useLanguage();

  const formatPrice = (price: number) => {
    return `$${price}`;
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

  return (
    <>
      {/* Background Overlay */}
      <div 
        className={`overlay ${isOpen ? 'active' : ''}`} 
        onClick={onClose}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      />

      {/* Drawer */}
      <div 
        className={`drawer ${isOpen ? 'active' : ''}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {/* Drawer Header */}
        <div style={{
          padding: '24px 32px',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 500, letterSpacing: '0.03em' }}>
            {t('shopping_bag_header')}
          </h3>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-primary)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Content */}
        <div style={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px'
        }}>
          {cartItems.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
              gap: '16px'
            }}>
              <p style={{ color: 'var(--color-text-light)', fontSize: '14px' }}>{t('bag_empty')}</p>
              <button 
                onClick={onClose}
                className="btn btn-secondary"
                style={{ width: 'auto', padding: '10px 20px' }}
              >
                {t('checkout_continue')}
              </button>
            </div>
          ) : (
            cartItems.map((item) => {
              const localized = tProduct(item.product);
              return (
                <div 
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                  style={{
                    display: 'flex',
                    gap: '20px',
                    paddingBottom: '24px',
                    borderBottom: '1px solid var(--color-border)',
                    position: 'relative'
                  }}
                >
                  {/* Item Image */}
                  <div style={{
                    width: '90px',
                    height: '110px',
                    backgroundColor: 'var(--color-card-bg)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    flexShrink: 0
                  }}>
                    <img 
                      src={item.product.image} 
                      alt={localized.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Item Details */}
                  <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingRight: '20px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 400, color: 'var(--color-text-primary)', lineHeight: 1.3 }}>
                        {localized.name}
                      </h4>
                      <button 
                        onClick={() => onRemoveItem(item.product.id, item.selectedSize, item.selectedColor.name)}
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'var(--color-text-light)',
                          padding: '4px'
                        }}
                        className="remove-btn"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {/* Attributes */}
                    <span style={{ fontSize: '12px', color: 'var(--color-text-light)', marginTop: '4px' }}>
                      {language === 'vi' ? (colorTranslationMap[item.selectedColor.name] || item.selectedColor.name) : item.selectedColor.name} {item.selectedSize ? `/ ${item.selectedSize}` : ''}
                    </span>

                    {/* Price */}
                    <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-primary)', marginTop: '6px' }}>
                      {formatPrice(item.product.price)}
                    </span>

                    {/* Quantity adjustment */}
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      marginTop: 'auto',
                      paddingTop: '12px'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid var(--color-border)',
                        borderRadius: '20px',
                        backgroundColor: 'var(--color-white)',
                        padding: '2px'
                      }}>
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.selectedColor.name, item.quantity - 1)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px 10px',
                            display: 'flex',
                            alignItems: 'center',
                            color: 'var(--color-text-secondary)'
                          }}
                        >
                          <Minus size={11} />
                        </button>
                        <span style={{ fontSize: '12px', fontWeight: 600, width: '20px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.selectedColor.name, item.quantity + 1)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px 10px',
                            display: 'flex',
                            alignItems: 'center',
                            color: 'var(--color-text-secondary)'
                          }}
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '24px 32px',
            borderTop: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-white)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <p style={{ fontSize: '12px', color: 'var(--color-text-light)', textAlign: 'left' }}>
              {t('shipping_tax_note')}
            </p>

            <button 
              onClick={onCheckout}
              className="btn btn-primary"
              style={{
                height: '48px',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 24px',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '14px',
                letterSpacing: '0.03em'
              }}
            >
              <span>{t('go_to_checkout_btn')}</span>
              <span>{formatPrice(subtotal)}</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        .remove-btn:hover {
          color: var(--color-text-primary) !important;
        }
      `}</style>
    </>
  );
};
