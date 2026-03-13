import { Container, Row, Col } from "react-bootstrap";
import {
  Instagram,
  Facebook,
  Twitter,
  MapPin,
  Clock,
  Phone,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import "./footer.css";

const Footer = ({ infoData }) => {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="footer-section pt-5 pb-4">
      <Container>
        <Row className="gy-4">
          <Col lg={4} className="text-center text-lg-start">
            <img
              src="/logo-white.jpg"
              alt="Giardino Logo"
              height="80"
              className="mb-3"
            />
            <p className="footer-description pe-lg-4">
              {t("La máxima expresión de la pizza artesanal. / The ultimate expression of artisanal pizza.")} <br />
              {t("Momentos deliciosos creados para ser inolvidables. / Delicious moments created to be unforgettable.")}
            </p>
            <div className="d-flex justify-content-center justify-content-lg-start gap-3 mt-4">
              <a href="#" className="social-icon">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-icon">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-icon">
                <Twitter size={20} />
              </a>
            </div>
          </Col>
          <Col lg={4} className="text-center text-lg-start">
            <h5 className="footer-heading mb-4 text-uppercase tracking-wider">
              {t("Ubícanos / Find Us")}
            </h5>
            <div className="footer-info-item d-flex align-items-center justify-content-center justify-content-lg-start mb-3">
              <MapPin className="me-3" size={20} />
              <span>{infoData.address}</span>
            </div>
            <div className="footer-info-item d-flex align-items-center justify-content-center justify-content-lg-start mb-3">
              <Clock className="me-3" size={20} />
              <span>
                {t("Lun - Sáb: 11:00 AM - 9:30 PM / Mon - Sat: 11:00 AM - 9:30 PM")}
                <br />
                {t("Dom: 1:00 PM - 9:00 PM / Sun: 1:00 PM - 9:00 PM")}
              </span>
            </div>
            <div className="footer-info-item d-flex align-items-center justify-content-center justify-content-lg-start">
              <Phone className="me-3" size={20} />
              <span>{infoData.phone}</span>
            </div>
          </Col>
          <Col lg={4} className="text-center text-lg-end">
            <h5 className="footer-heading mb-4 text-uppercase tracking-wider">
              {t("Mapa del Sitio / Site Map")}
            </h5>
            <ul className="list-unstyled footer-links">
              <li className="mb-2">
                <a href="#home">{t("Inicio / Home")}</a>
              </li>
              <li className="mb-2">
                <a href="#menu">{t("Menú / Menu")}</a>
              </li>
              <li className="mb-2">
                <a href="#contact">{t("Contacto / Contact")}</a>
              </li>
            </ul>
          </Col>
        </Row>
        <hr className="my-5 footer-divider" />
        <div className="text-center footer-bottom-text">
          <p>
            © 2024 Giardino Pizza y Pasta | {t("Sabor Inigualable / Unmatched Flavor")} | Developed by{" "}
            <a
              href={infoData.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-color text-decoration-none fw-bold"
            >
              JuandaCode
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
