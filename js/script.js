//import TypeIt from "typeit";

let intro = new TypeIt('#intro', {
    strings: "Hi, I'm Finn.",
    speed: 100,
    lifelike: true,
    cursor: true,
    cursorSpeed: 1000,
    afterComplete: function (step, instance) {
        instance.destroy();
    }
});

intro.go();