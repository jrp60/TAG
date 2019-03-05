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

import { Datos } from './js/Datos.js';
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

var gl = null; // Un variable global para el contexto WebGL
var raiz = new TMotorTAG; // Variable global de Javi
console.log(raiz);

//===== David Liqiu Hu =======================================
//= Tutorial WebGL
//===== Version ==============================================
//= 0.9
//===== Compatible With ======================================
//= x64, version x86 explicada por encima.
//===== Description ==========================================
//= Es un tutorial de WebGL para empezar a entender como
//= se crea un proyecto.
//===== Comments =============================================
//=  -
//===== Changelog ============================================
//= Phase 0: Poner la base que el profesor nos da en los seminarios.
//=  - 0.1 Primera version
//=  - 0.2 Arbol de la escena [David]
//= Phase 1: Revisar todo y realizar modificaciones conforme.
//= Phase 2: Primer motor stable.
//===== Tutorial =============================================

let aux = mat4.identity(mat4.create());
Datos.setmatriz(aux);




//LUZ 1
//rotacion-l1
var rl1=raiz.crearTransform();
raiz.crearNodo(raiz._escena, rl1, "rotacion-l1" )
//traslacion-l1
var tl1=raiz.crearTransform();
raiz.crearNodo(raiz._escena.getHijo(0), tl1, "traslacion-l1");
//escalado-l1
var el1=raiz.crearTransform();
raiz.crearNodo(raiz._escena.getHijo(0).getHijo(0), el1, "escalado-l1");
//luz1
var l1=raiz.crearLuz();
raiz.crearNodo(raiz._escena.getHijo(0).getHijo(0).getHijo(0), l1, "luz-1");

//CAMARA 1
//rotacion-c1
var rc1=raiz.crearTransform();
raiz.crearNodo(raiz._escena, rc1, "rotacion-c1" )
//traslacion-c1
var tc1=raiz.crearTransform();
raiz.crearNodo(raiz._escena.getHijo(1), tc1, "traslacion-c1");
//escalado-c1
var ec1=raiz.crearTransform();
raiz.crearNodo(raiz._escena.getHijo(1).getHijo(0), ec1, "escalado-c1");
//camara1
var c1=raiz.crearCamara();
raiz.crearNodo(raiz._escena.getHijo(1).getHijo(0).getHijo(0), c1, "camara-1");

//PERSONA 1
//rotacion-p1
var rp1=raiz.crearTransform();
raiz.crearNodo(raiz._escena, rp1, "rotacion-p1" )
//traslacion-p1
var tp1=raiz.crearTransform();
raiz.crearNodo(raiz._escena.getHijo(2), tp1, "traslacion-p1");
//escalado-p1
var ep1=raiz.crearTransform();
raiz.crearNodo(raiz._escena.getHijo(2).getHijo(0), ep1, "escalado-p1");
//malla-p1
var mp1=raiz.crearMalla('female-croupier-2013-03-26');
raiz.crearNodo(raiz._escena.getHijo(2).getHijo(0).getHijo(0), mp1, "malla-p1");

console.log(raiz._escena);


