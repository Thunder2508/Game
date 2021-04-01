var END = 0;
var PLAY = 1;
var gameState = PLAY;

var distance = 0;

var gameOver, gameOverImage, pathImg, path, alive, aliveimg, deadimg, knife, knifeimg;
var star;

function preload(){

  pathImg = loadImage("images/moon567.jpg");
  gameOverImage = loadImage("images/gameOver.png");
  //aliveimg = loadImage("images/alive.png");
  aliveimg = loadImage("images/alladin.gif");
  deadimg = loadImage("images/dead.png");
  knifeimg = loadImage("images/knife.png");
  starimg=loadImage("images/strass.png")

  
}

function setup(){
  
createCanvas(displayWidth-25,displayHeight-180);
  
path = createSprite(0,150);
path.addImage(pathImg);
path.x = path.width/2
path.scale=1.2;

alive  = createSprite(0, 0, 20, 20);
alive.addAnimation("player", aliveimg);
alive.addAnimation("bone", deadimg);
alive.scale = 0.6;
alive.debug=true
alive.setCollider("rectangle",0,0,300,300)


  
KnifeGroup = new Group();
//spawnStars=new Group();

gameOver = createSprite(camera.position.x+570, displayHeight-450);

gameOver.addImage(gameOverImage);

  gameOver.scale = 0.5;
  gameOver.visible = false;
  

}

function draw(){

  background("white");

  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance, camera.position.x,30);
 
  //spawnStars();

  if(gameState===PLAY){
    
    distance = distance + Math.round(getFrameRate()/60);
    
    alive.y = World.mouseY;
   
    camera.position.x = alive.x+500;
   
    path.velocityX = -4;
    
    if(path.x < 0 ){

      path.x = width/2;

    }

    alive.changeAnimation("player", aliveimg);
      
    Knife();

    if(KnifeGroup.isTouching(alive)){

      gameState = END;

    }

  }
    
  else if(gameState === END){

    gameOver.visible = true;

    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", camera.position.x-100,displayHeight-500);
  
    alive.changeAnimation("bone", deadimg);

    path.velocityX = 0

    KnifeGroup.destroyEach();
    
    if(keyDown("UP_ARROW")) {

      reset();

    }

  }

}

function Knife(){
  
  if(World.frameCount % 250 == 0){

    knife = createSprite(displayWidth, random(displayHeight-240, displayHeight-750));
    knife.addImage(knifeimg);

    knife.velocityX = -(10 + distance/100);
    knife.scale = 0.1;
    knife.setLifetime = 220;

    KnifeGroup.add(knife);

  }

}

function reset(){

  gameState = PLAY;
  gameOver.visible = false;
  
  distance = 0;

}

/*function spawnStars() {
  if (frameCount % 60 === 0) {
    star = createSprite(600,100,40,10);
    star.y = Math.round(random(10,60));
    star.addImage(starimg);
    star.scale = 0.5;
    star.velocityX = -3;
    star.lifetime = 134;
    }
}*/
