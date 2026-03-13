import { Container } from "react-bootstrap";
import "./cta.css";

const CTA = () => {
  return (
    <section id="cta" className="cta-section section-padding text-center">
      <Container>
        <div className="cta-content p-5 reveal">
          <h2 className="display-3 text-white mb-4">
            ¿todavía <br />
            no te convenciste?
          </h2>
          <p className="text-white opacity-75 mb-5 fs-5">
            El postre que sueñas está a un clic de distancia. <br />
            No dejes para mañana lo que puedes probar hoy.
          </p>
          <button className="btn-premium btn-lg px-5">Pide por WhatsApp</button>
        </div>
      </Container>
    </section>
  );
};

export default CTA;
