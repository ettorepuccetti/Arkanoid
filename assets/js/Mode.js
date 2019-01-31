
function ModeHandler () {

    var menu = document.getElementById("menuMode")
    var play = document.getElementById("playMode")
    var playStd = document.getElementById("playStdMode")
    var edit = document.getElementById("editorMode")

    menu.disabled = true
    play.disabled = true
    playStd.disabled = false
    edit.disabled = false

    this.gameStarted = false
    this.editorMode = true

    this.resetGame = function () { //chiamata quando? gameOver, vittoria e ritorno al menu?
        bc.brickArray = bc.copyArray(bc.copyBrickArray)
        bc.TotalBricks = bc.brickArray.length
        bricksDestroyed = 0
        paddleBounceCount = 0
        life.lives = 2
        ball = new Ball()
        gc = new GunContainer()
        bonusHandler.fallingBonus = false
        paddle.x = (canvas.width-paddle.Width)/2;
        if (bonusHandler.bonus.IsActive) {
            bonusHandler.bonus.deactivatePower()
        }
    }


    this.setPlayMode = function() {
        if (bc.brickArray.length > 0) {
            this.editorMode = false
            bc.copyBrickArray = bc.copyArray(bc.brickArray)
            menu.disabled = false
            edit.disabled = true
            playStd.disabled = true
            play.disabled = true
        } else
            alert("Draw at least one brick to play")
    }

    this.setMenuMode = function() {
        this.gameStarted = false
        this.resetGame()
        bc.brickArray = new Array ()
        bc.copyBrickArray = new Array () 
        bc.TotalBricks = 0
        menu.disabled = true
        play.disabled = true
        edit.disabled = false
        playStd.disabled = false        
    }

    this.setEditorMode = function() {
        this.gameStarted = true
        this.editorMode = true
        menu.disabled = false
        play.disabled = false
        playStd.disabled = true
        edit.disabled = true
    }

    this.setPlayStdMode = function() {
        this.gameStarted = true
        this.editorMode = false
        bc.initializeBricks()
        menu.disabled = false
        edit.disabled = true
        playStd.disabled = true
        play.disabled = true 
    }

}