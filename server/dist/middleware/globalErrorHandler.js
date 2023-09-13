"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const config_1 = __importDefault(require("../config"));
const apiError_1 = __importDefault(require("../errors/apiError"));
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = 400;
    let message = "Something went wrong";
    let errorMessage = [];
    if ((error === null || error === void 0 ? void 0 : error.name) === "ValidationError") {
        const simplifiedError = (0, handleValidationError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessages;
    }
    else if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessages;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === "CastError") {
        const simplifiedError = (0, handleCastError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessages;
    }
    else if (error instanceof apiError_1.default) {
        (message = error.message),
            (errorMessage = error.message
                ? [
                    {
                        path: "",
                        message: error.message,
                    },
                ]
                : []);
    }
    else if (error instanceof Error) {
        (message = error.message),
            (errorMessage = error.message
                ? [
                    {
                        path: "",
                        message: error.message,
                    },
                ]
                : []);
    }
    res.status(statusCode).json({
        statusCode,
        message,
        errorMessage,
        stack: config_1.default.env !== "production" ? error.stack : undefined,
    });
};
exports.default = globalErrorHandler;
