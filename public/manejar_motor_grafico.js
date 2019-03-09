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

import { GLOBAL } from './js/GLOBAL.js';
import { TEntidad } from './js/TEntidad.js';
import { TCamara } from './js/TCamara.js';
import { TColor } from './js/TColor.js';
import { TFichero } from './js/TFichero.js';
import { TGestorRecursos } from './js/TGestorRecursos.js';
import { TLuz } from './js/TLuz.js';
import { TMalla } from './js/TMalla.js';
import { TMotorTAG } from './js/TMotorTAG.js';
import { TNodo } from './js/TNodo.js';
import { TRecurso } from './js/TRecurso.js';
import { TRecursoMalla } from './js/TRecursoMalla.js';
import { TTransform } from './js/TTransform.js';

/** @type {mat4} glMatrix.ARRAY_TYPE(16)*/
const mat4 = glMatrix.mat4;
/** @type {mat4} glMatrix.ARRAY_TYPE(9)*/
const mat3 = glMatrix.mat3;
/** @type {vec3} glMatrix.ARRAY_TYPE(3)*/
const vec3 = glMatrix.vec3;

var raiz = new TMotorTAG(); // Variable global de Javi
console.log(raiz);

let aux = mat4.identity(mat4.create());
GLOBAL.matriz = aux;


//LUZ 1
//rotacion-l1
var rl1 = raiz.crearTransform();
raiz.crearNodo(raiz._escena, rl1, "rotacion-l1")
//traslacion-l1
var tl1 = raiz.crearTransform();
raiz.crearNodo(raiz._escena.getHijo(0), tl1, "traslacion-l1");
//escalado-l1
var el1 = raiz.crearTransform();
raiz.crearNodo(raiz._escena.getHijo(0).getHijo(0), el1, "escalado-l1");
//luz1
var l1 = raiz.crearLuz();
raiz.crearNodo(raiz._escena.getHijo(0).getHijo(0).getHijo(0), l1, "luz-1");

//CAMARA 1
//rotacion-c1
var rc1 = raiz.crearTransform();
raiz.crearNodo(raiz._escena, rc1, "rotacion-c1")
//traslacion-c1
var tc1 = raiz.crearTransform();
raiz.crearNodo(raiz._escena.getHijo(1), tc1, "traslacion-c1");
//escalado-c1
var ec1 = raiz.crearTransform();
raiz.crearNodo(raiz._escena.getHijo(1).getHijo(0), ec1, "escalado-c1");
//camara1
var c1 = raiz.crearCamara();
raiz.crearNodo(raiz._escena.getHijo(1).getHijo(0).getHijo(0), c1, "camara-1");

//PERSONA 1
//rotacion-p1
var rp1 = raiz.crearTransform();
raiz.crearNodo(raiz._escena, rp1, "rotacion-p1");
rp1.rotar(1, 1, 1, 1);
//traslacion-p1
var tp1 = raiz.crearTransform();
raiz.crearNodo(raiz._escena.getHijo(2), tp1, "traslacion-p1");
tp1.trasladar(0.1, 0, 0);
//escalado-p1
var ep1 = raiz.crearTransform();
raiz.crearNodo(raiz._escena.getHijo(2).getHijo(0), ep1, "escalado-p1");
ep1.escalar(0.8, 0.8, 0.8);
//malla-p1
var mp1 = raiz.crearMalla('female-croupier-2013-03-26');
raiz.crearNodo(raiz._escena.getHijo(2).getHijo(0).getHijo(0), mp1, "malla-p1");

console.log(raiz._escena);

GLOBAL.canvas = document.getElementById("glcanvas");

try {
  // Tratar de tomar el contexto estandar. Si falla, retornar al experimental.
  GLOBAL.gl = GLOBAL.canvas.getContext("webgl") || GLOBAL.canvas.getContext("experimental-webgl");
}
catch (e) { }

// Si no tenemos ningun contexto GL.
if (!GLOBAL.gl) {
  alert("Imposible inicializar WebGL. Tu navegador puede no soportarlo.");
  GLOBAL.gl = null;
}

// Solo continuar si WebGL esta disponible y trabajando
function resizeCanvas() {
  var width = GLOBAL.canvas.clientWidth;
  var height = GLOBAL.canvas.clientHeight;
  if (GLOBAL.canvas.width != width ||
    GLOBAL.canvas.height != height) {
    GLOBAL.canvas.width = width;
    GLOBAL.canvas.height = height;
  }
}


window.addEventListener('resize', resizeCanvas);

document.getElementById("draw").onclick = () => {
  if (raiz == null) {
    console.log("no hay ningun nodo");;
  } else {
    console.log(raiz);
    raiz.draw();
  }

};
document.getElementById("niu").onclick = () => {
  if (raiz == null || raiz.getHijos().length == 0) {
    console.log("no hay raiz o hijos en la raiz");;
  } else {
    let auxHijos = raiz.getHijos();
    var i = 0
    for (i; i < auxHijos.length - 1; i++) {
    }
    let auxEntidad = raiz.getHijo(i).entidad;
    console.log(auxEntidad);
    let auxHijo = new TNodo();
    auxHijo.entidad = auxEntidad;
    raiz.addHijo(auxHijo);

    // raiz.remHijo(auxHijos[i]);
  }
};
