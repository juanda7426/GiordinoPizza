import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { ShoppingBag, Menu as MenuIcon, X, Globe } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { useState, useEffect } from "react";
import "./navbar.css";

const CustomNavbar = () => {
  const { cart, setIsCartOpen } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //**************************** */
  return (
    <Navbar
      expand="lg"
      className={`fixed-top custom-nav ${scrolled ? "scrolled" : ""}`}
      expanded={expanded}
      onToggle={setExpanded}
    >
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center ">
          <img
            src="/images/LogoIn.avif"
            alt="Giardino Logo"
            height={scrolled ? "65" : "70"}
            className="navbar-logo-img transition-all"
            style={{ borderRadius: "18px" }}
            fetchpriority="high"
            decoding="async"
          />
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="navbar-toggler-custom"
        >
          {expanded ? <X size={28} /> : <MenuIcon size={28} />}
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link
              href="#home"
              className="nav-link-custom"
              onClick={() => setExpanded(false)}
            >
              {t("Inicio / Home")}
            </Nav.Link>
            <Nav.Link
              href="#menu"
              className="nav-link-custom"
              onClick={() => setExpanded(false)}
            >
              {t("Menú / Menu")}
            </Nav.Link>
            <Nav.Link
              href="#info"
              className="nav-link-custom"
              onClick={() => setExpanded(false)}
            >
              {t("Contacto / Contact")}
            </Nav.Link>

            <div className="d-flex align-items-center px-lg-3 py-3 py-lg-0">
              <button
                className={`lang-toggle-btn ${language === "es" ? "lang-active" : ""}`}
                onClick={() => setLanguage("es")}
              >
                ES
              </button>
              <button
                className={`lang-toggle-btn ${language === "en" ? "lang-active" : ""}`}
                onClick={() => setLanguage("en")}
              >
                EN
              </button>
            </div>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;

