//===== Changelog ============================================
//=  - 0.2 Init. S2.16 [David]
//=  - 01/28 - Rafa recomienda el uso de la libreria GLM [David]
//============================================================

import { TEntidad } from './TEntidad.js';

/**
 * @summary Gestiona la matriz, para operaciones de transformacion.
 * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
 * @author David
 * @version 0.2 - rev.(01/28)
 */
export class TTransform extends TEntidad {
    /** @type {Mat4} */
    _matriz;


    /**
     * @summary
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author David
     * @version 0.2 - rev.(01/28)
     */
    identidad() {
        matrizIdentidad; // Mat4x4
        matriz.setMatriz(matrizIdentidad);
    }

    /**
     * @summary
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author David
     * @version 0.2 - rev.(01/28)
     */
    cargar(matrix) { // Mat4x4
        matriz.setMatriz(matrix.getMatriz);
    }

    /**
     * @summary
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author David
     * @version 0.2 - rev.(01/28)
     */
    transponer() {
        matriz.setMatriz(transpose(matriz.getMatriz()));
    }

    /**
     * @summary
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author Javi
     * @version 0.2
     */
    invertir() {
        matriz.setMatriz(invert(matriz.getMatriz()));
    }
    /**
     * @summary
     * @param {mat4} matrix
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author Javi
     * @version 0.2
     */
    multiplicarMatriz(matrix) {
        matriz.setMatriz(multiply(matriz.getMatriz()),matrix);
    }


    /**
     * @summary
     * @param {float} x
     * @param {float} y
     * @param {float} z
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author David
     * @version 0.2 - rev.(01/28)
     */
    transladar(x, y, z) { // Float
        matriz.setMatriz(translate(matriz.getMatriz(), vec3(x, y, z)));
    }

    /**
     * @summary
     * @param {float} x
     * @param {float} y
     * @param {float} z
     * @param {float} t
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author David
     * @version 0.2 - rev.(01/28)
     */
    rotar(x, y, z, t) { // Float
        matriz.setMatriz(rotate(matriz.getMatriz(), t, vec3(x, y, z)));
    }

    /**
     * @summary
     * @param {float} x
     * @param {float} y
     * @param {float} z
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author David
     * @version 0.2 - rev.(01/28)
     */
    escalar(x, y, z) { // Float
        matriz.setMatriz(scale(matriz.getMatriz(), vec3(x, y, z)));
    }

    /**
     * @summary Apilar matriz actual
     * Multiplicar la matriz de la transformación a la matriz actual
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author David
     * @version 0.2 - rev.(01/28) - rev.(02/12)
     */
    beginDraw() {
      let aux = new mat4.create();
      for(var i = 0; i<matrizView.length; i++){
        aux[i]=matrizView[i];
      }
       //apilamos matriz actual
      matrizView=mat4.multiply(matrizView,this.matriz); //multiplicamos matriz actual x matriz de transformacion
    }

    /**
     * @summary Desapilar matriz y ponerla como actual
     * @see {@link http://localhost:3000/pdf/S2.pdf#page=16 | S2.16}
     * @author David
     * @version 0.2 - rev.(01/28)
     */
    endDraw() {

    }
}
