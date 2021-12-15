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
    findAll(course_id: string): Promise < IAssignmentModel[]>;

    /**
     * @param {IAssignmentModel} body
     * @param {string} course_id
     * @returns {Promise<IAssignmentModel>}
     * @memberof IAssignmentService
     */
    add(body: IAssignmentModel, course_id: string): Promise<IAssignmentModel>;

    /**
     * @param {string} course_id
     * @returns {Promise<IAssignmentModel}
     * @memberof IAssignmentService
     */
     findAllInCourse(course_id: string): Promise<IAssignmentModel[]>;
}
