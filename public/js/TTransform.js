//===== Changelog ============================================
//=  - 0.2 Init. S2.16 [David]
//=  - 01/28 - Rafa recomienda el uso de la libreria GLM [David]
//=  - 02/14 - Termina de transcribir lo que tenía de C++ a JS [David]
//=  - 02/16 - Repaso de diapositiva 2 [David]
//============================================================

import { TEntidad } from './TEntidad.js';
import { Datos } from './Datos.js';

/** @type {mat4} glMatrix.ARRAY_TYPE(16)*/
const mat4 = glMatrix.mat4;
/** @type {vec3} glMatrix.ARRAY_TYPE(3)*/
const vec3 = glMatrix.vec3;

/**
 * @summary Gestiona la matriz, para operaciones de transformacion.
 * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
 * @author David
 * @version 0.2 - rev.(02/16)


 */



export class TTransform extends TEntidad {
    /** @type {mat4} glMatrix.ARRAY_TYPE(16) Matriz de transformación */
    _matriz;

    /**
     * @summary Carga la matriz identidad
     * @returns {}
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author David - Javi
     * @version 0.2 - rev.(02/14) - rev(02/17)
     */
    identidad() {
      this._matriz=mat4.identity(mat4.create());
        //return mat4.identity(mat4.create());
    }

    /**
     * @summary Copia la matriz dada,
     * para que TTransform lo transforme.
     * @param {mat4} matrix La matriz en glMatrix.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author David
     * @version 0.2 - rev.(02/14)
     */
    cargar(matrix) {
        this._matriz = mat4.clone(matrix);
    }

    /**
     * @summary Transpone la matriz de transformación,
     * también devuelve una copia por si la necesitas.
     * @returns {mat4} Una copia de la matriz transpuesta.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author David
     * @version 0.2 - rev.(02/14)
     */
    transponer() {
        return mat4.transpose(this._matriz, this._matriz);
    }

    /**
     * @summary Invierte la matriz de transformación,
     * también devuelve una copia por si la necesitas.
     * @returns {mat4} Una copia de la matriz inversa.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author David
     * @version 0.2 - rev.(02/14)
     */
    invertir() {
        return mat4.invert(this._matriz, this._matriz);
    }

    // /**
    //  * @summary Multiplica una matriz por un vector,
    //  * una de las matrices es la de transformación,
    //  * también devuelve una copia por si la necesitas.
    //  * @param {mat4} matrix La matriz a múltiplicar.
    //  * @returns {mat4} Una copia de la matriz resultante.
    //  * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
    //  * @author David
    //  * @version 0.2 - rev.(02/14)
    //  */
    // multiplicarVector() {
    //     return mat4.multiply(this._matriz, this._matriz, matrix);
    // }

    /**
     * @summary Multiplica dos matrices,
     * una de las matrices es la de transformación,
     * también devuelve una copia por si la necesitas.
     * @param {mat4} matrix La matriz a múltiplicar.
     * @returns {mat4} Una copia de la matriz resultante.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author David
     * @version 0.2 - rev.(02/14)
     */
    multiplicarMatriz(matrix) {
        return mat4.multiply(matrix, this._matriz, matrix);
    }


    /**
     * @summary Translada la matriz de transformación
     * según el vector que se le da,
     * también devuelve una copia por si la necesitas.
     * @param {float} x Axis X
     * @param {float} y Axis Y
     * @param {float} z Axis Z
     * @returns {mat4} Una copia de la matriz resultante.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author David
     * @version 0.2 - rev.(02/14)
     */
    trasladar(x, y, z) {
        return mat4.translate(this._matriz, this._matriz, vec3.fromValues(x, y, z));
    }

    /**
     * @summary Rota la matriz de transformación,
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
        return mat4.rotate(this._matriz, this._matriz, rads, vec3.fromValues(x, y, z));
    }

    /**
     * @summary Escala la matriz de transformación,
     * también devuelve una copia por si la necesitas.
     * @param {float} x Axis X
     * @param {float} y Axis Y
     * @param {float} z Axis Z
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author David
     * @version 0.2 - rev.(02/14)
     */
    escalar(x, y, z) {
        return mat4.scale(this._matriz, this._matriz, vec3.fromValues(x, y, z));
    }

    /**
     * @summary Apilar matriz actual
     * Multiplicar la matriz de la transformación a la matriz actual
     * @param {mat4} matriz Matriz actual
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=24 | S2.24}
     * @author David
     * @version 0.2 - rev.(02/16) - rev(02/17 Javi)
     * @todo No sale en las diapositivas el tema de la matriz estática,
     * sería necesario preguntar.
     */
    beginDraw() {         // TransformedVector = TranslationMatrix * RotationMatrix * ScaleMatrix * OriginalVector;


        Datos.pushPila(Datos.matriz); // Apilamos matriz actual.
        //console.log(Datos.pila);
        console.log(JSON.stringify(Datos.pila));
        // Multiplicamos matriz actual x matriz de transformacion
        this.multiplicarMatriz(Datos.matriz);
    }

    /**
     * @summary Desapilar matriz y ponerla como actual
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=24 | S2.24}
     * @author David
     * @version 0.2 - rev.(02/16)
     * @todo No sale en las diapositivas el tema de la matriz estática,
     * sería necesario preguntar.
     */
    endDraw() {
        //Datos.matriz = Datos.popPila(); setter de antes
        Datos.setmatriz(Datos.popPila());
        console.log("Pasando por endDraw :D ");
    }
}
