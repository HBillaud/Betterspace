import * as connections from '../../config/connection/connection';
import { Document, Types, Schema } from 'mongoose';
import internal from 'stream';


/**
 * @export
 * @interface IGradeModel
 * @extends {Document}
 */
 export interface IGradeModel extends Document {
    _id: Types.ObjectId;
    student_id: {
        type: Schema.Types.String,
        ref: 'UserModel',
    };
    assignment_id: {
        type: Schema.Types.ObjectId,
        ref: 'AssignmentModel',
    };
    grade: Number;
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
    student_id: {type: Schema.Types.String, ref: 'UserModel', required: true},
    assignment_id: {type: Schema.Types.String, ref: 'AssignmentModel', required: true},
    grade: { type: Number, required: true},
}, {
        collection: 'grades',
        versionKey: false
});
// var Student = require('mongoose').model('UserModel');
// var Assignment = require('mongoose').model('AssignmentModel');
// GradeSchema.statics.findByIds = function (student_id, assignment_id, callback) {
//     var query = this.findOne()
//     Student.findOne({'_id': student_id}, function (error: any, student: any) {
//         Assignment.findOne({'_id': assignment_id}, function (error: any, assignment: any) {
//             query.where(
//                 {student_id: student._id, assignment: assignment._id}
//             ).exec(callback);
//         })
//     })
//     return query;

// }
export default connections.db.model < IGradeModel > ('GradeModel', GradeSchema);


