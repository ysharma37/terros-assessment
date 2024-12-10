// Pieces
type PieceType = "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";

// Colors
type Color = "white" | "black";

// Position on the board
interface Position {
  x: number; // Row
  y: number; // Column
}

abstract class ChessPiece {
  color: Color;
  type: PieceType;
  position: Position;

  constructor(color: Color, type: PieceType, position: Position) {
    this.color = color;
    this.type = type;
    this.position = position;
  }

  abstract getValidMoves(board: (ChessPiece | null)[][]): Position[];
}

// Pawn Implementation
class Pawn extends ChessPiece {
  getValidMoves(board: (ChessPiece | null)[][]): Position[] {
    const moves: Position[] = [];
    const direction = this.color === "white" ? -1 : 1;
    const { x, y } = this.position;

    // Moving forward
    if (this.isValidPosition(x + direction, y) && !board[x + direction][y]) {
      moves.push({ x: x + direction, y });
    }

    // Capturing pieces diagonally
    [-1, 1].forEach((dy) => {
      const nx = x + direction;
      const ny = y + dy;
      if (
        this.isValidPosition(nx, ny) &&
        board[nx][ny] &&
        board[nx][ny]?.color !== this.color
      ) {
        moves.push({ x: nx, y: ny });
      }
    });

    return moves;
  }

  private isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }
}

class ChessGame {
  board: (ChessPiece | null)[][];
  currentPlayer: Color;

  // White starts first
  constructor() {
    this.board = this.initializeBoard();
    this.currentPlayer = "white"; 
  }

  // Initialinzing the board
  initializeBoard(): (ChessPiece | null)[][] {
    const board: (ChessPiece | null)[][] = Array.from({ length: 8 }, () =>
      Array(8).fill(null)
    );

    // Place pawns
    for (let y = 0; y < 8; y++) {
      board[1][y] = new Pawn("black", "pawn", { x: 1, y });
      board[6][y] = new Pawn("white", "pawn", { x: 6, y });
    }

    return board;
  }

  // Printing current board state
  printBoard(): void {
    this.board.forEach((row, x) => {
      console.log(
        row
          .map((cell, y) =>
            cell
              ? `${cell.color[0]}-${cell.type[0].toUpperCase()}`
              : ` . `
          )
          .join(" ")
      );
    });
  }

  // Moving Pawn
  movePiece(from: Position, to: Position): boolean {
    const piece = this.board[from.x][from.y];
    if (!piece || piece.color !== this.currentPlayer) {
      console.log("Invalid move: No piece or not your turn.");
      return false;
    }

    const validMoves = piece.getValidMoves(this.board);
    if (!validMoves.some((move) => move.x === to.x && move.y === to.y)) {
      console.log("Invalid move: Move not allowed for this piece.");
      return false;
    }

    this.board[to.x][to.y] = piece;
    this.board[from.x][from.y] = null;
    piece.position = to;

    // Change turn
    this.currentPlayer = this.currentPlayer === "white" ? "black" : "white";
    return true;
  }
}

const game = new ChessGame();
game.printBoard();
console.log("White moves pawn:");
game.movePiece({ x: 6, y: 0 }, { x: 5, y: 0 }); // Move white pawn
game.printBoard();
console.log("Black moves pawn:");
game.movePiece({ x: 1, y: 0 }, { x: 2, y: 0 }); // Move black pawn
game.printBoard();
