$(document).ready(()=>{
    console.log('ok cursos');
    
    
    $('#cursos').click(e => {
        e.preventDefault();
        if (!$('#cursos i').hasClass('fa-minus')) {
            $.ajax({
                    type: "get",
                    url: "http://localhost:8000/api/materias",
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
                            html += p1 + value._id + p2 + value.nombre + p3;
                        })
                        $('#smateria').html(html);
                    }else{
                        $('#smateriaalert').fadeIn('slow');
                    }
                
                })
                .fail(function(err,status) {
                    console.log( "error" ,err);
                    //$('#alertErrorText').text(err.responseJSON.message || err.responseJSON.error || 'Error inesperado');
                    //$('#alertError').slideDown();
                    /* setTimeout(()=>{
                        $('#alertError').slideUp();
                        
                    },4000); */
                    console.log( "status" ,status);
                })
            $.ajax({
                    type: "get",
                    url: "http://localhost:8000/api/usuarios?tipo=docente",
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
                    let data = result;
                    if (data.length > 0) {
                        data.forEach((value,key)=>{
                            //obj[key] = value;
                            //console.log(value,key);
                            html += p1 + value._id + p2 + value.nombre + p3;
                        })
                        $('#sdocente').html(html);
                    }else{
                        $('#sdocentealert').fadeIn('slow');
                    }
                
                })
                .fail(function(err,status) {
                    console.log( "error" ,err);
                    //$('#alertErrorText').text(err.responseJSON.message || err.responseJSON.error || 'Error inesperado');
                    //$('#alertError').slideDown();
                    /* setTimeout(()=>{
                        $('#alertError').slideUp();
                        
                    },4000); */
                    console.log( "status" ,status);
                })
        }
    })
   
  
})