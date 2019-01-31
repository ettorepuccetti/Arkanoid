
document.addEventListener("mousemove", mouseMoveHandler , "false")
document.addEventListener("mousedown", mouseDownHandler , "false")
document.addEventListener("mouseup", mouseUpHandler , "false")
document.addEventListener("keyup", keyUpHandler , "false")

//posizione in pixel al momento dell'evento mouse down e up, rispettivamente
    // (sarebbero i nuovi relativeX e relativeY)
var Xdown
var Ydown
var Xup
var Yup

var sideWidth = new Brick().Width + new Brick().Padding
var sideHeight = new Brick().Height + new Brick().Padding

function keyUpHandler(e) {
    
    if (e.keyCode = 8)
        if (bonusHandler.ramboMode) {
            gc.newGun()
        }
}

function mouseMoveHandler(e) {
    if (!mode.editorMode) {
        var relativeX = e.clientX - canvas.offsetLeft
        if(relativeX > paddle.Width/2 && relativeX < canvas.width - (paddle.Width/2)) {
            paddle.x = relativeX - paddle.Width/2
            if (ball.beforeServe) {
                ball.x = relativeX
            }
        }
    } else {
       if (dragStart) {
            var Xmove = e.clientX - canvas.offsetLeft
            var Ymove = e.clientY - canvas.offsetTop
            editor.blueRectWidth = Xmove - Xdown
            editor.blueRectHeight = Ymove - Ydown
        }
    }
}

function mouseUpHandler (e) {
    if (mode.gameStarted) {
        if (mode.editorMode) {
            dragStart = false
            editor.blueRectHeight = 0
            editor.blueRectWidth = 0
            Xup = e.clientX - canvas.offsetLeft
            Yup = e.clientY - canvas.offsetTop
            var XbrickDown = Math.floor((Xdown-bc.OffsetLeft)/sideWidth)
            var YbrickDown = Math.floor((Ydown-bc.OffsetTop)/sideHeight)
            var XbrickUp = Math.floor((Xup-bc.OffsetLeft)/sideWidth)
            var YbrickUp = Math.floor((Yup-bc.OffsetTop)/sideHeight)
            if (XbrickUp < XbrickDown) { //swap
                XbrickUp = [XbrickDown, XbrickDown = XbrickUp][0]
            }
            if (YbrickUp < YbrickDown) { //swap
                YbrickUp = [YbrickDown, YbrickDown = YbrickUp][0]
            }
            for (x=XbrickDown; x<=XbrickUp; x++) {
                for (y=YbrickDown; y<=YbrickUp; y++) {
                    editor.addBrick(x,y)
                }
            }
        }
    }
}

function mouseDownHandler (e) {
    if (mode.gameStarted) {
        if (mode.editorMode) {
            dragStart = true
            Xdown = e.clientX - canvas.offsetLeft
            Ydown = e.clientY - canvas.offsetTop
            editor.blueRectX = Xdown
            editor.blueRectY = Ydown
        } else {
            if (ball.beforeServe) {
                ball.beforeServe = false
            }
        }
    }
}