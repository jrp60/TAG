//===== Changelog ============================================
//=  - 0.2 Init. S2.17 [David]
//=  - 02/16 Añadiendo atributos a la clase [Javi]
//=  - 03/09 - Constructor y uso de las constantes. [David]
//=  - 03/11 Setperspectiva y setParalela, atributos [Javi]
//=  - 03/12 Constructor, arreglando setPerspectiva y setParalela, y otros setters [Javi]
//=  - 03/18 Corrigiendo errores [Javi]
//=  - 03/19 begindraw: primera version muy de prueba [Javi]
//=  - 03/25 begindraw: falta 'enviar para utilizar en el dibujado' [Javi]
//============================================================

import { TEntidad } from './TEntidad.js';
import { GLOBAL } from './GLOBAL.js';
/** * glMatrix.ARRAY_TYPE(16) * @type {mat4} **/
const mat4 = glMatrix.mat4;

/** * glMatrix.ARRAY_TYPE(3) * @type {vec3} **/
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
  /** @type {mat4} */
  _projection
  /** @type {string} */
  _name


  constructor(name) {
    super();
    this._projection = mat4.create();
    this._name = name;
  }

  /**
   * @summary Establece la perspectiva
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
   * @author Javi
   * @version 0.2
   */
  setPerspectiva() {
      console.log("PERSPECTIVA");
      mat4.perspective(this._projection, 45, (this._derecha-this._izquierda)/(this._inferior-this._superior), this._cercano, this._lejano);
      this._perspectiva = true;
      console.log("projection de perspective");
      console.log(this._projection);
      mat4.copy(GLOBAL.projection, this._projection);
      console.log("PROJECTION DE PERSPECTIVA");
      //console.log(GLOBAL.projection);
  }

  /**
   * @summary Establece la paralela
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
   * @author Javi
   * @version 0.2
   */
  setParalela() {
      console.log("PARALELA");
      mat4.ortho(this._projection, this._izquierda,this._derecha,this._inferior, this._superior,this._cercano,this._lejano);
      console.log("projection de ortho");
      console.log(this._projection);
      this._perspectiva = false;

      mat4.copy(GLOBAL.projection, this._projection);
      console.log("PROJECTION DE PARALELA");
      //console.log(GLOBAL.projection);
  }



  /**
   * @summary BeginDraw de TCamara
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
   * @author  Javi
   * @version 0.2 - rev.(03/09)
   * @todo Hay que hacer la camara
   */
  beginDraw(pasada) {
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++");
    if (pasada === GLOBAL.CAMARA && this._activa === true && this._name === GLOBAL.cam) {
      console.log("-------------------------------------");
      console.log("-------------------------------------");
      console.log(this._name);
      console.log(GLOBAL.cam);
      console.log("-------------------------------------");
      console.log("-------------------------------------");

      var invert = mat4.create();
      console.log("GLOBAL MATRIZ");
      console.log(GLOBAL.matriz);
      mat4.invert(invert,GLOBAL.matriz);
      console.log("INVERT- MATRIZ VIEW");
      console.log(invert);


      //var aux = mat4.create();
      //mat4.copy(aux, invert); // inversa de la camaraMatrix en modelMatriz
      //mat4.copy(GLOBAL.matrizView, aux);

      mat4.copy(GLOBAL.matrizView, invert); //antes tenia el codigo de aqui arriba comentado, pero asi es mas rapido


      //mat4.transpose(GLOBAL.normal, invert );
      // console.log("mvp");
      // console.log(GLOBAL.mvp);
      // console.log("view");
      // console.log(GLOBAL.matrizView);
      // console.log("projecion");
      // console.log(this._projection);

                      //mat4.multiply(GLOBAL.mvp, GLOBAL.matrizView, this._projection);
      // console.log("MVP Y NORMAL ABAJO");
      // console.log(GLOBAL.mvp);
      // console.log(GLOBAL.normal);

    }
    if (this._name === GLOBAL.cam) {
      console.log("HOLAHOLAHOLAHOLA");
      console.log("HOLAHOLAHOLAHOLA");
      console.log("HOLAHOLAHOLAHOLA");

    }
    console.log("AAAAAAAAAAAAAAAAAAAAAAA");
    console.log(this._name);
    console.log(GLOBAL.cam);
    console.log("AAAAAAAAAAAAAAAAAAAAAAA");
  }

  /**
   * @summary EndDraw de TCamara
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
   * @author Javi
   * @version 0.2 - rev.(03/09)
   * @todo Hay que hacer la camara
   */
  endDraw() {
  }

  /**
   * @summary
   * @param {float} x Axis X
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
   * @author Javi
   * @version 0.2
   */
  setActiva(){
    this._activa = true;
    GLOBAL.cam = this._name;
    mat4.copy(GLOBAL.projection, this._projection);

  }

  /**
   * @summary
   * @param {float} x Axis X
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
   * @author Javi
   * @version 0.2
   */
  setInactiva(){
    this._activa = false;
    GLOBAL.cam = "";
    //mat4.copy(GLOBAL.projection, this._projection);

  }


  // /**
  //  * @summary Establece el vector paralelo a Y de la camara
  //  * @param {float} x Axis X
  //  * @param {float} y Axis Y
  //  * @param {float} z Axis Z
  //  * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
  //  * @author Javi
  //  * @version 0.2
  //  */
  // setUp(x,y,z){
  //   vec3.set(this._camaraUp,x,y,z);
  // }
  //
  // /**
  //  * @summary Establece el target de la camara
  //  * @param {float} x Axis X
  //  * @param {float} y Axis Y
  //  * @param {float} z Axis Z
  //  * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
  //  * @author Javi
  //  * @version 0.2
  //  */
  // setTarget(x,y,z){
  //   vec3.set(this._camaraTarget,x,y,z);
  // }
  /**
   * @summary Establece el cerca de la camara
   * @param {float} cerca cercano
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
   * @author Javi
   * @version 0.2
   */
  set Cercano(cerca){
    this._cercano = cerca;
  }

  /**
   * @summary Establece el lejano de la camara
   * @param {float} lejos lejano
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
   * @author Javi
   * @version 0.2
   */
  set Lejano(lejos){
    this._lejano = lejos;
  }

  /**
   * @summary Establece el superior de la camara
   * @param {float} sup superior
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
   * @author Javi
   * @version 0.2
   */
  set Superior(sup){
    this._superior = sup;
  }

  /**
   * @summary Establece el inferior de la camara
   * @param {float} inf inferior
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
   * @author Javi
   * @version 0.2
   */
  set Inferior(inf){
    this._inferior = inf;
  }

  /**
   * @summary Establece el target de la camara
   * @param {float} cerca cercano
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
   * @author Javi
   * @version 0.2
   */
  set Izquierda(izq){
    this._izquierda = izq;
  }

  /**
   * @summary Establece el derecha de la camara
   * @param {float} der derecha
   * @see {@link http://localhost:3000/pdf/S2.pdf#page=17 | S2.17}
   * @author Javi
   * @version 0.2
   */
  set Derecha(der){
    this._derecha = der;
  }

}
