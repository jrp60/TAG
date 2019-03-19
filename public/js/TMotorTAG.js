//===== Changelog ============================================
//=  - 0.4 Init. S4.7 [David]
//=  - 03-05 metodos de crear nodo, transoform luz y camara  [Javi]
//=  - 03/09 Arreglos variados [David]
//=    - TTransform ha cambiado, adaptado a la nueva versión.
//=    - TMalla ha cambiado, adaptado a la nueva versión.
//=    - TCamara ha cambiado, adaptado a la nueva versión.
//=    - TLuz ha cambiado, adaptado a la nueva versión.
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
   * @author Javi - David
   * @version 0.4 - rev.(03/09)
   * @todo Crear cámara y devolverla
   */
  crearCamara() {
    return new TCamara();
  }

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

  // Métodos para el registro y manejo de las cámaras
  // Métodos para el registro y manejo de las luces
  // Métodos para el registro y manejo de los viewports

  /**
   * @summary Funcion draw para iniciar el bucle de dibujado
   * @see {@link http://localhost:3000/pdf/S4.pdf#page=7 | S4.7}
   * @author David
   * @version 0.4 - rev.(03/09)
   */
  draw() {
    GLOBAL.matriz = glMatrix.mat4.create();
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
