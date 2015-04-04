/*
  Creates a background element which grows as time passes
*/

/* Create the graphical element */
function createBackgroundElement () {
  return createAnElement('div', '', 'clock__animation')
}

/* calculates the height of the backgroundElement */
function calcBackgroundHeight (currentPeriodSeconds) {
  return ((100 / (getCurrentPeriodLength() * 60 / currentPeriodSeconds) - 100) * -1) + '%'
}

/* Updates the height of the fancy background element */
function updateBackgroundHeight (currentPeriodSeconds) {
  setStyle(getElement('clock__animation'), 'height', calcBackgroundHeight(currentPeriodSeconds))
}