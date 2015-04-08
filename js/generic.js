/*
  General purpos functions
*/
pull.component('generic', function () {
  return [
    contains
  , setAttribute
  , executeAttribute
  , nth
  , genArr
  , genStr
  , addZeroPadding
  , callWith
  ]

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

  /* Adds zero padding to a number */
  function addZeroPadding (number, maxWidth) {
    return genStr('0', (maxWidth || 2) - number.toString().length) + number
  }

  // Returns a function that calls a given function with the defined parameters
  function callWith (func /* args */) {
    var args = _.rest(arguments)
    return function (/* passedArgs */) {
      var passedArgs = arguments
      func.apply(null,
        args.map(function (value) {
          if(typeof value == 'string') console.log(passedArgs)
          return (
            typeof value == 'string'
            && value[0] == '$'
            && passedArgs[parseInt(value.substring(1))]
          ) || value
        })
      )
    }
  }

}, [])