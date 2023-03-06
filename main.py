name = "CalliopeClock"
clock = True
menu = False
timeMenu = False
twelvehours = False
twelve = True
timerMenu = False
timer = False
blink = False
cursor_line = 0
selected = 0
rect1y = 0
rect1x = 0
rect2x = 64
rect2y = 128
h = 0
m = 0
s = 0
th = 0
tm = 0


#First
def startClock():
    oledssd1306.init_display()
    oledssd1306.set_text_xy(48, 32)
    oledssd1306.write_string(name)
    basic.pause(2000)
    anim()

#Second
def anim(speed: number = 1):
    ak = 64
    gk = 32
    tan = ak / gk
    angle = Math.atan(tan)
    sin = Math.sin(angle)
    hy = gk / sin
    cos = Math.cos(angle)
    time = hy * speed
    kitronik_VIEW128x64.draw_rect(10, 10, 0, 64)
    kitronik_VIEW128x64.draw_rect(10, 10, 128, 0)
    while rect1x != rect2x:
        oledssd1306.clear_display()
        rect1x + cos * 2
        rect2x - cos * 2
        rect1y - in
        rect2y + sin
        kitronik_VIEW128x64.draw_rect(10, 10, rect1x, rect1y)
        kitronik_VIEW128x64.draw_rect(10, 10, rect2x, rect2y)
        basic.pause(time)
    if rect1x == rect2x:
        startTimer()

#Third
def startTimer():
    while True:
        oledssd1306.clear_display()
        s + 1
        if s == 60:
            s = 0
            m + 1
        if m == 60:
            m = 0
            h + 1

        if twelvehours:
            if twelve:
                if (h > 12):
                    h = 1
        elif (twelvehours == False):
            if (h == 24):
                h = 0
        
        def on_button_event_a():
            if (clock):
                clock = False
                menu = True
            if menu:
                clock = True
                menu = False
            pass
        input.on_button_event(Button.AB, input.button_event_click(), on_button_event_a)
        if clock:
            draw()
        elif menu:
            open_menu()
        elif timeMenu:
            openTimeMenu()
        elif timerMenu:
            openTimerMenu()    
        if timer:
            if (th == h):
                if (tm == m):
                    for i in range(1, 10):
                        music.play_tone(Note.C, music.beat())
                        Timer = False
        basic.pause(1000)

def draw():
    dot = True
    if dot:
        kitronik_VIEW128x64.draw_rect(10, 10, rect1x, rect1y)
        kitronik_VIEW128x64.draw_rect(10, 10, rect2x, rect2y)
    if h < 10:
        kitronik_VIEW128x64.drawnum(h, rect1x - 2)
    else:
        kitronik_VIEW128x64.drawnum(h, rect1x - 4)
    kitronik_VIEW128x64.drawnum(m, rect1x + 2)

#Fourth
def open_menu():
    oledssd1306.set_text_xy(50, 4)
    oledssd1306.write_string("Settings")
    oledssd1306.set_text_xy(5, 12)
    if (cursor_line == 0):
        oledssd1306.write_string("| Set time")
    else:
        oledssd1306.write_string("Set time")    
    oledssd1306.set_text_xy(5, 20)
    if (cursor_line == 1):
        oledssd1306.write_string("| 12/24 hours")
    else:
        oledssd1306.write_string("12/24 hours")
    oledssd1306.set_text_xy(5, 28)
    if (cursor_line == 2):
        oledssd1306.write_string("| Set timer")
    else:
        oledssd1306.write_string("Set timer")
    def on_button_event_a():
        cursor_line + 1
        if (cursor_line > 2):
            cursor_line = 0
        pass
    input.on_button_event(Button.A, input.button_event_click(), on_button_event_a)
    def on_button_event_b():
        if (cursor_line == 0):
            menu = False
            timeMenu = True
        elif (cursor_line == 1):
            twelvehours = False
        elif (cursor_line == 2):
            menu = False
            timerMenu == True
        pass
    input.on_button_event(Button.B, input.button_event_click(), on_button_event_b)

