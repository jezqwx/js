class CacheManager {
  static instance;

  constructor(maxSize = 100) {
    if (CacheManager.instance) {
      return CacheManager.instance;
    }

    if (typeof maxSize !== 'number' || maxSize <= 0) {
      throw new Error('maxSize должен быть положительным числом');
    }

    this.cache = new Map();
    this.maxSize = maxSize;

    CacheManager.instance = this;
  }

  get(key) {
    return this.cache.has(key) ? this.cache.get(key) : null;
  }

  set(key, value) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, value);
  }

  clear() {
    this.cache.clear();
  }

  size() {
    return this.cache.size;
  }
}

export default CacheManager;