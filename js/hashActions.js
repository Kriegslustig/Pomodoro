pull.component('hashActions', function () {

  var s = this
  var g = s.generic
  var actions = {}

  return [
    createActionListener
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
    return !actions[name] ? actions[name] = action : false
  }

  /* do a hashAction */
  function doHashAction (actionName) {
    if(actions[actionName]) return actions[actionName]()
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