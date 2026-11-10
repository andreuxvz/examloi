	
	function firmarDocumento(callback) {
		var tipoFirma     = "";
		var rutaEntrada   = "";
		var rutaSalida    = "";
		var nombreArchivo = "";
		var sistema       = "";
		var servidorFirma = "";
		var correoElectronicoResponsable = "null";
		var correoElectronicoAsunto = "null";
		var correoElectronicoMensaje = "null";
		var validarNoRepudio = "";
		var validarTsl = "";
		
		var firmaHolografica = "";
		var obtenerImagenHolograficaDesdeServidor = "N";
//		var rutaImagenHolograficaServidor = "";
		var imagenHolograficaServidor = "";
		var motivo = "";
		var pagina = "";
		var posicionX = "";
		var posicionY = "";
		
		tipoFirma     = document.getElementById("tipoFirma").value;
		rutaEntrada   = document.getElementById("rutaEntrada").value;
		rutaSalida    = document.getElementById("rutaSalida").value;
		sistema       = document.getElementById("sistema").value;
		servidorFirma = document.getElementById("servidorFirma").value;
		firmaHolografica = document.getElementById("firmaHolografica").value;
			
		if(document.getElementById("validarNoRepudio") && document.getElementById("validarNoRepudio").value){
			validarNoRepudio = document.getElementById("validarNoRepudio").value;
		}

		if(document.getElementById("validarTsl") && document.getElementById("validarTsl").value){
			validarTsl = document.getElementById("validarTsl").value;
		}
		
		
		if(document.getElementById("obtenerImagenHolograficaDesdeServidor") && document.getElementById("obtenerImagenHolograficaDesdeServidor").value){
			
			obtenerImagenHolograficaDesdeServidor = document.getElementById("obtenerImagenHolograficaDesdeServidor").value;
			
//			if(obtenerImagenHolograficaDesdeServidor == 'S'){
//				if(document.getElementById("rutaImagenHolograficaServidor") && document.getElementById("rutaImagenHolograficaServidor").value){
//					rutaImagenHolograficaServidor = document.getElementById("rutaImagenHolograficaServidor").value;
//				}
//			}
			if(obtenerImagenHolograficaDesdeServidor == 'S'){
				if(document.getElementById("imagenHolograficaServidor") && document.getElementById("imagenHolograficaServidor").value){
					imagenHolograficaServidor = document.getElementById("imagenHolograficaServidor").value;
				}
			}
			
		}
		
		motivo = document.getElementById("motivo").value;
		pagina = document.getElementById("pagina").value;
		posicionX = document.getElementById("posicionX").value;
		posicionY = document.getElementById("posicionY").value;

		if(tipoFirma == 'I'){
			nombreArchivo = document.getElementById("nombreArchivo").value;
		}else{
			nombreArchivo = "";
		}
		
		if(document.getElementById("correoElectronicoResponsable") && document.getElementById("correoElectronicoResponsable").value){
			correoElectronicoResponsable = document.getElementById("correoElectronicoResponsable").value;
		}
		
		if(document.getElementById("correoElectronicoAsunto") && document.getElementById("correoElectronicoAsunto").value){
			correoElectronicoAsunto = document.getElementById("correoElectronicoAsunto").value;
		}
		
		if(document.getElementById("correoElectronicoMensaje") && document.getElementById("correoElectronicoMensaje").value){
			correoElectronicoMensaje = document.getElementById("correoElectronicoMensaje").value;
		}
		
		var urlServicio = servidorFirma + '/SignFastService/services/rest/GestionarProcesamientoFirmas/registrar/' + sistema + "/" + encodeURIComponent(reemplazarSeparadorUrl(rutaEntrada)) + "/" + encodeURIComponent(reemplazarSeparadorUrl(rutaSalida)) + "/" + encodeURIComponent(correoElectronicoResponsable);
		obtenerNumeroOperacion(urlServicio, tipoFirma, rutaEntrada, rutaSalida, nombreArchivo, servidorFirma, firmaHolografica, obtenerImagenHolograficaDesdeServidor, imagenHolograficaServidor, motivo, pagina, posicionX, posicionY, sistema, correoElectronicoAsunto, correoElectronicoMensaje, validarNoRepudio, validarTsl, callback);
		
	}

	function recibirRespuestaFirma(url, numeroProcesamiento) {
		
	    var respuesta = "";
		var ajax = crearAjax();
		ajax.open('GET', url, true);
		ajax.onreadystatechange = function() {
			if (ajax.readyState == 4) {
			    if (ajax.status == 200) {
			    	respuesta = ajax.responseText;
					document.getElementById("respuesta").value = respuesta;
					enviarMensaje();
				} else if (ajax.status == 404) {
					document.getElementById("respuesta").value = '0';
					enviarMensaje();
				}
			}
		};
		
		ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		ajax.send();
	}

	function obtenerNumeroOperacion(urlServicio, tipoFirma, rutaEntrada, rutaSalida, nombreArchivo, servidorFirma, firmaHolografica, obtenerImagenHolograficaDesdeServidor, imagenHolograficaServidor, motivo, pagina, posicionX, posicionY, sistema, correoElectronicoAsunto, correoElectronicoMensaje, validarNoRepudio, validarTsl, callback){
	    var numeroProcesamiento = "";
	    var metodo = "";
		var ajax = crearAjax();
		ajax.open('GET', urlServicio, true);
		ajax.onreadystatechange = function() {
			if (ajax.readyState == 4) {
			    if (ajax.status == 200) {
			    	numeroProcesamiento = ajax.responseText;
			    	var rutaSignFastClient = "SignFastClient://sign/$" + 
			    	                         tipoFirma                 							    + "&" + 
			    	                         reemplazarSeparadorUrl(rutaEntrada)               	    + "&" + 
			    	                         reemplazarSeparadorUrl(rutaSalida)               	 	+ "&" + 
			    	                         nombreArchivo             								+ "&" + 
			    	                         numeroProcesamiento       								+ "&" + 
			    	                         servidorFirma             							    + "&" + 
			    	                         firmaHolografica          								+ "&" +
			    	                         obtenerImagenHolograficaDesdeServidor                  + "&" +
//			    	                         reemplazarSeparadorUrl(rutaImagenHolograficaServidor)  + "&" +
			    	                         imagenHolograficaServidor  							+ "&" +
			    	                         motivo                    								+ "&" +
			    	                         pagina                    								+ "&" +
			    	                         posicionX                 								+ "&" +
			    	                         posicionY                							    + "&" +
			    	                         sistema                   							    + "&" +
			    	                         encodeURIComponent(correoElectronicoAsunto)   			+ "&" +
			    	                         encodeURIComponent(correoElectronicoMensaje)           + "&" +
			    	                         validarNoRepudio                               		+ "&" +
			    	                         validarTsl;

			    	location.href = rutaSignFastClient;
			    	
			    	var urlServer = servidorFirma + '/SignFastService/services/rest/GestionarProcesamientoFirmas/consultar/' + numeroProcesamiento;
			    	callback(urlServer, numeroProcesamiento);
			    	
				} else if (ajax.status == 404) {
					numeroProcesamiento = "0";
				}
			}
		};
		
		ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		ajax.send();
		
		return numeroProcesamiento;
	}

	function crearAjax() {
		var xmlhttp = false;
		try {
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (E) {
				if (!xmlhttp && typeof XMLHttpRequest != 'undefined'){
					xmlhttp = new XMLHttpRequest();
				}
			}
		}
		return xmlhttp;
	}
	
	function obtenerRespuestaFirma(respuestaFirma){
		return respuestaFirma.split("|");
	}
	
	function reemplazarSeparadorUrl(ruta) {
		 
		 var posicion = 0, length = ruta.length;
		 
		 for (posicion; posicion < length; posicion++) {
		 
			 ruta = ruta.replace("/", "Â»");
		 
		 }
		 
		 return ruta;
		 
	}
	
