let name = "CalliopeClock"
let clock = true
let menu = false
let timeMenu = false
let twelvehours = false
let twelve = true
let timerMenu = false
let Timer = false
let blink = false
let cursor_line = 0
let selected = 0
let rect1y = 0
let rect1x = 0
let rect2x = 64
let rect2y = 128
let h = 0
let m = 0
let s = 0
let th = 0
let tm = 0
// First
function startClock() {
    oledssd1306.initDisplay()
    oledssd1306.setTextXY(48, 32)
    oledssd1306.writeString(name)
    basic.pause(2000)
    anim()
}

// Second
function anim(speed: number = 1) {
    let ak = 64
    let gk = 32
    let tan = ak / gk
    let angle = Math.atan(tan)
    let sin = Math.sin(angle)
    let hy = sin / gk
    let cos = Math.cos(angle)
    let time = hy * speed
    kitronik_VIEW128x64.drawRect(10, 10, 0, 64)
    kitronik_VIEW128x64.drawRect(10, 10, 128, 0)
    while (rect1x != rect2x) {
        oledssd1306.clearDisplay()
        rect1x + cos
        rect2x - cos
        rect1y - 2 * sin
        rect2y + 2 * sin
        kitronik_VIEW128x64.drawRect(10, 10, rect1x, rect1y)
        kitronik_VIEW128x64.drawRect(10, 10, rect2x, rect2y)
        basic.pause(time)
    }
    if (rect1x == rect2x) {
        timer()
    }
    
}

// Third
function timer() {
    let s: number;
    let m: number;
    let h: number;
    let Timer: boolean;
    while (true) {
        oledssd1306.clearDisplay()
        s + 1
        if (s == 60) {
            s = 0
            m + 1
        }
        
        if (m == 60) {
            m = 0
            h + 1
        }
        
        if (twelvehours) {
            if (twelve) {
                if (h > 12) {
                    h = 1
                }
                
            }
            
        } else if (twelvehours == false) {
            if (h == 24) {
                h = 0
            }
            
        }
        
        input.onButtonEvent(Button.AB, input.buttonEventClick(), function on_button_event_a() {
            let clock: boolean;
            let menu: boolean;
            if (clock) {
                clock = false
                menu = true
            }
            
            if (menu) {
                clock = true
                menu = false
            }
            
            
        })
        if (clock) {
            draw()
        } else if (menu) {
            open_menu()
        } else if (timeMenu) {
            openTimeMenu()
        } else if (timerMenu) {
            openTimerMenu()
        }
        
        if (Timer) {
            if (th == h) {
                if (tm == m) {
                    for (let i = 1; i < 10; i++) {
                        music.playTone(Note.C, music.beat())
                        Timer = false
                    }
                }
                
            }
            
        }
        
        basic.pause(1000)
    }
}

function draw() {
    let dot = true
    if (dot) {
        kitronik_VIEW128x64.drawRect(10, 10, rect1x, rect1y)
        kitronik_VIEW128x64.drawRect(10, 10, rect2x, rect2y)
    }
    
    if (h < 10) {
        kitronik_VIEW128x64.drawnum(h, rect1x - 2)
    } else {
        kitronik_VIEW128x64.drawnum(h, rect1x - 4)
    }
    
    kitronik_VIEW128x64.drawnum(m, rect1x + 2)
}

