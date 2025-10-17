import { useEffect, useState } from "react";

export default function LoaderUltra({ loading, duration=500 }) {
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(0.9); // opacité initiale

  useEffect(() => {
    if (!loading) {
      const fadeDuration = duration;
      const interval = 2;
      let elapsed = 0;

      const timer = setInterval(() => {
        elapsed += interval;
        const eased = 1 * (1 - elapsed / fadeDuration);
        setOpacity(eased > 0 ? eased : 0);

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
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: `rgba(255,255,255,${opacity})`, // overlay diminue correctement
      }}
    >
      <div className="relative flex space-x-4" style={{ opacity }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-6 h-6 rounded-full"
            style={{
              background: "linear-gradient(45deg, #b91c1c, #1e3a8a)",
              animation: `rotate-scale 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes rotate-scale {
          0% { transform: rotate(0deg) scale(1); opacity: 0.8; }
          50% { transform: rotate(180deg) scale(1.5); opacity: 1; }
          100% { transform: rotate(360deg) scale(1); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
