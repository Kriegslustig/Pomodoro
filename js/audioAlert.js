/*
  This add a audio alert to
*/

pull.component('audioAlert', function () {

  var s = this
  var g = s.generic
  var dom = s.domManipulation

  return [
    createAlertElement
  , audioAlert
  ]

  /* Creates a audio-element that plays the alert sound */
  function createAlertElement () {
    return g.setAttribute(dom.createAnElement('audio', '', 'clock__alert'), 'src', s.config.audioAlert)
  }

  /* tiggers the audio element to play */
  function audioAlert () {
    dom.getElement('clock__alert').load()
    dom.getElement('clock__alert').play()
  }
}, [
  'config'
, 'generic'
, 'domManipulation'
])