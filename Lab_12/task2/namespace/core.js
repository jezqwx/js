(function (global) {
  'use strict';

  var MyApp = typeof global.MyApp === 'undefined' ? {} : global.MyApp;

  MyApp.namespace = function (ns) {
    var parts = ns.split('.');
    var current = MyApp;

    for (var i = 0; i < parts.length; i++) {
      if (!current[parts[i]]) {
        current[parts[i]] = {};
      }
      current = current[parts[i]];
    }

    return current;
  };

  // Базовые пространства имён
  MyApp.namespace('core');
  MyApp.namespace('utils');
  MyApp.namespace('utils.array');
  MyApp.namespace('utils.string');
  MyApp.namespace('utils.date');
  MyApp.namespace('utils.number');
  MyApp.namespace('plugins');

  MyApp.core = {
    version: '2.0.0',
    name: 'MyApp Library'
  };

  global.MyApp = MyApp;
})(typeof window !== 'undefined' ? window : globalThis);