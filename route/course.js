const CourseControleur = require("../controleur/courseORM");
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const AuthoMiddleware = require("../middleware/Authorization");
const Router = require("express-promise-router");
const router = new Router;

router.get('/:id', CourseControleur.getCourse);
router.post('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeManager, CourseControleur.postCourse);
router.patch('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeManager, CourseControleur.updateCourse);
router.delete('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeManager, CourseControleur.deleteCourse);

module.exports = router;
