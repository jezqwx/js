export class SMSNotification {
  constructor(phone) {
    this.phone = phone;
  }

  send(message) {
    console.log(`Sending SMS to ${this.phone}: ${message}`);
    return { success: true, channel: "sms" };
  }
}