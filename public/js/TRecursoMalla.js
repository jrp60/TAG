//===== Changelog ============================================
//=  - 0.3 Init. S3.20 [David]
//============================================================

import { TRecurso } from './TRecurso.js';

/**
 * @summary La malla del modelo?
 * @see {@link http://localhost:3000/pdf/S3.pdf#page=20 | S3.20}
 * @author David
 * @version 0.3
 */
export class TRecursoMalla extends TRecurso {
    /** @type {float} */
    _vertices;
    /** @type {float} */
    _normales;
    /** @type {float} */
    _texturas;
    /** @type {long} */
    _vertTriangulos;
    /** @type {long} */
    _normTriangulos;
    /** @type {long} */
    _textTriangulos;
    /** @type {int} */
    _nTriangulos;

    /**
     * @summary Lee el fichero con el recurso y rellena los buffers de datos 
     * (vértices, triángulos, texturas) 
     * Para la lectura del fichero podemos implementar un parser propio 
     * o utilizar librerías de terceros 
     * @param {string} nombre Ruta de fichero
     * @see {@link http://localhost:3000/pdf/S3.pdf#page=20 | S3.20}
     * @author David 
     * @version 0.3
     */
    cargarFichero(nombre) {
    }

    /**
     * @summary Vuelca los buffers de datos en OpenGL.
     * Consejo: utilizar buffers de datos adaptados a los que maneja OpenGL:
     * La carga puede ser menos eficiente (pero se ejecuta en tiempo de carga)
     * La visualización tiene máxima eficiencia (más crítica)
     * @see {@link http://localhost:3000/pdf/S3.pdf#page=20 | S3.20}
     * @author David 
     * @version 0.3
     */
    draw() {
    }


}