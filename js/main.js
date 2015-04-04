var config = {
  run: {
    length: 25
  , every: 1
  , label: 'Run'
  }
, shortBreak: {
    length: 5
  , every: 2
  , label: 'Break'
  }
, longBreak: {
    length: 15
  , every: 8
  , label: 'Long Break'
  }
, prioritization: ['longBreak', 'shortBreak', 'run']
, audioAlert: 'cnt/palimpalim.ogg'
}

/* Returns all attributes of a period */
function getPeriod (periodName) {
  return config[periodName]
}

/* Returns all attributes of the current period */
function getCurrentPeriod () {
  return getPeriod(getCurrentPeriodName())
}

/* Returns the current periods lenth */
function getCurrentPeriodLength () {
  return getCurrentPeriod().length
}

/* checks if it's the last period */
function isLastPeriod (periodIndex) {
  return config.prioritization.length < periodIndex ? periodIndex : -1
}

/* Returns the name of the next period */
function getNextPeriodName () {
  for (var ind = 0; ind < config.prioritization.length; ind++) {
    if((getNthPeriod() + 1) % getPeriod(config.prioritization[ind]).every == 0) return config.prioritization[ind]
  }
}

/* Initializes the nextPeriod */
function nextPeriod () {
  return newPeriod(getNextPeriodName())
}

/* Initiates a new run if currentRunMinutes is higher than or equal to currentPeriod */
function shouldDoNextPeriod (currentMinutes) {
  if(getSeconds() / 60 >= getCurrentPeriodLength()) nextPeriod()
}

/* initiates a new run */
function newRun () {
  setCurrentRun(getCurrentRun() + 1)
}

/* Initiates a period */
function newPeriod (periodName) {
  if(setCurrentPeriodName(periodName) == 'run') newRun()
  incrementNthPeriod()
  theBeginningOfTime()
  return periodName
}

/* Inializes the sync between DOM and localstorage */
function initSyncs () {
  syncLocalStorageTo('currentPeriodSeconds', recalculateMinutes)
  syncLocalStorageTo('currentPeriodSeconds', recalculateSeconds)
  syncLocalStorageTo('currentPeriod', updatePeriodDisplay)
  syncLocalStorageTo('currentRun', updateNthRunLabel)
  syncLocalStorageTo('currentRun', audioAlert, 500, true)
  syncLocalStorageTo('running', updateToggleRunButton)
  syncLocalStorageTo('currentPeriodSeconds', updateBackgroundHeight, 10000)
}

/* Creates a clock and starts listening for changes in localStorage */
function initializeClock () {
  createAClock(document.body)
  initSyncs()
  removeRunning()
}

/* Initializes a new counter */
function kickOff () {
  resetState()
  newPeriod(getNextPeriodName())
}