"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const InfoToRole_1 = require("../controllers/InfoToRole");
let router = (0, express_1.Router)();
router.route("/job-role").post(InfoToRole_1.Runner);
exports.default = router;
