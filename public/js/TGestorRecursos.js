//===== Changelog ============================================
//=  - 0.3 Init. S3.19 [David]
//============================================================

import { TEntidad } from './TEntidad.js';
import { TRecurso } from './TRecurso.js';

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
    * @summary
    * @param {string} nombre Nombre del recurso
    * @return {TRecurso}  
    * @see {@link http://localhost:3000/pdf/S3.pdf#page=19 | S3.19}
    * @author David
    * @version 0.3
    */
    getRecurso(nombre) {
        // Note: Seguramente no sea asi, ya que busca una propiedad que todavia no esta como atributo.
        for (let i = this._recursos.length; i > 0; i--) {
            if (recursos[i].getNombre() === nombre)
                return recursos[i];
        }
        /*
                TRecurso *rec;
             rec = crear nuevo TRecurso;  
             rec->cargarFichero (nombre);  
             recursos->Añadir(rec); 
                return rec; // TRecurso
             */
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
