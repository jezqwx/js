import { APP_NAME, INITIAL_STATE } from './modules/constants.mjs';
import { performCalculation } from './modules/core.mjs';
import * as UI from './modules/utils.mjs';

const state = { ...INITIAL_STATE };

document.getElementById('title').textContent = APP_NAME;

// Кнопки чисел
document.querySelectorAll('[data-number]').forEach(button => {
    button.addEventListener('click', (event) => {
        UI.handleNumber(state, event.target.dataset.number);
    });
});

// Кнопки операторов
document.querySelectorAll('[data-operator]').forEach(button => {
    button.addEventListener('click', (event) => {
        UI.handleOperator(state, event.target.dataset.operator, performCalculation);
    });
});

document.querySelector('[data-action="equals"]').addEventListener('click', () => {
    UI.handleEquals(state, performCalculation);
});

document.querySelector('[data-action="clear"]').addEventListener('click', () => {
    UI.handleClear(state);
});

document.querySelector('[data-action="delete"]').addEventListener('click', () => {
    UI.handleDelete(state);
});

// Расширенный режим
const advancedToggle = document.getElementById('toggle-advanced');
const advancedBlock = document.getElementById('advanced-panel');

advancedToggle.addEventListener('click', () => {
    advancedBlock.classList.toggle('active');
    advancedToggle.textContent = advancedBlock.classList.contains('active')
        ? 'Скрыть панель'
        : 'Показать панель';
});

// Обработчики расширенных кнопок
document.querySelectorAll('[data-advanced]').forEach(btn => {
    btn.addEventListener('click', e => {
        UI.handleAdvancedFunction(state, e.target.dataset.advanced);
    });
});

// Клавиатура
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (!isNaN(key) || key === '.') {
        UI.handleNumber(state, key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        UI.handleOperator(state, key, performCalculation);
    } else if (key === 'Enter') {
        UI.handleEquals(state, performCalculation);
    }
});

// Lazy load истории
const historySection = document.getElementById('history-section');

const observer = new IntersectionObserver(async entries => {
    if (entries[0].isIntersecting) {
        const historyModule = await import('./modules/lazy_component.mjs');
        historyModule.renderHistory(state.history);
        observer.disconnect();
    }
}, { threshold: 0.5 });

observer.observe(historySection);

console.log('Calculator ready');