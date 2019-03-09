//===== Changelog ============================================
//=  - 0.3 Init. S3.20 [David]
//=  - 02/24 - Añadido constructor por comodidad. [David]
//=  - 03/09 - Set y get estandarizados. [David] 
//============================================================

/**
 * @summary Aplicaciones, herramientas, dispositivos (periféricos)
 * y capacidades con los que cuenta una computadora.
 * @see {@link http://localhost:3000/pdf/S3.pdf#page=20 | S3.20}
 * @author David
 * @version 0.3 - rev.(03/09)
 */
export class TRecurso {
    /** @type {String} */
    _nombre;

    constructor(nombre) {
        this._nombre = nombre;
    }
    /**
     * @summary Getter del nombre del recurso.
     * @returns {String} nombre Nombre del recurso
     * @see {@link http://localhost:3000/pdf/S3.pdf#page=20 | S3.20}
     * @author David 
     * @version 0.3 - rev.(03/09)
     */
    get nombre() {
        return this._nombre;
    }

    /**
     * @summary Setter del nombre del recurso.
     * @param {TRecurso} nombre Nombre del recurso
     * @see {@link http://localhost:3000/pdf/S3.pdf#page=20 | S3.20}
     * @author David 
     * @version 0.3 - rev.(03/09)
     */
    set nombre(nombre) {
        this._nombre = nombre;
    }
}
