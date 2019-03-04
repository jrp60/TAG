//===== Changelog ============================================
//=  - 0.2 Init. S2.18 [David]
//=  - 02/25 - Metodo draw [Javi]
//=  - 03/04 - Integración de comandos OpenGL, pero no
//= se puede debido a problemas de estructura. [David]
//============================================================

import { TEntidad } from './TEntidad.js';
import { TRecursoMalla } from './TRecursoMalla.js';
import { TFichero } from './TFichero.js';
import { TGestorRecursos } from './TGestorRecursos.js';
import { Datos } from './Datos.js';


/**
 * @summary Objeto visualizable
 * @see {@link http://localhost:3000/pdf/S2.pdf#page=18 | S2.18}
 * @author David
 * @version 0.2
 */
export class TMalla extends TEntidad {

  /** @type {TRecursoMalla} */
  _malla;

  /**
   * @summary Carga la malla de un modelo.
   * @param {TFichero} fichero El fichero a cargar.
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=18 | S2.18}
   * @author David
   * @version 0.2 - rev.(03/04)
   */
  cargarMalla(fichero) {
    const grecursos = new TGestorRecursos();
    grecursos.getRecurso(fichero).then(res => {
      this._malla = res;
    });
  }

  /**
   * @summary Objeto visualizable. LLama al draw del TRecursoMalla asignado si es la pasada de dibujar
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=25 | S2.25}
   * @author  Javi
   * @version 0.3
   */
  beginDraw(pasada) {
    if (pasada == 3) {
      this._malla.draw();
    }
  }



  /**
   * @summary Objeto visualizable.
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=18 | S2.18}
   * @author David
   * @version 0.2 - rev.(03/04)
   */
  endDraw() {
    if (this._malla !== undefined) {
      let scene = this._malla.scene;
      if (scene === undefined) {
        console.log('problema de sincronia');
        return;
      }
      let gl = Datos.gl;
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.useProgram(scene.program);

      var delta = (0.125 * Math.PI) / (timestamp - previousTimestamp);
      // console.log(scene.object);
      gl.uniformMatrix4fv(
        scene.program.modelMatrixUniform, gl.FALSE,
        scene.object.modelMatrix);

      var normalMatrix = mat3.create();
      mat3.normalFromMat4(
        normalMatrix,
        mat4.multiply(
          mat4.create(),
          scene.object.modelMatrix,
          scene.viewMatrix));
      gl.uniformMatrix3fv(
        scene.program.normalMatrixUniform, gl.FALSE, normalMatrix);
      gl.bindBuffer(gl.ARRAY_BUFFER, scene.object.vertexBuffer);
      gl.drawArrays(gl.TRIANGLES, 0, scene.object.vertexCount);

      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.useProgram(null);

    }
  }



}
