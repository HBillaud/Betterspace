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
const model_1 = require("./model");
const service_1 = require("../Course/service");
/**
 * @export
 * @implements {IUserModelService}
 */
const UserService = {
    /**
     * @param {string} id
     * @returns {Promise < IUserModel >}
     * @memberof UserService
     */
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield model_1.default.findOne({
                    _id: id
                });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {string} id
     * @returns {Promise < IUserModel >}
     * @memberof UserService
     */
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield model_1.default.findOneAndRemove({
                    _id: id
                });
                return user;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {string} course_id
     * @return {Promise<IUserModel>}
     * @memberof IUserService
     */
    enrollCourse(id, course_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filter = { _id: id };
                const update = { $push: { courses: course_id } };
                const user = yield model_1.default.findOneAndUpdate(filter, update);
                return user;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {string} id
     * @returns {Promise<ICourseModel[]>}
     * @memberof IUserService
     */
    findCourses(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserService.findOne(id);
                var courses = new Array();
                for (let course_id of user.courses) {
                    let temp = yield service_1.default.findOne(course_id);
                    courses.push(temp);
                }
                return courses;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
};
exports.default = UserService;
//# sourceMappingURL=service.js.map