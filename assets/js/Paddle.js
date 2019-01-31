function Paddle () {
    this.x = (canvas.width - 75) / 2
    this.y = canvas.height - 14
    this.Width = 75
    this.Height = 10
    this.alpha = Math.PI/3

    this.drawPaddle = function() {
        if (leftKeyPressed && this.x > 5) this.x += -5
        if (rightKeyPressed && this.x + this.Width  < canvas.width ) this.x += 5
        if (bonusHandler.armageddonMode)
            ctx.drawImage(orangePaddle, this.x, this.y, this.Width, this.Height)
        else
            if (this.Width > 75) ctx.drawImage(yellowPaddle, this.x, this.y, this.Width, this.Height)
            else 
                if (bonusHandler.ramboMode) ctx.drawImage(blackPaddle, this.x, this.y, this.Width, this.Height)
                else ctx.drawImage(bluePaddle, this.x, this.y, this.Width, this.Height)
    }
    
    this.newDirection = function() {
        var relativeIntersect = (this.x + this.Width/2) - ball.x
        var normalizedIntersect = relativeIntersect / (this.Width/2)
        var bounceAngle = normalizedIntersect * (Math.PI/3) + (Math.PI/2)
        var cos = Math.cos(bounceAngle)
        var sin = Math.sin(bounceAngle)
        this.alpha = bounceAngle
        ball.dx = ball.maxSpeed * cos
        ball.dy = -ball.maxSpeed * sin
        bounceSound.play()
    }
}