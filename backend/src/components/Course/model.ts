import * as connections from '../../config/connection/connection';
import { Document, Schema } from 'mongoose';

/**
 * @export
 * @interface ICourseModel
 * @extends {Document}
 */
export interface ICourseModel extends Document {
    _id: string;
    title: string;
    description: string;
    professor: string;
    assignments: string[];
    students: string[];
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
        required: true,
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
        type: String,
        required: true
    },
    assignments: Array,
    students: Array
}, {
    collection: 'courses',
    versionKey: false
});

export default connections.db.model < ICourseModel > ('CourseModel', CourseSchema);
