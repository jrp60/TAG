//===== David Liqiu Hu =======================================
//= Mejoras en client side para los datos de la interfaz
//===== Version ==============================================
//= 1.0 - rev.(02/16)
//===== Description ==========================================
//= Es el javascript que usa la interfaz para gestionar los datos.
//===== Changelog ============================================
//= 1.0 Para manejar la interfaz [David]
//= (02/16) Añadir ligeras restricciones. [David]

class Persona {
   constructor(nombre, altura) {
      this.nombre = nombre;
      this.altura = altura;
   }
}
const personas = [];
var i = 1;
window.onload = () => {


   document.getElementById("enviar").onclick = () => {
      personas.length = 0; // No reinicia exactamente el array, pero hace que empiece desde el 0.
      const personas_aux = document.getElementsByTagName("article");
      for (const dom of personas_aux) {
         const datos = dom.children;
         const persona = new Persona(datos[0].value, datos[1].value);
         personas.push(persona);
      }
      console.log(personas);
   };


   document.getElementById("mas").onclick = () => {
      if (i === 30) { // Podemos ampliarlo a más, pero la vista está demasiado sobrecargado.
         const base = document.getElementById("base");
         const base_copy = base.cloneNode(true);
         base_copy.id += (i++);
         document.getElementById("formulario").appendChild(base_copy);
      }
   };


   document.getElementById("menos").onclick = () => {
      if (i === 1) { // Para dejar al menos 1 formulario
         const formulario = document.getElementById("formulario");
         formulario.removeChild(formulario.lastChild);
         i--;
      }
   };
}