• Pattern Name: Module Pattern
• Description: не загружает глобальные переменные; скрывать внутренние данные
• Context Outline: когда есть большой файл JS и много функций и переменных; когда надо сделать мини библтотеку внутри проекта;
• Problem Statement: отсуствие приватности; много переменных; когда сложно понимать структуру, тоесть что за что отвечает
• Solution: 1. Создать функцию, чтобы сделать отдельную область видимости; 
            2. Внутри объявить приватные переменные; 
            3.Вернуть объект с публичными методами;
            4. Использовать только публичный API, а внутреннее оставить закрытым
• Design: private: внутри функции
          public: то что возвращаем через объект
• Implementation: IIFE module; ES6 module
• Illustrations: private data + private helpers --> return public API --> module.publicMethod()
• Examples: module_examples.js
• Consequences: Преимущества: меньше мусора в глобал области
                              можно скрыть важные переменные
                Компромиссы: ES6 обычно удобен если проект современный
• Corequisites: Revealing Module Pattern для читаемости
                Namespace Pattern если нужно сгруппировать
• Relations: Revealing Module Pattern
             Namespace Pattern
• Known Usage: Широко использовался в старом JS коде, до ES6. Сейчас часто заменяется ES6
• Discussions: Мне кажется что Module Pattern все еще полезен, для понимания замыкание и приватности.