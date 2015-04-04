/* Updates the view to display the current period */
function updatePeriodDisplay () {
  updateBodyAttribute(getCurrentPeriodName())
  updatePeriodLabel(getCurrentPeriodName())
}

/* Updates the body Attribute to be the current periods name */
function updateBodyAttribute (currentPeriod) {
  document.body.setAttribute('data-currentperiod', currentPeriod)
}

/* Updates the period label */
function updatePeriodLabel (currentPeriod) {
  document.getElementsByClassName('periodLabel')[0].innerHTML = getPeriod(currentPeriod).label
}