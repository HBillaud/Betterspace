import { Router } from 'express';
import { AssignmentComponent, CourseComponent, ProfessorComponent } from '../components';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * GET method route
 * @example http://localhost:PORT/v1/profesor/:id
 *
 * @swagger
 * /v1/professor/{id}:
 *  get:
 *    description: Get user by userId
 *    tags: ["professors"]
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
 *        description: return user by id
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/ProfessorSchema'
 */
router.get('/:id', ProfessorComponent.findOne);

/**
 * GET method route
 * @example http://localhost:PORT/v1/professor/:id/courses/:course_id
 *
 * @swagger
 * /v1/professor/{id}/courses/{course_id}:
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
 // route to get report 1 selections
 router.get('/:id/courses', CourseComponent.selectOptions);
 // route to get report 1 grade info
 router.post('/:id/courses', CourseComponent.gradeReport);


/**
 * POST method route
 * @example http://localhost:PORT/v1/professor/:id
 *
 * @swagger
 * /v1/professor/:id:
 *  post:
 *    description: Create course
 *    tags: ["course"]
 *    requestBody:
 *      description: add course body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CourseSchema'
 *          example:
 *            _id: cs354
 *            title: Operating Systems
 *            description: This course covers the following material: operating systems, processes, pipes, memory
 *    responses:
 *      200:
 *        description: course successfuly created
 *        content:
 *          appication/json:
 *            example:
 *              status: 200
 *              logged: true
 *              message: Course successfully created!
 *      401:
 *        description: Course not created, invalid body
 *        content:
 *          application/json:
 *            example:
 *              status: 401
 *              logged: false
 *              message: Invalid body
 */
router.post('/:id', CourseComponent.add);


/**
 * POST method route
 * @example http://localhost:PORT/v1/professor/:id/courses/:course_id/assignments
 *
 * @swagger
 * /v1/professor/:id/courses/:course_id/assignments :
 *  post:
 *    description: Add assignments to specific course
 *    tags: ["assignment"]
 *    requestBody:
 *      description: add assignment body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CourseSchema'
 *          example:
 *            title: Homework #3
 *            description: Make sure to submit your assignment on time! Reminder: only the last submission is graded
 *            due_date: TODO
 *    responses:
 *      200:
 *        description: assignment successfuly created
 *        content:
 *          appication/json:
 *            example:
 *              status: 200
 *              logged: true
 *              message: Assignment successfully created!
 *      401:
 *        description: Assignment not created, invalid body
 *        content:
 *          application/json:
 *            example:
 *              status: 401
 *              logged: false
 *              message: Invalid body
 */
router.post('/:id/courses/:course_id/assignments', AssignmentComponent.addAssignment);




/**
 * @export {express.Router}
 */
export default router;
