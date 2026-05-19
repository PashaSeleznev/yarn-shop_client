import { Link, useLocation } from "react-router-dom";
import type { HeaderProps } from "../types/types";
import { useCart } from "../hooks/useCart";

/*
Header

Функционал:
- Отображает навигационные ссылки (Главная, О нас, Каталог и т.д.)
- Отображает ссылки профиля (Мои данные, Мои заказы) при авторизованном пользователе
- Отображает кнопку "Вход" для неавторизованных пользователей
- Показывает количество товаров в корзине (totalCount)

Примечания:
- Активная ссылка подсвечивается (nav-link-active / dropdown-link-active)
- Выпадающий список профиля при авторизации
- Количество в корзине скрыто, если totalCount = 0
*/

const Header = ({ logUser }: HeaderProps) => {
  const location = useLocation();
  const { totalCount } = useCart(logUser.id);
  const navLinks = [
    { path: '/', label: 'Главная' },
    { path: '/about-us', label: 'О нас' },
    { path: '/catalog', label: 'Каталог' },
    { path: '/payment', label: 'Оплата и доставка' },
    { path: '/reviews', label: 'Отзывы' },
  ];
  const profileLinks = [
    { path: '/profile', label: 'Мои данные' },
    { path: '/orders', label: 'Мои заказы' },
  ];

  return (
    <div className="header">
      <img
        className="logo-img"
        src="/logo.png"
        alt="Логотип"
      />
      <ul className="header-nav">
        {navLinks.map(({ path, label }) => (
          <li key={path}>
            <Link
              className={location.pathname === path ? 'nav-link-active' : 'nav-link'}
              to={path}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/cart" className="header-cart">
        <img 
          className="cart-img"
          src="/shopping-cart.png"
          alt="Корзина"
        />
        {totalCount > 0 && (
          <div className="cart-total-count">
            {totalCount}
          </div>
        )}
      </Link>
      
      {!logUser.id ? (
        <Link 
          className="header-enter-btn"
          to="/login"
        >
          Вход
        </Link>
      ) : (
        <div className="profile-dropdown">
          <img 
            className="dropdown-btn"
            src="/avatar.png" 
            alt="Профиль"
          />
          <ul className="dropdown-content">
            {profileLinks.map(({ path, label }) => (
              <li key={path}>
                <Link
                  className={location.pathname === path ? 'dropdown-link-active' : 'dropdown-link'}
                  to={path}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;