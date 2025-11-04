import React, { useEffect } from "react";

const SEO = ({ title, description, url, image }) => {
  useEffect(() => {
    // 🧠 Modifie dynamiquement le <title>
    document.title = title || "Mon site";

    // Fonction utilitaire pour mettre à jour ou créer une balise meta
    const setMeta = (name, content, attr = "name") => {
      if (!content) return;
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (element) {
        element.setAttribute("content", content);
      } else {
        element = document.createElement("meta");
        element.setAttribute(attr, name);
        element.setAttribute("content", content);
        document.head.appendChild(element);
      }
    };

    // ✅ Description classique
    setMeta("description", description);

    // ✅ Open Graph (Facebook, LinkedIn, etc.)
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:image", image, "property");
    setMeta("og:url", url, "property");
    setMeta("og:type", "product", "property");

    // ✅ Twitter Cards
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);
    setMeta("twitter:card", "summary_large_image");

    // ✅ Canonical link
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
  }, [title, description, url, image]);

  return null; // rien à afficher visuellement
};

export default SEO;
