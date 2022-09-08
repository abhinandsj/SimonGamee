var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;



$(document).keydown(function(event){
    if(!started){

        nextSequence();
        started = true;
    }
});

$("#level-title").click(function(event){
    if(!started){

        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){

    userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    
    animatePress(userChosenColor);
    playSound(userChosenColor);

    if (checkAnswer((userClickedPattern.length) - 1) == true){
        if (userClickedPattern.length === level)
            setTimeout(nextSequence, 1000);
    }
    else{
        level = 0;
        userClickedPattern = [];

        var wrongAnswer = new Audio("wrong.mp3");
        wrongAnswer.play();

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over! Press Here or Any Keys to Restart lol");
        startOver();
    }

    
});



function playSound(colorName){

    var audio = new Audio(colorName +".mp3");
    audio.play();
}

function nextSequence(){
    
    level++;
    userClickedPattern = [];
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() *4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+ randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

    
}

function animatePress(currentColor){

    $("." + currentColor).addClass("pressed");

    setTimeout(function(){
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
         console.log("sucess " + gamePattern[currentLevel] + ", " + userClickedPattern[currentLevel] + ", ["+ gamePattern + "], [" + userClickedPattern + "]");
        return true;
    }
    else{
        console.log("not sucess " + gamePattern[currentLevel] + ", " + userClickedPattern[currentLevel] + ", ["+ gamePattern + "], " + userClickedPattern + "]");
        return false;
    }
}

function startOver(){
    gamePattern = [];
    started = false;
}





