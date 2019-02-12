//===== Changelog ============================================
//=  - 0.4 Init. S4.7 [David]
//============================================================

import { TNodo } from "./TNodo";
import { TGestorRecursos } from "./TGestorRecursos";
import { TEntidad } from "./TEntidad";
import { TMalla } from "./TMalla";
import { TTransform } from "./TTransform";
import { TCamara } from "./TCamara";
import { TLuz } from "./TLuz";

/**
 * @summary Separa el motor de la aplicación el motor puede
 *  sustituirse fácilmente por otro y también reutilizarse.
 * @see {@link http://localhost:3000/pdf/S4.pdf#page=7 | S4.7}
 * @author David
 * @version 0.4
 */
export class TMotorTag {

    /** @type {TNodo} */
    _escena;

    /** @type {TGestorRecursos} */
    _gestorRecursos;

    // Atributos para mantenimiento de las cámaras, luces y viewports

    /**
     * @summary Crea un nodo y lo relaciona con el nodo padre.
     * @param {TNodo} padre El nodo padre.
     * @param {TEntidadd} ent Una entidad.
     * @return {TNodo} El nodo resultante.
     * @see {@link http://localhost:3000/pdf/S4.pdf#page=7 | S4.7}
     * @author David
     * @version 0.4
     * @todo [motorTag] Crear Nodo
     */
    crearNodo(padre, ent) {
        /*
           crear nodo y asociarle la entidad
           añadir el nuevo nodo como hijo del nodo padre
           devolver la referencia al nodo creado
        */
        return null;
    }

    /**
     * @summary 
     * @return {TTransform} 
     * @see {@link http://localhost:3000/pdf/S4.pdf#page=7 | S4.7}
     * @author David
     * @version 0.4
     * @todo Crear transformación y devolverla
     */
    crearTransform() {
        return null;
    }

    /**
     * @summary 
     * @return {TCamara} 
     * @see {@link http://localhost:3000/pdf/S4.pdf#page=7 | S4.7}
     * @author David
     * @version 0.4
     * @todo Crear cámara y devolverla
     */
    crearCamara() {
        return null;
    }

    /**
     * @summary 
     * @return {TLuz} 
     * @see {@link http://localhost:3000/pdf/S4.pdf#page=7 | S4.7}
     * @author David
     * @version 0.4
     * @todo Crear luz y devolverla
     */
    crearLuz() {
        return null;
    }

    /**
     * @summary 
     * @param {string} fichero La ruta del fichero.
     * @return {TMalla} 
     * @see {@link http://localhost:3000/pdf/S4.pdf#page=7 | S4.7}
     * @author David
     * @version 0.4
     * @todo Pedir el recurso malla al gestor de recursos a partir del fichero
     *  Crear la malla a partir del recurso malla y devolverla
     */
    crearMalla(fichero) {
        return null;
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
}
