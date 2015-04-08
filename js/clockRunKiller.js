/*
  Some kind of a controler for the clockrunner
*/

pull.component('clockRunKiller', function () {

  var s = this
  var g = s.generic
  var ls = s.localStorageAdapter

  return [
    kickOff
  , toggleRun
  , isMaster
  , makeMaster
  ]

  /* Initializes a new counter */
  function kickOff () {
    makeMaster()
    s.periodControl.newPeriod('run')
    ls.resetState()
    ls.setRunning(true)
  }

  /* Checks if a client is master */
  function isMaster () {
    return (
      s.intervalControler.has('secondIncrement')
      && s.intervalControler.has('shouldDoNextPeriod')
    )
  }

  /* Makes a client the owner of the second counter  */
  function makeMaster () {
    return (
      s.intervalControler.newInterval('secondIncrement', shouldUpdateSeconds, 1000)
      && s.intervalControler.newInterval('shouldDoNextPeriod', s.periodControl.shouldDoNextPeriod, 100)
    )
  }

  /* Increments seconds if the clocks running */
  function shouldUpdateSeconds () {
    if(ls.isRunning()) return ls.updateSeconds()
  }

  /* Toggles the clock runner */
  function toggleRun () {
    var newState = !ls.isRunning()
    makeMaster()
    ls.setRunning(newState)
    if(newState) ls.recalculateStartingTime()
    return newState
  }

}, [
  'generic'
, 'intervalControler'
, 'localStorageAdapter'
, 'periodControl'
])