// Fourth
function open_menu() {
    oledssd1306.setTextXY(50, 4)
    oledssd1306.writeString("Settings")
    oledssd1306.setTextXY(5, 12)
    if (cursor_line == 0) {
        oledssd1306.writeString("| Set time")
    } else {
        oledssd1306.writeString("Set time")
    }
    
    oledssd1306.setTextXY(5, 20)
    if (cursor_line == 1) {
        oledssd1306.writeString("| 12/24 hours")
    } else {
        oledssd1306.writeString("12/24 hours")
    }
    
    oledssd1306.setTextXY(5, 28)
    if (cursor_line == 2) {
        oledssd1306.writeString("| Set timer")
    } else {
        oledssd1306.writeString("Set timer")
    }
    
    input.onButtonEvent(Button.A, input.buttonEventClick(), function on_button_event_a() {
        let cursor_line: number;
        cursor_line + 1
        if (cursor_line > 2) {
            cursor_line = 0
        }
        
        
    })
    input.onButtonEvent(Button.B, input.buttonEventClick(), function on_button_event_b() {
        let menu: boolean;
        let timeMenu: boolean;
        let twelvehours: boolean;
        if (cursor_line == 0) {
            menu = false
            timeMenu = true
        } else if (cursor_line == 1) {
            twelvehours = false
        } else if (cursor_line == 2) {
            menu = false
            timerMenu == true
        }
        
        
    })
}

// Fith/Six
function openTimeMenu() {
    function on_button_event_a() {
        let h: number;
        h + 1
        if (twelvehours) {
            if (twelve) {
                if (h > 12) {
                    h = 1
                }
                
            }
            
        } else if (twelvehours == false) {
            if (h == 24) {
                h = 0
            }
            
        }
        
        
    }
    
    function on_button_event_c() {
        let selected: number;
        let timeMenu: boolean;
        let menu: boolean;
        selected + 1
        if (selected > 1) {
            selected = 0
            timeMenu = false
            menu = true
        }
        
        
    }
    
    input.onButtonEvent(Button.A, input.buttonEventClick(), on_button_event_a)
    if (selected == 0) {
        input.onButtonEvent(Button.A, input.buttonEventClick(), on_button_event_a)
        input.onButtonEvent(Button.B, input.buttonEventClick(), on_button_event_c)
        if (blink) {
            kitronik_VIEW128x64.drawRect(10, 10, rect1x, rect1y)
            kitronik_VIEW128x64.drawRect(10, 10, rect2x, rect2y)
            kitronik_VIEW128x64.drawnum(m, rect1x + 2)
        } else if (h < 10) {
            kitronik_VIEW128x64.drawnum(h, rect1x - 2)
            kitronik_VIEW128x64.drawRect(10, 10, rect1x, rect1y)
            kitronik_VIEW128x64.drawRect(10, 10, rect2x, rect2y)
            kitronik_VIEW128x64.drawnum(m, rect1x + 2)
        } else {
            kitronik_VIEW128x64.drawnum(h, rect1x - 4)
            kitronik_VIEW128x64.drawRect(10, 10, rect1x, rect1y)
            kitronik_VIEW128x64.drawRect(10, 10, rect2x, rect2y)
            kitronik_VIEW128x64.drawnum(m, rect1x + 2)
        }
        
    } else {
        input.onButtonEvent(Button.A, input.buttonEventClick(), function on_button_event_b() {
            let m: number;
            m + 1
            if (m >= 60) {
                m = 0
                h + 1
            }
            
            
        })
        input.onButtonEvent(Button.B, input.buttonEventClick(), on_button_event_c)
        if (blink) {
            if (h < 10) {
                kitronik_VIEW128x64.drawnum(h, rect1x - 2)
                kitronik_VIEW128x64.drawRect(10, 10, rect1x, rect1y)
                kitronik_VIEW128x64.drawRect(10, 10, rect2x, rect2y)
            } else {
                kitronik_VIEW128x64.drawnum(h, rect1x - 4)
                kitronik_VIEW128x64.drawRect(10, 10, rect1x, rect1y)
                kitronik_VIEW128x64.drawRect(10, 10, rect2x, rect2y)
            }
            
        } else if (h < 10) {
            kitronik_VIEW128x64.drawnum(h, rect1x - 2)
            kitronik_VIEW128x64.drawRect(10, 10, rect1x, rect1y)
            kitronik_VIEW128x64.drawRect(10, 10, rect2x, rect2y)
            kitronik_VIEW128x64.drawnum(m, rect1x + 2)
        } else {
            kitronik_VIEW128x64.drawnum(h, rect1x - 4)
            kitronik_VIEW128x64.drawRect(10, 10, rect1x, rect1y)
            kitronik_VIEW128x64.drawRect(10, 10, rect2x, rect2y)
            kitronik_VIEW128x64.drawnum(m, rect1x + 2)
        }
        
    }
    
}

