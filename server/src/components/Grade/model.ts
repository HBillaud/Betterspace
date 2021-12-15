import * as connections from '../../config/connection/connection';
import { Document, Types, Schema } from 'mongoose';
import internal from 'stream';
import { number } from 'joi';


/**
 * @export
 * @interface IGradeModel
 * @extends {Document}
 */
 export interface IGradeModel extends Document {
    _id: Types.ObjectId;
    student_id: String;
    assignment_id: String;
    course_id: String;
    grade: number;
}


/**
 * @swagger
 * components:
 *  schemas:
 *    GradeSchmea:
 *      properties:
 *        _id:
 *          type: ObjectId
 *        student_id:
 *          type: string
 *        assingmnet_id:
 *          type: string
 *        grade:
 *          type: number
 *    
 */
 const GradeSchema: Schema = new Schema({
    _id: {
        type: Types.ObjectId,
        unique: true
    },
    course_id: {type: Schema.Types.String, ref: 'CourseModel', required: true},
    student_id: {type: Schema.Types.String, ref: 'UserModel', required: true},
    assignment_id: {type: Schema.Types.String, ref: 'AssignmentModel', required: true},
    grade: { type: Schema.Types.Number, required: true},
}, {
        collection: 'grades',
        versionKey: false
});

export default connections.db.model < IGradeModel > ('GradeModel', GradeSchema);


