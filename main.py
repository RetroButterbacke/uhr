name = "AndyOS"
clock = True
menu = False

def anim (h, m, s, speed = 1):
    ak = 64
    gk = 32
    tan = ak / gk
    angle = Math.atan(tan)
    sin = Math.sin(angle)
    hy = sin / gk
    cos = Math.cos(angle)
    time = hy / speed
    basic.pause(time)
    kitronik_VIEW128x64.draw_rect(10, 10, 0, 64)
    kitronik_VIEW128x64.draw_rect(10, 10, 128, 0)




def startClock ():
    oledssd1306.init_display()
    anim(1, 1, 1)