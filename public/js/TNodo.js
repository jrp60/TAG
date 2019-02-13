//===== Comments =============================================
//= Debe tener:
//=		- Geometría
//=		- Texturas
//=		- Animaciones
//=		- Luces
//=		- Cámaras
//=		- Transformaciones
//===== Changelog ============================================
//=  - 0.2 Init. S2.14 [David]
//============================================================
import { TEntidad } from './TEntidad.js';

/**
 * @summary Dato que define un escenario virtual y controla
 * su proceso de dibujado
 * @see {@link http://localhost:3000/pdf/S2.pdf#page=7 | S2.7}
 * @author David
 * @version 0.2
 */
export class TNodo extends TEntidad {

    /** @type {TEntidad} */
    _entidad;
    /** @type {TNodo[]} */
    _hijos;
    /** @type {TNodo} */
    _padre;

    /**
     * @summary Añade un hijo al array hijos.
     * @param {TNodo} hijo El nodo que quieras añadir.
     * @returns {Number} Cantidad de hijos actuales.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=14 | S2.14}
     * @author David
     * @version 0.2
     */
    addHijo(hijo) {
        this._hijos.push(hijo);
        return this._hijos.length;
    }

    /**
     * @summary Elimina el hijo.
     * @param {TNodo} hijo El nodo hijo a eliminar.
     * @returns {Number} La posición en el array del nodo hijo a eliminar o -1 si no existe.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=14 | S2.14}
     * @author David
     * @version 0.2
     */
    remHijo(hijo) {
        this._hijos.forEach((aux_hijo, index) => {
            if (aux_hijo === hijo) {
                this._hijos.splice(index, 1);
                return index;
            }
        });
        return -1;
    }

    /**
     * @summary Setter de entidad.
     * @param {TEntidad} entidad El nodo hijo a eliminar.
     * @returns {Boolean} Si se ha podido insertar la entidad.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=14 | S2.14}
     * @author David
     * @version 0.2
     */
    setEntidad(entidad) {
        this._entidad = entidad;
        return true;
    }

    /**
     * @summary Getter de entidad.
     * @returns {TEntidad} La entidad.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=14 | S2.14}
     * @author David
     * @version 0.2
     */
    getEntidad() {
        return this._entidad;
    }

    /**
     * @summary Getter del nodo padre.
     * @returns {TNodo} El padre del nodo.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=14 | S2.14}
     * @author David
     * @version 0.2
     */
    getPadre() {
        return this._padre;
    }

    /**
     * @summary Comprueba no estar en raíz.El método draw de cada nodo llama al método beginDraw
     *  de la entidad asociada. A continuación, el dibujado se desencadena
     *  en cascada, llamando al dibujado de los nodos hijos de cada nodo padre.
     * @returns {TNodo} El padre del nodo.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=21 | S2.21}
     * @author David
     * @version 0.2 - rev.(02/12)
     * @todo Cambiar numero de beginDraw
     */
    draw() {
      if (this._entidad!=null) {
        this._entidad.beginDraw(1);
        for (const hijo of this._hijos) {
            hijo.draw();
        }
        this._entidad.endDraw();
      }
    }


}
