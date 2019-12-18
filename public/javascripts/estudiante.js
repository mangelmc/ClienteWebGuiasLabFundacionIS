$(document).ready(()=>{
    console.log('ok estudiante');

    let searchParams = new URLSearchParams(window.location.search);        
    //searchParams.has('sent') // true
    let idCurso = searchParams.get('curso');
    var idEstudiante = window.location.pathname.split( '/' )[2];
    //console.log(idEstudiante);
    //var config = require('./config');
    $.ajax({
            type: "Get",
            url: "http://localhost:8000/api/laboratorios/estadistica/" + idEstudiante +"?curso=" + idCurso,
            
            cache: false,
            dataType: "json",
            headers:{
                authorization: localStorage.getItem('authorization')||'bearer ',
                
            }
        })            
        .done(function(result) {
            //console.log( "success" ,result);
            let li1 = `<li class="list-group-item"><b>`;
            let li2 = `</b> <span class="pull-right">`
            let li3 = `</span></li>`;
            let rev = 0,pen= 0;
            let data = result.labs;
            //console.log(data);
            for (let index = 0; index < data.length; index++) {
                if (data[index].estado=='revisado') {
                    rev++ 
                }
                if (data[index].estado=='pendiente') {
                    pen++
                }
            }
            let html = li1 + 'Laboratorios Revisados ' + li2 + rev +li3;
            html += li1 + 'Laboratorios por Revisar ' + li2 + pen +li3;
            html += li1 + 'Total Laboratorios realizados ' + li2 + data.length +li3;
            html += li1 + 'Total Guias Curso ' + li2 + result.guias +li3;

        
            $('#lista').append(html);
            //$('#t' + idCurso).html(html).show('slow');
            
        })
        .fail(function(err,status) {
            console.log( "error" ,err);
            
            $('#b'+ idCurso + 'p').text(err.responseJSON.message || err.responseJSON.error || 'error');
            $('#b'+ idCurso).show('slow');
            console.log( "status" ,status);
        })/* 
        .always(function() {
            console.log( "complete" );
        }); */
        
       
    $('.btnlab').click(e=>{
        //console.log($(e.currentTarget).children('i').hasClass('fa-minus'));
        
       if (!$(e.currentTarget).children('i').hasClass('fa-minus')) {

        let searchParams = new URLSearchParams(window.location.search);        
        //searchParams.has('sent') // true
        let docente = searchParams.get('docente');

        let idCurso = e.currentTarget.id;
        //console.log(e.currentTarget.id);
        //param id del curso
        var idEstudiante = window.location.pathname.split( '/' )[2];
        //console.log(idEstudiante);
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
                //console.log( "success" ,result);
                
                const t1 = '<tr><td>';
                const t2 = '</td><td>';
                const t3 =  '</td></tr>';
                const a1 = '<a href="/laboratorios/';
                const a2 = '?docente='+ docente + '&tipo=rev&curso=' + idCurso+'"  type="button" class="btn btn-success btn-sm"><i class="fas fa-file-signature" ></i></a>';
                const a3 = '?docente='+ docente + '&tipo=det&curso=' + idCurso+'" type="button" class="btn  btn-primary btn-sm"><i class="fas fa-info" ></i></a>';
                const a4 = '?docente='+ docente + '&tipo=file&curso=' + idCurso+'" type="button" class="btn  btn-success  btn-sm"><i class="fas fa-file-signature " ></i></a>';
                const a5 = '?docente='+ docente + '&tipo=filedet&curso=' + idCurso+'"  type="button" class="btn btn-primary btn-sm"><i class="fas fa-info" ></i></a>';
                let html = '';

                let data = result.labs;
                //console.log(data);
                for (let index = 0; index < data.length; index++) {
                    html = html+ t1 + data[index].guia.numero + t2;
                    html = html + data[index].estado.toUpperCase() + t2;
                    html = html + data[index].nota + t2;

                    if (data[index].estado != 'revisado' && data[index].guia.tipo == 'auto') {
                        html = html + a1 + data[index]._id + a2 ;
                    }
                    if (data[index].estado != 'revisado' && data[index].guia.tipo == 'file') {
                        html = html + a1 + data[index]._id + a4 ;
                    } 
                    if (data[index].guia.tipo == 'auto') {
                        html = html + a1 + data[index]._id + a3;
                    }else{
                        html = html + a1 + data[index]._id + a5;
                    }   
                     
                            
                    html = html + t3; 

                }
                $('#tb' + idCurso).fadeIn('slow');
                $('#t' + idCurso).html(html).show('slow');
               
            })
            .fail(function(err,status) {
               console.log( "error" ,err);
               
                $('#b'+ idCurso + 'p').text(err.responseJSON.message || err.responseJSON.error || 'error');
                $('#b'+ idCurso).show('slow');
              //console.log( "status" ,status);
            })/* 
            .always(function() {
                console.log( "complete" );
            }); */
        }

         
    });

    
    $('.btnlab').click();
    
    

   
})