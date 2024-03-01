"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let errorfn = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal error";
    if (err.name == "CastError") {
        const message = "Resource not found .invalid :" + `${err.stack}`;
        // console.log(message);
        // err = new HttpError(message);
    }
    res.status(404).json({
        success: false,
        message: err.message,
    });
};
exports.default = errorfn;
