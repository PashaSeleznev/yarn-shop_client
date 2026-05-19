import { useNavigate } from "react-router-dom";
import type { ProfileProps } from "../types/types";
import { useState } from "react";
import { getCartKey } from "../utils/utils";
import Modal from "./Modal";

/*
Страница с данными пользователя

Функционал:
- Отображает данные пользователя
- Позволяет выйти из аккаунта
- Позволяет удалить аккаунт

Примечания: 
- При удалении появляется модальное окно для подтверждения действия
- При выходе из аккаунта происходит очистка корзины
*/

const ProfilePage = ({ logUser, setLogUser, nullUser }: ProfileProps) => {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleLogout = () => {
    setLogUser(nullUser);
    localStorage.removeItem("logUser");
    localStorage.removeItem(getCartKey(logUser.id));
    navigate('/login');
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/users/${logUser.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setLogUser(nullUser);
        localStorage.removeItem("logUser");
        navigate('/');
      }
    } catch {
      console.log("Не удалось удалить пользователя");
    }
  };

  return (
    <>
      <div className="profile-page">
        <img
          className="profile-background"
          src="/background/profile_background.png"
          alt="Фоновое изображение"
        />

        <div className="profile-title">Мои данные</div>

        <div className="profile-info">
          <img
            className="profile-avatar"
            src="/big-avatar.png"
            alt="Аватар"
          />

          <div className="profile-details">
            <div className="info-group">
              <div className="info-label">Имя пользователя</div>
              <div className="info-value">{logUser.username}</div>
            </div>

            <div className="info-group">
              <div className="info-label">E-mail</div>
              <div className="info-value">{logUser.email}</div>
            </div>
          </div>
        </div>

        <div className="profile-btns">
          <div className="profile-btn" onClick={handleLogout}>
            Выйти из аккаунта
          </div>
          <div className="profile-btn" onClick={() => setShowDeleteConfirm(true)}>
            Удалить аккаунт
          </div>
        </div>
      </div>

      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        text="Вы уверены, что хотите удалить аккаунт? Это действие необратимо."
        confirmText="Удалить"
        cancelText="Отмена"
        onConfirm={handleDelete}
      />
    </>
  );
};

export default ProfilePage;