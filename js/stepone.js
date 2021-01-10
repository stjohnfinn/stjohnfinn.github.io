$(document).ready(function(){

    $("#hint3").css("visibility", "none");
    $("#hint2").css("visibility", "none");
    $("#hint1").css("visibility", "none");

    $("#hint3btn").click(function() {
        if($("#hint3").hasClass("slideUp")) {
            $("#hint3").removeClass("slideUp").addClass("slideDown");
        } else {
            $("#hint3").removeClass("slideDown").addClass("slideUp");
        }
    });


    $("#hint1btn").click(function() {
        if($("#hint1").hasClass("slideUp")) {
            $("#hint1").removeClass("slideUp").addClass("slideDown");
        } else {
            $("#hint1").removeClass("slideDown").addClass("slideUp");
        }
    });

    $("#hint2btn").click(function() {
        if($("#hint2").hasClass("slideUp")) {
            $("#hint2").removeClass("slideUp").addClass("slideDown");
        } else {
            $("#hint2").removeClass("slideDown").addClass("slideUp");
        }
    });

    hint1Update();
    hint2Update();
    hint3Update();
});

function hint1Update() {
    if($("#hint1").hasClass("slideUp")) {
        $("#hint1").removeClass("slideUp").addClass("slideDown");
    } else {
        $("#hint1").removeClass("slideDown").addClass("slideUp");
    }
}

function hint2Update() {
    if($("#hint2").hasClass("slideUp")) {
        $("#hint2").removeClass("slideUp").addClass("slideDown");
    } else {
        $("#hint2").removeClass("slideDown").addClass("slideUp");
    }
}

function hint3Update() {
    if($("#hint3").hasClass("slideUp")) {
        $("#hint3").removeClass("slideUp").addClass("slideDown");
    } else {
        $("#hint3").removeClass("slideDown").addClass("slideUp");
    }
}