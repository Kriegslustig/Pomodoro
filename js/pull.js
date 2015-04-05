/*
  A super simple componentization system
*/

var pull = (function () {
  var app = {}
  var que = []

  /* Creates a component */
  function createComponent (componentName, createFunctionsArray, deps) {
    var asAnObject = {}
    createFunctionsArray.call(getBindable(deps)).forEach(function (value) {
      if(typeof value == 'function') asAnObject[value.name] = value
    })
    app[componentName] = asAnObject
    checkQue()
    return app[componentName]
  }

  /* converts an array of component names to an object with these components */
  function getBindable (someArray) {
    var compDict = {}
    someArray.forEach(function (value, index) {
      compDict[value] = app[value]
    })
    return compDict
  }

  /* checks if all dependencies are ok */
  function depsOk (depsArr) {
    return !returnUnDeps(depsArr)
  }

  /* Log dependencies as missing */
  function logAsMissing(depsArr, componentName) {
    if(!depsArr) return true
    depsArr.forEach(function (dep) {
      console.log('pull.js - ERROR ' + componentName + ' <- ' + dep)
    })
    return false
  }

  /* Returns all unmended deps */
  function returnUnDeps (depsArr) {
    var unDepsArr = []
    depsArr.forEach(function (dep) {
      if(!app[dep]) unDepsArr.push(dep)
    })
    return unDepsArr.length > 0 ? unDepsArr : false
  }

  /* Adds a component to the que */
  function queComponent (componentName, functionsArray, deps) {
    que.push({
      componentName: componentName
    , functions: functionsArray
    , deps: deps
    })
  }

  /* Checks the que for components that can be created */
  function checkQue () {
    que.forEach(function (component, index) {
      if(component && depsOk(component.deps)) {
        que[index] = undefined
        createComponent(component.componentName, component.functions, component.deps)
        console.log('pull.js - RESOLVED: ' + component.componentName)
      }
    })
  }

  return {
    /* Provides an interface to export and import function  */
    component: function (componentName, createFunctionsArray, deps) {
      if(depsOk(deps)){
        createComponent(componentName, createFunctionsArray, deps)
        console.log('pull.js - OK: ' + componentName)
      } else {
        logAsMissing(returnUnDeps(deps), componentName)
        queComponent(componentName, createFunctionsArray, deps)
      }
    }

    /* Pulls out static values */
  , staticComponent: function (componentName, someDict) {
      app[componentName] = someDict
    }

    /* Returns a component */
  , get: function (componentName) {
      if(app[componentName]) return app[componentName]
      return false
    }
  }
})()