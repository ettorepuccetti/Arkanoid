function wallsPaddleBounce() {
    if (ball.x+ball.dx < ball.Radius || ball.x+ball.dx > canvas.width - ball.Radius) {
        ball.dx *= -1
    }
    if (ball.y+ball.dy < ball.Radius) {
        ball.dy *= -1
    }
    var bounceOnPaddle = ball.x - ball.Radius < paddle.x + paddle.Width && ball.x + ball.Radius > paddle.x
    if (ball.y+ball.dy+ball.Radius >= canvas.height -10 && bounceOnPaddle) {
        paddle.newDirection()
        paddleBounceCount++
        bonusHandler.CheckAndInitialize()
        bonusHandler.CheckDuration()
    }
    if (ball.y+ball.dy+ball.Radius >= canvas.height -10) {
            life.manageLives()
    }
}

function initialAnimation() {
    ctx.font = "32px Arial"
    ctx.fillStyle = generalColor
    ctx.fillText("Please Make your choice below", 90, canvas.height/2 - 30)
    ctx.font = "Bold 22px Arial"
    ctx.fillText("Play Standard >", 90, canvas.height/2 + 20)
    ctx.font = "22px Arial"
    ctx.fillText("if you want to play immediately", 260, canvas.height/2 + 20)
    ctx.font = "Bold 22px Arial"
    ctx.fillText("Edit >", 90, canvas.height/2 + 50)
    ctx.font = "22px Arial"
    ctx.fillText(" if you want to create your level", 180, canvas.height/2 + 50)
    ball2.beforeServe = false
    ball2.drawCircle()
    ball2.updateCenter()
    if (ball2.x < 0 || ball2.x > canvas.width) {
        ball2.dx *= -1
    }
    if (ball2.y < 0 || ball2.y > canvas.height) {
        ball2.dy *= -1
    }
}

function draw () {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.drawImage(Background,0,0,canvas.width,canvas.height)
    if (mode.gameStarted) {
        if (!mode.editorMode) {
            paddle.drawPaddle()
            ball.drawCircle()
            life.drawLives()
            checkWin()
            gc.handleGun()
            bc.applyCollisions()
            bc.drawBricks()
            wallsPaddleBounce()
            ball.updateCenter()
            bonusHandler.HandleBonus()       
        } else {
            editor.drawBoard()
            bc.drawBricks()
            editor.drawBlueRect()
            editor.writeIstructions()
        }
    } else {
        initialAnimation()
    }
    requestAnimationFrame(draw)
}