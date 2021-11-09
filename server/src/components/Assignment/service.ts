import AssignmentModel, { IAssignmentModel } from './model';
import { IAssignmentService } from './interface';
import { Types } from 'mongoose';

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

    /**
     * @param {IAssignmentModel} body
     * @returns {Promise< IAssignmentModel >}
     * @memberof AssignmentService
     */
    async add(body: IAssignmentModel): Promise< IAssignmentModel > {
        try {
            const assignment: IAssignmentModel = new AssignmentModel({
                title: body.title,
                description: body.description,
                due_date: body.due_date
            });

            return await assignment.save();
        } catch (error) {
            throw new Error('This course already exists');
        }
    }
}

export default AssignmentService;