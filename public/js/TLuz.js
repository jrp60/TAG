//===== Changelog ============================================
//=  - 0.2 Init. S2.17 [David]
//=  - 0.4 Parametro pasada en beginDraw. S4.12 [David]
//=  - 0.5 Atributo camara activa. Corrigiendo errores. Clase [Javi] 02/25
//=  - 03/09 - Estandares set y get; uso de constantes y constructor.
//=  - 04/01 Arreglando Constructor, setters, getters, empezando draw [Javi]
//=  - 04/01 Eliminando TColor, ahora uso un vec3 en su lugar [Javi]
//============================================================

import { TEntidad } from './TEntidad.js';
import { GLOBAL } from './GLOBAL.js';
/** * glMatrix.ARRAY_TYPE(16) * @type {mat4} **/
const mat4 = glMatrix.mat4;

/** * glMatrix.ARRAY_TYPE(3) * @type {vec3} **/
const vec3 = glMatrix.vec3;

/** * glMatrix.ARRAY_TYPE(4) * @type {vec4} **/
const vec4 = glMatrix.vec4;

/**
 * @summary Gestiona los atributos de la luz.
 * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
 * @author David - Javi
 * @version 0.5 - rev.(03/09)
 */
export class TLuz extends TEntidad {

    /** @type {vec3} */
    _intensidad;
    // /** @type {int} */
    // _x;
    // /** @type {int} */
    // _y;
    // /** @type {int} */
    // _z;
    /** @type {boolean} */
    _activada;

    /** @type {vec3} */
    u_lightWorldPosition;


  //  uniform vec3 u_lightWorldPosition;

    constructor() {
        super();
        this._intensidad = vec3.create();
    }

    /**
     * @summary Activa la luz
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
     * @author Javi
     * @version 0.2
     */
    activaLuz() {
        this._activada = true;
    }
    /**
     * @summary Desactiva la luz
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
     * @author Javi
     * @version 0.2
     */
    desactivaLuz() {
        this._activada = false;
    }

    /**
     * @summary Setter de intensidad.
     * @param {vec3} color vec3 con los valores rgb
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
     * @author Javi
     * @version 0.2
     */
    set intensidadVector(color) {
        this._intensidad = color;
    }
    /**
     * @summary Setter de intensidad.
     * @param {float} r red
     * @param {float} g green
     * @param {float} b blue
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
     * @author Javi
     * @version 0.2
     */
    setintensidad(r,g,b) {
        this._intensidad = vec3.fromValues(r,g,b);
    }

    /**
     * @summary Getter de intensidad.
     * @returns {TColor} El color.
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
     * @author David
     * @version 0.2
     */
    get intensidad() {
        return this._intensidad;
    }
    // /**
    //  * @summary Setter de posicion.
    //  * @returns {}
    //  * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
    //  * @author Javi
    //  * @version 0.1
    //  */
    // setPosicion(x, y, z) {
    //     this._x = x;
    //     this._y = y;
    //     this._z = z;
    // }

    /**
     * @summary BeginDraw de TLuz
     * @param {Number} pasada Fase en la que se encuentra el motor.
     * @see {@link http://localhost:3000/pdf/S4.pdf#page=12 | S4.12}
     * @author David - Javi
     * @version 0.5 - rev.(03/09)
     * @todo Hay que hacer la luz
     */
    beginDraw(pasada) {
        if (pasada === GLOBAL.LUZ && this._activada) {
            console.log(" pasada 1 - luz activa");
            var pos = mat4.create();
            pos = mat4.clone(GLOBAL.matriz);
            var posLuz = vec4.create();
            var aux = vec4.fromValues(0,0,0,1);
            vec4.transformMat4(posLuz, aux, pos);

            vec3.copy(GLOBAL.posicionLuz, posLuz);
            vec3.copy(GLOBAL.intensidad, this._intensidad);

            // var aux2 = vec3.fromValues(posLuz[0],posLuz[1],posLuz[2]);
            // this.u_lightWorldPosition = aux2; //guardamos en la clase luz su posicion
            // console.log(GLOBAL.posicionLuz);
            // console.log("+´+´+´+´+´+´+´+´+´+´+");
            // vec3.copy(GLOBAL.posicionLuz, aux2);  //guardamos en GLOBAL la posicion de la luz
            // console.log(GLOBAL.posicionLuz);


            // console.log(posLuz[0]);
            // console.log(posLuz[1]);
            // console.log(posLuz[2]);
            // console.log(posLuz[3]);

            //almacenar en el vec3 de la luz la posicion obtenida, para luego desde TRecursoMalla acceder a esa posicion y pasarselo al vertex Shader?


            // obtener la posici�n de la luz de la matriz activa(MODELVIEW)
            // activar la luz en la librer�a gr�fica
            // colocar la luz en la posici�n obtenida
        }

    }

    /**
     * @summary EndDraw de TLuz
     * @see {@link http://localhost:3000/pdf/S4.pdf#page=12 | S4.12}
     * @author David
     * @version 0.5 - rev.(03/09)
     * @todo Hay que hacer la luz
     */
    endDraw() {
    }
}
