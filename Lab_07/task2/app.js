import { NotificationFactory } from "./NotificationFactory.js";

function sendNotification(type, options, message) {

    try {
        const notifier = NotificationFactory.create(type, options);
        return notifier.send(message);

    } catch (err) {
        console.error("Notification error:", err.message);
        return { success: false, error: err.message };
    }
}

console.log("Supported:", NotificationFactory.getSupportedTypes());
console.log("--------------------------------");

sendNotification(
    "email",
    { to: "user@example.com", subject: "Hello" },
    "Welcome!"
);

console.log("--------------------------------");

sendNotification(
    "sms",
    { to: "+1234567890" },
    "Code: 1234"
);

console.log("--------------------------------");

sendNotification(
    "push",
    { deviceToken: "device_abc", title: "Alert" },
    "New notification"
);

console.log("--------------------------------");

// Проверка ошибки
sendNotification("telegram", { to: "@user" }, "Test");