//API XMLHttpRquest: Permite hacer peticiones a un servidor

//Importamos el modulo para hacer las peticiones
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
//Direccion de la API
let API = 'https://rickandmortyapi.com/api/character/';

function fetchData(url_api, callback){
    //Instanciamos la conexión
    let xhttp = new XMLHttpRequest();

    /*Parametros de open: método, URL, ¿es asincrono? true por defecto*/
    xhttp.open('GET', url_api, true);
    xhttp.onreadystatechange = function (event){

        /* Valor de readyState: 0: Inicializado, 1: Cargando
        2: Ya cargó, 3: Hay información, 4: Solicitud completa */
        if(xhttp.readyState === 4){

        /* Verifica estado,los casos mas comunes:
        100 - 199: La petición esta siendo procesada.
        200 - 299: La petición fue recibida, aceptada y procesada correctamente.
        300 - 399: Hay que tomar acciones adicionales. Por lo general, redireccionamiento.
        400 - 499: Errores del lado del cliente. Se hizo mal la solicitud de datos.
        500 - 599: Errores del Servidor. Falló totalmente la ejecución.*/
            if(xhttp.status === 200){
                callback(null, JSON.parse(xhttp.responseText))
            } else {
        //Si el estatus != 200, retornamos un error.
                const error = new Error('Error ' + url_api);
                return callback(error, null)
            }
        }
    }
    //Envio de la solicitud.
    xhttp.send();
}

//Buscamos la lista de personajes
fetchData(API, function(error1, data1){
    if(error1) return console.error(error1);
//Buscamos a Rick Sanchez
    fetchData(API + data1.results[0].id, function(error2, data2){
        if(error2) return console.error(error2);
//Consultamos la dimensión de Rick Sanchez
        fetchData(data2.origin.url, function(error3, data3){
            if(error3) return console.error(error3);
//Imprimen en consola nº de caracteres, nombre de Rick y dimensión
            console.log(data1.info.count);
            console.log(data2.name);
            console.log(data3.dimension);
        });
    });
});