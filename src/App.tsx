import { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ShoppingBagDrawer } from './components/layout/ShoppingBagDrawer';
import { QuickViewModal } from './components/product/QuickViewModal';
import { NewsletterPopup } from './components/layout/NewsletterPopup';
import { CartProvider, useCart } from './context/CartContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Home } from './pages/Home';
import { ProductList } from './pages/ProductList';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { SearchResults } from './pages/SearchResults';
import type { Product } from './types';
import { MOCK_PRODUCTS } from './data/mockData';
import './App.css';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProductDetail, setActiveProductDetail] = useState<Product | null>(null);
  
  // Discount percentage state (unlocked via newsletter or applied in checkout)
  const [discount, setDiscount] = useState<number>(0);

  // Overlay states
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const { language } = useLanguage();

  useEffect(() => {
    document.title = language === 'vi' ? 'GenX PKS | Cửa hàng thời trang bền vững' : 'GenX PKS | Sustainable Fashion Store';
  }, [language]);

  // Cart operations from context
  const {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    cartCount,
    toastMessage,
    toastActive
  } = useCart();

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickViewOpen = (product: Product) => {
    setQuickViewProduct(product);
    setQuickViewOpen(true);
  };

  const handleQuickViewClose = () => {
    setQuickViewOpen(false);
    // Delay resetting product so animation finishes smoothly
    setTimeout(() => setQuickViewProduct(null), 300);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory(''); // Reset category when doing a free-text search
    setCurrentPage('search-results');
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery(''); // Reset search when clicking direct categories
  };

  const handleProductSelect = (product: Product) => {
    setActiveProductDetail(product);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter products for Search Results page
  const searchedProducts = MOCK_PRODUCTS.filter(
    (p) => {
      const matchEn = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchVi = 
        (p.nameVi && p.nameVi.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.categoryVi && p.categoryVi.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.descriptionVi && p.descriptionVi.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchEn || matchVi;
    }
  );

  return (
    <div className="app-container">
      {/* Global Navigation Header */}
      <Header 
        cartCount={cartCount} 
        onCartClick={() => setCartDrawerOpen(true)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
      />

      {/* Main Dynamic View Content */}
      <main style={{ flexGrow: 1 }}>
        {currentPage === 'home' && (
          <Home 
            onPageChange={handlePageChange} 
            onQuickView={handleQuickViewOpen}
            onAddToBag={addToCart}
            onCategorySelect={handleCategorySelect}
            onSelectProduct={handleProductSelect}
          />
        )}
        
        {currentPage === 'shop' && (
          <ProductList 
            onQuickView={handleQuickViewOpen}
            onAddToBag={addToCart}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            onClearSearch={handleClearSearch}
            onSelectProduct={handleProductSelect}
          />
        )}

        {currentPage === 'product-detail' && activeProductDetail && (
          <ProductDetail
            product={activeProductDetail}
            onBack={() => handlePageChange('shop')}
            onAddToBag={addToCart}
            onSelectProduct={handleProductSelect}
          />
        )}

        {currentPage === 'cart' && (
          <Cart 
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
            onClearCart={clearCart}
            onPageChange={handlePageChange}
            appliedDiscount={discount}
            onApplyDiscount={setDiscount}
          />
        )}

        {currentPage === 'search-results' && (
          <SearchResults 
            products={searchedProducts}
            query={searchQuery}
            onQuickView={handleQuickViewOpen}
            onAddToBag={addToCart}
            onPageChange={handlePageChange}
            onSelectProduct={handleProductSelect}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Shopping Bag Drawer (Shopping bag - desktop.png) */}
      <ShoppingBagDrawer 
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onViewCart={() => {
          setCartDrawerOpen(false);
          handlePageChange('cart');
        }}
        onCheckout={() => {
          setCartDrawerOpen(false);
          handlePageChange('cart');
        }}
      />

      {/* Interactive Quick View Modal (Quick view - desktop.png) */}
      <QuickViewModal 
        isOpen={quickViewOpen}
        product={quickViewProduct}
        onClose={handleQuickViewClose}
        onAddToBag={addToCart}
        onViewFullDetails={(product) => {
          handleQuickViewClose();
          handleProductSelect(product);
        }}
      />

      {/* 15% Off Newsletter Promo Modal Popup on Entrance */}
      <NewsletterPopup onUnlockDiscount={(discountPercentage) => setDiscount(discountPercentage)} />

      {/* Global Toast Alert Notification */}
      <div className={`toast-notification ${toastActive ? 'active' : ''}`}>
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </LanguageProvider>
  );
}
