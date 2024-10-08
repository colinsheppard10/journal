"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlashCards = exports.createFlashCard = void 0;
const Flashcard_1 = require("../../entity/computation/Flashcard");
const openAiController_1 = require("../openAiController");
const OPEN_AI_TOPIC_PROMPT = `You are a Staff level engineer at Meta with 20 years of experience`;
const OPEN_AI_ENTRY_PREFIX = `Create 5 extremely challenging flashcards with useful information on a specific topic or specific technology within`;
const OPEN_AI_ENTRY_POSTIX = `. Make the back of each card very detailed but concise and explained clearly for a senior level technical person. I am using the response programmatically so I need the flashcards to be in exactly this JSON format with no additional text in the response. Do not include any numbered lists, or bullet points or special spacing: {topic: "topic",cards:[{front: "front of card 1", back: "back of card 1 having no numbered lists, or bullet points or special spacing"}]}`;
const createFlashCard = (_a) => __awaiter(void 0, [_a], void 0, function* ({ topic }) {
    const entry = `${OPEN_AI_ENTRY_PREFIX} ${topic} ${OPEN_AI_ENTRY_POSTIX}`;
    const prompt = OPEN_AI_TOPIC_PROMPT;
    const responseText = yield (0, openAiController_1.submitOpenAiRequest)({ entry, prompt });
    return responseText;
});
exports.createFlashCard = createFlashCard;
const getFlashCards = () => __awaiter(void 0, void 0, void 0, function* () {
    const flashcards = yield Flashcard_1.Flashcard.createQueryBuilder("flashcard").getMany();
    return flashcards;
});
exports.getFlashCards = getFlashCards;
//# sourceMappingURL=flashcardController.js.map