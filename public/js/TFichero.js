///===== Changelog ============================================
//=  - 0.2 Init. S2.18 [David]
//=  - 02/24 - Permite la lectura con ficheros obj. [David] (Falta comentar)
//=  - 03/09 - Añadido existeFichero y adaptado a la abstraccion por recurso.
//============================================================

/**
 * @summary Clase que permite la carga de ficheros
 * @see {@link http://localhost:3000/pdf/S2.pdf#page=18 | S2.18}
 * @author David
 * @version 0.2 - rev.(02/24) (sin terminar)
 */
export class TFichero {
  _nombre;

  constructor(fichero) {
    this._nombre = fichero;
  }

  cargar(tipo) {
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
      if (tipo === 'malla') {
        http.open('GET', '/model/' + tipo + '/' + this._nombre + '.obj', true);
      } else if (tipo === 'material') {
        http.open('GET', '/model/' + tipo + '/' + this._nombre + '.mtl', true);
      } else if (tipo === 'textura') {
        http.open('GET', '/model/' + tipo + '/' + this._nombre + '.png', true);
      }
      http.send();
    });
  }

  existeFichero(tipo) {
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
        console.error('Falla :( No es posible crear una instancia XMLHTTP');
        return false;
      }
      http.onreadystatechange = () => {
        if (http.readyState === 4) {
          resolve(http.status === 200);
        }
      };
      if (tipo === 'malla') {
        http.open('HEAD', '/model/' + tipo + '/' + this._nombre + '.obj', true);
      } else if (tipo === 'material') {
        http.open('HEAD', '/model/' + tipo + '/' + this._nombre + '.mtl', true);
      } else if (tipo === 'textura') {
        http.open('HEAD', '/model/' + tipo + '/' + this._nombre + '.png', true);
      }
      http.send();
    });
  }
}
