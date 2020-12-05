const CourseControleur = require("../controleur/courseORM");
const Router = require("express-promise-router");
const router = new Router;

router.get('/:id', CourseControleur.getCourse);
router.post('/', CourseControleur.postCourse);
router.patch('/', CourseControleur.updateCourse);
router.delete('/', CourseControleur.deleteCourse);

module.exports = router;
