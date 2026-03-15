import { Offcanvas, ListGroup } from "react-bootstrap";
import { useCart } from "../../context/CartContext";
import { useLanguage } from "../../context/LanguageContext";
import { Trash2, Plus, Minus, ShoppingBag, Pencil } from "lucide-react";
import { useState } from "react";
import CheckoutModal from "./CheckoutModal";
import Swal from "sweetalert2";
import "./cart.css";

const CartDrawer = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    cartTotal,
    openModal,
  } = useCart();
  const { t, language } = useLanguage();

  const [showCheckout, setShowCheckout] = useState(false);

  //*********************** */
  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    setShowCheckout(true);
  };

  const handleEditItem = (item) => {
    setIsCartOpen(false);
    openModal(item, "edit", item.cartItemId);
  };

  const handleRemoveConfirm = (cartItemId, itemName) => {
    Swal.fire({
      title: t("¿Eliminar producto? / Remove product?"),
      text: `${t("¿Estás seguro que deseas quitar / Are you sure you want to remove")} "${t(itemName)}" ${t("del carrito? / from the cart?")}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f3722c",
      cancelButtonColor: "#2e1c0a",
      confirmButtonText: t("Sí, eliminar / Yes, remove"),
      cancelButtonText: t("Cancelar / Cancel"),
      borderRadius: "20px",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(cartItemId);
      }
    });
  };

  const sendWhatsApp = (customerData) => {
    const phoneNum = "573207643590";
    let message = `*${t("Nuevo Pedido - Giardino Pizza y Pasta / New Order - Giardino Pizza & Pasta")}*\n\n`;
    message += `*${t("Cliente / Customer")}:* ${customerData.name}\n`;
    message += `*${t("Dirección / Address")}:* ${customerData.address}\n`;
    message += `*${t("Barrio / Neighborhood")}:* ${customerData.neighborhood}\n`;
    message += `*${t("Teléfono / Phone")}:* ${customerData.phone}\n`;
    message += `*${t("Método de Pago / Payment Method")}:* ${customerData.paymentMethod}\n`;
    if (customerData.notes)
      message += `*${t("Notas / Notes")}:* ${customerData.notes}\n\n`;

    message += `\n*${t("Detalle del Pedido / Order Detail")}:*\n`;
    cart.forEach((item) => {
      message += `• ${item.quantity}x ${t(item.name)}`;
      if (item.selectedSize) message += ` (${item.selectedSize})`;
      message += ` - ${item.finalPrice}\n`;

      if (item.selectedFlavors && item.selectedFlavors.length > 0) {
        message += `  _${t("Helado / Ice Cream")}:_ ${item.selectedFlavors.map((f) => `${f.quantity}x ${t(f.name)}`).join(", ")}\n`;
      }

      if (item.selectedSauces && item.selectedSauces.length > 0) {
        message += `  _${t("Salsas / Sauces")}:_ ${item.selectedSauces.map((s) => t(s.name)).join(", ")}\n`;
      }

      if (item.selectedToppings && item.selectedToppings.length > 0) {
        message += `  _${t("Toppings")}:_ ${item.selectedToppings.map((t_item) => t(t_item.name)).join(", ")}\n`;
      }
    });

    message += `\n*TOTAL A PAGAR: $${cartTotal.toLocaleString("es-CO")}*\n`;
    message += `\n*${t("Pedido realizado a través de la página web Giardino Pizza y Pasta / Order placed through the Giardino Pizza & Pasta website")}*`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNum}?text=${encoded}`, "_blank");

    Swal.fire({
      title: t("¡Pedido Enviado! / Order Sent!"),
      text: t(
        "Tu pedido ha sido enviado a WhatsApp correctamente. ¡Gracias por elegir Giardino Pizza y Pasta! / Your order has been successfully sent to WhatsApp. Thank you for choosing Giardino Pizza & Pasta!",
      ),
      icon: "success",
      confirmButtonColor: "#f3722c",
      confirmButtonText: t("Genial / Great"),
      borderRadius: "20px",
    }).then(() => {
      clearCart();
      setShowCheckout(false);
    });
  };

  //********************** */
  return (
    <>
      <Offcanvas
        show={isCartOpen}
        onHide={() => setIsCartOpen(false)}
        placement="end"
        className="cart-drawer"
      >
        <Offcanvas.Header closeButton className="text-white">
          <Offcanvas.Title className="h-premium text-white fs-3">
            {t("Tu Carrito / Your Cart")}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column">
          {cart.length === 0 ? (
            <div className="text-center py-5">
              <ShoppingBag size={60} className="text-muted mb-3 opacity-25" />
              <p className="text-muted">
                {t("Tu carrito está vacío. / Your cart is empty.")}
              </p>
              <button
                className="btn-premium btn-sm"
                onClick={() => setIsCartOpen(false)}
              >
                {t("Ir a ver el menú / Go to menu")}
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items-list flex-grow-1 overflow-auto pe-2">
                <ListGroup variant="flush">
                  {cart.map((item) => (
                    <ListGroup.Item
                      key={item.cartItemId}
                      className="px-0 py-3 bg-transparent border-bottom-dashed"
                    >
                      <div className="d-flex justify-content-between align-items-start">
                        <div className="flex-grow-1">
                          <h6 className="fw-bold mb-1">{t(item.name)}</h6>
                          <small className="text-primary-color d-block mb-1">
                            {item.selectedSize ? `${item.selectedSize} | ` : ""}
                            {item.finalPrice} {t("c/u / each")}
                          </small>

                          {(item.selectedFlavors ||
                            item.selectedSauces ||
                            item.selectedToppings) && (
                            <div className="toppings-badges-wrapper">
                              {item.selectedFlavors?.map((f) => (
                                <span key={f.id} className="badge-flavor">
                                  {f.quantity}x {t(f.name)}
                                </span>
                              ))}
                              {item.selectedSauces?.map((s) => (
                                <span key={s.id} className="badge-sauce">
                                  {t(s.name)}
                                </span>
                              ))}
                              {item.selectedToppings?.map((t_item) => (
                                <span key={t_item.id} className="badge-topping">
                                  {t(t_item.name)}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="d-flex align-items-center gap-3 mt-2">
                            <div className="qty-control">
                              <button
                                onClick={() =>
                                  updateQuantity(item.cartItemId, -1)
                                }
                              >
                                <Minus size={14} />
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.cartItemId, 1)
                                }
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <div className="d-flex gap-2">
                              <button
                                className="btn-edit-item"
                                onClick={() => handleEditItem(item)}
                                title={t("Editar opciones / Edit options")}
                              >
                                <Pencil size={18} />
                              </button>
                              <button
                                className="btn-trash"
                                onClick={() =>
                                  handleRemoveConfirm(
                                    item.cartItemId,
                                    item.name,
                                  )
                                }
                                title={t("Eliminar / Remove")}
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="text-end">
                          <span className="fw-bold">
                            $
                            {(
                              parseInt(item.finalPrice.replace(/[^0-9]/g, "")) *
                              item.quantity
                            ).toLocaleString("es-CO")}
                          </span>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>

              <div className="cart-footer mt-4 border-top pt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="mb-0 fw-bold">
                    {t("Total del pedido: / Order total:")}
                  </h5>
                  <h4 className="mb-0 fw-black text-primary-color">
                    ${cartTotal.toLocaleString("es-CO")}
                  </h4>
                </div>

                <button
                  className="btn-premium w-100 py-2 fs-6"
                  onClick={handleOpenCheckout}
                >
                  {t("Continuar al pago / Checkout")}
                </button>
                <a
                  href="#menu"
                  className="btn-link-custom w-100 mt-2 text-center d-block"
                  onClick={() => setIsCartOpen(false)}
                >
                  {t("Continuar comprando / Continue shopping")}
                </a>
              </div>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>

      <CheckoutModal
        show={showCheckout}
        onHide={() => setShowCheckout(false)}
        cart={cart}
        cartTotal={cartTotal}
        onConfirm={sendWhatsApp}
      />
    </>
  );
};

export default CartDrawer;
