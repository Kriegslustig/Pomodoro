/*
  Some helpers to interact with DOM
*/

pull.component('domManipulation', function () {

  var s = this
  var g = s.generic

  return [
    getElement
  , setElementInnerHTML
  , createAnElement
  , setStyle
  , bemify
  , giveClass
  , appendChild
  , appendChildrenTo
  ]

  /* gets a dom-node by className */
  function getElement (className) {
    return document.getElementsByClassName(className)[0]
  }

  /* Creates a new DOM-Element appends content to it and sets it's className */
  function createAnElement (elementName, content, newClass) {
    return appendChildrenTo(giveClass(document.createElement(elementName), newClass), content)
  }

  /* Sets the content of an element to the passed value and returns it */
  function setElementInnerHTML (className, newValue) {
    return (getElement(className).innerHTML = newValue)
  }

  /* Sets some style and returns the element */
  function setStyle (element, attribute, value) {
    g.setAttribute(element.style, attribute, value)
    return element
  }

  /* Transforms a className to match the BEM-pattern */
  function bemify (someClass) {
    return g.contains(someClass, '--') ? g.nth(someClass.split('--'), 0) + ' ' + someClass : someClass
  }

  /* Sets the className attribute to the passed value */
  function giveClass (element, className) {
    return g.setAttribute(element, 'className', className)
  }

  /* appends a single DOMNode or string to a parentElement */
  function appendChild (parent, child) {
    parent.appendChild(child instanceof HTMLElement ? child : document.createTextNode(child))
    return parent
  }

  /* Appends one or more Strings or DOMNodes to a parentElement */
  function appendChildrenTo (parentElement, children) {
    ;[].concat(children).forEach(function (child) {
      appendChild(parentElement, child)
    })
    return parentElement
  }
}, [
  'generic'
])