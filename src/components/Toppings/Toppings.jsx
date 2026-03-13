import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { toppingsData } from "../../data";
import SafeImage from "../Common/SafeImage";
import { Sparkles } from "lucide-react";
import "./toppings.css";

const Toppings = () => {
  return (
    <section
      id="topping"
      className="section-padding bg-dark-section overflow-hidden position-relative"
    >
      {/* Dynamic background element */}
      <div className="toppings-bg-accent"></div>

      <Container className="position-relative z-index-2">
        <div className="mb-5 text-center reveal">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="display-4 text-white fw-black mb-3">
              infinitas{" "}
              <span className="text-main-pink italic">combinaciones.</span>
            </h2>
            <p className="text-light-grey max-w-lg mx-auto mb-4 fs-5 opacity-75">
              Eleva tu experiencia Velvet. Elige entre nuestra selección premium
              de complementos al momento de armar tu pedido.
            </p>
            <div className="d-flex align-items-center justify-content-center gap-2 text-main-pink fw-bold">
              <Sparkles size={20} />
              <span className="text-uppercase tracking-widest small">
                Personalización Total
              </span>
              <Sparkles size={20} />
            </div>
          </motion.div>
        </div>

        <div className="toppings-scroll-container">
          <div className="toppings-track">
            {[...toppingsData, ...toppingsData].map((topping, index) => (
              <motion.div
                key={index}
                className="topping-card"
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="topping-img-holder">
                  <SafeImage
                    src={topping.image}
                    alt={topping.name}
                    className="w-100 h-100 object-fit-cover transition-all"
                  />
                  <div className="topping-overlay"></div>
                </div>
                <div className="topping-info mt-3 text-white text-center">
                  <h6 className="fw-bold mb-1">{topping.name}</h6>
                  <span className="text-main-pink fw-black fs-5">
                    {topping.price}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Toppings;
