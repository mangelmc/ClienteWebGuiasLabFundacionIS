$(document).ready(()=>{
    console.log('ok estudiante');

    $('.btnlab').click(e=>{
        console.log($(e.currentTarget).children('i').hasClass('fa-minus'));
        
       if (!$(e.currentTarget).children('i').hasClass('fa-minus')) {

        let searchParams = new URLSearchParams(window.location.search);        
        //searchParams.has('sent') // true
        let docente = searchParams.get('docente');

        let idCurso = e.currentTarget.id;
        console.log(e.currentTarget.id);
        //param id del curso
        var idEstudiante = window.location.pathname.split( '/' )[2];
        console.log(idEstudiante);
        //var config = require('./config');
       $.ajax({
                type: "Get",
                url: "http://localhost:8000/api/laboratorios/estudiante/" + idEstudiante +"?curso=" + idCurso,
                
                cache: false,
                dataType: "json",
                headers:{
                    authorization: localStorage.getItem('authorization')||'bearer ',
                    
                }
            })            
            .done(function(result) {
                console.log( "success" ,result);
                
                const t1 = '<tr><td>';
                const t2 = '</td><td>';
                const t3 =  '</td></tr>';
                const a1 = '<a href="/laboratorios/';
                const a2 = '?docente='+ docente + '&tipo=rev&curso=' + idCurso+'"  type="button" class="btn btn-success btn-sm"><i class="fas fa-file-signature" ></i></a>';
                const a3 = '?docente='+ docente + '&tipo=det&curso=' + idCurso+'" type="button" class="btn  btn-primary btn-sm"><i class="fas fa-info" ></i></a>';
                let html = '';

                let data = result.labs;
                //console.log(data);
                for (let index = 0; index < data.length; index++) {
                    html = html+ t1 + data[index].guia.numero + t2;
                    html = html + data[index].estado.toUpperCase() + t2;
                    html = html + data[index].nota + t2;
                    if (data[index].estado != 'revisado') {
                        html = html + a1 + data[index]._id + a2 ;
                    }  
                    html = html + a1 + data[index]._id + a3 
                            
                    html = html + t3; 

                }
                $('#tb' + idCurso).fadeIn('slow');
                $('#t' + idCurso).html(html).show('slow');
               
            })
            .fail(function(err,status) {
               console.log( "error" ,err);
               
                $('#b'+ idCurso + 'p').text(err.responseJSON.message || err.responseJSON.error || 'error');
                $('#b'+ idCurso).show('slow');
              console.log( "status" ,status);
            })
            .always(function() {
                console.log( "complete" );
            });
        }

         
    });

    
    
    
    

   
})