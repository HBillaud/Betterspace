import { IAssignmentModel } from './model';

/**
 * @export
 * @interface IAssignmentService
 */
export interface IAssignmentService {
    /**
     * @param {string} id
     * @returns {Promise<IAssignmentModel>}
     * @memberof IAssignmentService
     */
    findOne(id: string): Promise<IAssignmentModel>;

    /**
     * @param {IAssignmentModel} body
     * @returns {Promise<IAssignmentModel>}
     * @memberof IAssignmentService
     */
    add(body: IAssignmentModel): Promise<IAssignmentModel>;
}
