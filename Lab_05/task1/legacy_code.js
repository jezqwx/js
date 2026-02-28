var taxRate = 0.08;
var currency = "USD";

function Product(id, title, price) {
  this.id = id;
  this.title = title;
  this.price = price;
}

function Cart() {
  this.products = [];
}

Cart.prototype.add = function(product, qty) {
  this.products.push({
    item: product,
    quantity: qty
  });
}

Cart.prototype.subtotal = function() {
  var sum = 0;
  for (var i = 0; i < this.products.length; i++) {
    sum += this.products[i].item.price * this.products[i].quantity;
  }

  return sum;
}

Cart.prototype.tax = function() {
  return this.subtotal() * taxRate;
}

Cart.prototype.total = function() {
  return this.subtotal() + this.tax();
}

function format(amount) {
  return currency + " " + amount.toFixed(2);
}

// Example usage:
var cart = new Cart();
var product1 = new Product(1, "Book", 10);
var product2 = new Product(2, "Pen", 2);

cart.add(product1, 2);
cart.add(product2, 5);

console.log("Subtotal: " + format(cart.subtotal()));
console.log("Tax: " + format(cart.tax()));
console.log("Total: " + format(cart.total()));
