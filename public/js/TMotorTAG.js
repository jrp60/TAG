//===== Changelog ============================================
//=  - 0.4 Init. S4.7 [David]
//=  - 03-05 metodos de crear nodo, transoform luz y camara  [Javi]
//=  - 03/09 Arreglos variados [David]
//=    - TTransform ha cambiado, adaptado a la nueva versión.
//=    - TMalla ha cambiado, adaptado a la nueva versión.
//=    - TCamara ha cambiado, adaptado a la nueva versión.
//=    - TLuz ha cambiado, adaptado a la nueva versión.
//=  - 04/01 Creando métodos para implementar camaras [Javi]
//=  - 04/01 Creando métodos para implementar luces [Javi]
//============================================================

import { TNodo } from "./TNodo.js";
import { TGestorRecursos } from "./TGestorRecursos.js";
import { TMalla } from "./TMalla.js";
import { TTransform } from "./TTransform.js";
import { TCamara } from "./TCamara.js";
import { TLuz } from "./TLuz.js";
import { GLOBAL } from "./GLOBAL.js";

/**
 * @summary Separa el motor de la aplicación el motor puede
 *  sustituirse fácilmente por otro y también reutilizarse.
 * @see {@link http://localhost:3000/pdf/S4.pdf#page=7 | S4.7}
 * @author David
 * @version 0.4 - rev.(03/09)
 */
export class TMotorTAG {

  /** @type {TNodo} */
  _escena;

  /** @type {TGestorRecursos} */
  _gestorRecursos;

  constructor() {
    this._escena = new TNodo("raiz");
  }

  // Atributos para mantenimiento de las cámaras, luces y viewports

  /**
   * @summary Crea un nodo y lo relaciona con el nodo padre.
   * @param {TNodo} padre El nodo padre.
   * @param {TEntidad} ent Una entidad.
   * @param {string} name Nombre del nodo
   * @return {TNodo} El nodo resultante.
   * @see {@link http://localhost:3000/pdf/S4.pdf#page=7 | S4.7}
   * @author David - Javi
   * @version 0.2 03-04
   */
  crearNodo(padre, ent, name) {
    const nodo = new TNodo(name);
    nodo.entidad = ent;
    nodo.padre = padre;
    padre.addHijo(nodo);
    return nodo;
  }
  /**
   * @summary Elimina un hijo
   * @param {TNodo} padre El nodo padre.
   * @param {TNodo} El nodo hijo
   * @see {@link http://localhost:3000/pdf/S4.pdf#page=7 | S4.7}
   * @author - Javi
   */

  eliminaHijo(nodoPadre, hijo) {
    nodoPadre.remHijo(hijo);

  }
  /**
   * @summary Añade un hijo
   * @param {TNodo} padre El nodo padre.
   * @param {TNodo} El nodo hijo
   * @see {@link http://localhost:3000/pdf/S4.pdf#page=7 | S4.7}
   * @author  Javi
   * @version 0.2
   */
  addhijo(padre, hijo) {
    padre.addHijo(hijo);
  }

  /**
   * @summary Limpia la escena y crea una nueva.
   * @return {TTransform}
   * @see {@link http://localhost:3000/pdf/S4.pdf#page=7 | S4.7}
   * @author  Javi
   * @version 0.4 - rev.(05/09)
   * @todo Borra escena y crea una nueva
   */
  limpiaRaiz() {
    this._escena = null;
    this._escena = new TNodo("raiz");
  }

  // get Entidad(nodo){
  //   return nodo.entidad;
  // }

  get escena() {
    return this._escena;
  }

  /**
   * @summary Creamos entidad transformacion y devolvemos.
   * @return {TTransform}
   * @see {@link http://localhost:3000/pdf/S4.pdf#page=7 | S4.7}
   * @author David - Javi
   * @version 0.4 - rev.(03/09)
   * @todo Crear transformación y devolverla
   */
  crearTransform() {
    return new TTransform();
  }

  /**
   * @summary Crea una camara con posiciones y se indica si esta activa o no
   * @return {TCamara}
   * @see {@link http://localhost:3000/pdf/S4.pdf#page=7 | S4.7}
   * @author Javi
   * @version 0.4 - rev.(03/09)
   * @todo Crear cámara y devolverla
   */
  crearCamara(name) {
    return new TCamara(name);
  }

  /**
   * @summary Inicializa los atributos de camara
   * @param {TCamara} camara La camara la cual se va a inicializar
   * @param {float} cerca
   * @param {float} lejos
   * @param {float} inferior
   * @param {float} superior
   * @param {float} derecha
   * @param {float} izquierda
   * @see {@link http://localhost:3000/pdf/S4.pdf#page=7 | S4.7}
   * @author Javi
   * @version 0.4 - rev.(03/09)
   * @todo Inicializa los atributos de la camara
   */
  iniciarCamara(camara, cerca, lejos, inferior, superior, derecha, izquierda) {
    camara.Cercano = cerca;
    camara.Lejano = lejos;
    camara.Inferior = inferior;
    camara.Superior = superior;
    camara.Derecha = derecha;
    camara.Izquierda = izquierda;
  }

