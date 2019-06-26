var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('guias', { title: 'Guias' });
});
router.get('/nuevo', function(req, res, next) {
  res.render('guias', { title: 'Crear Guia' });
});



module.exports = router;
