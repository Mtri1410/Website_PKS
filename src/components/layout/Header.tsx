import React, { useState } from 'react';
import { Search, MapPin, User, Heart, ShoppingBag } from 'lucide-react';
import dropdownModel from '../../assets/dropdown_model.png';
import { useLanguage } from '../../context/LanguageContext';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onPageChange: (page: string) => void;
  currentPage: string;
  onSearch: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onCartClick,
  onPageChange,
  currentPage,
  onSearch,
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { language, setLanguage, t } = useLanguage();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      onPageChange('search-results');
      setSearchOpen(false);
    }
  };

  const megaMenuData = {
    categories: ['Bags', 'Clothing', 'Leather Goods', 'Accessories', 'Gifts', 'Shop All'],
    featured: ['New Arrivals', 'Bestsellers', 'Trending Now', 'Loungewear'],
    collections: ['Party and events', 'Office looks', 'Selection', 'Online Exclusive', 'Knitwear', 'Total Look', 'Basics']
  };

  const menuKeyMap: Record<string, string> = {
    'Bags': 'menu_bags',
    'Clothing': 'menu_clothing',
    'Leather Goods': 'menu_leather',
    'Accessories': 'menu_accessories',
    'Gifts': 'menu_gifts',
    'Shop All': 'menu_shop_all',
    'New Arrivals': 'nav_new_arrivals',
    'Bestsellers': 'menu_bestsellers',
    'Trending Now': 'menu_trending',
    'Loungewear': 'menu_loungewear',
    'Party and events': 'menu_party',
    'Office looks': 'menu_office',
    'Selection': 'menu_selection',
    'Online Exclusive': 'menu_online_exclusive',
    'Knitwear': 'menu_knitwear',
    'Total Look': 'menu_total_look',
    'Basics': 'menu_basics'
  };

  const handleLinkClick = (page: string, category?: string) => {
    if (category) {
      onSearch(category);
    } else {
      onSearch(''); // Reset filter
    }
    onPageChange(page);
  };

  return (
    <div style={{ zIndex: 100, position: 'relative' }}>
      {/* 1. Announcement Bar (Top) */}
      <div style={{
        backgroundColor: '#000000',
        color: '#ffffff',
        textAlign: 'center',
        padding: '10px 0',
        fontSize: '11px',
        fontWeight: 400,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        borderBottom: '1px solid #111111'
      }}>
        {t('announcement_bar')} <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => handleLinkClick('shop')}>{t('shop_now_link')}</span>
      </div>

      {/* 2. Main Navigation Header */}
      <header style={{
        backgroundColor: 'var(--color-white)',
        borderBottom: '1px solid var(--color-border)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '76px',
          position: 'relative'
        }}>
          {/* Left Group: Logo and Navigation Items */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '64px', height: '100%' }}>
            {/* Brand Logo - GenX PKS. */}
            <div 
              onClick={() => handleLinkClick('home')}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <span style={{
                fontSize: '24px',
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-text-primary)'
              }}>
                GenX PKS.
              </span>
            </div>

            {/* Navigation Items (Desktop) */}
            <nav style={{
              display: 'flex',
              gap: '36px',
              height: '100%',
              alignItems: 'center'
            }} className="header-nav">
              {/* Shop Link with Mega Menu Trigger */}
              <div className="mega-menu-trigger" style={{ height: '100%', display: 'flex', alignItems: 'center', position: 'static' }}>
                <button
                  onClick={() => handleLinkClick('shop')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: currentPage === 'shop' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    height: '100%',
                    padding: '0 8px'
                  }}
                >
                  {t('nav_shop')}
                </button>

                {/* Mega Menu Dropdown */}
                <div className="mega-menu" style={{ width: '100vw', left: 0, right: 0 }}>
                  <div className="container" style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1.2fr 1.5fr 2fr',
                    gap: '40px',
                    paddingTop: '48px',
                    paddingBottom: '48px',
                    textAlign: 'left'
                  }}>
                    {/* Categories Column */}
                    <div>
                      <h4 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-light)', marginBottom: '20px' }}>{t('menu_categories')}</h4>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px' }}>
                        {megaMenuData.categories.map((item) => (
                          <li key={item}>
                            <span 
                              onClick={() => handleLinkClick('shop', item === 'Shop All' ? '' : item)}
                              style={{ cursor: 'pointer', transition: 'var(--transition-fast)' }}
                              className="mega-menu-link"
                            >
                              {t(menuKeyMap[item] || item)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Featured Column */}
                    <div>
                      <h4 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-light)', marginBottom: '20px' }}>{t('menu_featured')}</h4>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px' }}>
                        {megaMenuData.featured.map((item) => (
                          <li key={item}>
                            <span 
                              onClick={() => handleLinkClick('shop', item)}
                              style={{ cursor: 'pointer', transition: 'var(--transition-fast)' }}
                              className="mega-menu-link"
                            >
                              {t(menuKeyMap[item] || item)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Collections Column */}
                    <div>
                      <h4 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-light)', marginBottom: '20px' }}>{t('menu_collections')}</h4>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px' }}>
                        {megaMenuData.collections.map((item) => (
                          <li key={item}>
                            <span 
                              onClick={() => handleLinkClick('shop', item)}
                              style={{ cursor: 'pointer', transition: 'var(--transition-fast)' }}
                              className="mega-menu-link"
                            >
                              {t(menuKeyMap[item] || item)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Visual Portrait Image Column (Right) */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <div style={{
                        width: '100%',
                        maxWidth: '320px',
                        aspectRatio: '1.2 / 1',
                        borderRadius: '2px',
                        overflow: 'hidden',
                        position: 'relative',
                        backgroundColor: 'var(--color-card-bg)'
                      }}>
                        <img 
                          src={dropdownModel} 
                          alt={language === 'vi' ? 'Mua sắm Bộ sưu tập Mùa hè' : 'Shop Summer Collection'} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Navigation Links */}
              <button
                onClick={() => handleLinkClick('shop', 'New Arrivals')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--color-text-secondary)',
                  padding: '8px 0'
                }}
              >
                {t('nav_new_arrivals')}
              </button>

              <button
                onClick={() => handleLinkClick('shop', 'Sale')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--color-text-secondary)',
                  padding: '8px 0'
                }}
              >
                {t('nav_sales')}
              </button>

              <button
                onClick={() => handleLinkClick('home')} // Journal redirects back to home or standard info
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--color-text-secondary)',
                  padding: '8px 0'
                }}
              >
                {t('nav_journal')}
              </button>
            </nav>
          </div>

          {/* Right Utilities Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
            {/* Inline Search Bar */}
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
              <input
                type="text"
                placeholder={t('search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: searchOpen ? '160px' : '0px',
                  opacity: searchOpen ? 1 : 0,
                  padding: searchOpen ? '6px 12px 6px 30px' : '0px',
                  border: searchOpen ? '1px solid var(--color-border)' : 'none',
                  borderRadius: '2px',
                  outline: 'none',
                  fontSize: '12px',
                  fontFamily: 'var(--font-sans)',
                  transition: 'all var(--transition-fast)',
                  backgroundColor: 'var(--color-card-bg)'
                }}
              />
              <button
                type="button"
                onClick={() => {
                  if (searchOpen && searchQuery.trim()) {
                    onSearch(searchQuery);
                    onPageChange('search-results');
                    setSearchOpen(false);
                  } else {
                    setSearchOpen(!searchOpen);
                  }
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-text-primary)',
                  position: searchOpen ? 'absolute' : 'static',
                  left: searchOpen ? '8px' : 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-label="Search"
              >
                <Search size={19} />
              </button>
            </form>

            {/* Stores link */}
            <div 
              onClick={() => alert('Store locations: New York, Los Angeles, Paris. Coming soon to your browser!')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.03em'
              }}
              className="stores-link"
            >
              <MapPin size={18} />
              <span className="stores-text" style={{ textTransform: 'none' }}>{t('stores')}</span>
            </div>

            {/* User Account Button */}
            <button
              onClick={() => alert('Account Dashboard coming soon.')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center' }}
            >
              <User size={19} />
            </button>

            {/* Language Switcher VIE | ENG */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '13px',
              fontWeight: 500,
              gap: '6px',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              userSelect: 'none',
              marginLeft: '4px'
            }}>
              <span 
                onClick={() => setLanguage('vi')}
                style={{ 
                  color: language === 'vi' ? 'var(--color-text-primary)' : 'var(--color-text-light)',
                  fontWeight: language === 'vi' ? '600' : '400',
                  textDecoration: language === 'vi' ? 'underline' : 'none',
                  textUnderlineOffset: '3px'
                }}
              >
                VIE
              </span>
              <span style={{ color: 'var(--color-text-light)', fontSize: '11px' }}>|</span>
              <span 
                onClick={() => setLanguage('en')}
                style={{ 
                  color: language === 'en' ? 'var(--color-text-primary)' : 'var(--color-text-light)',
                  fontWeight: language === 'en' ? '600' : '400',
                  textDecoration: language === 'en' ? 'underline' : 'none',
                  textUnderlineOffset: '3px'
                }}
              >
                ENG
              </span>
            </div>

            {/* Wishlist Icon */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleLinkClick('shop', 'Best Seller')}>
              <Heart size={19} />
              <span style={{ fontSize: '13px', fontWeight: 500, marginLeft: '4px' }}>0</span>
            </div>

            {/* Shopping Bag Icon */}
            <div 
              onClick={onCartClick}
              style={{ position: 'relative', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            >
              <ShoppingBag size={19} />
              <span style={{ fontSize: '13px', fontWeight: 500, marginLeft: '4px' }}>{cartCount}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Styled mega menu links */}
      <style>{`
        .mega-menu-link:hover {
          color: var(--color-accent-gold) !important;
          text-decoration: underline;
          text-underline-offset: 4px;
        }
        .stores-link:hover {
          color: var(--color-accent-gold);
        }
        @media (max-width: 900px) {
          .header-nav {
            display: none !important;
          }
          .stores-text {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
