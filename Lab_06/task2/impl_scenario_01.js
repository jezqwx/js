class AppConfig {
    constructor() {
        if (AppConfig._instance) {
            return AppConfig._instance;
        }

        this.settings = {
            apiBaseUrl: "https://api.example.com/v1",
            locale: "kk-KZ",
            featureFlags: { darkMode: true }
        };

        AppConfig._instance = this;
    }

    get(key) {
        return this.settings[key];
    }

    set(key, value) {
        this.settings[key] = value;
    }

    static getInstance() {
        if (!AppConfig._instance) {
            new AppConfig();
        }
        return AppConfig._instance;
    }
}

const cfg1 = AppConfig.getInstance();
const cfg2 = AppConfig.getInstance();

console.log("Same instance:", cfg1 === cfg2);
cfg1.set("locale", "ru-RU");
console.log("Locale from cfg2:", cfg2.get("locale"));
