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
    async findOne(assignment_id: Types.ObjectId, student_id: string): Promise < IGradeModel > {
        try {
            return await GradeModel.findOne({
                student_id: student_id,
                assignment_id: assignment_id
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
     async addGrade(student_id: string, assignment_id: string, body: {grade: number}): Promise < IGradeModel > {
        try {
            const grade: IGradeModel = new GradeModel({
                _id: new Types.ObjectId(),
                assignment_id: assignment_id,
                student_id: student_id,
                grade: body.grade
            });

            const saved: IGradeModel = await grade.save();

            return saved;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    /**
     * @param {IGradeModel} body
     * @returns {Promise < IGradeModel >}
     * @memberof GradeService
     */
         async updateGrade(grade_id: Types.ObjectId, body: {grade: number}): Promise < IGradeModel > {
            try {
                const filter = { _id : grade_id };
                const update = { grade: body.grade}
    
                return await GradeModel.findOneAndUpdate(filter, update);
            } catch (error) {
                throw new Error(error.message);
            }
        },
    /**
     * @param {string} id
     * @returns {Promise < IGradeModel >}
     * @memberof GradeS
     */
    async remove(id: Types.ObjectId): Promise < IGradeModel > {
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