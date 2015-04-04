/*
  General purpos functions
*/


/* Sets an ettribute of an object and returns the new value */
function setAttribute (thing, attribute, value) {
  thing[attribute] = value
  return thing
}

/* Returns the nth position in an array */
function nth (array, position) {
  return array[position] ? array[position] : undefined
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