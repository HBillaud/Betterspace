import * as Joi from 'joi';
import AuthValidation from './validation';
import UserModel, { IUserModel } from '../User/model';
import { IAuthService } from './interface';
import ProfessorModel, { IProfessorModel } from '../Professor/model';

/**
 * @export
 * @implements {IAuthService}
 */
const AuthService: IAuthService = {

    /**
     * @param {IUserModel} body
     * @returns {Promise <IUserModel>}
     * @memberof AuthService
     */
    async createUser(body: IUserModel): Promise < IUserModel > {
        try {
            const user: IUserModel = new UserModel({
                _id: body._id,
                firstname: body.firstname,
                lastname: body.lastname,
                email: body.email,
                password: body.password
            });

            const query: IUserModel = await UserModel.findOne({
                email: body.email
            });

            if (query) {
                throw new Error('This email already exists');
            }

            const saved: IUserModel = await user.save();

            return saved;
        } catch (error) {
            throw new Error(error);
        }
    },

    /**
     * @param {IProfessorModel} body
     * @returns {Promise <IProfessorModel>}
     * @memberof AuthService
     */
     async createProfessor(body: IProfessorModel): Promise < IProfessorModel > {
        try {
            const user: IProfessorModel = new ProfessorModel({
                _id: body._id,
                firstname: body.firstname,
                lastname: body.lastname,
                email: body.email,
                password: body.password
            });

            const query: IProfessorModel = await ProfessorModel.findOne({
                email: body.email
            });

            if (query) {
                throw new Error('This email already exists');
            }

            const saved: IProfessorModel = await user.save();

            return saved;
        } catch (error) {
            throw new Error(error);
        }
    },
};

export default AuthService;
