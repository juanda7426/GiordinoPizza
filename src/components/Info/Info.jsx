import { Container, Row, Col } from "react-bootstrap";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import "./info.css";

const Info = () => {
  const { t } = useLanguage();

  return (
    <section id="info" className="info-section section-padding bg-light-pink">
      <Container>
        <Row className="gy-4">
          <Col md={3} className="reveal">
            <div className="info-card-premium">
              <div className="info-icon-wrapper">
                <MapPin size={24} />
              </div>
              <h4>{t("Ubícanos / Find Us")}</h4>
              <p>Calle 123 #45-67, El Rosal, Bogotá</p>
            </div>
          </Col>
          <Col md={3} className="reveal">
            <div className="info-card-premium">
              <div className="info-icon-wrapper">
                <Phone size={24} />
              </div>
              <h4>{t("Llámanos / Call Us")}</h4>
              <p>+57 320 764 3590</p>
            </div>
          </Col>
          <Col md={3} className="reveal">
            <div className="info-card-premium">
              <div className="info-icon-wrapper">
                <Clock size={24} />
              </div>
              <h4>{t("Horarios / Hours")}</h4>
              <p>
                {t("Lun - Sáb: 11am - 9pm / Mon - Sat: 11am - 9pm")} <br /> 
                {t("Dom: 1pm - 8pm / Sun: 1pm - 8pm")}
              </p>
            </div>
          </Col>
          <Col md={3} className="reveal">
            <div className="info-card-premium">
              <div className="info-icon-wrapper">
                <MessageCircle size={24} />
              </div>
              <h4>WhatsApp</h4>
              <p>{t("Escríbenos para pedidos / Write to us for orders")}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Info;
