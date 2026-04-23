import eventBus from "../pubsub/EventBus";

export class NewsPublisher {
  constructor() {
    this.name = name;
    this.articles = [];
  }

  publishArticle(category, headline, content, priority = "normal") {
    const article = {
      id: Date.now(),
      category,
      headline,
      content,
      priority,
      timestamp: new Date(),
      source: this.name
    };
    this.articles.push(article);
    eventBus.publish(`news:${category}`, article);
    eventBus.publish(`news:all`, article);

    if (priority === "urgent") {
      eventBus.publish(`news:urgent`, article);
    }

    console.log(`Article published in category "${category}": ${headline}`);
    return article;
  }
}