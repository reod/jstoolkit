(function(global){
    
  'use strict';

  var jsT = {

    defaults: {
      measureRepeat: 100
    },

    init: function() {
      console.clear();
      this.setGlobals();
    },

    setGlobals: function() {
      if(global.l || global.jsT) {
        throw new VariableNameConflictError();
      }
        
      global.l = this.log;
      global.jsT = this;
    },

    log: function() {
      console.log.apply(console, arguments)
    },

    measure: function(fnToTest, howManyTimes) {
      var start = performance.now(),
      howManyTimes = howManyTimes || this.defaults.measureRepeat;

      for (var i = 0; i < howManyTimes; i++) {
        fnToTest();
      }

      var end = performance.now(),
        executionTime = end - start,
        output = this.getFunctionName(fnToTest) + ":  " + executionTime + "ms.";

      this.log(output);
      return output;
    },

    getFunctionName: function(fn) {
      return fn.name || getFromToString(fn) || "anonymous";

      function getFromToString(fn) {
        var ret = fn.toString();
        ret = ret.substr('function '.length);
        ret = ret.substr(0, ret.indexOf('('));
      }
    }
  };

  function VariableNameConflictError(message) {
    this.name = 'VariableNameConflictError';
    this.message = message || 'Variable name conflict in global scope.';
  }

  VariableNameConflictError.prototype = Object.create(Error.prototype);
  VariableNameConflictError.prototype.constructor = VariableNameConflictError;


  jsT.init();

})(window);