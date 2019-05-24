//===== David Liqiu Hu =======================================
//= Mejoras en client side para los datos de la interfaz
//===== Version ==============================================
//= 1.0 - rev.(02/24)
//===== Description ==========================================
//= Es el javascript que usa la interfaz para gestionar los datos.
//===== Changelog ============================================
//= 1.0 Para manejar la interfaz [David]
//= (02/16) Añadir ligeras restricciones. [David]
//= (02/24) Cambiar condiciones. [David]


class Persona {
   constructor(nombre, altura, malla, material) {
      this.nombre = nombre;
      this.altura = altura;
      this.malla = malla;
      this.material = material;
   }
}
var i = 1;

document.getElementById("mas").onclick = () => {

   if (i <= 4) { // Podemos ampliarlo a más, pero la vista está demasiado sobrecargado.
      const base = document.getElementById("base");
      const base_copy = base.cloneNode(true);
      base_copy.id += (i++);
      document.getElementById("formulario").appendChild(base_copy);
   }
};

document.getElementById("menos").onclick = () => {
   if (i > 1) { // Para dejar al menos 1 formulario
      const formulario = document.getElementById("formulario");
      formulario.removeChild(formulario.lastChild);
      i--;
   }
};
