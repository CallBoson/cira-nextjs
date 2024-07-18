import { Completion } from "../../libs/llm";

export async function POST(req) {
  const { description, chats, prompt } = await req.json();

  const completion = new Completion();
  completion.addUser(prompt);
  console.log(completion);
  const text = await completion.create();

  return Response.json({
    text,
  });
}
