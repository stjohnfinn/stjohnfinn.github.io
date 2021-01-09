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
const PLANET = {
    x: DIV_W - 120,
    y: DIV_H / 2,
    r: 60,
    sides: 14
}
const ASTEROID1 = {
    x: 300,
    y: 100,
    r: 40,
    sides: 8
}
const ASTEROID2 = {
    x: 500,
    y: DIV_H - 150,
    r: 25,
    sides: 6
}
const ASTEROID3 = {
    x: 800,
    y: 200,
    r: 40,
    sides: 5
}

let mutationChance = 0;
let rocketCount = 0;
let population = new Array();
let moves = 10;
let chromosomeCounter = -1;
let startFrame = 0;
let shouldUpdate = false;
let generation = 0;

const rocketStartingPos = {
    x: 50,
    y: DIV_H / 2
} 

let board = new Two({width: DIV_W, height: DIV_H});

//this the class for each individual rocket, it handles drawing the rocket each frame
//and handles the 2d physics for each rocket
//stores its genes and will eventually calculate the fitness as well

class Rocket {
    constructor(startX, startY) {
        this.isAlive = true;
        this.position = new Two.Vector();
        this.direction = 0;
        this.genes = new Array(moves);
        this.velocity = {
            x: 0,
            y: 0
        }

        this.position.x = startX;
        this.position.y = startY;

        //generates random velocities for the rocket

        this.velocity.x = Math.random() * 3 - 1.5;
        this.velocity.y = Math.random() * 3 - 1.5;

        //generates random colors

        this.randRed = Math.floor(Math.random() * 255);
        this.randGreen = Math.floor(Math.random() * 255);
        this.randBlue = Math.floor(Math.random() * 255);
    }

    move() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    checkCollision() {
        if (this.position.x > board.width) {
            this.isAlive = false;
        } if (this.position.x < 0) {
            this.isAlive = false;
        } if (this.position.y > board.height) {
            this.isAlive = false;
        } if (this.position.y < 0) {
            this.isAlive = false;
        }

        if (distance(this.position.x, this.position.y, ASTEROID1.x, ASTEROID1.y) < ASTEROID1.r) {
            this.isAlive = false;
        } if (distance(this.position.x, this.position.y, ASTEROID2.x, ASTEROID2.y) < ASTEROID2.r) {
            this.isAlive = false;
        } if (distance(this.position.x, this.position.y, ASTEROID3.x, ASTEROID3.y) < ASTEROID3.r) {
            this.isAlive = false;
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

        this.checkCollision();

        //finally, draws the rocket in the correct position with the correct velocity

        this.rocketShip.rotation = this.direction;
        this.rocketShip.translation = this.position;
    }

    removeObjects() {
        board.remove(this.body, this.topWing, this.botWing, this.rocketShip);
    }

    calcFitness() {
        let distanceFromPlanet = distance(this.position.x, this.position.y, PLANET.x, PLANET.y);

        if (!this.isAlive) {
            distanceFromPlanet = distanceFromPlanet * 2;
        }

        return distanceFromPlanet;
    }
}

class Obstacles {

    constructor() {}

    draw() {
        this.planet = board.makePolygon(PLANET.x, PLANET.y, PLANET.r, PLANET.sides);
        this.planet.fill = "rgba(150, 150, 150, 0.8)";
        this.planet.scale = 1;
        this.planet.linewidth = 2;
        
        this.core = board.makePolygon(PLANET.x, PLANET.y, PLANET.r / 5, 7);
        this.core.fill = "#ad4913";

        this.asteroid1 = board.makePolygon(ASTEROID1.x, ASTEROID1.y, ASTEROID1.r, ASTEROID1.sides);
        this.asteroid1.fill = "rgba(150, 150, 150, 0.5)";

        this.asteroid2 = board.makePolygon(ASTEROID2.x, ASTEROID2.y, ASTEROID2.r, ASTEROID2.sides);
        this.asteroid2.fill = "rgba(150, 150, 150, 0.5)";

        this.asteroid3 = board.makePolygon(ASTEROID3.x, ASTEROID3.y, ASTEROID3.r, ASTEROID3.sides);
        this.asteroid3.fill = "rgba(150, 150, 150, 0.5)";
    }

