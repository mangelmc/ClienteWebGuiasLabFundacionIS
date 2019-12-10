$(document).ready(()=>{
    console.log('ok login');
    
    $('#formLogin').submit(e => {
        e.preventDefault();
        if (e.target.email.value == 'admin@admin.com' && e.target.password.value == 'admin') {     
    
            window.location.href = "admin/usuarios";
            return;
        }
        let obj = {
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
                if (result.tipo == 'estudiante') {
                    
                    $('#suseralert div p').text('Acceso solo para docentes');
                    $('#suseralert div').slideDown();
                    setTimeout(()=>{
                        $('#suseralert div').slideUp();
                        
                    },5000);
                }else{
                    $('#alertOkText').text(result.message || 'Peticion correcta');
                    $('#alertOk').slideDown();

                    setTimeout(()=>{
                        $('#alertOk').slideUp();
                        window.localStorage.setItem('nombre',result.nombre);
                        window.localStorage.setItem('email',result.email);
                        window.localStorage.setItem('rud',result.rud);

                        window.location.href = '/home?docente=' + result.id ;
                    },3000);
                    

                    
                }
                
                
                
                
               
                
               
            })
            .fail(function(err,status) {
                console.log( "error" ,err);
                $('#suseralert div p').text(err.responseJSON.message || err.responseJSON.messageE ||err.responseJSON.error || 'Error inesperado');
                $('#suseralert div').slideDown();
                setTimeout(()=>{
                    $('#suseralert div').slideUp();
                    
                },5000);
                console.log( "status" ,status);
            })

         
    });

  
    
})