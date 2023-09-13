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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const config_1 = __importDefault(require("../../../config"));
const JWT_token_1 = require("../../../helpers/JWT.token");
const auth_model_1 = require("./auth.model");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = yield auth_model_1.User.create(payload);
    const accessToken = JWT_token_1.jwtHelpers.createToken({ email }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken,
    };
});
const getUserByEmail = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized");
    }
    // verify token
    let verifiedUser = null;
    verifiedUser = JWT_token_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    const { email } = verifiedUser;
    return { email };
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email: userEmail, password } = payload;
    const isUserExist = yield auth_model_1.User.isUserExist(userEmail);
    if (!isUserExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "User does not Found");
    }
    const isPasswordMatched = yield auth_model_1.User.isPasswordMatched(password, isUserExist.password);
    if (!isPasswordMatched) {
        throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, "Password is inCorrect");
    }
    const { email } = isUserExist;
    const accessToken = JWT_token_1.jwtHelpers.createToken({ email }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken,
    };
});
exports.AuthService = {
    loginUser,
    createUser,
    getUserByEmail,
};
