$(document).ready(()=>{
    console.log('ok curso');

    $('#estudiantes').click(e=>{
        console.log($('#estudiantes i').hasClass('fa-minus'));
        if (!$('#estudiantes i').hasClass('fa-minus')) {
            
        //e.preventDefault();
        //queryparams
        let searchParams = new URLSearchParams(window.location.search);        
        //searchParams.has('sent') // true
        let docente = searchParams.get('docente')
        console.log(docente);
        //param id del curso
        var idCurso = window.location.pathname.split( '/' )[2];
        console.log(idCurso);
        //var config = require('./config');
       $.ajax({
                type: "Get",
                url: "http://localhost:8000/api/integrantes/?curso=" + idCurso,
                
                cache: false,
                dataType: "json",
                //contentType: 'application/json; charset=utf-8',//multipart/form-data, or text/plain
                headers:{
                    authorization: localStorage.getItem('authorization')||'bearer ',
                    
                }
            })            
            .done(function(result) {
                console.log( "success" ,result);

                const t1 = '<tr><td>';
                const t2 = '</td><td>';
                const t3 =  '</td></tr>';
                const a1 = '<a href="/estudiantes/';
                const a2 = '?docente='+ docente +'" type="button" class="btn btn-success btn-sm"><i class="fas fa-info" ></i></a>';
                const a3 = '<button type="button" class="btn  btn-danger btn-sm"><i class="fas fa-user-lock" ></i></button>';
                let html = '';

                let data = result.data;
                //console.log(data);
                for (let index = 0; index < data.length; index++) {
                  html = html+ t1 + data[index].estudiante.nombre + t2;
                  html = html + data[index].estudiante.ci + t2;
                  html = html + data[index].estudiante.rud + t2;  
                  html = html + a1 + data[index].estudiante._id + a2 + t3; 
                }
                
                $('#tEstudiantes').html(html).slideDown('slow');
               
            })
            .fail(function(err,status) {
               console.log( "error" ,err.responseJSON.error.message);
              let html = '<tr><td colspan="4">Error al cargar los datos : ' + err.responseJSON.error.message + ' </td></tr>';
              $('#tEstudiantes').html(html).slideDown('slow');
              console.log( "status" ,status);
            })
            .always(function() {
                console.log( "complete" );
            });
        }

         
    })
})