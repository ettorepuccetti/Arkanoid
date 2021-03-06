var greenBrickFull = new Image()
var greenBrickHalf = new Image()
var greenBrickBroken = new Image()
var yellowBrickFull = new Image()
var yellowBrickHalf = new Image()
var yellowBrickBroken = new Image
var blueBrickFull = new Image()
var blueBrickHalf = new Image()
var blueBrickBroken = new Image()
var Background = new Image() 
var bluePaddle = new Image()
var orangePaddle = new Image()
var yellowPaddle = new Image()
var blackPaddle = new Image()
var yellowStar = new Image()
var redStar = new Image()
var blackStar = new Image()
var breakSound = document.getElementById("break")
breakSound.volume = 0.5
var bounceSound = document.getElementById("bounce")
var bonusSound = document.getElementById("bonus")
var gunSound = document.getElementById("gun")

function LoadSprite() {
    greenBrickFull.src = "assets/Sprites/Bricks/brick_green_small.png"
    greenBrickHalf.src = "assets/Sprites/Bricks/brick_green_small_cracked.png"
    greenBrickBroken.src = "assets/Sprites/Bricks/brick_green_small_very_cracked.png"
    yellowBrickFull.src = "assets/Sprites/Bricks/brick_yellow_small.png"  
    yellowBrickHalf.src = "assets/Sprites/Bricks/brick_yellow_small_cracked.png"
    yellowBrickBroken.src = "assets/Sprites/Bricks/brick_yellow_small_very_cracked.png"
    blueBrickFull.src = "assets/Sprites/Bricks/brick_blue_small.png"
    blueBrickHalf.src = "assets/Sprites/Bricks/brick_blue_small_cracked.png"
    blueBrickBroken.src = "assets/Sprites/Bricks/brick_blue_small_very_cracked.png"
    Background.src = "assets/Sprites/background.jpg"
    bluePaddle.src = "assets/Sprites/bat_blue.png"
    orangePaddle.src = "assets/Sprites/bat_orange.png"
    yellowPaddle.src = "assets/Sprites/bat_yellow.png"
    blackPaddle.src = "assets/Sprites/bat_black.png"    
    yellowStar.src = "assets/Sprites/yellowStar.png"
    redStar.src = "assets/Sprites/redStar.png"
    blackStar.src = "assets/Sprites/blackStar.png"
}