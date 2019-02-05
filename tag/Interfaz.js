  var objeto = null; // variable para saber en todo momento con que malla estamos trabajando
  var ctrl = false; // variable para saber si se ha pulsado la tecla CTRL (para saber si rotar o trasladar con las flechas del teclado)

  function getGET(){
  //Esto lo hemos sacado de un foro, necesitabamos coger una variable pasada por URL para saber que tipo de montacargas hemos elegido para crearlo
  // capturamos la url
  var loc = document.location.href;
  // si existe el interrogante
  if(loc.indexOf('?')>0)
  {
      // cogemos la parte de la url que hay despues del interrogante
      var getString = loc.split('?')[1];
      // obtenemos un array con cada clave=valor
      var GET = getString.split('&');
      var get = {};
      for(var i = 0, l = GET.length; i < l; i++){
        var tmp = GET[i].split('=');
        get[tmp[0]] = unescape(decodeURI(tmp[1]));
      }
      // recorremos todo el array de valores
      return get;
    }
  }

function apila(m) {//lo utilizamos en el draw del Ttransform
  var copy = mat4.create(); //creamos una matriz
  mat4.set(m, copy); //ponemos M en la copia creada
  pilaMatrix.push(m); //metemos la copia en la PIla
}

function desapila() {//lo utilizamos en el enddraw del Ttransform
  if (pilaMatrix.length == 0) {
    throw "Invalid popMatrix!";
  } else {
    pilaMatrix.pop(); //quitamos la ultima
  }
}

function requestAnimeFrame(o) {//hacemos el bucle recursivo para que se ejecute el renderloop todo el tiempo
  requestAnimeFrame(o);
}

function gestionarLuces() { // funcion que se ejecuta en bucle para comprobar los sliders de las luces
  Ambiente.oninput = function() { // para cambiar la intensidad de la luz ambiente
    cambiaLuzAmbiente(luces[0], this.value * 0.01);
  }
  Especular.oninput = function() { // para cambiar la intensidad de la luz especular
    cambiaLuzEspecular(luces[0], this.value * 0.01);
  }
  Difusa.oninput = function() { // para cambiar la luz difusa

    var aux = this.value.match(/[A-Za-z0-9]{2}/g).map(function(v) {
      return parseInt(v, 16)
    }).join(",");
    // parseamos el valor del color y lo pasamos por parametro
    cambiaLuzDifusa(luces[0], aux);
  }
}

function renderLoop() { // bucle principal de la aplicacion

  requestAnimFrame(renderLoop); // request anim frame sacado de el libro-tutorial
  nodoEscena.drawNode();
  gestionarLuces();

}

function loadShaders(){ // Funcion para leer los shaders que saque de un tutorial de youtube

  loadTextResource('./shaders/shader-vs.glsl', function (vsErr, vsText) {
    if (vsErr) {
      alert('Fatal error getting vertex shader (see console)');
      console.error(vsErr);
    } else {
      loadTextResource('./shaders/shader-fs.glsl', function (fsErr, fsText) {
        if (fsErr) {
          alert('Fatal error getting fragment shader (see console)');
          console.error(fsErr);
        }
        else{
          initProgram(vsText,fsText); // para iniciar el programa pasamos el texto del fragment
                                      // y del vertex por parametro
        }
      });
    }
  });
}

