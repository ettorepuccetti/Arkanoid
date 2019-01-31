function Ball () {
    this.x = canvas.width/2
    this.y = canvas.height - 20
    this.maxSpeed = 5
    this.dx = this.maxSpeed*Math.cos(Math.PI/3)
    this.dy = -this.maxSpeed*Math.sin(Math.PI/3)
    this.Radius = 3
    this.Color = "black"
    this.beforeServe = true
    this.standardColor = "black"

    this.drawCircle = function() {
        ctx.beginPath()
        ctx.arc(this.x,this.y, this.Radius,0,Math.PI * 2)
        ctx.stroke()
        ctx.fillStyle = this.Color
        ctx.fill()
        ctx.closePath()
    }

    this.updateCenter = function() {
        if (!this.beforeServe) {
            this.x += this.dx
            this.y += this.dy
        }
    }
}