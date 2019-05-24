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
//=  - 04/01 - Creando camara en el arbol a través de la fachada [Javi]
//=  - 05/23 - Reorganización de código y cambio de estructura. 850 lineas a 400 lineas [David]

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
var animando = true;
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




// ======================================================================
// =========================    Código motor    =========================

window.onload = () => {

  document.getElementById("enviar").onclick = () => {
    personas.length = 0; // No reinicia exactamente el array, pero hace que empiece desde el 0.
    const personas_aux = document.getElementsByTagName("article");
    for (const dom of personas_aux) {
      const datos = dom.children;
      const options_malla = datos[2].options;
      const i_malla = options_malla.selectedIndex;
      const options_mat = datos[3].options;
      const i_mat = options_mat.selectedIndex;
      datos[1].value = datos[1].value > 3 ? 3 : datos[1].value;
      datos[1].value = datos[1].value < 1 ? 1 : datos[1].value;
      const persona = new Persona(datos[0].value, datos[1].value, options_malla[i_malla].value, options_mat[i_mat].value);
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

    // ======================================================================
    // ==============================  Nodos  ===============================

    //LUZ 1
    var rl1 = raiz.crearTransform();
    var rotacionL1 = raiz.crearNodo(raiz.escena, rl1, "rotacionL1")
    var tl1 = raiz.crearTransform();
    var traslacionL1 = raiz.crearNodo(rotacionL1, tl1, "traslacionL1");
    var el1 = raiz.crearTransform();
    var escaladoL1 = raiz.crearNodo(traslacionL1, el1, "escaladoL1");
    var l1 = raiz.crearLuz();
    raiz.crearNodo(escaladoL1, l1, "luz-1");

    //CAMARA 1
    var rc1 = raiz.crearTransform();
    var rotacionC1 = raiz.crearNodo(raiz.escena, rc1, "rotacionC1");
    var tc1 = raiz.crearTransform();
    var traslacionC1 = raiz.crearNodo(rotacionC1, tc1, "traslacionC1");
    var ec1 = raiz.crearTransform();
    var escaladoC1 = raiz.crearNodo(traslacionC1, ec1, "escaladoC1");
    var c1 = raiz.crearCamara("camara-1");
    raiz.crearNodo(escaladoC1, c1, "camara-1");

    //CAMARA 2
    var rc2 = raiz.crearTransform();
    var rotacionC2 = raiz.crearNodo(raiz.escena, rc2, "rotacionC2");
    var tc2 = raiz.crearTransform();
    var traslacionC2 = raiz.crearNodo(rotacionC2, tc2, "traslacionC2");
    var ec2 = raiz.crearTransform();
    var escaladoC2 = raiz.crearNodo(traslacionC2, ec2, "escaladoC2");
    var c2 = raiz.crearCamara("camara-2");
    raiz.crearNodo(escaladoC2, c2, "camara-2");

    // Valores
    raiz.setIntensidadRGB(l1, 20, 20, 15);
    var vecAux = vec3.fromValues(30, 20, 60);
    raiz.setIntensidadVector(l1, vecAux);
    rc1.rotar(0, 1, 0, 1);
    rc1.rotar(1, 0, 0, -40);
    tc1.trasladar(7, 7, 12);
    raiz.iniciarCamara(c1, 0.1, 100, 600, 0, 800, 0);
    rc2.rotar(0, 1, 0, 1);
    tc2.trasladar(0, 0, 5);
    raiz.iniciarCamara(c2, 1, 200, 600, 0, 800, 0);

    raiz.setLuzActiva(l1);
    raiz.setPerspectiva(c1);
    raiz.setCamaraActiva(c1); //establecemos la camara activa
    raiz.setPerspectiva(c2);
    raiz.setCamaraActiva(c2); //establecemos la camara activa

    switch (personas.length) {
      case 5:
        //PERSONA 5
        var rp5 = raiz.crearTransform();
        var rotacionP5 = raiz.crearNodo(raiz.escena, rp5, "rotacionP5");
        var tp5 = raiz.crearTransform();
        var traslacionP5 = raiz.crearNodo(rotacionP5, tp5, "traslacionP5");
        var ep5 = raiz.crearTransform();
        var escaladoP5 = raiz.crearNodo(traslacionP5, ep5, "escaladoP5");
      case 4:
        //PERSONA 4
        var rp4 = raiz.crearTransform();
        var rotacionP4 = raiz.crearNodo(raiz.escena, rp4, "rotacionP4");
        var tp4 = raiz.crearTransform();
        var traslacionP4 = raiz.crearNodo(rotacionP4, tp4, "traslacionP4");
        var ep4 = raiz.crearTransform();
        var escaladoP4 = raiz.crearNodo(traslacionP4, ep4, "escaladoP4");
      case 3:
        //PERSONA 3
        var rp3 = raiz.crearTransform();
        var rotacionP3 = raiz.crearNodo(raiz.escena, rp3, "rotacionP3");
        var tp3 = raiz.crearTransform();
        var traslacionP3 = raiz.crearNodo(rotacionP3, tp3, "traslacionP3");
        var ep3 = raiz.crearTransform();
        var escaladoP3 = raiz.crearNodo(traslacionP3, ep3, "escaladoP3");
      case 2:
        //PERSONA 2
        var rp2 = raiz.crearTransform();
        var rotacionP2 = raiz.crearNodo(raiz.escena, rp2, "rotacionP2");
        var tp2 = raiz.crearTransform();
        var traslacionP2 = raiz.crearNodo(rotacionP2, tp2, "traslacionP2");
        var ep2 = raiz.crearTransform();
        var escaladoP2 = raiz.crearNodo(traslacionP2, ep2, "escaladoP2");
      case 1:
        //PERSONA 1
        var rp1 = raiz.crearTransform();
        var rotacionP1 = raiz.crearNodo(raiz.escena, rp1, "rotacionP1");
        var tp1 = raiz.crearTransform();
        var traslacionP1 = raiz.crearNodo(rotacionP1, tp1, "traslacionP1");
        var ep1 = raiz.crearTransform();
        var escaladoP1 = raiz.crearNodo(traslacionP1, ep1, "escaladoP1");
        break;
    }

    // ======================================================================
    // =======================  Gestión de personas  ========================

    switch (personas.length) {
      case 5:
        var mp5 = raiz.crearMalla(personas[4].malla);
        mp5.numero_material = personas[4].material;
        raiz.crearNodo(escaladoP5, mp5, "mallaP5");
      case 4:
        var mp4 = raiz.crearMalla(personas[3].malla);
        mp4.numero_material = personas[3].material;
        raiz.crearNodo(escaladoP4, mp4, "mallaP4");
      case 3:
        var mp3 = raiz.crearMalla(personas[2].malla);
        mp3.numero_material = personas[2].material;
        raiz.crearNodo(escaladoP3, mp3, "mallaP3");
      case 2:
        var mp2 = raiz.crearMalla(personas[1].malla);
        mp2.numero_material = personas[1].material;
        raiz.crearNodo(escaladoP2, mp2, "mallaP2");
      case 1:
        var mp1 = raiz.crearMalla(personas[0].malla);
        mp1.numero_material = personas[0].material;
        raiz.crearNodo(escaladoP1, mp1, "mallaP1");
        break;
    }
    switch (personas.length) {
      case 5:
        rp5.escalar(1 + personas[4].altura / 5, personas[4].altura, 1);
      case 4:
        rp4.escalar(1 + personas[3].altura / 5, personas[3].altura, 1);
      case 3:
        rp3.escalar(1 + personas[2].altura / 5, personas[2].altura, 1);
      case 2:
        rp2.escalar(1 + personas[1].altura / 5, personas[1].altura, 1);
      case 1:
        rp1.escalar(1 + personas[0].altura / 5, personas[0].altura, 1);
        break;
    }

    // ======================================================================
    // ===========================  Plantillas   ============================

    inhabilitar = false;
    switch (personas.length) {
      case 1:
        tl1.trasladar(2, 2, 0);
        break;
      case 2:
        tl1.trasladar(2, 2, 0);
        rp2.rotar(0, 1, 0, 180);
        tp2.trasladar(-1, 0, 0.5);
        ep2.escalar(0.5, 0.5, 0.5);
        break;

      case 3:
        tl1.trasladar(1.2, 6, 0);
        rp2.rotar(0, 1, 0, 180);
        tp2.trasladar(-1, 0, 0.5);
        ep2.escalar(0.5, 0.5, 0.5);
        tp3.trasladar(2, 0, 0);
        break;

      case 4:
        tl1.trasladar(1.4, 2.4, -0.1);
        tp1.trasladar(-2, 0, 0);
        tp2.trasladar(-0.7, -0.35, 0);
        ep2.escalar(0.9, 0.75, 1);
        tp3.trasladar(0.7, -0.21, 0);
        ep3.escalar(1, 0.85, 1);
        tp4.trasladar(2.2, -0.2, 0.1);
        ep4.escalar(1, 0.8, 1);
        break;
      case 5:
        tl1.trasladar(3, 2, 0);
        tp1.trasladar(-3, 0, 0);
        rp2.rotar(0, 1, 0, 180);
        ep2.escalar(0.5, 0.5, 0.5);
        tp2.trasladar(-2, 0, 0);
        tp3.trasladar(0.1, 0, 0);
        tp4.trasladar(1.4, 0, 0);
        tp5.trasladar(2.5, 0, 0);
        break;
      default:
        inhabilitar = true;
        break;
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
        // La razón de que esto esté fuera del motor es porque solo es para limpiar en general, antes estaba en TMalla,
        // y podría quedarse en TMotorTAG.
        // ========================= 1. Preparar Canvas =========================
        const gl = GLOBAL.gl;
        twgl.resizeCanvasToDisplaySize(gl.canvas); // Modifica el inline CSS del <canvas>
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height); // TODO: Para arreglar el aspect ratio, necesitamos una camara.
        gl.enable(gl.DEPTH_TEST);          // Activa la comparación de profundidad y actualiza el buffer de profundidad.
        // gl.enable(gl.CULL_FACE);           // Activa la eliminación de los polígonos no visibles.
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
        if(animando == true) {
          console.log("deshabilitamos los botones porque esta animando");
          document.getElementById("enviar").disabled = true;
          document.getElementById("animar").innerHTML = "Parar animación";
          animando = false;
        }else {
          console.log("habilitamos los botones");
          document.getElementById("enviar").disabled = false;
          document.getElementById("animar").innerHTML = "Animar";
          animando = true;
        }

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
