import { useState } from "react";
import { Pizza } from "lucide-react";
import "./safeImage.css";

const SafeImage = ({ src, alt, className, style }) => {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`fallback-image-container ${className}`} style={style}>
        <div className="fallback-content">
          <Pizza size={40} className="mb-2 text-main-pink" />
          <span className="h-premium fs-6">Giardino</span>
        </div>
      </div>
    );
  }

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
