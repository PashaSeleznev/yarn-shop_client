import type { Product } from "../types/types"

// Статический массив товаров для каталога

export const productsArray: Product[] = [
  {
    id: 1,
    name: "Овечья шерсть",
    color: "#f4e48c",
    price: 199.00,
    image: "/catalog/sheep_yellow.png"
  },
  {
    id: 2,
    name: "Альпака",
    color: "#7e91c9",
    price: 719.00,
    image: "/catalog/alpaca_blue.png"
  },
  {
    id: 3,
    name: "Кашемир",
    color: "#d9733c",
    price: 359.00,
    image: "/catalog/cashmere_pink.png"
  },
  {
    id: 4,
    name: "Пакет 1",
    color: "#34346b",
    price: 100.00,
    image: "/catalog/package_1.png"
  },
  {
    id: 5,
    name: "Пакет 2",
    color: "#FFFFFF",
    price: 100.00,
    image: "/catalog/package_2.png"
  },
  {
    id: 6,
    name: "Наклейки",
    color: "#34346b",
    price: 95.00,
    image: "/catalog/stickers.png"
  },
]