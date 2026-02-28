export function updateCalculatorDisplay(state) {
    const expr = document.getElementById('expression');
    const result = document.getElementById('result');

    expr.textContent = state.previousValue && state.operator
        ? `${state.previousValue} ${state.operator}`
        : '';

    result.textContent = state.currentValue;
}

export function handleNumber(state, value) {
    state.currentValue =
        state.waitingForNewValue
            ? value
            : state.currentValue === '0'
                ? value
                : state.currentValue + value;

    state.waitingForNewValue = false;
    updateCalculatorDisplay(state);
}

export function handleOperator(state, op, calculate) {
    const current = parseFloat(state.currentValue);

    if (state.previousValue !== null) {
        state.previousValue = calculate(state.operator, state.previousValue, current);
        state.currentValue = String(state.previousValue);
    } else {
        state.previousValue = current;
    }

    state.operator = op;
    state.waitingForNewValue = true;
    updateCalculatorDisplay(state);
}

export function handleEquals(state, calculate) {
    if (!state.operator) return;

    const result = calculate(state.operator, state.previousValue, parseFloat(state.currentValue));

    state.history.push(`${state.previousValue} ${state.operator} ${state.currentValue} = ${result}`);
    state.currentValue = String(result);
    state.previousValue = null;
    state.operator = null;
    state.waitingForNewValue = true;

    updateCalculatorDisplay(state);
}

export function handleClear(state) {
    state.currentValue = '0';
    state.previousValue = null;
    state.operator = null;
    state.waitingForNewValue = false;
    updateCalculatorDisplay(state);
}

export async function handleAdvancedFunction(state, func) {
    const module = await import('../advanced_feature.mjs');
    const value = parseFloat(state.currentValue);
    let result;

    if (func === 'sqrt') result = module.sqrt(value);
    if (func === 'square') result = module.power(value, 2);

    state.history.push(`${func}(${value}) = ${result}`);
    state.currentValue = String(result);
    updateCalculatorDisplay(state);
}