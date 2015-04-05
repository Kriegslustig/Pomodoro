pull.component('clockRunKiller', function () {

  var s = this
  var g = s.generic
  var ls = s.localStorageAdapter

  return [
    kickOff
  , resetRunTime
  , toggleRun
  ]

  /* Initializes a new counter */
  function kickOff () {
    ls.resetState()
    s.periodControl.newPeriod(s.periodControl.getNextPeriodName())
  }

  /* Makes a client the owner of the second counter  */
  function makeMaster () {
    s.intervalControler.newInterval('secondIncrement', shouldIncrementSeconds, 1000)
    s.intervalControler.newInterval('shouldDoNextPeriod', s.periodControl.shouldDoNextPeriod, 100)
  }

  function shouldIncrementSeconds () {
    if(ls.isRunning) return ls.incrementSeconds()
  }

  function resetRunTime () {
    return ls.setSeconds(0)
  }

  function toggleRun () {
    makeMaster()
    return ls.isRunning() ? ls.removeRunning() : ls.setRunning()
  }

}, [
  'generic'
, 'intervalControler'
, 'localStorageAdapter'
, 'periodControl'
])