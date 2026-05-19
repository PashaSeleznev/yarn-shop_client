import { useState } from "react"
import type { User } from "./types/types"
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ProfilePage from "./components/ProfilePage";
import CatalogPage from "./components/CatalogPage";
import CartPage from "./components/CartPage";
import PaymentStatusChecker from "./components/PaymentStatusChecker";
import OrdersPage from "./components/OrdersPage";
import ReviewsPage from "./components/ReviewsPage";
import AboutUsPage from "./components/AboutUsPage";

/*
Главный компонент приложения

Структура:
- Header (шапка с навигацией и корзиной)
- PaymentStatusChecker (проверка статуса оплаты после редиректа с Юкассы)
- Routes (маршрутизация страниц)
- Footer (подвал)

Маршруты:
/          - Главная
/login     - Авторизация
/register  - Регистрация
/profile   - Профиль пользователя
/catalog   - Каталог товаров
/cart      - Корзина
/orders    - Заказы пользователя
/reviews   - Отзывы
/about-us  - О нас

Состояние:
- logUser — текущий авторизованный пользователь (из localStorage)
- nullUser — пустой пользователь
*/

const App = () => {
  const nullUser: User = {
    id: 0,
    username: "",
    email: "",
    password: "",
    orders: []
  }
  const [logUser, setLogUser] = useState<User>(() => {
    const saved = localStorage.getItem('logUser');
    return saved ? JSON.parse(saved) : nullUser;
  }); 

  return (
    <div className="wrapper">
      <Header 
        logUser = {logUser}
      />
      <PaymentStatusChecker 
        userId={logUser.id} 
        setLogUser={setLogUser}
      />
      <Routes>
        <Route 
          path="/"
          element={
            <MainPage/>
          }
        />
        <Route 
          path="/login"
          element={
            <LoginPage
              setLogUser={setLogUser}
            />
          }
        />
        <Route 
          path="/register"
          element={
            <RegisterPage />
          }
        />
        <Route 
          path="/profile"
          element={
            <ProfilePage
              logUser={logUser}
              setLogUser={setLogUser}
              nullUser={nullUser}
            />
          }
        />
        <Route 
          path="/catalog"
          element={
            <CatalogPage
              logUser={logUser}
            />
          }
        />
        <Route 
          path="/cart"
          element={
            <CartPage
              logUser={logUser}
            />
          }
        />
        <Route 
          path="/orders"
          element={
            <OrdersPage
              logUser={logUser}
              setLogUser={setLogUser}
            />
          }
        />
        <Route 
          path="/reviews"
          element={
            <ReviewsPage/>
          }
        />
        <Route 
          path="/about-us"
          element={
            <AboutUsPage/>
          }
        />
      </Routes>
      <Footer />
    </div>
  )
};

export default App
