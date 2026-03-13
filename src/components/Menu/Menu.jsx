import { useState, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { menuData, drinksData } from "../../data";
import MenuCard from "./MenuCard";
import { useCart } from "../../context/CartContext";
import { useLanguage } from "../../context/LanguageContext";
import "./menu.css";

const Menu = () => {
  const { openModal } = useCart();
  const { t } = useLanguage();

  const allItems = useMemo(() => [...menuData, ...drinksData], []);
  const categories = useMemo(
    () => [...new Set(allItems.map((item) => item.category))],
    [allItems],
  );

  const [activeCategory, setActiveCategory] = useState(categories[0]);

  //************************* */
  return (
    <section id="menu" className="section-padding bg-light-pink pt-0">
      <Container fluid style={{ padding: "0 5%" }}>
        <div className="text-center mb-5 reveal">
          <h2 className="text-main-pink mt-5 fw-bold text-uppercase tracking-widest">
            Giardino Pizza y Pasta
          </h2>
          <h3 className="display-3 text-dark-grey fw-black">
            {t("Sabor Italiano Artesanal. / Authentic Italian Flavor.")}
          </h3>
          <p className="text-muted max-w-lg mx-auto mt-3 fs-5">
            {t(
              ` Explora nuestra selección de pizzas, pastas y bebidas artesanales, preparadas con los mejores ingredientes y un toque de tradición.
               / Explore our selection of artisanal pizzas, pastas, and drinks, prepared with the finest ingredients and a touch of tradition.`,
            )}
          </p>
        </div>

        {/* Category Selector */}
        <div className="category-filter-wrapper mb-5">
          <div className="category-filter-scroll">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-btn ${activeCategory === category ? "active" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {t(category)}
              </button>
            ))}
          </div>
        </div>


        <div className="mb-5 text-center text-lg-start">
          <h3 className="category-header header-orange">{t(activeCategory)}</h3>
          <Row className="g-4">
            {allItems
              .filter((item) => item.category === activeCategory)
              .map((item) => (
                <Col key={item.id} xs={12} sm={6} lg={4} xl={3}>
                  <MenuCard
                    item={item}
                    onSelect={() => openModal(item, "add")}
                  />
                </Col>
              ))}
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Menu;
