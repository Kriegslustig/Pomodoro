
/* Sets the content of an element to the passed value and returns it */
function setElementInnerHTML (className, newValue) {
  return (document.getElementsByClassName(className)[0].innerHTML = newValue)
}

/* Updates the minutes DOM-Element */
function updateMinutes (newValue) {
  return setElementInnerHTML('clockMinutes', newValue)
}

/* Updates the seconds DOM-Element */
function updateSeconds (newValue) {
  return setElementInnerHTML('clockSeconds', newValue)
}

/* calculates and updates minutes */
function recalculateMinutes (currentPeriodSeconds) {
  updateMinutes(Math.floor(currentPeriodSeconds / 60))
}

/* calculates and updates seconds */
function recalculateSeconds (currentPeriodSeconds) {
  updateSeconds(currentPeriodSeconds % 60)
}