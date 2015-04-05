pull.component('hashActions', function () {

  var s = this
  var g = s.generic

  return [
    createActionListener
  ]

  /* Returns the hash from a URL */
  function getHash (url) {
    return g.nth(url.split('#'), 1)
  }

  /* Clears a hash from a URL */
  function clearHash (url) {
    return g.nth(url.split('#'), 0) + '#'
  }

  /* do a hashAction */
  function doHashAction (actionName) {
    g.executeAttribute({
      'toggleRun': s.clockRunKiller.toggleRun
    , 'skip': s.periodControl.nextPeriod
    , 'resetCurrentTime': s.clockRunKiller.resetRunTime
    , 'fullReset': s.clockRunKiller.kickOff
    }, actionName)
  }

  /* Creates a hashchange eventlistener and triggers actions */
  function createActionListener () {
    addEventListener('hashchange', function () {
      doHashAction(getHash(location.href))
      location.href = clearHash(location.href)
    })
  }
}, [
  'generic'
, 'periodControl'
, 'clockRunKiller'
])