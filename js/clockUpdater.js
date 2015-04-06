pull.component('clockUpdater', function () {

  var s = this
  var g = s.generic
  var dom = s.domManipulation
  var ls = s.localStorageAdapter

  return [
    updateMinutes
  , recalculateMinutes
  , recalculateSeconds
  ]

  /* Updates the minutes DOM-Element */
  function updateMinutes (newValue) {
    return dom.setElementInnerHTML('clockMinutes', newValue)
  }

  /* Updates the seconds DOM-Element */
  function updateSeconds (newValue) {
    return dom.setElementInnerHTML('clockSeconds', newValue)
  }

  /* calculates and updates minutes */
  function recalculateMinutes (currentPeriodSeconds, currentPeriodLength) {
    updateMinutes(g.addZeroPadding(currentPeriodLength - 1 - Math.floor(currentPeriodSeconds / 60)))
  }

  /* calculates and updates seconds */
  function recalculateSeconds (currentPeriodSeconds) {
    updateSeconds(g.addZeroPadding(59 - currentPeriodSeconds % 60))
  }
}, [
, 'generic'
, 'domManipulation'
, 'localStorageAdapter'
])