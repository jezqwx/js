import ConfigManager from "./singleton.js";
import configModule from "./config.js";

console.log("Testing Singleton Pattern with ConfigManager...");

const a = ConfigManager.getInstance();
const b = ConfigManager.getInstance();
const c = new ConfigManager();

console.log("getInstance === getInstance:", a === b); // true
console.log("new === instace:", a === c); // true

a.set("appName", "MyApp");

console.log("a:", a.get("appName")); // MyApp
console.log("b:", b.get("appName")); // MyApp
console.log("c:", c.get("appName")); // MyApp

console.log("\nTesting Module Pattern with configModule...");

configModule.set("theme", "dark");
console.log("configModule theme:", configModule.get("theme")); // dark