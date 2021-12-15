import CourseService from './service';
import { HttpError } from '../../config/error';
import { ICourseModel } from './model';
import { NextFunction, Request, Response } from 'express';
import ProfessorService from '../Professor/service';
import { db } from '../../config/connection/connection';
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
   const session = await db.startSession();
   session.startTransaction();
    try {
        const course: ICourseModel = await CourseService.addCourse(req.body, req.params.id);
        await ProfessorService.addCourse(req.params.id, req.body._id);
        await session.commitTransaction();
        session.endSession();
        res.status(200).json(course);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
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
export async function getStudentGrades(req: Request, res:Response, next: NextFunction): Promise<void> {
    try {
        const grades = await CourseService.getStudentGrades(req.params.id, req.params.course_id);
        res.status(200).json(grades);
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
        const courses: ICourseModel[] = await CourseService.findAll(req.body.courses, req.body.profs, req.body.sortCourses);

        res.status(200).json(courses);
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
 export async function selectOptions(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const gradeReportInfo: ICourseModel[] = await CourseService.findGradeReportOptions(req.params.id);

        res.status(200).json(gradeReportInfo);
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
 export async function gradeReport(req: Request, res: Response, next: NextFunction): Promise < void > {
   try {
     const response = await CourseService.findGradeReportInfo(req.params.id, req.body.courses, req.body.assignments, req.body.students);

     res.status(200).json(response);
   } catch(error) {
     next(new HttpError(error.message.status, error.message));
   }
 }
