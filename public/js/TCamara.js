//===== Changelog ============================================
//=  - 0.2 Init. S2.17 [David]
//=  - 02/16 Añadiendo atributos a la clase [Javi]
//=  - 03/09 - Constructor y uso de las constantes. [David]
//=  - 03/11 Setperspectiva y setParalela, atributos [Javi]
//=  - 03/12 Constructor, arreglando setPerspectiva y setParalela, y otros setters [Javi]
//============================================================

import { TEntidad } from './TEntidad.js';
import { GLOBAL } from './GLOBAL.js';
/**
 * glMatrix.ARRAY_TYPE(16)
 * @type {mat4}
 * */
const mat4 = glMatrix.mat4;

/**
 * glMatrix.ARRAY_TYPE(3)
 * @type {vec3}
 */
const vec3 = glMatrix.vec3;

/**
 * @summary Gestiona los atributos de la camara.
 * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
 * @author David - Javi
 * @version 0.2 - rev.(03/09)
 */
export class TCamara extends TEntidad{

  /** @type {boolean} */
  _perspectiva
  /** @type {boolean} */
  _activa;
  /** @type {float} */
  _cercano;
  /** @type {float} */
  _lejano;
  /** @type {float} */
  _superior;
  /** @type {float} */
  _inferior;
  /** @type {float} */
  _izquierda;
  /** @type {float} */
  _derecha;
  // /** @type {float} */
  // _width;
  // /** @type {float} */
  // _height;
  /** @type {mat4} */
  _projection
  /** @type {vec3} */
  _camaraUp;
  /** @type {vec3} */
  _cameraTarget;


  // Hay alguna matriz en camara?
  // /**  @type {mat4} */
  // _matrizView;

  constructor() {
    super();
    this._perspectiva = true;
    this._cercano = 0.1;
    this._lejano = 100;
    this._inferior = 600;
    this._superior = 0;
    this._derecha = 800;
    this._izquierda = 0;
    this._cameraTarget = vec3.fromValues(0, 0, 0);
    this._cameraUp = vec3.fromValues(0, 1, 0);
    this._projection = mat4.create();
    // this._camaraUp.set(0,1,0);
    //mat4.perspective(this._projection, 45, 1.33, 0.1, 100);
    mat4.perspective(this._projection, 45, this._derecha/this._inferior, this._cercano, this._lejano);
  }

  /**
   * @summary Establece la perspectiva
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
   * @author Javi
   * @version 0.2
   */
  setPerspectiva() {
    if (this._perspectiva == false) {
      mat4.perspective(this._projection, 45, (this._derecha-this._izquierda)/(this._inferior-this._superior), this._cercano, this._lejano);
      this._perspectiva = true;
    }
  }

  /**
   * @summary Establece la paralela
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
   * @author Javi
   * @version 0.2
   */
  setParalela() {
    if (this._perspectiva == true) {
      mat4.ortho(this._projection, this._izquierda,this._derecha,this._inferior, this._superior,this._cercano,this._lejano);
      this._perspectiva = false;
    }
  }

  /**
   * @summary Establece el vector paralelo a Y de la camara
   * @param {float} x Axis X
   * @param {float} y Axis Y
   * @param {float} z Axis Z
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
   * @author Javi
   * @version 0.2
   */
  setUp(x,y,z){
    this._camaraUp.set(x,y,z);
  }

  /**
   * @summary Establece el target de la camara
   * @param {float} x Axis X
   * @param {float} y Axis Y
   * @param {float} z Axis Z
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
   * @author Javi
   * @version 0.2
   */
  setTarget(x,y,z){
    this._cameraTarget.set(x,y,z);

  }
  /**
   * @summary Establece el target de la camara
   * @param {float} cerca cercano
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
   * @author Javi
   * @version 0.2
   */
  setCercano(cerca){
    this._cercano = cerca;
  }

  /**
   * @summary Establece el target de la camara
   * @param {float} cerca cercano
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
   * @author Javi
   * @version 0.2
   */
  setLejano(lejos){
    this._cercano = lejos;
  }

  /**
   * @summary Establece el target de la camara
   * @param {float} cerca cercano
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
   * @author Javi
   * @version 0.2
   */
  setSuperior(sup){
    this._superior = sup;
  }

  /**
   * @summary Establece el target de la camara
   * @param {float} cerca cercano
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
   * @author Javi
   * @version 0.2
   */
  setInferior(inf){
    this._inferior = inf;
  }

  /**
   * @summary Establece el target de la camara
   * @param {float} cerca cercano
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
   * @author Javi
   * @version 0.2
   */
  setIzquierda(izq){
    this._izquierda = izq;
  }

  /**
   * @summary Establece el target de la camara
   * @param {float} cerca cercano
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
   * @author Javi
   * @version 0.2
   */
  setDerecha(der){
    this._derecha = der;
  }

  /**
   * @summary BeginDraw de TCamara
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
   * @author  Javi
   * @version 0.2 - rev.(03/09)
   * @todo Hay que hacer la camara
   */
  beginDraw(pasada) {
    if (pasada === GLOBAL.CAMARA && this._activa === true) {
      // obtener la matriz de posici�n de la c�mara (MODELVIEW)
      // invertir esa matriz y devolverla para utilizarla en el dibujado
    }

  }

  /**
   * @summary EndDraw de TCamara
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
   * @author David
   * @version 0.2 - rev.(03/09)
   * @todo Hay que hacer la camara
   */
  endDraw(pasada) {
    if (pasada === GLOBAL.CAMARA && this._activa === true) {
    }
  }
}
