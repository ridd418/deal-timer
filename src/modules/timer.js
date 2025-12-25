// Timer Factory Function.
const createTimer = (displayUpdater, onEnd) => {

    // State Variables
    let clockInterval = null
    let hours = 0, minutes = 0, seconds = 0

    // Helper Functions
    const clearTimer = () => {
        clearInterval(clockInterval)
        clockInterval = null
    }

    const setTimeVariables = (sec) => {

        if (sec <= 0) {
            hours = minutes = seconds = 0
            return
        }
        
        hours = Math.floor(sec / 3600)
        const rem = sec % 3600
        minutes = Math.floor(rem / 60)
        seconds = rem % 60
    }

    // Methods
    const start = (sec) => {
        // Avoids simultaneous timer intervals or running when sec <= 0.
        if (clockInterval || sec <= 0) return false

        setTimeVariables(sec)

        const updateTicks = () => {
            displayUpdater(hours, minutes, seconds)
                
            if (seconds > 0) { seconds-- }
            else if (minutes > 0) { seconds = 59, minutes-- }
            else if (hours > 0) { minutes = seconds = 59, hours-- }
            else { clearTimer(), setTimeVariables(0), onEnd() }
        }
            
        // Calling immediately for first run.
        updateTicks()
        clockInterval = setInterval(updateTicks, 1000)
        return true
    }

    const reset = () => {
        clearTimer()
        setTimeVariables(0)
        displayUpdater()
    }

    const isRunning = () => clockInterval !== null

    return { start, reset, isRunning }
}

export default createTimer