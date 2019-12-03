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
			.always(function() {
				console.log( "complete" );
			});
        }

         
    })
    /* charts */
    
    let searchParams = new URLSearchParams(window.location.search);        
			
	let docente = searchParams.get('docente')
    var idCurso = window.location.pathname.split( '/' )[2];
    $.ajax({
        type: "Get",
        url: "http://localhost:8000/api/cursos/estadisticas?docente=" + docente + "&curso=" + idCurso,

        cache: false,
        dataType: "json",
        //contentType: 'application/json; charset=utf-8',//multipart/form-data, or text/plain
        headers:{
            authorization: localStorage.getItem('authorization')||'bearer ',
            
        }
    })            
    .done(function(result) {
        console.log( "success esta" ,result);

        
        
        //console.log(result.guias.length);
        var labs = result.data;
        var guias = result.guias;

        
        $('#bodyBar').fadeIn('slow');
        $('#bodyPie').fadeIn('slow');
            
        var dcontPen = 0, dcontPor = 0,dcontRev = 0;
        for (let i = 0; i < labs.length; i++) {
            
            if (labs[i].estado == 'revisado') {
                dcontRev ++;
            }else{
                if (labs[i].estado == 'pendiente') {
                    dcontPen ++;
                }else{
                    dcontPor ++;
                }
                
            }
            
        }
        var ctx = $('#pieChart');
        //var ctx = 'myChart';
        var prom = dcontPen + dcontPor + dcontRev;
        var prev = dcontRev / prom *100 , pnrev = dcontPor / prom * 100, ppen = dcontPen / prom * 100;

        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
            labels: [
                'REVISADOS ' + Math.round(prev * 100) / 100  + '%',
                'NO REVISADOS ' + Math.round(pnrev * 100) / 100  + '%',
                'PENDIENTES '+ Math.round(ppen * 100) / 100  + '%'],
            datasets: [{
                label: 'Label',
                data: [dcontRev , dcontPor, dcontPen],
                backgroundColor: [
                '#008d4c',
                '#db8b0b',
                '#d33724'
                ],
                borderWidth: 1
            }]
            },
            options: {
            cutoutPercentage: 30,
            responsive: true,
            animation : {
                animateScale:true,
                animateRotate:true
            }
            
        
            }
        });



        var graf = [];
        var rev=[],nrev=[],pen=[],crev=[],cnrev=[],cpen=[],llabs=[];
        //for para los laboratoio
        for (let i = 0; i < guias.length; i++) {
            
            const element = guias[i];
            var contRev = 0 ,contPor = 0; contPen = 0;
            for (let j = 0; j < labs.length; j++) {
                if (labs[j].guia == guias[i]._id) {
                    if (labs[j].estado == 'revisado') {
                        contRev ++;
                    }else{
                        if (labs[j].estado == 'pendiente') {
                            contPen ++;
                        }else{
                            contPor ++;
                        }
                        
                    }
                }
            }
            graf.push({
                guia: guias[i]._id,
                numero: guias[i].numero,
                revisados: contRev,
                nRevisados: contPor,
                pendientes: contPen
            })
            rev.push(contRev);
            nrev.push(contPor);
            pen.push(contPen);
            crev.push('#00a65a');
            cnrev.push('#f39c12');
            cpen.push('#f56954');
            llabs.push('Lab '+guias[i].numero);
            //aqui 
        }

        console.log('graf', graf);

        var ctxBar = $("#barChart");
        

        var myChartBar = new Chart(ctxBar, {
            type: 'bar',
            data: {
            labels: llabs,
            datasets: [{
                label: 'REVISADOS',
                data: rev,
                backgroundColor: crev,
                borderWidth: 1
            },
            {
                label: 'NO REVISADOS',
                data: nrev,
                backgroundColor: cnrev,
                borderWidth: 1
            },
            {
                label: 'PENDIENTES',
                data: pen,
                backgroundColor: cpen,
                borderWidth: 1
            }]
            },
            options: {
            responsive: false,
            scales: {
                
                yAxes: [{
                ticks: {
                    beginAtZero: true,
                    
                }
                }]
            }
            }
        }); 
        

        

        
    
        
        
        
    })
    .fail(function(err,status) {
        console.log( "error" ,err);
        
        $('#textChart').text(err.responseJSON.message || err.responseJSON.error || 'No se puede mostar las Estadisticas');
        $('#bodyChart').show('slow');
        console.log( "status" ,status);
    })/* 
    .always(function() {
        console.log( "complete" );
    }) */;
    
    
    
    

   
})