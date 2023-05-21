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
const saveJournalEntry = ({ userId, entry, timestamp, date, summary, }) => __awaiter(void 0, void 0, void 0, function* () {
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
const getJournalEntries = ({ user, timeFrame }) => __awaiter(void 0, void 0, void 0, function* () {
    var date = new Date();
    var oneWeekAgo = date.setDate(date.getDate() - timeFrameToLength[timeFrame]);
    let userJournals = yield User_1.User.createQueryBuilder("u")
        .leftJoinAndSelect("u.journals", "j")
        .where("u.id = :id", { id: user.id })
        .andWhere("j.localDateFromBrowser >= :oneWeekAgo", { oneWeekAgo })
        .getOne();
    return userJournals === null || userJournals === void 0 ? void 0 : userJournals.journals;
});
const handleJournalPost = ({ userId, entry, timestamp, date }) => __awaiter(void 0, void 0, void 0, function* () {
    const responseText = yield (0, openAiController_1.submitOpenAiRequest)(entry);
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
const handleSummaryPost = ({ user, timeFrame }) => __awaiter(void 0, void 0, void 0, function* () {
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
    const summary = yield (0, openAiController_1.submitOpenAiRequest)(journalSummaries);
    return { summary, timeFrame };
});
exports.handleSummaryPost = handleSummaryPost;
const handleJournalGet = ({ userId }) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield User_1.User.createQueryBuilder("u")
        .leftJoinAndSelect("u.journals", "j")
        .where("u.id = :id", { id: userId })
        .getOne();
    return user.journals;
});
exports.handleJournalGet = handleJournalGet;
//# sourceMappingURL=journalController.js.map