function initProgram(vertexShaderText, fragmentShaderText) {

  var vertexShader = gl.createShader(gl.VERTEX_SHADER); // creamos los shaders
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertexShader, vertexShaderText); // vinculamos el texto a los shaders
  gl.shaderSource(fragmentShader, fragmentShaderText);

  gl.compileShader(vertexShader);                 // compilamos el vertexShader

  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) { // si ocurre un error al compilar salta error
    console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
    return;
  }

  gl.compileShader(fragmentShader);              // compilamos el fragmentShader

  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) { // si ocurre un error al compilar salta error
    console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
    return;
  }

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); 
  gl.enable(gl.DEPTH_TEST); //
  gl.enable(gl.CULL_FACE); // El culling es para que no gaste recursos en calcular puntos que no se van a mostrar
  gl.cullFace(gl.BACK);

  prg = gl.createProgram(); // creamos el programa y vinculamos los shaders
  gl.attachShader(prg, vertexShader);
  gl.attachShader(prg, fragmentShader);
  gl.linkProgram(prg);


  if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) { // si ocurre un error se muestra
    alert('Could not initialise shaders');
  }

  gl.useProgram(prg);
  // vinculamos las variables del shader con las del programa
  prg.vertexPositionAttribute = gl.getAttribLocation(prg, 'aVertexPosition');
  prg.pMatrixUniform = gl.getUniformLocation(prg, 'uPMatrix');
  prg.mvMatrixUniform = gl.getUniformLocation(prg, 'uMVMatrix');
  prg.aVertexNormal = gl.getAttribLocation(prg, "aVertexNormal");

  prg.uNMatrix = gl.getUniformLocation(prg, "uNMatrix");
  prg.uLightAmbient = gl.getUniformLocation(prg, "uLightAmbient");
  prg.uLightPosition = gl.getUniformLocation(prg, "uLightPosition");
  prg.uMaterialSpecular = gl.getUniformLocation(prg, "uMaterialSpecular");
  prg.uMaterialDiffuse = gl.getUniformLocation(prg, "uMaterialDiffuse");

  prg.uShininess = gl.getUniformLocation(prg, "uShininess");


}


function crearMalla(nodoPadre, nombreFichero, nombreTextura) {

  let malla = null;
  let nodoRotacion = null;
  let nodoTraslacion = null;

  if (nombreFichero != null) {

    if (nodoPadre != null && nodoPadre instanceof tNodo) {

      //cuando creamos una malla, creamos directamente la entidad malla y las transformaciones

      const entidadMalla = new tMalla(nombreFichero, nombreTextura);
      const entidadRotacion = new tTransform();
      const entidadTraslacion = new tTransform();

      //creamos el nodo para cada entidad y le asignamos a la malla las dos transformaciones padre
      nodoRotacion = new tNodo(nodoPadre, null, entidadRotacion, "Nodo rotacion malla");
      nodoTraslacion = new tNodo(nodoRotacion, null, entidadTraslacion, "Nodo traslacion malla");
      malla = new tNodo(nodoTraslacion, null, entidadMalla, "Nodo malla");

      if (nodoPadre.addHijo(nodoRotacion)) {
        nodoRotacion.setPadre(nodoPadre);
        if (nodoRotacion.addHijo(nodoTraslacion)) {
          nodoTraslacion.setPadre(nodoRotacion);
          if (nodoTraslacion.addHijo(malla)) {

            malla.setPadre(nodoTraslacion);

            
            //almacenamos en la entidad que nodo es
            //esto lo hacemos porque desde tnodo podemos acceder a los padres e hijos
            //asi podemos saber luego si pertenece la transformacion a una malla
            entidadRotacion.setNodo(nodoRotacion);
            entidadTraslacion.setNodo(nodoTraslacion);

            malla.getEntidad().cargar();//por ultimo cargamos la textura
            malla.getEntidad().setTextura();//y se la ponemos


          }
        }
      } else {
        console.log("Error insertando la malla");
      }
    }

  } else {
    alert("MALLA: Se requiere la direccion de un fichero JSON valido");
  }
  return malla;
}

