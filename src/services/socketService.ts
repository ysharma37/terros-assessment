import { Server } from 'ws';
import { ChessLogic } from './chessLogic';

export class SocketService {
    private wss: Server;

    constructor(server: any) {
        this.wss = new Server({ server });
        this.initializeWebSocket();
    }

    private initializeWebSocket(): void {
        this.wss.on('connection', ws => {
            const chessGame = new ChessLogic();

            ws.on('message', message => {
                const { from, to } = JSON.parse(message.toString());
                const moveResult = chessGame.movePiece(from, to);
                ws.send(JSON.stringify({ moveResult, board: chessGame.getBoardState() }));
            });
        });
    }
}
