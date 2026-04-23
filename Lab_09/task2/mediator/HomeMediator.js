import eventBus from "../../task1/pubsub/EventBus.js";

export class HomeMediator {
    constructor() {
        this.devices = new Map();
        this.automationRules = [];
    }

    registerDevice(device) {
        this.devices.set(device.name, device);
        device.setMediator(this);
        console.log(`[Mediator] Registered: ${device.name} (${device.type})`);
    }

    notify(sender, changedProperty) {
        console.log(`[Mediator] ${sender.name} changed:`, changedProperty);
		
        eventBus.publish("device:change", {
            device: sender.name,
            type: sender.type,
            state: changedProperty
        });

        this.checkAutomationRules(sender, changedProperty);
    }

    addRule(condition, action) {
        this.automationRules.push({ condition, action });
    }

    checkAutomationRules(device, state) {
        this.automationRules.forEach(rule => {
            if (rule.condition(device, state)) {
                rule.action(device, state);
            }
        });
    }

    getDevice(name) {
        return this.devices.get(name);
    }
}