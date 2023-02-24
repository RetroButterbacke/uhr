let name = "AndyOS"
let clock = true
let menu = false
function anim(h: number, m: number, s: number, speed: number = 1) {
    let ak = 64
    let gk = 32
    let tan = ak / gk
    let angle = Math.atan(tan)
    let sin = Math.sin(angle)
    let hy = sin / gk
    let cos = Math.cos(angle)
    let time = hy / speed
    basic.pause(time)
    kitronik_VIEW128x64.drawRect(10, 10, 0, 64)
    kitronik_VIEW128x64.drawRect(10, 10, 128, 0)
}

function startClock() {
    oledssd1306.initDisplay()
    anim(1, 1, 1)
}

