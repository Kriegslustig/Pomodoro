/*
  This connects all components
*/

pull.component('main', function () {

  var s = this
  var g = s.generic
  var ls = s.localStorageAdapter

  return [
    initializeClock
  ]

  /* Inializes the sync between DOM and localstorage */
  function initSyncs () {
    setInterval(function () {
      s.clockUpdater.recalculateMinutes(ls.getSeconds(), s.periodControl.getCurrentPeriodLength())
      s.clockUpdater.recalculateSeconds(ls.getSeconds())
    }, 500)
    ls.syncLocalStorageTo('currentPeriod', s.clockElements.updatePeriodDisplay)
    ls.syncLocalStorageTo('currentRun', s.clockElements.updateNthRunLabel)
    ls.syncLocalStorageTo('currentRun', s.audioAlert.audioAlert, 500, true)
    ls.syncLocalStorageTo('running', s.clockElements.updateToggleRunButton)
    ls.syncLocalStorageTo('currentPeriodSeconds', function (data) {
      s.backgroundAnimation.updateBackgroundHeight(data, s.periodControl.getCurrentPeriodLength())
    }, 10000)
  }

  /* Creates a clock and starts listening for changes in localStorage */
  function initializeClock () {
    if(!ls.getCurrentRun()) ls.resetState()
    s.theClock.createAClock(document.body)
    addHashActions()
    initSyncs()
    ls.removeRunning()
  }

  /* Adds all hashactions */
  function addHashActions () {
    s.hashActions.addAction('toggleRun', s.clockRunKiller.toggleRun)
    s.hashActions.addAction('skip', s.periodControl.nextPeriod)
    s.hashActions.addAction('resetCurrentTime', ls.resetPeriodStartingTime)
    s.hashActions.addAction('fullReset', s.clockRunKiller.kickOff)
  }

}, [
  'generic'
, 'localStorageAdapter'
, 'hashActions'
, 'audioAlert'
, 'backgroundAnimation'
, 'periodControl'
, 'clockUpdater'
, 'clockElements'
, 'theClock'
, 'clockRunKiller'
])