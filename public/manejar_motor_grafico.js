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

/** * glMatrix.ARRAY_TYPE(3) * @type {vec3} **/
const vec3 = glMatrix.vec3;

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
GLOBAL.gl.clearColor(0.5, 0.8, 0.8, 0.9); // Cambia el fondo del canvas.
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



const raiz = new TMotorTAG(); // Variable global de Javi
const personas = [];
var inhabilitar = true;
var cam1hecha = false;
var cam2hecha = false;

// Boton para imprimir arbol
document.getElementById("imprimir").onclick = () => {
  if (raiz === null) {
    console.error("[ERROR] No existe el nodo Raiz");
  } else {
    raiz.imprimir(); // Con esto se puede visualizar el arbol
  }
};


// Boton para que el motor dibuje.
document.getElementById("draw").onclick = () => {
  if (raiz == null) {
    console.error("[ERROR] No existe el nodo Raiz");
  }
  else if (inhabilitar == true) {
    console.error("[ERROR] Establece un numero de personas entre 1 y 5");
  } else {
    raiz.draw();
  }
};


// ======================================================================
// =========================    Código motor    =========================

window.onload = () => {

  document.getElementById("enviar").onclick = () => {
    personas.length = 0; // No reinicia exactamente el array, pero hace que empiece desde el 0.
    const personas_aux = document.getElementsByTagName("article");
    for (const dom of personas_aux) {
      const datos = dom.children;
      const options = datos[2].options;
      const i_mat = options.selectedIndex;
      const persona = new Persona(datos[0].value, datos[1].value, options[i_mat].value);
      personas.push(persona);

      if (cam1hecha == false) {
        const base = document.getElementById("imprimir");
        const base_copy = base.cloneNode(true);
        base_copy.id = "camara1";
        base_copy.textContent = "Cámara 1";
        document.getElementById("javi").appendChild(base_copy);
        cam1hecha = true;
      }

      if (cam2hecha == false) {
        const base = document.getElementById("imprimir");
        const base_copy = base.cloneNode(true);
        base_copy.id = "camara2";
        base_copy.textContent = "Cámara 2";
        document.getElementById("javi").appendChild(base_copy);
        cam2hecha = true;
      }
    }

    raiz.limpiaRaiz();
    //creo que tengo que hacer aqui el arbol, al menos la parte de las mallas, probar con un if con personas. length

    switch (personas.length) {
      case 1:
        inhabilitar = false;
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
        raiz.crearNodo(escaladoL1, l1, "luz-1");

        raiz.setLuzActiva(l1);
        raiz.setIntensidadRGB(l1, 20, 20, 15);
        //var vecAux= vec3.fromValues(1, 185, 160);
        var vecAux = vec3.fromValues(30, 20, 60);
        raiz.setIntensidadVector(l1, vecAux);
        // console.log("VEMOS LA LUZ");
        // console.log(l1);
        // console.log("FIN LOG LUZ");

        //CAMARA 1
        //rotacion-c1
        var rc1 = raiz.crearTransform();
        rc1.rotar(0, 1, 0, 1)
        rc1.rotar(1, 0, 0, -40)
        var rotacionC1 = raiz.crearNodo(raiz.escena, rc1, "rotacionC1");
        //traslacion-c1
        var tc1 = raiz.crearTransform();
        tc1.trasladar(7, 7, 12);
        var traslacionC1 = raiz.crearNodo(rotacionC1, tc1, "traslacionC1");
        //escalado-c1
        var ec1 = raiz.crearTransform();
        var escaladoC1 = raiz.crearNodo(traslacionC1, ec1, "escaladoC1");
        //camara1
        var c1 = raiz.crearCamara("camara-1");
        raiz.crearNodo(escaladoC1, c1, "camara-1");
        // console.log(camara.entidad);
        // console.log(c1);
        // console.log(camara1);
        raiz.iniciarCamara(c1, 0.1, 100, 600, 0, 800, 0);
        raiz.setPerspectiva(c1);
        raiz.setCamaraActiva(c1); //establecemos la camara activa
        // console.log("Camara despues de iniciar");
        // console.log(c1);

        //CAMARA 2
        //rotacion-c2
        var rc2 = raiz.crearTransform();
        rc2.rotar(0, 1, 0, 1)
        var rotacionC2 = raiz.crearNodo(raiz.escena, rc2, "rotacionC2");
        //traslacion-c1
        var tc2 = raiz.crearTransform();
        tc2.trasladar(0, 0, 5);
        var traslacionC2 = raiz.crearNodo(rotacionC2, tc2, "traslacionC2");
        //escalado-c1
        var ec2 = raiz.crearTransform();
        var escaladoC2 = raiz.crearNodo(traslacionC2, ec2, "escaladoC2");
        //camara1
        var c2 = raiz.crearCamara("camara-2");
        raiz.crearNodo(escaladoC2, c2, "camara-2");
        // console.log(camara.entidad);

        raiz.iniciarCamara(c2, 1, 200, 600, 0, 800, 0);
        raiz.setPerspectiva(c2);
        raiz.setCamaraActiva(c2); //establecemos la camara activa
        //    raiz.setCamaraActiva(c1); //establecemos la camara activa


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
        raiz.crearNodo(escaladoP1, mp1, "mallaP1");

        break;


      case 2:
        inhabilitar = false;
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
        raiz.crearNodo(escaladoL1, l1, "luz-1");

        raiz.setLuzActiva(l1);
        raiz.setIntensidadRGB(l1, 20, 20, 15);
        //var vecAux= vec3.fromValues(1, 185, 160);
        var vecAux = vec3.fromValues(30, 20, 60);
        raiz.setIntensidadVector(l1, vecAux);
        // console.log("VEMOS LA LUZ");
        // console.log(l1);
        // console.log("FIN LOG LUZ");

        //CAMARA 1
        //rotacion-c1
        var rc1 = raiz.crearTransform();
        rc1.rotar(0, 1, 0, 1)
        rc1.rotar(1, 0, 0, -40)
        var rotacionC1 = raiz.crearNodo(raiz.escena, rc1, "rotacionC1");
        //traslacion-c1
        var tc1 = raiz.crearTransform();
        tc1.trasladar(7, 7, 12);
        var traslacionC1 = raiz.crearNodo(rotacionC1, tc1, "traslacionC1");
        //escalado-c1
        var ec1 = raiz.crearTransform();
        var escaladoC1 = raiz.crearNodo(traslacionC1, ec1, "escaladoC1");
        //camara1
        var c1 = raiz.crearCamara("camara-1");
        raiz.crearNodo(escaladoC1, c1, "camara-1");
        // console.log(camara.entidad);
        // console.log(c1);
        // console.log(camara1);
        raiz.iniciarCamara(c1, 0.1, 100, 600, 0, 800, 0);
        raiz.setPerspectiva(c1);
        raiz.setCamaraActiva(c1); //establecemos la camara activa
        // console.log("Camara despues de iniciar");
        // console.log(c1);

        //CAMARA 2
        //rotacion-c2
        var rc2 = raiz.crearTransform();
        rc2.rotar(0, 1, 0, 1)
        var rotacionC2 = raiz.crearNodo(raiz.escena, rc2, "rotacionC2");
        //traslacion-c1
        var tc2 = raiz.crearTransform();
        tc2.trasladar(0, 0, 5);
        var traslacionC2 = raiz.crearNodo(rotacionC2, tc2, "traslacionC2");
        //escalado-c1
        var ec2 = raiz.crearTransform();
        var escaladoC2 = raiz.crearNodo(traslacionC2, ec2, "escaladoC2");
        //camara1
        var c2 = raiz.crearCamara("camara-2");
        raiz.crearNodo(escaladoC2, c2, "camara-2");
        // console.log(camara.entidad);

        raiz.iniciarCamara(c2, 1, 200, 600, 0, 800, 0);
        raiz.setPerspectiva(c2);
        raiz.setCamaraActiva(c2); //establecemos la camara activa
        //    raiz.setCamaraActiva(c1); //establecemos la camara activa


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
        raiz.crearNodo(escaladoP1, mp1, "mallaP1");

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
        raiz.crearNodo(escaladoP2, mp2, "mallaP2");


        break;

      case 3:
        inhabilitar = false;
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
        raiz.crearNodo(escaladoL1, l1, "luz-1");

        raiz.setLuzActiva(l1);
        raiz.setIntensidadRGB(l1, 20, 20, 15);
        //var vecAux= vec3.fromValues(1, 185, 160);
        var vecAux = vec3.fromValues(30, 20, 60);
        raiz.setIntensidadVector(l1, vecAux);

        //CAMARA 1
        //rotacion-c1
        var rc1 = raiz.crearTransform();
        rc1.rotar(0, 1, 0, 1)
        rc1.rotar(1, 0, 0, -40)
        var rotacionC1 = raiz.crearNodo(raiz.escena, rc1, "rotacionC1");
        //traslacion-c1
        var tc1 = raiz.crearTransform();
        tc1.trasladar(7, 7, 12);
        var traslacionC1 = raiz.crearNodo(rotacionC1, tc1, "traslacionC1");
        //escalado-c1
        var ec1 = raiz.crearTransform();
        var escaladoC1 = raiz.crearNodo(traslacionC1, ec1, "escaladoC1");
        //camara1
        var c1 = raiz.crearCamara("camara-1");
        raiz.crearNodo(escaladoC1, c1, "camara-1");
        // console.log(camara.entidad);
        // console.log(c1);
        // console.log(camara1);
        raiz.iniciarCamara(c1, 0.1, 100, 600, 0, 800, 0);
        raiz.setPerspectiva(c1);
        raiz.setCamaraActiva(c1); //establecemos la camara activa
        // console.log("Camara despues de iniciar");
        // console.log(c1);

        //CAMARA 2
        //rotacion-c2
        var rc2 = raiz.crearTransform();
        rc2.rotar(0, 1, 0, 1)
        var rotacionC2 = raiz.crearNodo(raiz.escena, rc2, "rotacionC2");
        //traslacion-c1
        var tc2 = raiz.crearTransform();
        tc2.trasladar(0, 0, 5);
        var traslacionC2 = raiz.crearNodo(rotacionC2, tc2, "traslacionC2");
        //escalado-c1
        var ec2 = raiz.crearTransform();
        var escaladoC2 = raiz.crearNodo(traslacionC2, ec2, "escaladoC2");
        //camara1
        var c2 = raiz.crearCamara("camara-2");
        raiz.crearNodo(escaladoC2, c2, "camara-2");
        // console.log(camara.entidad);

        raiz.iniciarCamara(c2, 1, 200, 600, 0, 800, 0);
        raiz.setPerspectiva(c2);
        raiz.setCamaraActiva(c2); //establecemos la camara activa
        //    raiz.setCamaraActiva(c1); //establecemos la camara activa

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
        raiz.crearNodo(escaladoP1, mp1, "mallaP1");

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
        raiz.crearNodo(escaladoP2, mp2, "mallaP2");

        //PERSONA 3
        //rotacion-p3
        var rp3 = raiz.crearTransform();
        var rotacionP3 = raiz.crearNodo(raiz.escena, rp3, "rotacionP3");
        // rp3.rotar(1, 1, 1, 1);
        //traslacion-p3
        var tp3 = raiz.crearTransform();
        var traslacionP3 = raiz.crearNodo(rotacionP3, tp3, "traslacionP3");
        tp3.trasladar(2, 0, 0);
        //escalado-p3
        var ep3 = raiz.crearTransform();
        var escaladoP3 = raiz.crearNodo(traslacionP3, ep3, "escaladoP3");
        // ep3.escalar(0.8, 0.8, 0.8);
        //malla-p3
        var mp3 = raiz.crearMalla('female-croupier-2013-03-26');
        raiz.crearNodo(escaladoP3, mp3, "mallaP3");

        break;

      case 4:
        inhabilitar = false;
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
        raiz.crearNodo(escaladoL1, l1, "luz-1");

        raiz.setLuzActiva(l1);
        raiz.setIntensidadRGB(l1, 20, 20, 15);
        //var vecAux= vec3.fromValues(1, 185, 160);
        var vecAux = vec3.fromValues(30, 20, 60);
        raiz.setIntensidadVector(l1, vecAux);
        // console.log("VEMOS LA LUZ");
        // console.log(l1);
        // console.log("FIN LOG LUZ");

        //CAMARA 1
        //rotacion-c1
        var rc1 = raiz.crearTransform();
        rc1.rotar(0, 1, 0, 1)
        rc1.rotar(1, 0, 0, -40)
        var rotacionC1 = raiz.crearNodo(raiz.escena, rc1, "rotacionC1");
        //traslacion-c1
        var tc1 = raiz.crearTransform();
        tc1.trasladar(7, 7, 12);
        var traslacionC1 = raiz.crearNodo(rotacionC1, tc1, "traslacionC1");
        //escalado-c1
        var ec1 = raiz.crearTransform();
        var escaladoC1 = raiz.crearNodo(traslacionC1, ec1, "escaladoC1");
        //camara1
        var c1 = raiz.crearCamara("camara-1");
        raiz.crearNodo(escaladoC1, c1, "camara-1");
        // console.log(camara.entidad);
        // console.log(c1);
        // console.log(camara1);
        raiz.iniciarCamara(c1, 0.1, 100, 600, 0, 800, 0);
        raiz.setPerspectiva(c1);
        raiz.setCamaraActiva(c1); //establecemos la camara activa
        // console.log("Camara despues de iniciar");
        // console.log(c1);

        //CAMARA 2
        //rotacion-c2
        var rc2 = raiz.crearTransform();
        rc2.rotar(0, 1, 0, 1)
        var rotacionC2 = raiz.crearNodo(raiz.escena, rc2, "rotacionC2");
        //traslacion-c1
        var tc2 = raiz.crearTransform();
        tc2.trasladar(0, 0, 5);
        var traslacionC2 = raiz.crearNodo(rotacionC2, tc2, "traslacionC2");
        //escalado-c1
        var ec2 = raiz.crearTransform();
        var escaladoC2 = raiz.crearNodo(traslacionC2, ec2, "escaladoC2");
        //camara1
        var c2 = raiz.crearCamara("camara-2");
        raiz.crearNodo(escaladoC2, c2, "camara-2");
        // console.log(camara.entidad);

        raiz.iniciarCamara(c2, 1, 200, 600, 0, 800, 0);
        raiz.setPerspectiva(c2);
        raiz.setCamaraActiva(c2); //establecemos la camara activa
        //    raiz.setCamaraActiva(c1); //establecemos la camara activa

        //PERSONA 1
        //rotacion-p1
        var rp1 = raiz.crearTransform();
        var rotacionP1 = raiz.crearNodo(raiz.escena, rp1, "rotacionP1");
        // rp1.rotar(1, 1, 1, 1);
        //traslacion-p1
        var tp1 = raiz.crearTransform();
        var traslacionP1 = raiz.crearNodo(rotacionP1, tp1, "traslacionP1");
        tp1.trasladar(-2, 0, 0);
        //escalado-p1
        var ep1 = raiz.crearTransform();
        var escaladoP1 = raiz.crearNodo(traslacionP1, ep1, "escaladoP1");
        // ep1.escalar(0.8, 0.8, 0.8);
        //malla-p1
        var mp1 = raiz.crearMalla('female-croupier-2013-03-26');
        raiz.crearNodo(escaladoP1, mp1, "mallaP1");

        //PERSONA 2
        //rotacion-p2
        var rp2 = raiz.crearTransform();
        //rp2.rotar(0, 1, 0, 180);
        // rp1.rotar(0.2, 1, 0, 2);
        var rotacionP2 = raiz.crearNodo(raiz.escena, rp2, "rotacionP2");
        //traslacion-p2
        var tp2 = raiz.crearTransform();
        tp2.trasladar(-0.7, 0, 0);
        var traslacionP2 = raiz.crearNodo(rotacionP2, tp2, "traslacionP2");
        //escalado-p2
        var ep2 = raiz.crearTransform();
        ep2.escalar(0.9, 0.75, 1);
        var escaladoP2 = raiz.crearNodo(traslacionP2, ep2, "escaladoP2");
        //malla-p2
        var mp2 = raiz.crearMalla('female-croupier-2013-03-26');
        raiz.crearNodo(escaladoP2, mp2, "mallaP2");

        //PERSONA 3
        //rotacion-p3
        var rp3 = raiz.crearTransform();
        var rotacionP3 = raiz.crearNodo(raiz.escena, rp3, "rotacionP3");
        // rp3.rotar(1, 1, 1, 1);
        //traslacion-p3
        var tp3 = raiz.crearTransform();
        var traslacionP3 = raiz.crearNodo(rotacionP3, tp3, "traslacionP3");
        tp3.trasladar(0.7, 0, 0);
        //escalado-p3
        var ep3 = raiz.crearTransform();
        var escaladoP3 = raiz.crearNodo(traslacionP3, ep3, "escaladoP3");
        ep3.escalar(1, 0.85, 1);
        //malla-p3
        var mp3 = raiz.crearMalla('female-croupier-2013-03-26');
        raiz.crearNodo(escaladoP3, mp3, "mallaP3");


        //PERSONA 4
        //rotacion-p4
        var rp4 = raiz.crearTransform();
        var rotacionP4 = raiz.crearNodo(raiz.escena, rp4, "rotacionP4");
        // rp4.rotar(1, 1, 1, 1);
        //traslacion-p4
        var tp4 = raiz.crearTransform();
        var traslacionP4 = raiz.crearNodo(rotacionP4, tp4, "traslacionP4");
        tp4.trasladar(2, 0, 0);
        //escalado-p4
        var ep4 = raiz.crearTransform();
        var escaladoP4 = raiz.crearNodo(traslacionP4, ep4, "escaladoP4");
        ep4.escalar(1, 0.8, 1);
        //malla-p4
        var mp4 = raiz.crearMalla('female-croupier-2013-03-26');
        raiz.crearNodo(escaladoP4, mp4, "mallaP4");

        break;

      case 5:
        inhabilitar = false;
        //LUZ 1
        //rotacion-l1
        var rl1 = raiz.crearTransform();
        var rotacionL1 = raiz.crearNodo(raiz.escena, rl1, "rotacionL1")
        //traslacion-l1
        var tl1 = raiz.crearTransform();
        tl1.trasladar(3, 2, 0);
        var traslacionL1 = raiz.crearNodo(rotacionL1, tl1, "traslacionL1");
        //escalado-l1
        var el1 = raiz.crearTransform();
        var escaladoL1 = raiz.crearNodo(traslacionL1, el1, "escaladoL1");
        //luz1
        var l1 = raiz.crearLuz();
        var luz1 = raiz.crearNodo(escaladoL1, l1, "luz-1");

        raiz.setLuzActiva(l1);
        raiz.setIntensidadRGB(l1, 20, 20, 15);
        //var vecAux= vec3.fromValues(1, 185, 160);
        // var vecAux = vec3.fromValues(0, 0, 0);
        // raiz.setIntensidadVector(l1, vecAux);

        //CAMARA 1
        //rotacion-c1
        var rc1 = raiz.crearTransform();
        rc1.rotar(0, 1, 0, 1)
        rc1.rotar(1, 0, 0, -40)
        var rotacionC1 = raiz.crearNodo(raiz.escena, rc1, "rotacionC1");
        //traslacion-c1
        var tc1 = raiz.crearTransform();
        tc1.trasladar(7, 7, 12);
        var traslacionC1 = raiz.crearNodo(rotacionC1, tc1, "traslacionC1");
        //escalado-c1
        var ec1 = raiz.crearTransform();
        var escaladoC1 = raiz.crearNodo(traslacionC1, ec1, "escaladoC1");
        //camara1
        var c1 = raiz.crearCamara("camara-1");
        raiz.crearNodo(escaladoC1, c1, "camara-1");
        // console.log(camara.entidad);
        // console.log(c1);
        // console.log(camara1);
        raiz.iniciarCamara(c1, 0.1, 100, 600, 0, 800, 0);
        raiz.setPerspectiva(c1);
        raiz.setCamaraActiva(c1); //establecemos la camara activa
        // console.log("Camara despues de iniciar");
        // console.log(c1);

        //CAMARA 2
        //rotacion-c2
        var rc2 = raiz.crearTransform();
        rc2.rotar(0, 1, 0, 1)
        var rotacionC2 = raiz.crearNodo(raiz.escena, rc2, "rotacionC2");
        //traslacion-c1
        var tc2 = raiz.crearTransform();
        tc2.trasladar(0, 0, 5);
        var traslacionC2 = raiz.crearNodo(rotacionC2, tc2, "traslacionC2");
        //escalado-c1
        var ec2 = raiz.crearTransform();
        var escaladoC2 = raiz.crearNodo(traslacionC2, ec2, "escaladoC2");
        //camara1
        var c2 = raiz.crearCamara("camara-2");
        raiz.crearNodo(escaladoC2, c2, "camara-2");
        // console.log(camara.entidad);

        raiz.iniciarCamara(c2, 1, 200, 600, 0, 800, 0);
        raiz.setPerspectiva(c2);
        raiz.setCamaraActiva(c2); //establecemos la camara activa
        //    raiz.setCamaraActiva(c1); //establecemos la camara activa

        //PERSONA 1
        //rotacion-p1
        var rp1 = raiz.crearTransform();
        var rotacionP1 = raiz.crearNodo(raiz.escena, rp1, "rotacionP1");
        // rp1.rotar(1, 1, 1, 1);
        //traslacion-p1
        var tp1 = raiz.crearTransform();
        var traslacionP1 = raiz.crearNodo(rotacionP1, tp1, "traslacionP1");
        tp1.trasladar(-3, 0, 0);
        //escalado-p1
        var ep1 = raiz.crearTransform();
        var escaladoP1 = raiz.crearNodo(traslacionP1, ep1, "escaladoP1");
        // ep1.escalar(0.8, 0.8, 0.8);
        //malla-p1
        var mp1 = raiz.crearMalla('female-croupier-2013-03-26');
        raiz.crearNodo(escaladoP1, mp1, "mallaP1");

        //PERSONA 2
        //rotacion-p2
        var rp2 = raiz.crearTransform();
        rp2.rotar(0, 1, 0, 180);
        // rp1.rotar(0.2, 1, 0, 2);
        var rotacionP2 = raiz.crearNodo(raiz.escena, rp2, "rotacionP2");
        //traslacion-p2
        var tp2 = raiz.crearTransform();
        tp2.trasladar(-2, 0, 0);
        var traslacionP2 = raiz.crearNodo(rotacionP2, tp2, "traslacionP2");
        //escalado-p2
        var ep2 = raiz.crearTransform();
        ep2.escalar(0.5, 0.5, 0.5);
        var escaladoP2 = raiz.crearNodo(traslacionP2, ep2, "escaladoP2");
        //malla-p2
        var mp2 = raiz.crearMalla('female-croupier-2013-03-26');
        raiz.crearNodo(escaladoP2, mp2, "mallaP2");

        //PERSONA 3
        //rotacion-p3
        var rp3 = raiz.crearTransform();
        var rotacionP3 = raiz.crearNodo(raiz.escena, rp3, "rotacionP3");
        // rp3.rotar(1, 1, 1, 1);
        //traslacion-p3
        var tp3 = raiz.crearTransform();
        var traslacionP3 = raiz.crearNodo(rotacionP3, tp3, "traslacionP3");
        tp3.trasladar(0.1, 0, 0);
        //escalado-p3
        var ep3 = raiz.crearTransform();
        var escaladoP3 = raiz.crearNodo(traslacionP3, ep3, "escaladoP3");
        // ep3.escalar(0.8, 0.8, 0.8);
        //malla-p3
        var mp3 = raiz.crearMalla('female-croupier-2013-03-26');
        raiz.crearNodo(escaladoP3, mp3, "mallaP3");


        //PERSONA 4
        //rotacion-p4
        var rp4 = raiz.crearTransform();
        var rotacionP4 = raiz.crearNodo(raiz.escena, rp4, "rotacionP4");
        // rp4.rotar(1, 1, 1, 1);
        //traslacion-p4
        var tp4 = raiz.crearTransform();
        var traslacionP4 = raiz.crearNodo(rotacionP4, tp4, "traslacionP4");
        tp4.trasladar(1.4, 0, 0);
        //escalado-p4
        var ep4 = raiz.crearTransform();
        var escaladoP4 = raiz.crearNodo(traslacionP4, ep4, "escaladoP4");
        // ep4.escalar(0.8, 0.8, 0.8);
        //malla-p4
        var mp4 = raiz.crearMalla('female-croupier-2013-03-26');
        raiz.crearNodo(escaladoP4, mp4, "mallaP4");

        //PERSONA 5
        //rotacion-p5
        var rp5 = raiz.crearTransform();
        var rotacionP5 = raiz.crearNodo(raiz.escena, rp5, "rotacionP5");
        // rp5.rotar(1, 1, 1, 1);
        //traslacion-p5
        var tp5 = raiz.crearTransform();
        var traslacionP5 = raiz.crearNodo(rotacionP5, tp5, "traslacionP5");
        tp5.trasladar(2.5, 0, 0);
        //escalado-p5
        var ep5 = raiz.crearTransform();
        var escaladoP5 = raiz.crearNodo(traslacionP5, ep5, "escaladoP5");
        // ep5.escalar(0.8, 0.8, 0.8);
        //malla-p5
        var mp5 = raiz.crearMalla('female-croupier-2013-03-26');
        raiz.crearNodo(escaladoP5, mp5, "mallaP5");

        break;
      default:
        inhabilitar = true;
    }
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
        switch (personas.length) {
          case 1:
            rp1.rotar(0.2, 1, 0, 2);
            break;

          case 2:
            rp1.rotar(0.2, 1, 0, 2);
            if (frame % 400 === 0) {
              aux_transladar = !aux_transladar;
            }
            tp2.trasladar(aux_transladar ? transladar : -transladar, 0, 0);
            break;

          case 3:
            rp1.rotar(0.2, 1, 0, 2);
            if (frame % 400 === 0) {
              aux_transladar = !aux_transladar;
            }
            tp2.trasladar(aux_transladar ? transladar : -transladar, 0, 0);
            rp3.rotar(2, 0.7, 0.5, 2);
            break;

          case 4:
            rp1.rotar(0, 1, 0, 2);
            rp2.rotar(0, 1, 0, 2);
            rp3.rotar(0, 1, 0, 2);
            rp4.rotar(0, 1, 0, 2);
            break;

          case 5:
            rp1.rotar(0, 1, 0, 2);
            rp2.rotar(0, 1, 0, 2);
            rp3.rotar(0, 1, 0, 2);
            rp4.rotar(0, 1, 0, 2);
            rp5.rotar(0, 1, 0, 2);
            break;

          default:

        }

        // Tener en cuenta que en la animación lo que se hace es añadir a
        // lo que habia en la matriz de transformación anterior

        frame++;
        // ========================= 1. Preparar Canvas =========================
        const gl = GLOBAL.gl;
        twgl.resizeCanvasToDisplaySize(gl.canvas); // Modifica el inline CSS del <canvas> 
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height); // TODO: Para arreglar el aspect ratio, necesitamos una camara.
        gl.enable(gl.DEPTH_TEST);          // Activa la comparación de profundidad y actualiza el buffer de profundidad. 
        gl.enable(gl.CULL_FACE);           // Activa la eliminación de los polígonos no visibles.
        gl.depthFunc(gl.LEQUAL);           // Objetos cercanos opacan objetos lejanos.
        gl.cullFace(gl.FRONT);             // Elimina los poligonos traseros.
        gl.clearColor(0.2, 0.4, 0.4, 0.9); // Cambia el fondo del canvas.
        // Limpiar el buffer de color asi como el de profundidad
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);    // Eliminar/sustituye el color del canvas anterior.
        // Código de animación
        raiz.draw();

      }
    }

    let bucle = false;
    let animation; // ID de la animacion para cancelar
    const fps = 30;
    const fpsInterval = 1000 / fps;

    let now, then, elapsed;

    // Boton para que el motor dibuje.
    document.getElementById("animar").onclick = () => {
      if (raiz == null) {
        console.error("[ERROR] No existe el nodo Raiz");
      }
      else if (inhabilitar == true) {
        console.error("[ERROR] Establece un numero de personas entre 1 y 5");
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

    document.getElementById("camara1").onclick = () => {
      if (raiz == null) {
        console.error("[ERROR] No existe el nodo Raiz");
      }
      else if (inhabilitar == true) {
        console.error("[ERROR] Establece un numero de personas entre 1 y 5 y crea la escena, todavía no hay camara");
      } else {
        raiz.setCamaraActiva(c1);
        console.log("Camara 1 activada");
      }
    };

    document.getElementById("camara2").onclick = () => {
      if (raiz == null) {
        console.error("[ERROR] No existe el nodo Raiz");
      }
      else if (inhabilitar == true) {
        console.error("[ERROR] Establece un numero de personas entre 1 y 5 y crea la escena, todavía no hay camara");
      } else {
        raiz.setCamaraActiva(c2);
        console.log("Camara 2 activada");
      }
    };
  };
}