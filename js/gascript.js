let divH = 600;
let divW = 1150;
let rocketsMax = 20;
let rocketsMin = 3;
let mutMax = 50;
let mutMin = 2;
let population = 1;

class Rocket {

    moves = new Array(20);
    direction = 0;

    constructor() {
        this.init();
    }

    init() {

    }
}

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
    frameRate(30);
    angleMode(DEGREES);
}

function draw() {
    background(200);

    for(let i = 0; i < population; i++) {
        
    }
}

function mousePressed() {
    
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