//===== Comments =============================================
//=  - El principal archivo donde se manejará el motor gráfico
//===== Changelog ============================================
//=  - 0.1 Primera version
//=  - 0.2 Arbol de la escena [David]
//=  - 02/16 - Reordenar para dejarlo todo mas claro y pila [David]
//=  - 02/17 - Funciones para montar un arbol(probar nodos y entidad transform y sus metodos) [Javi]
//=  - 02/19 - Montando el arbol de la escena [Javi]
//=  - 02/24 - Cambiado de lugar el punto de referencia con Three,
//=  añadido un gestor de recursos con una única prueba de malla [David]
//=  - 02/25 - Corrigiendo errores y añadiendo los nombres a los nodos [Javi]
//=  - 03/04 - Usando TMotorTAG como escena y añadiendo los nodos en esa variable [Javi]
//=  - 03/09 - Nombre a GLOBAL para que tenga más significado, limpieza y arreglos variados [David]
//=  - 04/01 - Creando camara en el arbol a través de la fachada

import { GLOBAL } from './js/GLOBAL.js';
import { TMotorTAG } from './js/TMotorTAG.js';
import { TNodo } from './js/TNodo.js';
// import { Persona } from 'manejar_motor_grafico.js';
/** * glMatrix.ARRAY_TYPE(3) * @type {vec3} **/
const vec3 = glMatrix.vec3;

/** * glMatrix.ARRAY_TYPE(16) * @type {mat4} **/
const mat4 = glMatrix.mat4;
// ======================================================================
// ========================= Variables globales =========================

GLOBAL.canvas = document.getElementById("glcanvas");
try {
  // Tratar de tomar el contexto estandar. Si falla, retornar al experimental.
  GLOBAL.gl = GLOBAL.canvas.getContext("webgl2") || GLOBAL.canvas.getContext("webgl") || GLOBAL.canvas.getContext("experimental-webgl");
}
catch (e) { }
// Si no tenemos ningun contexto GL.
if (!GLOBAL.gl) {
  alert("Imposible inicializar WebGL. Tu navegador puede no soportarlo.");
  GLOBAL.gl = null;
}
GLOBAL.gl.clearColor(0.5, 0.5, 0.5, 0.9); // Cambia el fondo del canvas.
GLOBAL.gl.clear(GLOBAL.gl.COLOR_BUFFER_BIT | GLOBAL.gl.DEPTH_BUFFER_BIT);    // Eliminar/sustituye el color del canvas anterior.

// ======================================================================
// =========================    HERRAMIENTAS    =========================

// Solo continuar si WebGL esta disponible y trabajando
window.addEventListener('resize', () => {
  var width = GLOBAL.canvas.clientWidth;
  var height = GLOBAL.canvas.clientHeight;
  if (GLOBAL.canvas.width != width ||
    GLOBAL.canvas.height != height) {
    GLOBAL.canvas.width = width;
    GLOBAL.canvas.height = height;
  }
});

// Boton para imprimir arbol
document.getElementById("imprimir").onclick = () => {
  if (raiz === null) {
    console.error("[ERROR] No existe el nodo Raiz");
  } else {
    raiz.imprimir(); // Con esto se puede visualizar el arbol
  }
};

let bucle = false;
let animation; // ID de la animacion para cancelar
const fps = 30;
const fpsInterval = 1000 / fps;

let now, then, elapsed;

// Boton para que el motor dibuje.
document.getElementById("animar").onclick = () => {
  if (raiz == null) {
    console.error("[ERROR] No existe el nodo Raiz");
  } else {
    bucle = !bucle;
    if (bucle) {
      then = Date.now();
      animation = window.requestAnimationFrame(step);
      console.log('Animacion encendida');
    } else {
      window.cancelAnimationFrame(animation);
      console.log('Animacion parada');
    }
  }
};

// Boton para que el motor dibuje.
document.getElementById("draw").onclick = () => {
  if (raiz == null) {
    console.error("[ERROR] No existe el nodo Raiz");
  } else {
    raiz.draw();
  }
};

// document.getElementById("niu").onclick = () => {
//   if (raiz == null || raiz.getHijos().length == 0) {
//     console.log("no hay raiz o hijos en la raiz");;
//   } else {
//     let auxHijos = raiz.getHijos();
//     var i = 0
//     for (i; i < auxHijos.length - 1; i++) {
//     }
//     let auxEntidad = raiz.getHijo(i).entidad;
//     console.log(auxEntidad);
//     let auxHijo = new TNodo();
//     auxHijo.entidad = auxEntidad;
//     raiz.addHijo(auxHijo);
//
//     // raiz.remHijo(auxHijos[i]);
//   }
// };

// ======================================================================
// =========================    Código motor    =========================

//matriz view
//var viewMatrix = mat4.identity(mat4.create());

const raiz = new TMotorTAG(); // Variable global de Javi


