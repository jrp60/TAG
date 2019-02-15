//===== Changelog ============================================
//=  - 0.2 Init. S2.17 [David]
//=  - 0.4 Parametro pasada en beginDraw. S4.12 [David]
//============================================================

import { TEntidad } from './TEntidad.js';
import { TColor } from './TColor.js';

/**
 * @summary Gestiona los atributos de la luz.
 * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
 * @author David - Javi
 * @version 0.4 rev(02/14)
 */
export class TLuz extends TEntidad {

    /** @type {TColor} */
    _intensidad;
    /** @type {int} */
    _x;
    /** @type {int} */
    _y;
    /** @type {int} */
    _z;

    /**
     * @summary Setter de intensidad.
     * @param {TColor} color Una entidad TColor
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
     * @author David
     * @version 0.2
     */
    setIntensidad(color) {
        this._intensidad = color;
    }

    /**
     * @summary Getter de intensidad.
     * @returns {TColor} El color.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
     * @author David
     * @version 0.2
     */
    getIntensidad() {
        return this._intensidad;
    }
    /**
     * @summary Getter de intensidad.
     * @returns {TColor} El color.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
     * @author Javi
     * @version 0.1
     */
    setPosicion(x,y,z) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    /**
     * @summary
     * @param {Number} pasada Fase en la que se encuentra el motor.
     * @see {@link http://localhost:3000/pdf/S4.pdf#page=12 | S4.12}
     * @author David
     * @version 0.4
     */
    beginDraw(pasada) { // int
        /*
        si(pasada == LUZ && luz activa) {
            obtener la posici�n de la luz de la matriz activa(MODELVIEW)
            activar la luz en la librer�a gr�fica
            colocar la luz en la posici�n obtenida
        }
          si (pasada == CAMARA && camara activa) {
          obtener la matriz de posici�n de la c�mara (MODELVIEW)
          invertir esa matriz y devolverla para utilizarla en el dibujado
          }
        */
    }
}
