import { useState } from "react";
import type { LoginProps } from "../types/types";
import { Link, useNavigate } from "react-router-dom";

/*
Страница авторизации

Функционал:
- Отправляет POST-запрос на /login для авторизации пользователя
- При успехе обновляет данные в localStorage
- При ошибке показывает сообщение

Поля:
- email, password
*/

const LoginPage = ({ setLogUser }: LoginProps) => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();

      if (response.ok) {
        setLogUser(data);
        localStorage.setItem("logUser", JSON.stringify(data));
        navigate('/');
      } else {
        setLoginError("Неправильный логин или пароль");
      }
    } catch {
      console.log("Ошибка соединения с сервером");
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <div className="login-header">
          <div className="login-title">
            Вход
          </div>
          <div className="register-link">
            <div className="link-question">
              Нет аккаунта?
            </div>
            <Link 
              to="/register"
              className="link-btn"
            >
              Регистрация
            </Link>
          </div>
        </div>

        <div className="login-form">
          <div className="form-group">
            <div className="form-text">
              Введите E-mail
            </div>
            <input
              className="form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              placeholder="E-mail"
            />
          </div>
          <div className="form-group">
            <div className="form-text">
              Введите пароль
            </div>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
            />
          </div>
        </div>

        {loginError && (
          <div className="login-error">
            {loginError}
          </div>
        )}

        <div 
          className="login-btn"
          onClick={handleLogin}
        >
          Войти
        </div>
      </div>
    </div>
  );
};


export default LoginPage;