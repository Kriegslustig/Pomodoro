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
  function newInterval (intervalId, callback, interval) {
    killInterval(intervalId)
    return allDamnIntervals[intervalId] = setInterval(callback, interval)
  }

  function killInterval (intervalId) {
    if(allDamnIntervals[intervalId]) allDamnIntervals[intervalId] =clearInterval(allDamnIntervals[intervalId])
    return intervalId
  }

  function has (intervalId) {
    return !!allDamnIntervals[intervalId]
  }

}, [
  'generic'
])