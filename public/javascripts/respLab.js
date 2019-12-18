$(document).ready(()=>{
    
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });
    $('form').submit(e=>{
        e.preventDefault();
        
        form = new FormData(e.target);
        if (form.get('file') === null) {
            let data = {respuesta: e.target.respuesta.value};
            $.ajax({
                type: "Patch",
                url: "http://localhost:8000/api/respuestas/" + e.target.id.value,//e.target.id,
                data,
                cache: false,
                dataType: "json",
                //contentType: 'application/json; charset=utf-8',//multipart/form-data, or text/plain
                headers:{
                    authorization: localStorage.getItem('authorization')||'bearer ',
                    
                }
            })            
            .done(function(data) {
                //console.log( "success" ,data.message);
                Toast.fire({
                    type: 'success',
                    title: data.message
                });
            })
            .fail(function(err,status) {
                console.log( "error" ,err.responseJSON.error.message);
                console.log( "status" ,status);
    
            })        
        }else{
            $.ajax({
                type: "patch",
                url: "http://localhost:8000/api/respuestas/file",
                
                dataType: "html",
                data: form,
                cache: false,
                contentType: false,
                processData: false,
                //contentType: 'application/json; charset=utf-8',//multipart/form-data, or text/plain
                headers:{
                    authorization: localStorage.getItem('authorization')||'bearer ',
                    
                }
            })            
            .done(function(data) {
                console.log( "success" ,data);
                Toast.fire({
                    type: 'success',
                    title: data.message
                });
            })
            .fail(function(err,status) {
                console.log( "error" ,err.responseJSON.error.message);
                console.log( "status" ,status);
    
            })                  
        }


        
    })

    

    $('.calificacioni').focusout(e=>{
        //console.log(e.target.id);
        //console.log(e.target.value );
        if (califs[e.target.id] == e.target.value) {
            //console.log('same');
            return; 
        }
        if (e.target.value == '' || +e.target.value > +$(e.target).attr('max') || +e.target.value < 0 ) {
            Toast.fire({
            type: 'warning',
            title: 'La calificación debe tener un valor de 0 a ' + $(e.target).attr('max')
            })
            e.target.value = califs[e.target.id] ;     
            return;
        }
        
        data = {
            calificacion: e.target.value
        }
        //var config = require('./config');
        $.ajax({
            type: "Patch",
            url: "http://localhost:8000/api/respuestas/" + e.target.id,//e.target.id,
            data,
            cache: false,
            dataType: "json",
            //contentType: 'application/json; charset=utf-8',//multipart/form-data, or text/plain
            headers:{
                authorization: localStorage.getItem('authorization')||'bearer ',
                
            }
        })            
        .done(function(data) {
            //console.log( "success" ,data.message);
            Toast.fire({
                type: 'success',
                title: data.message
            });
            califs[e.target.id] = e.target.value;
            suma = 0; 
            Object.keys(califs).forEach((key,index) => {
                suma += +califs[key];
            });
            //console.log(suma);
            $('.confirmarCalificacion').show()
            $('#calificacionTotal').text(suma + ' / 100');
            $('#calificacionColor').removeClass('bg-aqua').removeClass('bg-red');
            if (suma>50) {
                $('#calificacionColor').addClass('bg-aqua')
            }else{
                $('#calificacionColor').addClass('bg-red')
            }
            
            
        })
        .fail(function(err,status) {
            console.log( "error" ,err.responseJSON.error.message);
            console.log( "status" ,status);

        })
    });

    $('.confirmarCalificacion').click(e=>{
        
        Swal.fire({
            title: 'Esta seguro de guardar la calificación total',
            text: "Esta sera la calificacion definitiva y ya no podra cambiarla! Puede CANCELAR esta acción y seguir revisando mas tarde.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, Guardar!',
            cancelButtonText: 'No, Cancelar!',
            reverseButtons: true,
            timer: 8000
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    type: "Patch",
                    url: "http://localhost:8000/api/laboratorios/" + e.target.id,//e.target.id,
                    data: {estado: 'revisado',nota: suma },
                    cache: false,
                    dataType: "json",
                    //contentType: 'application/json; charset=utf-8',//multipart/form-data, or text/plain
                    headers:{
                        authorization: localStorage.getItem('authorization')||'bearer ',                
                    }
                })            
                .done(function(data) {
                    //console.log( "success" ,data.message);
                    Toast.fire({
                        type: 'success',
                        title: data.message
                    }) 
                    .then(()=>{
                        let docente = new URLSearchParams(location.search).get('docente'); 
                        let idEstudiante = $('#idEstudiante').text();
                        location.replace('http://' + location.host + '/estudiantes/' + idEstudiante + '?docente=' + docente);
                    });
                    
                })
                .fail(function(err,status) {
                    console.log( "error" ,err.responseJSON.error.message);
                    console.log( "status" ,status);        
                })
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: 'Cancelado',
                    text: 'No se realizaron cambios :)',
                    type: 'error',
                    timer: 3000
                }) 
                .then(()=>{
                    let docente = new URLSearchParams(location.search).get('docente'); 
                    let idEstudiante = $('#idEstudiante').text();                    
                    location.replace('http://' + location.host + '/estudiantes/' + idEstudiante + '?docente=' + docente);
                })
            }
        })
       
    })

})
