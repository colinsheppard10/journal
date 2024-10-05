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
exports.insertComputationData = exports.getComputationData = void 0;
const Computation_1 = require("../../entity/computation/Computation");
const getComputationData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Computation_1.Computation.createQueryBuilder("computation").getMany();
    }
    catch (error) {
        console.log(error);
    }
});
exports.getComputationData = getComputationData;
const insertComputationData = (_a) => __awaiter(void 0, [_a], void 0, function* ({ elapsedTime }) {
    try {
        const computation = new Computation_1.Computation();
        computation.count = elapsedTime;
        computation.timestamp = Date.now().toString();
        yield computation.save();
    }
    catch (error) {
        console.log(error);
    }
});
exports.insertComputationData = insertComputationData;
//# sourceMappingURL=computationController.js.map