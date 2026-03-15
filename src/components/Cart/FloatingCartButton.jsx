import { ShoppingBag, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useLanguage } from "../../context/LanguageContext";
import "./cart.css";

const FloatingCartButton = () => {
  const { cart, setIsCartOpen } = useCart();
  const { t } = useLanguage();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (cartCount === 0) return null;

  //*********************** */
  return (
    <div className="floating-cart-container">
      <button className="floating-cart-btn" onClick={() => setIsCartOpen(true)}>
        <div className="floating-cart-icon-wrapper">
          <ShoppingCart size={28} />
          {cartCount > 0 && (
            <span className="floating-cart-badge">{cartCount}</span>
          )}
        </div>
      </button>
    </div>
  );
};

export default FloatingCartButton;
