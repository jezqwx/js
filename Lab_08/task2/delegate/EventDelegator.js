// delegate/EventDelegator.js
export class EventDelegator {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.handlers = new Map();

    this.container.addEventListener("click", this.handleClick.bind(this));
    this.container.addEventListener("dblclick", this.handleDoubleClick.bind(this));
  }

  handleClick(event) {
    const target = event.target;
    const actionElement = target.closest("[data-action]");

    if (!actionElement) return;

    const action = actionElement.dataset.action;
    const item = actionElement.closest("[data-id]");
    const itemId = item ? item.dataset.id : null;

    switch (action) {
      case "toggle":
        this.emit("toggle", {
          id: itemId,
          completed: actionElement.checked,
        });
        break;

      case "delete":
        this.emit("delete", { id: itemId });
        break;

      case "edit":
        this.emit("edit", { id: itemId });
        break;

      case "priority":
        this.emit("priority", {
          id: itemId,
          priority: actionElement.dataset.priority,
        });
        break;
    }
  }

  handleDoubleClick(event) {
    const item = event.target.closest("[data-id]");
    if (item) {
      this.emit("edit-start", { id: item.dataset.id });
    }
  }

  on(eventName, handler) {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }
    this.handlers.get(eventName).push(handler);
  }

  emit(eventName, data) {
    const handlers = this.handlers.get(eventName);
    if (handlers) {
      handlers.forEach((handler) => handler(data));
    }
  }
}