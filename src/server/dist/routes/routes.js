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
const express_1 = require("express");
const journalController_1 = require("../controllers/journalController");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.use(authController_1.authMiddleware);
router.post("/api/user/get", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { user } = req;
        res.json({ user });
    }
    catch (error) {
        return res.status(504).send({ error });
    }
}));
router.post("/api/journal/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { user } = req;
        let { entry, timestamp, date } = req.body;
        let responseText = yield (0, journalController_1.handleJournalPost)({
            userId: user.id,
            entry,
            timestamp,
            date,
        });
        res.json({ responseText });
    }
    catch (error) {
        console.log(error);
        return res.status(504).send({ error });
    }
}));
router.post("/api/journal/get", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { user } = req;
        let journal = yield (0, journalController_1.handleJournalGet)({ userId: user.id });
        res.json({ journal });
    }
    catch (error) {
        return res.status(504).send({ error });
    }
}));
router.post("/api/journal/summary/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { user } = req;
        let { timeFrame } = req.body;
        let responseText = yield (0, journalController_1.handleSummaryPost)({ user, timeFrame });
        res.json({ responseText });
    }
    catch (error) {
        console.log(error);
        return res.status(504).send({ error });
    }
}));
exports.default = router;
//# sourceMappingURL=routes.js.map