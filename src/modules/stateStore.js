// Log start time and duration to localStorage
const logState = (key, dur) => {
    const stateData = {
        start : Date.now(),
        duration : dur
    }

    localStorage.setItem(key , JSON.stringify(stateData))
}

const retrieveState = (key) => {
    let stateData

    // Handles localStorage corruption
    try {
        stateData = JSON.parse(localStorage.getItem(key))
    } catch (err) {
        console.error(`Error pasrsing stateData for ${key} from localStorage: ${err}`)
        console.info(`Removing stateData for ${key} in localStorage!`)
        localStorage.removeItem(key)
    }

    if (!stateData) return undefined

    const secPassed = Math.floor((Date.now() - stateData.start) / 1000)
    const secLeft = stateData.duration - secPassed

    return secLeft <= 0 ? 0 : secLeft
}

const clearState = (key) => {
    localStorage.removeItem(key)
}

export default { logState, retrieveState, clearState }