function crearCamara(nodoPadre, posicion) {
  let nodoCamara = null;
  let nodoRotacion = null;
  let nodoTraslacion = null;
  
  if (nodoPadre != null && nodoPadre instanceof tNodo) {
    const entidadCamara = new tCamara();
    const entidadRotacion = new tTransform();
    const entidadTraslacion = new tTransform();

    //creamos el nodo para cada entidad y le asignamos a la camara las dos transformaciones padre
    nodoRotacion = new tNodo(nodoPadre, null, entidadRotacion, "Nodo rotacion camara");
    nodoTraslacion = new tNodo(nodoRotacion, null, entidadTraslacion, "Nodo traslacion camara"); // CAMBIADO DE ORDEN
    nodoCamara = new tNodo(nodoTraslacion, null, entidadCamara, "Nodo camara");

    if (nodoPadre.addHijo(nodoRotacion)) {
      nodoRotacion.setPadre(nodoPadre);
      if (nodoRotacion.addHijo(nodoTraslacion)) {
        nodoTraslacion.setPadre(nodoRotacion);
        if (nodoTraslacion.addHijo(nodoCamara)) {
          nodoCamara.setPadre(nodoTraslacion);
        }
      }
    } else {
      console.log("Error insertando la camara");
    }

    //almacenamos en la entidad que nodo es
    //esto lo hacemos porque desde tnodo podemos acceder a los padres e hijos
    //asi podemos saber luego si pertenece la transformacion a una camara
    entidadRotacion.setNodo(nodoRotacion);
    entidadTraslacion.setNodo(nodoTraslacion);
    entidadCamara.setNodo(nodoCamara);

    entidadCamara.setPosicion(posicion);

  } else {
    console.log("Error en el nodo padre");
  }
  return nodoCamara;
}

function borrarCamara(nodoCamara) {
  if (nodoCamara != null) {
    const nodoTraslacion = nodoCamara.getPadre();
    const nodoRotacion = nodoCamara.getPadre();

    if (nodoRotacion != null && nodoTraslacion != null) {
      if (nodoCamara.borraNodo() && nodoTraslacion.borraNodo() && nodoRotacion.borraNodo()) {
        console.log("Camara eliminada con exito");
      }
    }
  }
}

function crearLuz(nodoPadre, luzDifusa, luzEspecular, posicion) {

  let nodoLuz = null;
  let nodoRotacion = null;
  let nodoTraslacion = null;

  if (nodoPadre != null && nodoPadre instanceof tNodo) {

    const entidadLuz = new tLuz();
    const entidadRotacion = new tTransform();
    const entidadTraslacion = new tTransform();

    //creamos el nodo para cada entidad y le asignamos a la luz las dos transformaciones padre
    nodoRotacion = new tNodo(nodoPadre, null, entidadRotacion, "Nodo rotacion");
    nodoTraslacion = new tNodo(nodoRotacion, null, entidadTraslacion, "Nodo traslacion");
    nodoLuz = new tNodo(nodoTraslacion, null, entidadLuz, "Nodo luz");

    if (nodoPadre.addHijo(nodoRotacion)) {
      nodoRotacion.setPadre(nodoPadre);
      if (nodoRotacion.addHijo(nodoTraslacion)) {
        nodoTraslacion.setPadre(nodoRotacion);
        if (nodoTraslacion.addHijo(nodoLuz)) {
          nodoLuz.setPadre(nodoTraslacion);


          //almacenamos en la entidad que nodo es
          //esto lo hacemos porque desde tnodo podemos acceder a los padres e hijos
          //asi podemos saber luego si pertenece la transformacion a una luz

          entidadRotacion.setNodo(nodoRotacion);
          entidadTraslacion.setNodo(nodoTraslacion);
        }
      }
    } else {
      console.log("Error insertando la luz");
    }

    if (entidadLuz != null) {

      if (luzDifusa != null) {
        entidadLuz.setLuzDifusa(luzDifusa[0], luzDifusa[1], luzDifusa[2]);
      } else {
        console.log("parametros no validos de luz difusa");
      }
      if (luzEspecular != null) {
        entidadLuz.setLuzEspecular(luzEspecular[0], luzEspecular[1], luzEspecular[2]);
      } else {
        console.log("parametros no validos de luz especular");
      }
      if (posicion != null) {
        entidadLuz.setPosicion(posicion[0], posicion[1], posicion[2]);
      } else {
        console.log("parametros no validos de luz especular");
      }
      entidadLuz.initLight(); // para iniciar las luces
    }


  } else {
    console.log("Error en el nodo padre");
  }

  return nodoLuz;
}


