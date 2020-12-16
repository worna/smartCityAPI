const CourseControleur = require("../controleur/courseORM");
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const AuthoMiddleware = require("../middleware/Authorization");
const Router = require("express-promise-router");
const router = new Router;


/**
 * @swagger
 * /course/{id}:
 *  get:
 *      tags:
 *         - Course
 *      parameters:
 *          - name: id
 *            description: course's ID
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              $ref: '#/components/responses/CourseFound'
 *          400:
 *              description: The id is not a number
 *          404:
 *              description: Course not found
 *          500:
 *              description: Server error
 *
 */
router.get('/:id', CourseControleur.getCourse);

/**
 * @swagger
 * /course:
 *  get:
 *      tags:
 *         - Course
 *      responses:
 *          200:
 *              $ref: '#/components/responses/CoursesFound'
 *          500:
 *              description: Server error
 */
router.get('/', CourseControleur.getCourses);

/**
 * @swagger
 * /course:
 *  post:
 *      tags:
 *          - Course
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/CourseToAdd'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/CourseAdd'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdminOrManager'
 *          404:
 *              description:  Wrong sport hall id, instructor email or a course already exist at this moment
 *          500:
 *              description: Server error
 *
 */
router.post('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdminOrManager, CourseControleur.postCourse);

/**
 * @swagger
 * /course:
 *  patch:
 *      tags:
 *          - Course
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/CourseToUpdate'
 *      responses:
 *          204:
 *              $ref: '#/components/responses/CourseUpdated'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdminOrManager'
 *          404:
 *              description: Wrong sport hall id or instructor email
 *          500:
 *              description: Server error
 *
 */
router.patch('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdminOrManager, CourseControleur.updateCourse);

/**
 * @swagger
 * /course:
 *  delete:
 *      tags:
 *          - Course
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          204:
 *              $ref: '#/components/responses/CourseDeleted'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdminOrManager'
 *          500:
 *              description: Server error
 *
 */
router.delete('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdminOrManager, CourseControleur.deleteCourse);

module.exports = router;