// Fith/Six
function openTimerMenu() {
    function on_button_event_a() {
        let th: number;
        th + 1
        if (twelvehours) {
            if (twelve) {
                if (h > 12) {
                    th = 1
                }
                
            }
            
        } else if (twelvehours == false) {
            if (th == 24) {
                th = 0
            }
            
        }
        
        
    }
    
    function on_button_event_c() {
        let selected: number;
        let timerMenu: boolean;
        let menu: boolean;
        let Timer: boolean;
        selected + 1
        if (selected > 1) {
            selected = 0
            timerMenu = false
            menu = true
            Timer = true
            
        }
        
        input.onButtonEvent(Button.A, input.buttonEventClick(), on_button_event_a)
        if (selected == 0) {
            input.onButtonEvent(Button.A, input.buttonEventClick(), on_button_event_a)
            input.onButtonEvent(Button.B, input.buttonEventClick(), on_button_event_c)
            if (blink) {
                kitronik_VIEW128x64.drawRect(10, 10, rect1x, rect1y)
                kitronik_VIEW128x64.drawRect(10, 10, rect2x, rect2y)
                kitronik_VIEW128x64.drawnum(tm, rect1x + 2)
            } else if (h < 10) {
                kitronik_VIEW128x64.drawnum(th, rect1x - 2)
                kitronik_VIEW128x64.drawRect(10, 10, rect1x, rect1y)
                kitronik_VIEW128x64.drawRect(10, 10, rect2x, rect2y)
                kitronik_VIEW128x64.drawnum(tm, rect1x + 2)
            } else {
                kitronik_VIEW128x64.drawnum(th, rect1x - 4)
                kitronik_VIEW128x64.drawRect(10, 10, rect1x, rect1y)
                kitronik_VIEW128x64.drawRect(10, 10, rect2x, rect2y)
                kitronik_VIEW128x64.drawnum(tm, rect1x + 2)
            }
            
        } else {
            input.onButtonEvent(Button.A, input.buttonEventClick(), function on_button_event_b() {
                let tm: number;
                tm + 1
                if (tm >= 60) {
                    tm = 0
                    th + 1
                    
                }
                
            })
            input.onButtonEvent(Button.B, input.buttonEventClick(), on_button_event_c)
            if (blink) {
                if (h < 10) {
                    kitronik_VIEW128x64.drawnum(th, rect1x - 2)
                    kitronik_VIEW128x64.drawRect(10, 10, rect1x, rect1y)
                    kitronik_VIEW128x64.drawRect(10, 10, rect2x, rect2y)
                } else {
                    kitronik_VIEW128x64.drawnum(th, rect1x - 4)
                    kitronik_VIEW128x64.drawRect(10, 10, rect1x, rect1y)
                    kitronik_VIEW128x64.drawRect(10, 10, rect2x, rect2y)
                }
                
            } else if (h < 10) {
                kitronik_VIEW128x64.drawnum(th, rect1x - 2)
                kitronik_VIEW128x64.drawRect(10, 10, rect1x, rect1y)
                kitronik_VIEW128x64.drawRect(10, 10, rect2x, rect2y)
                kitronik_VIEW128x64.drawnum(tm, rect1x + 2)
            } else {
                kitronik_VIEW128x64.drawnum(th, rect1x - 4)
                kitronik_VIEW128x64.drawRect(10, 10, rect1x, rect1y)
                kitronik_VIEW128x64.drawRect(10, 10, rect2x, rect2y)
                kitronik_VIEW128x64.drawnum(tm, rect1x + 2)
            }
            
        }
        
    }
    
}

