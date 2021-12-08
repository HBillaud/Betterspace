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
    findOne(id: Types.ObjectId): Promise<IGradeModel>;

    /**
     * @param {IGradeModel} body
     * @returns {Promise<IGradeModel>}
     * @memberof IGradeService
     */
    addGrade(body: IGradeModel): Promise<IGradeModel>;

    /**
     * @param {string} id
     * @returns {Promise<IGradeModel>}
     * @memberof IGradeService
     */
    remove(id: string): Promise<IGradeModel>;
}
