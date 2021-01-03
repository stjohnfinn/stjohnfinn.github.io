let divH = 600;
let divW = 1150;
let rocketsMax = 20;
let rocketsMin = 4;
let mutMax = 50;
let mutMin = 2;
let mutationChance = 0;
let rocketCount = 0;
let population = new Array(rocketCount);

let rocketStartingPos = {
    x: divW / 2,
    y: divH / 2
} 

let board = new Two({width: divW, height: divH});

//this the class for each individual rocket, it handles drawing the rocket each frame
//and handles the 2d physics for each rocket
//stores its genes and will eventually calculate the fitness as well

class Rocket {

    moves = new Array(20);
    direction = 0;
    position = new Two.Vector();
    velocity = new Two.Vector();

    constructor(startX, startY) {
        this.position.x = startX;
        this.position.y = startY;

        //generates random velocities for the rocket

        this.velocity.x = Math.random() * 10 - 5;
        this.velocity.y = Math.random() * 10 - 5;

        //generates random colors

        this.randRed = Math.floor(Math.random() * 255);
        this.randGreen = Math.floor(Math.random() * 255);
        this.randBlue = Math.floor(Math.random() * 255);
    }

    move() {
        //just adds the velocity vector to the position vector each frame

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
        //so inverse tangent doesnt really work when dividing by zero and zero
        //over anything is just 0 so it doesnt matter if the x is negative or positive
        //if y is 0, so this is some edge case handling below

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

        //very proud of this trig im the math goat

        this.direction = Math.atan(this.velocity.y / this.velocity.x);

        if (this.velocity.x < 0) {
            this.direction = this.direction + Math.PI;
        }
    }

    draw() {
        // drawing each part of the body of the rocket

        let body = board.makeRectangle(this.position.x, this.position.y, 50, 12);
        let topWing = board.makePath(this.position.x - 30, this.position.y - 17.5, this.position.x - 25, this.position.y - 6, this.position.x - 5, this.position.y - 6, this.position.x - 30, this.position.y - 17.5, true);
        let botWing = board.makePath(this.position.x - 30, this.position.y + 17.5, this.position.x - 25, this.position.y + 6, this.position.x - 5, this.position.y + 6, this.position.x - 30, this.position.y + 17.5, true);
        
        // coloring each section of the rocket

        body.fill = "rgba(" + this.randRed.toString() + ", " + this.randGreen.toString() + ", " + this.randBlue.toString() + ", 0.5)";
        topWing.fill = "rgba(50, 50, 50, 0.5)";
        botWing.fill = "rgba(50, 50, 50, 0.5)";

        //grouping each part of the body

        this.rocketShip = board.makeGroup(body, topWing, botWing);

        // more styling

        this.rocketShip.linewidth = 1;
        this.rocketShip.miter = 6;
        this.rocketShip.join = "round";
        this.rocketShip.scale = 1;
        this.rocketShip.center();

        //checks for out of bounds and calculates what the rotation of the rocket
        //should be based on x and y vel

        this.checkOutOfBounds();
        this.calcDir();

        //finally, draws the rocket in the correct position with the correct velocity

        this.rocketShip.rotation = this.direction;
        this.rocketShip.translation = this.position;
    }
}

$(document).ready(function() {

    //binding and document setup

    $("#startBtn").click(clickStart);
    $("#rVal").focusout(validateInput);
    $("#mVal").focusout(validateInput);
    document.addEventListener('keyup', unfocusOnEnter);

    //just sets the two.js canvas to be the div i have set up

    board.appendTo(document.getElementById("twoCanvas"));

    initPop();

    // for (let i = 0; i < rocketCount; i++) {
    //     population[i] = new Rocket(Math.floor(Math.random() * 300) + 100, Math.floor(Math.random() * 300) + 100);
    // }

    board.bind('update', function(frameCount) {
        board.clear();

        for (let i = 0; i < rocketCount; i++) {
            population[i].move();
            population[i].draw();
        }
    });

});

//changes text on start button from pause to start
//also might handle getting the value 

function clickStart() {
    updateModifiers();

    if (!board.playing) {
        board.play();
        $("#startBtn").text("Pause");
    } else {
        board.pause();
        $("#startBtn").text("Start");
    }
}

function validateInput() {
    //this is a function that helps make it so that when the
    //input boxes lose focus, their values are changed to something
    //within the bounds of the min and max, so that users cant just
    //put like two billion rockets or two billion percent mutation chance

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

//this is the init function for the population array
//eventually it will also generate random genes and possibly handle crossover and mutation idk

function initPop() {

    updateModifiers();

    for (let i = 0; i < rocketCount; i++) {
        population[i] = new Rocket(Math.floor(Math.random() * 300) + 100, Math.floor(Math.random() * 300) + 100);
    }

}

//this function just handles enabling the user to "enter" values into the box with the enter key

function unfocusOnEnter(event) {
    if( $(".modVal").is(":focus") && event.keyCode === 13) {
        $(".modVal").blur();
    }
}

//updates the values of each simulation modifier (rockets and mutation chance)

function updateModifiers() {
    rocketCount = $("#rVal").val();
    mutationChance = $("#mVal").val();
}