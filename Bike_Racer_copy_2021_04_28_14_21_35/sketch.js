var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;
var game_o, gameOver , ops_Img;
var END =0;
var PLAY =1;
var gameState = PLAY;
var  pink_Img1, pink_Img2,yellow_Img1,yellow_Img2,red_Img1,red_Img2 , cycleBell;
var distance=0;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  pink_Img1 = loadAnimation("opponent/opponent1.png","opponent/opponent2.png");
pink_Img2=loadAnimation("opponent/opponent3.png");
  
  yellow_Img1 = loadAnimation("opponent/opponent4.png","opponent/opponent5.png");
  yellow_Img2=loadAnimation("opponent/opponent6.png");
 
  red_Img1 = loadAnimation("opponent/opponent7.png","opponent/opponent8.png");
  red_Img2=loadAnimation("opponent/opponent9.png");
//cycleBell = loadSound("bell.mp3")
game_o= loadImage ("gameOver.png");
ops_Img = loadImage("obstacle/obstacle1.png")
}

function setup(){
  
createCanvas(1000,500);
  
// Moving background
path=createSprite(1000,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  gameOver=createSprite(250,250);
  gameOver.addImage(game_o);
  gameOver.visible = false;
  pinkCG=new Group();
  redCG=new Group();
  yellowCG=new Group();
  opsGroup = new Group();
}

function draw() {
  background(0);
  
   camera.x=mainCyclist.x;
  camera.y=mainCyclist.y;
  if(gameState===PLAY){
  distance = distance  + Math.round(getFrameRate()/50);
  path.velocityX = -(6+2*distance/150) ;
  pinkCyclists.velocityX = -(6+2*distance/150) ; 
  redCyclists.velocityX = -(6+2*distance/150) ; 
  yellowCyclists.velocityX = -(6+2*distance/150) ; 
    
    mainCyclist.y = World.mouseY;
   //edges= createEdgeSprites();
   //mainCyclist .collide(edges);
  
   var opp_Player=Math.round(random(1,3))
   if(World.frameCount % 150 == 0) {
     
     if(opp_Player==1){
      // cycleBell.play();
       pinkCyclists();
     } else if(opp_Player==2){
       yellowCyclists();
     } else if(opp_Player==3){
       redCyclists();
     }
      
   }
   obstacle();
    console.log(opp_Player);
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
    // yellowCyclists();
    //redCyclists();
    // pinkCyclists();

    if(redCG.isTouching(mainCyclist)){
 gameState = END;
}
if(yellowCG.isTouching(mainCyclist)){
  gameState = END;
 }
 if(pinkCG.isTouching(mainCyclist)){
  gameState = END;
 }
 if(opsGroup.isTouching(mainCyclist)){
  gameState = END;
 }
}
 if(gameState===END){
   gameOver.visible = true;
   
  mainCyclist.destroy();
   redCG.setLifetimeEach(0);
   yellowCG.setLifetimeEach(0);
   pinkCG.setLifetimeEach(0);
   path.velocityX = 0;
   pinkCG.VelocetyX=0;
   redCG.velocityX=0;
   yellowCG.velocityX=0;
  opsGroup.VelocetyX=0
 }

  
 drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  }

function pinkCyclists (){
  var player1 = createSprite(500,Math.round(random(50,450)) ,10,10);
  player1.addAnimation("opponent", pink_Img1 );
  player1.scale=0.06;
  player1.velocityX=-6;
  player1.lifetime=190;
  pinkCG.add(player1);
}
function redCyclists (){
 var player2 = createSprite(500,Math.round(random(50,450)) ,10,10); 
 player2.addAnimation("opponent", red_Img1 );
  player2.scale=0.06;
  player2.velocityX=-6;
  player2.lifetime=190;
  redCG.add(player2); 

 } 
  
function yellowCyclists(){
var player3 = createSprite(500,Math.round(random(50,250)) ,10,10); 
 player3.addAnimation("opponent", yellow_Img1 );
  player3.scale=0.06;
  player3.velocityX=-6;
  player3.lifetime=190;
  yellowCG.add(player3);   
  
}  
function obstacle (){
  if(frameCount%240==0){
   var  ops = createSprite (200,-50)
     ops.addImage(ops_Img);
    ops.scale=0.2;
    ops.x = Math.round(random(59,240));
    ops.velocityX=-6;
   
    ops.lifetime = 190;
    
    opsGroup.add(ops);
    
}}





