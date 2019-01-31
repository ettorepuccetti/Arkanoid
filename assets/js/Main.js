//global variables
var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")

var paddleBounceCount = 1
var bricksDestroyed = 0

var leftKeyPressed = false
var rightKeyPressed = false

var dragStart = false
var generalColor = "SteelBlue"

function score () {
    return (3*bricksDestroyed - paddleBounceCount) * 10
}

function checkWin() {
    if (bricksDestroyed === bc.TotalBricks) {
        alert("YOU WIN! \n score: " + score());
        mode.resetGame()
    }
}

//objects initialization
LoadSprite()
var mode = new ModeHandler()
var bc = new BricksContainer()
var ball = new Ball()
var ball2 = new Ball()
ball2.dx = ball2.maxSpeed
var paddle = new Paddle()
var bonusHandler = new BonusHandler()
var life = new Life()
var editor = new Editor()
var gc = new GunContainer()
requestAnimationFrame(draw)