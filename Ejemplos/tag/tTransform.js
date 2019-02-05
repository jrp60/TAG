/** ***********************************************CLASE TRANSFORMACIONES*******************************************/
class tTransform extends tEntidad {

  constructor() {
    super();
    this.matrix = mat4.identity(mat4.create()); // creamos la matriz identidad
    this.esteNodo = null;

  }

  setNodo(m) {
  //esto lo almacenamos para saber que nodo es y saber los padres y los hijos de este nodo ademas de saber la entidad a la que corresponde
    this.esteNodo = m;
  }

  gradosRadianes(d) { // metodo para pasar de grados a radianes
    const radianes = d * Math.PI / 180;
    return radianes;
  }

  getMatrix() {
    return this.matrix;
  }

  trasladar(vector) {
    mat4.translate(this.matrix, vector);

  }

  rotar(vector) {
    mat4.rotate(this.matrix, this.gradosRadianes(vector[0]), [1,0,0]);
    mat4.rotate(this.matrix, this.gradosRadianes(vector[1]), [0,1,0]);
    mat4.rotate(this.matrix, this.gradosRadianes(vector[2]), [0,0,1]);
  }

  escalar(vector) {

    mat4.scale(this.matrix, vector);

  }

  beginDraw() {

    //la Model matrix que utilizamos aqui esta definida en el index de manera general
    //pero la utilizamos de manera individual para cada rama, ya que se reinicia al desapilar

    const ModelAux = mat4.create(); // creamos una MatrizAuxiliar para la ModelMatrix
    mat4.set(modelMatrix, ModelAux);
    apila(ModelAux); // metemos la model actual en la pila

    if (this.esteNodo != null) {
      
      if (this.esteNodo.getTipoHijo() == "malla" || this.esteNodo.getTipoHijo() == "luz") {
        
        mat4.multiply(this.matrix, ModelAux, modelMatrix); // almacenamos en model y la actualizamos
      }
      if (this.esteNodo.getTipoHijo() == "camara") {
        mat4.multiply(ModelAux, this.matrix, modelMatrix); // almacenamos en model y la actualizamos
      }
    }


  }

  endDraw() {
   
    mat4.set(pilaMatrix[pilaMatrix.length - 1], modelMatrix);//para dejar la modelMatrix general a la identidad cuando termine de desapilar
    desapila();
    // Desapilar matriz y ponerla como actual
  }
}
