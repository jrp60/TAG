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

var gl; // Un variable global para el contexto WebGL
console.log("hola mundo");
const canvas = document.getElementById("glcanvas");

gl = initWebGL(canvas);      // Inicializar el contexto GL

// Solo continuar si WebGL esta disponible y trabajando
if (gl) {
   gl.clearColor(0.0, 0.0, 0.0, 1.0);                      // Establecer el color base en negro, totalmente opaco
   gl.enable(gl.DEPTH_TEST);                               // Habilitar prueba de profundidad
   gl.depthFunc(gl.LEQUAL);                                // Objetos cercanos opacan objetos lejanos
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);    // Limpiar el buffer de color asi como el de profundidad
}

console.log("hola mundo");

document.getElementById("arbol").onclick = () => {
  console.log("hola mundo 2");
    raiz=new TNode();
    console.log(raiz);
  };

  document.getElementById("hijo").onclick = (tipoEntidad) => {
    console.log("hola hijo");
    auxHijo=new TNode();
    if (tipoEntidad==0) {
          auxEntidad=new TTransform();
    }
    else if (tipoEntidad==1) {
          auxEntidad=new TLuz();
    }
    else if (tipoEntidad==2) {
          auxEntidad=new TCamara();
    }
    else if (tipoEntidad==3) {
          auxEntidad=new TMalla();
    }
    auxHijo.setEntidad(auxEntidad);
      raiz.addHijo(auxHijo);

      console.log(raiz);
    };


function initWebGL(canvas) {
  console.log("hola mundo");
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

if (!Detector.webgl) {
   Detector.addGetWebGLMessage();
}

var container;

var camera, controls, scene, renderer;
var lighting, ambient, keyLight, fillLight, backLight;

init();
animate();

function init() {
  console.log("hola mundo");

   container = document.createElement('div');
   document.body.appendChild(container);

   /* Camera */

   camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
   camera.position.z = 3;

   /* Scene */

   scene = new THREE.Scene();
   lighting = false;

   ambient = new THREE.AmbientLight(0xffffff, 1.0);
   scene.add(ambient);

   keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
   keyLight.position.set(-100, 0, 100);

   fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
   fillLight.position.set(100, 0, 100);

   backLight = new THREE.DirectionalLight(0xffffff, 1.0);
   backLight.position.set(100, 0, -100).normalize();

   /* Model */

   var mtlLoader = new THREE.MTLLoader();
   mtlLoader.setBaseUrl('model/');
   mtlLoader.setPath('model/');
   mtlLoader.load('female-croupier-2013-03-26.mtl', function (materials) {

      materials.preload();

      materials.materials.default.map.magFilter = THREE.NearestFilter;
      materials.materials.default.map.minFilter = THREE.LinearFilter;

      var objLoader = new THREE.OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath('model/');
      objLoader.load('female-croupier-2013-03-26.obj', function (object) {

         scene.add(object);

      });

   });

   /* Renderer */

   renderer = new THREE.WebGLRenderer();
   renderer.setPixelRatio(window.devicePixelRatio);
   renderer.setSize(window.innerWidth, window.innerHeight);
   renderer.setClearColor(new THREE.Color("hsl(0, 0%, 10%)"));

   container.appendChild(renderer.domElement);

   /* Controls */

   controls = new THREE.OrbitControls(camera, renderer.domElement);
   controls.enableDamping = true;
   controls.dampingFactor = 0.25;
   controls.enableZoom = false;

   /* Events */

   window.addEventListener('resize', onWindowResize, false);
   window.addEventListener('keydown', onKeyboardEvent, false);

}

function onWindowResize() {

   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();

   renderer.setSize(window.innerWidth, window.innerHeight);

}

function onKeyboardEvent(e) {

   if (e.code === 'KeyL') {

      lighting = !lighting;

      if (lighting) {

         ambient.intensity = 0.25;
         scene.add(keyLight);
         scene.add(fillLight);
         scene.add(backLight);

      } else {

         ambient.intensity = 1.0;
         scene.remove(keyLight);
         scene.remove(fillLight);
         scene.remove(backLight);

      }

   }

}

function animate() {

   requestAnimationFrame(animate);

   controls.update();

   render();

}

function render() {

   renderer.render(scene, camera);

}
