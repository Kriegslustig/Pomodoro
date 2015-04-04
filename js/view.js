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
  setElementInnerHTML('clock__label--period', getPeriod(currentPeriod).label)
}

/* updates the nthRun label */
function updateNthRunLabel (nthRun) {
  setElementInnerHTML('clock__nthRun', nthRun)
}

/* Creates the period and the nthPeriod label */
function createLabels (parentElement) {
  return [
    createAnElement('p', 'Run', bemify('clock__label--period')),
    createAnElement('p', [
      'Run Nr.: '
      , createAnElement('span', '1', 'clock__nthRun')
    ], bemify('clock__label--nthRun'))
  ]
}

/* Creates controls for */
function createControls () {
  return [
    setAttribute(createAnElement('a', 'Start', bemify('clock__control--toggleRun')), 'href', '#toggleRun'),
    setAttribute(createAnElement('a', 'Skip', bemify('clock__control--skip')),'href', '#skip'),
    setAttribute(createAnElement('a', 'Reset Current Period', bemify('clock__control--resetCurrentTime')), 'href', '#resetCurrentTime'),
    setAttribute(createAnElement('a', 'Full Reset', bemify('clock__control--fullReset')), 'href', '#fullReset')
  ]
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
