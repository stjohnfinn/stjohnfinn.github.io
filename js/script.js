const contBtn = document.getElementById("welcomeButton");

contBtn.addEventListener('click', introSlideUp);

function introSlideUp() {
    console.log("introSlideUp");

    anime({
        targets: '#intro',
        translateY: '-100%',
        easing: 'easeInOutQuad'
    });
}

$(document).ready(function(){
    $("#contactButton").click(function() {
        if($(".contactSlider").hasClass("slideUp")) {
            $(".contactSlider").removeClass("slideUp").addClass("slideDown");
        } else {
            $(".contactSlider").removeClass("slideDown").addClass("slideUp");
        }
    });

    $("#aboutButton").click(function() {
        if($(".aboutSlider").hasClass("slideUp")) {
            $(".aboutSlider").removeClass("slideUp").addClass("slideDown");
        } else {
            $(".aboutSlider").removeClass("slideDown").addClass("slideUp");
        }
    });

    contactSliderUpdate();
    aboutSliderUpdate();
});

function contactSliderUpdate() {
    if($(".contactSlider").hasClass("slideUp")) {
        $(".contactSlider").removeClass("slideUp").addClass("slideDown");
    } else {
        $(".contactSlider").removeClass("slideDown").addClass("slideUp");
    }
}

function aboutSliderUpdate() {
    if($(".aboutSlider").hasClass("slideUp")) {
        $(".aboutSlider").removeClass("slideUp").addClass("slideDown");
    } else {
        $(".aboutSlider").removeClass("slideDown").addClass("slideUp");
    }
}