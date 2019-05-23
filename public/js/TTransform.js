//===== Changelog ============================================
//=  - 0.2 Init. S2.16 [David]
//=  - 01/28 - Rafa recomienda el uso de la libreria GLM [David]
//=  - 02/14 - Termina de transcribir lo que tenía de C++ a JS [David]
//=  - 02/16 - Repaso de diapositiva 2 [David]
//=  - 0.4 A partir de esta version se puede comprender como funciona y
//=  las razones del uso de algunos metodos.
//=  - 03/09 - Se han eliminado varios metodos, ya que al usar
//=  una libreria no es necesario que lo documentemos en si.
//=  Sin embargo para un nuevo motor gráfico es recomendable
//=  crearlos, por si no existiese otra libreria, o intentasemos
//=  teorificar con mas dimensiones.
//=    - Las funciones que aparentemente no sirven,
//=    son temporalmente estaticas.
//============================================================

import { TEntidad } from './TEntidad.js';
import { GLOBAL } from './GLOBAL.js';

/**
 * glMatrix.ARRAY_TYPE(16)
 * @type {mat4}
 * */
const mat4 = glMatrix.mat4;

/**
 * glMatrix.ARRAY_TYPE(3)
 * @type {vec3}
 */
const vec3 = glMatrix.vec3;

/**
 * @summary Gestiona la matriz, para operaciones de transformacion.
 * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
 * @author David
 * @version 0.4 - rev.(03/09)
 */
export class TTransform extends TEntidad {

    /**
     * glMatrix.ARRAY_TYPE(16) - Matriz de transformación
     * @type {mat4}
     * */
    _matriz;

    /**
    * @summary Crea una entidad transformación,
    * si no se le especifica su cometido,
    * se quedará en matriz identidad.
    * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
    * @author Javi - David
    * @version 0.4 - rev.(03/09)
    */
    constructor() {
        super();
        this._matriz = mat4.create();
    }

    /**
     * @summary Copia la matriz dada en la matriz transformacion
     * @param {mat4} matrix La matriz en glMatrix.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author David
     * @version 0.4 - rev.(03/09)
     * @todo (Se borrará en un futuro, al no ser necesario).
     */
    static cargar(matrix) {
        this._matriz = mat4.clone(matrix);
    }

    /**
     * @summary Transpone la matriz de transformación,
     * también devuelve una copia por si la necesitas.
     * @returns {mat4} Una copia de la matriz transpuesta.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author David
     * @version 0.4 - rev.(03/09)
     * @todo (Se borrará en un futuro, al no ser necesario).
     */
    static transponer() {
        return mat4.transpose(this._matriz, this._matriz);
    }

    /**
     * @summary Invierte la matriz de transformación,
     * también devuelve una copia por si la necesitas.
     * @returns {mat4} Una copia de la matriz inversa.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author David
     * @version 0.4 - rev.(03/09)
     * @todo (Se borrará en un futuro, al no ser necesario).
     */
    static invertir() {
        return mat4.invert(this._matriz, this._matriz);
    }

    /**
     * @summary Convierte la matriz de transformación en translación
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
     * @summary Convierte la matriz de transformación en rotación
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
     * @summary Convierte la matriz de transformación en escalado
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
     * @author David - Javi
     * @version 0.4 - rev.(03/09)
     */
    beginDraw() { // TransformedVector = TranslationMatrix * RotationMatrix * ScaleMatrix * OriginalVector;
        GLOBAL.pushPila(mat4.clone(GLOBAL.matriz)); // Apilamos matriz actual.
        mat4.multiply(GLOBAL.matriz, this._matriz, GLOBAL.matriz); // Multiplicar la matriz de la transformación a la matriz actual
        var invert = mat4.create();
        mat4.invert(invert, GLOBAL.matriz);
        mat4.transpose(GLOBAL.normal, invert ); //
        // console.log("NORMALES");
        // console.log(GLOBAL.normal);
    }

    /**
     * @summary Desapilar matriz y ponerla como actual
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=24 | S2.24}
     * @author David
     * @version 0.4 - rev.(03/09)
     */
    endDraw() {
        GLOBAL.matriz = GLOBAL.popPila();
    }
}
