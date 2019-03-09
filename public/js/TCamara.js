//===== Changelog ============================================
//=  - 0.2 Init. S2.17 [David]
//=  - 02/16 Añadiendo atributos a la clase [Javi]
//=  - 03/09 - Constructor y uso de las constantes. [David]
//============================================================

import { TEntidad } from './TEntidad.js';
import { GLOBAL } from './GLOBAL.js';

/**
 * @summary Gestiona los atributos de la camara.
 * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
 * @author David - Javi
 * @version 0.2 - rev.(03/09)
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
  /** @type {boolean} */
  _activa;

  constructor() {
    super();
  }
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
   * @summary BeginDraw de TCamara
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
   * @author David - Javi
   * @version 0.2 - rev.(03/09)
   * @todo Hay que hacer la camara
   */
  beginDraw(pasada) {
    if (pasada === GLOBAL.CAMARA && this._activa === true) {
      // obtener la matriz de posici�n de la c�mara (MODELVIEW)
      // invertir esa matriz y devolverla para utilizarla en el dibujado
    }

  }

  /**
   * @summary EndDraw de TCamara
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
   * @author David
   * @version 0.2 - rev.(03/09)
   * @todo Hay que hacer la camara
   */
  endDraw(pasada) {
    if (pasada === GLOBAL.CAMARA && this._activa === true) {
    }
  }
}
