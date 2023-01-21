
var buttonColours=["red", "blue", "green", "yellow"];

var gamePattern=[];

var userClickedPattern=[];

var level=0;

var flag=false;

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    //console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1); 
    if(!flag){
        nextSequence();
        flag=true;
    }
});

$(document).keypress(function(){
    if(!flag){
        nextSequence();
        flag=true;
    }
});

function checkAnswer(currentLevel){
if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
console.log("true")
if(gamePattern.length === userClickedPattern.length){ 
    setTimeout(function(){
        nextSequence();
    },1000);
}
   
}
else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");    

    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
}
}

function nextSequence(){
    userClickedPattern=[];
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
   
        $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour);
        $("h1").text("Level "+level);
        level++;

    }

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
        audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");   
    
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");    

    },100)
    


}
function startOver(){
level=0;
gamePattern=[];
flag=false;
}