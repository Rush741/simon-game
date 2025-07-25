var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red","blue","yellow","green"];

var started = false;
var level = 0;
var highScore = 0;

$(document).on("keypress", function() {
    if(!started) {
        $("#level-title").text("Level "+level);
        $("#sub-title").text("(Follow the generated click pattern)");
        nextSequence();
        started = true;
    }
})

$(".btn").on("click", function() {
    var userChoosenColour = $(this).attr("id");
    userClickedPattern.push(userChoosenColour); 

    playSound(userChoosenColour);
    animatePress(userChoosenColour);
    
    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(index) {
    if(gamePattern[index] === userClickedPattern[index]) {

        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);

        }

    }

    else {
        if (level - 1 > highScore) {
            highScore = level - 1;
        }
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("#sub-title").text(`HighScore: ${highScore}`);
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        startOver();

    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;

}

function nextSequence() {
    userClickedPattern=[];

    level++;
    $("#level-title").text("level "+level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChoosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColour);

    animatePress(randomChoosenColour);
    playSound(randomChoosenColour);
}

function playSound(color) {
    var sound = new Audio("./sounds/"+color+".mp3");
    sound.play();
}

function animatePress(currentColour) {
    $("."+currentColour).addClass("pressed");
    setTimeout(function() {
        $("."+currentColour).removeClass("pressed")
    },200)
    
}

