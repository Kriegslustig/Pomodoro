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

/* Creates the periodLabel */
function createPeriodLabel (parentElement) {
  return createAnElement('p', 'Run', 'periodLabel')
}

/* Creates controls for */
function createControls () {
  return [setAttribute(createAnElement('a', 'Start', 'clock__runToggle'), 'href', '#toggleRun'), setAttribute(createAnElement('a', 'Skip', 'clock__runToggle'), 'href', '#skip'), setAttribute(createAnElement('a', 'Reset Current Period', 'clock__runToggle'), 'href', '#resetCurrentTime'), setAttribute(createAnElement('a', 'Full Reset', 'clock__runToggle'), 'href', '#fullReset')]
}

/* Returns the hash from a URL */
function getHash (url) {
  return nth(url.split('#'), 1)
}

/* Clears a hash from a URL */
function clearHash (url) {
  return nth(url.split('#'), 0) + '#'
}

/* do a hashAction */
function doHashAction (actionName) {
  executeAttribute({
    'toggleRun': toggleRun
  , 'skip': nextPeriod
  , 'resetCurrentTime': theBeginningOfTime
  , 'fullReset': kickOff
  }, actionName)
}

/* Creates a hashchange eventlistener and triggers actions */
function createActionListener () {
  addEventListener('hashchange', function () {
    doHashAction(getHash(location.href))
    location.href = clearHash(location.href)
  })
}
