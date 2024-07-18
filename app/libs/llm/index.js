import OpenAI from "openai";

export const client = new OpenAI({
  apiKey: process.env.MOONSHOT_API_KEY,
  baseURL: "https://api.moonshot.cn/v1",
});

export class Completion {
  model;
  messages = [];
  constructor({ model } = {}) {
    this.model = model || "moonshot-v1-8k";
  }

  addSystem(message) {
    this.messages.push({
      role: "system",
      content: message,
    });
  }

  addUser(message) {
    this.messages.push({
      role: "user",
      content: message,
    });
  }

  addAssistant(message) {
    this.messages.push({
      role: "assistant",
      content: message,
    });
  }

  async create() {
    const completion = await client.chat.completions.create({
      model: this.model,
      messages: this.messages,
    });
    const text = completion.choices[0].message.content;

    return text;
  }
}
