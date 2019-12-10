var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res) {
  console.log(req.query);

  fetch('http://localhost:8000/api/cursos')
    .then(result => {
        
      return result.json();
    })
    .then(result => {
      
      
      //console.log('json', result);
      
      res.render('admin/cursos', { title: 'Cursos' ,result:result});
      
    })
    .catch(err => {
      console.log(err);     
      res.redirect('/');
    })
 
});
module.exports = router;
