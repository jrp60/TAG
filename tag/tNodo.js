class tNodo {

  constructor(padre, hijos, entidad, nombre) {
    this.hijos = hijos; 
    this.padre = padre;
    this.entidad = entidad;
    this.nombre = nombre; // variable auxiliar para saber que nodo es
  }

  addHijo(nodo) { // para anyadir un hijo al nodo

    let hecho = false;

    if (this.hijos != null) { // primero comprobamos si tiene hijos

      if (nodo != null) {
        this.hijos.push(nodo);
        hecho = true;
      }
    } else { // si no tiene hijos creamos el array
      if (nodo != null) {
        this.hijos = [];
        this.hijos.push(nodo);
        hecho = true;
      }
    }

    return hecho;
  }

  getTipoNombre() {
    return this.nombre;
  }

  borraNodo() {

    let hecho = false;

    if (this.getPadre() != null && this.getHijos() != null && this.getHijos().length > 0) { // si tiene padre y tiene hijos
      for (var i = 0; i < this.hijos.length; i++) {
        this.hijos[i].setPadre(this.padre);
        this.padre.addHijo(hijos[i]);
        hecho = true;
      }

    } else if (this.getPadre() != null && (this.getHijos() == null || this.getHijos().length == 0)) { // si tiene padre y no hijos

      const aux = this.padre.getHijos().indexOf(this); // indexOf -> obtener el indice del objeto pasado por parametros en el array
      this.padre.getHijos().splice(aux, 1); // splice -> borra x elemente en la posicion del array que le pases
      hecho = true;

    } else if (this.getPadre() == null && (this.getHijos() != null || this.getHijos().length > 0)) { // si no tiene padre pero si hijos
      for (var i = 0; i < this.hijos.length; i++) {
        this.hijos[i].setPadre(null);
      }
      hecho = true;
    }

    return hecho;
  }

  getTipoHijo() { // PARA SABER DE QUE TIPO ES
    let aux = this.getHijos();

    if (aux != null) {

      while (aux[0].getEntidad() instanceof tTransform) {
        aux = aux[0].getHijos();
      }

      if (aux[0].getEntidad() instanceof tCamara) {
        return "camara";
      }
      if (aux[0].getEntidad() instanceof tMalla) {
        return "malla";
      }
      if (aux[0].getEntidad() instanceof tLuz) {
        return "luz";
      }

    } else {
      console.log("no tiene hijos");
    }
  }

  getHijos() { // para conseguir los hijos
    return this.hijos;
  }

  getPadre() { // para conseguir el papi
    return this.padre;
  }

  setPadre(nodo) { // para cambiar el padre a null o a un nodo
    this.padre = nodo;
  }


  getEntidad() { // para devolver la entidad
    return this.entidad;
  }

 
  drawNode() { // recorremos todo el arbol

    if (this.entidad != null) {
      this.entidad.beginDraw();
    }
    if (this.hijos != null) {
      for (let i = 0; i < this.hijos.length; i++) {

        if (this.hijos[i] != null) {

          this.hijos[i].drawNode();
        }
      }
    }
    if (this.entidad != null) {
      this.entidad.endDraw();
    }
  }
}
