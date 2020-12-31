let divW = 0;
let divH = 0;

$(document).ready(function() {
    console.log("Ready!");

    divW = $("#p5canvas").width();
    divH = $("#p5canvas").height();
});

function setup() {
    let cnv = createCanvas(divW,  divH);
    cnv.parent("p5canvas");
    frameRate(1);
}

function draw() {
    background('#0d0f40');
    for(let i = 0; i < 3; i++) {
        drawRocket(Math.floor(Math.random() * divW - 20), Math.floor(Math.random() * divH - 20));
    }
}

function windowResized() {
    resizeCanvas(divW, divH);
}

function drawRocket(x, y) {
    fill(130);
    rect(x, y - 10, 50, 20);
    fill('#ffd012');
    rect(x - 5, y - 8, 5, 16)
}