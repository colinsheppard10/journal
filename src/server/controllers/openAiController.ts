import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY ?? "x",
});
const openai = new OpenAIApi(configuration);


const configuration2 = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY_2 ?? "x",
});
const openai2 = new OpenAIApi(configuration2);

const prompt = process.env.OPEN_AI_PROMPT ?? "x"
export const submitOpenAiRequest = async ({userId, entry}:{userId: string, entry: string}) => {
  if (!entry || entry.length <= 0) return "";
  const fullPrompt = `${prompt}"${entry}"`
  console.log(fullPrompt)

  const openAiClient = userId.split('-')[0] === '93b46c99' ? openai2 : openai

  const response = await openAiClient.createCompletion({
    model: "text-davinci-003",
    prompt: fullPrompt,
    max_tokens: 2048,
    temperature: 0,
  });

  const responseText = response?.data?.choices[0]?.text?.replace(/\n/g, '') ?? ""
  // const entryWords = entry.split(" ");
  // const entryLastWord = entryWords[entryWords.length - 1];
  // const responseText = `summary note ${entryLastWord} 1 - summary note ${entryLastWord} 2 - summary note ${entryLastWord} 3 - summary note ${entryLastWord} 4 - summary note ${entryLastWord} 5`;
  return responseText;
};
