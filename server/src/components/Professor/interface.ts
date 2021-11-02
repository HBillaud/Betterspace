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
}