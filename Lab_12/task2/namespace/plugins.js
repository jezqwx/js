(function () {
  'use strict';

  if (typeof MyApp === 'undefined') {
    throw new Error('MyApp namespace must be defined first');
  }

  MyApp.namespace('plugins');
  MyApp.namespace('plugins.storage');
  MyApp.namespace('plugins.validation');

  MyApp.plugins = MyApp.plugins || {};
  MyApp.plugins.storage = MyApp.plugins.storage || {};
  MyApp.plugins.validation = MyApp.plugins.validation || {};

  // ===== Storage plugin =====
  MyApp.plugins.storage.local = {
    set: function (key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        console.warn('LocalStorage not available:', e);
        return false;
      }
    },

    get: function (key) {
      try {
        var item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (e) {
        console.warn('LocalStorage not available:', e);
        return null;
      }
    },

    remove: function (key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (e) {
        return false;
      }
    }
  };

  // ===== Validation plugin =====
  MyApp.plugins.validation.isEmail = function (value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  MyApp.plugins.validation.isPhone = function (value) {
    return /^\+?[\d\s-]{10,}$/.test(value);
  };

  // ===== Register plugin function =====
  MyApp.plugins.register = function (namespace, plugin) {
    var parts = namespace.split('.');
    var current = MyApp;

    for (var i = 0; i < parts.length; i++) {
      if (!current[parts[i]]) {
        current[parts[i]] = {};
      }
      current = current[parts[i]];
    }

    Object.keys(plugin).forEach(function (key) {
      current[key] = plugin[key];
    });
  };
})();