import { useEffect } from "react";
import { CartProvider } from "./context/CartContext";
import { LanguageProvider } from "./context/LanguageContext";
import Layout from "./layout/Layout";
import Hero from "./components/Hero/Hero";
import Menu from "./components/Menu/Menu";
import Info from "./components/Info/Info";
import CartDrawer from "./components/Cart/CartDrawer";
import ProductModal from "./components/Menu/ProductModal";

function App() {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
          reveals[i].classList.add("active");
        }
      }
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    return () => window.removeEventListener("scroll", revealOnScroll);
  }, []);

  return (
    <LanguageProvider>
      <CartProvider>
        <Layout>
          <Hero />
          <Menu />
          <Info />
          <CartDrawer />
          <ProductModal />
        </Layout>
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;