  // Métodos para el registro y manejo de los viewports

  setPerspectiva(camara) {
    camara.setPerspectiva();
  }

  setParalela(camara) {
    camara.setParalela();
  }

  // Métodos para el registro y manejo de las cámaras
  /**
   * @param {TCamara} cam Entidad de la camara que se va a activar
   * @see {@link http://localhost:3000/pdf/S4.pdf#page=7 | S4.7}
   * @author Javi
   * @version 0.4 - rev.(03/09)
   */
  setCamaraActiva(cam) {
    cam.setActiva();
  }

  /**
   * @param {TCamara} cam Entidad de la camara que se va a activar
   * @see {@link http://localhost:3000/pdf/S4.pdf#page=7 | S4.7}
   * @author Javi
   * @version 0.4 - rev.(03/09)
   */
  setCamaraInActiva(cam) {
    cam.setActiva();
  }


  // Métodos para el registro y manejo de las luces

  /**
   * @summary falta por poner la intesidad, posicion y si es activa
   * @return {TLuz}
   * @see {@link http://localhost:3000/pdf/S4.pdf#page=7 | S4.7}
   * @author David - Javi
   * @version 0.2
   * @todo Crear luz y devolverla
   */
  crearLuz() {
    return new TLuz();
  }

  /**
   * @param {TLuz} luz La luz la cual se va a activar
   * @see {@link http://localhost:3000/pdf/S4.pdf#page=7 | S4.7}
   * @author Javi
   * @version 0.4 - rev.(03/09)
   * @todo activar luz
   */
  setLuzActiva(luz) {
    luz.activaLuz();
  }

  /**
   * @param {TLuz} luz La luz la cual se va a desactivar
   * @see {@link http://localhost:3000/pdf/S4.pdf#page=7 | S4.7}
   * @author Javi
   * @version 0.4 - rev.(03/09)
   * @todo Desactivar luz
   */
  setLuzDesactiva(luz) {
    luz.desactivaLuz();
  }

  /**
   * @param {TLuz} luz La luz la cual se va a modificar su intensidad
   * @param {vec3} intensidad intensidad nueva
   * @see {@link http://localhost:3000/pdf/S4.pdf#page=7 | S4.7}
   * @author Javi
   * @version 0.4 - rev.(03/09)
   */
  setIntensidadVector(luz, intensidad) {
    luz.intensidadVector = intensidad;
  }

  /**
   * @param {TLuz} luz La luz la cual se va a modificar su intensidad
   * @param {float} r red
   * @param {float} g green
   * @param {float} b blue
   * @see {@link http://localhost:3000/pdf/S4.pdf#page=7 | S4.7}
   * @author Javi
   * @version 0.4 - rev.(03/09)
   */
  setIntensidadRGB(luz, r, g, b) {
    luz.setintensidad(r, g, b);
  }

  /**
   * @summary Devuelve una nueva entidad TMalla y carga el fichero.
   * @param {string} fichero La ruta del fichero.
   * @return {TMalla} La malla creada
   * @see {@link http://localhost:3000/pdf/S4.pdf#page=7 | S4.7}
   * @author David - Javi
   * @version 0.2 - rev.(03/09)
   */
  crearMalla(fichero) {
    return new TMalla(fichero);
  }

  /**
   * @summary Funcion draw para iniciar el bucle de dibujado
   * @see {@link http://localhost:3000/pdf/S4.pdf#page=7 | S4.7}
   * @author David
   * @version 0.4 - rev.(03/09)
   */
  draw() {

    GLOBAL.matriz = glMatrix.mat4.create();
    GLOBAL.matrizView = glMatrix.mat4.create();
    //el resto se inicializan en GLOBAL.js
    if (this._escena === null) {
      console.error('[ERROR]: No hay raiz' + this._escena);
    } else {

      // Inicializar la librería gráfica como sea necesario
      this._escena.drawRaiz(GLOBAL.LUZ);

      // Inicializar el viewport activo con la librería gráfica
      this._escena.drawRaiz(GLOBAL.CAMARA);

      // cargar en la matriz MODELVIEW la matriz de la cámara
      this._escena.drawRaiz(GLOBAL.DIBUJAR);
    }
  }


  /**
   * @summary Imprime en ASCII en consola el arbol
   * @author David
   * @version 0.2 - rev.(03/09)
   */
  imprimir() {
    this._escena.imprimir('', true);
  }

}
