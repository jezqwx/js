export const APP_NAME = "Modular JS Calculator";

export const ERROR_MESSAGES = {
  DIVISION_ZERO: "Error: Division by zero is not allowed.",
  INVALID_INPUT: "Error: Invalid input. Please enter a valid number."
}

export const INITAL_STATE = {
  currentValue: "0",
  previousValue: null,
  operator: null,
  waitingForNewValue: false,
  history: []
}