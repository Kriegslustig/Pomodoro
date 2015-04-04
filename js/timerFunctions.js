var godDamnState = {
  fuckingRunnerIntervalId: false
, periodCheckerIntervalId: false
}

/* clear the old one running under that id and */
function newInterval (intervalId, callback, interval) {
  if(intervalId) clearInterval(intervalId)
  return setInterval(callback, interval)
}

/* kills the active clock runner */
function killClock () {
  if(godDamnState.fuckingRunnerIntervalId) clearInterval(godDamnState.fuckingRunnerIntervalId)
  return godDamnState.fuckingRunnerIntervalId = false
}

/* increments seconds in localstorage */
function incrementSeconds () {
  setSeconds(getSeconds() + 1)
}

/* starts the interval to increment on clock */
function startSecondInterval () {
  godDamnState.fuckingRunnerIntervalId = setInterval(incrementSeconds, 1000)
}

/* Resets an interval to increment Seconds */
function startCounter () {
  godDamnState.fuckingRunnerIntervalId = newInterval(godDamnState.fuckingRunnerIntervalId, incrementSeconds, 1000)
  godDamnState.periodCheckerIntervalId = newInterval(godDamnState.periodCheckerIntervalId, shouldDoNextPeriod, 100)
}

/* Starts clock at 0 */
function theBeginningOfTime () {
  setSeconds(0)
  startCounter()
}

/* Toggles the clock run */
function toggleRun () {
  return godDamnState.fuckingRunnerIntervalId ? killClock() : startCounter()
}