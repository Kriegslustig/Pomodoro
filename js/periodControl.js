pull.component('periodControl', function () {

  var s = this
  var g = s.generic
  var ls = s.localStorageAdapter

  return [
    getPeriod
  , getCurrentPeriod
  , getCurrentPeriodLength
  , isLastPeriod
  , getNextPeriodName
  , nextPeriod
  , shouldDoNextPeriod
  , newRun
  , newPeriod
  ]

  /* Returns all attributes of a period */
  function getPeriod (periodName) {
    return s.config[periodName]
  }

  /* Returns all attributes of the current period */
  function getCurrentPeriod () {
    return getPeriod(ls.getCurrentPeriodName())
  }

  /* Returns the current periods lenth */
  function getCurrentPeriodLength () {
    return getCurrentPeriod().length
  }

  /* checks if it's the last period */
  function isLastPeriod (periodIndex) {
    return s.config.prioritization.length < periodIndex ? periodIndex : -1
  }

  /* Returns the name of the next period */
  function getNextPeriodName () {
    var returnVal = false
    s.config.prioritization.forEach(function (period, index) {
      if((ls.getNthPeriod() + 1) % getPeriod(period).every == 0) {
        returnVal = period
        return false
      }
    })
    return returnVal
  }

  /* Initializes the nextPeriod */
  function nextPeriod () {
    return newPeriod(getNextPeriodName())
  }

  /* Initiates a new run if currentRunMinutes is higher than or equal to currentPeriod */
  function shouldDoNextPeriod (currentMinutes) {
    if(ls.getSeconds() / 60 >= getCurrentPeriodLength()) 
      return s.audioAlert.audioAlert()
    return false
  }

  /* initiates a new run */
  function newRun () {
    return ls.setCurrentRun(ls.getCurrentRun() + 1)
  }

  /* Initiates a period */
  function newPeriod (periodName) {
    if(ls.setCurrentPeriodName(periodName) == 'run') newRun()
    ls.incrementNthPeriod()
    ls.resetPeriodStartingTime()
    ls.updateSeconds()
    return periodName
  }
}, [
  'generic'
, 'config'
, 'localStorageAdapter'
, 'audioAlert'
])