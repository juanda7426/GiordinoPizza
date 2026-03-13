import { Modal, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const CheckoutModal = ({ show, onHide, cart, cartTotal, onConfirm }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [customerData, setCustomerData] = useState({
    name: "",
    address: "",
    phone: "",
    notes: "",
    neighborhood: "",
    paymentMethod: "",
  });

  const handleInputChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const isFormValid =
    customerData.name &&
    customerData.address &&
    customerData.phone &&
    customerData.neighborhood &&
    customerData.paymentMethod;

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  const handleFinalSubmit = () => {
    onConfirm(customerData);
    onHide();
    setStep(1);
    setCustomerData({
      name: "",
      address: "",
      phone: "",
      notes: "",
      neighborhood: "",
      paymentMethod: "",
    });
  };

  //**************** */
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      className="premium-modal shadow-lg"
    >
      <Modal.Header closeButton className="border-0 px-4 pt-4">
        <Modal.Title className="h-premium fs-2">
          {step === 1
            ? t("Datos de Envío / Shipping Details")
            : t("Confirma tu pedido / Confirm your order")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 pb-4">
        {step === 1 ? (
          <Form>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-bold">
                    {t("Nombre Completo / Full Name")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder={t("Ej: Juan Pérez / e.g. John Doe")}
                    value={customerData.name}
                    onChange={handleInputChange}
                    className="custom-input"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-bold">
                    {t("Teléfono / Phone")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    placeholder={t("Ej: 320 123 4567 / e.g. 555-1234")}
                    value={customerData.phone}
                    onChange={handleInputChange}
                    className="custom-input"
                  />
                </Form.Group>
              </Col>
              <Col md={8}>
                <Form.Group>
                  <Form.Label className="small fw-bold">
                    {t("Dirección de Entrega / Delivery Address")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    placeholder={t(
                      "Ej: Calle 45 # 12-34 / e.g. 45th St # 12-34",
                    )}
                    value={customerData.address}
                    onChange={handleInputChange}
                    className="custom-input"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label className="small fw-bold">
                    {t("Barrio / Neighborhood")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="neighborhood"
                    placeholder={t("Ej: Chapinero / e.g. Downtown")}
                    value={customerData.neighborhood}
                    onChange={handleInputChange}
                    className="custom-input"
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="small fw-bold">
                    {t("Método de Pago / Payment Method")}
                  </Form.Label>
                  <Form.Select
                    name="paymentMethod"
                    value={customerData.paymentMethod}
                    onChange={handleInputChange}
                    className="custom-input"
                  >
                    <option value="">
                      {t("Selecciona una opción / Select an option")}
                    </option>
                    <option value="Efectivo">{t("Efectivo / Cash")}</option>
                    <option value="Nequi">Nequi</option>
                    <option value="Daviplata">Daviplata</option>
                    <option value="Transferencia Bancaria">
                      {t("Transferencia Bancaria / Bank Transfer")}
                    </option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="small fw-bold">
                    {t(
                      "Notas o Referencias (Opcional) / Notes or References (Optional)",
                    )}
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="notes"
                    placeholder={t(
                      "Ej: Apartamento 402, dejar en portería... / e.g. Apt 402, leave at the lobby...",
                    )}
                    value={customerData.notes}
                    onChange={handleInputChange}
                    className="custom-input"
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="mt-4 pt-3 border-top d-flex justify-content-end">
              <button
                type="button"
                className="btn-premium px-5"
                disabled={!isFormValid}
                onClick={nextStep}
              >
                {t("Revisar Pedido / Review Order")}
              </button>
            </div>
          </Form>
        ) : (
          <div className="confirmation-step">
            <div className="summary-box p-4 rounded-extra bg-light-pink mb-4 border border-pink-soft">
              <Row>
                <Col sm={5} className="mb-3 mb-sm-0">
                  <h6 className="fw-bold text-main-pink mb-3">
                    {t("Información de Entrega / Delivery Information")}
                  </h6>
                  <p className="mb-1 small">
                    <strong>{t("Cliente / Customer")}:</strong>{" "}
                    {customerData.name}
                  </p>
                  <p className="mb-1 small">
                    <strong>{t("Barrio / Neighborhood")}:</strong>{" "}
                    {customerData.neighborhood}
                  </p>
                  <p className="mb-1 small">
                    <strong>{t("Dir / Address")}:</strong>{" "}
                    {customerData.address}
                  </p>
                  <p className="mb-1 small">
                    <strong>{t("Tel / Phone")}:</strong> {customerData.phone}
                  </p>
                  <p className="mb-1 small">
                    <strong>{t("Pago / Payment")}:</strong>{" "}
                    {customerData.paymentMethod}
                  </p>
                </Col>
                <Col sm={7}>
                  <h6 className="fw-bold text-main-pink mb-3">
                    {t("Resumen del Pedido / Order Summary")}
                  </h6>
                  <div
                    className="small checkout-items-summary"
                    style={{ maxHeight: "300px", overflowY: "auto" }}
                  >
                    {cart.map((item, idx) => (
                      <div
                        key={idx}
                        className="mb-3 pb-2 border-bottom border-light"
                      >
                        <div className="d-flex justify-content-between mb-1">
                          <span className="fw-bold">
                            {item.quantity}x {t(item.name)}{" "}
                            {item.selectedSize ? `(${item.selectedSize})` : ""}
                          </span>
                          <span className="fw-bold">{item.finalPrice}</span>
                        </div>

                        {item.selectedFlavors &&
                          item.selectedFlavors.length > 0 && (
                            <div className="toppings-badges-wrapper">
                              {item.selectedFlavors.map((f) => (
                                <span
                                  key={f.id}
                                  className="badge-flavor"
                                  style={{ fontSize: "0.6rem" }}
                                >
                                  {f.quantity}x {t(f.name)}
                                </span>
                              ))}
                            </div>
                          )}
                        {item.selectedSauces &&
                          item.selectedSauces.length > 0 && (
                            <div className="toppings-badges-wrapper">
                              {item.selectedSauces.map((s) => (
                                <span
                                  key={s.id}
                                  className="badge-sauce"
                                  style={{ fontSize: "0.6rem" }}
                                >
                                  {t(s.name)}
                                </span>
                              ))}
                            </div>
                          )}
                        {item.selectedToppings &&
                          item.selectedToppings.length > 0 && (
                            <div className="toppings-badges-wrapper">
                              {item.selectedToppings.map((t) => (
                                <span
                                  key={t_item.id}
                                  className="badge-topping"
                                  style={{ fontSize: "0.6rem" }}
                                >
                                  {t(t_item.name)}
                                </span>
                              ))}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-2 border-top d-flex justify-content-between fw-bold h5">
                    <span>TOTAL:</span>
                    <span className="text-main-pink">
                      ${cartTotal.toLocaleString("es-CO")}
                    </span>
                  </div>
                </Col>
              </Row>
            </div>

            <div className="d-flex flex-column flex-sm-row gap-3 mt-4 pt-3 border-top">
              <button
                className="btn-outline-premium w-100 py-3"
                onClick={prevStep}
              >
                <ArrowLeft size={18} className="me-2" />
                {t("Modificar Datos / Modify Data")}
              </button>
              <button
                className="btn-premium w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                onClick={handleFinalSubmit}
              >
                <CheckCircle size={18} />
                {t("Confirmar y Enviar / Confirm & Send")}
              </button>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default CheckoutModal;
