import { Completion } from "../../libs/llm";

export async function POST(req) {
  const { description, presetList, contentList } = await req.json();

  if (!(contentList instanceof Array && contentList.length)) {
    return Response.error(400, "chats is required");
  }

  const completion = new Completion();
  completion.addSystem(`
    预设对话：
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

    请根据预设对话完成要求
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
