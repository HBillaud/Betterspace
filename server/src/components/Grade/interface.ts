import { IGradeModel } from './model';
import { Types } from 'mongoose';
/**
 * @export
 * @interface IGradeService
 */
export interface IGradeService {
    /**
     * @param {string} id
     * @returns {Promise<IGradeModel>}
     * @memberof IGradeService
     */
    findOne(assignment_id: string, student_id: string): Promise<IGradeModel>;
    /**
     * @param {IGradeModel} body
     * @returns {Promise<IGradeModel>}
     * @memberof IGradeService
     */
    addGrade(student_id: string, assignment_id: string, body: {grade: number}): Promise<IGradeModel>;

    /**
     * @param {IGradeModel} body
     * @returns {Promise<IGradeModel>}
     * @memberof IGradeService
     */
    updateGrade(grade_id: Types.ObjectId, body: {grade: number}): Promise<IGradeModel>;

    getAssignmentAverage(assignment_id: any): Promise <IGradeModel>;


    /**
     * @param {string} id
     * @returns {Promise<IGradeModel>}
     * @memberof IGradeService
     */
    remove(id: Types.ObjectId): Promise<IGradeModel>;
}
