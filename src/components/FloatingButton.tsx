import React from "react";
import { Play } from "lucide-react";

interface FloatingButtonProps {
  onClick: () => void;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="floating-button"
      aria-label="Démarrer une partie"
    >
      <Play size={24} />
      <span>Nouvelle Partie</span>
    </button>
  );
};
