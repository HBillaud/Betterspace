import * as connections from '../../config/connection/connection';
import { Document, isValidObjectId, model, Schema } from 'mongoose';

/**
 * @export
 * @interface ICourseModel
 * @extends {Document}
 */
export interface ICourseModel extends Document {
    _id: string;
    title: string;
    description: string;
    professor: {
        type: Schema.Types.String,
        ref: 'ProfessorModel',
    };
    assignments: [{
        type: Schema.Types.ObjectId,
        ref: 'AssignmentModel',
    }];
    students: [{
        type: Schema.Types.String,
        ref: 'UserModel',
    }];
}
 

/**
 * @swagger
 * components:
 *  schemas:
 *    CourseSchema:
 *      properties:
 *        _id:
 *          type: string
 *        description:
 *          type: string
 *        professor:
 *          type: string
 *        assignments:
 *          type: array
 *        students:
 *          type: array
 *    Courses:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/CourseSchema'
 */
const CourseSchema: Schema = new Schema({
    _id: {
        type: String,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    professor: {
        type: Schema.Types.String,
        ref: 'ProfessorModel',
        required: true
    },
    assignments: [{
        type: Schema.Types.ObjectId,
        ref: 'AssignmentModel',
        required: false
    }],
    students: [{
        type: Schema.Types.String,
        ref: 'UserModel',
        required: false
    }]
}, {
    collection: 'courses',
    versionKey: false
});

//export default model<ICourseModel>('CourseModel', CourseSchema);

export default connections.db.model < ICourseModel > ('CourseModel', CourseSchema);
