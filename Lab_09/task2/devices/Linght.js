import { Device } from "./Device.js";

export class Light extends Device {
  constructor(name, room) {
    super(name, 'Light');
    this.room = room;
  }

  getDefaultState() {
    return { power: false, brightness: 50, color: 'white' };
  }

  turnOn() {
    this.updateState({ power: true });
    console.log(`${this.name} in ${this.room} turned ON`);
  }

  turnOff() {
    this.updateState({ power: false });
    console.log(`${this.name} in ${this.room} turned OFF`);
  }

  setBrightness(level) {
    const brightness = Math.max(0, Math.min(100, level));
    this.updateState({ brightness });
    console.log(`${this.name} in ${this.room} brightness set to ${brightness}%`);
  }
}