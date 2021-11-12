import { ICourseModel } from '../Course/model';
import { IProfessorModel } from './model';

/**
 * @export
 * @interface IProfessorService
 */
export interface IProfessorService {
    /**
     * @param {string} code
     * @returns {Promise<IProfessorModel>}
     * @memberof IProfessorService
     */
    findOne(code: string): Promise<IProfessorModel>;

    /**
     * @param {string} id
     * @returns {Promise<IProfessorModel>}
     * @memberof IProfessorService
     */
    remove(id: string): Promise<IProfessorModel>;

        
    /**
     * @param {string} id 
     * @returns {Promise<ICourseModel[]>}
     * @memberof IProfessorService
     */
     get(id: string): Promise<ICourseModel[]>;

    /**
     * @param {string} course_id
     * @return {Promise<IProfessorModel>}
     * @memberof IProfessorService
     */
    addCourse(id: string, course_id: string): Promise<IProfessorModel>;
}