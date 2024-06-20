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
exports.handleJournalGet = exports.handleSummaryPost = exports.handleJournalPost = void 0;
const Journal_1 = require("../entity/Journal");
const User_1 = require("../entity/User");
const openAiController_1 = require("./openAiController");
const saveJournalEntry = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, entry, timestamp, date, summary, }) {
    // TODO: this should be one query, need to change this
    /*
      SELECT * from "user" u
      LEFT JOIN journal j ON u.id = j."userId"
      WHERE u.email = 'myEmail@gmail.com'
      AND ( j.localDateFromBrowser = :date OR j."localDateFromBrowser" IS NULL)
  
    */
    let userQuery = User_1.User.createQueryBuilder("u")
        .leftJoinAndSelect("u.journals", "j")
        .where("u.id = :id", { id: userId })
        .getOne();
    let journalQuery = Journal_1.Journal.createQueryBuilder("j")
        .leftJoin("j.user", "u")
        .where("j.localDateFromBrowser = :date", { date })
        .andWhere("u.id = :id", { id: userId })
        .getOne();
    let [user, journal] = yield Promise.all([userQuery, journalQuery]);
    if (!journal)
        journal = new Journal_1.Journal();
    journal.localDateFromBrowser = date;
    journal.summary = summary;
    journal.timestamp = timestamp;
    journal.entry = entry;
    journal.user = user;
    yield Journal_1.Journal.save(journal);
});
const timeFrameToLength = {
    week: 7,
    month: 30,
    year: 365,
};
const getJournalEntries = (_a) => __awaiter(void 0, [_a], void 0, function* ({ user, timeFrame }) {
    var date = new Date();
    var oneWeekAgo = date.setDate(date.getDate() - timeFrameToLength[timeFrame]);
    let userJournals = yield User_1.User.createQueryBuilder("u")
        .leftJoinAndSelect("u.journals", "j")
        .where("u.id = :id", { id: user.id })
        .andWhere("j.localDateFromBrowser >= :oneWeekAgo", { oneWeekAgo })
        .getOne();
    return userJournals === null || userJournals === void 0 ? void 0 : userJournals.journals;
});
const handleJournalPost = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, entry, timestamp, date }) {
    var _b;
    const prompt = (_b = process.env.OPEN_AI_PROMPT) !== null && _b !== void 0 ? _b : "summarize this:";
    const responseText = yield (0, openAiController_1.submitOpenAiRequest)({ userId, entry, prompt });
    yield saveJournalEntry({
        userId,
        entry,
        timestamp,
        date,
        summary: responseText,
    });
    return responseText;
});
exports.handleJournalPost = handleJournalPost;
const minimum = {
    week: 1,
    month: 3,
    year: 10,
};
const handleSummaryPost = (_a) => __awaiter(void 0, [_a], void 0, function* ({ user, timeFrame }) {
    var _b;
    const journalEntries = yield getJournalEntries({ user, timeFrame });
    const belowMinimum = !journalEntries || journalEntries.length < minimum[timeFrame];
    if (belowMinimum)
        return {
            summary: `You need more journal entries before we can generate a theme for your last ${timeFrame}`,
            timeFrame,
        };
    const journalSummaries = journalEntries.reduce((acc, journal) => {
        var _a;
        return acc + ((_a = journal.summary) !== null && _a !== void 0 ? _a : "");
    }, "");
    const prompt = (_b = process.env.OPEN_AI_PROMPT_2) !== null && _b !== void 0 ? _b : "summarize this:";
    let chunks = journalSummaries.match(/.{1,5004}/g);
    let partialSummary = "";
    for (let chunk of chunks) {
        if (partialSummary.length > 5000)
            break;
        partialSummary += yield (0, openAiController_1.submitOpenAiRequest)({ userId: user.id, entry: chunk, prompt });
    }
    const summary = yield (0, openAiController_1.submitOpenAiRequest)({ userId: user.id, entry: partialSummary, prompt });
    ;
    return { summary, timeFrame };
});
exports.handleSummaryPost = handleSummaryPost;
const handleJournalGet = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId }) {
    let user = yield User_1.User.createQueryBuilder("u")
        .leftJoinAndSelect("u.journals", "j")
        .where("u.id = :id", { id: userId })
        .getOne();
    return user.journals;
});
exports.handleJournalGet = handleJournalGet;
//# sourceMappingURL=journalController.js.map