import { Router } from 'express';
import { CourseComponent, ProfessorComponent } from '../components';

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
 * @export {express.Router}
 */
export default router;
