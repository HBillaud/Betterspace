import UserService from './service';
import CourseService from '../Course/service';
import { HttpError } from '../../config/error';
import { IUserModel } from './model';
import { NextFunction, Request, Response } from 'express';
import { ICourseModel } from '../Course/model';

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function get(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const courses: ICourseModel[] = await UserService.listCurrentCourses(req.params.id);
        const name: IUserModel =  (await UserService.findOne(req.params.id));
        res.status(200).json(name);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function remove(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const user: IUserModel = await UserService.remove(req.params.id);

        res.status(200).json(user);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise < void >}
 */
export async function reportCard(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const response = await UserService.reportCard(req.params.id, req.body);
        res.status(200).json(response);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise < void >}
 */
export async function enrollCourse(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const user: IUserModel = await UserService.enrollCourse(req.params.id, req.body.course_id);
        await CourseService.addStudent(req.params.id, req.body.course_id);

        res.status(200).json(user);
    } catch(error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Promise < void >}
 */
 export async function dropCourse(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const user: IUserModel = await UserService.dropCourse(req.params.id, req.body.course_id);
        await CourseService.removeStudent(req.params.id, req.body.course_id);

        res.status(200).json(user);
    } catch(error) {
        next(new HttpError(error.message.status, error.message));
    }
}