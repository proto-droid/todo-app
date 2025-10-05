export const calculateAIMove = (
  board: (string | null)[],
  aiPlayerId: string,
  humanPlayerId: string
): number => {
  // Vérifier les combinaisons gagnantes possibles
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Lignes horizontales
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Lignes verticales
    [0, 4, 8],
    [2, 4, 6], // Diagonales
  ];

  // 1. Essayer de gagner
  for (const line of winningLines) {
    const [a, b, c] = line;
    const values = [board[a], board[b], board[c]];
    const aiCount = values.filter((v) => v === aiPlayerId).length;
    const emptyCount = values.filter((v) => v === null).length;

    if (aiCount === 2 && emptyCount === 1) {
      if (board[a] === null) return a;
      if (board[b] === null) return b;
      if (board[c] === null) return c;
    }
  }

  // 2. Bloquer le joueur humain
  for (const line of winningLines) {
    const [a, b, c] = line;
    const values = [board[a], board[b], board[c]];
    const humanCount = values.filter((v) => v === humanPlayerId).length;
    const emptyCount = values.filter((v) => v === null).length;

    if (humanCount === 2 && emptyCount === 1) {
      if (board[a] === null) return a;
      if (board[b] === null) return b;
      if (board[c] === null) return c;
    }
  }

  // 3. Prendre le centre si disponible
  if (board[4] === null) return 4;

  // 4. Prendre un coin disponible
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter((i) => board[i] === null);
  if (availableCorners.length > 0) {
    return availableCorners[
      Math.floor(Math.random() * availableCorners.length)
    ];
  }

  // 5. Prendre n'importe quelle case disponible
  const availableMoves = board
    .map((cell, index) => (cell === null ? index : null))
    .filter((index): index is number => index !== null);

  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
};
