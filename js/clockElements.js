pull.component('clockElements', function () {

  var s = this
  var g = s.generic
  var dom = s.domManipulation
  var ls = s.localStorageAdapter

  return [
    updatePeriodDisplay
  , updateBodyAttribute
  , updatePeriodLabel
  , updateNthRunLabel
  , updateToggleRunButton
  , createLabels
  , createControls
  ]

  /* Updates the view to display the current period */
  function updatePeriodDisplay () {
    updateBodyAttribute(ls.getCurrentPeriodName())
    updatePeriodLabel(ls.getCurrentPeriodName())
  }

  /* Updates the body Attribute to be the current periods name */
  function updateBodyAttribute (currentPeriod) {
    document.body.setAttribute('data-currentperiod', currentPeriod)
  }

  /* Updates the period label */
  function updatePeriodLabel (currentPeriod) {
    dom.setElementInnerHTML('clock__label--period', s.config[currentPeriod].label)
  }

  /* updates the nthRun label */
  function updateNthRunLabel (nthRun) {
    dom.setElementInnerHTML('clock__nthRun', nthRun)
  }

  function updateToggleRunButton (running) {
    dom.setElementInnerHTML('actionButton--toggleRun', (running ? 'Stop' : 'Start'))
  }

  /* Creates the period and the nthPeriod label */
  function createLabels (currentPeriodLabel, nthRun) {
    return [
      dom.createAnElement('p', currentPeriodLabel, dom.bemify('clock__label--period')),
      dom.createAnElement('p', [
        'Run Nr.: '
        , dom.createAnElement('span', nthRun, 'clock__nthRun')
      ], dom.bemify('clock__label--nthRun'))
    ]
  }

  /* Creates controls for */
  function createControls () {
    return [
      g.setAttribute(dom.createAnElement('a', 'Start', dom.bemify('actionButton--toggleRun')), 'href', 'javascript:void(0)'),
      g.setAttribute(dom.createAnElement('a', 'Skip', dom.bemify('actionButton--skip')), 'href', 'javascript:void(0)'),
      g.setAttribute(dom.createAnElement('a', 'Reset Current Period', dom.bemify('actionButton--resetCurrentTime')), 'href', 'javascript:void(0)'),
      g.setAttribute(dom.createAnElement('a', 'Full Reset', dom.bemify('actionButton--fullReset')), 'href', 'javascript:void(0)')
    ]
  }
}, [
  'generic'
, 'config'
, 'domManipulation'
, 'localStorageAdapter'
])
