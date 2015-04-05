pull.component('timerFunctions', function () {

  var s = this
  var g = s.generic
  var ls = s.localStorageAdapter

  return [
    killClock
  , incrementSeconds
  , startSecondInterval
  , startCounter
  ]

  /* kills the active clock runner */
  function killClock () {
    ls.removeRunning()
    return s.intervalControler.killInterval('clockRunner')
  }

  /* increments seconds in localstorage */
  function incrementSeconds () {
    ls.setSeconds(ls.getSeconds() + 1)
  }

  /* starts the interval to increment on clock */
  function startSecondInterval () {
    s.intervalControler.newInterval('clockRunner', incrementSeconds, 1000)
  }

  /* Resets an interval to increment Seconds */
  function startCounter () {
    s.intervalControler.newInterval('fuckingSecondsIncrementer', function () {
      if(ls.isRunning()) ls.incrementSeconds
    }, 1000)
  }
}, [
  'generic'
, 'localStorageAdapter'
, 'intervalControler'
])