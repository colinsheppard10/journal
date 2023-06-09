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
var _a, _b, _c;
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
const prompt = (_c = process.env.OPEN_AI_PROMPT) !== null && _c !== void 0 ? _c : "x";
const submitOpenAiRequest = ({ userId, entry }) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f, _g;
    if (!entry || entry.length <= 0)
        return "";
    const fullPrompt = `${prompt}"${entry}"`;
    console.log(fullPrompt);
    const openAiClient = userId.split('-')[0] === '93b46c99' ? openai2 : openai;
    const response = yield openAiClient.createCompletion({
        model: "text-davinci-003",
        prompt: fullPrompt,
        max_tokens: 2048,
        temperature: 0,
    });
    const responseText = (_g = (_f = (_e = (_d = response === null || response === void 0 ? void 0 : response.data) === null || _d === void 0 ? void 0 : _d.choices[0]) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.replace(/\n/g, '')) !== null && _g !== void 0 ? _g : "";
    // const entryWords = entry.split(" ");
    // const entryLastWord = entryWords[entryWords.length - 1];
    // const responseText = `summary note ${entryLastWord} 1 - summary note ${entryLastWord} 2 - summary note ${entryLastWord} 3 - summary note ${entryLastWord} 4 - summary note ${entryLastWord} 5`;
    return responseText;
});
exports.submitOpenAiRequest = submitOpenAiRequest;
//# sourceMappingURL=openAiController.js.map