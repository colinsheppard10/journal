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
const computationController_1 = require("../../controllers/computation/computationController");
const router = (0, express_1.Router)();
router.post("/data", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, computationController_1.getComputationData)();
        return res.json(data);
    }
    catch (error) {
        return res.status(504).send({ error });
    }
}));
router.post("/topic", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { topic } = req.body;
        const response = yield (0, computationController_1.createFlashCard)({ topic });
        const parsed = JSON.parse(response);
        return res.json(parsed);
    }
    catch (error) {
        return res.status(504).send({ error });
    }
}));
router.post("/insert", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { elapsedTime } = req.body;
        yield (0, computationController_1.insertComputationData)({ elapsedTime });
        return res.json({ elapsedTime });
    }
    catch (error) {
        return res.status(504).send({ error });
    }
}));
exports.default = router;
//# sourceMappingURL=computationRoutes.js.map