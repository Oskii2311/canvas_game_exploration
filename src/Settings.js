import Ball from "./Ball";
import Paddle from "./Paddle";

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

const Settings = {
    canvas,
    ctx,
    canvasWidth,
    canvasHeight,
    ball,
    paddle,
    brickRowCount,
    brickColumnCount,
    brickWidth,
    brickHeight,
    brickPadding,
    brickOffsetTop,
    brickOffsetLeft,
    bricks
};

export default Settings;
