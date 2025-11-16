// Ensures App loads after DOM is initialized.
document.addEventListener('DOMContentLoaded', () => {
    console.log('App Ready!')

    // Taking control of necessary elements.
    const displayEL = document.getElementById('timer-display')
    const dealStatus = document.getElementById('status-text')

    // Format and Render Time.
    const renderDisplay = (hours=0, minutes=0, seconds=0) => {
        const formatTime = (time) => String(time).padStart(2, '0')
        displayEL.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
    }

    // Timer Factory Function.
    const Timer = () => {

        // Store current interval.
        let clockInterval = null

        // Countable time variables for stopwatch.
        let hours = minutes = seconds = 0

        // Kills current interval.
        const clearTimer = () => {
            clearInterval(clockInterval)
            clockInterval = null
        }

        // Storing Input elements.
        const minutesInput = document.getElementById('deal-minutes')

        // Log start time and duration to localStorage
        const logState = (dur) => {
            const stateData = {
                start : Date.now(),
                duration : dur
            }

            localStorage.setItem("timer-start-duration", JSON.stringify(stateData))
        }

        // Start Control.
        const start = (sec=0) => {
            // Avoids simultaneous timer intervals.
            if (clockInterval) return

            if (sec) {
                hours = Math.floor(sec / 3600)
                const rem = sec % 3600
                minutes = Math.floor(rem / 60)
                seconds = rem % 60
            }else {

                minutesValue = Number(minutesInput.value)

                if (!Number.isFinite(minutesValue) || minutesValue < 1 || !Number.isInteger(minutesValue)) {
                    alert("Please enter a whole number greater than or equal to 1 minute!")
                    minutesInput.value = '' 
                    return
                }

                if (minutesValue < 60) minutes = minutesValue
                else {
                    hours = Math.floor(minutesValue / 60)
                    minutes = Math.floor(minutesValue % 60)
                }
                minutesInput.value = ''

                logState(hours * 3600 + minutes * 60 + seconds)
            }

            // Time Update Logic
            const updateTicks = () => {
                renderDisplay(hours, minutes, seconds)
                    
                if (seconds > 0) seconds--
                else if (minutes > 0) seconds = 59, minutes--
                else if (hours > 0) minutes = seconds = 59, hours-- 
                else {
                    clearTimer()
                    hours = minutes = seconds = 0
                    dealStatus.textContent = "Deal Over!"
                    dealStatus.style.color = 'red'
                }
            }
                
            // Calling immediately for first run.
            updateTicks()
            dealStatus.textContent = "Deal is Live!"
            dealStatus.style.color = 'limegreen'
            clockInterval = setInterval(updateTicks, 1000)
        }

        // Start form localStorage
        const coldStart = () => {
            
            let stateData

            // Handles localStorage corruption
            try {
                stateData = JSON.parse(localStorage.getItem("timer-start-duration"))
            } catch {
                localStorage.removeItem("timer-start-duration")
                return
            }

            if (!stateData) return

            const secPassed = Math.floor((Date.now() - stateData.start) / 1000)
            const secLeft = stateData.duration - secPassed

            if (secLeft > 0) start(secLeft)
            else {
                dealStatus.textContent = "Deal Over!"
                dealStatus.style.color = 'red'
            }
        }

        // Reset Control.
        const reset = () => {
            clearTimer()
            hours = minutes = seconds = 0
            dealStatus.textContent = "Deal not started"
            dealStatus.style.color = ''
            renderDisplay()
        }

        // Return Controls.
        return {start, reset, coldStart}
    }

    // Creating Timer instance.
    const timer = Timer()
    timer.reset()
    timer.coldStart()

    // Single EventListener handles all events.
    document.addEventListener('click', (e) => {
        const targetId = e.target.id

        if (targetId === 'start-deal') timer.start()
        if (targetId === 'reset-deal') timer.reset(), localStorage.removeItem("timer-start-duration")
    })

})