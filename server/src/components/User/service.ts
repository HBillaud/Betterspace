import UserModel, { IUserModel } from './model';
import { IUserService } from './interface';
import { ICourseModel } from '../Course/model';
import CourseService from '../Course/service';

/**
 * @export
 * @implements {IUserModelService}
 */
const UserService: IUserService = {
    /**
     * @param {string} id
     * @returns {Promise < IUserModel >}
     * @memberof UserService
     */
    async findOne(id: string): Promise < IUserModel > {
        try {
            return await UserModel.findOne({
                _id: id
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IUserModel >}
     * @memberof UserService
     */
    async remove(id: string): Promise < IUserModel > {
        try {
            const user: IUserModel = await UserModel.findOneAndRemove({
                _id: id
            });

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} course_id
     * @return {Promise<IUserModel>}
     * @memberof IUserService
     */
    async enrollCourse(id: string, course_id: string): Promise<IUserModel> {
        try {
            const filter = {_id: id};
            const update = {$push: {courses: course_id}};
            const query: IUserModel = await UserModel.findOne({
                _id: id
            });
            console.log(course_id, query.courses);
            if (course_id in query.courses) {
                throw new Error('This student is already enrolled');
            }
            const user: IUserModel = await UserModel.findOneAndUpdate(filter, update);

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async reportCard(id: string): Promise<{course_id: number, pointsEarned: number, finalGrade: number}[]> {
        try {
            const user = await UserModel.findById(id).populate('courses');
            const courses: any = user.courses;
            const gradeInfo: {course_id: number, grades: any[]}[] = [];
            for (let i = 0; i < courses.length; i++) {
                const info = await CourseService.getStudentGrades(id,courses[i]._id);
                gradeInfo.push({course_id: courses[i].id, grades: info})
            }
            const output: {course_id: number, pointsEarned: number, finalGrade: number}[] = [];
            for (let i = 0; i < gradeInfo.length; i++) {
                const id = gradeInfo[i].course_id;
                let pointsPossible = 0;
                let pointsEarned = 0;
                for (let j = 0; j < gradeInfo[i].grades.length; j++) {
                    pointsPossible += 100;
                    pointsEarned += gradeInfo[i].grades[j].grade;
                }
                const finalGrade: number = (pointsEarned/pointsPossible) *100;
                output.push({course_id: id, pointsEarned: pointsEarned, finalGrade: finalGrade})
            }
            return output;
            
        } catch (error) {
            throw new Error(error.message);
        }
    },
    /**
     * @param {string} course_id
     * @return {Promise<IUserModel>}
     * @memberof IUserService
     */
     async dropCourse(id: string, course_id: string): Promise<IUserModel> {
        try {
            const filter = {_id: id};
            const update = {$pull: {courses: course_id}};

            const user: IUserModel = await UserModel.findOneAndUpdate(filter, update);

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id 
     * @returns {Promise<ICourseModel[]>}
     * @memberof IUserService
     */
    async listCurrentCourses(id: string): Promise<ICourseModel[]> {
        try {
            const user: IUserModel = await UserService.findOne(id);
            var courses: ICourseModel[] = new Array();

            for (let course_id of user.courses) {
                let temp: ICourseModel = await CourseService.findOne(course_id.toString());
                courses.push(temp);
            }

            return courses;
        } catch(error) {
            throw new Error(error.message);
        }
    }
};

export default UserService;
