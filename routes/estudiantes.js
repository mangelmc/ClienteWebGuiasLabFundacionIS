var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {
    
  console.log(req.query);
  if (req.query.docente != undefined && req.query.docente != '') {
    fetch('http://localhost:8000/api/estudiantes/?docente='+req.query.docente)
    .then(result => {
      console.log('result',result);
      return result.json();
    })
    .then(result => {
      
      console.log('json', result);
      res.render('estudiantes', { title: 'Estudiantes' ,result:result,query:req.query});
      
    })
    .catch(err => {
      console.log(err);
    })
  }else{
    res.redirect('/');
  }
});

router.get('/:id', function(req, res) {
  
  console.log(req.query);
  if (req.query.docente != undefined && req.query.docente != '') {
    fetch('http://localhost:8000/api/usuarios/estudiantes/' + req.params.id)
    .then(result => {
      //console.log('result',result);
      return result.json();
    })
    .then(result => {
      
      console.log('json', result);
      res.render('estudiante', { title: 'Estudiante' ,result:result,query:req.query});
      
    })
    .catch(err => {
      console.log(err);
    })
  }else{
    res.redirect('/');
  }
});

module.exports = router;
