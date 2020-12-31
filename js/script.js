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
    $("#contactDiv").hide();
    $("#aboutDiv").hide();

    $("#contactButton").click(function() {
        $("#contactDiv").slideToggle("slow");
    })

    $("#aboutButton").click(function() {
        $("#aboutDiv").slideToggle("slow");
    })
});