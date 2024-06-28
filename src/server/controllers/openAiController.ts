import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY ?? "x",
});
const openai = new OpenAIApi(configuration);

const configuration2 = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY_2 ?? "x",
});
const openai2 = new OpenAIApi(configuration2);

export const submitOpenAiRequest = async ({
  userId = 'x',
  entry,
  prompt,
}: {
  userId?: string;
  entry: string;
  prompt: string;
}) => {
  if (!entry || entry.length <= 0) return "";
  // const openAiClient = userId.split("-")[0] === "93b46c99" ? openai2 : openai;
  const openAiClient = openai2

  // Define the chat conversation
  const chatConversation: ChatCompletionRequestMessage[] = [
    { role: "system", content: prompt },
    { role: "user", content: entry },
  ];

  // Create the chat completion
  const response = await openAiClient.createChatCompletion({
    messages: chatConversation,
    model: "gpt-4o",
  });

  const responseText = response.data.choices[0].message.content
  return responseText;
};
