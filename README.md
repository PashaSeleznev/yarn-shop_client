# Магазин пряжи

## Описание

Интернет-магазин для продажи пряжи и аксессуаров для вязания.

Основные технологии:
- React + TypeScript
- React Router
- LocalStorage для корзины
- Юкасса (платёжная система)

---

## Структура проекта

```
client/
├── public/
│ ├── background/
│ ├── catalog/
│ ├── users/
│ └── другие изображения
│
├── src/
│ ├── components/
│ │ ├── AboutUsPage.tsx
│ │ ├── CartPage.tsx
│ │ ├── CatalogPage.tsx
│ │ ├── Footer.tsx
│ │ ├── Header.tsx
│ │ ├── LoginPage.tsx
│ │ ├── MainPage.tsx
│ │ ├── Modal.tsx
│ │ ├── OrdersPage.tsx
│ │ ├── PaymentStatusChecker.tsx
│ │ ├── ProfilePage.tsx
│ │ ├── RegisterPage.tsx
│ │ └── ReviewsPage.tsx
│ ├── hooks/
│ │ └── useCart.ts
│ ├── products/
│ │ └── products.ts
│ ├── reviews/
│ │ └── reviews.ts
│ ├── types/
│ │ └── types.ts
│ ├── utils/
│ │ └── utils.ts
│ ├── App.tsx
│ ├── index.css
│ └── main.tsx
│
├── index.html
└── package.json
```
---

## Функционал

- Каталог товаров с пагинацией
- Корзина с изменением количества
- Авторизация и регистрация
- Оформление заказа с доставкой
- История заказов
- Отзывы покупателей

---

## Запуск проекта

```bash
npm install
npm run dev
```