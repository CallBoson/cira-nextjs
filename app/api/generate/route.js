import { Completion } from "../../libs/llm";

export async function POST(req) {
  const { description, presetList, contentList } = await req.json();

  if (!(contentList instanceof Array && contentList.length)) {
    return Response.error(400, "chats is required");
  }

  const completion = new Completion();
  completion.addSystem(`
    你将充当一位资深聊天专家，与用户进行互动对话，你精通人情世故，擅长与人沟通。请根据以下预设对话情景，并根据用户的问题提供高情商的专业回复。

    预设对话情景:
    \`\`\`
    ${
      presetList instanceof Array
        ? JSON.stringify(
            presetList.reduce(
              (accumulator, currentValue) => [
                ...accumulator,
                {
                  roleName: currentValue.roleName,
                  content: currentValue.content,
                },
              ],
              []
            )
          )
        : "无"
    }
    \`\`\`

    请在回答中做到以下几点：

    1.维持对话的自然流畅；
    2.根据对话背景和用户要求给予合理的回复；
    `);
  contentList.forEach((content) => {
    content?.isSelf && completion.addUser(content.content);
    !content?.isSelf && completion.addAssistant(content.content);
  });
  console.log(completion);
  const content = await completion.create();

  return Response.json({
    content,
  });
}
