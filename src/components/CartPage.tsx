import { useState } from "react";
import { useCart } from "../hooks/useCart";
import type { CartProps } from "../types/types";
import { Link } from "react-router-dom";

/*
Страница корзины

Функционал:
- Отображение товаров с возможностью изменения количества
- Форма доставки (город + пункт выдачи)
- Оформление заказа: POST запрос на /orders/?user_id=${logUser.id}
- Редирект на платёжную страницу Юкассы (payment_url из ответа)

Примечания:
- При пустой корзине предлагает перейти в каталог
- Поля city и pickupPoint обязательные, иначе ошибка
*/

const CartPage = ({ logUser }: CartProps) => {
  const { 
    cart, 
    totalPrice,
    increment,
    decrement,
  } = useCart(logUser.id);

  const [city, setCity] = useState("");
  const [pickupPoint, setPickupPoint] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cartError, setCartError] = useState("");

  const handleCreateOrder = async () => {
    setCartError("");

    if (!city.trim()) {
      setCartError("Введите город");
      return;
    }
    if (!pickupPoint.trim()) {
      setCartError("Введите пункт выдачи");
      return;
    }    
    
    const fullAddress = `г. ${city}, пункт выдачи: ${pickupPoint}`;

    const orderData = {
      amount: totalPrice,
      address: fullAddress,
      items: cart.map(item => ({
        name: item.name,
        color: item.color,
        image: item.image,
        price: item.price,
        quantity: item.quantity
      }))
    };

    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:8000/orders/?user_id=${logUser.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const createdOrder = await response.json();        
        window.location.href = createdOrder.payment_url;
      } else {
        setCartError("Ошибка при создании заказа");
      }
    } catch {
      console.error("Ошибка соединения с сервером");
    } finally {
      setIsLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty-page">
        <div className="cart-empty-title">
          Ваша корзина пуста
        </div>
        <div className="cart-empty-text">
          Исправить это просто: выберите в каталоге интересующий товар и нажмите кнопку "В корзину".
        </div>
        <Link to="/catalog" className="to-catalog-btn">
          В каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-titles">
        <div className="cart-title">Ваша корзина товаров</div>
        <div className="cart-title">Доставка</div>
      </div>

      <div className="cart-content">
        <ul className="cart-items-column">
          {cart.map((item) => (
            <li key={item.id}>
              <div className="cart-item">
                <img 
                  className="item-img"
                  src={item.image}
                  alt="Фото товара"
                />
                <div className="item-info">
                  <div className="item-name">{item.name}</div>
                  <div className="item-color">Цвет:</div>
                  <div className="color-square" style={{ backgroundColor: item.color }}></div>
                </div>
                <div className="quantity-container">
                  <div className="plus-btn" onClick={() => increment(item.id)}>+</div>
                  <div className="quantity-parameter">{item.quantity}</div>
                  <div className="minus-btn" onClick={() => decrement(item.id)}>-</div>
                </div>
                <div className="item-total-price">{(item.quantity * item.price).toFixed(2)} RUB</div>
              </div>
            </li>
          ))}
        </ul>

        <div className="payment-column">
          <div className="address-section">
            <div className="address-title">Адрес доставки</div>
            
            <div className="address-field">
              <div className="field-text">Город</div>
              <input 
                className="field-input"
                type="text" 
                placeholder="Например: Москва"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="address-field">
              <div className="field-text">Пункт выдачи</div>
              <input 
                className="field-input"
                type="text" 
                placeholder="Например: ул. Тверская, д. 15"
                value={pickupPoint}
                onChange={(e) => setPickupPoint(e.target.value)}
              />
            </div>
          </div>
          
          <div className="total-price">Итого: {totalPrice.toFixed(2)} RUB</div>
          
          {cartError && <div className="cart-error">{cartError}</div>}
          
          <div
            className="create-order-btn"
            onClick={handleCreateOrder}
          >
            {isLoading ? 'Обработка заказа...' : 'Оплатить заказ'}
          </div>   
        </div>
      </div>
    </div>
  );
};

export default CartPage;