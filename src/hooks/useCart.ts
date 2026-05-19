import { useState, useEffect } from 'react';
import { loadCart, addNewToCart, plus, minus, removeFromCart, clearCart, getCartTotalCount, getCartTotalPrice } from '../utils/utils';
import type { CartItem, Product } from '../types/types';

/*
Хук для работы с корзиной

Что делает:
- Загружает корзину из localStorage при монтировании и смене userId
- Подписывается на событие 'cartUpdated' для синхронизации между компонентами
- Предоставляет методы для управления корзиной (добавление, изменение количества, удаление, очистка)

Возвращает:
- cart: CartItem[] - текущий массив товаров
- totalCount, totalPrice - итоговые значения количества и цены
- addToCart, increment, decrement, removeItem, clearCart - методы работы с корзиной

При userId = 0 методы ничего не делают, корзина не сохраняется
*/

export const useCart = (userId: number) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const addToCart = (product: Product) => {
    if (userId === 0) return;
    addNewToCart(userId, product);
  };

  const increment = (productId: number) => {
    if (userId === 0) return;
    plus(userId, productId);
  };

  const decrement = (productId: number) => {
    if (userId === 0) return;
    minus(userId, productId);
  };

  const removeItem = (productId: number) => {
    if (userId === 0) return;
    removeFromCart(userId, productId);
  };

  const clearCartItems = () => { 
    if (userId === 0) return;
  
    clearCart(userId);
    setCart([]);
    setTotalCount(0);
    setTotalPrice(0);
  }; 
  
  useEffect(() => {
    const refreshCart = () => {
      if (userId !== 0) {
        setCart(loadCart(userId));
        setTotalCount(getCartTotalCount(userId));
        setTotalPrice(getCartTotalPrice(userId));
      } else {
        setCart([]);
        setTotalCount(0);
        setTotalPrice(0);
      }
    };

    refreshCart();
    
    const handleCartUpdate = () => {
      refreshCart();
    };
    
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, [userId]);

  return {
    cart,
    totalCount,
    totalPrice,
    addToCart,
    increment,
    decrement,
    removeItem,
    clearCart: clearCartItems,
  };
};