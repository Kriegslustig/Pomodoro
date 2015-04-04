/*
  Here are all the connections to localStorage
*/

/* Executes a function in an interval and passes the current value of the desired localStorageItem to it */
function syncLocalStorageTo (key, syncFunct, interval) {
  syncFunct(localStorage.getItem(key))
  setInterval(function () {
    syncFunct(localStorage.getItem(key))
  }, (interval || 500))
}

/* resets all used localStorage items */
function resetState () {
  localStorage.setItem('currentPeriodSeconds', 0)
  localStorage.setItem('currentPeriod', 'run')
  localStorage.setItem('currentRun', 0)
  localStorage.setItem('nthPeriod', 0)
  localStorage.removeItem('running')
}

/* Removes running */
function removeRunning () {
  localStorage.removeItem('running')
}

/* Sets running */
function setRunning () {
  localStorage.setItem('running', true)
}

/* Return the currentRun */
function getCurrentRun () {
  return parseInt(localStorage.getItem('currentRun'))
}

/* sets the currentRun */
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

/* Returns the current Period */
function getCurrentPeriodName () {
  return localStorage.getItem('currentPeriod')
}

/* Sets the current period to passed value and returns it */
function setCurrentPeriodName (newPeriod) {
  localStorage.setItem('currentPeriod', newPeriod)
  return newPeriod
}