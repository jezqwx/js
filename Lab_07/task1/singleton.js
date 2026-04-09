class ConfigManager {
  constructor() {
    if (ConfigManager._instance) {
      return ConfigManager._instance;
    }

    this._settings = {};

    ConfigManager._instance = this;
  }

  get(key) {
    return this._settings[key];
  }

  set(key, value) {
    this._settings[key] = value;
  }

  getAll() {
    return {...this._settings};
  }

  static getInstance() {
    if (!ConfigManager._instance) {
      ConfigManager._instance = new ConfigManager();
    }

    return ConfigManager._instance;
  }
}

export default ConfigManager;