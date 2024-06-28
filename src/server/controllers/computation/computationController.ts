import { Computation } from "../../entity/computation/Computation";
import { submitOpenAiRequest } from "../openAiController";

export const getComputationData = async () => {
  try {
    return await Computation.createQueryBuilder("computation").getMany();
  } catch (error) {
    console.log(error);
  }
};

export const insertComputationData = async ({elapsedTime}: any) => {
  try {
    const computation = new Computation();
    computation.count = elapsedTime;
    computation.timestamp = Date.now().toString();
    await computation.save();
  } catch (error) {
    console.log(error);
  }
};

const OPEN_AI_TOPIC_PROMPT = `You are a Staff level engineer at Meta with 20 years of experience`
const OPEN_AI_ENTRY_PREFIX = `Create 5 extremely challenging flashcards with useful information on a specific topic or specific technology within` 
const OPEN_AI_ENTRY_POSTIX = `. Make the back of each card very detailed but concise and explained clearly for a senior level technical person. I am using the response programmatically so I need the flashcards to be in exactly this JSON format with no additional text in the response. Do not include any numbered lists, or bullet points or special spacing: {topic: "topic",cards:[{front: "front of card 1", back: "back of card 1 having no numbered lists, or bullet points or special spacing"}]}`
export const createFlashCard = async ({ topic }) => {
  const entry = `${OPEN_AI_ENTRY_PREFIX} ${topic} ${OPEN_AI_ENTRY_POSTIX}`
  const prompt = OPEN_AI_TOPIC_PROMPT
  const responseText = await submitOpenAiRequest({entry, prompt});
  return responseText;
};