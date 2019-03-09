//===== Changelog ============================================
//=  - 0.3 Init. S3.20 [David]
//=  - 02/24 - Gestion de recursos malla. [David]
//=  - 03/04 - Integración de comandos OpenGL, pero no
//= se puede debido a problemas de estructura. [David]
//=  - 03/09 - Código más limpio y menos rebuscado. [David]
//============================================================

import { TFichero } from './TFichero.js';
import { TRecurso } from './TRecurso.js';
import { GLOBAL } from './GLOBAL.js';

/** 
 * glMatrix.ARRAY_TYPE(2)
 * @type {vec2} 
 * */
const vec2 = glMatrix.vec2;

/** 
 * glMatrix.ARRAY_TYPE(3)
 * @type {vec3}
 */
const vec3 = glMatrix.vec3;

/**
 * glMatrix.ARRAY_TYPE(4)
 * @type {vec3}
*/
const vec4 = glMatrix.vec4;

/**
 * @summary La malla del modelo?
 * @see {@link http://localhost:3000/pdf/S3.pdf#page=20 | S3.20}
 * @author David
 * @version 0.3 - rev.(03/09)
 */
export class TRecursoMalla extends TRecurso {

    // En uso
    /** @type {vec4[]} */
    _vertices;
    /** @type {int[]} */
    _indices;


    // Planificado
    /** @type {vec3[]} */
    _normales;
    /** @type {vec2[]} */
    _texturas;
    /** @type {int} */
    _nTriangulos;

    constructor(nombre) {
        super(nombre);
        this._vertices = [];
        this._normales = [];
        this._texturas = [];
        this._indices = [];
        this._cara = [];
    }

    /**
     * @summary Lee el fichero con el recurso y rellena los buffers de datos 
     * (vértices, triángulos, texturas) 
     * Para la lectura del fichero podemos implementar un parser propio 
     * o utilizar librerías de terceros 
     * @param {string} nombre Ruta de fichero
     * @returns {boolean} si ha cargado el fichero o no
     * @see {@link http://localhost:3000/pdf/S3.pdf#page=20 | S3.20}
     * @author David 
     * @version 0.3 - rev.(02/24)
     */
    cargarFichero(nombre) {
        return new Promise((resolve, reject) => {
            // Probablente habrá que añadir algo de assimp.
            this._tFichero.cargar('malla').then(result => {
                const lines = result.split("\n");
                for (let i = 0; i < lines.length; i++) {
                    const parts = lines[i].trimRight().split(' ');
                    if (parts.length > 0) {
                        switch (parts[0]) {
                            case 'v':
                                this._vertices.push(
                                    vec4.fromValues(
                                        parseFloat(parts[1]),
                                        parseFloat(parts[2]),
                                        parseFloat(parts[3]),
                                        1.0)
                                );
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
                                  * (aquí tenemos que poner el -1 porque en JavaScript
                                  * el indexamiento comienza en 0 
                                  * y para los OBJ comienza en 1.)
                                  */
                                this._indices.push(f1[0] - 1);
                                this._indices.push(f2[0] - 1);
                                this._indices.push(f3[0] - 1);

                                break;
                        }
                    }
                }
                resolve(true);
            });
        });
    }

    /**
     * @summary Vuelca los buffers de datos en OpenGL.
     * Consejo: utilizar buffers de datos adaptados a los que maneja OpenGL:
     * La carga puede ser menos eficiente (pero se ejecuta en tiempo de carga)
     * La visualización tiene máxima eficiencia (más crítica)
     * @see {@link http://localhost:3000/pdf/S3.pdf#page=20 | S3.20}
     * @author David 
     * @version 0.3 - rev (03/09)
     */
    draw() {
        const gl = GLOBAL.gl;
        // ========================= 2. Preparar Shaders =========================
        // Linkear vertex y fragment
        // import { Vertex, Fragment } from './js/Shaders.js';

        // var vs = gl.createShader(gl.VERTEX_SHADER);
        // gl.shaderSource(vs, Vertex);
        // gl.compileShader(vs);

        // const fs = gl.createShader(gl.FRAGMENT_SHADER);
        // gl.shaderSource(fs, Fragment);
        // gl.compileShader(fs);


        // Vertex shader source code ProjectionMatrix * ViewMatrix *ModelMatrix *
        /**
         * 
            'uniform mat4 ModelMatrix; // MATRIZ DE MODELO' +
            'uniform mat4 ViewMatrix; // MATRIZ DE VISTA (INVERSA DE LA CAMARA)' +
            'uniform mat4 ProjectionMatrix; // MATRIZ DE PROYECCIÓN' +

         */
        const vertices_transformados = [];
        for (const coordenadas of this._vertices) {
            vec4.transformMat4(coordenadas, coordenadas, GLOBAL.matriz);
            for (const coordenada of coordenadas) {
                vertices_transformados.push(coordenada);
            }
        }
        var vertCode =
            'attribute vec4 coordinates;' +
            'void main(void) {' +
            ' gl_Position = coordinates;' +
            '}';
        var vs = gl.createShader(gl.VERTEX_SHADER);// Create a vertex shader object
        gl.shaderSource(vs, vertCode); // Attach vertex shader source code
        gl.compileShader(vs);        // Compile the vertex shader

        // Fragment shader source code
        var fragCode =
            'void main(void) {' +
            ' gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);' +
            '}';

        var fs = gl.createShader(gl.FRAGMENT_SHADER);  // Create fragment shader object 
        gl.shaderSource(fs, fragCode); // Attach fragment shader source code
        gl.compileShader(fs); // Compile the fragmentt shader

        const program = gl.createProgram(); // Crea el programa de usuario que usará la GPU.
        gl.attachShader(program, vs);       // Adjunta el Vertex Shader al programa.
        gl.attachShader(program, fs);       // Adjunta el Fragment Shader al programa.
        gl.linkProgram(program);            // Enlaza el programa al API.
        gl.useProgram(program);             // Usa el programa al API.

        // ========================= 3. Asociar buffers a los Shaders =========================
        const vertex_buffer = gl.createBuffer(); // Buffer de vertices
        gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer); // Enlaza el buffer de vertices a su tipo.
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices_transformados), gl.STATIC_DRAW); // Mete los datos del buffer.

        const index_buffer = gl.createBuffer(); // Buffer de indices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer); // Enlaza el buffer de indices a su tipo.
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this._indices), gl.STATIC_DRAW); // Mete los datos del buffer.

        // ========================= 4. Recoger atributos de los Shaders =========================
        const coord = gl.getAttribLocation(program, "coordinates"); // Get the attribute location

        // ========================= 5. Pasar información a los atributos de los Shaders =========================
        gl.vertexAttribPointer(coord, 4, gl.FLOAT, false, 0, 0); // Point an attribute to the currently bound VBO

        // ========================= 6. Habilitar atributos de los Shaders =========================
        gl.enableVertexAttribArray(coord);

        // ========================= 7. Dibujar modelo =========================
        // Draw the triangle
        gl.drawElements(gl.TRIANGLES, this._indices.length, gl.UNSIGNED_SHORT, 0);
    }


}