    removeObjects() {
        board.remove(this.planet, this.core, this.asteroid1, this.asteroid2, this.asteroid3);
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

    setInterval(updateFramerateGeneCount, MS_BETWEEN_FPS_UPDATE);

    obstacles = new Obstacles();

    board.bind('update', function(frameCount) {

        if (allDead()) {
            initChildren(findParents());
        }

        if ((frameCount - startFrame) % 200 == 0) {
            updateVelocity();
        }

        for (let i = 0; i < rocketCount; i++) {
            population[i].removeObjects();
        }

        obstacles.removeObjects();

        board.clear();

        if (shouldUpdate) {
            drawRockets();
        }

        obstacles.draw();

    });

});

//changes text on start button from pause to start
//also might handle getting the value 

function clickStart() {

    shouldUpdate = true;

    startFrame = board.frameCount;

    $("#startBtn").unbind('click');
    $("#startBtn").text("Disabled");

    updateModifiers();

    initPop();

    disableInput();

    board.play();
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

    for (let i = 0; i < rocketCount; i++) {
        population[i] = new Rocket(rocketStartingPos.x, rocketStartingPos.y);
    }

    for (let i = 0; i < rocketCount; i++) {
        for (let j = 0; j < moves; j++) {
            population[i].genes[j] = new Array(2);
            population[i].genes[j][X_VELOCITY] = Number( (Math.random() * 3 - 1.5).toFixed(2) );
            population[i].genes[j][Y_VELOCITY] = Number( (Math.random() * 3 - 1.5).toFixed(2) );
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

function updateFramerateGeneCount() {
    $("#framerate").text( Math.floor( 1000 / board.timeDelta ) );

    if (board.timeDelta < (1000 / 60)) {
        $("#framerate").css("color", "greenyellow");
    } else {
        $("#framerate").css("color", "rgb(255, 0, 0)");
    }

    $("#genecount").text( chromosomeCounter );
}

//runs every few seconds and changes each rocket's velocity to the next chromosome
//also sets a global variable to false when the rockets should stop being drawn to the canvas, which happens once
//they run through each of their chromosomes

function updateVelocity() {
    if (chromosomeCounter == -1) {
        chromosomeCounter++;
        return;
    }

    if (shouldUpdate) {
        if (chromosomeCounter < moves) {
            for (let i = 0; i < rocketCount; i++) {
                population[i].velocity.x = population[i].genes[chromosomeCounter][X_VELOCITY];
                population[i].velocity.x = population[i].genes[chromosomeCounter][Y_VELOCITY];
            }
            chromosomeCounter++;
        } else {
            killAll();
            shouldUpdate = false;
            chromosomeCounter = -1;
        }
    }
}

function pausePlay() {
    if (!board.playing) {
        board.play();
        $("#startBtn").text("Pause");
    } else {
        board.pause();
        $("#startBtn").text("Start");
    }
}

function disableInput() {
    $("#mVal").prop("disabled", true);
    $("#mVal").css("opacity", "0.5");
    $("#rVal").prop("disabled", true);
    $("#rVal").css("opacity", "0.5");
}

function drawRockets() {
    for (let i = 0; i < rocketCount; i++) {
        if (population[i].isAlive) {
            population[i].move();
            population[i].calcDir();
        }
        population[i].draw();
    }
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt( Math.pow( (x2 - x1), 2) + Math.pow( (y2 - y1), 2 ) );
}

function findParents() {

    board.pause();

    let fitnessArr = new Array(rocketCount);

    console.log("Calculating fitness...");

    for (let i = 0; i < rocketCount; i++) {
        fitnessArr[i] = [population[i].calcFitness(), i];
    }

    let totalFitness = 0

    for (let i = 0; i < rocketCount; i++) {
        totalFitness += population[i].calcFitness();
    }

    console.log("Average Fitness: " + (totalFitness / rocketCount) );

    fitnessArr = insertionSort(fitnessArr);

    fitnessArr = fitnessArr.slice(0, 4);

    console.log("Finished.");
    return fitnessArr;

}

function insertionSort(arr) {
    let length = arr.length;
    for (let i = 1; i < length; i++) {
        let key = arr[i][0];
        let j = i - 1;
        while (j >= 0 && arr[j][0] > key) {
            arr[ j + 1 ][0] = arr[j][0];
            j--;
        }
        arr[ j + 1 ][0] = key;
    }
    return arr;
}

function allDead() {
    for (let i = 0; i < rocketCount; i++) {
        if (population[i].isAlive) {
            return false;
        }
    }

    return true;
}

function killAll() {
    for (let i = 0; i < rocketCount; i++) {
        population[i].isAlive = false;
    }
}

function initChildren(parents) {

    startFrame = board.frameCount;
    generation++;
    console.log("Genration: " + generation);
    console.log("Performing crossover and mutation...");

    //crossover and mutation shit right here baby

    let firstPairIndexA = Math.floor( Math.random() * 4);

    let firstPairIndexB = 0;

    do {
        firstPairIndexB = Math.floor( Math.random() * 4);
    } while (firstPairIndexB === firstPairIndexA);

    let firstPair = new Array()
    let secondPair = new Array()

    for (let i = 0; i < parents.length; i++) {
        if (i === firstPairIndexA || i === firstPairIndexB) {
            firstPair.push(population[parents[i][1]]);
        } else {
            secondPair.push(population[parents[i][1]]);
        }
    }

    let halfIndex = Math.floor( rocketCount / 2 );

    population = createOffspring(firstPair, halfIndex).concat(createOffspring(secondPair, rocketCount - halfIndex));

    board.play();
    shouldUpdate = true;

    console.log("Finished.");
}

function createOffspring(parents, childCount) {
    let children = new Array(childCount);

    for (let i = 0; i < rocketCount; i++) {
        children[i] = new Rocket(rocketStartingPos.x, rocketStartingPos.y);

        let crossoverIndex = Math.floor( Math.random() * moves);

        children[i].genes = ( parents[0].genes.slice(0, crossoverIndex) ).concat( parents[1].genes.slice(crossoverIndex) );

        for (let j = 0; j < children[i].genes.length; j++) {
            if (Math.floor( Math.random() * 100) + 1 < mutationChance) {
                children[i].genes[j][X_VELOCITY] = Number( (Math.random() * 3 - 1.5).toFixed(2) );
                children[i].genes[j][Y_VELOCITY] = Number( (Math.random() * 3 - 1.5).toFixed(2) );
            }
        }
    }
    return children;
}