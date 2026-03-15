import { useState } from "react";
import "./safeImage.css";

const SafeImage = ({
  src,
  alt,
  className,
  style,
  width,
  fetchPriority = "auto",
}) => {
  const [error, setError] = useState(false);

  //*********************** */
  // Function to get Netlify Image CDN URL
  const getOptimizedUrl = (originalSrc, w) => {
    if (!originalSrc || originalSrc.startsWith("http") || !w)
      return originalSrc;
    if (import.meta.env && import.meta.env.DEV) return originalSrc;
    // Prepend / if not present
    const cleanSrc = originalSrc.startsWith("/")
      ? originalSrc
      : `/${originalSrc}`;
    return `/.netlify/images?url=${encodeURIComponent(cleanSrc)}&w=${w}&q=75`;
  };

  const displaySrc = getOptimizedUrl(src, width);

  //************************* */
  if (error || !src) {
    return (
      <div className={`fallback-image-container ${className}`} style={style}>
        <div className="fallback-content">
          <img
            src="/images/LogoIn.avif"
            alt="Logo Giardino"
            className="fallback-logo"
            loading="lazy"
          />

          <span className="fallback-text">Sin imagen de referencia</span>
        </div>
      </div>
    );
  }

  //************************* */
  return (
    <img
      src={displaySrc || src}
      alt={alt}
      className={className}
      style={style}
      loading={fetchPriority === "high" ? "eager" : "lazy"}
      decoding="async"
      fetchpriority={fetchPriority}
      onError={() => setError(true)}
    />
  );
};

export default SafeImage;
