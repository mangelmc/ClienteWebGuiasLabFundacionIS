var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cursos', { title: 'Cursos' });
});

router.get('/:id', function(req, res, next) {
  res.render('curso', { title: 'Curso' });
});

module.exports = router;
