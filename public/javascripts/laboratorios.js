$(document).ready(()=>{
    console.log('ok labs');
    
    
    $('#labs').click(e => {
        e.preventDefault();
        if (!$('#guias i').hasClass('fa-minus')) {
            $.ajax({
                    type: "get",
                    url: "http://localhost:8000/api/cursos",
                    //data: obj,
                    cache: false,
                    dataType: "json",
                    //contentType: 'application/json; charset=utf-8',//multipart/form-data, or text/plain
                    headers:{
                        authorization: localStorage.getItem('authorization')||'bearer ',
                        
                    }
                })            
                .done(function(result) {
                    console.log( "success" ,result);
                    let html = '',p1 = '<option value="',p2 = '">', p3 = '</option>';
                    let data = result.data;
                    if (data.length > 0) {
                        data.forEach((value,key)=>{
                            //obj[key] = value;
                            //console.log(value,key);
                            html += p1 + value._id + p2 + value.materia.nombre + ' '+ value.materia.sigla + ' G-'+ value.grupo + '  ' + value.gestion + p3 ;
                        })
                        $('#scurso').html(html);
                        /* Lista estudiants del curso */
                        $.ajax({
                            type: "get",
                            url: "http://localhost:8000/api/integrantes?curso=" + data[0]._id,
                            //data: obj,
                            cache: false,
                            dataType: "json",
                            //contentType: 'application/json; charset=utf-8',//multipart/form-data, or text/plain
                            headers:{
                                authorization: localStorage.getItem('authorization')||'bearer ',
                                
                            }
                        })            
                        .done(function(result) {
                            console.log( "success estuds" ,result);
                            let html = '',p1 = '<option value="',p2 = '">', p3 = '</option>';
                            let data = result.data;
                            if (data.length > 0) {
                                data.forEach((value,key)=>{
                                    //obj[key] = value;
                                    //console.log(value,key);
                                    html += p1 + value.estudiante._id + p2 + value.estudiante.nombre + p3;
                                })
                                $('#sestudiante').html(html);
                                
                            }else{
                                $('#sestudiantealert').fadeIn('slow');$('#sestudiante').html('');
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
                            $('#sestudiante').html('');
                            $('#sestudiantealert div').fadeIn('slow');
                        })
                        
                        /* Lista guias del curso */
                        $.ajax({
                            type: "get",
                            url: "http://localhost:8000/api/guias?curso=" + data[0]._id,
                            //data: obj,
                            cache: false,
                            dataType: "json",
                            //contentType: 'application/json; charset=utf-8',//multipart/form-data, or text/plain
                            headers:{
                                authorization: localStorage.getItem('authorization')||'bearer ',
                                
                            }
                        })            
                        .done(function(result) {
                            console.log( "success guias" ,result);
                            let html = '',p1 = '<option value="',p2 = '">', p3 = '</option>';
                            let data = result.data;
                            if (data.length > 0) {
                                data.forEach((value,key)=>{
                                    //obj[key] = value;
                                    //console.log(value,key);
                                    html += p1 + value._id + p2 + value.numero + p3;
                                })
                                $('#sguia').html(html);
                                
                            }else{
                                $('#sguiaalert').fadeIn('slow');$('#sguia').html('');
                            }
                        
                        })
                        .fail(function(err,status) {
                            console.log( "error" ,err);
                            $('#sguiaalert div').fadeIn('slow');
                            $('#sguia').html('');
                            //$('#alertErrorText').text(err.responseJSON.message || err.responseJSON.error || 'Error inesperado');
                            //$('#alertError').slideDown();
                            /* setTimeout(()=>{
                                $('#alertError').slideUp();
                                
                            },4000); */
                            //console.log( "status" ,status);
                        })


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

    $('#scurso').change(e => {
        e.preventDefault();
        console.log(e.target.value);
        //console.log( $(e.target).val());
        /* Lista estudiants del curso */
        $.ajax({
            type: "get",
            url: "http://localhost:8000/api/integrantes?curso=" + e.target.value,
            //data: obj,
            cache: false,
            dataType: "json",
            //contentType: 'application/json; charset=utf-8',//multipart/form-data, or text/plain
            headers:{
                authorization: localStorage.getItem('authorization')||'bearer ',
                
            }
        })            
        .done(function(result) {
            console.log( "success estuds" ,result);
            let html = '',p1 = '<option value="',p2 = '">', p3 = '</option>';
            let data = result.data;
            if (data.length > 0) {
                data.forEach((value,key)=>{
                    //obj[key] = value;
                    //console.log(value,key);
                    html += p1 + value.estudiante._id + p2 + value.estudiante.nombre + p3;
                })
                $('#sestudiante').html(html);
                $('#sestudiantealert').fadeOut('slow');
                
            }else{
                $('#sestudiante').html('');
                $('#sestudiantealert').fadeIn('slow');
            }
        
        })
        .fail(function(err,status) {
            console.log( "error" ,err);
            //$('#alertErrorText').text(err.responseJSON.message || err.responseJSON.error || 'Error inesperado');
            //$('#alertError').slideDown();
            /* setTimeout(()=>{
                $('#alertError').slideUp();
                
            },4000); */
            $('#sestudiante').html('');
            $('#sestudiantealert div').fadeIn('slow');
            //console.log( "status" ,status);
        })
        
        /* Lista guias del curso */
        $.ajax({
            type: "get",
            url: "http://localhost:8000/api/guias?curso=" + e.target.value,
            //data: obj,
            cache: false,
            dataType: "json",
            //contentType: 'application/json; charset=utf-8',//multipart/form-data, or text/plain
            headers:{
                authorization: localStorage.getItem('authorization')||'bearer ',
                
            }
        })            
        .done(function(result) {
            console.log( "success guias" ,result);
            let html = '',p1 = '<option value="',p2 = '">', p3 = '</option>';
            let data = result.data;
            if (data.length > 0) {
                data.forEach((value,key)=>{
                    //obj[key] = value;
                    //console.log(value,key);
                    html += p1 + value._id + p2 + value.numero + p3;
                })
                $('#sguia').html(html);
                $('#sguiaalert').fadeOut('slow');
            }else{
                $('#sguiaalert').fadeIn('slow');
                $('#sguia').html('');
                
            }
        
        })
        .fail(function(err,status) {
            console.log( "error" ,err);
            $('#sguiaalert div').fadeIn('slow');
            $('#sguia').html('');
            //$('#alertErrorText').text(err.responseJSON.message || err.responseJSON.error || 'Error inesperado');
            //$('#alertError').slideDown();
            /* setTimeout(()=>{
                $('#alertError').slideUp();
                
            },4000); */
            //console.log( "status" ,status);
        })



    });

    

    $('#formLab').submit(e=>{
        e.preventDefault();
        let form,obj = {};
        form = new FormData(e.target);
        form.forEach((value,key)=>{
            obj[key] = value;
        })
        console.log('form lab',obj);
       $.ajax({
                type: "post",
                url: "http://localhost:8000/api/laboratorios",
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
                let labId = result.result._id;
                /* Lista resps de la guia */
                $.ajax({
                    type: "get",
                    url: "http://localhost:8000/api/preguntas?guia=" + result.result.guia,
                    //data: obj,
                    cache: false,
                    dataType: "json",
                    //contentType: 'application/json; charset=utf-8',//multipart/form-data, or text/plain
                    headers:{
                        authorization: localStorage.getItem('authorization')||'bearer ',
                        
                    }
                })            
                .done(function(result) {
                    console.log( "success pregs" ,result);
                    
                    
                    let data = result.data;
                    if (data.length > 0) {
                        data.forEach((value,key)=>{
                            
                            insRespuestas(labId,value._id);
                        });
                        setTimeout(()=>{
                            window.location.href = "/admin/laboratorios/"+ labId;
                            
                        },4000);
                        

                    }else{
                        $('#sguiaalert').fadeIn('slow');
                        console.log('error length');
                        //location.reload();
                    }
                
                })
                .fail(function(err,status) {
                    console.log( "error" ,err);
                    $('#sguiaalert div').fadeIn('slow');
                    $('#sguia').html('');
                    //location.reload();

                    
                })


                
               
            })
            .fail(function(err,status) {
                console.log( "error" ,err);
                $('#alertErrorText').text(err.responseJSON.message || err.responseJSON.error || 'Error inesperado');
                $('#alertError').slideDown();
                setTimeout(()=>{
                    $('#alertError').slideUp();
                    
                },4000);
                //console.log( "status" ,status);
            })

    })

    let insRespuestas = (idLab,idPreg)=>{
        let obj = {
            laboratorio: idLab,
            pregunta: idPreg
        }
        console.log(obj);
        $.ajax({
            type: "post",
            url: "http://localhost:8000/api/respuestas",
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
            
        })
        .fail(function(err,status) {
            console.log( "error" ,err);
            
        })
    }
   

    $('.addPreg').click(e => {
        e.preventDefault();
        //console.log(e.target.id);
        $('#guiaid').val(e.target.id);
        
        
        
        
        $('#modal-info').modal('show');
    })

    
  
})