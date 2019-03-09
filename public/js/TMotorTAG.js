//===== Changelog ============================================
//=  - 0.4 Init. S4.7 [David]
//=  - 03-05 metodos de crear nodo, transoform luz y camara  [Javi]
//============================================================

import { TNodo } from "./TNodo.js";
import { TGestorRecursos } from "./TGestorRecursos.js";
import { TEntidad } from "./TEntidad.js";
import { TMalla } from "./TMalla.js";
import { TTransform } from "./TTransform.js";
import { TCamara } from "./TCamara.js";
import { TLuz } from "./TLuz.js";
import { GLOBAL } from "./GLOBAL.js";

/**
 * @summary Separa el motor de la aplicación el motor puede
 *  sustituirse fácilmente por otro y también reutilizarse.
 * @see {@link http://localhost:3000/pdf/S4.pdf#page=7 | S4.7}
 * @author David
 * @version 0.4
 */
export class TMotorTAG {

    /** @type {TNodo} */
    _escena;

    /** @type {TGestorRecursos} */
    _gestorRecursos;



    constructor(){
      this._escena=new TNodo("raiz");
    }

    // Atributos para mantenimiento de las cámaras, luces y viewports

    /**
     * @summary Crea un nodo y lo relaciona con el nodo padre.
     * @param {TNodo} padre El nodo padre.
     * @param {TEntidadd} ent Una entidad.
     * @param {string} name Nombre del nodo
     * @return {TNodo} El nodo resultante.
     * @see {@link http://localhost:3000/pdf/S4.pdf#page=7 | S4.7}
     * @author David - Javi
     * @version 0.2 03-04
     * @todo [motorTag] Crear Nodo
     */
    crearNodo(padre, ent, name) {
      console.log("HEMOS ENTRADO");
      var nodo=new TNodo(name);
      nodo.entidad = ent;
      nodo.padre = padre;
      padre.addHijo(nodo);

        return null;
    }

    /**
     * @summary Creamos transformacion, establecemos matriz identidad y devolvemos.
     * @return {TTransform}
     * @see {@link http://localhost:3000/pdf/S4.pdf#page=7 | S4.7}
     * @author David - Javi
     * @version 0.2 03-04
     * @todo Crear transformación y devolverla
     */
    crearTransform() {
      let r1 = new TTransform();
      r1.identidad();
      return r1
    }

    /**
     * @summary falta por poner posiciones de la camara e indicar si es la activa o no
     * @return {TCamara}
     * @see {@link http://localhost:3000/pdf/S4.pdf#page=7 | S4.7}
     * @author David - Javi
     * @version 0.2
     * @todo Crear cámara y devolverla
     */
    crearCamara() {
      var aux = new TCamara();

      return null;
    }

    /**
     * @summary falta por poner la intesidad, posicion y si es activa
     * @return {TLuz}
     * @see {@link http://localhost:3000/pdf/S4.pdf#page=7 | S4.7}
     * @author David - Javi
     * @version 0.2
     * @todo Crear luz y devolverla
     */
    crearLuz() {
      let aux = new TLuz();

      return aux;
    }

    /**
     * @summary
     * @param {string} fichero La ruta del fichero.
     * @return {TMalla}
     * @see {@link http://localhost:3000/pdf/S4.pdf#page=7 | S4.7}
     * @author David - Javi
     * @version 0.2
     * @todo Pedir el recurso malla al gestor de recursos a partir del fichero
     *  Crear la malla a partir del recurso malla y devolverla
     */
    crearMalla(fichero) {
      let r1 = new TMalla();
      r1.cargarMalla(fichero);
      return r1
    }


    // Métodos para el registro y manejo de las cámaras
    // Métodos para el registro y manejo de las luces
    // Métodos para el registro y manejo de los viewports

    /**
     * @summary
     * @see {@link http://localhost:3000/pdf/S4.pdf#page=7 | S4.7}
     * @author David
     * @version 0.4
     * @todo
     */
    draw() {
        /*
           para cada nodoLuz activo del registro de luces {
           recorrer el �rbol a la inversa desde nodoLuz hasta la raiz
           guardar el recorrido en una lista auxiliar de nodos de transformaci�n
           invertir la lista auxiliar
           recorrer la lista auxiliar multiplicando las matrices en una matriz auxiliar
           obtener la posici�n de la luz a partir de la matriz auxiliar
           posicionar y activar la luz en la librer�a gr�fica
           }
        */

        /*
         nodoCamara = getCamaraActiva ();
         recorrer el �rbol a la inversa desde nodoCamara hasta la raiz
         guardar el recorrido en una lista auxiliar de nodos de transformaci�n
         invertir la lista auxiliar
         recorrer la lista auxiliar multiplicando las matrices en una matriz auxiliar
         invertir la matriz auxiliar
         cargar la matriz auxiliar en la matriz MODELVIEW de la librer�a gr�fica

        */
    }


    pruebaDatos(){
        console.log(Datos.popPila());
    }
}
