const CustomerCourseControleur = require("../controleur/customerCourseORM");
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const AuthoMiddleware = require("../middleware/Authorization");
const Router = require("express-promise-router");
const router = new Router;


router.get('/course/:id', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdminOrManager, CustomerCourseControleur.getCustomersInCourse);
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
