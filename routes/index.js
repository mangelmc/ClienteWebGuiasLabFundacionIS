var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' ,message:'none' });
});
router.post('/', function(req, res, next) {

 
  if (req.body.email == 'admin@admin.com' && req.body.password == 'admin') {
    res.redirect('admin/usuarios');
  }else{
    let body = {email: req.body.email,password: req.body.password};
    
    fetch('http://localhost:8000/api/usuarios/login',{
      method: 'post',
      body:    JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(result => {
      //console.log('result',result);
      return result.json();
    })
    .then(result => {
      
      //console.log('json', result);
      if (result.messageE) {
        return res.render('login', { title: 'Inicio Docente', message : result.messageE });
      }
      if (result.tipo == 'estudiante') {
        return res.render('login', { title: 'Inicio Docente', message : 'Acceso solo para docentes' });
      }else{
        return res.redirect('/home?docente=' + result.id );
      }
     
      
    })
    .catch(err => {
      console.log(err);
    })
    

  }
  
});
module.exports = router;
