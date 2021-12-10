import CourseModel, { ICourseModel } from './model';
import { ICourseService } from './interface';
import { IAssignmentModel } from '../Assignment/model';
import ProfessorService from '../Professor/service';
import { IProfessorModel } from '../Professor/model';
import {Types} from 'mongoose';

/**
 * @export
 * @implements {ICourseModelService}
 */
const CourseService: ICourseService = {
    /**
     * @param {string} id
     * @returns {Promise < ICourseModel >}
     * @memberof CourseService
     */
    async findOne(id: string): Promise < ICourseModel > {
        try {
            return await CourseModel.findOne({
                _id: id
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /** 
     * @returns {Promise <ICourseModel[]>}
     * @memberof CourseService
     */
    async findAll(courses: string[], profs: string[]): Promise <ICourseModel[]> {
        try {
            let out: ICourseModel[] = [];
            if (courses.length > 0 && profs.length > 0) {
                out = await CourseModel.find({_id: {$in: courses}}).populate({
                    path: 'professor',
                    select: 'lastname',
                    match:  {lastname: {"$in": profs}}
                });
            } else if (courses.length > 0 && profs.length == 0) {
                out = await CourseModel.find({_id: {$in: courses}}).populate('professor','lastname');
            } else if (courses.length == 0 && profs.length > 0) {
                out = await CourseModel.find().populate(
                {
                    path: 'professor',
                    select: 'lastname',
                    match:  {lastname: {"$in": profs}}
                });
            } else {
                out = await CourseModel.find().populate('professor','lastname');
            }
            //const out: ICourseModel[] = await CourseModel.find().populate('professor','lastname');
            return out;
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    /**
     * @param {ICourseModel} body
     * @returns {Promise < ICourseModel >}
     * @memberof CourseService
     */
     async addCourse(body: ICourseModel, professor_id: string): Promise < ICourseModel > {
        try {
            const course: ICourseModel = new CourseModel({
                _id: body._id,
                title: body.title,
                description: body.description,
                professor: professor_id
            });
            const query: ICourseModel = await CourseModel.findOne({
                _id: body._id
            });

            if (query) {
                throw new Error('This course already exists');
            }

            const saved: ICourseModel = await course.save();

            return saved;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} student_id
     * @param {string} course_id
     * @returns {Promise < ICourseModel >}
     * @memberof CourseService
     */
     async addStudent(student_id: string, course_id: string): Promise < ICourseModel > {
        try {
            const filter = {_id: course_id};
            const update = {$push: {students: student_id}};
            const query: ICourseModel = await CourseModel.findOne({
                _id: course_id
            });
            console.log(student_id, query.students);
            if (student_id in query.students) {
                throw new Error('This student is already enrolled');
            }
            const course: ICourseModel = await CourseModel.findOneAndUpdate(filter, update);

            return course;
        } catch (error) {
            throw new Error(error.message);
        }
    },    
   
    /**
     * @param {string} student_id
     * @param {string} course_id
     * @returns {Promise < ICourseModel >}
     * @memberof CourseService
     */
     async removeStudent(student_id: string, course_id: string): Promise < ICourseModel > {
        try {
            const filter = {_id: course_id};
            const update = {$pull : {students: student_id}};

            const course: ICourseModel = await CourseModel.findOneAndUpdate(filter, update);

            return course;
        } catch (error) {
            throw new Error(error.message);
        }
    },    

    /**
     * @param {string} id
     * @returns {Promise < ICourseModel >}
     * @memberof CourseService
     */
    async remove(id: string): Promise < ICourseModel > {
        try {
            const course: ICourseModel = await CourseModel.findOneAndRemove({
                _id: id
            });

            return course;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} course_id
     * @param {IAssignmentModel} assignment
     * @memberof CourseService
     */
    async addAssignment(course_id: string, assignment: IAssignmentModel): Promise<ICourseModel> {
        try {
            const filter = { _id : course_id };
            const update = {$push : {assignments: assignment._id}};

            return await CourseModel.findOneAndUpdate(filter, update);
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default CourseService;