//===== Changelog ============================================
//=  - 0.3 Init. S3.20 [David]
//=  - 02/24 - Añadido constructor por comodidad. [David]
//=  - 03/09 - Set y get estandarizados; abstraccion de TFichero. [David] 
//============================================================

import { TFichero } from './TFichero.js';
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

    /** @type {TFichero} */
    _tFichero;
    constructor(nombre) {
        this._nombre = nombre;
        this._tFichero = new TFichero(nombre);
    }


    /**
     * @summary Busca si existe el fichero
     * @param {string} tipo Tipo de fichero
     * @returns {Promise<boolean>} si ha existe el fichero o no
     * @author David 
     * @version 0.3 - rev (03/09)
     */
    existeFichero(tipo) {
        return this._tFichero.existeFichero(tipo);
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
