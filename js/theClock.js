/*
  Functions to create a clock
*/

pull.component('theClock', function () {

  var s = this
  var dom = s.domManipulation
  var ls = s.localStorageAdapter

  return [
    createAClock
  ]

  /* Creates a wrapper, a delimiter, a minutes and a seconds element */
  function createAClock (parentElement) {
    dom.appendChildrenTo(parentElement, dom.createAnElement('p', [
      dom.createAnElement('span', '00', 'clockMinutes', false)
    , dom.createAnElement('span', ':', 'clockDelimiter', false)
    , dom.createAnElement('span', '00', 'clockSeconds', false)
    ], 'clock'))
    dom.appendChildrenTo(parentElement, s.clockElements.createLabels(s.periodControl.getCurrentPeriod().label, ls.getCurrentRun()))
    dom.appendChildrenTo(parentElement, s.clockElements.createControls())
    dom.appendChild(parentElement, s.backgroundAnimation.createBackgroundElement())
    dom.appendChild(parentElement, s.audioAlert.createAlertElement())
  }
}, [
  'generic'
, 'domManipulation'
, 'localStorageAdapter'
, 'periodControl'
, 'clockElements'
, 'backgroundAnimation'
, 'audioAlert'
])