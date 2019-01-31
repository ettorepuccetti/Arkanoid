
function Editor () {

    this.blueRectX = 0
    this.blueRectY = 0
    this.blueRectHeight = 0 
    this.blueRectWidth = 0

    this.drawBoard = function() {
        var padding = bc.OffsetTop
        var sideWidth = new Brick().Width + new Brick().Padding
        var sideHeight = new Brick().Height + new Brick().Padding
        ctx.beginPath()
        for (var x = 0; x <= sideWidth * bc.ColumnCount; x += sideWidth) {
            ctx.moveTo(-0.5 + x + padding, padding);
            ctx.lineTo(-0.5 + x + padding, padding + sideHeight*bc.ColumnCount);
        }


        for (var x = 0; x <= sideHeight * bc.RowCount; x += sideHeight) {
            ctx.moveTo(padding, -0.5 + x + padding);
            ctx.lineTo(padding + sideWidth * bc.RowCount, -0.5 + x + padding);
        }

        ctx.strokeStyle = "grey"
        ctx.stroke()
        ctx.closePath()
    }

    this.addBrick = function (X,Y) {
        if (X<13 && X >= 0 && Y >= 0 && Y<13) {
            var brickX = X*sideWidth + bc.OffsetLeft
            var brickY = Y*sideHeight + bc.OffsetTop
            var b = new Brick()
            b.x = brickX
            b.y = brickY
            b.RowIndex = Y
            bc.brickArray.push(b)
            bc.TotalBricks++
            bc.checkDuplicates()
        }
    }
    
    this.drawBlueRect = function() { 
        if (dragStart) {
            ctx.beginPath()
            ctx.fillStyle = "steelBlue"
            ctx.strokeStyle = "#1E90FF"
            ctx.globalAlpha = 0.2
            ctx.rect(this.blueRectX-0.5, this.blueRectY-0.5, this.blueRectWidth, this.blueRectHeight)
            ctx.fill()
            ctx.globalAlpha = 0.6
            ctx.stroke()
            ctx.globalAlpha = 1.0
            ctx.closePath()
        }
    }

    this.writeIstructions = function () {
        ctx.font = "22px Arial"
        ctx.fillStyle = generalColor
        ctx.fillText("click on a cell to create a single brick", 120, canvas.height/2 + 100)
        ctx.fillText("or drag an area to select multiple cells", 115, canvas.height/2 + 130)
        ctx.font = "16px Arial"
        ctx.fillText("(select again a cell or multiple cells for deleting bricks)", 108, canvas.height/2 +155)
    }
}