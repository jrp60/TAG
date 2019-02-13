//===== David Liqiu Hu =======================================
//= Mejoras en client side para los datos
//===== Version ==============================================
//= 1.0
//===== Description ==========================================
//= Es el javascript que usa la interfaz para gestionar los datos.
//===== Changelog ============================================
//= 1.0

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
      const personas_aux = document.getElementsByTagName("article");
      for (const dom of personas_aux) {
         const datos = dom.children;
         const persona = new Persona(datos[0].value, datos[1].value);
         personas.push(persona);
      }
      console.log(personas);
   };

   document.getElementById("mas").onclick = () => {
      const base = document.getElementById("base");
      const base_copy = base.cloneNode(true);
      base_copy.id += (i++);
      document.getElementById("formulario").appendChild(base_copy);
      console.log(base_copy.id);
   };

   var gl; // Un variable global para el contexto WebGL

   var canvas = document.getElementById("glcanvas");

   gl = initWebGL(canvas);      // Inicializar el contexto GL

   // Solo continuar si WebGL esta disponible y trabajando
   if (gl) {
      gl.clearColor(0.0, 0.0, 0.0, 1.0);                      // Establecer el color base en negro, totalmente opaco
      gl.enable(gl.DEPTH_TEST);                               // Habilitar prueba de profundidad
      gl.depthFunc(gl.LEQUAL);                                // Objetos cercanos opacan objetos lejanos
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);    // Limpiar el buffer de color asi como el de profundidad
   }

   function initWebGL(canvas) {
      gl = null;

      try {
         // Tratar de tomar el contexto estandar. Si falla, retornar al experimental.
         gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      }
      catch (e) { }

      // Si no tenemos ningun contexto GL, date por vencido ahora
      if (!gl) {
         alert("Imposible inicializar WebGL. Tu navegador puede no soportarlo.");
         gl = null;
      }
      return gl;
   }
}