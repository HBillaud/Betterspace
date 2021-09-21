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
            password: Joi.string().required(),
            email: Joi.string().email({
                minDomainSegments: 2
            }).required()
        });

        return schema.validate(params);
    }
}

export default new AuthValidation();
