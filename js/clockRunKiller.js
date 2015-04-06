pull.component('clockRunKiller', function () {

  var s = this
  var g = s.generic
  var ls = s.localStorageAdapter

  return [
    kickOff
  , toggleRun
  ]

  /* Initializes a new counter */
  function kickOff () {
    ls.resetState()
    s.periodControl.newPeriod(s.periodControl.getNextPeriodName())
  }

  /* Makes a client the owner of the second counter  */
  function makeMaster () {
    s.intervalControler.newInterval('secondIncrement', shouldUpdateSeconds, 1000)
    s.intervalControler.newInterval('shouldDoNextPeriod', s.periodControl.shouldDoNextPeriod, 100)
  }

  /* Increments seconds if the clocks running */
  function shouldUpdateSeconds () {
    if(ls.isRunning) return ls.updateSeconds()
  }

  /* Toggles the clock runner */
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