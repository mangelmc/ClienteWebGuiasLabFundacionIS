$(document).ready(()=>{
    console.log('ok guias');
    
    
    $('#guiass').click(e => {
        e.preventDefault();
        if (!$('#guias i').hasClass('fa-minus')) {
            $.ajax({
                    type: "get",
                    url: "http://localhost:8000/api/cursos",
                    //data:  obj,
                    cache: false,
                    dataType: "json",
                    //contentType: 'application/json; charset=utf-8',//multipart/form-data, or text/plain
                    headers:{
                        authorization: localStorage.getItem('authorization')||'bearer ',
                        
                    }
                })            
                .done(function(result) {
                    console.log( "success" ,result);
                    let html = '',p0 = '<option data-did="',p1= '" data-dno="',p2 = '" value="',p3 = '">', p4 = '</option>';
                    let data = result.data;

                    if (data.length > 0) {
                        $('#ndocente').val(data[0].docente.nombre);
                        $('#docente').val(data[0].docente._id);
                        data.forEach((value,key)=>{
                            //obj[key] = value;
                            //console.log(value,key);
                            html += p0 + value.docente._id + p1 + value.docente.nombre + p2 + value._id + p3 + value.materia.nombre + ' '+ value.materia.sigla + ' ' + value.gestion + ' G-'+ value.grupo + p4;
                        })
                        $('#scurso').html(html);
                    }else{
                        $('#scursoalert').fadeIn('slow');
                    }
                
                })
                .fail(function(err,status) {
                    console.log( "error" ,err);
                    //$('#alertErrorText').text(err.responseJSON.message || err.responseJSON.error || 'Error inesperado');
                    //$('#alertError').slideDown();
                    /* setTimeout(()=>{
                        $('#alertError').slideUp();
                        
                    },4000); */
                    //console.log( "status" ,status);
                })
            
        }
    })
    $('#scurso').change((e)=>{
        //console.log(e.currentTarget);
        //console.log($('#scurso').children("option:selected").data('dno'));
        //console.log($('#scurso').children("option:selected").data('did'));
        
        $('#ndocente').val($('#scurso').children("option:selected").data('dno'));
        $('#docente').val($('#scurso').children("option:selected").data('did'));
    });
    

    

    $('#formGuia').submit(e=>{
        e.preventDefault();
        let form,obj = {};
        form = new FormData(e.target);
        form.forEach((value,key)=>{
            obj[key] = value;
        })
       
       $.ajax({
                type: "post",
                url: "http://localhost:8000/api/guias",
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
                    location.reload();
                },4000);
                
                
               
            })
            .fail(function(err,status) {
                console.log( "error" ,err);
                $('#alertErrorText').text(err.responseJSON.message || err.responseJSON.error || 'Error inesperado');
                $('#alertError').slideDown();
                setTimeout(()=>{
                    $('#alertError').slideUp();
                    
                },4000);
                console.log( "status" ,status);
            })

    })

    $('.addPreg').click(e => {
        e.preventDefault();
        $('#guiaid').val(e.currentTarget.id);   
        $('#modal-info').modal('show');
    })

    $('#formPregunta').submit(e=>{
        e.preventDefault();
        let form,obj = {};
        form = new FormData(e.target);
        form.forEach((value,key)=>{
            obj[key] = value;
        })
       
       $.ajax({
                type: "post",
                url: "http://localhost:8000/api/preguntas",
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
                    
                },5000);
                
                $('#modal-info').modal('hide');
               
            })
            .fail(function(err,status) {
                console.log( "error" ,err);
                $('#alertErrorText').text(err.responseJSON.message || err.responseJSON.error || 'Error inesperado');
                $('#alertError').slideDown();
                setTimeout(()=>{
                    $('#alertError').slideUp();
                    
                },4000);
                console.log( "status" ,status);
            })

    })
  
})