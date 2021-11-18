import * as bcrypt from 'bcryptjs';
import * as connections from '../../config/connection/connection';
import * as crypto from 'crypto';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';
import internal from 'stream';

/**
 * @export
 * @interface IProfessorModel
 * @extends {Document}
 */
export interface IProfessorModel extends Document {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    passwordResetToken: string;
    passwordResetExpires: Date;
    courses: string[];

    facebook: string;
    tokens: AuthToken[];

    profile: {
        name: string,
        gender: string,
        location: string,
        website: string,
        picture: string
    };
    comparePassword: (password: string) => Promise < boolean > ;
    gravatar: (size: number) => string;
}

export type AuthToken = {
    accessToken: string,
    kind: string
};

/**
 * @swagger
 * components:
 *  schemas:
 *    ProfessorSchema:
 *      required:
 *        - email
 *        - name
 *      properties:
 *        _id:
 *          type: string
 *        firstname:
 *          type: string
 *        lastname:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        passwordResetToken:
 *          type: string
 *        passwordResetExpires:
 *          type: string
 *          format: date
 *        tokens:
 *          type: array
 *    Professors:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/ProfessorSchema'
 */
const ProfessorSchema: Schema = new Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    tokens: Array,
    courses: Array
}, {
    collection: 'professor',
    versionKey: false
}).pre('save', async function (next: NextFunction): Promise < void > {
    const user: any = this; // tslint:disable-line

    if (!user.isModified('password')) {
        return next();
    }

    try {
        const salt: string = await bcrypt.genSalt(10);

        const hash: string = await bcrypt.hash(user.password, salt);

        user.password = hash;
        next();
    } catch (error) {
        return next(error);
    }
});

/**
 * Method for comparing passwords
 */
ProfessorSchema.methods.comparePassword = async function (candidatePassword: string): Promise < boolean > {
    try {
        const match: boolean = await bcrypt.compare(candidatePassword, this.password);

        return match;
    } catch (error) {
        return error;
    }
};

/**
 * Helper method for getting user's gravatar.
 */
ProfessorSchema.methods.gravatar = function (size: number): string {
    if (!size) {
        size = 200;
    }
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5: string = crypto.createHash('md5').update(this.email).digest('hex');

    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

export default connections.db.model < IProfessorModel > ('ProfessorModel', ProfessorSchema);