function borrarLuz(nodoLuz) {
  if (nodoLuz != null) {
    const nodoTraslacion = nodoLuz.getPadre();
    const nodoRotacion = nodoTraslacion.getPadre();

    if (nodoRotacion != null && nodoTraslacion != null) {
      if (nodoLuz.borraNodo() && nodoTraslacion.borraNodo() && nodoRotacion.borraNodo()) {
        console.log("Luz eliminada con exito");
      }
    }
  }
}

function cambiaLuzAmbiente(nodoLuz, valor) { // llama a la funcion de Tluz para cambiar el valor
  if (nodoLuz != null) {
    nodoLuz.getEntidad().setLuzAmbiente(valor);
  } else {
    console.log("Nodo Luz es nulo");
  }
}

function cambiaLuzEspecular(nodoLuz, valor) { // llama a la funcion de Tluz para cambiar el valor
  if (nodoLuz != null) {
    nodoLuz.getEntidad().setLuzEspecular(valor);
  } else {
    console.log("Nodo Luz es nulo");
  }
}

function cambiaLuzDifusa(nodoLuz, valor) { // llama a la funcion de Tluz para cambiar el valor
  if (nodoLuz != null) {
    const res = valor.split(",");
    nodoLuz.getEntidad().setLuzDifusa(res[0] / 10, res[1] / 10, res[2] / 10);
  } else {
    console.log("Nodo Luz es nulo");
  }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// - - - - - - - - - - - - - - - - Transformaciones - - - - - - - -

function trasladarNodo(nodo, vector) { 
 
  if (vector != null && vector.length == 3) {
    if (nodo != null && nodo instanceof tNodo) {


      const Entidad = nodo.getPadre().getEntidad();//obtenemos el nodo padre para obtener la entidad trasladar

      if (Entidad != null) {
        Entidad.trasladar(vector);//trasladamos el nodo padre
        return true;
      }

      return false;

    }

    console.log("Problemas con el nodo a trasladar");
    return false;

  }

  console.log("Problemas con el vector a la hora de trasladar el nodo");
  return false;

}

function rotarNodo(nodo, vector) {
  if (vector != null && vector.length == 3) {
    if (nodo != null && nodo instanceof tNodo) {

      const Entidad = nodo.getPadre().getPadre().getEntidad();//obtenemos el nodo padre del padre para obtener la entidad rotacion

      if (Entidad != null) {
        Entidad.rotar(vector);
        return true;
      }

      return false;

    }

    console.log("Problemas con el nodo a trasladar");
    return false;

  }

  console.log("Problemas con el vector a la hora de trasladar el nodo");
  return false;

}

// cambioOBJ son para cambiar el objeto con el que estamos trabajando 
// para rotarlo o trasladarlo
function cambioObj1(){
 objeto = mallas[0];
}
function cambioObj2(){
  objeto = mallas[1];
}
function cambioObj3(){
 objeto = mallas[2];
}
function cambioTex1(){ // dependiendo de el objeto actual se selecciona la textura 1 o la 2

  var valor = getGET(); // conseguimos el montacargas actual pasado mediante la url

  if(valor){
    var montacargas = valor['m'];
  }

  if(montacargas == 1){
    if(objeto == mallas[0]){
      objeto.getEntidad().setTexturaNueva("modelos/ruedas1.png");
    }
    if(objeto == mallas[1]){
      objeto.getEntidad().setTexturaNueva("modelos/asiento1.png");
    }
    if(objeto == mallas[2]){
      objeto.getEntidad().setTexturaNueva("modelos/estructura1.png");
    }
  }
  if(montacargas == 2){
    if(objeto == mallas[0]){
      objeto.getEntidad().setTexturaNueva("modelos/Pared1_1.png");
    }
    if(objeto == mallas[1]){
      objeto.getEntidad().setTexturaNueva("modelos/suelo1.png");
    }
    if(objeto == mallas[2]){
      objeto.getEntidad().setTexturaNueva("modelos/mecanismo1.png");
    }
  }
  if(montacargas == 3){
    if(objeto == mallas[0]){
      objeto.getEntidad().setTexturaNueva("modelos/pared1_2.png");
    }
    if(objeto == mallas[1]){
      objeto.getEntidad().setTexturaNueva("modelos/cabina1_2.png");
    }
    if(objeto == mallas[2]){
      objeto.getEntidad().setTexturaNueva("modelos/mecanismo1.png");
    }
  }
}
function cambioTex2(){

  var valor = getGET();

  if(valor){
    var montacargas = valor['m'];
  }

  if(montacargas == 1){
    if(objeto == mallas[0]){
      objeto.getEntidad().setTexturaNueva("modelos/ruedas2.png");
    }
    if(objeto == mallas[1]){
      objeto.getEntidad().setTexturaNueva("modelos/asiento2.png");
    }
    if(objeto == mallas[2]){
      objeto.getEntidad().setTexturaNueva("modelos/estructura2.png");
    }
  }
  if(montacargas == 2){
    if(objeto == mallas[0]){
      objeto.getEntidad().setTexturaNueva("modelos/Pared2_1.png");
    }
    if(objeto == mallas[1]){
      objeto.getEntidad().setTexturaNueva("modelos/suelo2.png");
    }
    if(objeto == mallas[2]){
      objeto.getEntidad().setTexturaNueva("modelos/mecanismo2.png");
    }
  }
  if(montacargas == 3){
    if(objeto == mallas[0]){
      objeto.getEntidad().setTexturaNueva("modelos/pared2_2.png");
    }
    if(objeto == mallas[1]){
      objeto.getEntidad().setTexturaNueva("modelos/cabina2_2.png");
    }
    if(objeto == mallas[2]){
      objeto.getEntidad().setTexturaNueva("modelos/mecanismo2.png");
    }
  }
}

//funcion para controlar la camara con las flechas del teclado, si pulsamos ctrl alternamos 
//entre trasladar la camara y rotarla, con + y - hacemos zoom
window.onkeydown = function(e){ 
  switch(e.keyCode){
        case 17: // ctrl
        ctrl = !ctrl; 
        break;
        case 37: //izq
        if(ctrl){
          trasladarNodo(camara[0], [-0.5, 0, 0]); 
        }
        else{
          rotarNodo(camara[0], [0 , -0.5, 0]); 
        }
        break;
        case 38: // up
        if(ctrl){
          trasladarNodo(camara[0], [0 ,0.5, 0]); 
        }
        else{
          rotarNodo(camara[0], [-0.5 ,0, 0]); 
        }
        break;
        case 39: //dcha
        if(ctrl){
          trasladarNodo(camara[0], [0.5, 0, 0]); 
        }
        else{
          rotarNodo(camara[0], [0, 0.5, 0]); 
        }
        break;

        case 40: // down
        if(ctrl){
          trasladarNodo(camara[0], [0 ,-0.5, 0]); 
        }
        else{
          rotarNodo(camara[0], [0.5 ,0, 0]); 
        }
        break;

        case 187: // +
        
        trasladarNodo(camara[0], [0, 0, 1]); 
        break;

        case 189: // -
        
        trasladarNodo(camara[0], [0, 0, -1]); 
        break;
         case 107: // +
         
         trasladarNodo(camara[0], [0, 0, 1]); 
         break;

        case 109: // -
        
        trasladarNodo(camara[0], [0, 0, -1]); 
        break;
      }
      
    }