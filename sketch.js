var ball;
var database;
var position;
var positionRef;

function setup(){
    database = firebase.database();
    positionRef = database.ref("ball/position");
    positionRef.on("value", read, error);

    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
}

function read(data){
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
    //console.log(position);
}

function error(){
    console.log("There is an error in database");
}

function draw(){
    background("black");

    if(keyDown(LEFT_ARROW)){
        changePosition(-3,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(3,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-3);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+3);
    }
    drawSprites();

    console.log(positionRef);
}

function changePosition(x,y){
    positionRef.update({
        'x' : position.x + x,
        'y' : position.y + y
    });
    
}
