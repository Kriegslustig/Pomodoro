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
}

var godDamnState = {
  fuckingIntervalId: false
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

/* Resets an interval to increment Seconds */
function startCounter () {
  if(godDamnState.fuckingIntervalId) clearInterval(godDamnState.fuckingIntervalId)
  godDamnState.fuckingIntervalId = setInterval(incrementSeconds, 1000)
  setInterval(shouldDoNextPeriod, 100)
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

function theBeginningOfTime () {
  setSeconds(0)
  startCounter()
}

/* Inializes the sync between DOM and localstorage */
function initSyncs () {
  syncLocalStorageTo('currentPeriodSeconds', recalculateMinutes, 100)
  syncLocalStorageTo('currentPeriodSeconds', recalculateSeconds, 100)
  syncLocalStorageTo('run', updatePeriodDisplay)
}

function main () {
  createAClock(document.body)
  resetState()
  newPeriod(getNextPeriodName())
  initSyncs()
  theBeginningOfTime()
}