//
// //PERSONA 1
// //Nodo  TTransform rotacion 1
// var r1;
// var n1;
//
// r1 = new TTransform();
// r1.identidad();
// //auxEntidad.trasladar(1,2,3);
// n1 = new TNodo("n1-TTransofrm");
// n1.entidad = r1;
// n1.addPadre(raiz);
// raiz.addHijo(n1);
// //Nodo  TTransform traslacion 1
// var t1;
// var n2;
// t1 = new TTransform();
// t1.identidad();
// //auxEntidad.trasladar(1,2,3);
// n2 = new TNodo("n2-TTransofrm");
// n2.entidad = t1;
// n2.addPadre(n1);
// n1.addHijo(n2);
// //Nodo  TTransform escalado 1
// var e1;
// var n3;
//
// e1 = new TTransform();
// e1.identidad();
// //auxEntidad.trasladar(1,2,3);
// n3 = new TNodo("n3-TTransofrm");
// n3.entidad = e1;
// n3.addPadre(n2);
// n2.addHijo(n3);
// //Nodo  TMalla  1
// var m1;
// var n4;
// m1 = new TMalla();
// m1.cargarMalla('female-croupier-2013-03-26');
// //m1.identidad();
// //auxEntidad.trasladar(1,2,3);
// n4 = new TNodo("n4-TMalla");
// n4.entidad = m1;
// n4.addPadre(n3);
// n3.addHijo(n4);
//
// //PERSONA 2
// //Nodo  TTransform rotacion 2
// var r2;
// var n5;
//
// r2 = new TTransform();
// r2.identidad();
// //auxEntidad.trasladar(1,2,3);
// n5 = new TNodo("n5-TTransofrm");
// n5.entidad = r2;
// n5.addPadre(raiz);
// raiz.addHijo(n5);
// //Nodo  TTransform traslacion 2
// var t2;
// var n6;
//
// t2 = new TTransform();
// t2.identidad();
// //auxEntidad.trasladar(1,2,3);
// n6 = new TNodo("n6-TTransofrm");
// n6.entidad = t2;
// n6.addPadre(n5);
// n5.addHijo(n6);
// //Nodo  TTransform escalado 2
// var e2;
// var n7;
// e2 = new TTransform();
// e2.identidad();
// //auxEntidad.trasladar(1,2,3);
// n7 = new TNodo("n7-TTransofrm");
// n7.entidad = e2;
// n7.addPadre(n6);
// n6.addHijo(n7);
// //Nodo  TMalla  1
// var m2;
// var n8;
// m2 = new TMalla();
// //m1.identidad();
// //auxEntidad.trasladar(1,2,3);
// n8 = new TNodo("n8-TMalla");
// n8.entidad = m2;
// n8.addPadre(n7);
// n7.addHijo(n8);
// //PERSONA 3
// //PERSONA 4
// //PERSONA 5
//
// //LUZ 1
// //Nodo  TTransform rotacion 6
// var r6;
// var n21;
// r6 = new TTransform();
// r6.identidad();
// //auxEntidad.trasladar(1,2,3);
// n21 = new TNodo("n21-TTransofrm");
// n21.entidad = r6;
// n21.addPadre(raiz);
// raiz.addHijo(n21);
// //Nodo  TTransform traslacion 2
// var t6;
// var n22;
// t6 = new TTransform();
// t6.identidad();
// //auxEntidad.trasladar(1,2,3);
// n22 = new TNodo("n22-TTransofrm");
// n22.entidad = t6;
// n22.addPadre(n21);
// n21.addHijo(n22);
// //Nodo  TTransform escalado 2
// var e6;
// var n23;
// e6 = new TTransform();
// e6.identidad();
// //auxEntidad.trasladar(1,2,3);
// n23 = new TNodo("n23-TTransofrm");
// n23.entidad = e6;
// n23.addPadre(n22);
// n22.addHijo(n23);
// //Nodo  TMalla  1
// var m6;
// var n24;
//
// //m1.identidad();
// //auxEntidad.trasladar(1,2,3);
// n24 = new TNodo("n24-TLuz");
// n24.addPadre(n23);
// n23.addHijo(n24);
//
// //CAMARA 1
// //Nodo  TTransform rotacion 7
// var r7;
// var n25;
// r7 = new TTransform();
// r7.identidad();
// //auxEntidad.trasladar(1,2,3);
// n25 = new TNodo("n25-TTransofrm");
// n25.entidad = r7;
// n25.addPadre(raiz);
// raiz.addHijo(n25);
// //Nodo  TTransform traslacion 2
// var t7;
// var n26;
// t7 = new TTransform();
// t7.identidad();
// //auxEntidad.trasladar(1,2,3);
// n26 = new TNodo("n26-TTransofrm");
// n26.entidad = t7;
// n26.addPadre(n25);
// n25.addHijo(n26);
// //Nodo  TTransform escalado 2
// var e7;
// var n27;
// e7 = new TTransform();
// e7.identidad();
// //auxEntidad.trasladar(1,2,3);
// n27 = new TNodo("n27-TTransofrm");
// n27.entidad = e7;
// n27.addPadre(n26);
// n26.addHijo(n27);
// //Nodo  TMalla  1
// var m8;
// var n28;
// m8 = new TCamara();
// //m1.identidad();
// //auxEntidad.trasladar(1,2,3);
// n28 = new TNodo("n28-TCamara");
// n28.entidad = m8;
// n28.addPadre(n27);
// n27.addHijo(n28);
// console.log(raiz);


const canvas = document.getElementById("glcanvas");

try {
  // Tratar de tomar el contexto estandar. Si falla, retornar al experimental.
  gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
}
catch (e) { }

// Si no tenemos ningun contexto GL.
if (!gl) {
  alert("Imposible inicializar WebGL. Tu navegador puede no soportarlo.");
  gl = null;
}
// Solo continuar si WebGL esta disponible y trabajando
if (gl) {
  // gl.clearColor(0.0, 0.0, 0.0, 1.0);                      // Establecer el color base en negro, totalmente opaco
  // gl.enable(gl.DEPTH_TEST);                               // Habilitar prueba de profundidad
  // gl.depthFunc(gl.LEQUAL);                                // Objetos cercanos opacan objetos lejanos
  // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);    // Limpiar el buffer de color asi como el de profundidad

  //===== NOTA =============================================
  //=  - El siguiente código es para que Javi sepa como funciona la pila
  //===== NOTA =============================================
  console.error('// Cómo funciona la pila');
  console.log(Datos.pushPila('Prueba'));
  console.log(Datos.pushPila('Prueba2'));
  console.log(Datos.popPila());
  const motor = new TMotorTag();
  motor.pruebaDatos();
}


