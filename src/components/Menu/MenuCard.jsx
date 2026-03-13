import { Card } from "react-bootstrap";
import { Plus, Sparkles } from "lucide-react";
import SafeImage from "../Common/SafeImage";
import { useLanguage } from "../../context/LanguageContext";

const MenuCard = ({ item, onSelect }) => {
  const { t } = useLanguage();
  const isMultiPrice = typeof item.price === "object";

  return (
    <Card
      className="premium-card h-100"
      onClick={onSelect}
      style={{ cursor: "pointer" }}
    >
      <div className="card-img-wrapper">
        <SafeImage
          src={item.image}
          alt={t(item.name)}
          className="menu-card-img w-100 h-100 object-fit-cover"
        />
        <div className="category-badge">{t(item.category)}</div>
        <div className="customizable-hint">
          <Sparkles size={12} className="me-1" />
          {t("Personalizable / Customizable")}
        </div>
      </div>
      <Card.Body className="p-4 d-flex flex-column">
        <h3 className="h5 fw-bold mb-2">{t(item.name)}</h3>
        <Card.Text className="text-muted small mb-4 flex-grow-1">
          {t(item.description)}
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div className="price-tag">
            {isMultiPrice ? (
              <span className="h5 fw-bold mb-0 text-dark-grey">
                {t("Desde / From")} {Object.values(item.price)[0]}
              </span>
            ) : (
              <span className="h5 fw-bold mb-0 text-dark-grey">
                {item.price}
              </span>
            )}
          </div>
          <button
            className="btn-add-circle"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
          >
            <Plus size={20} />
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MenuCard;
