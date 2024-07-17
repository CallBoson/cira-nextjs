import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.MOONSHOT_API_KEY,
  baseURL: "https://api.moonshot.cn/v1",
});

export async function POST(req) {
  const { description, chats, prompt } = await req.json();

  const completion = await client.chat.completions.create({
    model: "moonshot-v1-8k",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const text = completion.choices[0].message.content;

  return Response.json({
    text,
  });
}
