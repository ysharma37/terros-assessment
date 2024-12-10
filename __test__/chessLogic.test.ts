import { ChessLogic } from '../src/services/chessLogic'; 

describe('ChessLogic', () => {
  let chessGame: ChessLogic;

  // Resetting game before each test
  beforeEach(() => {
    chessGame = new ChessLogic(); 
  });

  test('pawn moves one square forward', () => {
    expect(chessGame.movePiece('e2', 'e3')).toBeTruthy();
  });

  test('pawn moves two squares forward from initial position', () => {
    expect(chessGame.movePiece('e2', 'e4')).toBeTruthy();
  });

  // Initial two-step move
  test('pawn cannot move two squares forward from non-initial position', () => {
    chessGame.movePiece('e2', 'e4'); 
    expect(chessGame.movePiece('e4', 'e6')).toBeFalsy(); 
  });

  // Capturing pieces
  test('pawn captures diagonally', () => {
    chessGame.movePiece('d7', 'd5'); 
    expect(chessGame.movePiece('e2', 'e4')); 
    expect(chessGame.movePiece('e4', 'd5')).toBeTruthy(); 
  });
});
