$(document).ready(()=>{
    console.log('ok login');
    
    $('#formLogin').submit(e => {
        e.preventDefault();
        
        let form,obj = {
            email: e.target.email.value,
            password: e.target.password.value,
        };
         
       
       $.ajax({
                type: "post",
                url: "http://localhost:8000/api/usuarios/login",
                data: obj,
                cache: false,
                dataType: "json",
                //contentType: 'application/json; charset=utf-8',//multipart/form-data, or text/plain
                headers:{
                    authorization: localStorage.getItem('authorization')||'bearer ',
                }
            })            
            .done(function(result) {
                console.log( "success" ,result);
                $('#alertOkText').text(result.message || 'Peticion correcta');
                $('#alertOk').slideDown();
                setTimeout(()=>{
                    $('#alertOk').slideUp();
                    //location.reload(true);
                },5000);
                $('#formUsuario')[0].reset();
                $('#usuarios').click();
               
            })
            .fail(function(err,status) {
                console.log( "error" ,err);
                $('#alertErrorText').text(err.responseJSON.message || err.responseJSON.error || 'Error inesperado');
                $('#alertError').slideDown();
                setTimeout(()=>{
                    $('#alertError').slideUp();
                    
                },5000);
                console.log( "status" ,status);
            })

         
    });

  
    
})