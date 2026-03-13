import { useState } from "react";
import "./safeImage.css";

const SafeImage = ({ src, alt, className, style }) => {
  const [error, setError] = useState(false);

  //************************* */
  if (error || !src) {
    return (
      <div className={`fallback-image-container ${className}`} style={style}>
        <div className="fallback-content">
          <img
            src="/images/LogoIn.avif"
            alt="Logo Giardino"
            className="fallback-logo"
          />

          <span className="fallback-text">Sin imagen de referencia</span>
        </div>
      </div>
    );
  }

  //************************* */
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setError(true)}
    />
  );
};

export default SafeImage;
