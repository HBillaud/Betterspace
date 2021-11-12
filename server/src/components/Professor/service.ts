import * as Joi from 'joi';
import ProfessorModel, { IProfessorModel } from './model';
import { IProfessorService } from './interface';
import { Types } from 'mongoose';
import { ICourseModel } from '../Course/model';
import CourseService from '../Course/service';

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
    },
    
    /**
     * @param {string} course_id
     * @return {Promise<IProfessorModel>}
     * @memberof IProfessorService
     */
    async addCourse(id: string, course_id: string): Promise<IProfessorModel> {
            try {
                const filter = {_id: id};
                const update = {$push: {courses: course_id}};
                console.log(id);
                const user: IProfessorModel = await ProfessorModel.findOneAndUpdate(filter, update);
    
                return user;
            } catch (error) {
                throw new Error(error.message);
            }
        },

    /**
     * @param {string} id 
     * @returns {Promise<ICourseModel[]>}
     * @memberof IProfessorService
     */
    async get(id: string): Promise<ICourseModel[]> {
        try {
            const professor: IProfessorModel = await ProfessorService.findOne(id);
            var courses: ICourseModel[] = new Array();

            for (let course_id of professor.courses) {
                let temp: ICourseModel = await CourseService.findOne(course_id);
                courses.push(temp);
            }

            return courses;
        } catch(error) {
            throw new Error(error.message);
        }
    }
};

export default ProfessorService;