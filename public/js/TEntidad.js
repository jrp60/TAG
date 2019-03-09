//===== Changelog ============================================
//=  - 0.2 Init. S2.15 [David]
//=  - 0.4 Parametro pasada en draw. S4.12 [David]
//============================================================

/**
 * @summary Unica clase virtual de la que deriven todas las entidades
 * @see {@link http://localhost:3000/pdf/S2.pdf#page=15 | S2.15}
 * @author David
 * @version 0.4
 */
export class TEntidad {

    /**
     * @summary Comienzo del dibujo.
     * @param {Number} pasada Fase en la que se encuentra el motor.
     * @see {@link http://localhost:3000/pdf/S4.pdf#page=12 | S4.12}
     * @author David
     * @version 0.4
     */
    beginDraw(pasada){}

    /**
     * @summary Final del dibujo
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=15 | S2.15}
     * @author David
     * @version 0.4
     */
    endDraw(pasada){}
}
