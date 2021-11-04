import * as passport from 'passport';
import AuthService from './service';
import HttpError from '../../config/error';
import { IUserModel } from '../User/model';
import { NextFunction, Request, Response } from 'express';
import { IProfessorModel } from '../Professor/model';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction}next 
 * @param {IUserModel} user 
 * @param {string} resMessage 
 */
function passportRequestLoginStudent(req: Request, res: Response, next: NextFunction, user: IUserModel ,resMessage: string): void {
    return req.logIn(user, (err) => {
        if (err) return next(new HttpError(err));

        res.json({
            id: user._id,
            status: 200,
            logged: true,
            message: resMessage
        });
    });
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction}next 
 * @param {IProfessorModel} user 
 * @param {string} resMessage 
 */
 function passportRequestLoginProfessor(req: Request, res: Response, next: NextFunction, user: IProfessorModel ,resMessage: string): void {
    return req.logIn(user, (err) => {
        if (err) return next(new HttpError(err));

        res.json({
            status: 200,
            logged: true,
            message: resMessage
        });
    });
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction}next 
 * @param {IUserModel} user 
 * @param {string} resMessage 
 */
function studentLogin(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('student-local', (err: Error, user: IUserModel) => {
        if (err) {
            return next(new HttpError(400, err.message));
        }

        if (!user) {
            return res.json({
                status: 401,
                logged: false,
                message: 'Invalid credentials!'
            });
        }
        passportRequestLoginStudent(req, res, next, user, 'Sign in successfull');
    })(req, res, next);
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction}next 
 * @param {IUserModel} user 
 * @param {string} resMessage 
 */
function professorLogin(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('professor-local', (err: Error, user: IProfessorModel) => {
        if (err) {
            return next(new HttpError(400, err.message));
        }

        if (!user) {
            return res.json({
                status: 401,
                logged: false,
                message: 'Invalid credentials!'
            });
        }
        passportRequestLoginProfessor(req, res, next, user, 'Sign in successfull');
    })(req, res, next);
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction}next 
 * @param {IUserModel} user 
 * @param {string} resMessage 
 */
async function studentSignup(req: Request, res: Response, next: NextFunction) {
    try {
        const user: IUserModel = await AuthService.createUser(req.body);
        
        passportRequestLoginStudent(req, res, next, user, 'Sign in successfull');
    } catch (error) {
        if (error.code === 500) {
            return next(new HttpError(error.message.status, error.message));
        }
        res.json({
            status: 400,
            message: error.message
        });
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction}next 
 * @param {IUserModel} user 
 * @param {string} resMessage 
 */
async function professorSignup(req: Request, res: Response, next: NextFunction) {
    try {
        const user: IProfessorModel = await AuthService.createProfessor(req.body);
        
        passportRequestLoginProfessor(req, res, next, user, 'Sign in successfull');
    } catch (error) {
        if (error.code === 500) {
            return next(new HttpError(error.message.status, error.message));
        }
        res.json({
            status: 400,
            message: error.message
        });
    }
}

/**
 * @export
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Promise < void >}
 */
export async function signup(req: Request, res: Response, next: NextFunction): Promise < void > {
    if (req.body.teach) {
        professorSignup(req, res, next);
    } else {
        studentSignup(req, res, next);
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function login(req: Request, res: Response, next: NextFunction): Promise < void > {
    if (req.body.teach) {
        professorLogin(req, res, next);
    } else {
        studentLogin(req, res, next);
    }
}

/**
 * @export
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next
 * @returns {Promise < void >} 
 */
export async function logout(req: Request, res: Response, next: NextFunction): Promise < void > {

    if (!req.user) {
        res.json({
            status: 401,
            logged: false,
            message: 'You are not authorized to app. Can\'t logout'
        });
    }

    if (req.user) {
        req.logout();
        res.json({
            status: 200,
            logged: false,
            message: 'Successfuly logged out!'
        });
    }

}
