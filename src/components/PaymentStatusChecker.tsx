import { useEffect } from "react";
import { useCart } from "../hooks/useCart";
import type { PaymentStatusCheckerProps } from "../types/types";

/*
Компонент для отслеживания статуса платежа

Функционал:
- Отправляет GET запрос на /orders/${orderId} для получения статуса заказа
- Отправляет GET запрос на /users/${userId} для обновления в localStorage данных о пользователе при успешной оплате
- Проверка происходит каждые 2 секунды

Примечания:
- Проверяем URL при загрузке компонента
- После успешной оплаты убираем параметр order_id из URL
*/

const PaymentStatusChecker = ({ userId, setLogUser }: PaymentStatusCheckerProps) => {
  const { clearCart } = useCart(userId);

  useEffect(() => {
    const checkOrderStatus = async (orderId: string) => {
      try {
        const response = await fetch(`http://localhost:8000/orders/${orderId}`);
        
        if (response.ok) {
          const order = await response.json();
          
          if (order.status === 'paid') {
            clearCart();

            try {
              const userResponse = await fetch(`http://localhost:8000/users/${userId}`);
              
              if (userResponse.ok) {
                const updatedUser = await userResponse.json();
                setLogUser(updatedUser);
                localStorage.setItem('logUser', JSON.stringify(updatedUser));
              }
            } catch {
              console.log("Ошибка обновления пользователя");
            }
            
            window.history.replaceState({}, document.title, window.location.pathname);
            return true;
          }
        }
        return false;
      } catch {
        console.error("Ошибка проверки статуса");
        return false;
      }
    };

    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('order_id');
    
    if (orderId) {
      const interval = setInterval(async () => {
        const paid = await checkOrderStatus(orderId);

        if (paid) {
          clearInterval(interval);
        }
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [userId, clearCart, setLogUser]);

  return null;
};

export default PaymentStatusChecker;