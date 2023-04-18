var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200,300)
  ghost.addImage(ghostImg)
  ghost.scale=0.4
  
  climbersGroup = new Group()
  linesGroup = new Group()
}

function draw() {
  background(200);
  if(gameState==="play"){

  
  spawndoor()
  if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown("space")){
      ghost.velocityY = -10
    }
    ghost.velocityY = ghost.velocityY +0.7
    if(keyDown("left")){
      ghost.x = ghost.x -2
    }
    if(keyDown("right")){
      ghost.x = ghost.x +2
    }

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0
    }

    if(linesGroup.isTouching(ghost)||ghost.y>600){
      gameState = "end"
    }
    drawSprites()
  }
  if(gameState === "end"){
    textSize(20)
    text("Game Over",200,300)
  }
}
function spawndoor(){
  if(frameCount%300===0){
    door = createSprite(200,-50)
    door.velocityY = 1
    door.x = Math.round(random(200,400))
    door.addImage(doorImg)
    climber= createSprite(door.x,0)
    climber.addImage(climberImg)
    climber.velocityY = 1
    ghost.depth=door.depth+1
    climbersGroup.add(climber)
    line = createSprite(door.x,10,climber.width,2)
    line.velocityY = 1
    line.shapeColor ="purple"
    linesGroup.add(line)
  }
}