import type { CartItem, Product } from "../types/types";

/*
Работа с корзиной в localStorage

- Базовые операции при работе с корзиной (getCartKey, loadCart, saveCart)
- Поиск, добавление, удаление товаров, очистка корзины (findItemInCart, addNewToCart, removeFromCart, clearCart)
- Изменение количества товаров (plus, minus)
- Подсчеты (getCartTotalCount, getCartTotalPrice)

- userId = 0 - анонимный пользователь, корзина не сохраняется

- saveCart диспатчит событие 'cartUpdated' для синхронизации.
*/

export const getCartKey = (userId: number) => `cart_${userId}`;

export const loadCart = (userId: number):CartItem[] => {
  if (userId === 0) return [];
  const key = getCartKey(userId);
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : [];
};

export const saveCart = (userId: number, cart: CartItem[]) => {
  if (userId === 0) return;
  const key = getCartKey(userId);
  localStorage.setItem(key, JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
};

export const findItemInCart = (userId: number, productId: number) => {
  const cart = loadCart(userId);
  return cart.find(item => item.id === productId);
};

export const addNewToCart = (userId: number, product: Product) => {
  const cart = loadCart(userId);    
  const newCart = [...cart, { ...product, quantity: 1 }];  
  saveCart(userId, newCart);
  return newCart;
};

export const removeFromCart = (userId: number, productId: number) => {
  const cart = loadCart(userId);
  const newCart = cart.filter(item => item.id !== productId);
  saveCart(userId, newCart);
  return newCart;
};

export const plus = (userId: number, productId: number) => {
  const cart = loadCart(userId);
  const newCart = cart.map(item =>
    item.id === productId
      ? { ...item, quantity: item.quantity + 1 }
      : item
  );
  saveCart(userId, newCart);
  return newCart;
};

export const minus = (userId: number, productId: number) => {
  const cart = loadCart(userId);
  const item = findItemInCart(userId, productId);
  
  if (!item) return cart;
  
  if (item.quantity === 1) {
    return removeFromCart(userId, productId);
  }
  
  const newCart = cart.map(item =>
    item.id === productId
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
  saveCart(userId, newCart);
  return newCart;
};

export const clearCart = (userId: number) => {
  saveCart(userId, []);
};

export const getCartTotalCount = (userId: number): number => {
  const cart = loadCart(userId);
  return cart.reduce((sum, item) => sum + item.quantity, 0);
};

export const getCartTotalPrice = (userId: number): number => {
  const cart = loadCart(userId);
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
};


