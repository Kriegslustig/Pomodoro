/*
  Here are all the connections to localStorage
*/

pull.component('localStorageAdapter', function () {

  /* DEBUGING: Sets the Seconds */
  setSuperSeconds = function (newValue) {
    setSeconds(newValue)
    setPeriodStartingTime(getCurrentTimeSeconds() - newValue)
  }

  return [
    syncLocalStorageTo
  , resetState
  , setRunning
  , isRunning
  , getCurrentRun
  , setCurrentRun
  , setSeconds
  , getSeconds
  , updateSeconds
  , setPeriodStartingTime
  , getPeriodStartingTime
  , resetPeriodStartingTime
  , recalculateStartingTime
  , getMinutes
  , getNthPeriod
  , setNthPeriod
  , incrementNthPeriod
  , getCurrentPeriodName
  , setCurrentPeriodName
  ]

  /* Executes a function in an interval and passes the current value of the desired localStorageItem to it */
  function syncLocalStorageTo (key, syncFunct, interval, dontDoFisrtTime) {
    var currentValue = localStorage.getItem(key)
    if(!dontDoFisrtTime) syncFunct(localStorage.getItem(key))
    setInterval(function () {
      var newValue = localStorage.getItem(key)
      if(newValue != currentValue){
        syncFunct(newValue)
        currentValue = newValue
      }
    }, (interval || 500))
  }

  /* resets all used localStorage items */
  function resetState () {
    localStorage.setItem('currentPeriodSeconds', 0)
    localStorage.setItem('currentPeriod', 'run')
    localStorage.setItem('currentRun', 1)
    localStorage.setItem('nthPeriod', 1)
    localStorage.removeItem('running')
    resetPeriodStartingTime()
  }

  /* Sets running */
  function setRunning (newState) {
    return newState ? localStorage.setItem('running', true) : localStorage.removeItem('running')
  }

  /* Sets running */
  function isRunning () {
    return !!localStorage.getItem('running')
  }

  /* Return the currentRun */
  function getCurrentRun () {
    return parseInt(localStorage.getItem('currentRun'))
  }

  /* sets the currentRun */
  function setCurrentRun (newValue) {
    return localStorage.setItem('currentRun', newValue)
  }

  /* updates LocalStorage currentPeriodSeconds */
  function setSeconds (newValue) {
    return localStorage.setItem('currentPeriodSeconds', newValue)
  }
  
  /* Recalculates seconds in localstorage */
  function updateSeconds () {
    return setSeconds(getCurrentTimeSeconds() - getPeriodStartingTime())
  }

  /* Sets the periodStartingTime */
  function setPeriodStartingTime (newValue) {
    return localStorage.setItem('periodStartingTime', newValue)
  }

  /* Returns the PeriodStartingTime */
  function getPeriodStartingTime () {
    return localStorage.getItem('periodStartingTime')
  }

  /* Resets the periodStarting time to the current time */
  function resetPeriodStartingTime () {
    return localStorage.setItem('periodStartingTime', getCurrentTimeSeconds())
  }

  /* Calculates a new period starting time */
  function recalculateStartingTime () {
    return localStorage.setItem('periodStartingTime', getCurrentTimeSeconds() - getSeconds())
  }

  /* Returns the current time in Seconds */
  function getCurrentTimeSeconds () {
    return Math.round(new Date().getTime() / 1000)
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
}, [])