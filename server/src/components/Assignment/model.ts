import * as connections from '../../config/connection/connection';
import { Types, Document, Schema } from 'mongoose';

/**
 * @export
 * @interface IAssignmentModel
 * @extends {Document}
 */
export interface IAssignmentModel extends Document {
    _id: Types.ObjectId;
    title: string;
    description: string;
    due_date: string;
}
 

/**
 * @swagger
 * components:
 *  schemas:
 *    AssignmentSchema:
 *      properties:
 *        _id:
 *          type: ObjectId
 *        title:
 *          type: string
 *        description:
 *          type: string
 *        due_date:
 *          type: string
 *    Assignments:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/AssignmentSchema'
 */
const AssignmentSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    due_date: {
        type: String,
        required: true
    }
}, {
    collection: 'assignments',
    versionKey: false
});

export default connections.db.model < IAssignmentModel > ('AssignmentModel', AssignmentSchema);