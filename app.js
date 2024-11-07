/* obtener valores input */
/* nombre  */
const inputNombre=document.getElementById("nombrePersonaEmpresa");
/* ruc dni opcion */
const opcionDniRuc=document.getElementById("identificaciónRucDni");
const inputRucDni=document.getElementById("dniRuc");
/* Descripcion */
const inputDescripcion=document.getElementById("descripcion-o-detalle");
/* Monto */
const inputMonto=document.getElementById("monto");

/* Obtener el valor del div contenedor */

const inputData = document.getElementById("contendor-boleta");

 
/* configuracion de la base del pdfs */
 inputData.style.display='flex';
 inputData.style.flexDirection='column';
 inputData.style.alignItems='center';
 inputData.style.gap='20px';

 
 
 
 
 // Define la función generatePDF en el ámbito global
 const generatePDF = () => {

    let contador=0;
    while (contador < 4) {
        const crearP = document.createElement("p");
        crearP.id = "texto" + contador;
        crearP.style.textAlign='center';
    
        // Obtener los valores actuales de los inputs
        if (contador === 0) {
            crearP.textContent = "Persona natural o juridica:"+inputNombre.value;
        } else  if (contador === 1) {
    
            crearP.textContent = (opcionDniRuc.value+": "+inputRucDni.value);
        }else  if (contador === 2) {
            crearP.textContent = "Descripcion:"+inputDescripcion.value;
        } else  if (contador === 3){
            crearP.textContent = ("Monto: "+inputMonto.value+" soles.");
        }
    
        inputData.appendChild(crearP);
        contador++;
    }
    
    if (!inputData) {
        console.error("Elemento 'pdf-content' no encontrado");
        return;
    }

    html2canvas(inputData).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;  // Obtiene jsPDF del CDN

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: 'a4'
        });

        pdf.addImage(imgData, 'PNG', 10, 10);
        pdf.save("document.pdf");
    }).catch(error => {
        console.error("Error al generar PDF:", error);
    });
};
