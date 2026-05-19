import { useState } from "react";
import { productsArray } from "../products/products";
import type { CatalogProps, Product } from "../types/types";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useCart } from '../hooks/useCart';

/*
Страница с товарами

Функционал:
- Отображает каталог товаров (3 товара на страницу)
- Пагинация для навигации по страницам
- Позволяет добавлять товары в корзину и изменять их количество

Примечания:
- Если товара нет в корзине — кнопка "В корзину"
- Если товар уже в корзине — кнопки +/- и количество
- При попытке добавить товар без авторизации открывается модальное окно с предложением войти
*/

const CatalogPage = ({ logUser }: CatalogProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = productsArray.slice(startIndex, endIndex);
  const totalPages = Math.ceil(productsArray.length / itemsPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const { cart, addToCart, increment, decrement } = useCart(logUser.id);

  const [showAuthModal, setShowAuthModal] = useState(false);

  // Функция для получения количества товара в корзине
  const getQuantity = (productId: number): number => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Обработчик добавления в корзину
  const handleAddToCart = (product: Product) => {
    if (logUser.id === 0) {
      setShowAuthModal(true);
      return;
    }
    addToCart(product)
  };
  
  const handleConfirmAuth = () => {
    navigate('/login');
  };

  return (
    <>
      <div className="catalog-page">
        <img
          className="catalog-background"
          src="/background/catalog_background.png"
          alt="Фоновое изображение"
        />

        <div className="catalog-title">
          Ассортимент
        </div>

        <ul className="products-list">
          {currentProducts.map((product) => (
            <li key={product.id}>
              <div className="product-info">
                <img 
                  className="product-img"
                  src={product.image}
                  alt="Фото товара"
                />
                <div className="product-name">{product.name}</div>
                <div className="color-label">Цвет</div>
                <div className="color-square" style={{ backgroundColor: product.color }}></div>
                <div className="product-price">{product.price.toFixed(2)} RUB</div>
                
                {getQuantity(product.id) > 0 ? (
                  <div className="quantity-container">
                    <div 
                      className="plus-btn"
                      onClick={() => increment(product.id)}
                    >
                      +
                    </div>
                    <div className="quantity-parameter">
                      {getQuantity(product.id)}
                    </div>
                    <div 
                      className="minus-btn"
                      onClick={() => decrement(product.id)}
                    >
                      -
                    </div>
                  </div>
                ) : (
                  <div
                    className="toCart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    В корзину
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
        
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="nearby-page-btn"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              PREVIOUS
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button 
                className="pagination-btn"
                key={i + 1}
                onClick={() => goToPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="nearby-page-btn"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              NEXT
            </button>
          </div>
        )}
      </div>

      <Modal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        text="Для добавления товаров в корзину нужно войти в аккаунт."
        confirmText="Войти"
        cancelText="Отмена"
        onConfirm={handleConfirmAuth}
      />
    </>
  );
};

export default CatalogPage;