MyApp.Config = (function () {

  var _settings = {
    shippingCost: 5,
    taxRate: 0.08,
    discount: 0,
    currency: "USD",
    language: "en",
    theme: "light",
    freeShippingThreshold: 50,
  };

  return {
    get: function (key) {
      return _settings[key];
    },
    set: function (key, value) {
      _settings[key] = value;
    },
    all: function () {
      var copy = {};
      for (var k in _settings) copy[k] = _settings[k];
      return copy;
    },
  };
})();