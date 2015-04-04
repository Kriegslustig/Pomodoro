var config = {
  run: {
    length: 25
  , every: 1
  }
, shortBreak: {
    length: 5
  , every: 2
  }
, longBreak: {
    length: 15
  , every: 4
  }
, prioritization: ['longBreak', 'shortBreak', 'run']
}

var godDamnState = {
  fuckingIntervalId: false
}

/* checks if it's the last period */
function isLastPeriod (periodIndex) {
  return config.prioritization.length < periodIndex ? periodIndex : -1
}

/* Returns the name of the next period */
function getNextPeriodName () {
  for (var ind = 0; ind < config.prioritization.length; ind++) {
    if((getNthPeriod() + 1) % config[config.prioritization[ind]].every == 0) return config.prioritization[ind]
  }
}

/* Initializes the nextPeriod */
function nextPeriod () {
  newPeriod(getNextPeriodName())
}

/* Initiates a new run if currentRunMinutes is higher than or equal to currentPeriod */
function shouldDoNextPeriod (currentMinutes) {
  if(getMinutes() >= config[getCurrentPeriod()].length) nextPeriod()
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
  if(setCurrentPeriod(periodName) == 'run') newRun()
  incrementNthPeriod()
  theBeginningOfTime()
}

function theBeginningOfTime () {
  setSeconds(0)
  startCounter()
}

/* Inializes the sync between DOM and localstorage */
function initSyncs () {
  syncLocalStorageTo('currentPeriodSeconds', recalculateMinutes, 100)
  syncLocalStorageTo('currentPeriodSeconds', recalculateSeconds, 100)
}

function main () {
  createAClock(document.body)
  newPeriod(getNextPeriodName())
  initSyncs()
  theBeginningOfTime()
}