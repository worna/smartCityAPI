const CustomerCourseControleur = require("../controleur/customerCourseORM");
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const AuthoMiddleware = require("../middleware/Authorization");
const Router = require("express-promise-router");
const router = new Router;

/**
 * @swagger
 * /customerCourse/course/{id}:
 *  get:
 *      tags:
 *         - CustomerCourse
 *      parameters:
 *          - name: id
 *            description: course's ID
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              $ref: '#/components/responses/CustomersOfCourseFound'
 *          400:
 *              $ref: '#/components/responses/InvalidCourseId'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdminOrManager'
 *          404:
 *              description: Course not found or don't have customer
 *          500:
 *              description: Server error
 *
 */
router.get('/course/:id', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdminOrManager, CustomerCourseControleur.getCustomersInCourse);

/**
 * @swagger
 * /customerCourse/customer/{email}:
 *  get:
 *      tags:
 *         - CustomerCourse
 *      parameters:
 *          - name: email
 *            description: customer's email
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              $ref: '#/components/responses/CoursesOfCustomerFound'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/isMyAccountOrAdmin'
 *          404:
 *              description: The customer is not found or don't have course
 *          500:
 *              description: Server error
 *
 */
router.get('/customer/:email', JWTMiddleWare.identification, AuthoMiddleware.isMyAccountOrAdmin, CustomerCourseControleur.getCoursesOfCustomer);

/**
 * @swagger
 * /customerCourse:
 *  post:
 *      tags:
 *          - CustomerCourse
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/CustomerCourseToAdd'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/AddCustomerCourse'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/isMyAccount'
 *          500:
 *              description: Server error
 *
 */
router.post('/', JWTMiddleWare.identification, AuthoMiddleware.isMyAccount, CustomerCourseControleur.postCustomerCourse);

/**
 * @swagger
 * /customerCourse:
 *  delete:
 *      tags:
 *          - CustomerCourse
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              $ref: '#/components/responses/CustomerCourseDeleted'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/isMyAccountOrAdmin'
 *          500:
 *              description: Server error
 *
 */
router.delete('/', JWTMiddleWare.identification, AuthoMiddleware.isMyAccountOrAdmin, CustomerCourseControleur.deleteCustomerCourse);

module.exports = router;
