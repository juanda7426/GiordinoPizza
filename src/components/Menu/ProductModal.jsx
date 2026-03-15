import { Modal, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useLanguage } from "../../context/LanguageContext";
import { toppingsData, saucesData, flavorsData } from "../../data";
import { Plus, Minus, Info } from "lucide-react";
import SafeImage from "../Common/SafeImage";

const ProductModal = () => {
  const { modalState, closeModal, addToCart, updateCartItem, setIsCartOpen } =
    useCart();
  const { t } = useLanguage();
  const { isOpen, product, mode, editingItemId } = modalState;

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedSauces, setSelectedSauces] = useState([]);
  const [flavorCounts, setFlavorCounts] = useState({}); // { flavorId: count }
  const [extraScoops, setExtraScoops] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const isMultiPrice = product && typeof product.price === "object";
  const hasIceCream = product && product.scoops;

  const scoopBaseLimit = product
    ? typeof product.scoops === "object"
      ? product.scoops[selectedSize]
      : product.scoops
    : 0;

  const totalAllowedScoops = scoopBaseLimit + extraScoops;
  const currentSelectedScoops = Object.values(flavorCounts).reduce(
    (a, b) => a + b,
    0,
  );

  //*********************** */
  useEffect(() => {
    if (product && isOpen) {
      if (mode === "edit" && editingItemId) {
        if (product.selectedSize) setSelectedSize(product.selectedSize);
        if (product.selectedToppings)
          setSelectedToppings(product.selectedToppings);
        if (product.selectedSauces) setSelectedSauces(product.selectedSauces);

        const counts = {};
        (product.selectedFlavors || []).forEach((f) => {
          counts[f.id] = f.quantity;
        });
        setFlavorCounts(counts);
        setExtraScoops(product.extraScoopsCount || 0);
      } else {
        setSelectedSize(isMultiPrice ? Object.keys(product.price)[0] : "");
        setSelectedToppings([]);
        setSelectedSauces([]);
        setFlavorCounts({});
        setExtraScoops(0);
      }
    }
  }, [product, isOpen, mode, editingItemId, isMultiPrice]);

  useEffect(() => {
    if (product) {
      let base = isMultiPrice ? product.price[selectedSize] : product.price;
      if (!base)
        base = isMultiPrice ? Object.values(product.price)[0] : product.price;

      let baseInt = parseInt(base.replace(/[^0-9]/g, ""));

      const toppingsTotal = selectedToppings.reduce((acc, topping) => {
        return acc + parseInt(topping.price.replace(/[^0-9]/g, ""));
      }, 0);

      const extraScoopsTotal = extraScoops * 5000;

      setTotalPrice(baseInt + toppingsTotal + extraScoopsTotal);
    }
  }, [product, selectedSize, selectedToppings, extraScoops, isMultiPrice]);

  if (!product) return null;

  const handleToppingToggle = (topping) => {
    setSelectedToppings((prev) =>
      prev.find((t) => t.id === topping.id)
        ? prev.filter((t) => t.id !== topping.id)
        : [...prev, topping],
    );
  };

  const handleSauceToggle = (sauce) => {
    setSelectedSauces((prev) => {
      if (prev.find((s) => s.id === sauce.id)) {
        return prev.filter((s) => s.id !== sauce.id);
      }
      if (prev.length >= 2) return prev;
      return [...prev, sauce];
    });
  };

  const updateFlavorCount = (flavorId, delta) => {
    setFlavorCounts((prev) => {
      const current = prev[flavorId] || 0;
      const next = current + delta;

      if (next < 0) return prev;
      if (delta > 0 && currentSelectedScoops >= totalAllowedScoops) return prev;

      return { ...prev, [flavorId]: next };
    });
  };

  const handleConfirm = () => {
    const flavors = Object.entries(flavorCounts)
      .filter(([_, count]) => count > 0)
      .map(([id, count]) => {
        const flavorInfo = flavorsData.find((f) => f.id === id);
        return { ...flavorInfo, quantity: count };
      });

    const options = {
      size: isMultiPrice ? selectedSize : null,
      toppings: selectedToppings,
      sauces: selectedSauces,
      flavors: flavors,
      extraScoopsCount: extraScoops,
      totalPrice: `$${totalPrice.toLocaleString("es-CO")}`,
    };

    if (mode === "edit") {
      updateCartItem(editingItemId, product, options);
      closeModal();
      setIsCartOpen(true);
    } else {
      addToCart(product, options);
      closeModal();
    }
  };

  //**************** */
  return (
    <Modal
      show={isOpen}
      onHide={closeModal}
      centered
      size="lg"
      className="premium-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="h-premium">
          {mode === "edit"
            ? `${t("Editar / Edit")} ${t(product.name)}`
            : t(product.name)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 pb-4 overflow-x-hidden">
        <Row>
          <Col md={5}>
            <div className="sticky-md-top" style={{ top: "20px" }}>
              <SafeImage
                src={product.image}
                alt={t(product.name)}
                className="img-fluid rounded-extra shadow-sm mb-4"
                style={{ width: "100%", height: "300px", objectFit: "cover" }}
                width={600}
              />
              <p className="text-muted small">{t(product.description)}</p>
            </div>
          </Col>
          <Col md={7}>
            {isMultiPrice && (
              <div className="mb-4">
                <h6 className="fw-bold mb-3">
                  {t("Elige una opción: / Choose an option:")}
                </h6>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {Object.keys(product.price).map((size) => (
                    <button
                      key={size}
                      className={`size-selector ${selectedSize === size ? "active" : ""}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {hasIceCream && flavorsData.length > 0 && (
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="fw-bold mb-0">Adicionar Bolas Extra:</h6>
                  <div className="qty-control">
                    <button
                      onClick={() =>
                        setExtraScoops(Math.max(0, extraScoops - 1))
                      }
                    >
                      <Minus size={14} />
                    </button>
                    <span className="fw-bold">{extraScoops}</span>
                    <button onClick={() => setExtraScoops(extraScoops + 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div
                  className="alert alert-info py-2 px-3 mb-3 d-flex align-items-center gap-2"
                  style={{ fontSize: "0.8rem", borderRadius: "15px" }}
                >
                  <Info size={16} />
                  <span>
                    Tienes <strong>{totalAllowedScoops}</strong>{" "}
                    {totalAllowedScoops === 1 ? "bola" : "bolas"} para
                    distribuir ({scoopBaseLimit}{" "}
                    {scoopBaseLimit === 1 ? "incluida" : "incluidas"} +{" "}
                    {extraScoops} extra).
                  </span>
                </div>

                <h6 className="fw-bold mb-3 d-flex justify-content-between">
                  Distribuye tus sabores:
                  <small
                    className={
                      currentSelectedScoops === totalAllowedScoops
                        ? "text-success fw-bold"
                        : "text-main-pink fw-bold"
                    }
                  >
                    {currentSelectedScoops}/{totalAllowedScoops}
                  </small>
                </h6>

                <div
                  className="topping-selection-container"
                  style={{
                    maxHeight: "200px",
                    overflowY: "auto",
                    paddingRight: "10px",
                  }}
                >
                  <div className="flavor-distribution-list">
                    {flavorsData.map((flavor) => (
                      <div
                        key={flavor.id}
                        className="flavor-row d-flex justify-content-between align-items-center p-2 border-bottom"
                      >
                        <span className="fw-medium">{flavor.name}</span>
                        <div className="qty-control qty-sm">
                          <button
                            onClick={() => updateFlavorCount(flavor.id, -1)}
                          >
                            <Minus size={12} />
                          </button>
                          <span
                            style={{ minWidth: "20px", textAlign: "center" }}
                          >
                            {flavorCounts[flavor.id] || 0}
                          </span>
                          <button
                            onClick={() => updateFlavorCount(flavor.id, 1)}
                            disabled={
                              currentSelectedScoops >= totalAllowedScoops
                            }
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {saucesData.length > 0 && (
              <div className="mb-4 mt-4">
                <h6 className="fw-bold mb-3 d-flex justify-content-between">
                  Salsas (Máx. 2):
                  <small className="text-muted fw-normal">
                    {selectedSauces.length}/2
                  </small>
                </h6>
                <div className="topping-selection-grid">
                  {saucesData.map((sauce) => (
                    <div
                      key={sauce.id}
                      className={`topping-select-card ${selectedSauces.find((s) => s.id === sauce.id) ? "active" : ""}`}
                      onClick={() => handleSauceToggle(sauce)}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <span>{sauce.name}</span>
                        {selectedSauces.find((s) => s.id === sauce.id) && (
                          <div className="dot-selected"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {toppingsData.length > 0 && (
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Toppings adicionales:</h6>
                <div
                  className="topping-selection-container"
                  style={{
                    maxHeight: "180px",
                    overflowY: "auto",
                    paddingRight: "10px",
                  }}
                >
                  <div className="topping-selection-grid">
                    {toppingsData.map((topping) => (
                      <div
                        key={topping.id}
                        className={`topping-select-card ${selectedToppings.find((t) => t.id === topping.id) ? "active" : ""}`}
                        onClick={() => handleToppingToggle(topping)}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="text-truncate">{topping.name}</span>
                          {selectedToppings.find(
                            (t) => t.id === topping.id,
                          ) && <div className="dot-selected"></div>}
                        </div>
                        <small className="fw-bold">{topping.price}</small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div
              className="d-flex justify-content-between align-items-center pt-3 border-top sticky-bottom bg-white"
              style={{ bottom: "-1px" }}
            >
              <div>
                <span className="text-muted d-block small">
                  {t("Total estimado / Estimated Total")}
                </span>
                <span className="h4 fw-bold text-primary-color mb-0">
                  ${totalPrice.toLocaleString("es-CO")}
                </span>
              </div>
              <button
                className="btn-premium"
                onClick={handleConfirm}
                disabled={
                  hasIceCream && currentSelectedScoops < totalAllowedScoops
                }
              >
                {mode === "edit" ? t("Guardar / Save") : t("Agregar / Add")}
              </button>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;
