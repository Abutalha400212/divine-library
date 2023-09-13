"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const loginZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        email: zod_1.default.string({
            required_error: "Email is required",
        }),
        password: zod_1.default.string({
            required_error: "Password is required",
        }),
    }),
});
const createUserZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        password: zod_1.default.string({
            required_error: "Password is required",
        }),
        email: zod_1.default.string({
            required_error: "Email is required",
        }),
        name: zod_1.default.string({
            required_error: "Name is required",
        }),
    }),
});
const updateUserZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        password: zod_1.default.string().optional(),
        email: zod_1.default.string().optional(),
        name: zod_1.default.string().optional(),
    }),
});
exports.AuthValidation = {
    loginZodSchema,
    createUserZodSchema,
    updateUserZodSchema,
};
