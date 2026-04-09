export class PushNotification {
  constructor(token, title) {
    this.token = token;
    this.title = title;
  }

  send(message) {
    console.log(`Sending push notification to ${this.token} with title "${this.title}": ${message}`);
    return { success: true, channel: "push" };
  }
}