var buttonColours = ["red", "blue", "green", "yellow"];
var playUrlObject = {
    red: "sounds/red.mp3",
    blue: "sounds/blue.mp3",
    green: "sounds/green.mp3",
    yellow: "sounds/yellow.mp3",
    wrong: "sounds/wrong.mp3"
};
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var index = 0; 

function setRandom(num) {
    var random = Math.random();
    var finelNumber = Math.floor(random * (num + 1)); 
    return finelNumber;
}

function flashBtn(btn) {
    $(btn).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound(url) {
    let audio = new Audio(url);
    audio.play();
}

function animatePress(element) {
    $(element).addClass("pressed");
    setTimeout(function () {
        $(element).removeClass("pressed");
    }, 100);
}

function wrong() { 
    playSound(playUrlObject.wrong);
    $("h1").html(`הגעת לשלב ${level} כל הכבוד !!!`);
    $("body").addClass("game-over"); 
    setTimeout(function () {
        location.reload();
    }, 3000);
}

function checkAnswer(i) {
    if (gamePattern[i] === userClickedPattern[i]) {
        return true;
    } else {
        return false;
    }
}

function nextSequence() {
    userClickedPattern = [];
    index = 0;

    var randomNumber = setRandom(3);
    var randomChosenColour = buttonColours[randomNumber];
    var idBtn = "#" + randomChosenColour;
    playSound(`sounds/${randomChosenColour}.mp3`);
    flashBtn(idBtn);

    gamePattern.push(randomChosenColour);
    level++;
    $("h1").html(`שלב ${level}`); 
}

$(document).on("keydown", function () {
    $("h1").html("Level 0");
    nextSequence();
});

$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id");
    playSound(`sounds/${userChosenColour}.mp3`);
    userClickedPattern.push(userChosenColour);
    animatePress(this);
    
    if (gamePattern.length > 0) {
        if (!checkAnswer(index)) {
            wrong();
        } else {
            index++;
            if (index === gamePattern.length) {
                setTimeout(function () {
                    nextSequence();
                }, 1000);
            }
        }
    }
});


