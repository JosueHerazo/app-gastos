import { isThisMonth } from "date-fns";
import { parseISO } from "date-fns";
const cargarTotalGastado = () => {
    const contenedorTotalGastado = document.getElementById("total-gastado")
    // getItem del local storage trae la propiedad de gastos como una cadena de texto por eso se debe usar el JSON parse para convertirla en una objeto-array
    const gastos = JSON.parse(window.localStorage.getItem("gastos"))
    let total = 0;

    if(gastos){
        const gastosDelMes = gastos.filter((gasto) => {
            // se pregunta si la fecha es de este mes para filtrar el array de gastos con el del mes en curso  y se utiliza  metodo de parseISO para convertir la fecha esta como cadena de texto string y lo convierte  en un objeto para ser usada por la function isThisMonth
            if(isThisMonth(parseISO(gasto.fecha)))
            return gastos;
        });
        if(gastosDelMes){
            gastosDelMes.forEach((gasto) => {
                // gasto es una cadena de texto y para usarla como numero se debe usar parseFloat y convertiar a numero 
                total += parseFloat(gasto.precio)
            });
        }
        const formatoMoneda = new Intl.NumberFormat("es-ES", {style: "currency", currency: "EUR"})
        contenedorTotalGastado.innerHTML =  formatoMoneda.format(total)
    }
}
export default cargarTotalGastado;