function Schranke_zu () {
    basic.showIcon(IconNames.ArrowSouth)
    m = 100
    motors.motorPower(m)
}
function Motor_aus () {
    basic.clearScreen()
    m = 0
    motors.motorCommand(MotorCommand.Break)
}
function _ (Kommentar: string) {
	
}
function Schranke_auf () {
    basic.showIcon(IconNames.ArrowNorth)
    m = -100
    motors.motorPower(m)
}
let Helligkeit = 0
let m = 0
_("elssner/ft3-schranke")
let _4digit = grove.createDisplay(DigitalPin.C16, DigitalPin.C17)
pins.digitalWritePin(DigitalPin.P0, 1)
let Schaltwert = 60
basic.pause(500)
Schranke_zu()
loops.everyInterval(400, function () {
    Helligkeit = pins.analogReadPin(AnalogPin.P1)
    _4digit.show(Helligkeit)
    if (m == 0 && Helligkeit > Schaltwert) {
        _("Motor aus und Lichtschranke dunkel -> Schranke öffnen")
        Schranke_auf()
    } else if (m < 0 && input.pinIsPressed(TouchPin.P2)) {
        _("Motor öffnet Schranke (m < 0) und Schranke ist ganz offen (P2) -> Motor aus")
        Motor_aus()
        _("nach 5 Sekunden -> Schranke wieder schließen")
        for (let Index = 0; Index <= 4; Index++) {
            basic.showNumber(Index)
            basic.pause(1000)
        }
        Schranke_zu()
    } else if (m > 0 && input.pinIsPressed(TouchPin.P3)) {
        _("Motor schließt Schranke (m > 0) und Schranke ist ganz geschlossen (P3) -> Motor aus")
        Motor_aus()
    }
})
