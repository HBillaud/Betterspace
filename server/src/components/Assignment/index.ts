import AssignmentService from './service';
import { HttpError } from '../../config/error';
import { IAssignmentModel } from './model';
import { NextFunction, Request, Response } from 'express';
import CourseService from '../Course/service';

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
 export async function addAssignment(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const assignment: IAssignmentModel = await AssignmentService.add(req.body);
        await CourseService.addAssignment(req.params.course_id, assignment);

        res.status(200).json(assignment);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}