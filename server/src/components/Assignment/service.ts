import AssignmentModel, { IAssignmentModel } from './model';
import { IAssignmentService } from './interface';
import { Schema, Types } from 'mongoose';
import CourseService from '../Course/service';
import sanitize from 'mongo-sanitize';

/**
 * @export
 * @implements {IAssignmentService}
 */
const AssignmentService : IAssignmentService = {
    /**
     * @param {string} id
     * @return {Promise< IAssignmentModel >}
     * @memberof AssignmentService
    */
    async findOne(id: string): Promise < IAssignmentModel > {
        try {
            return await AssignmentModel.findById(id);
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async findAll(course_id: string): Promise < IAssignmentModel[]> {
        try {
            return await AssignmentModel.find({course_id: course_id});
        }
         catch (error) {
             throw new Error(error.message);
         }
    },
    /**
     * @param {IAssignmentModel} body
     * @param {string} course_id
     * @returns {Promise< IAssignmentModel >}
     * @memberof AssignmentService
     */
    async add(body: IAssignmentModel, course_id: string): Promise< IAssignmentModel > {
        try {
            const assignment: IAssignmentModel = new AssignmentModel({
                _id: new Types.ObjectId(),
                title: body.title,
                description: body.description,
                due_date: body.due_date,
                course: course_id,
            });
            return await assignment.save();
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} course_id
     * @return {Promise< IAssignmentModel[] >}
     * @memberof AssignmentService
     */
    async findAllInCourse(course_id: string): Promise< IAssignmentModel[] > {
        try {
            const assignments: IAssignmentModel[] = await AssignmentModel.find({
                course: course_id
            });
            return assignments;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default AssignmentService;
