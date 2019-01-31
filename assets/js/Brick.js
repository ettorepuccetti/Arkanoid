
function Brick () {
    this.x = 0
    this.y = 0
    this.Width = 40
    this.Height = 15
    this.Padding = 2
    this.Life = 3
    this.Color
    this.RowIndex = 0

    this.drawBrick = function() {
        switch (this.RowIndex%3) {
            case 0: switch (this.Life) { 
                case 3: ctx.drawImage(greenBrickFull,this.x,this.y,this.Width,this.Height); break
                case 2: ctx.drawImage(greenBrickHalf,this.x,this.y,this.Width,this.Height); break
                case 1: ctx.drawImage(greenBrickBroken,this.x,this.y,this.Width,this.Height); break
            }; break
            case 1: switch (this.Life) { 
                case 3: ctx.drawImage(yellowBrickFull,this.x,this.y,this.Width,this.Height); break
                case 2: ctx.drawImage(yellowBrickHalf,this.x,this.y,this.Width,this.Height); break
                case 1: ctx.drawImage(yellowBrickBroken,this.x,this.y,this.Width,this.Height); break
            }; break
            case 2: switch (this.Life) { 
                case 3: ctx.drawImage(blueBrickFull,this.x,this.y,this.Width,this.Height); break
                case 2: ctx.drawImage(blueBrickHalf,this.x,this.y,this.Width,this.Height); break
                case 1: ctx.drawImage(blueBrickBroken,this.x,this.y,this.Width,this.Height); break
            }; break
        }        
    }
}


function BricksContainer () {
    this.OffsetTop = 30
    this.OffsetLeft = 30
    this.RowCount = 13
    this.ColumnCount = 13
    this.TotalBricks = 0
    this.brickArray = new Array()
    this.copyBrickArray = new Array()

    this.initializeBricks = function() {
        for(c=0; c<this.ColumnCount; c++) {
            for(r=0; r<this.RowCount - 6; r++) {
                var b = new Brick ()
                b.x = c * (b.Width + b.Padding) + this.OffsetLeft
                b.y = r * (b.Height + b.Padding) + this.OffsetTop
                b.RowIndex = r  
                this.brickArray.push(b)
            }
        }
        this.copyBrickArray = this.copyArray(bc.brickArray)
        this.TotalBricks = this.brickArray.length
    }

    this.checkDuplicates = function() {
        for (i=0;i<this.brickArray.length; i++) {
            for (j=0;j<this.brickArray.length; j++) {
                if (i!==j && this.brickArray[i].x === this.brickArray[j].x && this.brickArray[i].y === this.brickArray[j].y) {
                    this.brickArray.splice(j,1)
                    this.brickArray.splice(i,1)
                    this.TotalBricks = this.TotalBricks - 2
                }
            }
        }
    }
    this.drawBricks = function() {
        for (i=0; i<this.brickArray.length; i++) {
            this.brickArray[i].drawBrick()
        }
    }
    
    //prende come input un array e restituisce una deep copy degli oggetti contenuti 
    this.copyArray = function (arrayToCopy) {
        var arrayToReturn = new Array()
        for (i=0; i<arrayToCopy.length; i++) {
            var copyBrick = new Brick()
            copyBrick.x = arrayToCopy[i].x
            copyBrick.y = arrayToCopy[i].y
            copyBrick.RowIndex = arrayToCopy[i].RowIndex
            arrayToReturn.push(copyBrick)
        }
        return arrayToReturn
    }

    /*   
    0: no collision
    1: collison top or bottom
    2: collison left or right
    3: collision with angle
    4: error
    */
    function collisionDetection(i) {
        var brick = bc.brickArray[i]
        var brickX = brick.x + (brick.Width / 2)
        var brickY = brick.y + (brick.Height / 2)
        var distanceX = Math.abs(ball.x - brickX)
        var distanceY = Math.abs(ball.y - brickY)
        if (distanceX > (brick.Width/2 + ball.Radius)) return 0
        if (distanceY > (brick.Height/2 + ball.Radius)) return 0
        if (distanceX <= brick.Width/2) {bc.brickArray[i].Life--; return 1}
        if (distanceY <= brick.Height/2) {bc.brickArray[i].Life--; return 2}
        var cornerDistance = (distanceX - brick.Width/2)^2 + (distanceY - brick.Height)^2
        if (cornerDistance <= ball.Radius^2) {
            bc.brickArray[i].Life--;
            if (ball.x < brickX && ball.y < brickY) { //angolo alto a sinistra
                if (ball.dx <= 0 && ball.dy <= 0) return 4
                if (ball.dx >= 0 && ball.dy <= 0) return 2 
                if (ball.dx >= 0 && ball.dy >= 0) return 3
                if (ball.dx <= 0 && ball.dy >= 0) return 1
            }
            if (ball.x > brickX && ball.y < brickY) { //angolo alto a destra
                if (ball.dx <= 0 && ball.dy <= 0) return 2
                if (ball.dx >= 0 && ball.dy <= 0) return 4 
                if (ball.dx >= 0 && ball.dy >= 0) return 1
                if (ball.dx <= 0 && ball.dy >= 0) return 3
            }
            if (ball.x > brickX && ball.y > brickY) { //angolo basso a destra
                if (ball.dx <= 0 && ball.dy <= 0) return 3
                if (ball.dx >= 0 && ball.dy <= 0) return 1 
                if (ball.dx >= 0 && ball.dy >= 0) return 4
                if (ball.dx <= 0 && ball.dy >= 0) return 2
            }
            if (ball.x < brickX && ball.y > brickY) { //angolo basso a sinistra
                if (ball.dx <= 0 && ball.dy <= 0) return 1
                if (ball.dx >= 0 && ball.dy <= 0) return 3 
                if (ball.dx >= 0 && ball.dy >= 0) return 2
                if (ball.dx <= 0 && ball.dy >= 0) return 4
            }
        } else return 0
    }

    this.applyCollisions = function () {
        for (i=0; i<bc.brickArray.length; i++) {
            let brick = bc.brickArray[i]
            var collisionResult = collisionDetection(i)
            if (!bonusHandler.armageddonMode) {
                switch (collisionResult) {
                    case 1: ball.dy *= -1; break
                    case 2: ball.dx *= -1; break
                    case 3: ball.dx*= -1; ball.dy*= -1; break
                    case 4: alert("DEBUG MESSAGE: impossibile collision just happened :(")
                }
            }
            if (collisionResult > 0) {
                breakSound.play()
                if (brick.Life == 0) {
                    this.brickArray.splice(i,1)
                    bricksDestroyed++
                }
                break
            }
        }
    }     
}