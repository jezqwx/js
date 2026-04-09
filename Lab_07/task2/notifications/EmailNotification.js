export class EmailNotification {
  constructor(recipient, subject) {
    this.recipient = recipient;
    this.subject = subject;
  }

  send(message) {
    console.log(`Sending email to ${this.recipient} with subject "${this.subject}": ${message}`);

    return { success: true, channel: "email" };
  }
}