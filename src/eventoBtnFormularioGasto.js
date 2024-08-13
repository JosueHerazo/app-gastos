const boton = document.getElementById("toggle-form-gasto")
// formulario de gasto parent principal
const formularioGasto = document.getElementById("formulario-gasto")
// muestra el parametro la opcion si hay una parametro vacio toma el segundo 
const abrirFormularioGasto = (modo = "agregarGasto") => {
    if(modo === "editarGasto"){
        document.querySelector(".formulario-gasto__titulo").innerText = "Editar gasto"
        document.querySelector(".formulario-gasto__btn").innerText = "Editar gasto"
        document.getElementById("formulario-gasto").dataset.modo = "editarGasto"
    }else{
        document.getElementById("descripcion").value = "";
        document.getElementById("precio").value = "";
        document.querySelector(".formulario-gasto__titulo").innerText = "Agergar gasto"
        document.querySelector(".formulario-gasto__btn").innerText = "Agregar gasto"
        document.getElementById("formulario-gasto").dataset.modo = "agregarGasto"
    }
    // a la funcion de abrir se le añade al boto la clase que cambiar su icono al abrir la ventana del formulario
    boton.classList.add("agregar-gasto__btn--active")
    // se le añade la clase para darle block a la pantalla escondida del formulario
    formularioGasto.classList.add("formulario-gasto--active")
}
const cerrarFormularioGasto = () => {
    boton.classList.remove("agregar-gasto__btn--active")
    formularioGasto.classList.remove("formulario-gasto--active")
}


boton.addEventListener("click",  () => {
    // se busca el parent y se convierte e una lista de arrays para buscar sus clases luego se le añade la clase que le da block a la pantalla escondida y luego si se cumple esa condicion. entonces.
    if([...formularioGasto.classList].includes("formulario-gasto--active")){
        // la primera condicion será si se comprueba que tiene la clase es decir si esta abierta en block la pantalla luego cierras la clase block con la funcion que le da remove al formulario parent ---formularioGastoclassList.remove("formulario-gasto--active")--
        cerrarFormularioGasto();
       
    }else{
        abrirFormularioGasto();        
    }
});

export {cerrarFormularioGasto, abrirFormularioGasto};





