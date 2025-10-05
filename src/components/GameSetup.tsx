import React, { useState } from "react";
import { X, User, Bot } from "lucide-react";
import type { Player } from "../types";

interface GameSetupProps {
  onStartGame: (players: Player[]) => void;
  onClose: () => void;
}

export const GameSetup: React.FC<GameSetupProps> = ({
  onStartGame,
  onClose,
}) => {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Type, setPlayer2Type] = useState<"human" | "ai">("ai");
  const [player2Name, setPlayer2Name] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const players: Player[] = [
      {
        id: "player1",
        name: player1Name || "Joueur 1",
        avatar: "👤",
        isAI: false,
      },
      {
        id: "player2",
        name: player2Type === "ai" ? "GAMAI" : player2Name || "Joueur 2",
        avatar: player2Type === "ai" ? "🤖" : "👤",
        isAI: player2Type === "ai",
      },
    ];

    onStartGame(players);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>

        <h2>⚙️ Configuration de la partie</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <User size={20} />
              Votre nom
            </label>
            <input
              type="text"
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
              placeholder="Entrez votre nom"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Adversaire</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  value="ai"
                  checked={player2Type === "ai"}
                  onChange={() => setPlayer2Type("ai")}
                />
                <Bot size={20} />
                Intelligence Artificielle
              </label>

              <label className="radio-label">
                <input
                  type="radio"
                  value="human"
                  checked={player2Type === "human"}
                  onChange={() => setPlayer2Type("human")}
                />
                <User size={20} />
                Joueur humain
              </label>
            </div>
          </div>

          {player2Type === "human" && (
            <div className="form-group">
              <label>
                <User size={20} />
                Nom du joueur 2
              </label>
              <input
                type="text"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
                placeholder="Entrez le nom du joueur 2"
              />
            </div>
          )}

          <button type="submit" className="primary-button">
            🎮 Commencer la partie
          </button>
        </form>
      </div>
    </div>
  );
};
