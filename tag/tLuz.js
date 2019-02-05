  class tLuz extends tEntidad {

    constructor() {
      super();


      this.luzAmbiente = [0.1, 0.1, 0.1];
      this.luzDifusa = [1.0,1.0,1.0];
      this.luzEspecular = [0.0,0.0,0.0];
      this.posicion = [0.0,0.0,0.0];

      this.aux=[];
      this.vector=[0,0,0,1];

    }

    initLight() { //inicializamos ciertos parametros de la luz al crear la ntidad

      gl.uniform3f(prg.uLightPosition, this.posicion[0], this.posicion[1], this.posicion[2]);
      gl.uniform3f(prg.uLightAmbient, this.luzAmbiente[0], this.luzAmbiente[1], this.luzAmbiente[2]);
      gl.uniform1f(prg.uShininess, 24.0);
      gl.uniform3f(prg.uMaterialSpecular, this.luzEspecular[0], this.luzEspecular[1], this.luzEspecular[2]);
      gl.uniform3f(prg.uMaterialDiffuse, this.luzDifusa[0], this.luzDifusa[1], this.luzDifusa[2]);

    }


    setLuzDifusa(fx, fy, fz) {
      this.luzDifusa = [fx,fy,fz];
    }

    setLuzAmbiente(i) {
      this.luzAmbiente = [i,i,i];
      
    }

    setPosicion(fx, fy, fz) {
      this.posicion = [fx,fy,fz
      ];
    }

    setLuzEspecular(i) {
      this.luzEspecular = [i,i,i];
      
    }

    getLuzEspecular() {
      return this.luzEspecular;
    }

    getLuzDifusa() {
      return this.luzDifusa;
    }


    beginDraw() {
     
     //para pasarle los datos al shader de la luz
     
      mat4.multiply(modelMatrix,this.vector,this.aux);
      
      gl.uniform3f(prg.uLightPosition,this.aux[0],this.aux[1],this.aux[2]);
      gl.uniform3f(prg.uMaterialDiffuse, this.luzDifusa[0], this.luzDifusa[1], this.luzDifusa[2]);
      gl.uniform3f(prg.uMaterialSpecular, this.luzEspecular[0], this.luzEspecular[1], this.luzEspecular[2]);
      gl.uniform3f(prg.uLightAmbient, this.luzAmbiente[0], this.luzAmbiente[1], this.luzAmbiente[2]);
    }

    endDraw() {
    }

  }
