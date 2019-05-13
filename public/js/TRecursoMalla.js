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
 * @type {vec4}
*/
const vec4 = glMatrix.vec4;

/** * glMatrix.ARRAY_TYPE(16) * @type {mat4} **/
const mat4 = glMatrix.mat4;

/**
 * @summary La malla del modelo?
 * @see {@link http://localhost:3000/pdf/S3.pdf#page=20 | S3.20}
 * @author David
 * @version 0.3 - rev.(03/09)
 */
export class TRecursoMalla extends TRecurso {

    // En uso
    /** @type {vec4[]} */
    _v_list;
    /** @type {vec3[]} */
    _n_list;
    /** @type {vec4[]} */
    _t_list;

    /** @type {float[]} */
    _v;
    /** @type {float[]} */
    _n;
    /** @type {float[]} */
    _t;

    // Planificado


    constructor(nombre) {
        super(nombre);
        this._v_list = [];
        this._n_list = [];
        this._t_list = [];
        this._v = [];
        this._n = [];
        this._t = [];
    }

    /**
     * @summary Lee el fichero con el recurso y rellena los buffers de datos
     * (vértices, triángulos, texturas)
     * Para la lectura del fichero podemos implementar un parser propio
     * o utilizar librerías de terceros
     * @returns {Promise<boolean>} si ha cargado el fichero o no
     * @see {@link http://localhost:3000/pdf/S3.pdf#page=20 | S3.20}
     * @author David
     * @version 0.3 - rev.(02/24)
     */
    cargarFichero() {
        return new Promise((resolve, reject) => {
            // Probablente habrá que añadir algo de assimp.
            this._tFichero.cargar('malla').then(result => {
                const lines = result.split("\n");
                for (let i = 0; i < lines.length; i++) {
                    const parts = lines[i].trimRight().split(' ');
                    if (parts.length > 0) {
                        switch (parts[0]) {
                            case 'v':
                                this._v_list.push(
                                    vec4.fromValues(
                                        parseFloat(parts[1]),
                                        parseFloat(parts[2]),
                                        parseFloat(parts[3]),
                                        1.0)
                                );
                                break;
                            case 'vn':
                                this._n_list.push(
                                    vec4.fromValues(
                                        parseFloat(parts[1]),
                                        parseFloat(parts[2]),
                                        parseFloat(parts[3])
                                    ));
                                break;
                            case 'vt':
                                this._t_list.push(
                                    vec2.fromValues(
                                        parseFloat(parts[1]),
                                        parseFloat(parts[2])
                                    )
                                );
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
                                this._v.push(this._v_list[f1[0] - 1]);
                                this._v.push(this._v_list[f2[0] - 1]);
                                this._v.push(this._v_list[f3[0] - 1]);
                                this._t.push(this._t_list[f1[1] - 1]);
                                this._t.push(this._t_list[f2[1] - 1]);
                                this._t.push(this._t_list[f3[1] - 1]);
                                this._n.push(this._n_list[f1[2] - 1]);
                                this._n.push(this._n_list[f2[2] - 1]);
                                this._n.push(this._n_list[f3[2] - 1]);
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
    draw(matrix) {
        const gl = GLOBAL.gl;
        const vertices = twgl.primitives.createAugmentedTypedArray(4, this._v.length);
        for (const coordenadas of this._v) {
            const coordenadas_clonados = vec4.clone(coordenadas);
            vec4.transformMat4(coordenadas_clonados, coordenadas_clonados, matrix);
            for (const coordenada of coordenadas_clonados) {
                vertices.push(coordenada);
            }
        }

        const texturas = twgl.primitives.createAugmentedTypedArray(2, this._t.length);
        for (const t_coord of this._t) {
            const t_coord_clon = vec2.clone(t_coord);
            // vec4.transformMat4(t_coord_clon, t_coord_clon, matrix);
            for (const t_coor of t_coord_clon) {
                texturas.push(t_coor);
            }
        }
        // console.log(texturas);

        const normales = twgl.primitives.createAugmentedTypedArray(3, this._n.length);
        for (const n_coord of this._n) {
            const n_coord_clon = vec3.clone(n_coord);
            // vec4.transformMat4(n_coord_clon, n_coord_clon, matrix);
            for (const n_coor of n_coord_clon) {
                normales.push(n_coor);
            }
        }

        const programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);
        const textures = twgl.createTextures(gl, {
            // a non-power of 2 image
            camarera: {
                src: "/model/textura/female-croupier-2013-03-26.png",
                // src: new Uint8Array([
                //     255,
                //     128,
                //     255,
                //     128,
                //     255,
                //     128,
                //     255,
                //     128,
                // ]),
                // min: gl.LINEAR,
                // format: gl.LUMINANCE,
                // width: 2,
            }
        }, (err, textures, sources) => {
            // wait for the image to load because we need to know it's size
            // startRendering(sources);
            // document.getElementById('formulario').append(sources.camarera);
        });


        const baseHue = Math.random() * 360;
        const arrays = {   //atributes para el shader
            a_position: vertices,
            a_texcoord: texturas,
            a_normal: normales
        };
        let bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
        twgl.resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        var aux = mat4.create();
        mat4.multiply(aux, GLOBAL.projection, GLOBAL.matrizView);
        mat4.multiply(GLOBAL.mvp, aux, GLOBAL.matriz);
        console.log(GLOBAL.intensidad);
        console.log("intensidad");
        const uniforms = {  //uniforms para el shader
            lightposition: GLOBAL.posicionLuz,
            modelmatrix: GLOBAL.matriz,
            mvp: GLOBAL.mvp,
            normalmatrix: GLOBAL.normal,
            u_sampler: textures.camarera,
            u_diffuseMult: chroma.hsv((baseHue + Math.random() * 60) % 360, 0.4, 0.3).gl(),
            u_color: GLOBAL.intensidad
        };
        gl.useProgram(programInfo.program);
        twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
        twgl.setUniforms(programInfo, uniforms);
        // twgl.drawBufferInfo(gl, bufferInfo, gl.LINES);
        // Mode: https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawArrays
        twgl.drawBufferInfo(gl, bufferInfo, gl.TRIANGLES);
    }


}
