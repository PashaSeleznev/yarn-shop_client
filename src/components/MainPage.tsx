import { Link } from "react-router-dom";

// Главная страница

const MainPage = () => {
  return (
    <div className="main-page">
      <img
        className="main-background"
        src="/background/main_background.png"
        alt="Фоновое изображение"
      />
      <div className="main-text">
        <div className="main-title">
          Большой выбор премиальной пряжи
        </div>
        <div className="main-description">
          Огромное количество видов пряжи премиального 
          качества для ручного и машинного вязания
        </div>
        <Link to="/catalog" className="toCatalog-btn">
          Перейти
        </Link>
      </div>
    </div>
  );
}

export default MainPage;