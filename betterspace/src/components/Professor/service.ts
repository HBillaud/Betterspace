import * as Joi from 'joi';
import ProfessorModel, { IProfessorModel } from './model';
import { IProfessorService } from './interface';
import { Types } from 'mongoose';

/**
 * @export
 * @implements {IProfessorModelService}
 */
const ProfessorService: IProfessorService = {
    /**
     * @param {string} id
     * @returns {Promise < IProfessorModel >}
     * @memberof ProfessorService
     */
    async findOne(id: string): Promise < IProfessorModel > {
        try {
            return await ProfessorModel.findOne({
                _id: id
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IProfessorModel >}
     * @memberof ProfessorService
     */
    async remove(id: string): Promise < IProfessorModel > {
        try {
            const user: IProfessorModel = await ProfessorModel.findOneAndRemove({
                _id: id
            });

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default ProfessorService;