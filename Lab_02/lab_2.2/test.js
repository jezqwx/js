import CacheManager from './CacheManager.js';

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const cache = new CacheManager(2);

cache.clear();

cache.set('x', 10);
cache.set('y', 20);

assert(cache.get('x') === 10, 'Ошибка получения значения');
assert(cache.size() === 2, 'Ошибка размера кэша');

cache.set('z', 30);

assert(cache.size() === 2, 'Ошибка удаления старого значения');
assert(cache.get('x') === null, 'Старое значение не удалено');

console.log('Все тесты пройдены успешно');