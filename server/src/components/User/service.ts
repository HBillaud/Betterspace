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

            const user: IUserModel = await UserModel.findOneAndUpdate(filter, update);

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
                let temp: ICourseModel = await CourseService.findOne(course_id);
                courses.push(temp);
            }

            return courses;
        } catch(error) {
            throw new Error(error.message);
        }
    }
};

export default UserService;
