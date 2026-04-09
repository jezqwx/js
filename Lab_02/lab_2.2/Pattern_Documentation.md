# Singleton Cache Manager Pattern

# Pattern Name
Creational Pattern

# Context
Используется в случаях, когда требуется централизованное хранение данных в памяти и доступ к ним из разных частей приложения при гарантии единственного экземпляра.

# Problem
Глобальные переменные создают неконтролируемое состояние. Несколько экземпляров кэша могут привести к рассинхронизации данных и утечке памяти.

# Solution
Создаётся класс с static-полем instance. Конструктор проверяет, существует ли уже экземпляр, и возвращает его. Кэш инкапсулирован с использованием структуры Map. Публичный API включает методы get, set, clear и size.

# Consequences
# Преимущества
- Гарантия единственного экземпляра
- Централизованное управление состоянием
- Контроль размера кэша

# Недостатки
- Глобальное состояние
- Может усложнять тестирование

# Related Patterns
- Factory Pattern
- Multiton Pattern

# Code Example
```javascript
import CacheManager from './CacheManager.js';

const cache = new CacheManager(2);
cache.set('user', { name: 'Gulya' });
console.log(cache.get('user'));