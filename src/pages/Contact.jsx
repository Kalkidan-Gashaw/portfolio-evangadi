import telegramIcon from "../assets/images/icons8-telegram-50 (2).png";
import whatsIcon from "../assets/images/icons8-whatsapp-50 (2).png";
import imoIcon from "../assets/images/icons8-imo-logo-50.png";
import linkedinIcon from "../assets/images/icons8-linkedin-50.png";
import avatar from "../assets/images/kalkidan1.jpg";

function Contact() {
  return (
    <section className="contact container">
      <h1 className="contact-title gradient-title">Contact</h1>
      <p className="contact-intro">
        Whether you have a project idea, want to collaborate, or just say hello,
        feel free to reach out.
      </p>

      <div className="contact-card simple-card">
        <div className="contact-left">
          <img src={avatar} alt="Profile" className="contact-avatar" />
          <h2 className="contact-name">Kalkidan Gashaw</h2>
          <p className="contact-details">
            Email:{" "}
            <a href="mailto:gashawkalkidan700@gmail.com">
              gashawkalkidan700@gmail.com
            </a>
          </p>
          <p className="contact-details">
            Phone: <a href="#">+251951975578</a>
          </p>
        </div>

        <div className="contact-right">
          <p className="muted">Message me on:</p>
          <div className="social">
            <a
              href="https://t.me/Kalgashaw"
              aria-label="Telegram"
              className="social-link"
            >
              <img src={telegramIcon} alt="Telegram" />
            </a>
            <a
              href="https://wa.me/251951975578"
              aria-label="WhatsApp"
              className="social-link"
            >
              <img src={whatsIcon} alt="WhatsApp" />
            </a>
            <a
              href="https://s.imoim.net/q87ZtX"
              aria-label="IMO"
              className="social-link"
            >
              <img src={imoIcon} alt="IMO" />
            </a>
            <a
              href="https://www.linkedin.com/in/kalkidan-gashaw-43b8692bb/"
              aria-label="LinkedIn"
              className="social-link"
            >
              <img src={linkedinIcon} alt="LinkedIn" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
