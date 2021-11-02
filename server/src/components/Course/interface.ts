import { ICourseModel } from './model';

/**
 * @export
 * @interface ICourseService
 */
export interface ICourseService {
    /**
     * @param {string} id
     * @returns {Promise<ICourseModel>}
     * @memberof ICourseService
     */
    findOne(id: string): Promise<ICourseModel>;

    /**
     * @param {ICourseModel} body
     * @returns {Promise<ICourseModel>}
     * @memberof ICourseService
     */
    add(body: ICourseModel, professor_id: string): Promise<ICourseModel>;

    /**
     * @param {string} student_id
     * @param {string} course_id
     * @return {Promise<ICourseModel>}
     * @memberof ICourseService
     */
    addStudent(student_id: string, course_id: string): Promise<ICourseModel>;

        /**
     * @param {string} student_id
     * @param {string} course_id
     * @return {Promise<ICourseModel>}
     * @memberof ICourseService
     */
    removeStudent(student_id: string, course_id: string): Promise<ICourseModel>;

    /**
     * @param {string} id
     * @returns {Promise<ICourseModel>}
     * @memberof ICourseService
     */
    remove(id: string): Promise<ICourseModel>;
}