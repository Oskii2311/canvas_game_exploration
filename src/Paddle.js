import CanvasElement from "./CanvasElement";

class Paddle extends CanvasElement {
    constructor(canvasCtx, positionX, positionY, width, height) {
        super(canvasCtx, positionX, positionY);
        this.width = width;
        this.height = height;
    }

    draw() {
        this.canvasCtx.beginPath();
        this.canvasCtx.rect(
            this.positionX,
            this.positionY,
            this.width,
            this.height
        );
        this.canvasCtx.fillStyle = "#eee";
        this.canvasCtx.fill();
        this.canvasCtx.closePath();
    }

    move(step) {
        this.positionX += step;
    }

    jumpX(position) {
        this.positionX = position;
    }
}

export default Paddle;
