import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, Product, ColorOption } from '../types';
import { useLanguage } from './LanguageContext';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size: string, color: ColorOption, quantity: number) => void;
  updateQuantity: (productId: string, size: string, colorName: string, quantity: number) => void;
  removeItem: (productId: string, size: string, colorName: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  showToast: (message: string, duration?: number, undoAction?: (() => void) | null) => void;
  toastMessage: string;
  toastActive: boolean;
  toastUndoAction: (() => void) | null;
  triggerUndo: () => void;
  // Wishlist
  wishlistItems: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useLanguage();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('genxpks_cart');
    // Maintain fallback compatibility
    const fallback = localStorage.getItem('genx_beauty_cart');
    return saved ? JSON.parse(saved) : (fallback ? JSON.parse(fallback) : []);
  });

  const [wishlistItems, setWishlistItems] = useState<Product[]>(() => {
    const saved = localStorage.getItem('genxpks_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [toastMessage, setToastMessage] = useState('');
  const [toastActive, setToastActive] = useState(false);
  const [toastUndoAction, setToastUndoAction] = useState<(() => void) | null>(null);
  const [toastDuration, setToastDuration] = useState(3000);

  useEffect(() => {
    localStorage.setItem('genxpks_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('genxpks_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const showToast = (message: string, duration: number = 3000, undoAction: (() => void) | null = null) => {
    setToastMessage(message);
    setToastUndoAction(() => undoAction);
    setToastDuration(duration);
    setToastActive(true);
  };

  const triggerUndo = () => {
    if (toastUndoAction) {
      toastUndoAction();
      setToastActive(false);
      setToastUndoAction(null);
    }
  };

  useEffect(() => {
    if (toastActive) {
      const timer = setTimeout(() => {
        setToastActive(false);
        setToastUndoAction(null);
      }, toastDuration);
      return () => clearTimeout(timer);
    }
  }, [toastActive, toastDuration]);

  const addToCart = (product: Product, size: string, color: ColorOption, quantity: number) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor.name === color.name
      );

      const prodName = language === 'vi' ? (product.nameVi || product.name) : product.name;

      if (existingIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingIndex].quantity += quantity;
        showToast(
          language === 'vi'
            ? `Đã cập nhật số lượng ${prodName} trong giỏ hàng.`
            : `Updated quantity of ${product.name} in bag.`
        );
        return newItems;
      }

      showToast(
        language === 'vi'
          ? `Đã thêm ${prodName} vào giỏ hàng.`
          : `Added ${product.name} to shopping bag.`
      );
      return [...prevItems, { product, selectedSize: size, selectedColor: color, quantity }];
    });
  };

  const updateQuantity = (productId: string, size: string, colorName: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, size, colorName);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId &&
        item.selectedSize === size &&
        item.selectedColor.name === colorName
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeItem = (productId: string, size: string, colorName: string) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find(
        (item) =>
          item.product.id === productId &&
          item.selectedSize === size &&
          item.selectedColor.name === colorName
      );
      if (itemToRemove) {
        const prodName = language === 'vi' ? (itemToRemove.product.nameVi || itemToRemove.product.name) : itemToRemove.product.name;
        showToast(
          language === 'vi'
            ? `Đã xóa ${prodName} khỏi giỏ hàng.`
            : `Removed ${itemToRemove.product.name} from bag.`
        );
      }
      return prevItems.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor.name === colorName
          )
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleWishlist = (product: Product) => {
    const prodName = language === 'vi' ? (product.nameVi || product.name) : product.name;
    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        showToast(
          language === 'vi'
            ? `Đã xóa ${prodName} khỏi danh sách yêu thích.`
            : `Removed ${product.name} from wishlist.`,
          5000,
          () => {
            setWishlistItems((current) => {
              if (current.some((item) => item.id === product.id)) return current;
              setTimeout(() => {
                showToast(
                  language === 'vi'
                    ? `Đã khôi phục ${prodName} vào danh sách yêu thích.`
                    : `Restored ${product.name} to wishlist.`,
                  3000
                );
              }, 100);
              return [...current, product];
            });
          }
        );
        return prev.filter((item) => item.id !== product.id);
      } else {
        showToast(
          language === 'vi'
            ? `Đã thêm ${prodName} vào danh sách yêu thích.`
            : `Added ${product.name} to wishlist.`,
          3000
        );
        return [...prev, product];
      }
    });
  };


  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const wishlistCount = wishlistItems.length;
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        cartCount,
        subtotal,
        showToast,
        toastMessage,
        toastActive,
        toastUndoAction,
        triggerUndo,
        // Wishlist variables
        wishlistItems,
        toggleWishlist,
        isInWishlist,
        wishlistCount

      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
