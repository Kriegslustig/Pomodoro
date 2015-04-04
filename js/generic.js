/*
  General purpos functions
*/

/* checks if a string or an array has some content */
function contains (thing, content) {
  return thing.indexOf(content) > -1 ? true : false
}

/* Sets an ettribute of an object and returns the new value */
function setAttribute (thing, attribute, value) {
  thing[attribute] = value
  return thing
}

/* Returns the nth position in an array */
function nth (array, position) {
  return array[position] ? array[position] : 'undefined'
}

/* Executes a function if it exsists */
function executeAttribute (dictionary, index) {
  return dictionary[index] ? dictionary[index]() : undefined
}

/* Generates an array with the given lenth where every position has the given content */
function genArr (content, length) {
  var returnArr = []
  for(var ind = 0; ind < length; ind++) {
    returnArr.push(content)
  }
  return returnArr
}

/* Generates a string of the given length with the given content */
function genStr (content, length) {
  return genArr(content, length).join('')
}

/* Sets the content of an element to the passed value and returns it */
function setElementInnerHTML (className, newValue) {
  return (document.getElementsByClassName(className)[0].innerHTML = newValue)
}

/* Transforms a className to match the BEM-pattern */
function bemify (someClass) {
  return contains(someClass, '--') ? nth(someClass.split('--'), 0) + ' ' + someClass : someClass
}