//===== Changelog ============================================
//=  - 0.3 Init. S3.20 [David]
//============================================================
//=  COPIA DIRECTA DE TRECURSOSMALLA MEJOR IGNORAR.
//============================================================

import { TFichero } from './TFichero.js';
import { TRecurso } from './TRecurso.js';

/** @type {vec2} glMatrix.ARRAY_TYPE(2)*/
const vec2 = glMatrix.vec2;
/** @type {vec3} glMatrix.ARRAY_TYPE(3)*/
const vec3 = glMatrix.vec3;

/**
 * @summary La malla del modelo?
 * @see {@link http://localhost:3000/pdf/S3.pdf#page=20 | S3.20}
 * @author David
 * @version 0.3
 */
export class TRecursoTextura extends TRecurso {
    /** @type {vec3[]} */
    _vertices;
    /** @type {vec3[]} */
    _normales;
    /** @type {vec2[]} */
    _texturas;
    /** @type {long[]} */
    _vertTriangulos;
    /** @type {long[]} */
    _normTriangulos;
    /** @type {long[]} */
    _textTriangulos;
    /** @type {int} */
    _nTriangulos;

    /**
     * @summary Lee el fichero con el recurso y rellena los buffers de datos 
     * (vértices, triángulos, texturas) 
     * Para la lectura del fichero podemos implementar un parser propio 
     * o utilizar librerías de terceros 
     * @param {string} nombre Ruta de fichero
     * @returns {boolean} si ha cargado el fichero o no
     * @see {@link http://localhost:3000/pdf/S3.pdf#page=20 | S3.20}
     * @author David 
     * @version 0.3
     */
    cargarFichero(nombre) {
        // Probablente habrá que añadir algo de assimp.
        const tFichero = new TFichero('malla', nombre);
        tFichero.cargar().then(result => {
            const lines = result.split("\n");
            this._vertices = [];
            this._normales = [];
            this._texturas = [];
            const cara = [];

            for (let i = 0; i < lines.length; i++) {
                const parts = lines[i].trimRight().split(' ');
                if (parts.length > 0) {
                    switch (parts[0]) {
                        case 'v':
                            this._vertices.push(
                                vec3.fromValues(
                                    parseFloat(parts[1]),
                                    parseFloat(parts[2]),
                                    parseFloat(parts[3])
                                ));
                            break;
                        case 'vn':
                            this._normales.push(
                                vec3.fromValues(
                                    parseFloat(parts[1]),
                                    parseFloat(parts[2]),
                                    parseFloat(parts[3])
                                ));
                            break;
                        case 'vt':
                            this._texturas.push(
                                vec2.fromValues(
                                    parseFloat(parts[1]),
                                    parseFloat(parts[2])
                                ));
                            break;
                        case 'f':
                            const f1 = parts[1].split('/');
                            const f2 = parts[2].split('/');
                            const f3 = parts[3].split('/');
                            /**
                             * La posición es temp_vertices[ vertexIndex-1 ] 
                             * (aquí tenemos que poner el -1 porque en C++ 
                             * el indexamiento comienza en 0 
                             * y para los OBJ comienza en 1.)
                             */

                            [].push.apply(cara, this._vertices[parseInt(f1[0]) - 1]);
                            [].push.apply(cara, this._normales[parseInt(f1[2]) - 1]);
                            [].push.apply(cara, this._vertices[parseInt(f2[0]) - 1]);
                            [].push.apply(cara, this._normales[parseInt(f2[2]) - 1]);
                            [].push.apply(cara, this._vertices[parseInt(f3[0]) - 1]);
                            [].push.apply(cara, this._normales[parseInt(f3[2]) - 1]);
                            break;
                            

                    }
                }
            }
            var vertexCount = cara.length / 6;
            console.log("Loaded mesh with " + vertexCount + " vertices");

            console.log(this._vertices);
            console.log(this._normales);
            console.log(new Float32Array(cara));
            console.log({
                primitiveType: 'TRIANGLES',
                vertices: new Float32Array(cara),
                vertexCount: vertexCount
            })
            return true;
        });

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