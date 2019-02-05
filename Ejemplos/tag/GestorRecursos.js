class TGestorRecursos {
  constructor() {
    // array para almacenar todos los recursos de la malla y texturas
    this.recursosMalla = null; 
    this.recursosTextura = null;
  }

  getTodosRecursos() {
    return this.recursosMalla; // ESTO ES UN TRECURSO
  }

  getTodasTexturas() {
    return this.recursosTextura;
  }

  getRecursoMalla(nomRec) { // busca por nombre el recurso malla en el array del gestor y lo devuelve

    let recurso = null;
    let encontrado = false;

    if (this.recursosMalla == null) {
      this.recursosMalla = [];
    }

    if (nomRec != null && this.recursosMalla != null) { // LO BUSCAMOS
      let i = 0;
      while (i <= this.recursosMalla.length - 1 && encontrado == false) {
        if (this.recursosMalla[i] != null && this.recursosMalla[i].getNombreMalla() != null &&
          this.recursosMalla[i].getNombreMalla().localeCompare(nomRec) == 0) {

          encontrado = true;
          recurso = this.recursosMalla[i];

        }
        i = i + 1;
      }
      if (encontrado == false && recurso == null) { // si no encuentra el nombre creamos un recurso y lo cargamos

        recurso = new TRecursoMalla(nomRec);
        recurso.cargarMalla(nomRec);


        this.recursosMalla.push(recurso);


      }
    }
    return recurso;

  }

  getRecursoTextura(nomRec) { // busca por nombre el recurso textura en el array del gestor y lo devuelve si lo encuentra

    let recurso = null;
    let encontrado = false;

    if (this.recursosTextura == null)
      this.recursosTextura = [];

    if (nomRec != null && this.recursosTextura != null) {//buscamos a ver si esta en el array
      let i = 0;
      while (i <= this.recursosTextura.length - 1 && encontrado == false) {

        if (this.recursosTextura[i] != null && this.recursosTextura[i].getNombreTextura() != null &&
          this.recursosTextura[i].getNombreTextura().localeCompare(nomRec) == 0) {

          recurso = this.recursosTextura[i];
          encontrado = true;

        }
        i = i + 1;
      }
      if (encontrado == false && recurso == null) {// si no esta creamos un recurso y lo metemos al array
        recurso = new TRecursoTextura(nomRec);
        recurso.cargarTextura(nomRec);
        this.recursosTextura.push(recurso);
      }
    }

    return recurso;

  }
}

// ----------------------------------------- CARGAMOS EL FICHERO DE MALLA----------------------------

class TRecursoMalla {

  constructor(nombre) {

    this.nombre = nombre;
    this.VertexTextureCoordBuffer = null;
    this.VertexPositionBuffer = null;
    this.VertexNormalBuffer = null;
    this.VertexIndexBuffer = null;

    this.indicesBufferLength = null;

    this.mallaParse = null;
  }

  cargarMalla(nomb) {
    if (nomb != null) {

      const request = new XMLHttpRequest();
      request.open("GET", nomb);
      const auxGestor = this;

      request.onreadystatechange = function() {//cargamos la malla y usamos el parser para leerla
        //estos está cogido practicamente del libro webgl
        if (request.readyState == 4 && this.status == 200) {

          auxGestor.mallaParse = JSON.parse(request.responseText);
          auxGestor.cargado = true;

          auxGestor.handleLoadedMesh(auxGestor.mallaParse);


        }
      }
      request.send();
    }

  }

  handleLoadedMesh(rt) {//creamos y almacenamos todos los buffers que leemos del json al cargar la textura
    //el codigo es practicamente el del libro adaptado a nuestro codigo

   
  this.indexBufferLength = rt.indices.length;

  this.VertexNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexNormalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(rt.vertexNormals), gl.STATIC_DRAW);

  this.VertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(rt.vertexPositions), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  this.VertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.VertexIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(rt.indices), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  this.VertexTextureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexTextureCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(rt.vertexTextureCoords), gl.STATIC_DRAW);
  
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  }

  getMeshVertexPositionBuffer() {
    return this.VertexPositionBuffer;
  }

  getMeshVertexNormalBuffer() {
    return this.VertexNormalBuffer;
  }

  getVertexBufferLength() {
    return this.vertexBufferLength;
  }

  getIndicesBufferLength() {
    return this.indicesBufferLength;
  }

  getMeshVertexIndexBuffer() {
    return this.VertexIndexBuffer;
  }

  getMeshVertexTextureCoordBuffer() {
    return this.VertexTextureCoordBuffer;
  }

  getParse() {
    return this.mallaParse;
  }

  getNombreMalla() {
    return this.nombre;
  }

}

// ----------------------------------------- CARGAMOS EL FICHERO DE TEXTURA----------------------------

class TRecursoTextura {
  constructor(nomTextura) {
    this.texture = null;
    this.nombreTextura = nomTextura;
  }

  getNombreTextura() {
    return this.nombreTextura;
  }

  setNombreTextura(nombre) {
    this.nombreTextura = nombre;
  }

  getTexture() {
    return this.texture;
  }
 getTextureImage(){

  return this.texture.image;
 }
  cargarTextura(nombre) {//esto lo hemos sacado del libro webgl
    this.texture = gl.createTexture();
    this.texture.image = new Image();
    const auxRecurso = this;
    this.texture.image.src = nombre;
  }

}

