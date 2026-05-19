// Страница о компании

const AboutUsPage = () => {
  const info = `Legrand Yarn - для тех, кто любит вязать вещи из натуральных материалов. 
                Начиная с самых тонких текстильных волокон, мы создаем пряжу высшего класса. Пряжа 
                основана на самых высоко ценимых натуральных волокнах, таких как: овечья шерсть, кашемир, альпака.`;
                
  return (
    <div className="about-us-page">
      <img
        className="about-us-background"
        src="/background/about-us_background.png"
        alt="Фоновое изображение"
      />

      <div className="about-us-title">О нас</div>

      <div className="about-us-container">
        <img
          className="about-us-img"
          src="/about-us-img.png"
          alt="Изображение для страницы"
        />

        <div className="about-us-column">
          <div className="about-us-subtitle">
            Наша премиальная пряжа
          </div>
          <div className="about-us-info">
            {info}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;