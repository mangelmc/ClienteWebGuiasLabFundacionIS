$(document).ready(()=>{
    console.log('ok admin');
    
    $('#formUsuario').submit(e => {
        e.preventDefault();        
        let form,obj = {};
        form = new FormData(e.target);
        form.forEach((value,key)=>{
            obj[key] = value;
        })       
       $.ajax({
                type: "post",
                url: "http://localhost:8000/api/usuarios",
                data: obj,
                cache: false,
                dataType: "json",
                headers:{
                    authorization: localStorage.getItem('authorization')||'bearer ',
                }
            })            
            .done(function(result) {
                
                $('#alertOkText').text(result.message || 'Peticion correcta');
                $('#alertOk').slideDown();
                setTimeout(()=>{
                    $('#alertOk').slideUp();
                    location.reload(true);
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

    $('#formMateria').submit(e => {
        e.preventDefault();
        let form,obj = {};
        form = new FormData(e.target);
        form.forEach((value,key)=>{
            obj[key] = value;
        })
       
       $.ajax({
                type: "post",
                url: "http://localhost:8000/api/materias",
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
                    location.reload(true);
                },5000);
                $('#formMateria')[0].reset();
                $('#materias').click();
               
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
    });

    $('#formCurso').submit(e => {
        e.preventDefault();
        let form,obj = {};
        form = new FormData(e.target);
        form.forEach((value,key)=>{
            obj[key] = value;
        })
       
       $.ajax({
                type: "post",
                url: "http://localhost:8000/api/cursos",
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
                    location.reload(true);
                },5000);
                $('#formCurso')[0].reset();
                $('#cursos').click();
               
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
    });

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
                $('#tableEst').fadeIn('slow');
                $('#tEstudiantes').html(html).show('slow');
               
            })
            .fail(function(err,status) {
               console.log( "error" ,err);
               
                $('#textEst').text(err.responseJSON.message || err.responseJSON.error || 'error');
                $('#bodyEst').show('slow');
              console.log( "status" ,status);
            })
            .always(function() {
                console.log( "complete" );
            });
        }

         
    });

    $('#guias').click(e=>{
        console.log($('#guias i').hasClass('fa-minus'));
        if (!$('#guias i').hasClass('fa-minus')) {
            
			//e.preventDefault();
			//queryparams
			let searchParams = new URLSearchParams(window.location.search);        
			//searchParams.has('sent') // true
			let docente = searchParams.get('docente')
			//console.log(docente);
			//param id del curso
			var idCurso = window.location.pathname.split( '/' )[2];
			//console.log(idCurso);
			//var config = require('./config');
			$.ajax({
				type: "Get",
				url: "http://localhost:8000/api/guias?curso=" + idCurso,

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
				const a1 = '<a href="/guias/';
				const a2 = '?docente='+ docente +'" type="button" class="btn btn-primary btn-sm"><i class="fas fa-info" ></i></a> ';
				const a3 = '<a href="#" type="button" class="btn  btn-success btn-sm"><i class="fas fa-edit" ></i></a>';
				let html = '';

				let data = result.data;
				//console.log(data);
				
				
				for (let index = 0; index < data.length; index++) {
					html = html+ t1 + data[index].numero + '</td><td class="desc">';
					/* let contenido = data[index].contenidoHtml.split(/>/),texto = '';                            
					for(let i = 0; i < 6; i++){
					texto += contenido[i].split(/</)[0] + ' ';
                    } */
                    let texto = 'Descripcion de guia'
					html = html + texto + t2;
					html = html + data[index].fechaRegistro.substr(0,10) + t2;  
					html = html + a1 + data[index]._id + a2 + a3 + t3; 
				}
				
				
				$('#tableGuia').fadeIn('slow');
                $('#tGuias').html(html).show('slow');
			})
			.fail(function(err,status) {
				console.log( "error" ,err);
				$('#textGuia').text(err.responseJSON.message || err.responseJSON.error || 'error');
                $('#bodyGuia').show('slow');
				console.log( "status" ,status);
			})
        }

         
    })
    
})