var godDamnState = {
  fuckingIntervalId: false
}

/* kills the active clock runner */
function killClock () {
  if(godDamnState.fuckingIntervalId) clearInterval(godDamnState.fuckingIntervalId)
  return godDamnState.fuckingIntervalId = false
}

/* increments seconds in localstorage */
function incrementSeconds () {
  setSeconds(getSeconds() + 1)
}

/* starts the interval to increment on clock */
function startSecondInterval () {
  godDamnState.fuckingIntervalId = setInterval(incrementSeconds, 1000)
}

/* Resets an interval to increment Seconds */
function startCounter () {
  killClock()
  startSecondInterval()
}

/* Starts clock at 0 */
function theBeginningOfTime () {
  setSeconds(0)
  startCounter()
}

/* Toggles the clock run */
function toggleRun () {
  return godDamnState.fuckingIntervalId ? killClock() : startCounter()
}