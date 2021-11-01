import * as Joi from 'joi';
import Validation from '../validation';
import { IUserModel } from '../User/model';

/**
 * @export
 * @class AuthValidation
 * @extends Validation
 */
class AuthValidation extends Validation {

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
    createUser(
        params: IUserModel
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
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

export default new AuthValidation();
