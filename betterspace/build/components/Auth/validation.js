"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const validation_1 = require("../validation");
/**
 * @export
 * @class AuthValidation
 * @extends Validation
 */
class AuthValidation extends validation_1.default {
    /**
    * Creates an instance of AuthValidation.
    * @memberof AuthValidation
    */
    constructor() {
        super();
    }
    /**
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult}
     * @memberof UserValidation
     */
    createUser(params) {
        const schema = Joi.object().keys({
            _id: Joi.string().max(10).required(),
            firstname: Joi.string().required(),
            lastname: Joi.string().required(),
            email: Joi.string().email({
                minDomainSegments: 2
            }).required(),
            password: Joi.string().required()
        });
        return schema.validate(params);
    }
}
exports.default = new AuthValidation();
//# sourceMappingURL=validation.js.map