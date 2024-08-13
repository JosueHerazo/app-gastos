import { isThisMonth } from "date-fns";
import  {abrirFormularioGasto} from "./eventoBtnFormularioGasto"
import cargarGastos from "./cargarGastos";
import cargarTotalGastado from "./cargarTotalGastado";()

const contenedorGastos = document.getElementById("gastos");
contenedorGastos.addEventListener("click", (e) => {
    const gasto = e.target.closest(".gasto");
    // comprobamos si dimos click en el gasto
    if(gasto){
        if(gasto.scrollLeft > 0){

            gasto.querySelector(".gasto__info").scrollIntoView({
                // en el metodo scroll into view se necesita tres parametros behavior para darle una transition, tambien se debe establecer como se debe desplazar se coloca star para que se mueva hacia la izquierda se necesito ponerle block
    
                behavior: "smooth",
                inline: "start",
                block: "nearest",
    
            })
        }else{     
            gasto.querySelector(".gasto__acciones").scrollIntoView({
                // en el metodo scroll into view se necesita tres parametros behavior para darle una transition, tambien se debe establecer como se debe desplazar se coloca star para que se mueva hacia la izquierda se necesito ponerle block
    
                behavior: "smooth",
                inline: "start",
                block: "nearest",
    
            })
        }
    }
    // tomamos el button por su data-accion de editar gasto
    if(e.target.closest("[data-accion=editar-gasto]")){
        // obtenemos el id del gasto que queremos editar
        let id = gasto.dataset.id
        // obtenemos los gastos guardados
       const gastosGuardados = JSON.parse(window.localStorage.getItem("gastos"))
       let precio = "";
       let descripcion = "";
    //    comprobamos si hay datos guardados
       if(gastosGuardados && gastosGuardados.length > 0){
            gastosGuardados.forEach((gasto) => {
                if(gasto.id === id){
                    precio = gasto.precio,
                    descripcion = gasto.descripcion
       }});
    //    le ponemos la descripcion y el precio a los inputs del formulario
    document.querySelector("#formulario-gasto #descripcion").value = descripcion;
    document.querySelector("#formulario-gasto #precio").value = precio;
    document.querySelector("#formulario-gasto").dataset.id = id;
    
    abrirFormularioGasto("editarGasto")
        }
    };

    // borrar gasto

    if(e.target.closest("[data-accion=eliminar-gasto]")){
            // obtenbemos el id del gasto que queremos eliminar 
        const id = e.target.closest(".gasto").dataset.id
        // obtener los gastos guardados 
        const gastosGuardados = JSON.parse(window.localStorage.getItem("gastos"))
        if(gastosGuardados){
            const nuevosGastos = gastosGuardados.filter((gasto) => {
                if(gasto.id !== id){
                    return gasto;
                } 
            });
            window.localStorage.setItem("gastos", JSON.stringify(nuevosGastos))
        }
        cargarGastos()
        cargarTotalGastado()


    }
})