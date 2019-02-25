//===== Changelog ============================================
//=  - 0.2 Init. S2.17 [David]
//=  - 02/16 Añadiendo atributos a la clase [Javi]
//============================================================

import { TEntidad } from './TEntidad.js';

/**
 * @summary Gestiona los atributos de la camara.
 * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
 * @author David - Javi
 * @version 0.2 - rev.(02/12)
 */
export class TCamara extends TEntidad {

    /** @type {boolean} */
    _esPerspectiva = false;
    /** @type {float} */
    _cercano;
    /** @type {float} */
    _lejano;
    /** @type {float} */
    _superior;
    /** @type {float} */
    _inferior;
    /** @type {float} */
    _izquierda;
    /** @type {float} */
    _derecha;

    /**
     * @summary
     * @param {float} x
     * @param {float} y
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
     * @author David
     * @version 0.2
     */
    setPerspectiva(x, y) {

    }

    /**
     * @summary
     * @param {float} x
     * @param {float} y
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
     * @author David
     * @version 0.2
     */
    setParalela(x, y) {

    }

    /**
     * @summary
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
     * @author David
     * @version 0.2
     */
    beginDraw() {

    }

    /**
     * @summary
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
     * @author David
     * @version 0.2
     */
    endDraw() {

    }
}
