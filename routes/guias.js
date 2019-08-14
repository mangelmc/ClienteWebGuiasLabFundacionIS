var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.query);
  if (req.query.docente != undefined && req.query.docente != '') {
    fetch('http://localhost:8000/api/guias/?docente='+req.query.docente)
    .then(result => {
      console.log('result',result);
      return result.json();
    })
    .then(result => {
      
      console.log('json', result);
      res.render('guias', { title: 'Guias' ,result:result,query:req.query});
      
    })
    .catch(err => {
      console.log(err);
    })
  }else{
    res.redirect('/');
  }
});
router.get('/nuevo', function(req, res, next) {
  res.render('guias', { title: 'Crear Guia' });
});



module.exports = router;
