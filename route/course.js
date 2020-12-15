const CourseControleur = require("../controleur/courseORM");
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const AuthoMiddleware = require("../middleware/Authorization");
const Router = require("express-promise-router");
const router = new Router;
router.get('/', CourseControleur.getCourses);
router.get('/:id', CourseControleur.getCourse);
router.post('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdminOrManager, CourseControleur.postCourse);
router.patch('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdminOrManager, CourseControleur.updateCourse);
router.delete('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdminOrManager, CourseControleur.deleteCourse);

module.exports = router;