//LUZ 1
//rotacion-l1
var rl1 = raiz.crearTransform();
var rotacionL1 = raiz.crearNodo(raiz.escena, rl1, "rotacionL1")
//traslacion-l1
var tl1 = raiz.crearTransform();
tl1.trasladar(2, 2, 0);
var traslacionL1 = raiz.crearNodo(rotacionL1, tl1, "traslacionL1");
//escalado-l1
var el1 = raiz.crearTransform();
var escaladoL1 = raiz.crearNodo(traslacionL1, el1, "escaladoL1");
//luz1
var l1 = raiz.crearLuz();
 var luz1 = raiz.crearNodo(escaladoL1, l1, "luz-1");

raiz.setLuzActiva(l1);
raiz.setIntensidadRGB(l1,20,20,15);
var vecAux= vec3.fromValues(1, 185, 160);
raiz.setIntensidadVector(l1, vecAux);
console.log("VEMOS LA LUZ");
console.log(l1);
console.log("FIN LOG LUZ");

//CAMARA 1
//rotacion-c1
var rc1 = raiz.crearTransform();
var rotacionC1 = raiz.crearNodo(raiz.escena, rc1, "rotacionC1");
//traslacion-c1
var tc1 = raiz.crearTransform();
tc1.trasladar(1, 1, 10);
var traslacionC1 = raiz.crearNodo(rotacionC1, tc1, "traslacionC1");
//escalado-c1
var ec1 = raiz.crearTransform();
var escaladoC1 = raiz.crearNodo(traslacionC1, ec1, "escaladoC1");
//camara1
var c1 = raiz.crearCamara();
var camara1 = raiz.crearNodo(escaladoC1, c1, "camara-1");
// console.log(camara.entidad);
console.log(c1);
console.log(camara1);
raiz.iniciarCamara(c1, 0.1, 100, 600, 0, 800, 0);
console.log("Camara despues de iniciar");
console.log(c1);
raiz.setPerspectiva(c1);

//PERSONA 1
//rotacion-p1
var rp1 = raiz.crearTransform();
var rotacionP1 = raiz.crearNodo(raiz.escena, rp1, "rotacionP1");
// rp1.rotar(1, 1, 1, 1);
//traslacion-p1
var tp1 = raiz.crearTransform();
var traslacionP1 = raiz.crearNodo(rotacionP1, tp1, "traslacionP1");
// tp1.trasladar(0.1, 0, 0);
//escalado-p1
var ep1 = raiz.crearTransform();
var escaladoP1 = raiz.crearNodo(traslacionP1, ep1, "escaladoP1");
// ep1.escalar(0.8, 0.8, 0.8);
//malla-p1
var mp1 = raiz.crearMalla('female-croupier-2013-03-26');
var mallaP1 = raiz.crearNodo(escaladoP1, mp1, "mallaP1");

//PERSONA 2
//rotacion-p2
var rp2 = raiz.crearTransform();
rp2.rotar(0, 1, 0, 180);
// rp1.rotar(0.2, 1, 0, 2);
var rotacionP2 = raiz.crearNodo(raiz.escena, rp2, "rotacionP2");
//traslacion-p2
var tp2 = raiz.crearTransform();
tp2.trasladar(-1, 0, 0.5);
var traslacionP2 = raiz.crearNodo(rotacionP2, tp2, "traslacionP2");

//escalado-p2
var ep2 = raiz.crearTransform();
ep2.escalar(0.5, 0.5, 0.5);
var escaladoP2 = raiz.crearNodo(traslacionP2, ep2, "escaladoP2");
//malla-p2
var mp2 = raiz.crearMalla('female-croupier-2013-03-26');
var mallaP2 = raiz.crearNodo(escaladoP2, mp2, "mallaP2");

raiz.setCamaraActiva(c1); //establecemos la camara activa

console.log("Antes de begindraw");
//raiz.draw();
console.log("Despues de begindraw");

// ======================================================================
// =========================  Código animacion  =========================

let aux_transladar = true; // False Izquierda, True derecha.
let transladar = 0.005;
let frame = 1;
function step() {
  animation = window.requestAnimationFrame(step);
  now = Date.now();
  elapsed = now - then;
  // if enough time has elapsed, draw the next frame
  if (elapsed > fpsInterval) {
    // Get ready for next frame by setting then=now, but also adjust for your
    // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
    then = now - (elapsed % fpsInterval);
    // webglUtils.resizeCanvasToDisplaySize(GLOBAL.gl.canvas);

    // Tener en cuenta que en la animación lo que se hace es añadir a
    // lo que habia en la matriz de transformación anterior
    rp1.rotar(0.2, 1, 0, 2);
    if (frame % 400 === 0) {
      aux_transladar = !aux_transladar;
    }
    tp2.trasladar(aux_transladar ? transladar : -transladar, 0, 0);
    frame++;
    // Código de animación
    raiz.draw();
  }
}
