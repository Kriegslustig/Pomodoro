pull.component('clockUpdater', function () {

  var s = this
  var g = s.generic
  var dom = s.domManipulation
  var ls = s.localStorageAdapter

  return [
    addZeroPadding
  , updateMinutes
  , recalculateMinutes
  , recalculateSeconds
  ]

  /* Adds zero padding to a number */
  function addZeroPadding (number, maxWidth) {
    return g.genStr('0', (maxWidth || 2) - number.toString().length) + number
  }

  /* Updates the minutes DOM-Element */
  function updateMinutes (newValue) {
    return dom.setElementInnerHTML('clockMinutes', newValue)
  }

  /* Updates the seconds DOM-Element */
  function updateSeconds (newValue) {
    return dom.setElementInnerHTML('clockSeconds', newValue)
  }

  /* calculates and updates minutes */
  function recalculateMinutes (currentPeriodSeconds) {
    updateMinutes(addZeroPadding(s.periodControl.getCurrentPeriodLength() - 1 - Math.floor(currentPeriodSeconds / 60)))
  }

  /* calculates and updates seconds */
  function recalculateSeconds (currentPeriodSeconds) {
    updateSeconds(addZeroPadding(59 - currentPeriodSeconds % 60))
  }
}, [
, 'generic'
, 'domManipulation'
, 'localStorageAdapter'
, 'periodControl'
])