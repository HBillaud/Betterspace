import GradeModel, { IGradeModel } from './model';
import { IGradeService } from './interface';
import { IAssignmentModel } from '../Assignment/model';
import ProfessorService from '../Professor/service';
import { IProfessorModel } from '../Professor/model';
import {Types} from 'mongoose';

/**
 * @export
 * @implements {IGradeModelService}
 */
const GradeService: IGradeService = {
    /**
     * @param {string} id
     * @returns {Promise < IGradeModel >}
     * @memberof GradeService
     */
    async findOne(grade_id: string): Promise < IGradeModel > {
        try {
            return await GradeModel.findOne({
                _id: grade_id
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IGradeModel} body
     * @returns {Promise < IGradeModel >}
     * @memberof GradeService
     */
     async addGrade(body: IGradeModel): Promise < IGradeModel > {
        try {
            const grade: IGradeModel = new GradeModel({
                assignment_id: body.assignment_id,
                student_id: body.student_id,
                grade: body.grade
            });

            const saved: IGradeModel = await grade.save();

            return saved;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    /**
     * @param {string} id
     * @returns {Promise < IGradeModel >}
     * @memberof GradeS
     */
    async remove(id: string): Promise < IGradeModel > {
        try {
            const grade: IGradeModel = await GradeModel.findOneAndRemove({
                _id: id
            });

            return grade;
        } catch (error) {
            throw new Error(error.message);
        }
    },

 
};

export default GradeService;