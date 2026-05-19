import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/*
Страница регистрации

Функционал:
- Отправляет POST-запрос на /users/ для создания нового пользователя
- При успехе перенаправляет на /login
- При ошибке показывает сообщение

Поля:
- username, email, password
- email автоматически приводится к нижнему регистру

Примечание: пароль должен быть не менее 6 символов
*/

const RegisterPage = () => {
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch ('http://localhost:8000/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      if (response.ok) {
        navigate('/login');
      } else {
        setRegisterError("Ошибка регистрации");
      }
    } catch {
      console.log("Ошибка соединения с сервером");
    }
  };

  return (
    <div className="register-page">
      <div className="register-form-container">
        <div className="register-header">
          <div className="register-title">
            Регистрация
          </div>
          <div className="login-link">
            <div className="link-question">
              Есть аккаунт?
            </div>
            <Link 
              to="/login"
              className="link-btn"
            >
              Войти
            </Link>
          </div>
        </div>

        <div className="register-form">
          <div className="form-group">
            <div className="form-text">
              Введите имя пользователя
            </div>
            <input
              className="form-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Имя пользователя"
            />
          </div>
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
              Введите пароль (не менее 6 символов)
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

        {registerError && (
          <div className="login-error">
            {registerError}
          </div>
        )}

        <div 
          className="register-btn"
          onClick={handleRegister}
        >
          Зарегистрироваться
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;