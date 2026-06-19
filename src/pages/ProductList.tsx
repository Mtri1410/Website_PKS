import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDown, Heart, ShoppingBag, X } from 'lucide-react';
import type { Product, ColorOption } from '../types';
import { MOCK_PRODUCTS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

// Helper lists and mappings defined outside component to optimize performance
const allCategories = ['Outerwear', 'Skirts', 'Pants & Leggings', 'Lounge'];

const categoryKeyMap: Record<string, string> = {
  'Outerwear': 'Áo khoác',
  'Skirts': 'Chân váy',
  'Pants & Leggings': 'Quần dài',
  'Lounge': 'Đồ mặc nhà & Đồ len'
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

const allColors = [
  { name: 'Oatmeal', hex: '#E2D3C1' },
  { name: 'Black', hex: '#111111' },
  { name: 'Light Blue', hex: '#8FA9C4' },
  { name: 'Grey', hex: '#808080' },
  { name: 'Sand', hex: '#E8C39E' },
  { name: 'Brown', hex: '#A07855' }
];

const sizeDetails = [
  { key: 'XS', labelEn: 'Extra Small', labelVi: 'Cực nhỏ' },
  { key: 'S', labelEn: 'Small', labelVi: 'Nhỏ' },
  { key: 'M', labelEn: 'Medium', labelVi: 'Trung bình' },
  { key: 'L', labelEn: 'Large', labelVi: 'Lớn' },
  { key: 'XL', labelEn: 'Extra Large', labelVi: 'Cực lớn' }
];

const materialDetails = [
  { key: 'Cotton', labelEn: 'Cotton', labelVi: 'Cotton' },
  { key: 'Pima', labelEn: 'Pima', labelVi: 'Pima' },
  { key: 'Silk', labelEn: 'Silk', labelVi: 'Silk' }
];

interface ProductListProps {
  onQuickView?: (product: Product) => void;
  onAddToBag: (product: Product, size: string, color: ColorOption, qty: number) => void;
  selectedCategory: string;
  searchQuery: string;
  onClearSearch: () => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  onQuickView,
  onAddToBag,
  selectedCategory,
  searchQuery,
  onClearSearch,
  onSelectProduct
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [sizeFilter, setSizeFilter] = useState<string[]>([]);
  const [colorFilter, setColorFilter] = useState<string[]>([]);
  const [materialFilter, setMaterialFilter] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [filtersVisible, setFiltersVisible] = useState(false);

  const { language, t, tProduct } = useLanguage();
  const { toggleWishlist, isInWishlist } = useCart();

  // Disable page scroll when Filter Drawer is open
  useEffect(() => {
    if (filtersVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [filtersVisible]);

  // Sync category select from home page / header menu
  useEffect(() => {
    if (selectedCategory) {
      setCategoryFilter([selectedCategory]);
    } else {
      setCategoryFilter([]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (searchQuery) {
      setCategoryFilter([]);
      setSizeFilter([]);
      setColorFilter([]);
      setMaterialFilter([]);
    }
  }, [searchQuery]);

  const handleCategoryClick = (cat: string) => {
    if (categoryFilter.includes(cat)) {
      setCategoryFilter([]);
    } else {
      setCategoryFilter([cat]);
    }
    onClearSearch();
  };

  const handleSizeClick = (size: string) => {
    if (sizeFilter.includes(size)) {
      setSizeFilter(sizeFilter.filter(s => s !== size));
    } else {
      setSizeFilter([...sizeFilter, size]);
    }
  };

  const handleColorClick = (colorName: string) => {
    if (colorFilter.includes(colorName)) {
      setColorFilter(colorFilter.filter(c => c !== colorName));
    } else {
      setColorFilter([...colorFilter, colorName]);
    }
  };

  const handleMaterialClick = (materialName: string) => {
    if (materialFilter.includes(materialName)) {
      setMaterialFilter(materialFilter.filter(m => m !== materialName));
    } else {
      setMaterialFilter([...materialFilter, materialName]);
    }
  };

  const handleResetFilters = () => {
    setCategoryFilter([]);
    setSizeFilter([]);
    setColorFilter([]);
    setMaterialFilter([]);
    onClearSearch();
  };

  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p => 
          p.name.toLowerCase().includes(q) || 
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.nameVi && p.nameVi.toLowerCase().includes(q)) ||
          (p.categoryVi && p.categoryVi.toLowerCase().includes(q)) ||
          (p.descriptionVi && p.descriptionVi.toLowerCase().includes(q))
      );
    }

    if (categoryFilter.length > 0) {
      result = result.filter(p => categoryFilter.includes(p.category));
    }

    if (sizeFilter.length > 0) {
      result = result.filter(p => p.sizes.some(s => sizeFilter.includes(s)));
    }

    if (colorFilter.length > 0) {
      result = result.filter(p => p.colors.some(c => colorFilter.includes(c.name)));
    }

    if (materialFilter.length > 0) {
      result = result.filter(p => p.material && materialFilter.includes(p.material));
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [categoryFilter, sizeFilter, colorFilter, materialFilter, sortBy, searchQuery]);

  return (
    <div className="container" style={{ padding: '40px 48px 80px' }}>
      
      {/* 1. Page Title */}
      <div style={{ textAlign: 'left', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 400, letterSpacing: '0.02em', textTransform: 'capitalize' }}>
          {searchQuery 
            ? (language === 'vi' ? `Kết quả tìm kiếm cho "${searchQuery}"` : `Search results for "${searchQuery}"`)
            : (categoryFilter[0] 
                ? (language === 'vi' ? (categoryKeyMap[categoryFilter[0]] || categoryFilter[0]) : categoryFilter[0]) 
                : (language === 'vi' ? 'Cửa hàng' : 'Shop'))}
        </h1>
      </div>

      {/* 2. Horizontal Filter Options Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '20px',
        borderBottom: '1px solid var(--color-border)',
        marginBottom: '40px'
      }} className="filter-option-bar">
        {/* Left Category pills */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`category-pill ${categoryFilter.includes(cat) ? 'active' : ''}`}
            >
              {language === 'vi' ? (categoryKeyMap[cat] || cat) : cat}
            </button>
          ))}
        </div>

        {/* Right Sort & Sidebar Filters toggle */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {/* Sorting Dropdown */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '13px', color: 'var(--color-text-light)' }}>{language === 'vi' ? 'Sắp xếp' : 'Sort'}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                appearance: 'none',
                padding: '4px 24px 4px 8px',
                fontSize: '13px',
                border: 'none',
                backgroundColor: 'transparent',
                outline: 'none',
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              <option value="featured">{t('sort_featured')}</option>
              <option value="price-low">{t('sort_price_low')}</option>
              <option value="price-high">{t('sort_price_high')}</option>
              <option value="rating">{t('sort_rating')}</option>
            </select>
            <ChevronDown size={14} style={{ color: 'var(--color-text-secondary)', pointerEvents: 'none' }} />
          </div>

          {/* Inline Filter Panel Toggle */}
          <button
            onClick={() => setFiltersVisible(true)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: 500
            }}
          >
            {language === 'vi' ? 'Bộ lọc' : 'Filters'}
          </button>
        </div>
      </div>

      {/* 3. Catalog Products Grid */}
      <div className="shop-grid-layout">
        <div>
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ color: 'var(--color-text-light)', fontSize: '14px', marginBottom: '16px' }}>{t('no_items_match')}</p>
              <button onClick={handleResetFilters} className="btn btn-secondary" style={{ width: 'auto' }}>{t('reset_refinement')}</button>
            </div>
          ) : (
            <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
              {filteredProducts.map((product) => {
                const localized = tProduct(product);
                return (
                  <div 
                    key={product.id} 
                    className="product-card" 
                    onClick={() => onSelectProduct(product)}
                  >
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
                      >
                        <Heart size={17} fill={isInWishlist(product.id) ? "var(--color-text-primary)" : "none"} />
                      </button>

                      {/* Quick Add Plus Icon */}
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

                    {/* Details */}
                    <div className="product-info" style={{ textAlign: 'left' }}>
                      <span className="product-name">{localized.name}</span>
                      <span className="product-price">${product.price}</span>
                      
                      {/* Render color choices dots if they have multiple colors */}
                      {product.colors.length > 1 && (
                        <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
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
      </div>

      {/* 4. Filter Drawer Overlay (Figma Mockup compliant) */}
      {filtersVisible && (
        <>
          {/* Backdrop blur overlay */}
          <div 
            className="filter-drawer-backdrop"
            onClick={() => setFiltersVisible(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(4px)',
              zIndex: 900,
              animation: 'fadeIn 0.3s ease'
            }}
          />

          {/* Drawer Panel */}
          <div 
            className="filter-drawer-panel"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              maxWidth: '100%',
              height: '100vh',
              backgroundColor: 'var(--color-white)',
              boxShadow: '-4px 0 20px rgba(0,0,0,0.15)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              animation: 'slideInRight 0.3s ease',
              textAlign: 'left'
            }}
          >
            {/* Drawer Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '24px 32px',
              borderBottom: '1px solid var(--color-border)'
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: 500, letterSpacing: '0.05em', margin: 0, color: 'var(--color-text-primary)', fontFamily: 'var(--font-serif)' }}>
                {language === 'vi' ? 'Bộ lọc' : 'Filters'}
              </h2>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {(sizeFilter.length > 0 || colorFilter.length > 0 || materialFilter.length > 0) && (
                  <button
                    onClick={handleResetFilters}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '12px',
                      textDecoration: 'underline',
                      color: 'var(--color-text-secondary)',
                      padding: 0
                    }}
                  >
                    {language === 'vi' ? 'Xóa tất cả' : 'Clear All'}
                  </button>
                )}
                <button 
                  onClick={() => setFiltersVisible(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px' }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '40px'
            }}>
              {/* Color Swatches */}
              <div>
                <h4 style={{ fontSize: '12px', fontWeight: 600, marginBottom: '16px', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--color-text-light)' }}>
                  {language === 'vi' ? 'Màu sắc' : 'Color'}
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {allColors.map(color => {
                    const isActive = colorFilter.includes(color.name);
                    return (
                      <button
                        key={color.name}
                        onClick={() => handleColorClick(color.name)}
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          border: isActive ? '1px solid #000000' : '1px solid transparent',
                          padding: '3px',
                          backgroundColor: 'transparent',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'border-color 0.2s ease',
                          outline: 'none'
                        }}
                        title={language === 'vi' ? (colorTranslationMap[color.name] || color.name) : color.name}
                      >
                        <div style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          backgroundColor: color.hex,
                          border: color.hex.toLowerCase() === '#ffffff' ? '1px solid #e5e5e5' : 'none'
                        }} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Material List */}
              <div>
                <h4 style={{ fontSize: '12px', fontWeight: 600, marginBottom: '16px', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--color-text-light)' }}>
                  {language === 'vi' ? 'Chất liệu' : 'Material'}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {materialDetails.map(mat => {
                    const isActive = materialFilter.includes(mat.key);
                    const count = MOCK_PRODUCTS.filter(p => {
                      if (categoryFilter.length > 0 && !categoryFilter.includes(p.category)) return false;
                      if (colorFilter.length > 0 && !p.colors.some(c => colorFilter.includes(c.name))) return false;
                      if (sizeFilter.length > 0 && !p.sizes.some(s => sizeFilter.includes(s))) return false;
                      return p.material === mat.key;
                    }).length;

                    const label = language === 'vi' ? mat.labelVi : mat.labelEn;

                    return (
                      <div 
                        key={mat.key}
                        onClick={() => handleMaterialClick(mat.key)}
                        style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: isActive ? 600 : 400,
                          color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                          paddingBottom: '2px',
                          width: '100%',
                          boxSizing: 'border-box'
                        }}
                      >
                        <span style={{ textDecoration: isActive ? 'underline' : 'none' }}>{label}</span>
                        <span style={{ color: 'var(--color-text-light)', fontSize: '13px' }}>({count})</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Size List */}
              <div>
                <h4 style={{ fontSize: '12px', fontWeight: 600, marginBottom: '16px', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--color-text-light)' }}>
                  {language === 'vi' ? 'Kích cỡ' : 'Size'}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {sizeDetails.map(size => {
                    const isActive = sizeFilter.includes(size.key);
                    const count = MOCK_PRODUCTS.filter(p => {
                      if (categoryFilter.length > 0 && !categoryFilter.includes(p.category)) return false;
                      if (colorFilter.length > 0 && !p.colors.some(c => colorFilter.includes(c.name))) return false;
                      if (materialFilter.length > 0 && p.material && !materialFilter.includes(p.material)) return false;
                      return p.sizes.includes(size.key);
                    }).length;

                    const label = language === 'vi' ? size.labelVi : size.labelEn;

                    return (
                      <div 
                        key={size.key}
                        onClick={() => handleSizeClick(size.key)}
                        style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: isActive ? 600 : 400,
                          color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                          paddingBottom: '2px',
                          width: '100%',
                          boxSizing: 'border-box'
                        }}
                      >
                        <span style={{ textDecoration: isActive ? 'underline' : 'none' }}>{label}</span>
                        <span style={{ color: 'var(--color-text-light)', fontSize: '13px' }}>({count})</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom CTA Button */}
            <div style={{
              padding: '24px 32px',
              borderTop: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-white)'
            }}>
              <button
                onClick={() => setFiltersVisible(false)}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  height: '52px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {language === 'vi' 
                  ? `Xem kết quả (${filteredProducts.length})` 
                  : `See Results (${filteredProducts.length})`}
              </button>
            </div>
          </div>
        </>
      )}
      
      {/* Drawer Animations & Styles */}
      <style>{`
        .filter-drawer-panel {
          width: 400px;
        }
        @media (max-width: 480px) {
          .filter-drawer-panel {
            width: 100% !important;
          }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (max-width: 768px) {
          .filter-option-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </div>
  );
};

