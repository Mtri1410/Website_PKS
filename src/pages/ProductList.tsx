import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDown, Heart, ShoppingBag } from 'lucide-react';
import type { Product, ColorOption } from '../types';
import { MOCK_PRODUCTS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';


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
  const [maxPrice, setMaxPrice] = useState(400); // Max $400 for clothing
  const [sortBy, setSortBy] = useState('featured');
  const [filtersVisible, setFiltersVisible] = useState(false);

  const { language, t, tProduct } = useLanguage();
  const { toggleWishlist, isInWishlist } = useCart();


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
    }
  }, [searchQuery]);

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

  const allSizes = ['XS', 'S', 'M', 'L', 'XL'];
  const allColors = [
    { name: 'Oatmeal', hex: '#E2D3C1' },
    { name: 'Black', hex: '#111111' },
    { name: 'Light Blue', hex: '#8FA9C4' },
    { name: 'Grey', hex: '#808080' },
    { name: 'Sand', hex: '#E8C39E' },
    { name: 'Brown', hex: '#A07855' }
  ];

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

  const handleResetFilters = () => {
    setCategoryFilter([]);
    setSizeFilter([]);
    setColorFilter([]);
    setMaxPrice(400);
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

    result = result.filter(p => p.price <= maxPrice);

    if (sizeFilter.length > 0) {
      result = result.filter(p => p.sizes.some(s => sizeFilter.includes(s)));
    }

    if (colorFilter.length > 0) {
      result = result.filter(p => p.colors.some(c => colorFilter.includes(c.name)));
    }

    // Sort sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [categoryFilter, sizeFilter, colorFilter, maxPrice, sortBy, searchQuery]);

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

      {/* 2. Horizontal Filter Options Bar (Matching Mockup) */}
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
            onClick={() => setFiltersVisible(!filtersVisible)}
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
            {t('filter_refine')}
          </button>
        </div>
      </div>

      {/* 3. Grid Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: filtersVisible ? '240px 1fr' : '1fr',
        gap: '40px',
        transition: 'all 0.3s ease'
      }} className="shop-grid-layout">
        
        {/* Left Filter Side Bar (Toggled) */}
        {filtersVisible && (
          <aside style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            textAlign: 'left',
            animation: 'fadeInLeft 0.3s ease'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('filter_refine')}</span>
              <button 
                onClick={handleResetFilters}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', textDecoration: 'underline', color: 'var(--color-text-light)' }}
              >
                {t('filter_clear_all')}
              </button>
            </div>

            {/* Size checklist */}
            <div>
              <span className="form-label" style={{ fontSize: '11px', color: 'var(--color-text-light)', marginBottom: '10px' }}>{t('filter_size')}</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {allSizes.map(size => (
                  <button
                    key={size}
                    onClick={() => handleSizeClick(size)}
                    className={`size-box ${sizeFilter.includes(size) ? 'active' : ''}`}
                    style={{ width: '36px', height: '36px', fontSize: '11px' }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color circles */}
            <div>
              <span className="form-label" style={{ fontSize: '11px', color: 'var(--color-text-light)', marginBottom: '10px' }}>{t('filter_color')}</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {allColors.map(color => (
                  <button
                    key={color.name}
                    className={`color-circle ${colorFilter.includes(color.name) ? 'active' : ''}`}
                    style={{ width: '22px', height: '22px' }}
                    onClick={() => handleColorClick(color.name)}
                    title={language === 'vi' ? (colorTranslationMap[color.name] || color.name) : color.name}
                  >
                    <div className="color-circle-fill" style={{ backgroundColor: color.hex }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Price slider */}
            <div>
              <span className="form-label" style={{ fontSize: '11px', color: 'var(--color-text-light)', marginBottom: '10px' }}>{t('filter_max_price', { price: maxPrice })}</span>
              <input 
                type="range" 
                min={20} 
                max={400} 
                step={10} 
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="range-slider"
              />
            </div>
          </aside>
        )}

        {/* Right Catalog View */}
        <div>
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ color: 'var(--color-text-light)', fontSize: '14px', marginBottom: '16px' }}>{t('no_items_match')}</p>
              <button onClick={handleResetFilters} className="btn btn-secondary" style={{ width: 'auto' }}>{t('reset_refinement')}</button>
            </div>
          ) : (
            /* Minimal borderless clothing product cards */
            <div className="product-grid" style={{ gridTemplateColumns: filtersVisible ? 'repeat(auto-fill, minmax(250px, 1fr))' : 'repeat(auto-fill, minmax(280px, 1fr))' }}>
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
      
      {/* Sidebar toggle animation */}
      <style>{`
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @media (max-width: 768px) {
          .filter-option-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          .shop-grid-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
