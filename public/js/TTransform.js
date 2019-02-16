//===== Changelog ============================================
//=  - 0.2 Init. S2.16 [David]
//=  - 01/28 - Rafa recomienda el uso de la libreria GLM [David]
//=  - 02/14 - Termina de transcribir lo que tenía de C++ a JS [David]
//============================================================

import { TEntidad } from './TEntidad.js';

/**
 * @summary Gestiona la matriz, para operaciones de transformacion.
 * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
 * @author David
 * @version 0.2 - rev.(02/14)
 */
export class TTransform extends TEntidad {
    /** @type {mat4} glMatrix.ARRAY_TYPE(16)*/
    _matriz;


    /**
     * @summary Devuelve la matriz identidad de tamaño 4 de glMatrix.
     * @returns {mat4} La matriz identidad.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author David
     * @version 0.2 - rev.(02/14)
     */
    identidad() {
        return mat4.identity(mat4.create());
    }

    /**
     * @summary Copia la matriz dada, para que TTransform lo transforme.
     * @param {mat4} matrix La matriz en glMatrix.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author David
     * @version 0.2 - rev.(02/14)
     */
    cargar(matrix) {
        _matriz = mat4.clone(matrix);
    }

    /**
     * @summary Transpone la matriz, también devuelve una copia por si la necesitas.
     * @returns {mat4} Una copia de la matriz transpuesta.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author David
     * @version 0.2 - rev.(02/14)
     */
    transponer() {
        return mat4.transpose(this._matriz, this._matriz);
    }

    /**
     * @summary Invierte la matriz, también devuelve una copia por si la necesitas.
     * @returns {mat4} Una copia de la matriz inversa.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author David
     * @version 0.2 - rev.(02/14)
     */
    invertir() {
        return mat4.invert(this._matriz, this._matriz);
    }
    /**
     * @summary Multiplica dos matrices,
     * también devuelve una copia por si la necesitas.
     * @param {mat4} matrix La matriz a múltiplicar.
     * @returns {mat4} Una copia de la matriz resultante.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author David
     * @version 0.2 - rev.(02/14)
     */
    multiplicarMatriz(matrix) {
        return mat4.multiply(this._matriz, this._matriz, matrix);
    }


    /**
     * @summary Translada la matriz según el vector que se le da,
     * también devuelve una copia por si la necesitas.
     * @param {float} x Axis X
     * @param {float} y Axis Y
     * @param {float} z Axis Z
     * @returns {mat4} Una copia de la matriz resultante.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author David
     * @version 0.2 - rev.(02/14)
     */
    transladar(x, y, z) {
        return mat4.translate(this._matriz, this._matriz, vec3.fromValues(x, y, z));
    }

    /**
     * @summary Rota la matriz contenida en la clase,
     * respecto a los grados y a la posición,
     * también devuelve una copia por si la necesitas.
     * @param {float} x Axis X
     * @param {float} y Axis Y
     * @param {float} z Axis Z
     * @param {float} t Grados
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author David
     * @version 0.2 - rev.(02/14)
     */
    rotar(x, y, z, t) {
        const rads = t * Math.PI / 180;
        return mat4.rotate(this._matrix, this._matrix, rads, vec3.fromValues(x, y, z));
    }

    /**
     * @summary Escala la matriz contenida en la clase,
     * también devuelve una copia por si la necesitas.
     * @param {float} x Axis X
     * @param {float} y Axis Y
     * @param {float} z Axis Z
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author David
     * @version 0.2 - rev.(02/14)
     */
    escalar(x, y, z) {
        return mat4.scale(this._matrix, this._matrix, vec3.fromValues(x, y, z));
    }

    /**
     * @summary Apilar matriz actual
     * Multiplicar la matriz de la transformación a la matriz actual
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author David - Javi
     * @version 0.2 - rev.(01/28) - rev.(02/12)
     */
    beginDraw() {
      let aux = new mat4.create();
      for(var i = 0; i<matrizView.length; i++){ //donde se almacena la matrizView? se crea multiplicando las matrices Transform hasta llegar a nodo cámara
        aux[i]=matrizView[i];
      }
       //apilamos matriz actual (matriz aux)
      matrizView=mat4.multiply(matrizView,this.matriz); //multiplicamos matriz actual x matriz de transformacion
    }

    /**
     * @summary Desapilar matriz y ponerla como actual
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author David
     * @version 0.2 - rev.(01/28)
     */
    endDraw() {

    }
}
