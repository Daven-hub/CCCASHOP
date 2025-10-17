import { useEffect, useState } from "react";

export default function Loader({ loading, duration }) {
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  // Gérer fade-out progressif
  useEffect(() => {
    if (!loading) {
      const fadeDuration = 500; // fade-out duration en ms
      const interval = 20; // intervalle pour réduire l'opacité
      let elapsed = 0;

      const timer = setInterval(() => {
        elapsed += interval;
        setOpacity(1 - elapsed / fadeDuration);

        if (elapsed >= fadeDuration) {
          clearInterval(timer);
          setVisible(false);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [loading]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      style={{ opacity }}
    >
      {/* Loader pulsant */}
      <div className="flex space-x-3">
        <span className="w-5 h-5 bg-red-700 rounded-full animate-ping"></span>
        <span className="w-5 h-5 bg-blue-900 rounded-full animate-ping delay-150"></span>
        <span className="w-5 h-5 bg-red-700 rounded-full animate-ping delay-300"></span>
      </div>
    </div>
  );
}
