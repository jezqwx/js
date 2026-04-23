export class CommandManager {
  constructor() {
    this.history = [];
    this.redoStack = [];
    this.maxHistory = 50;
  }

  execute(command) {
    command.execute();
    this.history.push(command);
    this.redoStack = [];

    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }
  }

  undo() {
    const command = this.history.pop();
    if (command) {
      command.undo();
      this.redoStack.push(command);
      console.log('Undo executed');
    } else {
      console.log('No commands to undo');
    }
  }

  redo() {
    const command = this.redoStack.pop();
    if (command) {
      command.execute();
      this.history.push(command);
      console.log('Redo executed');
    } else {
      console.log('No commands to redo');
    }
  }
}