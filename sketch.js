
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var spaceShip;
var backImg, spacei, rock1Img, rock2Img, laserImg, Ufo, ufo2, bullet;
var ufo,obstaclegroup,shoot,score,laser;
var obstacle;
var END = 3;
var PLAY = 2;
var START = 1;
var Direction = 0.1;
var BEGIN = 0;
var gameState = BEGIN;
var fillForm;
var sButton, dButton,ButtonImg;
var GameTitle;
var shootgroup, lasergroup, leaderboard;
var database;
var backgM, Backbutton;
var blastImg;
var level;
var ufo3, ufo4, back3, backB, bImg;
var obstaclegroupM;
var ball, ballImg, heart, heartImg, dragon, dragon2, dragon3, click, laserSound, bulletSound, clashSound;
var lostImg, resets, resetButton, lostSound, lifes,heartGroup,ballGroup, yesButton, backV, gameImg, backH;
var alien1Img, alien2Img;

function preload(){
  backB = loadImage("assets/back.png");
  backImg = loadImage("assets/backg.jpg");
  back3 = loadImage("assets/back3.jpg");
  spacei = loadImage("assets/fighter2.png");
  rock1Img = loadImage("assets/rock1.png");
  rock2Img = loadImage("assets/rock2.png");
  laserImg = loadImage("assets/laser.png");
  Ufo = loadImage("assets/ufo1.png");
  ufo2 = loadImage("assets/ufo2.png")
  bullet = loadImage("assets/bullet.png");
  ButtonImg = loadImage("assets/start.png");
  tBgI = loadImage("assets/backg2.jpg");
  backgM = loadSound("laai.mp3");
  dragon = loadImage("assets/dragon.png");
  dragon2 = loadImage("assets/dragon2.png");
  dragon3 = loadImage("assets/dragon3.png");
  ballImg = loadImage("assets/red_ball.png");
  heartImg = loadImage("assets/heart.png");
  click = loadSound("button click.mp3");
  laserSound = loadSound("laser.mp3");
  bulletSound = loadSound("bullet.mp3");
  lostImg = loadImage("assets/gameOver.jpg");
  lostSound = loadSound("loat.wav");
  bImg = loadImage("assets/back5.jpg");
  gameImg = loadImage("assets/sButton.png");
  backH = loadImage("assets/back6.jpg");
  alien1Img = loadImage("assets/alien1.png");
  alien2Img = loadImage("assets/alien2.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

 database = firebase.database();
  backgM.play();
  backgM.setVolume(0.6);

  sButton = createSprite(950,450,200,60);
  sButton.addImage("Image",ButtonImg);
  sButton.scale = 0.5;
  sButton.visible = true;

  dButton = createSprite(300,450,50,10);
  dButton.addImage("Image",ButtonImg);
  dButton.scale = 0.55;
  dButton.visible = true;

  spaceShip = createSprite(500,550,50,100);
  spaceShip.addImage("Image",spacei);
  spaceShip.visible = false;

  Backbutton = createSprite(1250,460,50,50);
  Backbutton.addImage("image", backB);
  Backbutton.scale = 0.05;
  Backbutton.visible = false;

  yesButton = createSprite(735,560,100,70);
  yesButton.addImage("image", gameImg);
  yesButton.scale = 0.4;
  yesButton.visible = false;



  GameTitle = new title();
  GameTitle.display();

  fillForm = new Form();

  obstaclegroup = new Group();
  obstaclegroupM = new Group();
  obstaclegroupH = new Group();
  obstaclegroupH2 = new Group();
  lasergroup = new Group();
  shootgroup = new Group();
  heartGroup = new Group();
  ballGroup = new Group();
  score = 0;
  lifes = 3;
}


function draw() 
{
  background( backImg); 
  //Engine.update(engine);
  if (gameState === 0.1){
    background(tBgI);
    //GameTitle.hide();
    Backbutton.visible = true;
    yesButton.visible = false;
    noButton.visible = false;
    spaceShip.visible = false;
    
    if(mousePressedOver(Backbutton)){
      gameState = 0;
      click.play();
      click.setVolume(0.8);
    }
      direction();
    }
    drawSprites();
  
  if(gameState === 0){
    //fillForm.hide();
    GameTitle.display();
    spaceShip.visible = false;
    yesButton.visible = false;
    Backbutton.visible = false;
    sButton.visible = true;
    dButton.visible = true;
    textSize(50);
    fill("white");
    textFont("Bradley Hand ITC");
    text("Do you want to be the great Space Fighter just like the X-Wing?",30,350);

    textSize(35);
    fill("white");
    textFont("Bradley Hand ITC");
    text("Yes!", 915,460);

    textSize(35);
    fill("white");
    textFont("Bradley Hand ITC");
    text("Directions", 230,460);
    
    if(mousePressedOver(sButton)){
      gameState = 1;
      sButton.visible = false;
      dButton.visible = false;
      click.play();
      click.setVolume(2);
    }

    if(mousePressedOver(dButton)){
      sButton.visible = false;
      dButton.visible = false;
      gameState = 0.1;
      click.play();
      click.setVolume(2);
    }
  }
  
  else if(gameState === 1){
    background(bImg);
    yesButton.visible =false;
    Backbutton.visible = false;
    fillForm.display();
   // fillForm.mousepressedfunction1()
    drawSprites();
   if(level==="level1"){
    background(backImg)
     fillForm.hide();
     GameTitle.hide();
     
     textSize(40);
     fill("white");
     textFont("Bradley Hand ITC");
     text("Let's save the UNIVERSE", 450, 30);
     

    if(keyDown("RIGHT_ARROW")){
      spaceShip.x += 5;
    }

    if(spaceShip.x < 55){
       spaceShip.x = 55;
    }
  
    if(keyDown("LEFT_ARROW")){
      spaceShip.x -= 5;
    }
  
    if(spaceShip.x >= windowWidth-55){
      spaceShip.x = windowWidth-55;
   }

    if(keyDown("space")){
      laserBeam();
      laserSound.play();
      laserSound.setVolume(3);
    }
  
    if(keyDown("B")) {
      shooting();
      bulletSound.play();
      bulletSound.setVolume(3);
    }
    spaceShip.visible = true;
    textSize(30);
    fill("white");
    text("Score:"+score,1200,50);

    textSize(30);
    fill("white");
    text("Heart:"+lifes,1200,100);

    
    if(lasergroup.isTouching(obstaclegroup)){
         for(var i=0;i<obstaclegroup.length;i++){
          if(obstaclegroup[i].isTouching(lasergroup)){
            obstaclegroup[i].destroy();
            lasergroup.destroyEach();
            score += 1;
          }
         }
        }
   
      if(shootgroup.isTouching(obstaclegroup)){
       for(var i=0;i<obstaclegroup.length;i++){
         if(obstaclegroup[i].isTouching(shootgroup)){
           obstaclegroup[i].destroy();
          shootgroup.destroyEach();
          score += 1;
         }
       }
     }
      
     redBall();
     if(spaceShip.isTouching(ballGroup)){
          ballGroup.destroyEach();
          lifes -= 1;
         }
       
      life();
      fuel();
      dead();
      metioriods();
      drawSprites();
    
}
else if(level === "level2"){
  background(back3);
  fillForm.hide();
  GameTitle.hide();
  textSize(30);
  fill("white");
  textFont("Bradley Hand ITC");
  text("Let's save the UNIVERSE", 500, 30);
  
 if(keyDown("RIGHT_ARROW")){
   spaceShip.x += 5;
 }

 if(keyDown("LEFT_ARROW")){
   spaceShip.x -= 5;
 }

 if(keyDown("space")){
   laserBeam();
   laserSound.play();
   laserSound.setVolume(3);
 }

 if(keyDown("B")) {
   shooting();
   bulletSound.play();
   bulletSound.setVolume(3);
 }
 spaceShip.visible = true;
 textSize(30);
 fill("white");
 text("Score:"+score,1200,50);

 textSize(30);
 fill("white");
 text("Heart:"+lifes,1200,100);

 
   if(obstaclegroupM.isTouching(lasergroup)){
  
     for(var i =0;i<obstaclegroupM.length;i++){
       if(obstaclegroupM[i].isTouching(lasergroup))
      obstaclegroupM[i].destroy();
      lasergroup.destroyEach();
      score += 2;
     } 
    }

   if(shootgroup.isTouching(obstaclegroupM)){
    for(var i = 0;i<obstaclegroupM.length;i++){
      if(obstaclegroupM[i].isTouching(shootgroup)){
        obstaclegroupM[i].destroy();
       shootgroup.destroyEach();
       score += 1;
      }
    }
  }

  metioriodsM();
  
  if(spaceShip.isTouching(obstaclegroupM)){
    for(var i = 0;i<obstaclegroupM.length;i++){
      if(obstaclegroupM[i].isTouching(spaceShip)){
        obstaclegroupM[i].destroy();
       lifes-=1;
      }
   }
    dead();
    life();
    fuel();
    drawSprites();
    
}
else if(level==="level3"){
  background(backH);
  fillForm.hide();
  GameTitle.hide();
  
  textSize(30);
  fill("white");
  textFont("Bradley Hand ITC");
  text("Let's save the UNIVERSE", 20, 20);
  

 if(keyDown("RIGHT_ARROW")){
   spaceShip.x += 5;
 }

 if(keyDown("LEFT_ARROW")){
   spaceShip.x -= 5;
 }

 if(keyDown("space")){
   laserBeam();
   laserSound.play();
   laserSound.setVolume(3);
 }

 if(keyDown("B")) {
   shooting();
   bulletSound.play();
   bulletSound.setVolume(3);
 }
 spaceShip.visible = true;
 textSize(30);
 fill("white");
 text("Score:"+score,1200,50);

 textSize(30);
 fill("white");
 text("Heart:"+lifes,1200,100);
 metioriodsH();
 
   if(obstaclegroupH.isTouching(lasergroup)){
  
     for(var i =0;i<obstaclegroupH.length;i++){
       if(obstaclegroupH[i].isTouching(lasergroup))
      obstaclegroupH[i].destroy();
      lasergroup.destroyEach();
      score += 1;
     } 
    }

   if(shootgroup.isTouching(obstaclegroupH)){
    for(var i = 0;i<obstaclegroupH.length;i++){
      if(obstaclegroupH[i].isTouching(shootgroup)){
        obstaclegroupH[i].destroy();
       shootgroup.destroyEach();
       score += 1;
      }
    }
  }

  if(spaceShip.isTouching(obstaclegroupH)){
    for(var i = 0;i<obstaclegroupH.length;i++){
      if(obstaclegroupH[i].isTouching(spaceShip)){
        obstaclegroupH[i].destroy();
        lifes-=1;
      }
    }
   }

    drawSprites();
 

 
}
  }else if(gameState === 3){
     background(lostImg);
    lostSound.play();
    lostSound.setVolume(4);
    yesButton.visible = true;
    if(mousePressedOver(yesButton)){
      window.location.reload();
    }
    
    drawSprites();
} 


}

function laserBeam(){
  laser = createSprite(200, 200, 50,100);
  lasergroup.add(laser);
  laser.addImage(laserImg);
  laser.scale = 0.2
  laser.x = spaceShip.x;
  laser.y = spaceShip.y;
  laser.velocityY -= 5;
  laser.lifeTime = 900;
  lasergroup.add(laser);
}


function shooting(){
  shoot = createSprite(200, 300, 100, 50);
  shootgroup.add(shoot);
  shoot.addImage(bullet);
  shoot.scale = 0.2;
  shoot.x = spaceShip.x;
  shoot.y = spaceShip.y;
  shoot.velocityY -= 5;
  shoot.lifeTime = 1000;
  shootgroup.add(shoot);
}



function metioriods(){
  if(frameCount %50 === 0){
    obstacle = createSprite(150, 150, 50, 50);
    obstaclegroup.add(obstacle);
    obstacle.y = Math.round(random(50, 250));
   //  obstacle.x = Math.round(random(150, 750));
    obstaclegroup.setVelocityXEach(4);
    obstacle.lifetime = 275;
    
    //obstaclegroup.add(obstacle);

  var rand = Math.round(random(0,3));
  //console.log(rand)
 if(rand === 0){
    
     obstacle.addImage(Ufo);
     obstacle.scale = 0.4;
   
  }
  else if(rand === 1){
     obstacle.addImage(ufo2);
     obstacle.scale = 0.4;
   
  }
   else if(rand === 2){
    obstacle.addImage(rock1Img);
    obstacle.scale = 0.4;
    
  } 
  else if(rand === 3){
    obstacle.addImage(rock2Img);
    obstacle.scale = 0.3;
    
  }
  
  }
  
}

function metioriodsM(){
  if(frameCount %30 === 0){
    var obstacleM = createSprite(150, 100, 50, 50);
    obstaclegroupM.add(obstacleM);
    obstacleM.x = Math.round(random(250, 1000));
    obstaclegroupM.setVelocityYEach(10);
    obstacleM.lifetime = 130;
    
  var rand = Math.round(random(0,2));
  //console.log(rand)
  if(rand === 0){
    obstacleM.addImage(dragon3);
    obstacleM.scale = 0.4;
    
  }
  else if(rand === 1){
    obstacleM.addImage(dragon);
    obstacleM.scale = 0.3;
  }
  else if(rand === 2){
    obstacleM.addImage(dragon2);
    obstacleM.scale = 0.8;
  }
  }
  
}

function metioriodsH(){
  if(frameCount %10 === 0){
   var obstacleH = createSprite(150, 150, 50, 50);
    obstaclegroupH.add(obstacleH);
    obstacleH.x = Math.round(random(250, 1000));
    obstaclegroupH.setVelocityYEach(15);
    obstacleH.lifetime = 130;
    
   // obstaclegroupH.add(obstacleH);

  var rand = Math.round(random(0,1));
  //console.log(rand)
  if(rand === 0){
    obstacleH.addImage(alien1Img);
    obstacleH.scale = 0.25;
    
  }
  else if(rand === 1){
    obstacleH.addImage(alien2Img);
    obstacleH.scale = 0.3;
    
  }
  
  }
  
}


function direction(){
  textSize(30);
  fill("white");
  text("*press the left arrow to move left ", 200,100);
  text("*press the right arrow to move right",200,150);
  text("*press the B for the bullets",200,200);
  text("*press the space for the laser",200,250);
  text("*be careful from the metioriods and ufos to survive",200,300);
  text("*before the life gets over collect them",200,350);
  text("*whenever you shoot or kill or destroy any ufo or metiorids your score gets increased ",200,400);
  text("to 1",210,430);
  
}

function redBall(){
  if(frameCount %100 === 0){
  ball = createSprite(0,250,20,20);
  ball.addImage("image", ballImg);
  ball.x = Math.round(random(250,750));
  ball.scale = 0.04;
  ball.velocityY = 5;
  ball.lifeTime = 90;
  ballGroup.add(ball);
  }
}

function life(){
  if(frameCount %150 === 0){
  heart = createSprite(0,250,20,20);
  heart.addImage("image", heartImg);
  heart.x = Math.round(random(250,750));
  heart.scale = 0.2;
  heart.velocityY = 6;
  heart.lifeTime = 90;
  heartGroup.add(heart);
  }
}

function dead(){
  if(lifes === 0){
    fillForm.hide();
    spaceShip.visible = false;
    gameState = 3;
  }
}

function reset(){
 resetButton = createSprite(1550,1550,50,50);
 resetButton.scale = 0.3;
 resetButton.addImage("image",resets);
 if(mousePressedOver(resetButton)){
  gameState = 0;
 }
}
  
  function fuel(){
    if(spaceShip.isTouching(heartGroup)){
      heartGroup.destroyEach();
      lifes += 1;
    }
  }
}