//Libreria de glMatrix
//import * as glMatrix from "./toji-gl-matrix-7fc31d5/src/gl-matrix/mat4";

var rootCreated = false;
var treeRoot= new Node("null",testEntity,"raiz");
var pila = new Pila();
var model = mat4.create();


function Pila() {

    var elements = [];
 
    this.add = add;
    this.pop = pop;
    this.getTopElement = getTopElement;
    this.hasElements = hasElements;
    this.removeAll = removeAll;
    this.size = size;
 
    function add(element) {
        elements.push(element);
    }
 
    function pop() {
        return elements.pop();
    }
 
    function getTopElement() {
        return elements[elements.length - 1];
    }
 
    function hasElements() {
        return elements.length > 0;
    }
 
    function removeAll() {
        elements = [];
    }
 
    function size() {
        return elements.length;
    }
}

/*********************************
Gestor de  recurso
*********************************/
var Gestor = new TGestorRecursos();

/*********************************
Gestor de  recurso
*********************************/

//Hay que pasar el objeto nodo
Array.prototype.indexOf = function (val) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.remove = function (val) {
    let index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

function Entity()//Clase interfaz
{
    //Metodo virtual
    this.beginDraw  = function()
    {

    }
    //Metodo virtual
    this.endDraw    = function()
    {

    }

}

/**************************************
Ramon start
***************************************/
function Luz()
{
    //Herencia
    Entity.call(this);
    this.intensidad;

    this.beginDraw  = function()
    {


    }

    this.endDraw    = function()
    {

    }

}
function Camara()
{
    //Herencia
    Entity.call(this);
    this.esPerspectiva;
    this.cercano;
    this.lejano;

    this.beginDraw  = function()
    {


    }

    this.endDraw    = function()
    {

    }

}
/**************************************
Ramon end
***************************************/



/***********************************
Modificacion Libin start
************************************/



function Malla()
{
    //Herencia
    Entity.call(this);

    let malla=undefined;

    this.cargarMalla = function(fichero)
    {
        this.malla = Gestor.TRMalla(fichero);
        // rellenar buffer con los valores del json
        // array de mallas

    }

    this.beginDraw  = function()
    {
        //crear buffer aqui¿?
        // dibujar
    }

    this.endDraw    = function()
    {
        // return pila.pop();
        console.log("Saliendo de draw().")
    }

}

// let nodoMalla = new Node( nodo , Gestor.TRMalla('cubo.json') , name );

function Transform()
{
    //Herencia
    Entity.call(this);
    this.matriz = mat4.create();

    this.identidad = function()
    {
        return mat4.identity;
    }

    //Cambiar el valor de matriz
    this.cargar = function (array)
    {
        this.matriz=mat4.set(this.matriz,
                    array[0],
                    array[1],
                    array[2],
                    array[3],
                    array[4],
                    array[5],
                    array[6],
                    array[7],
                    array[8],
                    array[9],
                    array[10],
                    array[11],
                    array[12],
                    array[13],
                    array[14],
                    array[15]
                  );
    }

    this.traslate = function(vector)
    {
        this.matriz = mat4.scalar.translate(this.matriz,this.matriz,vector);
    }

    this.scalar = function(vector)
    {
        this.matriz = mat4.scalar.scale(this.matriz,this.matriz,vector);
    }

    this.rotationX = function(angulo)
    {
        let rad=angulo*Math.PI/180;
        this.matriz = mat4.scalar.rotateX(this.matriz,this.matriz,rad);
    }

    this.rotationY = function(angulo)
    {
        let rad=angulo*Math.PI/180;
        this.matriz = mat4.scalar.rotateY(this.matriz,this.matriz,rad);
    }

    this.rotationZ = function(angulo)
    {
        let rad=angulo*Math.PI/180;
        this.matriz = mat4.scalar.rotateY(this.matriz,this.matriz,rad);
    }


    this.beginDraw = function()// apila el model actual
    {
        // console.log("Vamos a apilar:", model);
        // crear una nueva para que no apunten a la misma zona de memoria
        var aux = new mat4.create();
        for(var i = 0; i<model.length; i++){
            aux[i]=model[i]
        }
        console.log("Vamos a apilar la matriz ->", aux);
        pila.add(aux);
        model = mat4.multiply(model, model, this.matriz);
        
    }

    this.endDraw   = function()// desapilla el ultimo metido en la pila
    {
        console.log("Desapilando", pila[pila.length-1]);
        model=pila.pop();
        // return pila.pop();
    }

}

var testEntity = new Transform();

function showMatrix()
{
    // for(let i=0;i<testEntity.matriz.length;i++)
    // {

    //     console.log("Matriz "+testEntity.matriz[i]);
    // }

    let html = testEntity.matriz[0]+" "+testEntity.matriz[4]+" "+testEntity.matriz[8]+" "+testEntity.matriz[12]+"<br>";
        html+= testEntity.matriz[1]+" "+testEntity.matriz[5]+" "+testEntity.matriz[9]+" "+testEntity.matriz[13]+"<br>";
        html+= testEntity.matriz[2]+" "+testEntity.matriz[6]+" "+testEntity.matriz[10]+" "+testEntity.matriz[14]+"<br>";
        html+= testEntity.matriz[3]+" "+testEntity.matriz[7]+" "+testEntity.matriz[11]+" "+testEntity.matriz[15]+"<br>";

    document.getElementById("resultadoshowMatrix").innerHTML=html;


    return false;
}

function cargarMatiz(frm)
{
    let array=[];
    array[0]=frm.matrizPisicion11.value;
    array[1]=frm.matrizPisicion12.value;
    array[2]=frm.matrizPisicion13.value;
    array[3]=frm.matrizPisicion14.value;
    array[4]=frm.matrizPisicion21.value;
    array[5]=frm.matrizPisicion22.value;
    array[6]=frm.matrizPisicion23.value;
    array[7]=frm.matrizPisicion24.value;
    array[8]=frm.matrizPisicion31.value;
    array[9]=frm.matrizPisicion32.value;
    array[10]=frm.matrizPisicion33.value;
    array[11]=frm.matrizPisicion34.value;
    array[12]=frm.matrizPisicion41.value;
    array[13]=frm.matrizPisicion42.value;
    array[14]=frm.matrizPisicion43.value;
    array[15]=frm.matrizPisicion44.value;

    testEntity.cargar(array);

    showMatrix();

    return false;
}

function trasladarMatiz(frm)
{

     let x=frm.traslateX.value;
     let y=frm.traslateY.value;
     let z=frm.traslateZ.value;

     let vector = [x,y,z];
     testEntity.traslate(vector);

     showMatrix();

    return false;
}

function escalarMatiz(frm)
{

     let x=frm.scalarX.value;
     let y=frm.scalarY.value;
     let z=frm.scalarZ.value;

     let vector = [x,y,z];
     testEntity.scalar(vector);

     showMatrix();

    return false;
}

function rotarMatiz(frm)
{

    let selector    = document.getElementById("CoordenadaRotacionSelector");
    let coordenada  = selector.options[selector.selectedIndex].value;
    let angulo      = frm.anguloRotacion.value;

    if(coordenada=='x')
    {
        testEntity.rotationX(angulo);
    }
    else if(coordenada=='y')
    {
        testEntity.rotationY(angulo);
    }
    else if(coordenada=='z')
    {
        testEntity.rotationZ(angulo);
    }

    showMatrix();

    return false;
}

/***********************************
Modificacion Libin finish
************************************/
function Node( father , entity , name ) 
{
    this.father = father;
    this.name   = name;
    this.entity = entity;
    this.child  = [];
    

    this.addChild = function( hijo )
    {
        this.child.push(hijo);
    }

    this.remChild = function( hijo )
    {
        this.child.remove(hijo);
    }

    this.setEntity = function( entidad )
    {
        this.child.entity = entidad;
    }
    
/*********************************************
Metodo draw   (Sin corregir)
*********************************************/
    this.draw = function()
    {
        console.log("Entrando a draw:", this.name);
        if(this.name!="raiz"){
            this.entity.beginDraw();
        }else console.log("Estado de model en Raiz:", model);
        for(let i=0;i<this.child.length;i++)
        {
            // console.log("Estado de la pila:", pila);
            this.child[i].draw();
        }
        if(this.name!="raiz"){

            if (this.entity instanceof Transform){
                this.entity.endDraw();
            }
            
            

            else{
                this.entity.endDraw();
            }

        }
    }

}


// START MODIFICATION PABLO

function eliminarChild(frm)
{
    let selector= document.getElementById("removeChildChildSelector");
    let name  = selector.options[selector.selectedIndex].value;
    let arbol = mostrarArbol(treeRoot);
    let nodo;
    // for(let i=0;i<arbol.length;i++)
    // {
    //     if(arbol[i].name==name)
    //     {
    //         nodo = arbol[i];
    //         console.log(nodo.name);
    //         eliminarTodosHijosNodo(nodo);
            
    //     }
    // }
    console.log("bien");
    nodo=encontrarNodo(treeRoot,name);

    eliminarTodosHijosNodo(nodo);

    updateSelector();
    return false
}

function encontrarNodo(raiz,name)
{
    for(let i=0;i<raiz.child.length;i++)
    {
        if(raiz.child[i].name==name)
        {
            return raiz.child[i];
        }
        else
        {
            raiz=encontrarNodo(nodo.child[i],arbol);
        }
        
    }
    return raiz;
}

function eliminarTodosHijosNodo(nodo){

    console.log("Entrando a eliminar hijos, este es el NODO:" + nodo.name );

    if(nodo.child.length != 0){

        for(let i = 0; i<nodo.child.length; i++){

            eliminarTodosHijosNodo(nodo.child[i]);
            console.log("Entrar444");   
        }
    }
    //console.log("Entrar555 "+nodo.name);
    //para el padre del nodo tenemos que eliminarlo del array
    console.log("Entrar555 "+nodo.name);

    nodo.father.remChild(nodo);

    nodo=undefined;

    if(nodo!=null){
        console.log("El nodo " + nodo.name + " es muy jugueton y no se quiere eliminar");
    }
    return false;
}

function createNode(frm)
{
    if(rootCreated)
    {
        //Sacar los valores del formulario
        let name    = frm.nodeEntity.value;
        let selector= document.getElementById("fatherSelectorCreate");
        let father  = selector.options[selector.selectedIndex].value;


        //Sacamos todos los nodos
        let arbol = mostrarArbol(treeRoot);

        //Buscar si ya tiene un nodo con ese nombre
        let nombreExiste = false;
        for(let i=0;i<arbol.length;i++)
        {
            if(arbol[i].name==name)
                nombreExiste = true;
        }
        //Si el nombre no existe, añadimos el nodo
        if(!nombreExiste)
        {
            //Buscar padre
            let nodefather;
            for(let i=0;i<arbol.length;i++)
            {
                if(arbol[i].name==father)
                    nodefather=arbol[i];
            }

            //Crear nodo
            let node = new Node(nodefather,testEntity,name);
            
            //Añadir el nuevo hijo a padre
            nodefather.addChild(node);

            let html = '';
            html += '<p>El nodo '+ name +' ha creado con existo</p>';
            html += '<p>El padre es: '+ father +'</p>';
            document.getElementById("resultadoCrearnodo").innerHTML=html;

            updateSelector();
        }
        else //Si el nombre existe ya, devolvemos un mensaje diciendo que el nombre ya existe
        {
            let html = 'El nombre ya existe, introduce otro nombre';
            document.getElementById("resultadoCrearnodo").innerHTML=html;
        }
        

    }
    else
    {
        //console.log("Please create root first.")
    }
    return false;
}

function mostrarArbol(nodo)
{
    let arbol = [nodo];
    return mostrarArbolRecursivo(nodo,arbol);

}

function mostrarArbolRecursivo(nodo,arbol)
{
    for(let i=0;i<nodo.child.length;i++)
    {
        arbol.push(nodo.child[i]);
        arbol=mostrarArbolRecursivo(nodo.child[i],arbol);
    }
    return arbol;
}



function fatherChange()
{
    let selector    = document.getElementById("removeChildFatherSelector");
    let name      = selector.options[selector.selectedIndex].value;
    let arbol = mostrarArbol(treeRoot);
    let fatherNode;

    for(let i=0;i<arbol.length;i++)
    {
        if(arbol[i].name==name)
            fatherNode=arbol[i];
    }

    html  = '';
    for(let i=0;i<fatherNode.child.length;i++)
    {
        html += '<option>'+ fatherNode.child[i].name +'</option>';
    }
    document.getElementById('removeChildChildSelector').innerHTML=html;

    return false;

}


function consultFather(frm)
{
    if(rootCreated)
    {
        let selector    = document.getElementById("fatherSelectorConsult");
        let name        = selector.options[selector.selectedIndex].value;
        let encontrado  = false;

        let arbol = mostrarArbol(treeRoot);

        for(let i=0;i<arbol.length && encontrado==false ;i++)
        {
            if(arbol[i].name==name)
            {
                let html='';
                if(arbol[i].father==null)
                {
                    html = 'El nodo ' + name + ' es la raiz, por lo tanto, no tiene padre';
                }
                else
                {
                    html = '<p>El padre del nodo ' + name + ' es '+ arbol[i].father.name + '</p>';
                }
                

                document.getElementById("resultadoConsultarPadre").innerHTML=html;
                encontrado = true;
            }
        }
        if(encontrado == false)
        {
            let html = '<p>No ha encontrado el nodo</p>';
            document.getElementById("resultadoConsultarPadre").innerHTML=html;
        }
    }
    else
    {
        console.log("Please create root first.")
    }
    return false;
}

function setNombre(frm)
{
    let selector    = document.getElementById("setEntitySelector");
    let name        = selector.options[selector.selectedIndex].value;
    let valor       = frm.nodeEntitySetting.value;
    let encontrado  = false;

    //Sacamos todos los nodos
    let arbol = mostrarArbol(treeRoot);

    //Buscar si ya tiene un nodo con ese nombre
    let nombreExiste = false;
    for(let i=0;i<arbol.length;i++)
    {
        if(arbol[i].name==name)
            nombreExiste = true;
    }
    //Si el nombre no existe, añadimos el nodo
    if(!nombreExiste)
    {
        for(let i=0;i<arbol.length && encontrado==false;i++)
        {
            if(arbol[i].name==name)
            {
                arbol[i].name=valor;
                encontrado=true;
            }
        }
        if(encontrado==true)
        {
            let html  = '';
                html += 'Ha modificado correctamente, ahora la entidad del nodo es: '+valor;
                document.getElementById('resultadoSetEntity').innerHTML=html;
                updateSelector();
        }
    }
    else
    {
            let html  = 'El nombre existe ya, introduce otro nombre por favor';
            document.getElementById('resultadoSetEntity').innerHTML=html;
    }

    
    //resultadoSetEntity
    return false;

}


//Actualizar el selector de los formularios
function updateSelector()
{
    let html  = '';



    let arbol = mostrarArbol(treeRoot);

        
    for(let i=0;i<arbol.length;i++)
    {
        html += '<option>'+arbol[i].name+'</option>';
    }
    
    //Actualizar selector
    document.getElementById("fatherSelectorCreate").innerHTML=html;
    document.getElementById("fatherSelectorConsult").innerHTML=html;
    document.getElementById("setEntitySelector").innerHTML=html;
    
    //Actualizar el campo de eliminacion
    document.getElementById("removeChildFatherSelector").innerHTML=html;
    
    let selector    = document.getElementById("removeChildFatherSelector");
    let name      = selector.options[selector.selectedIndex].value;
    let fatherNode;
    for(let i=0;i<arbol.length;i++)
    {
        if(arbol[i].name==name)
            fatherNode=arbol[i];
    }
    //console.log(fatherNode.name);

    html  = '';
    for(let i=0;i<fatherNode.child.length;i++)
    {

        html += '<option>'+ fatherNode.child[i].name +'</option>';
    }

    document.getElementById('removeChildChildSelector').innerHTML=html;
    
    return false;

}




// function createRoot(frm)
// {
    
//     let name = frm.rootEntity.value;
//     // treeRoot = new Node("null",testEntity,name);
//     rootCreated = true;
    
//     let html  = '';

//         //Formulario de crear nodo
//         html += '<h3>Añadir nodo</h3>';
//         html += '<form onsubmit="return createNode(this)">';
//         html += '<span>Entidad de nodo: </span>';
//         html += '<input type="text" name="nodeEntity">';
//         html += '<br>';
//         html += '<span>Padre de nodo: </span>';
//         html += '<select id="fatherSelectorCreate">';

//         html += '<option>'+treeRoot.name+'</option>';


//         html += '</select>';
//         html += '<br>';
//         html += '<input type="submit" value="Crear node">';
//         html += '</form>';
//         html += '</form>';
//         html += '<div id="resultadoCrearnodo">';
//         html += '</div>';
//         html += '<hr>';

//         //Formulario de consultar padre
//         html += '<h3>Consultar padre</h3>';
//         html += '<form onsubmit="return consultFather(this)">';
//         html += '<span>Seleccionar nodo: </span>';
//         html += '<select id="fatherSelectorConsult">';
//         html += '<option>'+treeRoot.name+'</option>';
//         html += '</select>';
//         html += '<br>';
//         html += '<input type="submit" value="Consultar padre">';
//         html += '</form>';
//         html += '<div id="resultadoConsultarPadre">';
//         html += '</div>';
//         html += '<hr>';



//         //Formulario de set entidad
//         html += '<h3>Cambiar nombre nodo</h3>';
//         html += '<form onsubmit="return setNombre(this)">';
//         html += '<span>Escribe el nuevo nombre: </span>';
//         html += '<input type="text" name="nodeEntitySetting"><br>';
//         html += '<span>Seleccionar nodo: </span>';
//         html += '<select id="setEntitySelector">';
//         html += '<option>'+treeRoot.name+'</option>';
//         html += '</select>';
//         html += '<br>';
//         html += '<input type="submit" value="Cambiar entidad">';
//         html += '</form>';
//         html += '<div id="resultadoSetEntity">';
//         html += '</div>';
//         html += '<hr>';

//         //Formulario de eliminar hijo
//         html += '<h3>Eliminar hijo</h3>';
//         html += '<form onsubmit="return eliminarChild(this)">';
//         html += '<span>Seleccionar padre: </span>';
//         html += '<select id="removeChildFatherSelector" onchange="return fatherChange()">';
        

//         html += '<option>'+treeRoot.name+'</option>';
//         html += '</select>';

//         html += '<br>';

//         html += '<span>Seleccionar hijo: </span>';
//         html += '<select id="removeChildChildSelector">';
//         for(let i=0;i<treeRoot.child.length;i++)
//         {
//             html += '<option>'+treeRoot.child[i]+'</option>';
//         }
//         html += '</select>';
//         html += '<br>';
//         html += '<input type="submit" value="Eliminar entidad">';
//         html += '</form>';
//         html += '<div id="resultadoSetEntity">';
//         html += '</div>';
//         html += '<hr>';
// /*********************************************
// Modificacion Libin start
// **********************************************/
//         //Cargar matriz
//         html += '<h3>Cargar matriz</h3>';
//         html += '<form onsubmit="return cargarMatiz(this)">';
//         html += '11<input type"text" name="matrizPisicion11" value="1" size="4">&nbsp;&nbsp;';
//         html += '21<input type"text" name="matrizPisicion21" value="0" size="4">&nbsp;&nbsp;';
//         html += '31<input type"text" name="matrizPisicion31" value="0" size="4">&nbsp;&nbsp;';
//         html += '41<input type"text" name="matrizPisicion41" value="0" size="4">&nbsp;&nbsp;';
//         html += '<br>';

//         html += '12<input type"text" name="matrizPisicion12" value="0" size="4">&nbsp;&nbsp;';
//         html += '22<input type"text" name="matrizPisicion22" value="1" size="4">&nbsp;&nbsp;';
//         html += '32<input type"text" name="matrizPisicion32" value="0" size="4">&nbsp;&nbsp;';
//         html += '42<input type"text" name="matrizPisicion42" value="0" size="4">&nbsp;&nbsp;';
//         html += '<br>';

//         html += '13<input type"text" name="matrizPisicion13" value="0" size="4">&nbsp;&nbsp;';
//         html += '23<input type"text" name="matrizPisicion23" value="0" size="4">&nbsp;&nbsp;';
//         html += '33<input type"text" name="matrizPisicion33" value="1" size="4">&nbsp;&nbsp;';
//         html += '43<input type"text" name="matrizPisicion43" value="0" size="4">&nbsp;&nbsp;';
//         html += '<br>';

//         html += '14<input type"text" name="matrizPisicion14" value="0" size="4">&nbsp;&nbsp;';
//         html += '24<input type"text" name="matrizPisicion24" value="0" size="4">&nbsp;&nbsp;';
//         html += '34<input type"text" name="matrizPisicion34" value="0" size="4">&nbsp;&nbsp;';
//         html += '44<input type"text" name="matrizPisicion44" value="1" size="4">&nbsp;&nbsp;';
//         html += '<br>';
        
//         html += '<br>';
//         html += '<input type="submit" value="Cargar matriz">';
//         html += '</form>';
//         html += '<hr>';
//         //Trasladar matriz
//         html += '<h3>Trasladar matriz</h3>';
//         html += '<form onsubmit="return trasladarMatiz(this)">';
//         html += 'x<input type"text" name="traslateX" value="0" size="4">&nbsp;&nbsp;';
//         html += 'y<input type"text" name="traslateY" value="0" size="4">&nbsp;&nbsp;';
//         html += 'z<input type"text" name="traslateZ" value="0" size="4">&nbsp;&nbsp;';
//         html += '<br>';
        
//         html += '<br>';
//         html += '<input type="submit" value="Trasladar matriz">';
//         html += '</form>';
//         html += '<hr>';

//         //Escalar matriz
//         html += '<h3>Escalar matriz</h3>';
//         html += '<form onsubmit="return escalarMatiz(this)">';
//         html += 'x<input type"text" name="scalarX" value="1" size="4">&nbsp;&nbsp;';
//         html += 'y<input type"text" name="scalarY" value="1" size="4">&nbsp;&nbsp;';
//         html += 'z<input type"text" name="scalarZ" value="1" size="4">&nbsp;&nbsp;';
//         html += '<br>';
        
//         html += '<br>';
//         html += '<input type="submit" value="Escalar matriz">';
//         html += '</form>';
//         html += '<hr>';

//         //Rotacion matriz
//         html += '<h3>Rotar matriz</h3>';
//         html += '<form onsubmit="return rotarMatiz(this)">';
//         html += '<select id="CoordenadaRotacionSelector">';
//         html += '<option>x</option>';
//         html += '<option>y</option>';
//         html += '<option>z</option>';
//         html += '</select>&nbsp;&nbsp;'
//         html += 'Angulo<input type"text" name="anguloRotacion" value="0" size="4">º&nbsp;&nbsp;';
//         html += '<br>';
        
//         html += '<br>';
//         html += '<input type="submit" value="Escalar matriz">';
//         html += '</form>';
//         html += '<hr>';

//         //Prueba de transformacion
//         html += '<h3>Mostrar matriz</h3>';
//         html += '<button type="button" onclick="return showMatrix()">Mostrar matriz</button>';
//         html += '<hr>';
//         html += '<div id="resultadoshowMatrix">';
//         html += '</div>';
//         html += '<hr>';
// /*********************************************
// Modificacion Libin finish
// **********************************************/

//     document.getElementById("nodefooter").innerHTML=html;


//     return false;
// }

