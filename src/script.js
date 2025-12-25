import createTimer from "timer"
import stateStore from "stateStore"

// Ensures App loads after DOM is initialized.
document.addEventListener('DOMContentLoaded', () => {
    console.log('App Ready!')

    // Elements
    const displayEL = document.getElementById('timer-display')
    const dealStatus = document.getElementById('status-text')
    const minutesInput = document.getElementById('deal-minutes')

    // Utility Functions
    const renderDisplay = (hours=0, minutes=0, seconds=0) => {
        const formatTime = (time) => String(time).padStart(2, '0')
        displayEL.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
    }

    const DEAL_STATUS = Object.freeze({
        NOT_STARTED: "NOT_STARTED",
        LIVE: "LIVE",
        OVER: "OVER"
    })

    const setDealStatus = (status) => {

        switch (status) {
            case DEAL_STATUS.NOT_STARTED:
                dealStatus.textContent = "Deal not started"
                dealStatus.style.color = ''
                break
            case DEAL_STATUS.LIVE:
                dealStatus.textContent = "Deal is Live!"
                dealStatus.style.color = 'limegreen'
                break
            case DEAL_STATUS.OVER:
                dealStatus.textContent = "Deal Over!"
                dealStatus.style.color = 'red'
                break
        }
    }

    const setDealEndStatus = () => { setDealStatus(DEAL_STATUS.OVER) }

    const startTimer = () => {

        if (timer.isRunning()) return

        const minutesValue = Number(minutesInput.value)

        if (!Number.isFinite(minutesValue) || minutesValue < 1 || !Number.isInteger(minutesValue)) {
            alert("Please enter a whole number greater than or equal to 1 minute!")
            minutesInput.value = ''
            return
        }

        minutesInput.value = ''
        const sec = minutesValue * 60
        if (timer.start(sec)) {
            setDealStatus(DEAL_STATUS.LIVE)
            stateStore.logState("timer-start-duration", sec)
        }
    }

    const coldStart = () => {
        // Start form localStorage
        const secLeft = stateStore.retrieveState("timer-start-duration")

        if (secLeft === 0) setDealStatus(DEAL_STATUS.OVER)
        else if (secLeft > 0) { timer.start(secLeft), setDealStatus(DEAL_STATUS.LIVE) }
    }

    // Creating Timer instance.
    const timer = createTimer(renderDisplay, setDealEndStatus)
    timer.reset()
    coldStart()

    // Single EventListener handles all events.
    document.getElementById('app').addEventListener('click', (e) => {
        const targetId = e.target.id

        if (targetId === 'start-deal') startTimer()
        if (targetId === 'reset-deal') {
            timer.reset()
            stateStore.clearState("timer-start-duration")
            setDealStatus(DEAL_STATUS.NOT_STARTED)
        }
    })

})