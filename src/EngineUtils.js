import Ball from "./Ball";
import Paddle from "./Paddle";
import Brick from "./Brick";
import Game from "./Game";

const canvas = document.getElementById("gameField");
const ctx = canvas.getContext("2d");
const canvasWidth = 1024;
const canvasHeight = 768;

const ball = new Ball(ctx, canvasWidth / 2, canvasHeight / 2, 10);
const paddle = new Paddle(ctx, canvasWidth / 2, canvasHeight - 10, 120, 10);

const brickRowCount = 10;
const brickColumnCount = 5;
const brickWidth = 80;
const brickHeight = 20;
const brickPadding = 19;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const bricks = [];

let leftPressed = false;
let rightPressed = false;

export function addMoveListeners() {
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);
}

export function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

export function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

export function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddle.jumpX(relativeX - paddle.width / 2);
    }
}

export function initBricksArray() {
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = new Brick();
        }
    }
}
export function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].getStatus === 1) {
                const brickX =
                    r * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY =
                    c * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r] = new Brick(
                    ctx,
                    brickX,
                    brickY,
                    brickWidth,
                    brickHeight
                );
                bricks[c][r].draw();
            }
        }
    }
}

export function resizeCanvasToFullScreen() {
    ctx.canvas.width = canvasWidth;
    ctx.canvas.height = canvasHeight;
}

export function isBallTouchedCanvasBottom() {
    return ball.positionY + ball.radius > ctx.canvas.height;
}

export function isBallTouchedPaddle() {
    return (
        ball.positionX > paddle.positionX &&
        ball.positionX < paddle.positionX + paddle.width &&
        ball.positionY + ball.radius >= ctx.canvas.height - paddle.height
    );
}

export function ballCollisionDetectionWithBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.getStatus === 1) {
                if (
                    ball.positionX > b.positionX &&
                    ball.positionX < b.positionX + brickWidth &&
                    ball.positionY > b.positionY &&
                    ball.positionY < b.positionY + brickHeight
                ) {
                    ball.setStepY = -ball.getStepY;
                    b.setStatus = 0;
                }
            }
        }
    }
}

export function ballCollisionDetection() {
    if (
        ball.positionY + ball.radius > ball.canvasCtx.canvas.height ||
        ball.positionY - ball.radius < 0 ||
        isBallTouchedPaddle()
    ) {
        ball.setStepY = -ball.getStepY;
    }

    if (
        ball.positionX + ball.radius > ball.canvasCtx.canvas.width ||
        ball.positionX - ball.radius < 0
    ) {
        ball.setStepX = -ball.getStepX;
    }
}

export function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    ball.draw();
    paddle.draw();

    if (isBallTouchedCanvasBottom()) {
        Game.endGame();
    }
    ballCollisionDetectionWithBricks();
    ballCollisionDetection();

    ball.move();
    if (rightPressed) {
        paddle.move(7);
    } else if (leftPressed) {
        paddle.move(-7);
    }

    requestAnimationFrame(draw);
}
