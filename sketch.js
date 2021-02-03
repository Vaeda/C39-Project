var PLAY = 1;
var END =0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var background1, backgroundImage;
var gameOver;
var score = 0;
var survivalTime = 0;

function preload(){
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");  
  obstacleImage = loadImage("obstacle.png");
  backgroundImage = loadImage("jungle.jpg");
}

function setup() {
  createCanvas(displayWidth, displayHeight);

  /*background1 = createSprite(0,0,80,45);
  background1.addImage(backgroundImage);
  background1.scale=1.5;
  background1.x = background1.width/2;
  background1.velocityX = -4;*/
  
  monkey = createSprite(displayWidth/2,displayHeight/2-200,20,50);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.14;
  monkey.velocityX = 2;
  
  ground = createSprite(displayWidth/2, displayHeight/2+140, displayWidth*20, 10);
  ground.x = ground.width/2;
  ground.velocityX = -4;
  console.log(ground.x);

  foodGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() {
  background("white");
  image(backgroundImage, -600, -50, 900, 700);
  image(backgroundImage, 280, -50, 900, 700);
  image(backgroundImage, 1060, -50, 900, 700);
  image(backgroundImage, 1840, -50, 900, 700);
  image(backgroundImage, 2620, -50, 900, 700);
  image(backgroundImage, 3400, -50, 900, 700);

  camera.position.x = monkey.x;
  camera.position.y = monkey.y;

  if(gameState === PLAY){
  
    if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  ground.visible = false;
  
  if (keyDown("space")){
    monkey.velocityY = -12;    
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if (foodGroup.isTouching(monkey)) {
    score = score + 2;
    foodGroup.destroyEach();
  }
    
    switch(score) {
      case 10: monkey.scale = 0.16;
        break;
      case 20: monkey.scale = 0.18;
        break;
      case 30: monkey.scale = 0.20;
        break;
        default: break;
    }
    
  if (obstaclesGroup.isTouching(monkey)) {
    gameState = END;
  }
  }
  if(gameState === END){
    textSize(30);
    fill("red");
    strokeWeight(4);
    text("GAME OVER", monkey.x-100, monkey.y - 200);

    monkey.velocityX = 0;
    monkey.velocityY = 0;
    foodGroup.destroyEach();
    obstaclesGroup.destroyEach();
  }

  monkey.collide(ground);
  
  food();
  obstacles();
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score : " + score, monkey.x+450, monkey.y-300);
  
  stroke("white");
  textSize(20);
  fill("white");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time : " + survivalTime, monkey.x-100, monkey.y-300);
}

function food() {
  if (frameCount % 150 === 0) {
    banana = createSprite(displayWidth*3.5,displayHeight/4+70,40,10);
    banana.y = Math.round(random(displayHeight/4+70,displayHeight/4+100));
    banana.addImage(bananaImage);
    banana.scale = 0.12;
    banana.velocityX = -3;
    banana.lifetime = -1;
    foodGroup.add(banana);
  }
  
}

function obstacles() {
  if (frameCount % 250 === 0) {
    obstacle = createSprite(displayWidth*4,displayHeight/2+120,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -6;
    obstacle.lifetime = -1;
    obstaclesGroup.add(obstacle);
  }
}