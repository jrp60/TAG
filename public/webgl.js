//===== Comments =============================================
//=  - El principal archivo donde se manejará el motor gráfico
//===== Changelog ============================================
//=  - 0.1 Primera version
//=  - 0.2 Arbol de la escena [David]
//=  - 02/16 - Reordenar para dejarlo todo mas claro y pila [David]
//=  - 02/17 - Funciones para montar un arbol(probar nodos y entidad transform y sus metodos) [Javi]
//=  - 02/16 - Montando nuestro arbol de la escena [Javi]

import { Datos } from './js/Datos.js';
import { TEntidad } from './js/TEntidad.js';
import { TCamara } from './js/TCamara.js';
import { TColor } from './js/TColor.js';
import { TFichero } from './js/TFichero.js';
import { TGestorRecursos } from './js/TGestorRecursos.js';
import { TLuz } from './js/TLuz.js';
import { TMalla } from './js/TMalla.js';
import { TMotorTag } from './js/TMotorTAG.js';
import { TNodo } from './js/TNodo.js';
import { TRecurso } from './js/TRecurso.js';
import { TRecursoMalla } from './js/TRecursoMalla.js';
import { TTransform } from './js/TTransform.js';

var gl = null; // Un variable global para el contexto WebGL
var raiz; // Variable global de Javi

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


console.log(raiz);
if (raiz==null) {
  console.log("hola mundo 2");
    raiz=new TNodo("raiz");
    console.log(raiz);
}

//PERSONA 1
//Nodo  TTransform rotacion 1
var r1;
var n1;
console.log("transform");
r1=new TTransform();
r1.identidad();
//auxEntidad.trasladar(1,2,3);
n1=new TNodo("n1");
n1.entidad=r1;
n1.addPadre(raiz);
raiz.addHijo(n1);
console.log("caracola");
console.log(raiz);
//Nodo  TTransform traslacion 1
var t1;
var n2;
console.log("transform");
t1=new TTransform();
t1.identidad();
//auxEntidad.trasladar(1,2,3);
n2=new TNodo("n2");
n2.entidad=t1;
n2.addPadre(n1);
n1.addHijo(n2);
console.log("caracola 2");
console.log(raiz);
//Nodo  TTransform escalado 1
var e1;
var n3;
console.log("transform");
e1=new TTransform();
e1.identidad();
//auxEntidad.trasladar(1,2,3);
n3=new TNodo("n3");
n3.entidad=e1;
n3.addPadre(n2);
n2.addHijo(n3);
console.log("caracola 2");
console.log(raiz);
//Nodo  TMalla  1
var m1;
var n4;
console.log("malla");
m1=new TMalla();
//m1.identidad();
//auxEntidad.trasladar(1,2,3);
n4=new TNodo("n4");
n4.entidad=m1;
n4.addPadre(n3);
n3.addHijo(n4);
console.log("caracola 2");
console.log(raiz);

//PERSONA 2
//Nodo  TTransform rotacion 2
var r2;
var n5;
console.log("transform");
r2=new TTransform();
r2.identidad();
//auxEntidad.trasladar(1,2,3);
n5=new TNodo("n5");
n5.entidad=r2;
n5.addPadre(raiz);
raiz.addHijo(n5);
console.log("caracola");
console.log(raiz);
//Nodo  TTransform traslacion 2
var t2;
var n6;
console.log("transform");
t2=new TTransform();
t2.identidad();
//auxEntidad.trasladar(1,2,3);
n6=new TNodo("n6");
n6.entidad=t2;
n6.addPadre(n5);
n5.addHijo(n6);
console.log("caracola 2");
console.log(raiz);
//Nodo  TTransform escalado 2
var e2;
var n7;
console.log("transform");
e2=new TTransform();
e2.identidad();
//auxEntidad.trasladar(1,2,3);
n7=new TNodo("n7");
n7.entidad=e2;
n7.addPadre(n6);
n6.addHijo(n7);
console.log("caracola 2");
console.log(raiz);
//Nodo  TMalla  1
var m2;
var n8;
console.log("malla");
m2=new TMalla();
//m1.identidad();
//auxEntidad.trasladar(1,2,3);
n8=new TNodo("n8");
n8.entidad=m2;
n8.addPadre(n7);
n7.addHijo(n8);
console.log("caracola 2");
console.log(raiz);
 //PERSONA 3
 //PERSONA 4
 //PERSONA 5

//LUZ 1
//Nodo  TTransform rotacion 6
var r6;
var n21;
console.log("transform");
r6=new TTransform();
r6.identidad();
//auxEntidad.trasladar(1,2,3);
n21=new TNodo("n21");
n21.entidad=r6;
n21.addPadre(raiz);
raiz.addHijo(n21);
console.log("caracola");
console.log(raiz);
//Nodo  TTransform traslacion 2
var t6;
var n22;
console.log("transform");
t6=new TTransform();
t6.identidad();
//auxEntidad.trasladar(1,2,3);
n22=new TNodo("n22");
n22.entidad=t6;
n22.addPadre(n21);
n21.addHijo(n22);
console.log("caracola 2");
console.log(raiz);
//Nodo  TTransform escalado 2
var e6;
var n23;
console.log("transform");
e6=new TTransform();
e6.identidad();
//auxEntidad.trasladar(1,2,3);
n23=new TNodo("n23");
n23.entidad=e6;
n23.addPadre(n22);
n22.addHijo(n23);
console.log("caracola 2");
console.log(raiz);
//Nodo  TMalla  1
var m6;
var n24;
console.log("malla");
m6=new TMalla();
//m1.identidad();
//auxEntidad.trasladar(1,2,3);
n24=new TNodo("n24");
n24.entidad=m6;
n24.addPadre(n23);
n23.addHijo(n24);
console.log("caracola 2");
console.log(raiz);