#Fith/Six
def openTimeMenu():
    def on_button_event_a():
        h + 1
        if twelvehours:
            if twelve:
                if (h > 12):
                    h = 1
        elif (twelvehours == False):
            if (h == 24):
                h = 0
        pass
    def on_button_event_b():
        m + 1
        if (m >= 60):
            m = 0
            h + 1
        pass
    def on_button_event_c():
        selected + 1
        if (selected > 1):
            selected = 0
            timeMenu = False
            menu = True
        pass 
    input.on_button_event(Button.A, input.button_event_click(), on_button_event_a)
    if (selected == 0):
        input.on_button_event(Button.A, input.button_event_click(), on_button_event_a)
        input.on_button_event(Button.B, input.button_event_click(), on_button_event_c)
        if blink:
            kitronik_VIEW128x64.draw_rect(10, 10, rect1x, rect1y)
            kitronik_VIEW128x64.draw_rect(10, 10, rect2x, rect2y)
            kitronik_VIEW128x64.drawnum(m, rect1x + 2)
        else:
            if (h < 10):
                kitronik_VIEW128x64.drawnum(h, rect1x - 2)
                kitronik_VIEW128x64.draw_rect(10, 10, rect1x, rect1y)
                kitronik_VIEW128x64.draw_rect(10, 10, rect2x, rect2y)
                kitronik_VIEW128x64.drawnum(m, rect1x + 2)
            else:
                kitronik_VIEW128x64.drawnum(h, rect1x - 4)
                kitronik_VIEW128x64.draw_rect(10, 10, rect1x, rect1y)
                kitronik_VIEW128x64.draw_rect(10, 10, rect2x, rect2y)
                kitronik_VIEW128x64.drawnum(m, rect1x + 2)
    else:
        input.on_button_event(Button.A, input.button_event_click(), on_button_event_b)
        input.on_button_event(Button.B, input.button_event_click(), on_button_event_c)
        if blink:
            if (h < 10):
                kitronik_VIEW128x64.drawnum(h, rect1x - 2)
                kitronik_VIEW128x64.draw_rect(10, 10, rect1x, rect1y)
                kitronik_VIEW128x64.draw_rect(10, 10, rect2x, rect2y)
            else:
                kitronik_VIEW128x64.drawnum(h, rect1x - 4)
                kitronik_VIEW128x64.draw_rect(10, 10, rect1x, rect1y)
                kitronik_VIEW128x64.draw_rect(10, 10, rect2x, rect2y)
        else:
            if (h < 10):
                kitronik_VIEW128x64.drawnum(h, rect1x - 2)
                kitronik_VIEW128x64.draw_rect(10, 10, rect1x, rect1y)
                kitronik_VIEW128x64.draw_rect(10, 10, rect2x, rect2y)
                kitronik_VIEW128x64.drawnum(m, rect1x + 2)
            else:
                kitronik_VIEW128x64.drawnum(h, rect1x - 4)
                kitronik_VIEW128x64.draw_rect(10, 10, rect1x, rect1y)
                kitronik_VIEW128x64.draw_rect(10, 10, rect2x, rect2y)
                kitronik_VIEW128x64.drawnum(m, rect1x + 2)
#Fith/Six
def openTimerMenu():
    def on_button_event_a():
        th + 1
        if twelvehours:
            if twelve:
                if (h > 12):
                    th = 1
        elif (twelvehours == False):
            if (th == 24):
                th = 0
        pass
    def on_button_event_b():
        tm + 1
        if (tm >= 60):
            tm = 0
            th + 1            
            pass
    def on_button_event_c():
        selected + 1
        if (selected > 1):
            selected = 0
            timerMenu = False
            menu = True
            timer = True
            pass
        input.on_button_event(Button.A, input.button_event_click(), on_button_event_a)
        if (selected == 0):
            input.on_button_event(Button.A, input.button_event_click(), on_button_event_a)
            input.on_button_event(Button.B, input.button_event_click(), on_button_event_c)
            if blink:
                kitronik_VIEW128x64.draw_rect(10, 10, rect1x, rect1y)
                kitronik_VIEW128x64.draw_rect(10, 10, rect2x, rect2y)
                kitronik_VIEW128x64.drawnum(tm, rect1x + 2)
            else:
                if (h < 10):
                    kitronik_VIEW128x64.drawnum(th, rect1x - 2)
                    kitronik_VIEW128x64.draw_rect(10, 10, rect1x, rect1y)
                    kitronik_VIEW128x64.draw_rect(10, 10, rect2x, rect2y)
                    kitronik_VIEW128x64.drawnum(tm, rect1x + 2)
                else:
                    kitronik_VIEW128x64.drawnum(th, rect1x - 4)
                    kitronik_VIEW128x64.draw_rect(10, 10, rect1x, rect1y)
                    kitronik_VIEW128x64.draw_rect(10, 10, rect2x, rect2y)
                    kitronik_VIEW128x64.drawnum(tm, rect1x + 2)
        else:
            input.on_button_event(Button.A, input.button_event_click(), on_button_event_b)
            input.on_button_event(Button.B, input.button_event_click(), on_button_event_c)
            if blink:
                if (h < 10):
                    kitronik_VIEW128x64.drawnum(th, rect1x - 2)
                    kitronik_VIEW128x64.draw_rect(10, 10, rect1x, rect1y)
                    kitronik_VIEW128x64.draw_rect(10, 10, rect2x, rect2y)
                else:
                    kitronik_VIEW128x64.drawnum(th, rect1x - 4)
                    kitronik_VIEW128x64.draw_rect(10, 10, rect1x, rect1y)
                    kitronik_VIEW128x64.draw_rect(10, 10, rect2x, rect2y)
            else:
                if (h < 10):
                    kitronik_VIEW128x64.drawnum(th, rect1x - 2)
                    kitronik_VIEW128x64.draw_rect(10, 10, rect1x, rect1y)
                    kitronik_VIEW128x64.draw_rect(10, 10, rect2x, rect2y)
                    kitronik_VIEW128x64.drawnum(tm, rect1x + 2)
                else:
                    kitronik_VIEW128x64.drawnum(th, rect1x - 4)
                    kitronik_VIEW128x64.draw_rect(10, 10, rect1x, rect1y)
                    kitronik_VIEW128x64.draw_rect(10, 10, rect2x, rect2y)
                    kitronik_VIEW128x64.drawnum(tm, rect1x + 2)
