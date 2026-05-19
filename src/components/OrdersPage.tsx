import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { OrdersProps, User } from "../types/types";

/*
Страница с заказами

Функционал:
- Отправляет GET запрос на /users/${logUser.id} для получения данных о пользователе
- Отображает заказы
- Сортирует заказы от последнего к первому

Примечание: заказы можно раскрывать для просмотра состава товаров
*/

const OrdersPage = ({ logUser, setLogUser }: OrdersProps) => {
  const [orders, setOrders] = useState(logUser.orders || []);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:8000/users/${logUser.id}`);
        
        if (response.ok) {
          const updatedUser: User = await response.json();
          const sortedOrders = [...updatedUser.orders].sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime()
          });
          setOrders(sortedOrders);
          setLogUser({ ...updatedUser, orders: sortedOrders });
          localStorage.setItem('logUser', JSON.stringify({ ...updatedUser, orders: sortedOrders }));
        }
      } catch {
        console.log("Ошибка загрузки заказов");
      }
    };
    
    fetchOrders();
  }, [logUser.id, setLogUser]);



  if (orders.length === 0) {
    return (
      <div className="orders-empty-page">
        <div className="orders-empty-title">
          У вас пока нет заказов
        </div>
        <div className="orders-empty-text">
          Исправить это просто: выберите в каталоге интересующий товар и нажмите кнопку "В корзину".
        </div>
        <Link to="/catalog" className="to-catalog-btn">
          В каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-title">Ваши заказы</div>

      <ul className="orders-list">
          {orders.map((order) => (
            <li key={order.paymentId}>
              <div 
                className="order"
                onClick={() => setExpandedOrder(order.paymentId)}
              >
                <div className="order-info">
                  <div className="order-left">
                    <div className="order-id">#{order.paymentId.slice(0, 7)}</div>
                    <div className="order-date">{new Date(order.date).toLocaleString('ru-RU')}</div>
                  </div>
                  <div className="order-right">
                    <div className="order-amount">{order.amount.toFixed(2)} RUB</div>
                    <div className="order-status">
                      {order.status === 'paid' && (
                        <span style={{ color: '#2e7d32' }}>✓</span>
                      )}
                      {order.status === 'pending' && (
                        <span style={{ color: '#f57f17' }}>⌛</span>
                      )}
                      {order.status === 'cancelled' && (
                        <span style={{ color: '#c62828' }}>✗</span>
                      )}
                      {order.status === 'paid' && ' Оплачен'}
                      {order.status === 'pending' && ' В процессе'}
                      {order.status === 'cancelled' && ' Отменён'}
                    </div>
                  </div>
                </div>
              </div>
              {expandedOrder === order.paymentId && (
                <div className="order-items">
                  <ul className="order-items-column">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        <div className="order-item">
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
                          <div className="item-quantity">{item.quantity} шт</div>
                          <div className="item-price">{item.price.toFixed(2)} RUB</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <img 
                    className="order-collapse" 
                    src="/up-arrow.png"
                    alt="Свернуть"
                    onClick={() => setExpandedOrder(null)}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
    </div>
  );
};

export default OrdersPage;