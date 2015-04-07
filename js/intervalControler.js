/*
  Some helpers for the creation of intervals
*/

pull.component('intervalControler', function () {

  var allDamnIntervals = {}

  return [
    newInterval
  , killInterval
  ]

  /* clear the old one running under that id and */
  function newInterval (intervalId, callback, interval, uniqueifyId) {
    if(uniqueifyId) intervalId = uniqueify(intervalId)
    killInterval(intervalId)
    return allDamnIntervals[intervalId] = setInterval(callback, interval)
  }

  /* Clears an interval with the given name */
  function killInterval (intervalId) {
    return !( allDamnIntervals[intervalId]
      && clearInterval(allDamnIntervals[intervalId])
      && (allDamnIntervals[intervalId] = undefined)
    )
  }

  /* Checks if an interval exsists */
  function has (intervalId) {
    return !!allDamnIntervals[intervalId]
  }

  /* Makes an intervalId unique */
  function uniqueify (intervalId) {
    idSuffix = 0
    while (has(intervalId + idSuffix)) idSuffix++
    return intervalId + idSuffix
  }

}, [])