//CAMARA 1
//Nodo  TTransform rotacion 7
var r7;
var n25;
console.log("transform");
r7=new TTransform();
r7.identidad();
//auxEntidad.trasladar(1,2,3);
n25=new TNodo("n25");
n25.entidad=r7;
n25.addPadre(raiz);
raiz.addHijo(n25);
console.log("caracola");
console.log(raiz);
//Nodo  TTransform traslacion 2
var t7;
var n26;
console.log("transform");
t7=new TTransform();
t7.identidad();
//auxEntidad.trasladar(1,2,3);
n26=new TNodo("n26");
n26.entidad=t7;
n26.addPadre(n25);
n25.addHijo(n26);
console.log("caracola 2");
console.log(raiz);
//Nodo  TTransform escalado 2
var e7;
var n27;
console.log("transform");
e7=new TTransform();
e7.identidad();
//auxEntidad.trasladar(1,2,3);
n27=new TNodo("n27");
n27.entidad=e7;
n27.addPadre(n26);
n26.addHijo(n27);
console.log("caracola 2");
console.log(raiz);
//Nodo  TMalla  1
var m8;
var n28;
console.log("malla");
m8=new TMalla();
//m1.identidad();
//auxEntidad.trasladar(1,2,3);
n28=new TNodo("n28");
n28.entidad=m8;
n28.addPadre(n27);
n27.addHijo(n28);
console.log("caracola 2");
console.log(raiz);





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
   gl.clearColor(0.0, 0.0, 0.0, 1.0);                      // Establecer el color base en negro, totalmente opaco
   gl.enable(gl.DEPTH_TEST);                               // Habilitar prueba de profundidad
   gl.depthFunc(gl.LEQUAL);                                // Objetos cercanos opacan objetos lejanos
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);    // Limpiar el buffer de color asi como el de profundidad

   //===== NOTA =============================================
   //=  - El siguiente código es para que Javi sepa como funciona.
   //===== NOTA =============================================
   console.log(Datos.pushPila('Prueba'));
   console.log(Datos.pushPila('Prueba2'));
   console.log(Datos.popPila());
   const motor = new TMotorTag();
   motor.pruebaDatos();
}

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
//       console.log("transform");
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
      if (raiz==null) {
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



//===== ADVERTENCIA =============================================
//=  - A partir de aquí es código de referencia de como lo hace
//=  otra librería, no tiene nada que ver con el proyecto.
//===== ADVERTENCIA =============================================

if (!Detector.webgl) {
   Detector.addGetWebGLMessage();
}
//
// var container;
//
// var camera, controls, scene, renderer;
// var lighting, ambient, keyLight, fillLight, backLight;
//
// init();
// animate();
//
// function init() {
//    container = document.createElement('div');
//    document.body.appendChild(container);
//
//    /* Camera */
//    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
//    camera.position.z = 3;
//
//    /* Scene */
//    scene = new THREE.Scene();
//    lighting = false;
//    ambient = new THREE.AmbientLight(0xffffff, 1.0);
//    scene.add(ambient);
//    keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
//    keyLight.position.set(-100, 0, 100);
//    fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
//    fillLight.position.set(100, 0, 100);
//    backLight = new THREE.DirectionalLight(0xffffff, 1.0);
//    backLight.position.set(100, 0, -100).normalize();
//
//    /* Model */
//    var mtlLoader = new THREE.MTLLoader();
//    mtlLoader.setBaseUrl('model/');
//    mtlLoader.setPath('model/');
//    mtlLoader.load('female-croupier-2013-03-26.mtl', function (materials) {
//       materials.preload();
//       materials.materials.default.map.magFilter = THREE.NearestFilter;
//       materials.materials.default.map.minFilter = THREE.LinearFilter;
//       var objLoader = new THREE.OBJLoader();
//       objLoader.setMaterials(materials);
//       objLoader.setPath('model/');
//       objLoader.load('female-croupier-2013-03-26.obj', function (object) {
//          scene.add(object);
//       });
//    });
//
//    /* Renderer */
//    renderer = new THREE.WebGLRenderer();
//    renderer.setPixelRatio(window.devicePixelRatio);
//    renderer.setSize(window.innerWidth, window.innerHeight);
//    renderer.setClearColor(new THREE.Color("hsl(0, 0%, 10%)"));
//    container.appendChild(renderer.domElement);
//
//    /* Controls */
//    controls = new THREE.OrbitControls(camera, renderer.domElement);
//    controls.enableDamping = true;
//    controls.dampingFactor = 0.25;
//    controls.enableZoom = false;
//
//    /* Events */
//    window.addEventListener('resize', onWindowResize, false);
//    window.addEventListener('keydown', onKeyboardEvent, false);
// }
//
// function onWindowResize() {
//    camera.aspect = window.innerWidth / window.innerHeight;
//    camera.updateProjectionMatrix();
//    renderer.setSize(window.innerWidth, window.innerHeight);
// }
//
// function onKeyboardEvent(e) {
//    if (e.code === 'KeyL') {
//       lighting = !lighting;
//       if (lighting) {
//          ambient.intensity = 0.25;
//          scene.add(keyLight);
//          scene.add(fillLight);
//          scene.add(backLight);
//       } else {
//          ambient.intensity = 1.0;
//          scene.remove(keyLight);
//          scene.remove(fillLight);
//          scene.remove(backLight);
//       }
//    }
// }

function animate() {
   requestAnimationFrame(animate);
   controls.update();
   render();
}

function render() {
   renderer.render(scene, camera);
}
