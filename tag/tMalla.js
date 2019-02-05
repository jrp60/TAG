 /** ***********************************************CLASE MALLA*******************************************/
 class tMalla extends tEntidad {

   constructor(nomRecurso, nomTextura) {

     super();
     this.nombreRecurso = nomRecurso;
     this.malla = null; // es un TRecursoMalla

     this.nombreTextura = nomTextura;
     this.textura = null; // es el recurso

     this.coneVertexBuffer = gl.createBuffer();
     this.coneIndexBuffer = gl.createBuffer();
     this.texCoordAttribLocation = null;

   }

   setTextura() {
    //almacena el recurso textura del gestor de recursos en el Tmalla
     this.textura = GestorRecursos.getRecursoTextura(this.nombreTextura);
   }

    setTexturaNueva(textura) {
    //en el menu podemos seleccionar diferentes texturas para cada objeto, esta es la funcion para poner dicha textura
     this.textura = GestorRecursos.getRecursoTextura(textura);
   }


   cargar() {//obtenemos el recurso malla del gestor y lo guardamos en la Tmalla
     this.malla = GestorRecursos.getRecursoMalla(this.nombreRecurso);
   }

   getBufferVertex() {
     return this.malla.getMeshVertexPositionBuffer();
   }

   getBufferIndices() {
     return this.malla.getMeshVertexIndexBuffer();
   }

   getVBO() {
     return this.malla.getMeshVertexIndexBuffer();
   }

   dameRecurso() {
     return this.malla;
   }

   dameNombre() {
     return this.nombreRecurso;
   }


   setMatrixUniforms() {

     const aux = mat4.create();
     mat4.set(viewMatrix, aux);//guardamos la viewMatrix en un auxiliar para crear la modelview a continuacion
     var mvMatrix = mat4.multiply(aux, modelMatrix, mvMatrix);
     gl.uniformMatrix4fv(prg.mvMatrixUniform, false, mvMatrix);// le pasmos las matrices al shader
     gl.uniformMatrix4fv(prg.pMatrixUniform, false, pMatrix);

     mat4.set(mvMatrix, nMatrix);//a partir de aqui es para crear las matrices de normales y pasarlas al shader
     mat4.inverse(nMatrix);
     mat4.transpose(nMatrix);

     gl.uniformMatrix4fv(prg.uNMatrix, false, nMatrix);


   }

   beginDraw() { //en este draw haremos que se utilicen los buffers para cada malla que hemos almacenado anteriormente
   

     gl.bindBuffer(gl.ARRAY_BUFFER, this.malla.getMeshVertexPositionBuffer());
     gl.vertexAttribPointer(prg.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
     gl.enableVertexAttribArray(prg.vertexPositionAttribute);


     if (this.malla.getMeshVertexTextureCoordBuffer() != null && this.textura != null) {
       gl.bindBuffer(gl.ARRAY_BUFFER,this.malla.getMeshVertexTextureCoordBuffer());
          this.texCoordAttribLocation = gl.getAttribLocation(prg,'aVertexTextureCoords');
          gl.vertexAttribPointer(
          this.texCoordAttribLocation, // lugar de los atributos
          2, //numero de elementos por atributo (U,V)
          gl.FLOAT, // tipo de elementos
          gl.FALSE, // si queremos que sea normalizado 
          2 * Float32Array.BYTES_PER_ELEMENT, // tamaño de un vertice
          0 // offset, es si los datos empiezan desde la posicion cero o cualquier otra
          );

          gl.enableVertexAttribArray(this.texCoordAttribLocation);

          gl.bindTexture(gl.TEXTURE_2D, this.textura.getTexture());
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          gl.texImage2D(
            gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
            gl.UNSIGNED_BYTE,
            this.textura.getTextureImage()
            );
          gl.bindTexture(gl.TEXTURE_2D, null);



          gl.bindTexture(gl.TEXTURE_2D, this.textura.getTexture());
          gl.activeTexture(gl.TEXTURE0);
     }


     gl.bindBuffer(gl.ARRAY_BUFFER, this.malla.getMeshVertexNormalBuffer());
     gl.vertexAttribPointer(prg.aVertexNormal, 3, gl.FLOAT, false, 0, 0);
     gl.enableVertexAttribArray(prg.aVertexNormal);

     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.malla.getMeshVertexIndexBuffer());


     this.setMatrixUniforms();
     gl.drawElements(gl.TRIANGLES, this.malla.getParse().indices.length, gl.UNSIGNED_SHORT, 0);


   }

   endDraw() {

   }
 }
