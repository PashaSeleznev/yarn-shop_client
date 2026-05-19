// Footer

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-copyright">
        © 2026 Yarn Shop. Все права защищены
      </div>
      <div className="footer-contacts">
        <div className="contacts-phone">
          +7 (962) 345-99-32
        </div>
        <div className="contacts-media">
          <img
            className="media-logo"
            src="/instagram.png"
            alt="Ссылка на Instagram"
          />
          <img
            className="media-logo"
            src="/whatsapp.png"
            alt="Ссылка на Whatsapp"
          />
          <img
            className="media-logo"
            src="/telegram.png"
            alt="Ссылка на Telegram"
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;