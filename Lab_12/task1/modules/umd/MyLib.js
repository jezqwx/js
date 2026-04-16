(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.MyLib = factory();
  }
}(this, function () {

  var MyLib = {};

  // namespace
  MyLib.namespace = function (ns) {
    var parts = ns.split('.');
    var parent = MyLib;

    for (var i = 0; i < parts.length; i++) {
      if (!parent[parts[i]]) {
        parent[parts[i]] = {};
      }
      parent = parent[parts[i]];
    }

    return parent;
  };

  MyLib.namespace('utils.array');
  MyLib.namespace('utils.string');

  MyLib.utils.array.unique = function (arr) {
    return [...new Set(arr)];
  };

  MyLib.utils.string.capitalize = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return MyLib;
}));