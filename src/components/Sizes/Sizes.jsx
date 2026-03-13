import { Container, Row, Col } from "react-bootstrap";
import "./sizes.css";

const Sizes = () => {
  const sizes = [
    { label: "S", price: "$9.000", labelFull: "Personal" },
    { label: "M", price: "$13.000", labelFull: "Doble" },
    { label: "L", price: "$17.000", labelFull: "Triple" },
    { label: "XL", price: "$21.000", labelFull: "Mega Scoop" },
  ];

  return (
    <section className="section-padding bg-white reveal">
      <Container>
        <Row className="align-items-center">
          <Col lg={5} className="mb-5 mb-lg-0">
            <h6 className="text-main-pink fw-bold text-uppercase">
              Copas Velvet
            </h6>
            <h2 className="display-4 mb-4">
              el tamaño de <br />
              tu felicidad.
            </h2>
            <p className="text-muted mb-4">
              Desde un simple scoop para refrescar tu tarde, hasta nuestras
              copas mega diseñadas para los verdaderos amantes del helado
              artesanal.
            </p>
            <button className="btn-premium">Elige tu tamaño</button>
          </Col>
          <Col lg={7}>
            <div className="sizes-grid">
              {sizes.map((size, index) => (
                <div key={index} className={`size-item item-${size.label}`}>
                  <div className="size-circle">
                    <span className="size-abbr">{size.label}</span>
                  </div>
                  <div className="size-info ms-4">
                    <h4 className="mb-0">{size.labelFull}</h4>
                    <p className="text-main-pink fw-bold mb-0">{size.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Sizes;
