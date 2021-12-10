import CourseService from './service';
import { HttpError } from '../../config/error';
import { ICourseModel } from './model';
import { NextFunction, Request, Response } from 'express';
import ProfessorService from '../Professor/service';

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findOne(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const course: ICourseModel = await CourseService.findOne(req.params.course_id);

        res.status(200).json(course);
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
 export async function add(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const course: ICourseModel = await CourseService.addCourse(req.body, req.params.id);
        await ProfessorService.addCourse(req.params.id, req.body._id);
        res.status(200).json(course);
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
        const user: ICourseModel = await CourseService.remove(req.params.id);

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
 * @returns {Promise < void >}
 */
 export async function courseReport(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const courses: ICourseModel[] = await CourseService.findAll(req.body.courses, req.body.profs);

        res.status(200).json(courses);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}