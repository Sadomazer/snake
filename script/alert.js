"use strict";

var canvas = document.getElementById('tutorial');
var ctx = canvas.getContext('2d');
let htmlPoint = document.querySelector('.point');

let speed = 100;
let positionX = 0;
let positionY = 0;
let snakeWidth = 25;
let snakeHeight = 25;
let step = 25;
let dX = step;
let dY = 0;
let appleStatus = 0;
let snakeBody = [];
let snakeLength = 3;
let point = 0;

ctx.fillStyle = 'red';
ctx.fillRect(0, 0, snakeWidth, snakeHeight);

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let createApple = function() {
    let randomX = getRandomInt(16) * 25;
    let randomY = getRandomInt(16) * 25;

    return {
        x: randomX,
        y: randomY,
    };
}

let apple = createApple();

let draw = () => {
    ctx.fillStyle = 'green';
    ctx.fillRect(apple.x, apple.y, snakeWidth - 1, snakeHeight - 1);
}

let drive = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    positionX += dX;
    positionY += dY;

    htmlPoint.innerHTML = `очки: ${point}`;

    if (positionX + snakeWidth > canvas.width) {
        positionX = 0;
    }

    if (positionX < 0) {
        positionX = canvas.width - snakeWidth;
    }

    if (positionY + snakeHeight > canvas.height) {
        positionY = 0;
    }

    if (positionY < 0) {
        positionY = canvas.height - snakeHeight;
    }

    draw();

    snakeBody.push({
        x: positionX,
        y: positionY,
    });

    if (snakeBody.length > snakeLength) {
        snakeBody.shift();
    }

    for (let item of snakeBody) {
        ctx.fillStyle = 'red';
        ctx.fillRect(item.x, item.y, snakeWidth - 1, snakeHeight - 1);
    }

    if (apple.x == positionX && apple.y == positionY) {
        apple = createApple();

        point += 1;
        snakeLength += 1;
    }

    snakeBody.forEach((value, index) => {
        if (snakeBody.length - 1 == index) {
        	return;
        } else if (value.x == positionX && value.y == positionY) {
            alert(`Твои очки: ${point}`);
            location.reload();
        }
    });
}

setInterval(drive, speed);

document.addEventListener('keydown', (event) => {
    if (event.keyCode == 39 && dX >= 0) { //right		39
        dX = step;
        dY = 0;
    }

    if (event.keyCode == 37 && dX <= 0) { //left		37
        dX = -step;
        dY = 0;
    }

    if (event.keyCode == 38 && dY <= 0) { //up		38
        dY = -step;
        dX = 0;
    }

    if (event.keyCode == 40 && dY >= 0) { //down		40
        dY = step;
        dX = 0;
    }
});