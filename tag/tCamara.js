class tCamara extends tEntidad {
  constructor() {
    super();

    this.posicion = [0,0,0];
    this.esteNodo = null;
    this.matrix = mat4.identity(mat4.create());
    this.setPerspective(50, 1, 2000.0);

  }

  setNodo(m) {//funciona para almacenar que nodo es este y asi poder acceder a partir de el al padre
    this.esteNodo = m;
  }

  getMatrix() {
    return this.matrix;
  }

  setPerspective(angle, near, far) {//creamos la matrix perspectiva
    mat4.perspective(angle, c_width / c_height, near, far, pMatrix);
  }

  setMatrixUniforms() {

    const aux = mat4.create();
    //la model matrix equivale a la camara matrix con las transformaciones que se le han ido realizando
    mat4.inverse(modelMatrix, this.matrix);//creamos la view
    mat4.set(this.matrix, viewMatrix); // inversa de la camaraMatrix en viewMatrix


  }

  setPosicion(valor) {
    this.posicion = valor;
  }

  getPerspective() {
    return this.perspectiva;
  }


  beginDraw() {
    this.setMatrixUniforms();


  }

  endDraw() {

  }
}
