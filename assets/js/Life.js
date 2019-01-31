function Life () {
    this.lives = 2

    this.drawLives = function () {
        ctx.font = "16px Arial"
        ctx.fillStyle = generalColor
        ctx.fillText("Lives: " + this.lives, canvas.width-65, 20)
        ctx.fillText("Bricks destroyed: " + bricksDestroyed, 20, 20)
        ctx.fillText("Bounces on paddle: " + paddleBounceCount, canvas.width/2 -30, 20)
    }

    this.manageLives = function () {
        this.lives--
        if (this.lives < 0) {
            alert("GAME OVER \n score: " + score());
            mode.resetGame()
        } else {
            ball = new Ball()
            paddle.x = (canvas.width-paddle.Width)/2;
            bonusHandler.fallingBonus = false
            if (bonusHandler.bonus.IsActive) {
                bonusHandler.bonus.deactivatePower()
            }
        }
    }
}