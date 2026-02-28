import { Product, Cart } from "./core.mjs";
import { formatPrice } from "./utils.mjs";

const cart = new Cart();

const item1 = new Product(1, "Laptop", 999.99);
const item2 = new Product(2, "Smartphone", 499.99);

cart.add(item1, 2);
cart.add(item2, 3);

console.log(`Subtotal: ${formatPrice(cart.getSubtotal())}`);
console.log(`Tax: ${formatPrice(cart.getTax())}`);
console.log(`Total: ${formatPrice(cart.getTotal())}`);