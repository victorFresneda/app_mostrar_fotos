const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const paginacionDiv = document.querySelector('#paginacion');



const registroPorPagina = 40;
let totalPaginas;
let iterador;



window.onload = () => {

    formulario.addEventListener('submit',validarFormulario);
} 


function validarFormulario(e){

    e.preventDefault();

    const terminoBusqueda = document.querySelector('#termino').value;

    if(terminoBusqueda === ''){
        mostrarAlerta('Agregar un termino de busqueda');
        return;
    }

    buscarImagenes(terminoBusqueda);

}



function buscarImagenes(termino){
    const key  = '22768640-2b80205e385b5bcbc792841b1'
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${registroPorPagina}`;


       fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => {
                mostrarImagenes(resultado.hits);
            })

}


function crearPaginador(total){
     for (let i = 1; i<= total; i++){
         yield i
     } 
}


function mostrarImagenes(imagenes){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }


    // Iterar sobre el arreglo de imagenes y construir HTML 


    imagenes.forEach(imagen => {
        const {previewURL, likes, views, largeImageURL} = imagen;


        resultado.innerHTML += `

        <div class=" w-1/2  md:w-1/3 lg:w-1/4 p-3 mb-4 ">

           <div class="bg-white">

               <img class="w-full" src="${previewURL}">

               <div class="p-4">

                 <p class="font-bold"> ${likes} <span class="font-light"> Me gusta</span> </p>
                 <p class="font-bold"> ${views} <span class="font-light"> Vistas </span> </p>

                 <a
                      class= "block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1"                
                      href="${largeImageURL}" target="_blank" rel"nooponer noreferrer
                    >
                      Ver imagen
                 </a>    
                 


               </div>
              
           </div>
           
        </div>   
        
        `;
        
    });

    //Limpiar el paginador previo 

    while(paginacionDiv.firstChild){
        paginacionDiv.removeChild(paginacionDiv.firstChild);
    }
       
    //Se fgenera el nuevo HTML 

    imprimirPaginador();
}

function mostrarAlerta(mensaje){

    const existeAlerta = document.querySelector('.bg-red-100'); 


    if(!existeAlerta){

        const alerta = document.createElement('p');

        alerta.classList.add('bg-red-100', 'borde-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'max-auto', 'mt-6', 'text-center');
    
        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline"> ${mensaje}</span>
        `;
    
        formulario.appendChild(alerta);
    
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
    }


    function imprimirPaginador (){
        iterador = crearPaginador(totalPaginas);


        while(true){
            const {value, done} = iterador.next();
            if(done) return;

            //En caso contrario, genera un boton por cada elemento generado 

            const boton = document.createElement('a');
            boton.href = '#';
            boton.dataset.pagina = value;
            boton.textContent = value;
            boton.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-4', 'rounded');


            paginacionDiv.appendChild(boton);


        }
    }


  