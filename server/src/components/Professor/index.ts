import ProfessorService from './service';
import { HttpError } from '../../config/error';
import { IProfessorModel } from './model';
import { NextFunction, Request, Response } from 'express';
import { ICourseModel } from '../Course/model';

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findOne(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const user: IProfessorModel = await ProfessorService.findOne(req.params.id);

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
 export async function get(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const courses: ICourseModel[] = await ProfessorService.get(req.params.id);
        const professor: string = (await ProfessorService.findOne(req.params.id)).firstname;

        res.status(200).json({firstname: professor, courses: courses});
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
