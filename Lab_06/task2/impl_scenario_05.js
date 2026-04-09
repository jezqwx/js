class TaskBoard {
    constructor() {
        this.cards = [
            { id: 1, title: "Design login", column: "TODO" }
        ];
    }

    moveCard(id, toColumn) {
        const card = this.cards.find(c => c.id === id);
        if (card) card.column = toColumn;
    }
}

class MoveCardCommand {
    constructor(board, id, from, to) {
        this.board = board;
        this.id = id;
        this.from = from;
        this.to = to;
    }

    execute() {
        this.board.moveCard(this.id, this.to);
    }

    undo() {
        this.board.moveCard(this.id, this.from);
    }
}

class ActionHistory {
    constructor() {
        this.history = [];
        this.redoStack = [];
    }

    execute(command) {
        command.execute();
        this.history.push(command);
        this.redoStack = [];
    }

    undo() {
        const command = this.history.pop();
        if (command) {
            command.undo();
            this.redoStack.push(command);
        }
    }

    redo() {
        const command = this.redoStack.pop();
        if (command) {
            command.execute();
            this.history.push(command);
        }
    }
}
const board = new TaskBoard();
const history = new ActionHistory();

const move = new MoveCardCommand(board, 1, "TODO", "DONE");

history.execute(move);
console.log("After move:", board.cards);

history.undo();
console.log("After undo:", board.cards);

history.redo();
console.log("After redo:", board.cards);
