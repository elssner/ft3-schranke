function Schranke_öffnen () {
    basic.showIcon(IconNames.ArrowNorth)
    m = -100
    motors.motorPower(m)
}
function Motor_aus () {
    basic.clearScreen()
    m = 0
    motors.motorCommand(MotorCommand.Break)
}
function Schranke_schließen () {
    basic.showIcon(IconNames.ArrowSouth)
    m = 100
    motors.motorPower(m)
}
function _ (Kommentar: string) {
	
}
let m = 0
_("Schranke2LED")
pins.digitalWritePin(DigitalPin.P0, 1)
basic.pause(500)
Schranke_schließen()
basic.forever(function () {
    if (m == 0 && pins.analogReadPin(AnalogPin.P1) > 60) {
        _("Motor aus und Lichtschranke dunkel -> Schranke öffnen")
        Schranke_öffnen()
    } else if (m < 0 && input.pinIsPressed(TouchPin.P2)) {
        _("Motor öffnet Schranke (m < 0) und Schranke ist ganz offen (P2) -> Motor aus")
        Motor_aus()
        _("nach 5 Sekunden -> Schranke wieder schließen")
        for (let Index = 0; Index <= 4; Index++) {
            basic.showNumber(Index)
            basic.pause(1000)
        }
        Schranke_schließen()
    } else if (m > 0 && input.pinIsPressed(TouchPin.P3)) {
        _("Motor schließt Schranke (m > 0) und Schranke ist ganz geschlossen (P3) -> Motor aus")
        Motor_aus()
    }
})
