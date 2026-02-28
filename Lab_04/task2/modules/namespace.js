var MyApp = (function (root) {
  var app = root.MyApp || {};

  app.Config = app.Config || {};
  app.Utils = app.Utils || {};
  app.Storage = app.Storage || {};
  app.Services = app.Services || {};
  app.App = app.App || {};

  return app;
})(typeof window !== "undefined" ? window : this);