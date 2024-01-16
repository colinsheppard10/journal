"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyEmail = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let VerifyEmail = exports.VerifyEmail = class VerifyEmail extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], VerifyEmail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], VerifyEmail.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VerifyEmail.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VerifyEmail.prototype, "locale", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VerifyEmail.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VerifyEmail.prototype, "picture", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VerifyEmail.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VerifyEmail.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User, user => user.verifyEmail, {
        onDelete: 'CASCADE',
        nullable: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", User_1.User)
], VerifyEmail.prototype, "user", void 0);
exports.VerifyEmail = VerifyEmail = __decorate([
    (0, typeorm_1.Entity)()
], VerifyEmail);
//# sourceMappingURL=VerifyEmail.js.map