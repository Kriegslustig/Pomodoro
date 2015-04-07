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
    return (
      dom.getElement('clock__alert').play()
      && dom.getElement('clock__alert').load()
    )
  }
}, [
  'config'
, 'generic'
, 'domManipulation'
])