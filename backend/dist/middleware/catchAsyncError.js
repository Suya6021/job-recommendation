"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let catchAsyncError = (thefunc) => (req, res, next) => {
    Promise.resolve(thefunc(req, res, next)).catch(next);
};
exports.default = catchAsyncError;
