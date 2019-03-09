//===== Changelog ============================================
//=  - 0.2 - 02/16 - Creación de los datos estáticos [David]
//=  - 03/04 - Se ve que es necesario que gl
//=  sea una variable global [David]
//=  - 03/09 - Cambiado el nombre a GLOBAL para que tenga más
//=  significado [David]
//=    - Nuevas variables globales; gl, canvas y debug.
//=    - Cambiado setMatriz por set matriz.
//============================================================

/**
  * @summary Clase principalmente para guardar datos estáticos.
  * @author David
  * @version 0.2 - rev.(02/16)
  */
export class GLOBAL {

  static DEBUG = true;

  /** @type {int} Pasada Luz */
  static LUZ = 1;
  /** @type {int} Pasada Camara */
  static CAMARA = 2;
  /** @type {int} Pasada Dibujar */
  static DIBUJAR = 3;

  /** @type {int} Cantidad Pasadas */
  static N_PASADAS = 3;
  /** @type {any} Pila */
  static _pila = [];
  /** @type {mat4} Matriz Modelo, contiene la matriz de transformacion resultante */
  static _matrizModelo;

  static gl;
  static canvas;




  /**
    * @summary Introduce un nuevo elemento en la pila.
    * @param {any} element Cualquier elemento.
    * @returns {Number} Cantidad de elementos en la pila.
    * @see {@link http://localhost:3000/pdf/S2.pdf#page=24 | S2.24}
    * @author David
    * @version 0.2 - rev.(02/16)
    */
  static pushPila(element) {
    return this._pila.push(element);
  }

  /**
    * @summary Coge el elemento más nuevo de la pila.
    * @returns {any} El último elemento de la pila.
    * @see {@link http://localhost:3000/pdf/S2.pdf#page=24 | S2.24}
    * @author David
    * @version 0.2 - rev.(02/16)
    */
  static popPila() {
    return this._pila.pop();
  }

  /**
    * @summary Introduce una nueva pila.
    * @param {any[]} nueva_pila Una nueva pila.
    * @author David
    * @version 0.2 - rev.(02/16)
    */
  static set pila(nueva_pila) {
    this._pila = nueva_pila;
  }

  /**
    * @summary Coge la pila actual
    * @returns {any[]} La pila.
    * @author David
    * @version 0.2 - rev.(02/16)
    */
  static get pila() {
    return this._pila;
  }

  /**
 * @summary Establece una matriz modelo.
 * @param {mat4} matrix La matriz modelo.
 * @author David
 * @version ¿¿?? - rev.(02/16)
 */
  static set matriz(matrix) {
    this._matrizModelo = matrix;
  }

  /**
    * @summary Coge la matriz modelo.
    * @returns {mat4} La matriz modelo.
    * @author David
    * @version ¿¿?? - rev.(02/16)
    */
  static get matriz() {
    return this._matrizModelo;
  }
}
