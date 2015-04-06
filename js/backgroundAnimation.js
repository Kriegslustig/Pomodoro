/*
  Creates a background element which grows as time passes
*/

pull.component('backgroundAnimation', function () {

  var s = this
  var dom = s.domManipulation

  return [
    createBackgroundElement
  , calcBackgroundHeight
  , updateBackgroundHeight
  ]

  /* Create the graphical element */
  function createBackgroundElement () {
    return dom.createAnElement('div', '', 'clock__animation')
  }

  /* calculates the height of the backgroundElement */
  function calcBackgroundHeight (currentPeriodSeconds, currentPeriodLength) {
    return ((100 / (currentPeriodLength * 60 / currentPeriodSeconds) - 100) * -1) + '%'
  }

  /* Updates the height of the fancy background element */
  function updateBackgroundHeight (currentPeriodSeconds, currentPeriodLength) {
    dom.setStyle(dom.getElement('clock__animation'), 'height', calcBackgroundHeight(currentPeriodSeconds, currentPeriodLength))
  }
}, [
  'generic'
, 'domManipulation'
])