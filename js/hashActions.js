pull.component('hashActions', function () {

  var s = this
  var g = s.generic
  var actions = {}

  return [
    createActionListener
  , doHashAction
  , addAction
  ]

  /* Returns the hash from a URL */
  function getHash (url) {
    return g.nth(url.split('#'), 1)
  }

  /* Clears a hash from a URL */
  function clearHash (url) {
    return g.nth(url.split('#'), 0) + '#'
  }

  /* Adds a new hash action */
  function addAction (name, action) {
    if(!actions[name]) actions[name] = action
  }

  /* do a hashAction */
  function doHashAction (actionName) {
    if(actions[actionName]) return actions[actionName]()
    return false
  }

  /* Creates a hashchange eventlistener and triggers actions */
  function createActionListener () {
    addEventListener('hashchange', function () {
      doHashAction(getHash(location.href))
      location.href = clearHash(location.href)
    })
  }
}, [
  'generic'
])