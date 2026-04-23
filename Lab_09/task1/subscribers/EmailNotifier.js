export class EmailNotifier {
  constructor(email) {
    this.email = email;
    this.subscriptions = [];
    this.sentCount = 0;
  }

  subscribe(category) {
    categories.forEach(category => {
      const unsubscribe = eventBus.subscribe(`news:${category}`, article => {
        this.sendEmail(article);
      });
      this.subscriptions.push(unsubscribe);
    });
    console.log(`EmailNotifier subscribed to categories: ${categories.join(", ")}`);
  }

  sendEmail(article) {
    this.sentCount++;
    console.log(`Email sent to ${this.email} about "${article.headline}" in category "${article.category}". Total emails sent: ${this.sentCount}`);
  }

  unsubscribe() {
    this.subscriptions.forEach(unsubscribe => unsubscribe());
    this.subscriptions = [];
    console.log(`EmailNotifier unsubscribed from all categories.`);
  }
}