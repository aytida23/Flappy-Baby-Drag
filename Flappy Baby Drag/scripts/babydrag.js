//get the canvas element
var canvas = document.getElementById("baby");

//get the canvas context using getContext method
var context = canvas.getContext("2d");

//create all of the images variable
var bbdrag = new Image();
var background = new Image();
var frontground = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

//load all of the images directory source
bbdrag.src = "images/babydrag.png";
background.src = "images/bgnew.png";
frontground.src = "images/fgnew.png";
pipeNorth.src = "images/pNorth.png";
pipeSouth.src = "images/pSouth.png";

//initializing some of the variables that is going to be used in the code

//gap between of the both pipeNorth and pipeSouth
var gap = 100;

//the constant that is denoting the y position of pipeSouth
var constant = pipeNorth.height + gap;

//bird x position
var bX = 10;

//bird y position
var bY = 150;

//babydrag's gravity
var gravity = 1.5;

//score of player
var score = 0;

//create all of the sounds variable
var fly = new Audio();
var point = new Audio();

//load of the audio files from the sound directory
fly.src = "sounds/fly.mp3";
point.src = "sounds/score.mp3";

//now if player presses up arrow key in the keyboard the babydrag moves up
document.addEventListener("keydown", moveUp);

//the moveup function
function moveUp(){
    bY -= 28;
    fly.play();
};

//creating a pipe array
var pipe = [];

//pipe coordinates in the pipe's array
pipe[0] = {
    x : canvas.width,
    y : 0
};

//draw all o f the images in the canvas element using draw function
function draw(){
    
    //drawing background image
    context.drawImage(background,0,0);
    
    //for loop to draw all the pipes continuously
    for (var i = 0; i < pipe.length; i++){
        
        //drawing pipeNorth image
        context.drawImage(pipeNorth,pipe[i].x,pipe[i].y,60,260);
        
        //drawing pipeSouth image
        context.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant,60,330);
        
        //decrement the pipe[i].x position to the left
        pipe[i].x--;
        
        //add new pipes to a pipe[] array
        //Math.floor rounds up any integer values to its nearest integer value
        //Math.radom() function just generates random numbers between 0 inclusive to 1 but doesn't include 1 
        if (pipe[i].x == 85){
            pipe.push({
                x : canvas.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            });
        };
        
        //detecting if babydrag hits any of the objects such as pipes and front ground then reload the game
        if ((bX + bbdrag.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width) && (bY <= pipe[i].y + pipeNorth.height || bY + bbdrag.height >= pipe[i].y + constant)|| (bY + bbdrag.height >= canvas.height - frontground.height)){
            //reloads the page if detects any collision with the objects around the baby drag
            location.reload();
        
        };
        
        //player's score condition
        if (pipe[i].x == 5){
            score++;
            point.play();
        };
        
    };
    
    //drawing the frontground image
    context.drawImage(frontground,0,canvas.height - frontground.height);
    
    //drawing the babydrag image
    context.drawImage(bbdrag,bX,bY,50,40);
    
    //babydrag falling down due to gravity
    bY += gravity;
    
    //printing the score to the canvas
    context.fillStyle = "#000";
    context.font = "20px Verdana";
    context.fillText("Score : "+score,10,canvas.height - 20);
    
    //this animation frame will continuously run this draw() function again and again
    requestAnimationFrame(draw);
};

//calling the draw function
draw();