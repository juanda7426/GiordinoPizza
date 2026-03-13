import { Container, Row, Col } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { heroSlides } from "../../data";
import "./hero.css";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  //************************ */
  return (
    <section id="home" className="hero-section">
      <div className="hero-background-carousel">
        <AnimatePresence mode="wait">
          <motion.img
            key={heroSlides[currentSlide].url}
            src={heroSlides[currentSlide].url}
            alt="Giardino Background"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="hero-bg-image"
          />
        </AnimatePresence>
        <div className="hero-overlay"></div>
      </div>

      <Container className="hero-content">
        <Row className="align-items-center min-vh-100 py-5">
          <Col lg={8} xl={7}>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="hero-eyebrow">
                {t("Bienvenido a Giardino / Welcome to Giardino")}
              </span>
              <h1 className="hero-title-main">
                {t(heroSlides[currentSlide].title)} <br />
                <span className="text-highlight">
                  {t(heroSlides[currentSlide].highlight)}
                </span>
              </h1>
              <p className="hero-subtitle-premium">
                {t(heroSlides[currentSlide].subtitle)}
              </p>

              <div className="hero-cta-group">
                <a href="#menu" className="btn-hero-primary">
                  {t("Ver Menú Digital / Digital Menu")}
                </a>
                <a href="#info" className="btn-hero-secondary">
                  {t("Nuestra Ubicación / Our Location")}
                </a>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>

      <div className="hero-thumbnails d-none d-md-flex">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`hero-thumb ${currentSlide === index ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          >
            <img src={slide.url} alt={`Thumb ${index}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
