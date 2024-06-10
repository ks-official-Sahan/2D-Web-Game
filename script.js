var keyCode;

function startGame() {
    var startInterface = document.getElementById("startInterface");
    startInterface.style.visibility = "hidden";
    var boy = document.getElementById("boy");
    boy.style.visibility = "visible";
    var score = document.getElementById("score");
    score.style.visibility = "visible";

    for (var i = 0; i < boxLimit; i++) {
        var box = document.getElementById("box" + i);
        box.style.visibility = "visible";
    }

    winSound.pause();
    if (backgroundAnimationId == 0) {
        backgroundAnimationId = setInterval(moveBackground, 100);
    }
    if (boyRunAnimationId == 0) {
        boyRunAnimationId = setInterval(boyRun, 100);
        runSound.play();
    }
    if (boxAnimationId == 0) {
        boxAnimationId = setInterval(moveBoxes, 100);
    }
}


function keyCheck(event) {
    keyCode = event.which;
    // alert(keyCode);

    if (keyCode == 13) { // Enter
        // alert("Enter");

        winSound.pause();
        var startInterface = document.getElementById("startInterface");
        startInterface.style.visibility = "hidden";
        var boy = document.getElementById("boy");
        boy.style.visibility = "visible";
        var score = document.getElementById("score");
        score.style.visibility = "visible";
    
        for (var i = 0; i < boxLimit; i++) {
            var box = document.getElementById("box" + i);
            box.style.visibility = "visible";
        }

        if (backgroundAnimationId == 0) {
            backgroundAnimationId = setInterval(moveBackground, 100);
        }
        if (boyRunAnimationId == 0) {
            boyRunAnimationId = setInterval(boyRun, 100);
            runSound.play();
        }
        if (boxAnimationId == 0) {
            boxAnimationId = setInterval(moveBoxes, 100);
        }
    }

    if (keyCode == 8) { // Backspace
        alert("Backspace");
    }

    if (keyCode == 32) { // Space
        // alert("Space");
        if (boyJumpAnimationId == 0) {
            clearInterval(boyRunAnimationId);
            boyRunImageNumber = 1;
            runSound.pause();
            runSound.currentTime = 0;

            boyJumpAnimationId = setInterval(boyJump, 125);
            jumpSound.play();
        }
    }

    if (keyCode == 16) { // Shift
        // alert("Shift");
    }

    if (key == 48) { //0
        background.style.backgroundImage = "url(Resources/Background1.jpg)"
    }
    if (key == 57) { //9
        background.style.backgroundImage = "url(Resources/Background2.jpg)"
    }

}

var scorePoint = 0;
var backgroundAnimationId = 0;
var backgroundImagePositionX = 0;
var background = document.getElementById("background");
var winScore = 1000;

function moveBackground() {
    // var scoreBox = document.createElement("div");
    // scoreBox.className = "score";
    // scoreBox.id = "score";
    // background.appendChild(scoreBox);
    scorePoint++;
    var score = document.getElementById("score");
    score.innerHTML = scorePoint + " of " + winScore + " to WIN";
    backgroundImagePositionX = backgroundImagePositionX - 20;
    background.style.backgroundPositionX = backgroundImagePositionX + "px";

    if (scorePoint <= (winScore / 2)) {
        background.style.backgroundImage = "url(Resources/Background1.jpg)"
    }
    if (scorePoint > (winScore / 2)) {
        background.style.backgroundImage = "url(Resources/Background2.jpg)"
    }

    if (scorePoint == winScore) {
        winAnimation();
    }
}

var boyRunImageNumber = 0;
var boyRunAnimationId = 0;
var boy = document.getElementById("boy");
var runSound = new Audio("Resources/run.mp3");
runSound.loop = true;

function boyRun() {

    boyRunImageNumber++;

    if (boyRunImageNumber == 9) {
        boyRunImageNumber = 1;
    }

    boy.src = "Resources/Run (" + boyRunImageNumber + ").png";

}

var boyJumpImageNumber = 0;
var boyJumpAnimationId = 0;
var boyMarginTop = 57.5;
var jumpSound = new Audio("Resources/jump.mp3")

