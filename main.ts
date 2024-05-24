function die_roll () {
    roll = randint(1, 3)
    if (roll == 1) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
    } else if (roll == 2) {
        basic.showLeds(`
            . . . . .
            . . . # .
            . . . . .
            . # . . .
            . . . . .
            `)
    } else {
        basic.showLeds(`
            . . . . #
            . . . . .
            . . # . .
            . . . . .
            # . . . .
            `)
    }
    basic.pause(1000)
    basic.clearScreen()
}
function reset () {
    _1_speed = 0
    _2_speed = 0
    roll = 0
    steps = 0
    _1_squeeze = 0
    _2_squeeze = 0
}
let _2_squeeze = 0
let _1_squeeze = 0
let steps = 0
let _2_speed = 0
let _1_speed = 0
let roll = 0
reset()
basic.forever(function () {
    reset()
    while (true) {
        if (input.buttonIsPressed(Button.A)) {
            _1_speed = 2
        } else if (input.buttonIsPressed(Button.B)) {
            _2_speed = 2
        } else {
        	
        }
        if (input.logoIsPressed()) {
            break;
        }
    }
    basic.showString("Shake!")
    while (true) {
        if (input.isGesture(Gesture.Shake)) {
            die_roll()
            break;
        }
    }
    basic.showString("Squeeze!")
    while (_1_squeeze < 500 || _2_squeeze < 500) {
        _1_squeeze = pins.analogReadPin(AnalogPin.P1)
        _2_squeeze = pins.analogReadPin(AnalogPin.P2)
    }
    pins.digitalWritePin(DigitalPin.P0, 1)
    basic.pause(40)
    pins.digitalWritePin(DigitalPin.P0, 0)
    if (_1_squeeze > _2_squeeze) {
        steps = roll + _1_speed
        basic.showString("   P 1 won!")
    } else {
        steps = roll + _2_speed
        basic.showString("   P 2 won!")
    }
    basic.showString("Move")
    basic.showNumber(steps)
    basic.pause(5000)
    basic.clearScreen()
})
