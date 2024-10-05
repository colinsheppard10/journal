import { Computation } from "../../entity/computation/Computation";
import { Flashcard } from "../../entity/computation/Flashcard";
import { submitOpenAiRequest } from "../openAiController";

const OPEN_AI_TOPIC_PROMPT = `You are a Staff level engineer at Meta with 20 years of experience`
const OPEN_AI_ENTRY_PREFIX = `Create 5 extremely challenging flashcards with useful information on a specific topic or specific technology within` 
const OPEN_AI_ENTRY_POSTIX = `. Make the back of each card very detailed but concise and explained clearly for a senior level technical person. I am using the response programmatically so I need the flashcards to be in exactly this JSON format with no additional text in the response. Do not include any numbered lists, or bullet points or special spacing: {topic: "topic",cards:[{front: "front of card 1", back: "back of card 1 having no numbered lists, or bullet points or special spacing"}]}`
export const createFlashCard = async ({ topic }) => {
  const entry = `${OPEN_AI_ENTRY_PREFIX} ${topic} ${OPEN_AI_ENTRY_POSTIX}`
  const prompt = OPEN_AI_TOPIC_PROMPT
  const responseText = await submitOpenAiRequest({entry, prompt});
  return responseText;
};

export const getFlashCards = async () => {
  const flashcards = await Flashcard.createQueryBuilder("flashcard").getMany();
  return flashcards;
};

