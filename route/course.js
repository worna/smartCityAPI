const CourseControleur = require("../controleur/courseORM");
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const AuthoMiddleware = require("../middleware/Authorization");
const Router = require("express-promise-router");
const router = new Router;


/**
 * @swagger
 * /Course/{id}:
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
 *          404:
 *              description: Course not found
 *          500:
 *              description: Server error
 *
 */
router.get('/:id', CourseControleur.getCourse);

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
 *              $ref: '#/components/responses/AddCourse'
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
 *              $ref: '#/components/responses/mustBeManagerOrManager'
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
 *          200:
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
