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
//=  - 02/14 - Termina de transcribir lo que tenía de C++ a JS [David]
//=  - 02/16 Añadiendo metodos para el funcionamiento del arbol[Javi]
//=  - 03/09 - Codigo integrado para soportar las pasadas [David].
//=  - 03/19 Begindraw: if para saltar la raiz sin entidad [Javi]
//============================================================
import { TEntidad } from './TEntidad.js';
import { GLOBAL } from './GLOBAL.js';

/**
 * @summary Dato que define un escenario virtual y controla
 * su proceso de dibujado
 * @see {@link http://localhost:3000/pdf/S2.pdf#page=7 | S2.7}
 * @author David
 * @version 0.2 - rev.(03/09)
 */
export class TNodo {

    /** @type {TEntidad} */
    _entidad;
    /** @type {TNodo[]} */
    _hijos;
    /** @type {TNodo} */
    _padre;
    /** @type {string} */
    _nombre;


    /**
     * @summary Constructor para inicializar el array hijos.
     * @param {String} name El nombre del nodo.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=14 | S2.14}
     * @author Javi
     * @version 0.1
     */
    constructor(name) {
        this._hijos = [];
        this._nombre = name
    }

    /**
     * @summary Añade el padre a _padre.
     * @param {TNodo} padre El nodo que quieres asignar de padre.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=14 | S2.14}
     * @author Javi
     * @version 0.1
     */
    set padre(padre) {
        this._padre = padre;
    }
    /**
     * @summary Añade nombre.
     * @param {String} nombre El nombre que quieres asignar.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=14 | S2.14}
     * @author Javi
     * @version 0.1
     */
    set nombre(nombre) {
        this._nombre = nombre;
    }


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
    set entidad(entidad) {
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
    get entidad() {
        return this._entidad;
    }
    /**
     * @summary Getter de hijos.
     * @returns {TNodo[]} Array de Hijos
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=14 | S2.14}
     * @author Javi
     * @version 0.1
     */
    getHijos() {
        return this._hijos;
    }
    /**
     * @summary Getter de  1 hijo.
     * @returns {TNodo} TNodo
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=14 | S2.14}
     * @author Javi
     * @version 0.1
     */
    getHijo(num) {
        if (this._hijos[num] != null) {
            return this._hijos[num];
        }
        console.log("no existe ese hijo");
    }

    /**
     * @summary Getter del nodo padre.
     * @returns {TNodo} El padre del nodo.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=14 | S2.14}
     * @author David
     * @version 0.2
     */
    get padre() {
        return this._padre;
    }

    /**
     * @summary El método draw de cada nodo llama al método beginDraw
     *  de la entidad asociada. A continuación, el dibujado se desencadena
     *  en cascada, llamando al dibujado de los nodos hijos de cada nodo padre.
     * @returns {TNodo} El padre del nodo.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=21 | S2.21}
     * @author David - Javi
     * @version 0.2 - rev.(03/09)
     */
    draw(pasada) {
        if (this._entidad != null) {
            this._entidad.beginDraw(pasada);
            for (const hijo of this._hijos) hijo.draw(pasada);
            this._entidad.endDraw(pasada);
        }
        else {
          this._hijos[0].entidad.beginDraw(pasada);
        }
    }

    /**
     * @summary El método draw de cada nodo llama al método beginDraw
     *  de la entidad asociada. A continuación, el dibujado se desencadena
     *  en cascada, llamando al dibujado de los nodos hijos de cada nodo padre.
     * @returns {TNodo} El padre del nodo.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=21 | S2.21}
     * @author David - Javi
     * @version 0.2 - rev.(03/09)
     */
    drawRaiz(pasada) {
        if (GLOBAL.DEBUG) console.log(pasada);
        for (const hijo of this._hijos) {
            if (GLOBAL.DEBUG) console.log(GLOBAL.matriz);
            hijo.draw(pasada);
            if (GLOBAL.DEBUG) console.log(hijo._nombre, GLOBAL.matriz);
        }
    }

    /**
     * @summary Imprime en ASCII en consola el arbol
     * @author David
     * @version 0.2 - rev.(03/09)
     */
    imprimir(indent, ultimo) {
        let buffer = indent;
        if (ultimo) {
            buffer += '\\-';
            indent += '  ';
        }
        else {
            buffer += '|-';
            indent += '| ';
        }
        buffer += this._nombre;
        console.log(buffer);
        for (let i = 0; i < this._hijos.length; i++) {
            this._hijos[i].imprimir(indent, i == this._hijos.length - 1);
        }
    }


}
