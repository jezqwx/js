import CacheManager from './CacheManager.js';

const cache1 = new CacheManager(3);
const cache2 = new CacheManager();

cache1.set('a', 1);
cache1.set('b', 2);
cache1.set('c', 3);

console.log(cache2.get('a'));
console.log(cache2.size());