//===== NOTA =============================================
//=  - El siguiente código es para que Javi vea como
//=  funciona el gestor de recursos
//===== NOTA =============================================

// Preparar WebGL
gl.viewport(0, 0, canvas.width, canvas.height);
gl.enable(gl.DEPTH_TEST);
gl.enable(gl.CULL_FACE);
gl.cullFace(gl.BACK);
gl.clearColor(0.0, 0.0, 0.0, 0.0);


// Linkear vertex y fragment
import { Vertex, Fragment } from './js/Shaders.js';

var vs = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vs, Vertex);
gl.compileShader(vs);

var fs = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fs, Fragment);
gl.compileShader(fs);

var program = gl.createProgram();
gl.attachShader(program, vs);
gl.attachShader(program, fs);
gl.linkProgram(program);
gl.useProgram(program);

Datos.gl = gl;

function resizeCanvas() {
  var width = canvas.clientWidth;
  var height = canvas.clientHeight;
  if (canvas.width != width ||
    canvas.height != height) {
    canvas.width = width;
    canvas.height = height;
  }
}


window.addEventListener('resize', resizeCanvas);
// Gestor de recursos

// grecursos.getRecurso('female-croupier-2013-03-26').then(res => {
//   console.log(res);
// });
// grecursos.getRecurso('female-croupier-2013-03-2').then(res => {
//   console.log(res);
// });
// grecursos.getRecurso('female-croupier-2013-03-26').then(res => {
//   console.log(res);
// });

//
// document.getElementById("arbol").onclick = () => {
//   if (raiz==null) {
//     console.log("hola mundo 2");
//       raiz=new TNodo();
//       console.log(raiz);
//   }
//   else {
//     console.log("raiz ya creada");
//     console.log(raiz);
//   }
//
// };
//
//   document.getElementById("hijo").onclick = () => {
//     console.log("hola hijo");
//     let tipoEntidad = document.getElementsByName("tipo")[0].value;
//     let auxHijo=new TNodo();
//     let auxEntidad=null;
//
//     console.log(tipoEntidad);
//
//     if (tipoEntidad==0) {
//
//       auxEntidad=new TTransform();
//       auxEntidad.identidad();
//       auxEntidad.trasladar(1,2,3);
//     }
//     else if (tipoEntidad==1) {
//       console.log("luz");
//       auxEntidad=new TLuz();
//       let auxColor=new TColor();
//       auxEntidad.setIntensidad(auxColor);
//       auxEntidad.setPosicion(11,2,5);
//       console.log(auxEntidad);
//     }
//     else if (tipoEntidad==2) {
//       console.log("camara");
//       auxEntidad=new TCamara();
//     }
//     else if (tipoEntidad==3) {
//       console.log("malla");
//       auxEntidad=new TMalla();
//     }
//
//     //auxHijo.entidad(auxEntidad);
//     auxHijo.entidad=auxEntidad;
//     console.log(auxHijo);
//     raiz.addHijo(auxHijo);
//
//     console.log(raiz);
//     // var elHijo = document.createElement("div");
//     // document.getElementById('nodos').innerHTML = raiz;
//     };
//
//     document.getElementById("elimina").onclick = () => {
//       if (raiz==null || raiz.getHijos().length==0) {
//         console.log("no hay raiz o hijos en la raiz");;
//       }
//       else {
//         let auxHijos=raiz.getHijos();
//         var i = 0
//         for (i ; i < auxHijos.length-1; i++) {
//         }
//         raiz.remHijo(auxHijos[i]);
//       }
//     };
//
document.getElementById("draw").onclick = () => {
  if (raiz == null) {
    console.log("no hay ningun nodo");;
  }
  else {
    raiz.draw();
  }

};
//     document.getElementById("niu").onclick = () => {
//       if (raiz==null || raiz.getHijos().length==0) {
//         console.log("no hay raiz o hijos en la raiz");;
//       }
//       else {
//         let auxHijos=raiz.getHijos();
//         var i = 0
//         for (i ; i < auxHijos.length-1; i++) {
//         }
//         let auxEntidad= raiz.getHijo(i).entidad;
//         console.log(auxEntidad);
//         let auxHijo=new TNodo();
//         auxHijo.entidad=auxEntidad;
//         raiz.addHijo(auxHijo);
//
//         // raiz.remHijo(auxHijos[i]);
//       }
//     };
//


// document.getElementById("desplazaElimina").onclick = () => {
//   let generacion = document.getElementsByName("generacion")[0].value;
//   let numeroHijo = document.getElementsByName("numeroHijo")[0].value;
//   console.log(generacion);
//   console.log(numeroHijo);
//   if (raiz!=null) {
//     let hijosActual= raiz.getHijos();
//     for (var i = 0; i < generacion; i++) {
//       hijosActual=
//     }
//   }
//
//
// };

function initWebGL(canvas) {
  console.log("hola mundo");
  gl = null;

}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();
}

function render2() {
  renderer.render(scene, camera);
}
