//===== Changelog ============================================
//=  - 0.3 Init. S3.19 [David]
//=  - (02/24) Mejorado para recursos de malla. [David] (Sin Terminar)
//============================================================

import { TEntidad } from './TEntidad.js';
import { TRecurso } from './TRecurso.js';

import { TRecursoMalla } from './TRecursoMalla.js';
import { TRecursoTextura } from './TRecursoTextura.js';
import { TRecursoMaterial } from './TRecursoMaterial.js';

/**
 * @summary Gestiona la reserva y liberación de la memoria 
 * para almacenar el recurso
 * @see {@link http://localhost:3000/pdf/S3.pdf#page=19 | S3.19}
 * @author David
 * @version 0.3 
 */
export class TGestorRecursos extends TEntidad {

    /** @type {TRecurso[]} */
    _recursos;

    /**
     * Constructor por defecto e inicializa el array de TRecurso
     */
    constructor() {
        super();
        this._recursos = [];
    }

    /**
    * @summary Coge un recurso en memoria, si no existe la busca.
    * @param {string} nombre Nombre del recurso
    * @return {TRecurso} El Recurso si existe o -1 si no existe
    * @see {@link http://localhost:3000/pdf/S3.pdf#page=19 | S3.19}
    * @author David
    * @version 0.3
    */
    getRecurso(nombre) {
        return new Promise((resolve, reject) => {
            let flag = true;
            for (let i = this._recursos.length - 1; i >= 0; i--) { // Busca el recurso
                if (this._recursos[i].getNombre() === nombre) {
                    flag = false;
                    resolve(this._recursos[i]);
                }
            }
            if (flag) { // Si no existe el recurso, reserva el nombre del recurso en memoria
                const recurso = new TRecursoMalla(nombre);
                this._recursos.push(recurso);
                recurso.existeFichero(nombre).then(res => {
                    if (res) { // Si existe recurso lo carga
                        recurso.cargarFichero(nombre).then(cargado => {
                            if (cargado)
                                resolve(recurso);
                        });
                    } else { // Si no lo elimina de la reserva
                        for (let i = this._recursos.length - 1; i >= 0; i--) {
                            if (this._recursos[i].getNombre() === nombre) {
                                this._recursos.splice(i, 1);
                                break;
                            }
                        }
                        resolve(-1);
                    }
                });
            }
        });
    }

    /**
    * @summary
    * @see {@link http://localhost:3000/pdf/S3.pdf#page=19 | S3.19}
    * @author David
    * @version 0.3
    */
    beginDraw() {

    }

    /**
    * @summary 
    * @see {@link http://localhost:3000/pdf/S3.pdf#page=19 | S3.19}
    * @author David
    * @version 0.3
    */
    endDraw() {

    }
}
