import AssignmentService from './service';
import { HttpError } from '../../config/error';
import { IAssignmentModel } from './model';
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
        const assignment: IAssignmentModel = await AssignmentService.findOne(req.params.assignment_id);

        res.status(200).json(assignment);
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
        const assignment: IAssignmentModel = await AssignmentService.add(req.body);

        res.status(200).json(assignment);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}