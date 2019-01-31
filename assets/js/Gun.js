function Gun () {
    this.x = paddle.x + (paddle.Width/2)
    this.y = paddle.y
    this.Width = 3
    this.Height = 5
    this.Color = "black"
    this.dy = 5

    /*
    1: devo cancellare il proiettile
    0: ignoro, vaga in aria
    */
    this.collisionDetection = function () {
        if (this.y < 0) return 1
        for (i = 0; i < bc.brickArray.length; i++) {
            var brick = bc.brickArray[i]
            if (this.x+this.Width>brick.x && this.x<brick.x+brick.Width && this.y>brick.y && this.y<brick.y+brick.Height) {
                brick.Life--
                if (brick.Life === 0) {
                    bc.brickArray.splice(i,1)
                    bricksDestroyed++
                }
                return 1
            }
        }
        return 0
    }

    this.drawGun = function () {
        ctx.beginPath()
        ctx.rect(this.x,this.y,this.Width,this.Height)
        ctx.stroke()
        ctx.fillStyle = this.Color
        ctx.fill()
        ctx.closePath()
        this.y += -this.dy
    }

}

function GunContainer () {
    this.gunArray = new Array ()

    this.newGun = function () {
        var gun = new Gun ()
        this.gunArray.push(gun)
        gunSound.play()
    }

    this.handleGun = function () {
        for (j = 0; j < this.gunArray.length; j++) {
            this.gunArray[j].drawGun()
            var returnedValue = this.gunArray[j].collisionDetection()
            if ( returnedValue === 1) {
                this.gunArray.splice(j,1)
            }
        }
    }
}