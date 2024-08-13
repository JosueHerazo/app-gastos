// importamos la function import { v4 as uuidv4 } from 'uuid', luego de haber instalado **npm install uuid** y **npm install @rollup/plugin-node-resolve --save-dev  este plugin es para trabajar con rollup**
import { v4 as uuidv4 } from 'uuid';
import cargarGastos from './cargarGastos';
import { cerrarFormularioGasto } from './eventoBtnFormularioGasto';
import cargarTotalGastado from './cargarTotalGastado';
const formulario = document.querySelector("#formulario-gasto form")
const descripcion = formulario.descripcion;
const precio = formulario.precio;
const expRegDescripcion =/^[a-zA-Z0-9\_\- ]{4,30}$/;
const expRegPrecio =/^\d+(\.\d+)?$/;

const comprobarDescripcion = ( ) => {
    if(!expRegDescripcion.test(descripcion.value)){
        descripcion.classList.add("formulario-gasto__input--error")

        formulario.descripcion.parentElement.querySelector(".formulario-gasto__leyenda").classList.add("formulario-gasto__leyenda--active")
        return false;
    }else{
        descripcion.classList.remove("formulario-gasto__input--error")

        formulario.descripcion.parentElement.querySelector(".formulario-gasto__leyenda").classList.remove("formulario-gasto__leyenda--active")
        return true;
    }
}

const comprobarPrecio = ( ) => {
    if(!expRegPrecio.test(precio.value)){
        precio.classList.add("formulario-gasto__input--error")

        formulario.precio.parentElement.querySelector(".formulario-gasto__leyenda").classList.add("formulario-gasto__leyenda--active")
        return false;
    }else{
        precio.classList.remove("formulario-gasto__input--error")

        formulario.precio.parentElement.querySelector(".formulario-gasto__leyenda").classList.remove("formulario-gasto__leyenda--active")
        return true;
    }
}
// Event Listener para cuando el input pierde el focus 
 descripcion.addEventListener("blur", (e) => comprobarDescripcion())
 //  Event Listener para cuando el input precio tiene un error y el usuario empieza a escribir paracorregirlo.
 descripcion.addEventListener("keyup", (e) => {
   if( [...e.target.classList].includes("formulario-gasto__input--error")){
    comprobarDescripcion();  
}
});
// Event Listener para cuando el input precio pierde el focus
 precio.addEventListener("blur", (e) => comprobarPrecio())
//  Event Listener para cuando el input precio tiene un error y el usuario empieza a escribir paracorregirlo.
 precio.addEventListener("keyup", (e) => {
   if( [...e.target.classList].includes("formulario-gasto__input--error")){
    comprobarPrecio();
}
})
// creamos el el evento submit para enviar los datos del formulario
formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const modo = formulario.closest("#formulario-gasto")?.dataset.modo;

    // comprobamos si los datos son correctos
    if(comprobarDescripcion() && comprobarPrecio()){
        // si son corrctos entonces creamos un objeto con los siguientes datos
        const nuevoGasto = {
            // tomamos la function importada para darle un identificador unico a cada objeto del arreglo a crear
            id: uuidv4(),
            fecha: new Date(),
            descripcion: descripcion.value,
            precio: precio.value,
    } 
    // creamos un nuevo objeto con los datos guardados del nuevoGasto del primero primeros objetos almacenados en el localStorage
        const gastosGuardados = JSON.parse(window.localStorage.getItem("gastos")) 

        // comprobamos los gatos almacenados el el localStorage
       if(modo === "agregarGasto"){ if(gastosGuardados){
            // si hay datos guardados entonces creamos una nueva lista de gastos que inlcuye el nuevo 
            // añadimos un nuevo array uniendo con un spread los datos y le juntamos el nuevo o los nuevos que se vayan almacenando 
            const nuevosGastos = [...gastosGuardados, nuevoGasto]
        //    setiamos los nuevos datos que se van creando para tomar el nuevo y luego vamos creando otros nuevos
            window.localStorage.setItem("gastos", JSON.stringify(nuevosGastos))
        }else{
            // agregamos el primer gasto como primera condicion en caso que no haya ya luego que se creen los primeros datos se cumple la primera de añadir mas datos
            window.localStorage.setItem("gastos", JSON.stringify([{...nuevoGasto}]));
        }}else if(modo === "editarGasto"){
            // obtenemos el ID del gasto a ediptar
            const id = document.getElementById("formulario-gasto")?.dataset.id
            
            // obtenemos los valores de la descripcion y el precio 

            // obtenemos el index del elemento a editar 
            let indexGastoAEditar;
            if(id && gastosGuardados){
                gastosGuardados.forEach((gasto, index) =>{
                    if(gasto.id === id){
                        indexGastoAEditar = index;
                    }
                })
            }
            // Hacemos una copia de los gastos guradadps para poder editarla 
            const nuevosGastos = [...gastosGuardados];
             nuevosGastos[indexGastoAEditar] = {
                ...gastosGuardados[indexGastoAEditar],
                descripcion: descripcion.value,
                precio: precio.value,

             };
            //  reemplazamos el localstorage con los nuevos gastos 
             window.localStorage.setItem("gastos", JSON.stringify(nuevosGastos))
            }

        descripcion.value = "";
        precio.value = "" 
        cargarGastos()
        cerrarFormularioGasto()
        cargarTotalGastado()

    
    }

});

