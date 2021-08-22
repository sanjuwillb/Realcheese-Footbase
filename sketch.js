var balloon,balloonImage1,balloonImage2;
var database;
var height;

function preload(){
   bg =loadImage("Images/cityImage.png");
   balloonImage1=loadAnimation("Images/HotAirBallon01.png");
   balloonImage2=loadAnimation("Images/HotAirBallon01.png","Images/HotAirBallon01.png",
   "Images/HotAirBallon01.png","Images/HotAirBallon02.png","Images/HotAirBallon02.png",
   "Images/HotAirBallon02.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png");
  }

//Function to set initial environment
function setup() {

   database=firebase.database();

  createCanvas(1500,700);

  balloon=createSprite(250,650,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);

  reset()
  
  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);
  balloon.scale = 0.5 + (0.001 * balloon.y) 

  if(keyDown(LEFT_ARROW)){
    updateHeightX(-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  if(keyDown(RIGHT_ARROW)){
    updateHeightX(10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  if(keyDown(UP_ARROW)){
    updateHeightY(-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  if(keyDown(DOWN_ARROW)){
    updateHeightY(+10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

//CHOOSE THE CORRECT UPDATEHEIGHT FUNCTION
// function updateHeight(x,y){
//   database.ref('balloon/height').set({
//     'x': height.x ,
//     'y': height.y 
//   })
// }

// function updateHeight(x,y){
//   database.ref('balloon/height')({
//     'x': height.x + x ,
//     'y': height.y + y
//   })
// }
 
 function reset(){
   database.ref('balloon/height').set({
     'x': 200,
     'y': 450
   })
 }

 function updateHeightX(x){
   database.ref('balloon/height').set({
     'x': height.x + x ,
     'y': height.y
   })
 }

 function updateHeightY(y){
   database.ref('balloon/height').set({
     'x': height.x,
     'y': height.y + y
   })
 }

// function updateHeight(x,y){
//   database.ref().set({
//     'x': height.x + x ,
//     'y': height.y + y
//   })
// }




//CHOOSE THE CORRECT READHEIGHT FUNCTION
// function readHeight(data){
//   balloon.x = height.x;
//   balloon.y = height.y;
// }

 function readHeight(data){
   height = data.val();
   balloon.x = height.x;
   balloon.y = height.y;
 }

// function readHeight(data){
//   height = data.val();
// }

// function readHeight(){
//   height = val();
//   balloon.x = height.x;
//   balloon.y = height.y;
// }

function showError(){
  console.log("ERROR cannot divide by derp");
}