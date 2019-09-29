import CanvasElement from "./CanvasElement";

class Ball extends CanvasElement {
    constructor(canvasCtx, positionX, positionY, radius) {
        super(canvasCtx, positionX, positionY);
        this.radius = radius;
        this.ballStepX = 5;
        this.ballStepY = 5;
    }

    draw() {
        this.canvasCtx.beginPath();
        this.canvasCtx.arc(
            this.positionX,
            this.positionY,
            this.radius,
            0,
            Math.PI * 2,
            false
        );
        this.canvasCtx.fillStyle = "#eee";
        this.canvasCtx.fill();
        this.canvasCtx.closePath();
    }

    move() {
        this.positionX += this.ballStepX;
        this.positionY += this.ballStepY;
    }

    set setStepX(stepValue) {
        this.ballStepX = stepValue;
    }

    set setStepY(stepValue) {
        this.ballStepY = stepValue;
    }

    get getStepX() {
        return this.ballStepX;
    }

    get getStepY() {
        return this.ballStepY;
    }
}

export default Ball;
