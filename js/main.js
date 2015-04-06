pull.component('main', function () {

  var s = this
  var g = s.generic
  var ls = s.localStorageAdapter

  return [
    initSyncs
  , initializeClock
  ]

  /* Inializes the sync between DOM and localstorage */
  function initSyncs () {
    ls.syncLocalStorageTo('currentPeriodSeconds', s.clockUpdater.recalculateMinutes)
    ls.syncLocalStorageTo('currentPeriodSeconds', s.clockUpdater.recalculateSeconds)
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
    s.theClock.createAClock(document.body)
    initSyncs()
    ls.removeRunning()
  }

  /* Adds all hashactions */
  function addHashActions () {
    s.hashActions.addAction('toggleRun', s.clockRunKiller.toggleRun)
    s.hashActions.addAction('skip', s.periodControl.nextPeriod)
    s.hashActions.addAction('resetCurrentTime', s.clockRunKiller.resetRunTime)
    s.hashActions.addAction('fullReset', s.clockRunKiller.kickOff)
  }

}, [
  'generic'
, 'theClock'
, 'localStorageAdapter'
, 'clockElements'
, 'backgroundAnimation'
, 'clockUpdater'
, 'audioAlert'
, 'periodControl'
, 'clockRunKiller'
, 'hashActions'
])