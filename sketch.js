var bg,bgImg;
var player, shooterImg, shooter_shooting;
var heart1,heart2,heart3, heart1Img,heart2Img,heart3Img
var life=3
var zombie, zombieImg, zombieGroup
var score=0
var bullets=50, bulletImg
var gameState="play"
var loseSound, winSound, explodingSound
var bulletsGroup

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
heart1Img=loadImage("assets/heart_1.png")
  bgImg = loadImage("assets/bg.jpeg")
  heart3Img=loadImage("assets/heart_3.png")
  heart2Img=loadImage("assets/heart_2.png")
  zombieImg=loadImage("assets/zombie.png")
  loseSound=loadSound("assets/lose.mp3")
  winSound=loadSound("assets/win.mp3")
  explodingSound=loadSound("assets/explosion.mp3")
bulletImg=loadImage("assets/bullet.png")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   //player.debug = true
   player.setCollider("rectangle",0,0,300,300)
    
   heart1=createSprite(displayWidth-150,40)
   heart1.visible=false
   heart1.addImage(heart1Img)
 heart1.scale=0.4

 heart2=createSprite(displayWidth-100,40)
   heart2.visible=false
   heart2.addImage(heart2Img)
 heart2.scale=0.4

 heart3=createSprite(displayWidth-150,40)
   
   heart3.addImage(heart3Img)
 heart3.scale=0.4

bulletsGroup=new Group()
zombieGroup= new Group()
}

function draw() {
  background(0)
  if(gameState==="play")
  {
    if(life===3){
      heart3.visible=true
      heart1.visible=false
      heart2.visible=false
    }
    if(life===2){
      heart3.visible=false
      heart1.visible=false
      heart2.visible=true}
      if(life===1){
        heart3.visible=false
        heart1.visible=true
        heart2.visible=false}
        if(life===0){
          gameState="end"
          
        }
        if(score===20){
          gameState="won"
          winSound.play()
        }
        if(bullets===0){
          gameState="bullet"
          loseSound.play()
        }
        
  



  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 bullet=createSprite(displayWidth-1150,player.y-20)
 bullet.velocityX=20
 bullet.scale=0.1
 bullet.addImage(bulletImg)
 bullets=bullets-1
 explodingSound.play()
 bulletsGroup.add(bullet)
 player.depth=bullet.depth
 player.depth=player.depth+2

  player.addImage(shooter_shooting)
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if(zombieGroup.isTouching(bulletsGroup)){


zombieGroup[0].destroy()
bulletsGroup.destroyEach()
explodingSound.play()
score=score+5

}
if(zombieGroup .isTouching(player)){
  loseSound.play()
  life=life-1
  zombieGroup[0].destroy()
}

enemy()
  }

drawSprites();
textSize(20)
fill ("white")
text ("LIVES= "+life,displayWidth-200,displayHeight/2-250)
text ("SCORE= "+score,displayWidth-200,displayHeight/2-220)
text ("AMMO= "+bullets,displayWidth-200,displayHeight/2-280)

if(gameState==="end"){
  player.destroy()
  zombieGroup.destroyEach()
  textSize(100)
  fill("red")
  text("YOU LOST", 400,400)
  
}
else if(gameState==="won"){
  player.destroy()
  zombieGroup.destroyEach()
  textSize(100)
  fill("green")
  text("YOU WON", 400,400)
  
}
if(gameState==="bullet"){
  player.destroy()
  zombieGroup.destroyEach()
  textSize(70)
  fill("yellow")
  text("YOU RAN OUT OF BULLETS", 320,400)
  
}

}
function enemy(){
  if(frameCount%100===0){
    console.log(frameCount)
    zombie=createSprite(random(500,1500), random(100,500))
    zombie.addImage(zombieImg)
    zombie.scale=0.15
    zombie.velocityX=-3
    zombie.lifetime=400
    //zombie.debug=true
    zombie.setCollider("rectangle", 0,0,400,400)
    zombieGroup.add(zombie)
  }
}
