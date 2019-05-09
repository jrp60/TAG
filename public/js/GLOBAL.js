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

  /** * glMatrix.ARRAY_TYPE(3) * @type {vec3} **/
  const vec3 = glMatrix.vec3;

  /** * glMatrix.ARRAY_TYPE(16) * @type {mat4} **/
  const mat4 = glMatrix.mat4;

export class GLOBAL {

  /*** Constante para habilitar el modo debug* @const {boolean}*/
  static DEBUG = false;

  /*** Pasada Luz* @const {Bit}*/
  static LUZ = 1;

  /*** Pasada Camara * @const {Bit}*/
  static CAMARA = 2;

  /*** Pasada Dibujar * @const {Bit}*/
  static DIBUJAR = 3;

  /*** Pila* @type {any}*/
  static _pila = [];

  /** Matriz de transformación en memoria esta es manejado por la pila para guardar las diferentes transformaciones que se llevan a cabo * @type {mat4}*/
  static _matrizModelo;

  /*** Matriz view (inversa de camara) * @type {mat4}*/
  static _matrizView = mat4.create();

  /*** Matriz view (inversa de camara) * @type {mat4}*/
  static _normalMatrix = mat4.create();

  /*** Matriz view (inversa de camara) * @type {mat4}*/
  static _projectionmatrix  = mat4.create();

  /** Vector de la luz* @type {vec3}*/
  static _posicionLuz = vec3.fromValues(0,0,0);

  /** Vector de la luz* @type {vec3}*/
  static _intensidadLuz = vec3.fromValues(0,0,0);

  /** * Contiene el objeto de WebGL* @type {WebGLObject}*/
  static gl;

  /*** Elemento DOM que corresponde al canvas donde se dibuja* @type {Document} */
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

  /**
 * @summary Establece una matriz view.
 * @param {mat4} matrix La matriz view.
 * @author Javi
 * @version
 */
  static set matrizView(matrix) {
    this._matrizView = matrix;
  }

  /**
    * @summary Coge la matriz view.
    * @returns {mat4} La matriz view.
    * @author Javi
    * @version
    */
  static get matrizView() {
    return this._matrizView;
  }

  /**
 * @summary Establece una matriz luz.
 * @param {vec3} vec El vector luz.
 * @author Javi
 * @version
 */
  static set posicionLuz(vec) {
    this._posicionLuz = vec;
  }

  /**
    * @summary Coge la matriz luz.
    * @returns {vec3} El vector luz.
    * @author Javi
    * @version
    */
  static get posicionLuz() {
    return this._posicionLuz;
  }
  /**
 * @summary Establece una matriz luz.
 * @param {vec3} vec El vector luz.
 * @author Javi
 * @version
 */
  static set intensidad(vec) {
    this._intensidadLuz = vec;
  }

  /**
    * @summary Coge la matriz luz.
    * @returns {vec3} El vector luz.
    * @author Javi
    * @version
    */
  static get intensidad() {
    return this._intensidadLuz;
  }

  /**
 * @summary Establece una matriz luz.
 * @param {vec3} vec El vector luz.
 * @author Javi
 * @version
 */
  static set normal(mat) {
    this._normalMatrix = mat;
  }

  /**
    * @summary Coge la matriz luz.
    * @returns {vec3} El vector luz.
    * @author Javi
    * @version
    */
  static get normal() {
    return this._normalMatrix;
  }

  /**
 * @summary Establece una matriz luz.
 * @param {vec3} vec El vector luz.
 * @author Javi
 * @version
 */
  static set projection(mat) {
    this._projectionmatrix = mat;
  }

  /**
    * @summary Coge la matriz luz.
    * @returns {vec3} El vector luz.
    * @author Javi
    * @version
    */
  static get projection() {
    return this._projectionmatrix;
  }
}
