var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('estudiantes', { title: 'Estudiantes' });
});

router.get('/:id', function(req, res, next) {
  res.render('estudiante', { title: 'Estudiante' });
});




module.exports = router;
