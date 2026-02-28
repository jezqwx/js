(function (Services) {
  console.log("Приложение запущено...");

  Services.AppService.initialize();

  // товары
  Services.ProductService.add(1, " Laptop ", 999.99, " Electronics ");
  Services.ProductService.add(2, " Mouse ", 29.99, " Electronics ");
  Services.ProductService.add(3, " Keyboard ", 79.99, " Electronics ");

  // пользователь (email оставил как в legacy: "john@example . com" содержит " . " и пробелы)
  Services.UserService.set(" John Doe ", " john@example . com ", "123 Main St ");

  // корзина
  Services.CartService.add(1, 1);
  Services.CartService.add(2, 2);
  Services.CartService.add(3, 1);

  // скидка
  Services.SettingsService.setDiscount(50);

  // заказ
  var order = Services.OrderService.process();
  console.log(" Order processed :", order);
})(MyApp.Services);