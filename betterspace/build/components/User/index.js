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
exports.dropCourse = exports.enrollCourse = exports.remove = exports.get = void 0;
const service_1 = require("./service");
const service_2 = require("../Course/service");
const error_1 = require("../../config/error");
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function get(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const courses = yield service_1.default.findCourses(req.params.id);
            res.status(200).json(courses);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.get = get;
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function remove(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield service_1.default.remove(req.params.id);
            res.status(200).json(user);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.remove = remove;
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise < void >}
 */
function enrollCourse(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield service_1.default.enrollCourse(req.params.id, req.body.course_id);
            yield service_2.default.addStudent(req.params.id, req.body.course_id);
            res.status(200).json(user);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.enrollCourse = enrollCourse;
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise < void >}
 */
function dropCourse(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield service_1.default.dropCourse(req.params.id, req.body.course_id);
            yield service_2.default.removeStudent(req.params.id, req.body.course_id);
            res.status(200).json(user);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.dropCourse = dropCourse;
//# sourceMappingURL=index.js.map