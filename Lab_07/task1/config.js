const storage = {};

const Config = {
  get(key) {
    return storage[key];
  },

  set(key, value) {
    storage[key] = value;
  },

  getAll() {
    return {...storage};
  }
};

export default Config;