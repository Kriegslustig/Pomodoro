localStorage.setItem('currentPeriodSeconds', 0)
localStorage.setItem('currentPeriod', 'run')
localStorage.setItem('currentRun', 0)
localStorage.setItem('nthPeriod', 0)

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

/* Returns the current Period */
function getCurrentPeriod () {
  return localStorage.getItem('currentPeriod')
}

/* Sets the current period to passed value and returns it */
function setCurrentPeriod (newPeriod) {
  localStorage.setItem('currentPeriod', newPeriod)
  return newPeriod
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
  setInterval(shouldDoNextPeriod, 1000)
}

/* increments seconds in localstorage */
function incrementSeconds () {
  setSeconds(getSeconds() + 1)
}

/* Return the currentRun */
function getCurrentRun () {
  return parseInt(localStorage.getItem('currentRun'))
}

function setCurrentRun (newValue) {
  localStorage.setItem('currentRun', newValue)
}

/* updates LocalStorage currentPeriodSeconds */
function setSeconds (newValue) {
  localStorage.setItem('currentPeriodSeconds', newValue)
}

/* gets LocalStorage currentPeriodSeconds */
function getSeconds (newValue) {
  return parseInt(localStorage.getItem('currentPeriodSeconds'))
}

/* Calculates currentRunMinutes */
function getMinutes () {
  return Math.floor(getSeconds() / 60)
}

function syncLocalStorageTo (key, syncFunct, interval) {
  setInterval(function () {
    syncFunct(localStorage.getItem(key))
  }, (interval || 500))
}

/* Inializes the sync between DOM and localstorage */
function initSyncs () {
  syncLocalStorageTo('currentPeriodSeconds', recalculateMinutes, 1000)
  syncLocalStorageTo('currentPeriodSeconds', recalculateSeconds, 100)
}

/* executes an action when current is a multiple of target  */
function doEvery (current, target, action) {
  if(current > 0 && current % target == 0) action(current / target)
}

/* initiates a new run */
function newRun () {
  setCurrentRun(getCurrentRun() + 1)
}

/* gets nth period from localstorage */
function getNthPeriod () {
  return parseInt(localStorage.getItem('nthPeriod'))
}

/* Sets the nthPeriod */
function setNthPeriod (newValue) {
  localStorage.setItem('nthPeriod', newValue)
  return newValue
}

/* Increments the nthPeriod */
function incrementNthPeriod () {
  return setNthPeriod(getNthPeriod() + 1)
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

function main () {
  createAClock(document.body)
  newPeriod(getNextPeriodName())
  initSyncs()
  theBeginningOfTime()
}