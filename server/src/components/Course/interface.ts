import { IAssignmentModel } from '../Assignment/model';
import { ICourseModel } from './model';

/**
 * @export
 * @interface ICourseService
 */
export interface ICourseService {
    /**
     * @param {string} id
     * @returns {Promise<ICourseModel>}
     * @memberof ICourseService
     */
    findOne(id: string): Promise<ICourseModel>;

    /**
     * @param {string[]} courses
     * @param {string[]} profs
     * @param {number} sortCourses
     * @returns {Promise<ICourseModel[]>}
     * @memberof ICourseService
     */
    findAll(courses: string[], profs: string[], sortCourses: number): Promise<ICourseModel[]>;

    /**
     * @param{string} id
     */
     findGradeReportOptions(id: string): Promise<ICourseModel[]>;

     /**
      * @param {string} id
      * @param {string[]} courses
      * @param {string[]} assignments
      * @param {string[]} students
      * @returns {Promise<void>}
      * @memberof ICourseService
      */
     findGradeReportInfo(id: string, courses: string[], assignments: string[], students: string[]): Promise<{course_id: string, assignment: string, student: string, grade: number, averageGrade: number}[]>;

    /**
     * @param {ICourseModel} body
     * @returns {Promise<ICourseModel>}
     * @memberof ICourseService
     */
    addCourse(body: ICourseModel, professor_id: string): Promise<ICourseModel>;

    /**
     * @param {string} student_id
     * @param {string} course_id
     * @return {Promise<ICourseModel>}
     * @memberof ICourseService
     */
    addStudent(student_id: string, course_id: string): Promise<ICourseModel>;

    /**
     * @param {string} course_id
     * @param {IAssignmentModel} assignment
     * @return {Promise<ICourseModel>}
     * @memberof ICourseService
     */
    addAssignment(course_id: string, assignment: IAssignmentModel): Promise<ICourseModel>;

        /**
     * @param {string} student_id
     * @param {string} course_id
     * @return {Promise<ICourseModel>}
     * @memberof ICourseService
     */
    removeStudent(student_id: string, course_id: string): Promise<ICourseModel>;

    /**
     * @param {string} id
     * @returns {Promise<ICourseModel>}
     * @memberof ICourseService
     */
    remove(id: string): Promise<ICourseModel>;
}
