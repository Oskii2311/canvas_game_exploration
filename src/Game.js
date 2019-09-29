import {
    initBricksArray,
    draw,
    addMoveListeners,
    resizeCanvasToFullScreen
} from "./EngineUtils";

class Game {
    start() {
        initBricksArray();
        resizeCanvasToFullScreen();
        draw();
        addMoveListeners();
    }

    static endGame() {
        document.location.reload();
    }
}

export default Game;
