///===== Changelog ============================================
//=  - 0.2 Init. S2.18 [David]
//=  - (02/24) Permite la lectura con ficheros obj. [David] (Falta comentar)
//============================================================

/**
 * @summary 
 * @see {@link http://localhost:3000/pdf/S2.pdf#page=18 | S2.18}
 * @author David
 * @version 0.2 - rev.(02/24) (sin terminar)
 */
export class TFichero {
  _carpeta;
  _fichero;

  constructor(ruta, fichero) {
    if (ruta === 'malla') {
      this._carpeta = '/model/malla/';
      this._fichero = fichero + '.obj';
    } else {
      this._carpeta = '/model/malla/';
      this._fichero = fichero + '.ob';
    }
  }

  cargar() {
    return new Promise((resolve, reject) => {
      let http = false;
      if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http = new XMLHttpRequest();
        if (http.overrideMimeType) {
          http.overrideMimeType('text/xml');
          // Ver nota sobre esta linea al final
        }
      } else if (window.ActiveXObject) { // IE
        try {
          http = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
          try {
            http = new ActiveXObject("Microsoft.XMLHTTP");
          } catch (e) { }
        }
      }

      if (!http) {
        reject('Falla :( No es posible crear una instancia XMLHTTP');
        return false;
      }
      http.onreadystatechange = () => {
        if (http.readyState === 4) {
          if (http.status === 200) {
            resolve(http.responseText);
          } else {
            reject('Hubo problemas con la petición.');
          }
        }
      };
      http.open('GET', this._carpeta + this._fichero, true);
      http.send();



    });
  }
}
