import { IProfessorModel } from '../Professor/model';
import { IUserModel } from '../User/model';

/**
 * @export
 * @interaface IAuthService
 */
export interface IAuthService {
    /**
     * @param {IUserModel} IUserModel
     * @returns {Promise<IUserModel>}
     * @memberof AuthService
     */
    createUser(IUserModel: IUserModel): Promise < IUserModel > ;

    /**
     * @param {IProfessorModel} IProfessorModel
     * @returns {Promise<IProfessorModel>}
     * @memberof AuthService
     */
     createProfessor(IProfessorModel: IProfessorModel): Promise < IProfessorModel > ;
}
