import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, Product, ColorOption } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size: string, color: ColorOption, quantity: number) => void;
  updateQuantity: (productId: string, size: string, colorName: string, quantity: number) => void;
  removeItem: (productId: string, size: string, colorName: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  showToast: (message: string) => void;
  toastMessage: string;
  toastActive: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('genx_beauty_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [toastMessage, setToastMessage] = useState('');
  const [toastActive, setToastActive] = useState(false);

  useEffect(() => {
    localStorage.setItem('genx_beauty_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastActive(true);
  };

  useEffect(() => {
    if (toastActive) {
      const timer = setTimeout(() => {
        setToastActive(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastActive]);

  const addToCart = (product: Product, size: string, color: ColorOption, quantity: number) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor.name === color.name
      );

      if (existingIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingIndex].quantity += quantity;
        showToast(`Updated quantity of ${product.name} in bag.`);
        return newItems;
      }

      showToast(`Added ${product.name} to shopping bag.`);
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
        showToast(`Removed ${itemToRemove.product.name} from bag.`);
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
        toastActive
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
