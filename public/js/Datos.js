//===== Changelog ============================================
//=  - 0.2 - 02/16 - Creación de los datos estáticos [David]
//============================================================

/**
  * @summary Clase principalmente para guardar datos estáticos.
  * @author David
  * @version 0.2 - rev.(02/16)
  */
 export class Datos {
    /** @type {int} Fase Luz */
    static LUZ = 1;
    /** @type {int} Fase Camara */
    static CAMARA = 2;
    /** @type {int} Fase Dibujo */
    static DIBUJO = 3;
    /** @type {any} Pila */
    static _pila = [];
    /** @type {mat4} Matriz Modelo */
    static _matrizModelo;




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
     static setmatriz(matrix) {
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
