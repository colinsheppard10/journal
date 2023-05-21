import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "x",
});
const openai = new OpenAIApi(configuration);

export const submitOpenAiRequest = async (entry: string) => {
  if (!entry || entry.length <= 0) return "";
  // const response = await openai.createCompletion({
  //   model: "text-davinci-003",
  //   prompt: `Summarize the following journal entry in 5 or less bullet points.:
  //   "${entry}"`,
  //   max_tokens: 2048,
  //   temperature: 0,
  // });

  // const responseText = response.data.choices[0].text;
  const entryWords = entry.split(" ");
  const entryLastWord = entryWords[entryWords.length - 1];
  const responseText = `summary note ${entryLastWord} 1 - summary note ${entryLastWord} 2 - summary note ${entryLastWord} 3 - summary note ${entryLastWord} 4 - summary note ${entryLastWord} 5`;
  return responseText;
};
