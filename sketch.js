var END =0;
var PLAY =1;
var gameState = PLAY;

var path,mainRacer, pink, yellow, red;
var pathImg, mainRacerImg, pinkImg, yellowImg, redImg;
var carCrashSound, song, pinkC, yellowC, redC, pinkCG, yellowCG, redCG;
var distance=0;
var gameOver, obstacle1, obstacle2, obstacle3;
function preload(){
  
  pathImg = loadImage("images/Road.png");
  mainRacerImg = loadImage("blue.png");
  carHorn = loadSound("carhorn.mp3");
  pinkImg = loadImage("pink.png");
  yellowImg = loadImage("yellow.png");
  redImg = loadImage("red.png");
  gameOverImg = loadImage("gameover2.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  carCrashSound = loadSound("carCrash.mp3");
  song = loadSound("bg.mp3");
}

function setup(){
  
createCanvas(displayWidth, displayHeight);
  
// Moving background
path=createSprite(displayWidth/2, displayHeight/2);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy racing
mainRacer  = createSprite(70,150);
mainRacer.addImage(mainRacerImg);
mainRacer.scale=0.2;
mainRacer.setCollider("rectangle", 0, 0, 700, 200);
  
gameOver = createSprite(displayWidth/2, displayHeight/2);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.7;
gameOver.visible = false;
  
song.play();
 pinkCG = new Group();
 yellowCG = new Group();
 redCG = new Group();
 obstaclesG = new Group();
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill("Turquoise ");
  text("Distance: "+ distance,20,30);
  
  camera.position.y = displayHeight/2;
  camera.position.x = mainRacer;
  
  if(gameState===PLAY){
  
   mainRacer.y = World.mouseY;
  
   if(keyDown("space")){
     carHorn.play();
   }
   edges= createEdgeSprites();
   mainRacer.collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
  if(World.frameCount % 150 == 0){
    if(select_oppPlayer == 1){
      pinkRacer();
    }else if(select_oppPlayer == 2){
      yellowRacer();
    }else {
      redRacer();
    }
  }  
    spawnObstacles();
  
   distance = distance+Math.round(getFrameRate()/50);

    path.velocityX = -(6+ 2*distance/100);
    
  if(pinkCG.isTouching(mainRacer)){
     gameState = END;
     pinkC.velocityX = 0;
     carCrashSound.play();
  }
    
  if(yellowCG.isTouching(mainRacer)){
     gameState = END;
     yellowC.velocityX = 0;
     carCrashSound.play();
    }
    
  if(redCG.isTouching(mainRacer)){
     gameState = END;
     redC.velocityX = 0;
     carCrashSound.play();
    }
  if(obstaclesG.isTouching(mainRacer)){
    gameState = END;
    carCrashSound.play();
    obstaclesG.setVelocityXEach(0);
    pinkCG.destroyEach();
    yellowCG.destroyEach();
    redCG.destroyEach();
  }
  }
  if(gameState === END){
    gameOver.visible = true;
    song.stop();
    textSize(20);
    fill("white");
    text("Press Up Arrow to Restart the game!", 20,50);
    
    path.velocityX = 0;
    mainRacer.velocityY = 0;
   
    pinkCG.setVelocityXEach = (0);
    yellowCG.setVelocityXEach = (0);
    redCG.setVelocityXEach = (0);
    obstaclesG.setVelocityXEach(0);
    
    pinkCG.setLifetimeEach(-1);
    yellowCG.setLifetimeEach(-1);
    redCG.setLifetimeEach(-1);
    obstaclesG.setLifetimeEach(-1);
    
    if(keyDown("UP_ARROW")){
      reset();
    }
  }
} 
function reset(){
  gameState = PLAY;
  song.play();
  gameOver.visible = false;
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  obstaclesG.destroyEach();
  distance = 0;
}
 
function spawnObstacles(){
  if(frameCount % 150 === 0){
 var obstacle = createSprite(displayWidth+50, Math.round(random(displayHeight)));
    
  obstacle.velocityX = -(6 + 3*distance/150);
    
 var rand = Math.round(random(1,3));
  switch(rand){
    case 1: obstacle.addImage(obstacle1);
            break;
    case 2: obstacle.addImage(obstacle2);
            break;
    case 3: obstacle.addImage(obstacle3);
            break;
    default: break;
  }
    
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    obstaclesG.add(obstacle);
  }
}

function pinkRacer(){
  pinkC = createSprite(displayWidth+50, Math.round(random(displayHeight)));
  pinkC.scale = 0.3;
  pinkC.setCollider("rectangle", 0, 0, 500, 180);
  pinkC.addImage(pinkImg);
  pinkC.velocityX = -(6 + 2*distance/150);
  pinkC.setLifetime = 170;
  pinkCG.add(pinkC);
}
function yellowRacer(){
  yellowC = createSprite(displayWidth+50, Math.round(random(displayHeight)));
  yellowC.scale = 0.4;
  yellowC.setCollider("rectangle", 0, 10, 400, 100);
  yellowC.addImage(yellowImg);
  yellowC.velocityX = -(6 + 2*distance/150);
  yellowC.setLifetime = 170;
  yellowCG.add(yellowC);
}
function redRacer(){
  redC = createSprite(displayWidth+50, Math.round(random(displayHeight)));
  redC.scale = 0.5;
  redC.addImage(redImg);
  redC.velocityX = -(6 + 2*distance/150);
  redC.setLifetime = 170;
  redCG.add(redC);
}