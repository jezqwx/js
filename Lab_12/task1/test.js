const MyLib = require('./modules/commonjs/MyLib');

console.log(MyLib.utils.array.unique([1, 1, 2, 3]));
console.log(MyLib.utils.string.capitalize('hello'));