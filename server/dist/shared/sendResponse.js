"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    const responseData = {
        statusCode: data.statusCode,
        success: true,
        message: data.message || null,
        meta: data.meta || undefined,
        data: data.data || null,
    };
    res.status(data.statusCode).send(responseData);
};
exports.default = sendResponse;
