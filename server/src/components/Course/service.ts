import CourseModel, { ICourseModel } from './model';
import { ICourseService } from './interface';
import { IAssignmentModel } from '../Assignment/model';
import ProfessorService from '../Professor/service';
import { IProfessorModel } from '../Professor/model';
import {Types} from 'mongoose';
import { IGradeModel } from '../Grade/model';
import GradeService from '../Grade/service';
import UserService from '../User/service';

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
    async findAll(courses: string[], profs: string[], sortCourses: number): Promise <ICourseModel[]> {
        try {
            let out: any[] = [];
            if (courses.length > 0 && profs.length > 0) {
                out = await CourseModel.find({_id: {$in: courses}}).populate({
                    path: 'professor',
                    select: 'lastname',
                    match:  {lastname: {"$in": profs}}
                }).sort({'_id': sortCourses});
            } else if (courses.length > 0 && profs.length == 0) {
                out = await CourseModel.find({_id: {$in: courses}}).populate('professor','lastname').sort({'_id': sortCourses});
            } else if (courses.length == 0 && profs.length > 0) {
                out = await CourseModel.find().populate(
                {
                    path: 'professor',
                    select: 'lastname',
                    match:  {lastname: {"$in": profs}}
                }).sort({'_id': sortCourses});
            } else {
                out = await CourseModel.find().populate('professor','lastname').sort({'_id': sortCourses});
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
            for (let i = 0; i< query.students.length; i++) {
                if (query.students[i].toString() == student_id) {
                    throw new Error('This student is already enrolled');
                }
            }
            const course: ICourseModel = await CourseModel.findOneAndUpdate(filter, update);

            return course;
        } catch (error) {
            throw new Error(error.message);
        }
    },    
    async averageClassGrade(id: string): Promise<number> {
        try {
            const students: any[] = await (await CourseModel.findById(id)).students;
            let count = 0;
            let totalGrades = 0;
            for (let i = 0; i < students.length; i++) {
                const grade: any = await UserService.finalGrade(students[i], id);
                count++;
                totalGrades += grade.finalGrade;
            }
            return totalGrades/count;

        } catch (error) {
            throw new Error (error.message);
        }

        return 0;
    },
    async getStudentGrades(student_id: string, course_id: string): Promise<{grade: number, assignment: string, description: string, due_date: string}[]> {
        try {
            const populatedCourse = await CourseModel.findById(course_id).populate('assignments');
            if (populatedCourse) {
                const assignments: any = populatedCourse.assignments;
                let grades: {grade: number, assignment: string, description: string, due_date: string}[] = [];
                for (let i = 0; i < assignments.length; i++) {
                    const grade: IGradeModel = await GradeService.findOne(assignments[i]._id, student_id);
                    if (grade) {
                        grades.push({grade: grade.grade, assignment: assignments[i].title, description: assignments[i].description, due_date: assignments[i].due_date });
                    } else {
                        grades.push({grade: 0, assignment: assignments[i].title, description: assignments[i].description, due_date: assignments[i].due_date });
                    }
                }
                return grades;
            } else {
                return;
            }
        } catch (error) {
            throw new Error (error.message);
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