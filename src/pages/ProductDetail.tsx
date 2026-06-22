import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Star, ShoppingBag } from 'lucide-react';
import type { Product, ColorOption } from '../types';
import { MOCK_PRODUCTS } from '../data/mockData';
import dropdownModel from '../assets/dropdown_model.webp';
import promoModel from '../assets/promo_model.webp';
import { useLanguage } from '../context/LanguageContext';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToBag: (product: Product, size: string, color: ColorOption, qty: number) => void;
  onSelectProduct: (product: Product) => void;
}

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

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onBack,
  onAddToBag,
  onSelectProduct,
}) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [accordionsOpen, setAccordionsOpen] = useState({
    store: false,
    fit: true,
    care: false,
    shipping: false
  });

  const { language, t, tProduct, formatPrice } = useLanguage();

  const styleWithProducts = MOCK_PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);
  const recentlyViewed = MOCK_PRODUCTS.filter(p => p.id !== product.id).slice(3, 6);

  useEffect(() => {
    setSelectedSize(product.sizes[0] || '');
    setSelectedColor(product.colors[0] || null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [product]);

  const toggleAccordion = (section: 'store' | 'fit' | 'care' | 'shipping') => {
    setAccordionsOpen(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleAddClick = () => {
    if (selectedColor) {
      onAddToBag(product, selectedSize, selectedColor, 1);
    }
  };

  const localized = tProduct(product);

  return (
    <div style={{ backgroundColor: 'var(--color-white)', paddingBottom: '80px' }}>
      
      {/* 1. Main Detail Product Roll */}
      <section className="container" style={{ padding: '40px 48px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px' }} className="detail-layout">
          
          {/* Left Side: Large vertical scroll of images */}
          <div style={{ display: 'flex', gap: '24px', position: 'relative' }} className="detail-gallery-container">
            {/* Scroll indicators dots */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'sticky', top: '120px', height: 'max-content' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-text-primary)' }} />
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-border)' }} />
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-border)' }} />
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-border)' }} />
            </div>

            {/* Vertical Scroll Roll */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
              <div className="gallery-img-box" style={{ backgroundColor: 'var(--color-card-bg)', aspectRatio: '1 / 1.25', borderRadius: '2px', overflow: 'hidden' }}>
                <img src={product.image} alt={localized.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="gallery-img-box" style={{ backgroundColor: 'var(--color-card-bg)', aspectRatio: '1 / 1.25', borderRadius: '2px', overflow: 'hidden', filter: 'brightness(97%)' }}>
                <img src={product.image} alt={`${localized.name} model view`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
              </div>
              <div className="gallery-img-box" style={{ backgroundColor: 'var(--color-card-bg)', aspectRatio: '1 / 1.25', borderRadius: '2px', overflow: 'hidden', filter: 'brightness(94%)' }}>
                <img src={product.image} alt={`${localized.name} details view`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
              </div>
            </div>
          </div>

          {/* Right Side: Product Details Column */}
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', height: 'max-content', position: 'sticky', top: '120px' }}>
            
            {/* Breadcrumbs */}
            <div style={{ fontSize: '12px', color: 'var(--color-text-light)', marginBottom: '24px' }}>
              <span onClick={onBack} style={{ cursor: 'pointer' }}>{language === 'vi' ? 'Cửa hàng' : 'Shop'}</span> / <span style={{ textTransform: 'capitalize' }}>{localized.category}</span>
            </div>

            {/* Title */}
            <h1 style={{ fontSize: '26px', fontWeight: 400, letterSpacing: '0.02em', marginBottom: '8px' }}>
              {localized.name}
            </h1>

            {/* Price */}
            <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '24px' }}>
              {formatPrice(product.price)}
            </div>

            {/* Description */}
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '32px' }}>
              {localized.description}
            </p>

            {/* Color Option Selector */}
            <div style={{ marginBottom: '20px' }}>
              <span className="form-label" style={{ fontSize: '11px', color: 'var(--color-text-light)', marginBottom: '8px' }}>
                {language === 'vi' ? 'Màu sắc:' : 'Product Color:'} <strong>{selectedColor ? (language === 'vi' ? (colorTranslationMap[selectedColor.name] || selectedColor.name) : selectedColor.name) : ''}</strong>
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {product.colors.map(col => (
                  <button
                    key={col.name}
                    className={`color-circle ${selectedColor?.name === col.name ? 'active' : ''}`}
                    onClick={() => setSelectedColor(col)}
                  >
                    <div className="color-circle-fill" style={{ backgroundColor: col.hex }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Option Selector */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '8px' }}>
                <span className="form-label" style={{ color: 'var(--color-text-light)' }}>{language === 'vi' ? 'Kích thước:' : 'Product Size:'}</span>
                <span style={{ textDecoration: 'underline', cursor: 'pointer', color: 'var(--color-text-light)' }} onClick={() => alert(language === 'vi' ? 'Đang mở Bảng kích cỡ...' : 'Size Chart popup')}>
                  {language === 'vi' ? 'Bảng kích cỡ' : 'Size Chart'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {product.sizes.map(size => (
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

            {/* Add to Bag Button */}
            <button
              onClick={handleAddClick}
              className="btn btn-primary"
              style={{ height: '52px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, fontSize: '13px', marginBottom: '32px' }}
            >
              {t('add_to_bag')}
            </button>

            {/* Accordions */}
            <div style={{ borderTop: '1px solid var(--color-border)' }}>
              
              {/* Accordion 1: Check In-Store Availability */}
              <div style={{ borderBottom: '1px solid var(--color-border)' }}>
                <div 
                  onClick={() => toggleAccordion('store')}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', cursor: 'pointer', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}
                >
                  <span>{language === 'vi' ? 'Tình trạng tại cửa hàng' : 'Check In-Store Availability'}</span>
                  {accordionsOpen.store ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {accordionsOpen.store && (
                  <div style={{ paddingBottom: '16px', fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    {language === 'vi' 
                      ? 'Có sẵn tại các cửa hàng flagship GenX PKS tại TP. Hồ Chí Minh và Hà Nội. Có sẵn dịch vụ lấy hàng tại quầy khi thanh toán.'
                      : 'Available at GenX PKS flagship stores in Ho Chi Minh City and Hanoi. Curbside pickup is available at checkout.'}
                  </div>
                )}
              </div>

              {/* Accordion 2: Fit Details */}
              <div style={{ borderBottom: '1px solid var(--color-border)' }}>
                <div 
                  onClick={() => toggleAccordion('fit')}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', cursor: 'pointer', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}
                >
                  <span>{t('tab_features')}</span>
                  {accordionsOpen.fit ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {accordionsOpen.fit && (
                  <div style={{ paddingBottom: '16px', fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    <ul style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {localized.features?.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 3: Fabrication & Care */}
              <div style={{ borderBottom: '1px solid var(--color-border)' }}>
                <div 
                  onClick={() => toggleAccordion('care')}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', cursor: 'pointer', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}
                >
                  <span>{language === 'vi' ? 'Chất liệu & Bảo quản' : 'Fabrication & Care'}</span>
                  {accordionsOpen.care ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {accordionsOpen.care && (
                  <div style={{ paddingBottom: '16px', fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    <p style={{ fontWeight: 600, marginBottom: '6px' }}>{language === 'vi' ? 'Thành phần chất liệu:' : 'Materials:'}</p>
                    <p style={{ marginBottom: '12px' }}>{localized.ingredients}</p>
                    <p style={{ fontWeight: 600, marginBottom: '6px' }}>{language === 'vi' ? 'Hướng dẫn bảo quản:' : 'Care Guidelines:'}</p>
                    <p>{localized.howToUse}</p>
                  </div>
                )}
              </div>

              {/* Accordion 4: Shipping & Returns */}
              <div style={{ borderBottom: '1px solid var(--color-border)' }}>
                <div 
                  onClick={() => toggleAccordion('shipping')}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', cursor: 'pointer', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}
                >
                  <span>{t('tab_shipping')}</span>
                  {accordionsOpen.shipping ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {accordionsOpen.shipping && (
                  <div style={{ paddingBottom: '16px', fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    {language === 'vi'
                      ? `Miễn phí giao hàng tiêu chuẩn cho đơn hàng từ ${formatPrice(95)} trở lên. Chấp nhận đổi trả cho sản phẩm chưa qua sử dụng trong vòng 14 ngày kể từ ngày mua.`
                      : `Complimentary shipping on orders over ${formatPrice(95)}. Returns accepted on any unused garments within 14 days of purchase.`}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. Design, Quality, Sustainability Info columns */}
      <section style={{ borderTop: '1px solid var(--color-border)', padding: '64px 0', backgroundColor: '#FAF9F6' }}>
        <div className="container info-cols-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '48px',
          textAlign: 'left'
        }}>
          <div>
            <span style={{ fontSize: '10px', color: 'var(--color-text-light)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '14px' }}>
              {language === 'vi' ? 'Thiết kế' : 'Design'}
            </span>
            <h4 style={{ fontSize: '15px', fontWeight: 500, marginBottom: '8px' }}>{language === 'vi' ? 'Thoải mái & Ấm áp' : 'Airy & Warm'}</h4>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              {language === 'vi'
                ? 'Các thiết kế của chúng tôi sở hữu phom dáng cân đối, các chi tiết ve áo cổ điển và nút cài tinh tế, hoàn hảo cho phong cách phối nhiều lớp mỗi ngày.'
                : 'Our garments feature a balanced silhouette, classic notch detailing, and clean closures, perfect for multi-layered everyday styling.'}
            </p>
          </div>
          <div style={{ borderLeft: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border)', padding: '0 40px' }} className="info-col-mid">
            <span style={{ fontSize: '10px', color: 'var(--color-text-light)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '14px' }}>
              {language === 'vi' ? 'Chất lượng' : 'Quality'}
            </span>
            <h4 style={{ fontSize: '15px', fontWeight: 500, marginBottom: '8px' }}>{language === 'vi' ? 'Sản xuất tại Ý & Bồ Đào Nha' : 'Made in Italy & Portugal'}</h4>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              {language === 'vi'
                ? 'Được chế tác từ các nhà dệt lâu đời của châu Âu chú trọng vào các quy chuẩn sản xuất thân thiện với môi trường và lựa chọn sợi thô thượng hạng.'
                : 'Fashioned by dedicated European mills focusing on sustainable manufacturing standards and high-grade raw material selections.'}
            </p>
          </div>
          <div>
            <span style={{ fontSize: '10px', color: 'var(--color-text-light)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '14px' }}>
              {language === 'vi' ? 'Bền vững' : 'Sustainability'}
            </span>
            <h4 style={{ fontSize: '15px', fontWeight: 500, marginBottom: '8px' }}>{language === 'vi' ? 'Nguồn sợi hữu cơ rõ ràng' : 'Sustainable Fiber Sourcing'}</h4>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              {language === 'vi'
                ? 'Dệt từ 100% cotton poplin hữu cơ được chứng nhận, len baby alpaca mềm mại và cashmere thượng hạng giúp tôn vinh và gìn giữ đa dạng sinh học.'
                : 'Crafted from 100% certified organic cotton poplin, baby alpaca, and single-origin cashmere that protect biodiversity.'}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Elegant Ease Editorial Banner */}
      <section className="container" style={{ padding: '80px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 className="font-serif" style={{ fontSize: '36px', fontWeight: 400 }}>{language === 'vi' ? 'Phong Cách Tối Giản' : 'Elegant Ease'}</h2>
          <p style={{ fontSize: '13px', color: 'var(--color-text-light)', marginTop: '8px', letterSpacing: '0.05em' }}>
            {language === 'vi' ? 'Cảm hứng cho tủ đồ thiết yếu của bạn' : 'Inspiration for Your Essential Wardrobe'}
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }} className="editorial-grid">
          <div style={{ aspectRatio: '1.1 / 1', overflow: 'hidden', backgroundColor: 'var(--color-card-bg)' }}>
            <img src={dropdownModel} alt="Model Editorial 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
          </div>
          <div style={{ aspectRatio: '1.1 / 1', overflow: 'hidden', backgroundColor: 'var(--color-card-bg)' }}>
            <img src={promoModel} alt="Model Editorial 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
          </div>
        </div>
      </section>

      {/* 4. Mock Reviews Section */}
      <section className="container" style={{ borderTop: '1px solid var(--color-border)', padding: '64px 48px' }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '40px' }} className="reviews-summary-row">
          <span style={{ fontSize: '32px', fontWeight: 500 }}>4.4</span>
          <div>
            <div style={{ color: 'var(--color-text-primary)', display: 'flex', gap: '2px' }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={15} fill={i < 4 ? 'black' : 'none'} stroke="black" />
              ))}
            </div>
            <span style={{ fontSize: '12px', color: 'var(--color-text-light)', display: 'block', marginTop: '2px', textAlign: 'left' }}>
              {t('based_on_reviews', { count: 14 })}
            </span>
          </div>
        </div>

        {/* Mock Reviews Lists */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '24px', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-text-light)', marginBottom: '8px' }}>
              <strong>Alayne A.</strong>
              <span>01/12/24</span>
            </div>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={11} fill="black" stroke="black" />)}
            </div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>{language === 'vi' ? 'Sản phẩm cơ bản hoàn hảo!' : 'Perfect Essential!'}</h4>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              {language === 'vi' 
                ? 'Đây là món đồ không thể thiếu trong tủ đồ của tôi. Siêu mềm mịn và mặc rất thoải mái, vải mỏng nhẹ nhưng giữ ấm tốt.'
                : 'This is an amazing staple for my wardrobe. So soft and effortless, lightweight but extremely warm.'}
            </p>
          </div>
          <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '24px', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-text-light)', marginBottom: '8px' }}>
              <strong>Cynthia V.</strong>
              <span>12/29/23</span>
            </div>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={11} fill="black" stroke="black" />)}
            </div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>{language === 'vi' ? 'Sang trọng & Cá tính' : 'Chic and edgy'}</h4>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              {language === 'vi'
                ? 'Phần cổ phễu rủ xuống cực kỳ thanh lịch. Chất liệu siêu mềm mịn và phom dáng lửng rất hợp mặc cùng quần cạp cao.'
                : 'Beautiful funnel neck lays elegantly. The material is very soft and the length fits perfectly high waisted.'}
            </p>
          </div>
        </div>
      </section>

      {/* 5. Style With Section */}
      <section className="container" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '64px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('style_with')}</h2>
        </div>
        <div className="product-grid recs-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {styleWithProducts.map(p => {
            const pLocalized = tProduct(p);
            return (
              <div key={p.id} className="product-card" onClick={() => onSelectProduct(p)}>
                <div className="product-image-container">
                  <img src={p.image} alt={pLocalized.name} className="product-image" loading="lazy" />
                  <button className="quick-add-btn" onClick={(e) => { e.stopPropagation(); onAddToBag(p, p.sizes[0], p.colors[0], 1); }}><ShoppingBag size={18} /></button>
                </div>
                <div className="product-info" style={{ textAlign: 'left' }}>
                  <span className="product-name">{pLocalized.name}</span>
                  <span className="product-price">{formatPrice(p.price)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Recently Viewed Section */}
      <section className="container" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '64px', marginTop: '64px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('recently_viewed')}</h2>
        </div>
        <div className="product-grid recs-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {recentlyViewed.map(p => {
            const pLocalized = tProduct(p);
            return (
              <div key={p.id} className="product-card" onClick={() => onSelectProduct(p)}>
                <div className="product-image-container">
                  <img src={p.image} alt={pLocalized.name} className="product-image" loading="lazy" />
                  <button className="quick-add-btn" onClick={(e) => { e.stopPropagation(); onAddToBag(p, p.sizes[0], p.colors[0], 1); }}><ShoppingBag size={18} /></button>
                </div>
                <div className="product-info" style={{ textAlign: 'left' }}>
                  <span className="product-name">{pLocalized.name}</span>
                  <span className="product-price">{formatPrice(p.price)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Detail CSS Responsive */}
      <style>{`
        @media (max-width: 900px) {
          .detail-layout {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .info-cols-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .info-col-mid {
            border: none !important;
            padding: 0 !important;
          }
          .editorial-grid {
            grid-template-columns: 1fr !important;
          }
          .recs-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </div>
  );
};
