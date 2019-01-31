function GenericBonus () {
    this.x = canvas.width/2
    this.y = 80
    this.Radius = 10
    this.IsActive = false

    this.collisionDetected = function () {
        if ( this.x + this.Radius > paddle.x && this.x - this.Radius < paddle.x + paddle.Width )
            return true
        else 
            return false
    }  
}

function LongerPaddleBonus () {
    
    this.Duration = 4

    this.Draw = function() {
        this.y += 2
        ctx.drawImage(yellowStar,this.x - (this.Radius), this.y - (this.Radius), this.Radius*2, this.Radius*2)
    }
    this.activatePower = function () {
        paddle.Width += 30
        paddle.x += -30/2
        this.IsActive = true

    }
    this.deactivatePower = function() {
        paddle.Width += -30
        this.IsActive = false
    }
}


function ArmageddonBonus () {
    
    this.Duration = 3
    
    this.Draw = function() {
        this.y += 2
        ctx.drawImage(redStar,this.x - (this.Radius), this.y - (this.Radius), this.Radius*2, this.Radius*2)
    }
    this.activatePower = function () {
        bonusHandler.armageddonMode = true
        this.IsActive = true
        ball.Color = "red"
        ball.Radius = 4
    }
    this.deactivatePower = function() {
        bonusHandler.armageddonMode = false
        this.IsActive = false
        ball.Color = ball.standardColor
        ball.Radius = 3
    }
}

function RamboBonus () {
    
    this.Duration = 5

    this.Draw = function() {
        this.y += 2
        ctx.drawImage(blackStar,this.x - (this.Radius), this.y - (this.Radius), this.Radius*2, this.Radius*2)
    }
    this.activatePower = function () {
        bonusHandler.ramboMode = true
        this.IsActive = true
        gc = new GunContainer ()
        document.getElementById("istructionLine").style.visibility = 'visible'
    }
    this.deactivatePower = function() {
        bonusHandler.ramboMode = false
        this.IsActive = false
        document.getElementById("istructionLine").style.visibility = 'hidden'
    }
}



function BonusHandler() {   
    var roundRobinBonus = 1
    this.armageddonMode = false
    this.ramboMode = false
    this.fallingBonus = false           
    this.bonus = new GenericBonus()

    this.CheckDuration = function() {
        if (this.bonus.IsActive) {
            this.bonus.Duration--
            if (this.bonus.Duration == 0) {
                this.bonus.deactivatePower()
            }
        }
    }

    this.CheckAndInitialize = function() {
        if (paddleBounceCount % 8 === 0) {
            roundRobinBonus++
            switch (/*Math.round((Math.random()*10))%3*/roundRobinBonus % 3) {
                case 0: {
                    LongerPaddleBonus.prototype = new GenericBonus()
                    this.bonus = new LongerPaddleBonus()
                    this.bonus.x = (Math.random()*500) + 50
                    this.fallingBonus = true
                    break
                }
                case 1: {
                    ArmageddonBonus.prototype = new GenericBonus()
                    this.bonus = new ArmageddonBonus()
                    this.bonus.x = (Math.random()*500) + 50
                    this.fallingBonus = true
                    break
                }
                case 2: {
                    RamboBonus.prototype = new GenericBonus()
                    this.bonus = new RamboBonus()
                    this.bonus.x = (Math.random()*500) + 50
                    this.fallingBonus = true
                }
            }
            
        }
    }

    this.HandleBonus = function () { //eseguita a ogni redraw
        if (this.fallingBonus) {
            this.bonus.Draw()
            if (this.bonus.y+this.bonus.Radius >= paddle.y && this.bonus.y-this.bonus.Radius < paddle.y + paddle.Height) {
                if (this.bonus.collisionDetected()) {
                    this.fallingBonus = false
                    this.bonus.activatePower()
                    bonusSound.play()
                }  
            }
            if (this.bonus.y - this.bonus.Radius >= paddle.y + paddle.Height) {
                this.fallingBonus = false
            }
        }
    }
}