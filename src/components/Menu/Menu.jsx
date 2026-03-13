import { Container, Row, Col } from "react-bootstrap";
import { menuData, drinksData } from "../../data";
import MenuCard from "./MenuCard";
import { useCart } from "../../context/CartContext";
import { useLanguage } from "../../context/LanguageContext";
import "./menu.css";

const Menu = () => {
  const { openModal } = useCart();
  const { t } = useLanguage();
  
  const allItems = [...menuData, ...drinksData];
  
  const categories = [...new Set(allItems.map(item => item.category))];

  return (
    <section id="menu" className="section-padding bg-light-pink pt-0">
      <Container>
        <div className="text-center mb-5 reveal">
          <h6 className="text-main-pink fw-bold text-uppercase tracking-widest">
            Giardino Pizza y Pasta
          </h6>
          <h2 className="display-4 text-dark-grey fw-black">
            {t("sabor italiano artesanal. / authentic italian flavor.")}
          </h2>
          <p className="text-muted max-w-lg mx-auto mt-3">
            {t("Explora nuestra selección de pizzas, pastas y bebidas artesanales, preparadas con los mejores ingredientes y un toque de tradición. / Explore our selection of artisanal pizzas, pastas, and drinks, prepared with the finest ingredients and a touch of tradition.")}
          </p>
        </div>

        {categories.map((category, index) => (
          <div key={category} className="mb-5 text-center text-lg-start">
            <h3 className={`category-header ${index % 2 === 0 ? "header-orange" : "header-green"}`}>
              {t(category)}
            </h3>
            <Row className="g-4">
              {allItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <Col key={item.id} xs={12} sm={6} lg={4} xl={3}>
                    <MenuCard item={item} onSelect={() => openModal(item, "add")} />
                  </Col>
                ))}
            </Row>
          </div>
        ))}
      </Container>
    </section>
  );
};

export default Menu;
