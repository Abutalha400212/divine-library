"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pick = (query, options) => {
    const finalObj = {};
    for (const opt of options) {
        if (query && Object.hasOwnProperty.call(query, opt)) {
            finalObj[opt] = query[opt];
        }
    }
    return finalObj;
};
exports.default = pick;
