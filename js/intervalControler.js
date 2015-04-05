pull.component('intervalControler', function () {
  return [
    newInterval
  , killInterval
  ]

  var allDamnIntervals = {}

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