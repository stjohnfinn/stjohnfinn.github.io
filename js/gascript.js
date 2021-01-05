const DIV_H = 600;
const DIV_W = 1150;
const ROCKETS_MAX = 20;
const ROCKETS_MIN = 4;
const MUT_MAX = 50;
const MUT_MIN = 2;
const MS_BETWEEN_CHROM = 2000;
const Y_VELOCITY = 1;
const X_VELOCITY = 0;
const MS_BETWEEN_FPS_UPDATE = 150;

let mutationChance = 0;
let rocketCount = 0;
let population = new Array();
let moves = 10;
let chromosomeCounter = 0;
let shouldDraw = true;

const rocketStartingPos = {
    x: 50,
    y: DIV_H / 2
} 

let board = new Two({width: DIV_W, height: DIV_H});

//this the class for each individual rocket, it handles drawing the rocket each frame
//and handles the 2d physics for each rocket
//stores its genes and will eventually calculate the fitness as well

class Rocket {

    moves = new Array(20);
    direction = 0;
    position = new Two.Vector();
    velocity = {
        x: 0,
        y: 0
    }

    genes = new Array(moves);

    constructor(startX, startY) {
        this.position.x = startX;
        this.position.y = startY;

        //generates random velocities for the rocket

        this.velocity.x = Math.random() * 10 - 5;
        this.velocity.y = Math.random() * 10 - 5;

        // this.velocity.x = 0;
        // this.velocity.y = 0;

        //generates random colors

        this.randRed = Math.floor(Math.random() * 255);
        this.randGreen = Math.floor(Math.random() * 255);
        this.randBlue = Math.floor(Math.random() * 255);
    }

    move() {
        //just adds the velocity vector to the position vector each frame

        // this.velocity.x = 0;
        // this.velocity.y = 0;

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

        this.body = board.makeRectangle(this.position.x, this.position.y, 50, 12);
        this.topWing = board.makePath(this.position.x - 30, this.position.y - 17.5, this.position.x - 25, this.position.y - 6, this.position.x - 5, this.position.y - 6, this.position.x - 30, this.position.y - 17.5, true);
        this.botWing = board.makePath(this.position.x - 30, this.position.y + 17.5, this.position.x - 25, this.position.y + 6, this.position.x - 5, this.position.y + 6, this.position.x - 30, this.position.y + 17.5, true);
        
        // coloring each section of the rocket

        this.body.fill = "rgba(" + this.randRed.toString() + ", " + this.randGreen.toString() + ", " + this.randBlue.toString() + ", 0.5)";
        this.topWing.fill = "rgba(50, 50, 50, 0.5)";
        this.botWing.fill = "rgba(50, 50, 50, 0.5)";

        //grouping each part of the body

        this.rocketShip = board.makeGroup(this.body, this.topWing, this.botWing);

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

    removeObjects() {
        board.remove(this.body, this.topWing, this.botWing, this.rocketShip);
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

    setInterval(updateFramerate, MS_BETWEEN_FPS_UPDATE);
    setInterval(updateVelocity, MS_BETWEEN_CHROM);

    initPop();

    board.bind('update', function(frameCount) {
        for (let i = 0; i < rocketCount; i++) {
            population[i].removeObjects();
        }

        board.clear();

        if (shouldDraw) {
            for (let i = 0; i < rocketCount; i++) {
                population[i].move();
                population[i].draw();
            }
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

    if($("#rVal").val() > ROCKETS_MAX) {
        $("#rVal").val(ROCKETS_MAX);
    } if($("#rVal").val() < ROCKETS_MIN) {
        $("#rVal").val(ROCKETS_MIN);
    } if($("#mVal").val() > MUT_MAX) {
        $("#mVal").val(MUT_MAX);
    } if($("#mVal").val() < MUT_MIN) {
        $("#mVal").val(MUT_MIN);
    }
}

//this is the init function for the population array
//eventually it will also generate random genes and possibly handle crossover and mutation idk

function initPop() {

    updateModifiers();

    for (let i = 0; i < rocketCount; i++) {
        population[i] = new Rocket(rocketStartingPos.x, rocketStartingPos.y);
    }

    for (let i = 0; i < rocketCount; i++) {
        for (let j = 0; j < moves; j++) {
            population[i].genes[j] = new Array(2);
            population[i].genes[j][X_VELOCITY] = Math.floor( Math.random() * 10) - 5;
            population[i].genes[j][Y_VELOCITY] = Math.floor( Math.random() * 10) - 5;
        }
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

//updates the framerate counter in the bottom left of the window

function updateFramerate() {
    $("#framerate").text( Math.floor( 1000 / board.timeDelta ) );

    if (board.timeDelta < (1000 / 60)) {
        $("#framerate").css("color", "greenyellow");
    } else {
        $("#framerate").css("color", "rgb(255, 0, 0)");
    }
}

//runs every few seconds and changes each rocket's velocity to the next chromosome
//also sets a global variable to false when the rockets should stop being drawn to the canvas, which happens once
//they run through each of their chromosomes

function updateVelocity() {
    if (shouldDraw) {
        if (chromosomeCounter < moves) {
            for (let i = 0; i < rocketCount; i++) {
                population[i].velocity.x = population[i].genes[chromosomeCounter][X_VELOCITY];
                population[i].velocity.x = population[i].genes[chromosomeCounter][Y_VELOCITY];
            }
        } else {
            shouldDraw = false;
        }
    }

    chromosomeCounter++;
}