//===== Changelog ============================================
//=  - 0.2 Init. S2.18 [David]
//=  - 02/25 - Metodo draw [Javi]
//============================================================

import { TEntidad } from './TEntidad.js';
import { TRecursoMalla } from './TRecursoMalla.js';
import { TFichero } from './TFichero.js';

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
     * @version 0.2
     */
    cargarMalla(fichero) {

    }

    /**
     * @summary Objeto visualizable. LLama al draw del TRecursoMalla asignado si es la pasada de dibujar
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=25 | S2.25}
     * @author  Javi
     * @version 0.3
     */
    beginDraw(pasada) {
      if(pasada==3){
        this._malla.draw();
      }
    }

    /**
     * @summary Objeto visualizable.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=18 | S2.18}
     * @author David
     * @version 0.2
     */
    endDraw() {

    }
}
