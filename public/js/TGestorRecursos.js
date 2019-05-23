//===== Changelog ============================================
//=  - 0.3 Init. S3.19 [David]
//=  - (02/24) Mejorado para recursos de malla. [David]
//=  - (03/09) Ahora al ser estatico solo tiene una instancia. [David]
//============================================================

import { TRecurso } from './TRecurso.js';
import { TRecursoMalla } from './TRecursoMalla.js';
import { TRecursoTextura } from './TRecursoTextura.js';
import { TRecursoMaterial } from './TRecursoMaterial.js';

/**
 * @summary Gestiona la reserva y liberación de la memoria 
 * para almacenar el recurso
 * @see {@link http://localhost:3000/pdf/S3.pdf#page=19 | S3.19}
 * @author David
 * @version 0.3 - rev.(03/09)
 */
export class TGestorRecursos {

    /** @type {TRecurso[]} */
    static _recursos = [];

    /**
    * @summary Coge un recurso en memoria, si no existe la busca.
    * @param {string} nombre Nombre del recurso
    * @return {TRecurso} El Recurso si existe o -1 si no existe
    * @see {@link http://localhost:3000/pdf/S3.pdf#page=19 | S3.19}
    * @author David
    * @version 0.3 - rev.(03/09)
    */
    static getRecurso(nombre) {
        return new Promise((resolve, reject) => {
            let flag = true;
            for (let i = this._recursos.length - 1; i >= 0; i--) { // Busca el recurso
                if (this._recursos[i].nombre === nombre) {
                    flag = false;
                    const clone = Object.assign(Object.create(this._recursos[i]), this._recursos[i]);
                    clone.nombre = 'Clon de ' + clone.nombre;
                    resolve(clone);
                }
            }
            if (flag) { // Si no existe el recurso, reserva el nombre del recurso en memoria
                const recurso = new TRecursoMalla(nombre);
                const recurso_material = new TRecursoMaterial(nombre);
                this._recursos.push(recurso);
                recurso.existeFichero('malla').then(res => {
                    if (res) { // Si existe recurso lo carga
                        recurso.cargarFichero().then(cargado => {
                            if (cargado) {
                                recurso_material.existeFichero('material').then(m_res => {
                                    if (m_res) {
                                        recurso_material.cargarFichero().then(m_cargado => {
                                            console.log('Material', m_cargado);
                                        });
                                    }
                                    resolve(recurso);
                                });
                            }
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
}
