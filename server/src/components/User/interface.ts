import { ICourseModel } from '../Course/model';
import { IUserModel } from './model';

/**
 * @export
 * @interface IUserService
 */
export interface IUserService {
    /**
     * @param {string} id
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
    findOne(id: string): Promise<IUserModel>;

    /**
     * @param {string} id
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
    remove(id: string): Promise<IUserModel>;

    /**
     * @param {string} id
     * @param {string} course_id
     * @return {Promise<IUserModel>}
     * @memberof IUserService
     */
    enrollCourse(id: string, course_id: string): Promise<IUserModel>;

    /**
     * @param {string} id
     * @return {Promise<void>}
     * @memberof IUserService
     */
    reportCard(id: string): Promise<{course_id: number, pointsEarned: number, finalGrade: number}[]>;

    /**
     * @param {string} id
     * @param {string} course_id
     * @return {Promise<IUserModel>}
     * @memberof IUserService
     */
    dropCourse(id: string, course_id: string): Promise<IUserModel>;    

    /**
     * @param {string} id
     * @return {Promise<IUserModel>}
     * @memberof IUserService
     */
    listCurrentCourses(id: string): Promise<ICourseModel[]>;
}
