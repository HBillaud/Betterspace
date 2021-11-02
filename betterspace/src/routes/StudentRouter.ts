import { Router } from 'express';
import { UserComponent, CourseComponent } from '../components';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * GET method route 
 * @example http://localhost:PORT/v1/student/:id
 * 
 * @swagger
 * /v1/student/{id}:
 *  get:
 *    description: Get user by userId
 *    tags: ["students"]
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique userId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return student by id
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/UserSchema'
 */
router.get('/:id', UserComponent.get);

/**
 * PUT method route 
 * @example http://localhost:PORT/v1/student/:id
 * 
 * @swagger
 * /v1/student/{id}:
 *  get:
 *    description: Enroll user with user_id in new course (course_id)
 *    tags: ["students"]
 *    requestBody:
 *      description: enroll in course body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CourseSchema'
 *          example:
 *            course_id: cs354
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique userId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return OK
 */
 router.put('/:id', UserComponent.enrollCourse);

/**
 * DELETE method route
 * @example  http://localhost:PORT/v1/student/:id
 * 
 * @swagger
 * /v1/student/{id}:
 *  delete:
 *    description: Delete student by userId
 *    tags: ["students"]
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique student_id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return deleted user
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/UserSchema'
 */
router.delete('/:id', UserComponent.remove);

/**
 * GET method route 
 * @example http://localhost:PORT/v1/student/:id/courses/:course_id
 * 
 * @swagger
 * /v1/student/{id}/courses/{course_id}:
 *  get:
 *    description: Get course by course_id
 *    tags: ["courses"]
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique userId
 *        required: true
 *        schema:
 *          type: string
 *      - in: path
 *        name: course_id
 *        description: the unique course_id
 *        required: true,
 *        schema:
 *           type: string
 *    responses:
 *      200:
 *        description: return course by course_id
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/CourseSchema'
 */
 router.get('/:id/courses/:course_id', CourseComponent.findOne);

/**
 * @export {express.Router}
 */
export default router;
