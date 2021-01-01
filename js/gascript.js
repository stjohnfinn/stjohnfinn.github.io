let divH = 600;
let divW = 1150;
let rocketsMax = 20;
let rocketsMin = 3;
let mutMax = 50;
let mutMin = 2;

$(document).ready(function() {
    console.log("Ready!");

    $("#startBtn").click(startSim);
    $("#rVal").focusout(validateInput);
    $("#mVal").focusout(validateInput);

    document.addEventListener('keyup', checkInput);
});

function setup() {
    let cnv = createCanvas(divW, divH);
    cnv.parent("p5canvas");
    frameRate(1);
}

function draw() {
    background('#0d0f40');
}

function drawRocket(x, y) {
    fill(130);
    rect(x, y - 10, 50, 20);
    fill('#ffd012');
    rect(x - 5, y - 8, 5, 16)
}

function startSim() {
    $("#startBtn").text("Restart");
}

function validateInput() {
    if($("#rVal").val() > rocketsMax) {
        $("#rVal").val(rocketsMax);
    } if($("#rVal").val() < rocketsMin) {
        $("#rVal").val(rocketsMin);
    } if($("#mVal").val() > mutMax) {
        $("#mVal").val(mutMax);
    } if($("#mVal").val() < mutMin) {
        $("#mVal").val(mutMin);
    }
}

function checkInput(event) {
    if( $(".modVal").is(":focus") && event.keyCode === 13) {
        $(".modVal").blur();
    }
}