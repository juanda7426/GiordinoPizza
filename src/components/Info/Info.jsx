import { Container, Row, Col } from "react-bootstrap";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { infoData } from "../../data";
import "./info.css";

const Info = () => {
  const { t } = useLanguage();

  //*********************** */
  return (
    <section id="info" className="info-section section-padding">
      <Container>
        <Row className="gy-4">
          <Col
            md={3}
            className="reveal"
            style={{ cursor: "pointer" }}
            onClick={() => window.open(infoData.location, "_blank")}
          >
            <div className="info-card-premium">
              <div className="info-icon-wrapper">
                <MapPin size={24} />
              </div>
              <h4>{t("Ubícanos / Find Us")}</h4>
              <p>{infoData.address}</p>
            </div>
          </Col>
          <Col
            md={3}
            className="reveal"
            style={{ cursor: "pointer" }}
            onClick={() => window.open("tel:" + infoData.phone, "_self")}
          >
            <div className="info-card-premium">
              <div className="info-icon-wrapper">
                <Phone size={24} />
              </div>
              <h4>{t("Llámanos / Call Us")}</h4>
              <p>{infoData.phone}</p>
            </div>
          </Col>
          <Col md={3} className="reveal">
            <div className="info-card-premium">
              <div className="info-icon-wrapper">
                <Clock size={24} />
              </div>
              <h4>{t("Horarios / Hours")}</h4>
              <p>{t(infoData.openingHours)}</p>
            </div>
          </Col>
          <Col
            md={3}
            className="reveal"
            style={{ cursor: "pointer" }}
            onClick={() => window.open("mailto:" + infoData.email, "_self")}
          >
            <div className="info-card-premium">
              <div className="info-icon-wrapper">
                <Mail size={24} />
              </div>
              <h4>{t("Correo / Email")}</h4>
              <p>{infoData.email}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Info;
