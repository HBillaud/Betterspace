import GradeModel, { IGradeModel } from './model';
import { IGradeService } from './interface';
import { IAssignmentModel } from '../Assignment/model';
import ProfessorService from '../Professor/service';
import { IProfessorModel } from '../Professor/model';
import {Types} from 'mongoose';
import { StringSchema } from 'joi';
import sanitize = require("mongo-sanitize")

/**
 * @export
 * @implements {IGradeModelService}
 */
const GradeService: IGradeService = {

    /**
     * @param {string} id
     * @returns {Promise < IGradeModel[] >}
     * @memberof GradeService
     */
    async findAllAssignments(student_id: string, course_id: string): Promise < IGradeModel []> {
        try {
            const grades = await GradeModel.find({
                student_id: student_id,
                course_id: course_id,
            }).populate('assignment_id');
            return grades;
            
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async findClassGrades(course_id: string): Promise <IGradeModel> {
        try {
            const grades = await GradeModel.aggregate([{
                $match : {course_id: course_id}
            },{
                $group : {
                    _id : "$course_id",
                    average :{
                        $avg: "$grade"
                    }
                }
            }]);
            return grades[0];
        }catch (error) {
            throw new Error(error.message);
        }
    },
    async finalGrade(course_id: string, student_id: string, gradefilter: number, avgfilter: number, avg: number): Promise <IGradeModel> {
        try {
            if (avgfilter === -1) {
            const grades = await GradeModel.aggregate([{
                $match : {$and: [{course_id: course_id}, {student_id: student_id}] }
            },{
                $group : {
                    _id : "$course_id",
                    total : {
                        $sum : "$grade"
                    },
                    average :{
                        $avg: "$grade"
                    }
                }
            }, {
                $match: {$and: [{average: {$gt: sanitize(gradefilter)}}, {average: {$lt: sanitize(avg)}}]}
            }]);
            return grades[0];
        } 
        if (avgfilter === 1) {
            const grades = await GradeModel.aggregate([{
                $match : {$and: [{course_id: course_id}, {student_id: student_id}] }
            },{
                $group : {
                    _id : "$course_id",
                    total : {
                        $sum : "$grade"
                    },
                    average :{
                        $avg: "$grade"
                    }
                }
            }, {
                $match: {$and: [{average: {$gt: sanitize(gradefilter)}}, {average: {$gt: sanitize(avg)}}]}
            }]);
            return grades[0];
        }
        const grades = await GradeModel.aggregate([{
            $match : {$and: [{course_id: course_id}, {student_id: student_id}] }
        },{
            $group : {
                _id : "$course_id",
                total : {
                    $sum : "$grade"
                },
                average :{
                    $avg: "$grade"
                }
            }
        }, {
            $match: {average: {$gt: sanitize(gradefilter)}}
        }]);
        return grades[0];
            
        }catch (error) {
            throw new Error(error.message);
        }
    },
     async findOne(assignment_id: string, student_id: string): Promise < IGradeModel > {
         try {
             return await GradeModel.findOne({
                 assignment_id: assignment_id,
                 student_id: student_id,
             });
         } catch (error) {
             throw new Error(error.message);
         }
     },

     async getAssignmentAverage(assignment_id: string): Promise <IGradeModel> {
       try {
         const grades = await GradeModel.aggregate([{
           $match : {assignment_id: assignment_id}
         }, {
           $group : {
             _id: "$assignment_id",
             average: {
               $avg: "$grade"
             }
           }
         }
       ]);
       return grades[0];
       } catch(error) {
         throw new Error(error.message);
       }
     },

    /**
     * @param {IGradeModel} body
     * @returns {Promise < IGradeModel >}
     * @memberof GradeService
     */
     async addGrade(student_id: string, assignment_id: string, course_id: string, body: {grade: number}): Promise < IGradeModel > {
        try {
            const grade: IGradeModel = new GradeModel({
                _id: new Types.ObjectId(),
                course_id: course_id, 
                assignment_id: assignment_id,
                student_id: student_id,
                grade: sanitize(body.grade)
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
