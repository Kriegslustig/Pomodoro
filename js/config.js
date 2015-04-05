pull.staticComponent('config', {
    run: {
      length: 25
    , every: 1
    , label: 'Run'
    }
  , shortBreak: {
      length: 5
    , every: 2
    , label: 'Break'
    }
  , longBreak: {
      length: 15
    , every: 8
    , label: 'Long Break'
    }
  , prioritization: ['longBreak', 'shortBreak', 'run']
  , audioAlert: 'cnt/palimpalim.ogg'
})