//===== Changelog ============================================
//=  - 0.2 Init. S2.18 [David]
//=  - 02/25 - Metodo draw [Javi]
//=  - 03/04 - Integración de comandos OpenGL, pero no
//=  se puede debido a problemas de estructura. [David]
//=  - 03/09 - Integración de comandos OpenGL, 
//=  con estructura diferente. [David]
//============================================================

import { TEntidad } from './TEntidad.js';
import { TRecursoMalla } from './TRecursoMalla.js';
import { TFichero } from './TFichero.js';
import { TGestorRecursos } from './TGestorRecursos.js';
import { GLOBAL } from './GLOBAL.js';

/**
 * @summary Objeto visualizable
 * @see {@link http://localhost:3000/pdf/S2.pdf#page=18 | S2.18}
 * @author David
 * @version 0.2 - rev.(03/09)
 */
export class TMalla extends TEntidad {

  /** @type {Promise<TRecursoMalla>} */
  _malla;

  /**
   * @summary Carga la malla de un modelo.
   * @param {TFichero} fichero El fichero a cargar.
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=18 | S2.18}
   * @author David
   * @version 0.2 - rev.(03/09)
   */
  constructor(fichero) {
    super();
    this._malla = TGestorRecursos.getRecurso(fichero);
  }

  /**
   * @summary Objeto visualizable. LLama al draw del TRecursoMalla asignado si es la pasada de dibujar
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=25 | S2.25}
   * @author Javi - David
   * @version 0.2 - rev.(03/09)
   */
  beginDraw(pasada) {
    if (pasada === GLOBAL.DIBUJAR) {
      const gl = GLOBAL.gl;
      const canvas = GLOBAL.canvas;
      // ========================= 1. Preparar Canvas =========================
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.enable(gl.DEPTH_TEST);          // Activa la comparación de profundidad y actualiza el buffer de profundidad. 
      gl.enable(gl.CULL_FACE);           // Activa la eliminación de los polígonos no visibles.
      gl.depthFunc(gl.LEQUAL);           // Objetos cercanos opacan objetos lejanos.
      gl.cullFace(gl.BACK);              // Elimina los poligonos traseros.
      gl.clearColor(0.5, 0.5, 0.5, 0.9); // Cambia el fondo del canvas.
      // Limpiar el buffer de color asi como el de profundidad
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);    // Eliminar/sustituye el color del canvas anterior.
    }
  }

  /**
   * @summary Objeto visualizable.
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=18 | S2.18}
   * @author David
   * @version 0.2 - rev.(03/09)
   */
  endDraw(pasada) {
    if (pasada === GLOBAL.DIBUJAR) {
      if (this._malla !== undefined) {
        this._malla.then(recursoMalla => {
          recursoMalla.draw();
        });
      }
    }
  }

}
