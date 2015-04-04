/*
  This add a audio alert to
*/

/* Creates a audio-element that plays the alert sound */
function createAlertElement () {
  return setAttribute(createAnElement('audio', '', 'clock__alert'), 'src', config.audioAlert)
}

/* tiggers the audio element to play */
function audioAlert () {
  getElement('clock__alert').load()
  getElement('clock__alert').play()
}