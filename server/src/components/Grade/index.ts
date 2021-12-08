import GradeService from './service';
import { HttpError } from '../../config/error';
import { IGradeModel } from './model';
import { NextFunction, Request, Response } from 'express';


/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findOne(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const grade: IGradeModel = await GradeService.findOne(req.params.grade_id);

        res.status(200).json(grade);
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
        const grade: IGradeModel = await GradeService.addGrade(req.body);
        res.status(200).json(grade);
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
        const grade: IGradeModel = await GradeService.remove(req.params.id);

        res.status(200).json(grade);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}