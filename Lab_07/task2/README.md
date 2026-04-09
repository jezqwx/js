# Task 2: Factory Pattern
## Универсальная система уведомлений

### Описание

В этом задании реализован паттерн Factory для централизованного создания объектов уведомлений.  
Фабрика позволяет создавать Email, SMS и Push уведомления через единый интерфейс.

---

## Цели

- Реализовать класс NotificationFactory
- Инкапсулировать создание объектов
- Поддержать несколько типов уведомлений
- Обработать неизвестные типы

---

## Компоненты

### NotificationFactory.js
- Метод `create(type, options)`
- Метод `getSupportedTypes()`
- Обработка ошибок

### notifications/
- EmailNotification
- SMSNotification
- PushNotification
- Общий метод `send(message)`

### app.js
- Демонстрация использования фабрики
- Отправка разных типов уведомлений
- Проверка обработки ошибок

---

## Архитектура

| Элемент | Назначение |
|----------|------------|
| Factory | Создание объектов |
| EmailNotification | Отправка email |
| SMSNotification | Отправка SMS |
| PushNotification | Push-уведомления |

---

## Поддерживаемые типы

```javascript
NotificationFactory.getSupportedTypes()
// ['email', 'sms', 'push']
```

---

## Пример
```javascript
sendNotification("email", { to: "...", subject: "Hi" }, "Message");
```

