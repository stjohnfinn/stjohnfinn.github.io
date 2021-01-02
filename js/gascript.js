let divH = 600;
let divW = 1150;
let rocketsMax = 20;
let rocketsMin = 4;
let mutMax = 50;
let mutMin = 2;
let rocketCount = 1;
let population = new Array(rocketCount);

let rocketStartingPos = {
    x: divW / 2,
    y: divH / 2
} 

let board = new Two({width: divW, height: divH});

class Rocket {

    moves = new Array(20);
    direction = 0;
    position = new Two.Vector();
    velocity = new Two.Vector();

    constructor(startX, startY) {
        this.position.x = startX;
        this.position.y = startY;

        this.velocity.x = 0;
        this.velocity.y = 0;
    }

    move() {
        this.velocity.x = $("#rVal").val();
        this.velocity.y = $("#mVal").val();

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    checkOutOfBounds() {
        if (this.position.x > board.width) {
            this.position.x = 0;
        } if (this.position.x < 0) {
            this.position.x = board.width;
        } if (this.position.y > board.height) {
            this.position.y = 0;
        } if (this.position.y < 0) {
            this.position.y = board.height;
        }
    }

    calcDir() {
        if (this.velocity.y == 0) {
            if (this.velocity.x > 0) {
                this.direction = 0;
                return;
            } else if (this.velocity.x < 0) {
                this.direction = Math.PI;
                return;
            }
        } if (this.velocity.x == 0) {
            if (this.velocity.y > 0) {
                this.direction = Math.PI / 2;
                return;
            } if (this.velocity.y < 0) {
                this.direction = 3 * Math.PI / 2;
                return;
            }
        }

        this.direction = Math.atan(this.velocity.y / this.velocity.x);
    }

    draw() {
        let body = board.makeRectangle(this.position.x, this.position.y, 40, 15);
        let topWing = board.makePath(this.position.x - 20, this.position.y - 17.5, this.position.x - 20, this.position.y - 7.5, this.position.x - 5, this.position.y - 7.5, this.position.x - 20, this.position.y - 17.5, true);
        let botWing = board.makePath(this.position.x - 20, this.position.y + 17.5, this.position.x - 20, this.position.y + 7.5, this.position.x - 5, this.position.y + 7.5, this.position.x - 20, this.position.y + 17.5, true);
        let midWing = board.makeRectangle(this.position.x - 12.5, this.position.y, 15, 4);
        let cabinWindow = board.makeEllipse(this.position.x + 8, this.position.y, 7.5, 4);
        let top = board.makePath(this.position.x + 20, this.position.y - 7.5, this.position.x + 35, this.position.y, this.position.x + 20, this.position.y + 7.5, this.position.x + 20, this.position.y - 7.5, true);
        let exhaust1 = board.makePath(this.position.x - 22, this.position.y - 4, this.position.x - 46, this.position.y, this.position.x - 22, this.position.y + 4, this.position.x - 22, this.position.y - 4, true);
        let exhaust2 = board.makePath(this.position.x - 22, this.position.y - 2, this.position.x - 32, this.position.y, this.position.x - 22, this.position.y + 2, this.position.x - 22, this.position.y - 2, true);

        body.fill = "rgba(210, 210, 210, 0.5)";
        topWing.fill = "rgba(255, 0, 0, 0.5)";
        botWing.fill = "rgba(255, 0, 0, 0.5)";
        midWing.fill = "rgba(255, 0, 0, 0.5)";
        cabinWindow.fill = "rgba(195, 175, 50, 0.5)";
        top.fill = "rgba(255, 0, 0, 0.5)";
        exhaust1.fill = "rgba(255, 165, 0, 0.5)";
        exhaust2.fill = "rgba(255, 255, 0, 0.5)";

        this.rocketShip = board.makeGroup(body, topWing, botWing, midWing, cabinWindow, top, exhaust1, exhaust2);

        this.rocketShip.linewidth = 1;
        this.rocketShip.miter = 6;
        this.rocketShip.join = "round";
        this.rocketShip.scale = 2;
        this.rocketShip.center();

        this.checkOutOfBounds();
        this.calcDir();

        this.rocketShip.rotation = this.direction;
        this.rocketShip.translation = this.position;
    }
}

$(document).ready(function() {

    $("#startBtn").click(clickStart);
    $("#rVal").focusout(validateInput);
    $("#mVal").focusout(validateInput);

    document.addEventListener('keyup', checkInput);

    board.appendTo(document.getElementById("twoCanvas"));

    let rocket = new Rocket(rocketStartingPos.x, rocketStartingPos.y);

    board.bind('update', function(frameCount) {
        board.clear();
        rocket.move();
        rocket.draw();
    });
});

function clickStart() {
    $("#startBtn").text("Pause");

    if (!board.playing) {
        board.play();
        $("#startBtn").text("Pause");
    } else {
        board.pause();
        $("#startBtn").text("Start");
    }
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

function degToRad(deg) {
    return deg * Math.PI / 180;
}

