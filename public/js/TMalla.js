//===== Changelog ============================================
//=  - 0.2 Init. S2.18 [David]
//=  - (02/25) Metodo draw [Javi]
//=  - (03/04) Integración de comandos OpenGL, pero no
//=  se puede debido a problemas de estructura. [David]
//=  - (03/09) Integración de comandos OpenGL,
//=  con estructura diferente. [David]
//=  - (05/23) Dibujado OpenGL en Draw. Pendiente:
//=  que las luces sean con Phong para materiales. [David]
//============================================================

import { TEntidad } from './TEntidad.js';
import { TFichero } from './TFichero.js';
import { TGestorRecursos } from './TGestorRecursos.js';
import { GLOBAL } from './GLOBAL.js';

/** * glMatrix.ARRAY_TYPE(16) * @type {mat4} **/
const mat4 = glMatrix.mat4;

/**
 * @summary Objeto visualizable
 * @see {@link http://localhost:3000/pdf/S2.pdf#page=18 | S2.18}
 * @author David
 * @version 0.2 - rev.(03/09)
 */
export class TMalla extends TEntidad {
  /** @type {Promise<Object>} */
  _recursos;

  _matriz;

  /**
   * @summary Carga la malla de un modelo.
   * @param {TFichero} fichero El fichero a cargar.
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=18 | S2.18}
   * @author David
   * @version 0.2 - rev.(03/09)
   */
  constructor(fichero) {
    super();
    this._recursos = TGestorRecursos.getRecurso(fichero);
  }

  /**
   * @summary Objeto visualizable. LLama al draw del TRecursoMalla asignado si es la pasada de dibujar
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=25 | S2.25}
   * @author Javi - David
   * @version 0.2 - rev.(05/23)
   */
  beginDraw(pasada) {
    if (pasada === GLOBAL.DIBUJAR) {
      if (this._recursos !== undefined) {
        this._matriz = GLOBAL.matriz;
        this._recursos.then(obj => {
          obj.malla.draw(this._matriz); // Calcula las nuevas posiciones de la malla
          this.draw(obj);
        });
      } else {
        console.log("[ERROR] Hay un problema con el gestor de recursos")
      }
    }
  }

  /**
   * @summary Proceso de OpenGL
   * @author David
   * @version 0.2 - rev.(05/23)
   * @notes El nodo Malla es el último, 
   * realmente opino que deberia haber un nodo llamado TDibujado
   * o algo así parecido, porque... seguido de TMalla... no deberia haber...
   * ¿TMaterial? ¿TTextura? Y finalmente TDibujado
   */
  draw(obj, i_mat = 0) {
    console.log(obj.malla);
    const gl = GLOBAL.gl;
    const programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);
    // TODO: Cuando Javi tenga las luces con Phong, se puede colocar los materiales.
    // console.log(obj.material[i_mat]);
    const arrays = {   //atributes para el shader
      a_position: obj.malla.vertices,
      a_texcoord: obj.malla.texturas,
      a_normal: obj.malla.normales
    };
    let bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
    twgl.resizeCanvasToDisplaySize(gl.canvas);
    var aux = mat4.create();
    mat4.multiply(aux, GLOBAL.projection, GLOBAL.matrizView);
    mat4.multiply(GLOBAL.mvp, aux, GLOBAL.matriz);
    const uniforms = {  //uniforms para el shader
      lightposition: GLOBAL.posicionLuz,
      modelmatrix: GLOBAL.matriz,
      mvp: GLOBAL.mvp,
      normalmatrix: GLOBAL.normal,
      u_color: GLOBAL.intensidad
    };
    gl.useProgram(programInfo.program);
    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
    twgl.setUniforms(programInfo, uniforms);
    // twgl.drawBufferInfo(gl, bufferInfo, gl.LINES);
    // Mode: https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawArrays
    twgl.drawBufferInfo(gl, bufferInfo, gl.TRIANGLES);
  }

  /**
   * @summary Objeto visualizable.
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=18 | S2.18}
   * @author David
   * @version 0.2 - rev.(03/09)
   */
  endDraw(pasada) {
    if (pasada === GLOBAL.DIBUJAR) {
    }
  }

}
