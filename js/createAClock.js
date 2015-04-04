/*
  Functions to create a clock
*/

/* Sets the className attribute to the passed value */
function giveClass (element, className) {
  return setAttribute(element, 'className', className)
}

/* appends a single DOMNode or string to a parentElement */
function appendChild (parent, child) {
  parent.appendChild(typeof child == 'string' ? document.createTextNode(child) : child)
  return parent
}

/* Appends one or more Strings or DOMNodes to a parentElement */
function appendChildrenTo (parentElement, children) {
  ;[].concat(children).forEach(function (child) {
    appendChild(parentElement, child)
  })
  return parentElement
}

/* Creates a new DOM-Element appends content to it and sets it's className */
function createAnElement (elementName, content, newClass) {
  return appendChildrenTo(giveClass(document.createElement(elementName), newClass), content)
}

/* Creates a wrapper, a delimiter, a minutes and a seconds element */
function createAClock (parentElement) {
  appendChildrenTo(parentElement, createAnElement('p', [createAnElement('span', '00', 'clockMinutes', false), createAnElement('span', ':', 'clockDelimiter', false), createAnElement('span', '00', 'clockSeconds', false)], 'clock'))
  appendChildrenTo(parentElement, createLabels())
  appendChildrenTo(parentElement, createControls())
  appendChild(parentElement, createBackgroundElement())
  appendChild(parentElement, createAlertElement())
}