function boyJump() {

    boyJumpImageNumber++;

    if (boyJumpImageNumber <= 7) {
        boyMarginTop = boyMarginTop - 3.05;
    }

    if (boyJumpImageNumber >= 8) {
        boyMarginTop = boyMarginTop + 3.05;
    }

    if (boyJumpImageNumber == 13) {
        boyMarginTop = 57.5;
        boyJumpImageNumber = 1;
        clearInterval(boyJumpAnimationId);
        boyJumpAnimationId = 0;
        jumpSound.pause();
        jumpSound.currentTime = 0;

        if (backgroundAnimationId == 0) {
            backgroundAnimationId = setInterval(moveBackground, 100);
        }
        if (boxAnimationId == 0) {
            boxAnimationId = setInterval(moveBoxes, 100);
        }

        boyRunAnimationId = setInterval(boyRun, 100);
        runSound.play();
    }

    boy.style.marginTop = boyMarginTop + "vh";
    boy.src = "Resources/Jump (" + boyJumpImageNumber + ").png";

}

var boyDeadImageNumber = 0;
var boyDeadAnimationId = 0;
var deadSound = new Audio("Resources/dead.mp3");

function boyDead() {

    boyDeadImageNumber++;

    if (boyDeadImageNumber == 10) {
        boyDeadImageNumber = 10;
        clearInterval(boyDeadAnimationId);
        document.getElementById("end").style.visibility = "visible";
        document.getElementById("endscore").innerHTML = scorePoint;
    }

    boy.src = "Resources/Dead (" + boyDeadImageNumber + ").png";

}

var boxMarginLeft = 1200;
var boxLimit = 100;

function createBoxes() {

    for (var i = 0; i < boxLimit; i++) {
        var box = document.createElement("div");
        box.className = "box";
        box.id = "box" + i;
        box.style.marginLeft = boxMarginLeft + "px";
        boxMarginLeft = boxMarginLeft + 1000;
        background.appendChild(box);

    }
}

var boxAnimationId = 0;
var boyDeadAnimationId = 0;

function moveBoxes() {

    for (var i = 0; i < boxLimit; i++) {
        var box = document.getElementById("box" + i);
        var currentBoxMarginLeft = getComputedStyle(box).marginLeft;
        var newBoxMarginLeft = parseInt(currentBoxMarginLeft) - 20;
        box.style.marginLeft = newBoxMarginLeft + "px";

        if (newBoxMarginLeft >= 60 & newBoxMarginLeft <= 160) {

            if (boyMarginTop >= 51) {

                clearInterval(boxAnimationId);
                box.style.backgroundImage = "url()";
                clearInterval(boyRunAnimationId);
                runSound.pause();
                boyRunAnimationId = -1;
                clearInterval(boyJumpAnimationId);
                jumpSound.pause();
                boyJumpAnimationId = -1;
                clearInterval(backgroundAnimationId);

                boyDeadAnimationId = setInterval(boyDead, 100);
                boy.style.marginTop = "57.5vh";
                deadSound.play();

            }

        }
    }

} var winSound = new Audio("Resources/win.mp3");



function winAnimation() {
    var box = document.createElement("div");
    box.id = "winMsgBox";
    box.className = "winMsgBox";
    box.innerHTML = "!! You Won !!";
    background.appendChild(box);
    clearInterval(boyJumpAnimationId);
    winSound.play();
    jumpSound.pause();
    jumpSound.currentTime = 0;
    clearInterval(boxAnimationId);
    clearInterval(boyRunAnimationId);
    runSound.pause();
    runSound.currentTime = 0;
    clearInterval(backgroundAnimationId);
    boy.src = "Resources/Run (1).png";
    boy.style.marginTop = "57.5vh";
}

function startAnimation() {
    var msgbox = document.createElement("div");
    background.appendChild(msgbox);
    msgbox.id = "startMsg";
    msgbox.className = "startMsg";
    msgbox.innerHTML = "Press Enter To Start... (score 500 points to win)"
}

function reload() {
    location.reload();
}
