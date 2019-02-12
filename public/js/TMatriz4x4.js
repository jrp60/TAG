//===== Changelog ============================================
//=  - 0.2 Init. S2.16 [David]
//=  - 01/28  Rafa recomienda el uso de la libreria GLM [David]
//============================================================

/**
 * @summary Aparentemente es una clase auxiliar para gestionar la matriz
 * de los modelos, todavía se desconoce si tiene algo especial.
 * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
 * @author David
 * @version 0.2 - rev.(01/28)
 */
export class TMatriz4x4 {

    /** @type {TMatriz4x4} */
    _matriz;


    /**
     * @summary Getter de Matriz.
     * @returns {TMatriz4x4} Devuelve la matriz.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author David
     * @version 0.2 - rev.(01/28)
     */
    getMatriz() {
        return this._matriz;
    }


    /**
     * @summary Setter de Matriz.
     * @param {TMatriz4x4} matriz La matriz.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author David
     * @version 0.2 - rev.(01/28)
     */
    setMatriz(matriz) {
        this._matriz = matriz;
    }
}
