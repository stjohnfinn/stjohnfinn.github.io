const contBtn = document.getElementById("welcomeButton");

contBtn.addEventListener('click', introSlideUp);

function introSlideUp() {
    console.log("introSlideUp");

    anime({
        targets: '#intro',
        translateY: '100%',
        easing: 'easeInOutQuad'
    });
}