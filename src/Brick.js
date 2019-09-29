import CanvasElement from "./CanvasElement";

class Brick extends CanvasElement {
    constructor(canvasCtx, positionX, positionY, width, height) {
        super(canvasCtx, positionX, positionY);
        this.width = width;
        this.height = height;
        this.status = 1;
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

    set setStatus(status) {
        this.status = status;
    }

    get getStatus() {
        return this.status;
    }
}

export default Brick;
