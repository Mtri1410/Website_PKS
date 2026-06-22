import React, { useState } from 'react';
import { Plus, Minus, X, ArrowRight, Gift, Check, ShoppingCart } from 'lucide-react';
import type { CartItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, size: string, colorName: string, qty: number) => void;
  onRemoveItem: (productId: string, size: string, colorName: string) => void;
  onClearCart: () => void;
  onPageChange: (page: string) => void;
  appliedDiscount: number;
  onApplyDiscount: (discount: number) => void;
}

export const Cart: React.FC<CartProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onPageChange,
  appliedDiscount,
  onApplyDiscount
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const { language, t, tProduct, formatPrice } = useLanguage();

  // Gift message states
  const [addGiftMessage, setAddGiftMessage] = useState(false);
  const [giftTo, setGiftTo] = useState('');
  const [giftFrom, setGiftFrom] = useState('');
  const [giftText, setGiftText] = useState('');

  const rawSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  // Free shipping over $200, otherwise $15
  const shippingFee = rawSubtotal >= 200 || rawSubtotal === 0 ? 0 : 15;
  const discountAmount = (rawSubtotal * appliedDiscount) / 100;
  const grandTotal = rawSubtotal - discountAmount + shippingFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    
    const code = couponCode.toUpperCase().trim();
    if (code === 'RADIANCE20' || code === 'CEIN20' || code === 'GENXPKS20') {
      onApplyDiscount(20);
      setCouponSuccess(t('coupon_success_msg', { code: code, discount: 20 }));
    } else if (code === 'CEIN15' || code === 'GENXPKS15') {
      onApplyDiscount(15);
      setCouponSuccess(t('coupon_success_msg', { code: code, discount: 15 }));
    } else if (code === '') {
      setCouponError(t('coupon_error_empty'));
    } else {
      setCouponError(t('coupon_error_invalid'));
    }
  };

  const handleCheckoutSubmit = () => {
    const randomId = 'GPKS-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);
    setCheckoutSuccess(true);
    onClearCart();
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

  if (checkoutSuccess) {
    return (
      <div className="container" style={{
        padding: '80px 32px',
        textAlign: 'center',
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        animation: 'scaleUp 0.4s ease'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-text-primary)',
          color: 'var(--color-white)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '16px'
        }}>
          <Check size={40} />
        </div>
        <h2 className="font-serif" style={{ fontSize: '32px', letterSpacing: '0.02em' }}>{t('checkout_success_title')}</h2>
        <p style={{ color: 'var(--color-text-light)', fontSize: '15px', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: t('checkout_success_desc') }} />
        
        <div style={{
          backgroundColor: 'var(--color-card-bg)',
          border: '1px solid var(--color-border)',
          borderRadius: '2px',
          padding: '24px',
          width: '100%',
          textAlign: 'left'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
            <span style={{ color: 'var(--color-text-light)' }}>{t('checkout_order_id')}</span>
            <span style={{ fontWeight: 600 }}>{orderId}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
            <span style={{ color: 'var(--color-text-light)' }}>{t('checkout_est_delivery')}</span>
            <span style={{ fontWeight: 500 }}>{t('checkout_est_delivery_val')}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', borderTop: '1px solid var(--color-border)', paddingTop: '12px' }}>
            <span style={{ color: 'var(--color-text-light)' }}>{t('checkout_shipping_method')}</span>
            <span style={{ fontWeight: 500 }}>{t('checkout_shipping_method_val')}</span>
          </div>
          {addGiftMessage && giftText && (
            <div style={{ marginTop: '16px', borderTop: '1px dashed var(--color-border)', paddingTop: '16px' }}>
              <span style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-light)', marginBottom: '8px' }}>
                {t('checkout_gift_msg_attached')}
              </span>
              <p style={{ fontSize: '13px', fontStyle: 'italic', color: 'var(--color-text-secondary)' }}>
                "To {giftTo}, {giftText} — From {giftFrom}"
              </p>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: '16px', width: '100%', marginTop: '16px' }}>
          <button 
            onClick={() => onPageChange('home')}
            className="btn btn-secondary"
            style={{ flexGrow: 1 }}
          >
            {t('checkout_go_home')}
          </button>
          <button 
            onClick={() => onPageChange('shop')}
            className="btn btn-primary"
            style={{ flexGrow: 1 }}
          >
            {t('checkout_continue')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '60px 48px 100px' }}>
      <div style={{ marginBottom: '40px', borderBottom: '1px solid var(--color-border)', paddingBottom: '24px', textAlign: 'left' }}>
        <h1 className="font-serif" style={{ fontSize: '38px', marginBottom: '8px', fontWeight: 400 }}>{t('cart_page_title')}</h1>
        <p style={{ color: 'var(--color-text-light)', fontSize: '14px' }}>
          {t('cart_page_desc')}
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '100px 0',
          textAlign: 'center',
          gap: '24px'
        }}>
          <ShoppingCart size={48} style={{ color: 'var(--color-border)' }} />
          <h3 style={{ fontSize: '20px', fontWeight: 400, letterSpacing: '0.02em' }}>{t('bag_empty')}</h3>
          <p style={{ color: 'var(--color-text-light)', maxWidth: '400px', fontSize: '14px', lineHeight: 1.6 }}>
            {language === 'vi' 
              ? 'Khám phá bộ sưu tập trang phục tinh tế dệt từ len lông cừu, cashmere và lụa cao cấp của chúng tôi để thêm vào tủ đồ của bạn.'
              : 'Browse our essential collection of refined wool, cashmere, and silk pieces to add to your wardrobe.'}
          </p>
          <button 
            onClick={() => onPageChange('shop')}
            className="btn btn-primary"
            style={{ marginTop: '8px', width: 'auto', padding: '14px 32px' }}
          >
            {language === 'vi' ? 'Khám phá Cửa hàng' : 'Go Shop Collection'}
          </button>
        </div>
      ) : (
        /* Cart layout grid split */
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '64px' }} className="cart-layout-grid">
          {/* Left Column: Cards list + Gift options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            
            {/* Grid of Cart Item Cards (2-columns on desktop) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '24px'
            }} className="cart-items-cards-grid">
              {cartItems.map((item) => {
                const localized = tProduct(item.product);
                return (
                  <div 
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                    style={{
                      border: '1px solid var(--color-border)',
                      padding: '24px',
                      display: 'flex',
                      gap: '20px',
                      backgroundColor: 'var(--color-bg)',
                      position: 'relative',
                      textAlign: 'left'
                    }}
                    className="cart-card-item"
                  >
                    {/* Remove Button Top Right */}
                    <button 
                      onClick={() => onRemoveItem(item.product.id, item.selectedSize, item.selectedColor.name)}
                      style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--color-text-light)',
                        padding: '4px'
                      }}
                      className="cart-remove-action"
                      title={language === 'vi' ? 'Xóa sản phẩm' : 'Remove item'}
                    >
                      <X size={16} />
                    </button>

                    {/* Card Image */}
                    <div style={{
                      width: '90px',
                      height: '115px',
                      backgroundColor: 'var(--color-card-bg)',
                      overflow: 'hidden',
                      flexShrink: 0
                    }}>
                      <img 
                        src={item.product.image} 
                        alt={localized.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>

                    {/* Card Details */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
                      <div style={{ paddingRight: '20px' }}>
                        <h3 className="font-serif" style={{ fontSize: '15px', fontWeight: 500, lineHeight: 1.3, marginBottom: '6px' }}>
                          {localized.name}
                        </h3>
                        <span style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-light)', marginBottom: '8px' }}>
                          {language === 'vi' ? 'Cỡ' : 'Size'}: {item.selectedSize} / {language === 'vi' ? 'Màu' : 'Color'}: {language === 'vi' ? (colorTranslationMap[item.selectedColor.name] || item.selectedColor.name) : item.selectedColor.name}
                        </span>
                        <span style={{ fontSize: '13px', fontWeight: 500 }}>
                          {formatPrice(item.product.price)}
                        </span>
                      </div>

                      {/* Quantity Adjustment + Subtotal */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
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
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 10px', display: 'flex', alignItems: 'center', color: 'var(--color-text-secondary)' }}
                          >
                            <Minus size={11} />
                          </button>
                          <span style={{ fontSize: '12px', fontWeight: 600, width: '20px', textAlign: 'center' }}>
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.selectedColor.name, item.quantity + 1)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 10px', display: 'flex', alignItems: 'center', color: 'var(--color-text-secondary)' }}
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        <span style={{ fontSize: '13px', fontWeight: 600 }}>
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Gift Message Accordion Box */}
            <div style={{
              border: '1px solid var(--color-border)',
              padding: '24px',
              backgroundColor: 'var(--color-bg)',
              textAlign: 'left'
            }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={addGiftMessage} 
                  onChange={(e) => setAddGiftMessage(e.target.checked)}
                  style={{
                    accentColor: 'var(--color-text-primary)',
                    width: '16px',
                    height: '16px',
                    cursor: 'pointer'
                  }}
                />
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 500 }}>
                  <Gift size={15} style={{ color: 'var(--color-accent-gold)' }} />
                  {t('gift_message_checkbox')}
                </span>
              </label>

              {addGiftMessage && (
                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px', animation: 'scaleUp 0.3s ease' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-light)' }}>
                        {t('gift_to')}
                      </label>
                      <input 
                        type="text" 
                        value={giftTo} 
                        onChange={(e) => setGiftTo(e.target.value)} 
                        className="form-input" 
                        placeholder={language === 'vi' ? 'Tên người nhận' : 'Recipient Name'} 
                        style={{ height: '40px', padding: '0 12px', fontSize: '13px' }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-light)' }}>
                        {t('gift_from')}
                      </label>
                      <input 
                        type="text" 
                        value={giftFrom} 
                        onChange={(e) => setGiftFrom(e.target.value)} 
                        className="form-input" 
                        placeholder={language === 'vi' ? 'Tên người gửi' : 'Sender Name'} 
                        style={{ height: '40px', padding: '0 12px', fontSize: '13px' }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-light)' }}>
                      {t('gift_message_label')}
                    </label>
                    <textarea 
                      value={giftText} 
                      onChange={(e) => setGiftText(e.target.value)} 
                      className="form-input" 
                      placeholder={t('gift_textarea_placeholder')} 
                      rows={3}
                      style={{ padding: '12px', fontSize: '13px', resize: 'vertical' }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Back Link */}
            <button 
              onClick={() => onPageChange('shop')}
              className="btn btn-secondary"
              style={{ width: 'max-content', fontSize: '12px', padding: '12px 24px' }}
            >
              {t('checkout_continue')}
            </button>
          </div>

          {/* Right Column: Checkout Breakdown Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Promo Code Input Box */}
            <div style={{
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              padding: '24px',
              textAlign: 'left'
            }}>
              <h3 style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                {t('coupon_title')}
              </h3>
              
              <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder={t('coupon_placeholder')} 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{ textTransform: 'uppercase', height: '44px', fontSize: '13px' }}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '0 24px', textTransform: 'none', fontSize: '13px', width: 'auto', height: '44px' }}>
                  {t('coupon_apply_btn')}
                </button>
              </form>

              {couponError && <p style={{ color: 'var(--color-danger)', fontSize: '12px', marginTop: '8px', fontWeight: 500 }}>{couponError}</p>}
              {couponSuccess && <p style={{ color: 'var(--color-success)', fontSize: '12px', marginTop: '8px', fontWeight: 500 }}>{couponSuccess}</p>}
            </div>

            {/* Checkout Order Summary breakdown */}
            <div style={{
              backgroundColor: 'var(--color-card-bg)',
              border: '1px solid var(--color-border)',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              textAlign: 'left'
            }}>
              <h3 className="font-serif" style={{ fontSize: '20px', textTransform: 'uppercase', letterSpacing: '0.03em', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px', fontWeight: 400 }}>
                {t('order_summary')}
              </h3>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                <span>{t('order_subtotal')}</span>
                <span style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>{formatPrice(rawSubtotal)}</span>
              </div>

              {appliedDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--color-success)' }}>
                  <span>{t('order_discount', { percentage: appliedDiscount })}</span>
                  <span style={{ fontWeight: 600 }}>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                <span>{t('order_shipping_fee')}</span>
                <span>{shippingFee === 0 ? t('order_shipping_free') : formatPrice(shippingFee)}</span>
              </div>

              {shippingFee > 0 && (
                <p style={{ fontSize: '11px', color: 'var(--color-text-light)', marginTop: '-8px' }}>
                  {t('order_shipping_note', { amount: formatPrice(200 - rawSubtotal) })}
                </p>
              )}

              <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 600 }}>
                <span>{t('order_grand_total')}</span>
                <span style={{ color: 'var(--color-text-primary)' }}>{formatPrice(grandTotal)}</span>
              </div>

              <button 
                onClick={handleCheckoutSubmit}
                className="btn btn-primary"
                style={{ width: '100%', height: '52px', marginTop: '12px', gap: '8px', fontSize: '14px', textTransform: 'none' }}
              >
                {t('proceed_to_checkout')} <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Styles for cart layout responsiveness */}
      <style>{`
        .cart-remove-action:hover {
          color: var(--color-text-primary) !important;
        }
        @media (max-width: 990px) {
          .cart-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 650px) {
          .cart-items-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </div>
  );
};
