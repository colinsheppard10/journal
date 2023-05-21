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
const prompt = (_b = process.env.OPEN_AI_PROMPT) !== null && _b !== void 0 ? _b : "x";
const submitOpenAiRequest = (entry) => __awaiter(void 0, void 0, void 0, function* () {
    if (!entry || entry.length <= 0)
        return "";
    const fullPrompt = `${prompt}"${entry}"`;
    console.log(fullPrompt);
    const response = yield openai.createCompletion({
        model: "text-davinci-003",
        prompt: fullPrompt,
        max_tokens: 2048,
        temperature: 0,
    });
    const responseText = response.data.choices[0].text;
    // const entryWords = entry.split(" ");
    // const entryLastWord = entryWords[entryWords.length - 1];
    // const responseText = `summary note ${entryLastWord} 1 - summary note ${entryLastWord} 2 - summary note ${entryLastWord} 3 - summary note ${entryLastWord} 4 - summary note ${entryLastWord} 5`;
    return responseText;
});
exports.submitOpenAiRequest = submitOpenAiRequest;
//# sourceMappingURL=openAiController.js.map