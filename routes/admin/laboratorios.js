var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res) {
  console.log(req.query);

  fetch('http://localhost:8000/api/guias')
    .then(result => {
        
      return result.json();
    })
    .then(result => {
      
      
      console.log('json', result);
      
      res.render('admin/laboratorios', { title: 'laboratorios' ,result:result});
      
    })
    .catch(err => {
      console.log(err);     
      res.redirect('/');
    })
 
});


router.get('/:id', function(req, res) {
  fetch('http://localhost:8000/api/laboratorios/' + req.params.id)
    .then(result => {
      //console.log('result',result);
      return result.json();
    })
    .then(result => {
      
      
        res.render('admin/laboratorio', { title: 'Hacer laboratorio' ,result:result});
        
      
      
      
    })
    .catch(err => {
      console.log(err);
    })
}); 
module.exports = router;
