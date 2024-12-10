interface BoardState {
    [key: string]: string | undefined;
  }

export class ChessLogic {
    private board: Map<string, string>;

    constructor() {
        this.board = new Map();
        this.initializeBoard();
    }

    private initializeBoard(): void {
        // Setting up Pawns
        const rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        rows.forEach(row => {
            this.board.set(`${row}2`, 'wP'); // White pawns
            this.board.set(`${row}7`, 'bP'); // Black pawns
        });
    }

    public movePiece(from: string, to: string): boolean {
        const piece = this.board.get(from);
        if (!piece) return false;

        // Checking if peice is pawn
        if (piece[1] === 'P') { 
            return this.movePawn(from, to, piece[0]);
        }

        return false; 
    }

    private movePawn(from: string, to: string, color: string): boolean {
        const direction = color === 'w' ? 1 : -1; 
        const fromRow = parseInt(from[1]);
        const toRow = parseInt(to[1]);
        const fromCol = from[0];
        const toCol = to[0];

        // one step forward move
        if (fromCol === toCol && toRow === fromRow + direction) {
            if (!this.board.has(to)) {
                this.updateBoard(from, to);
                return true;
            }
        }

        // first move of 2 steps
        if (fromCol === toCol && toRow === fromRow + 2 * direction) {
            const between = fromCol + (fromRow + direction);
            if ((color === 'w' && fromRow === 2) || (color === 'b' && fromRow === 7)) {
                if (!this.board.has(to) && !this.board.has(between)) {
                    this.updateBoard(from, to);
                    return true;
                }
            }
        }

        // cutting peice
        if (Math.abs(toCol.charCodeAt(0) - fromCol.charCodeAt(0)) === 1 && toRow === fromRow + direction) {
            if (this.board.has(to) && this.board.get(to)?.[0] !== color) {
                this.updateBoard(from, to);
                return true;
            }
        }

        return false;
    }

    private updateBoard(from: string, to: string): void {
        const piece = this.board.get(from);
        this.board.delete(from);
        this.board.set(to, piece!);
    }

    public getBoardState(): object {
        const state: any = {};
        this.board.forEach((value, key) => {
            state[key] = value;
        });
        return state;
    }

    
}


