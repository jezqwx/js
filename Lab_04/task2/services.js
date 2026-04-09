MyApp.Services = (function (Config, Utils, Storage) {
  // ====== PRIVATE STATE (вместо глобальных переменных)
  var _products = [];
  var _cart = [];
  var _user = null;

  // ====== PRIVATE HELPERS
  function _logProducts() {
    console.log(" Products updated . Total : " + _products.length);
  }

  function _logCart() {
    console.log(" Cart updated . Items : " + _cart.length);
  }

  function _logUser() {
    if (_user) {
      console.log(" User : " + _user.name + " ( " + _user.email + " ) ");
    }
  }

  function _findProduct(productId) {
    for (var i = 0; i < _products.length; i++) {
      if (_products[i].id === productId) return _products[i];
    }
    return null;
  }

  function _subtotal() {
    var total = 0;
    for (var i = 0; i < _cart.length; i++) {
      total += _cart[i].price * _cart[i].quantity;
    }
    return total;
  }

  function _tax(amount) {
    return amount * Config.get("taxRate");
  }

  function _shipping(amount) {
    // legacy: если amount > 50 => 0 иначе shippingCost
    return amount > Config.get("freeShippingThreshold") ? 0 : Config.get("shippingCost");
  }

  function _total() {
    var sub = _subtotal();
    var t = _tax(sub);
    var sh = _shipping(sub);
    return sub + t + sh - Config.get("discount");
  }

  function _printTotals() {
    var sub = _subtotal();
    var t = _tax(sub);
    var sh = _shipping(sub);
    var disc = Config.get("discount");
    var tot = sub + t + sh - disc;

    console.log(" Subtotal : " + Utils.formatMoney(sub));
    console.log(" Tax : " + Utils.formatMoney(t));
    console.log(" Shipping : " + Utils.formatMoney(sh));
    console.log(" Discount : " + Utils.formatMoney(disc));
    console.log(" Total : " + Utils.formatMoney(tot));
  }

  function _generateOrderId() {
    return " ORD - " + Date.now();
  }

  // ====== PUBLIC API (разделено по сервисам, но в одном модуле для лабораторной)

  var ProductService = {
    add: function (id, name, price, category) {
      if (!Utils.validatePrice(price)) return false;

      var product = { id: id, name: name, price: price, category: category };
      _products.push(product);

      _logProducts();
      Storage.writeProducts(_products);
      return true;
    },

    remove: function (id) {
      for (var i = 0; i < _products.length; i++) {
        if (_products[i].id === id) {
          _products.splice(i, 1);
          break;
        }
      }
      _logProducts();
      Storage.writeProducts(_products);
      return true;
    },

    list: function () {
      return _products.slice();
    },

    setAll: function (items) {
      _products = Array.isArray(items) ? items.slice() : [];
      _logProducts();
      Storage.writeProducts(_products);
    },
  };

  var CartService = {
    add: function (productId, quantity) {
      if (!Utils.validateQuantity(quantity)) return false;

      var product = _findProduct(productId);
      if (!product) return false;

      var cartItem = {
        id: productId,
        name: product.name,
        price: product.price,
        quantity: quantity,
      };

      _cart.push(cartItem);

      _logCart();
      Storage.writeCart(_cart);
      _printTotals();
      return true;
    },

    remove: function (productId) {
      for (var i = 0; i < _cart.length; i++) {
        if (_cart[i].id === productId) {
          _cart.splice(i, 1);
          break;
        }
      }
      _logCart();
      Storage.writeCart(_cart);
      _printTotals();
      return true;
    },

    clear: function () {
      _cart = [];
      _logCart();
      Storage.writeCart(_cart);
      _printTotals();
    },

    items: function () {
      return _cart.slice();
    },

    subtotal: function () {
      return _subtotal();
    },

    total: function () {
      return _total();
    },
  };

  var UserService = {
    set: function (name, email, address) {
      _user = { name: name, email: email, address: address };
      _logUser();
      Storage.writeUser(_user);
      return true;
    },

    update: function (name, email, address) {
      if (!_user) return false;
      if (name) _user.name = name;
      if (email) _user.email = email;
      if (address) _user.address = address;

      _logUser();
      Storage.writeUser(_user);
      return true;
    },

    get: function () {
      return _user ? { ..._user } : null;
    },
  };

  var SettingsService = {
    // значения меняются через Config, но обновления такие же как в legacy
    setDiscount: function (value) {
      Config.set("discount", value);
      _printTotals();
    },
    setShippingCost: function (cost) {
      Config.set("shippingCost", cost);
      _printTotals();
    },
    setTaxRate: function (rate) {
      Config.set("taxRate", rate);
      _printTotals();
    },
    setCurrency: function (newCurrency) {
      Config.set("currency", newCurrency);
      _logCart();
      _logProducts();
    },
    setLanguage: function (newLanguage) {
      Config.set("language", newLanguage);
    },
    setTheme: function (newTheme) {
      Config.set("theme", newTheme);
    },
  };

  var OrderService = {
    process: function () {
      if (!_user) {
        console.log(" User not set ");
        return false;
      }
      if (_cart.length === 0) {
        console.log(" Cart is empty ");
        return false;
      }

      var sub = _subtotal();
      var t = _tax(sub);
      var sh = _shipping(sub);
      var disc = Config.get("discount");
      var tot = sub + t + sh - disc;

      var order = {
        id: _generateOrderId(),
        user: _user,
        items: _cart.slice(),
        subtotal: sub,
        tax: t,
        shipping: sh,
        discount: disc,
        total: tot,
        date: Utils.nowISO(),
      };

      Storage.appendOrder(order);
      CartService.clear();
      return order;
    },
  };

  var AppService = {
    initialize: function () {
      _products = Storage.readProducts();
      _cart = Storage.readCart();
      _user = Storage.readUser();

      _logProducts();
      _logCart();
      _logUser();
      _printTotals();
    },

    // чтобы удобно тестировать (аналог example usage)
    debugState: function () {
      return {
        products: _products.slice(),
        cart: _cart.slice(),
        user: _user ? { ..._user } : null,
        config: Config.all(),
      };
    },
  };

  return {
    ProductService: ProductService,
    CartService: CartService,
    UserService: UserService,
    SettingsService: SettingsService,
    OrderService: OrderService,
    AppService: AppService,
  };
})(MyApp.Config, MyApp.Utils, MyApp.Storage);