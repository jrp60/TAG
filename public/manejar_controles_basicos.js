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
function cargar(nombre, isVs) {
   return new Promise((resolve, reject) => {
      let http = false;
      if (window.XMLHttpRequest) { // Mozilla, Safari,...
         http = new XMLHttpRequest();
         if (http.overrideMimeType) {
            http.overrideMimeType('text/xml');
            // Ver nota sobre esta linea al final
         }
      } else if (window.ActiveXObject) { // IE
         try {
            http = new ActiveXObject("Msxml2.XMLHTTP");
         } catch (e) {
            try {
               http = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) { }
         }
      }

      if (!http) {
         reject('Falla :( No es posible crear una instancia XMLHTTP');
         return false;
      }
      http.onreadystatechange = () => {
         if (http.readyState === 4) {
            if (http.status === 200) {
               resolve(http.responseText);
            } else {
               reject('Hubo problemas con la petición.');
            }
         }
      };

      http.open('GET', '/glsl/' + nombre + (isVs ? '_vs' : '_fs') + '.glsl', true);
      http.send();
   });
}
const shader = document.getElementById("shader");
shader.onchange = () => {
   cargar(shader.value, true).then(res => document.getElementById("vs").innerHTML = res);
   cargar(shader.value, false).then(res => document.getElementById("fs").innerHTML = res);
}

// document.getElementById

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
