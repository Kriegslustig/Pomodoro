/*
  Provides an interface to actions that should be triggered when the URL hash is equal to a keyword
*/

pull.component('actionButton', function () {

  var s = this
  var g = s.generic
  var dom = s.domManipulation

  return [
    addAction
  ]

  /* Returns an actionButtonElement */
  function getButton (actionName) {
    return dom.getElement('actionButton--' + actionName)
  }

  /* Checks if an actionButton exsists */
  function doesActionButtonExsist (actionName) {
    return !!getButton(actionName)
  }

  /* adds  */
  function hookUp (actionName, action) {
    return dom.onInteract(getButton(actionName), action)
  }

  /* Adds hooks up an actionbutton */
  function addAction (actionName, action) {
    return doesActionButtonExsist(actionName) ? hookUp(actionName, action) : false
  }

}, [
  'generic'
, 'domManipulation'
])