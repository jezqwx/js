MyApp.Storage = (function (Utils) {
  // Ключи как в legacy_code.js (с пробелами)
  var KEYS = {
    products: " products ",
    cart: " cart ",
    user: " user ",
    orders: " orders ",
  };

  function _read(key, fallback) {
    if (!Utils.isStorageAvailable()) return fallback;
    var raw = localStorage.getItem(key);
    if (!raw) return fallback;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }

  function _write(key, value) {
    if (!Utils.isStorageAvailable()) return false;
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  }

  return {
    KEYS: KEYS,
    readProducts: function () {
      return _read(KEYS.products, []);
    },
    writeProducts: function (products) {
      return _write(KEYS.products, products);
    },

    readCart: function () {
      return _read(KEYS.cart, []);
    },
    writeCart: function (cart) {
      return _write(KEYS.cart, cart);
    },

    readUser: function () {
      return _read(KEYS.user, null);
    },
    writeUser: function (user) {
      return _write(KEYS.user, user);
    },

    readOrders: function () {
      return _read(KEYS.orders, []);
    },
    appendOrder: function (order) {
      var orders = _read(KEYS.orders, []);
      orders.push(order);
      return _write(KEYS.orders, orders);
    },
  };
})(MyApp.Utils);