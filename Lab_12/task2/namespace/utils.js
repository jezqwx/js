(function () {
  'use strict';

  if (typeof MyApp === 'undefined') {
    throw new Error('MyApp namespace must be defined first');
  }

  MyApp.namespace('utils.array');
  MyApp.namespace('utils.string');
  MyApp.namespace('utils.date');
  MyApp.namespace('utils.number');

  MyApp.utils.array = MyApp.utils.array || {};
  MyApp.utils.string = MyApp.utils.string || {};
  MyApp.utils.date = MyApp.utils.date || {};
  MyApp.utils.number = MyApp.utils.number || {};

  // ===== ARRAY =====
  MyApp.utils.array.unique = function (arr) {
    return [...new Set(arr)];
  };

  MyApp.utils.array.chunk = function (arr, size) {
    var chunks = [];
    for (var i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  // ===== STRING =====
  MyApp.utils.string.capitalize = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  MyApp.utils.string.slugify = function (str) {
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // ===== DATE =====
  MyApp.utils.date.isToday = function (date) {
    var d = new Date(date);
    var today = new Date();
    return d.toDateString() === today.toDateString();
  };

  MyApp.utils.date.daysDiff = function (date1, date2) {
    var d1 = new Date(date1);
    var d2 = new Date(date2);
    var diff = Math.abs(d2 - d1);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // ===== NUMBER =====
  MyApp.utils.number.random = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  MyApp.utils.number.clamp = function (num, min, max) {
    return Math.min(Math.max(num, min), max);
  };
})();