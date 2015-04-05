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
    s.intervalControler.newInterval('shouldDoNextPeriod', s.periodControl.shouldDoNextPeriod, 100)
  }

  function resetRunTime () {
    return ls.setSeconds(0)
  }

  function toggleRun () {
    return ls.isRunning ? ls.removeRunning() : ls.setRunning()
  }

}, [
  'generic'
, 'intervalControler'
, 'localStorageAdapter'
, 'periodControl'
])