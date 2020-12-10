const CustomerCourseControleur = require("../controleur/customerCourseORM");
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const AuthoMiddleware = require("../middleware/Authorization");
const Router = require("express-promise-router");
const router = new Router;

router.post('/', JWTMiddleWare.identification, AuthoMiddleware.isMyAccount, CustomerCourseControleur.postCustomerCourse);
router.get('/course/:id', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdminOrManager, CustomerCourseControleur.getCustomersInCourse);
router.get('/customer/:email', JWTMiddleWare.identification, AuthoMiddleware.isMyAccountOrAdmin, CustomerCourseControleur.getCoursesOfCustomer);
router.delete('/', JWTMiddleWare.identification, AuthoMiddleware.isMyAccountOrAdmin, CustomerCourseControleur.deleteCustomerCourse);
module.exports = router;
