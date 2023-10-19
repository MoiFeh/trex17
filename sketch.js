var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var jumpSound, dieSound, checkPointSound;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameover1 = loadImage("gameOver.png");
  restar1 = loadImage("restart.png");

  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;

  gameover = createSprite(200,50, 50, 50);
  gameover.addImage("gameover", gameover1)
  gameover.scale = 2;

  restart = createSprite(200,80,0,0);
  restart.addImage("restat",restar1);
  restart.scale = 0.5;

  gameover.visible= false;
  restart.visible= false;
 
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //crie Grupos de Obstáculos e Nuvens
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  
  
  score = 0;

  trex.setCollider("rectangle" ,0,0, 40, trex.height)
 // trex.debug= false;
}

function draw() {
  background(180);
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){
    //mover o solo
    ground.velocityX = -4;
    score = score + Math.round(frameCount/60);
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
      }
    
      if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -13;
        jumpSound.play();
      }
      spawnClouds();
      spawnObstacles();
    
      if(obstaclesGroup.isTouching(trex)){
       
       
       
         gameState = END;
        dieSound.play();
      }
  }
  else if(gameState === END){
    //parar o solo
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    trex.changeAnimation("collided" , trex_collided);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    gameover.visible= true;
    restart.visible= true;
  }
  
  trex.velocityY = trex.velocityY + 0.8  
  trex.collide(invisibleGround);
   
  if (mousePressedOver(restar1)){
  reset();
  }

  drawSprites();
}

function reset(){
  gameState = play;
  gameover1.visible = false;
  restar1.visible = false;

  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();

  trex.changeAnimation("running", trex_running);
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -(4 + score/100);

    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
            
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   obstaclesGroup.add(obstacle);
 }
}


function spawnClouds() {
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifetime = 134;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
   cloudsGroup.add(cloud);
  }
  
}
