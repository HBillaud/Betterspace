import CourseModel, { ICourseModel } from './model';
import { ICourseService } from './interface';
import { IAssignmentModel } from '../Assignment/model';
import { IGradeModel } from '../Grade/model';
import ProfessorService from '../Professor/service';
import UserService from '../User/service';
import GradeService from '../Grade/service';
import AssignmentService from '../Assignment/service';
import { IUserModel } from '../User/model';
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
            }).populate(
              'assignments'
            );
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
    async findGradeReportOptions(id: any): Promise <ICourseModel[]> {
      let out: any[] = [];
      out = await CourseModel.find({professor: id}).populate(['students', 'assignments']);
      return out;
    },

    async findGradeReportInfo(id: any, courses: string[], assignments: string[], students: string[]): Promise<{course_id: string, assignment: string, student: string, grade: number, averageGrade: number}[]> {
        let courseList: any[] = [];
        if(courses.length > 0) {
          courseList = await CourseModel.find({_id: {$in: courses}}).populate(['students', 'assignments']);
        } else {
          courseList = await CourseModel.find({professor: id}).populate(['students', 'assignments']);
        }

        const gradeInfo: {course_id: string, assignment: string, student: string, grade: number, averageGrade: number}[] = [];

        for(var i = 0; i < courseList.length; i++) {
          const current = courseList[i];
          let assignmentList = current.assignments;
          if(assignments.length > 0) {
            let tempList = [];
            for(var l = 0; l < assignmentList.length; l++) {
              if(assignments.includes(assignmentList[l].title)) {
                tempList.push(assignmentList[l]);
              }
            }
            assignmentList = tempList;
          }
          let studentList = current.students;
          if(students.length > 0) {
            let tempList = [];
            for(var l = 0; l < studentList.length; l++) {
              if(students.includes(studentList[l].lastname)) {
                tempList.push(studentList[l]);
              }
            }
            studentList = tempList;
          }
          for(var j = 0; j < studentList.length; j++) {
            for(var k = 0; k < assignmentList.length; k++) {
              const grade = await GradeService.findOne(assignmentList[k]._id, studentList[j]._id);
              const avgGrade: any = await GradeService.getAssignmentAverage(assignmentList[k]._id.toString());
              gradeInfo.push({course_id: current._id, assignment: assignmentList[k].title, student: studentList[j].firstname + " " + studentList[j].lastname, grade: grade.grade, averageGrade: avgGrade.average });
            }
          }
        }
        return gradeInfo;
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
