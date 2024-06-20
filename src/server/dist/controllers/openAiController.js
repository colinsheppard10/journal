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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitOpenAiRequest = void 0;
const openai_1 = require("openai");
const configuration = new openai_1.Configuration({
    apiKey: (_a = process.env.OPEN_AI_API_KEY) !== null && _a !== void 0 ? _a : "x",
});
const openai = new openai_1.OpenAIApi(configuration);
const configuration2 = new openai_1.Configuration({
    apiKey: (_b = process.env.OPEN_AI_API_KEY_2) !== null && _b !== void 0 ? _b : "x",
});
const openai2 = new openai_1.OpenAIApi(configuration2);
const submitOpenAiRequest = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, entry, prompt, }) {
    if (!entry || entry.length <= 0)
        return "";
    const openAiClient = userId.split("-")[0] === "93b46c99" ? openai2 : openai;
    // Define the chat conversation
    const chatConversation = [
        { role: "system", content: prompt },
        { role: "user", content: entry },
    ];
    // Create the chat completion
    const response = yield openAiClient.createChatCompletion({
        messages: chatConversation,
        model: "gpt-3.5-turbo",
    });
    const responseText = response.data.choices[0].message.content;
    return responseText;
});
exports.submitOpenAiRequest = submitOpenAiRequest;
//# sourceMappingURL=openAiController.js.map