/*
  Can trigger playing the `audioAlert` which is configured
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
    return true
  }
}, [
  'config'
, 'generic'
, 'domManipulation'
])