
var gl; // contexto programa
var vsHandle, fsHandle, programHandle;
var camaraActiva = null;
var luzActiva = null;




var part = [];    // Para cargar varios buffers de distintos objetos.
var vbo = [];
var ibo = [];
var nbo = [];

function startWebGL(){ //main al que se llama al iniciar el programa

    var canvas = document.getElementById("glcanvas");
    gl = initWebGL(canvas);
    //Setear shaders

    if(gl){ //Solo continuar en el caso de que el navegador pueda correr webGL
        setShaders();

        // LINKAR VARIABLES DE LOS SHADERS
        // VERTEX SHADER
        programHandle.aVertexPosition     = gl.getAttribLocation(programHandle, "aVertexPosition"); //devuelve el indice de la variable definida en el v-shader
        programHandle.aVertexNormal       = gl.getAttribLocation(programHandle, "aVertexNormal");
        programHandle.uMVMatrix           = gl.getUniformLocation(programHandle, "uMVMatrix"); // as
        programHandle.uPMatrix            = gl.getUniformLocation(programHandle, "uPMatrix"); //
        programHandle.uNMatrix            = gl.getUniformLocation(programHandle,"uNMatrix");
        programHandle.uLightPosition      = gl.getUniformLocation(programHandle,"uLightPosition");
        
        // FRAGMENT SHADER
        programHandle.uLightAmbient       = gl.getUniformLocation(programHandle,"uLightAmbient");
        programHandle.uMaterialSpecular   = gl.getUniformLocation(programHandle,"uMaterialSpecular");
        programHandle.uMaterialDiffuse    = gl.getUniformLocation(programHandle,"uMaterialDiffuse");
        programHandle.uShininess          = gl.getUniformLocation(programHandle,"uShininess");

        // Iniciar el valor de las luces en la escena
        initLights();


    }
    
}

// PREGUNTAR RAFA: a esta funcion esta bien que se llame desde el metodo draw de Malla??

function cargarModelo(malla){ // funcion a la que se le pasa la malla ya con las TRANSFORMACIONES APLICADAS.(vertices, faces, normals)
    console.log("Entrando a cargar la malla");
    // IMPORTANTE! en nuestros json el array de indices se llama 'faces':
    // creamos un conjunto de buffer por cada objeto que vamos a renderizar en la escena
    // vertexBufferObject -> contendra toda la informacion de los vertices del objeto a renderizar

    var vertexBufferObject = gl.createBuffer(); // creamos el buffer de vertices
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject); // liga el buffer al programa, cualq operacion de buffer se hara sobre este
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(malla.vertices), gl.STATIC_DRAW); // aqui pasamos su valor al programa

    var normalBufferObject = gl.createBuffer(); // lo mismo para las normales
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBufferObject); //lo asociamos
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(malla.normales), gl.STATIC_DRAW); //almacenamos los datos
    // utils nos permite calcular las normales de la malla para poder hacer la luz especular

    var indexBufferObject = gl.createBuffer(); //lo mismo para los indices(que le dicen a webgl como tiene que unir los vertices)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferObject); // lo asociamos
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(malla.faces), gl.STATIC_DRAW);

    // los anadimos al conjunto de buffers que luego vamos a dibujar
    vbo.push(vertexBufferObject);
    ibo.push(indexBufferObject);
    nbo.push(normalBufferObject);

    // le asociamos nulo para liberar memoria?
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ARRAY_BUFFER,null);

    part.push(malla);
}

// por ultimo una funcion que permita dibujar la escena
function dibujarEscena(){

    gl.clearColor(0.1,0.1,0.1,1.0); // estableciendo el color de fondo
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);


}


function initWebGL(canvas){ //tomar contexto webgl en el canvas. 
    gl = null;
    try {
    // Tratar de tomar el contexto estandar. Si falla, retornar al experimental.
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }
    catch(e) {}

    // Si no tenemos ningun contexto GL, date por vencido ahora
    if (!gl) {
        alert("Imposible inicializar WebGL. Tu navegador puede no soportarlo.");
        gl = null;
    }
    return gl;
}

function initLights(){

    gl.uniform3f(programHandle.uLightPosition, 31000, 14000, 24000); //asignar variables uniform que se encuentran (uniform vec3)
    gl.uniform3f(programHandle.uLightAmbient,0.1,0.1,0.1);
    gl.uniform3f(programHandle.uMaterialSpecular, 0.5,0.5,0.5);   
    gl.uniform3f(programHandle.uMaterialDiffuse, 0.8,0.8,0.8);
    gl.uniform1f(programHandle.uShininess, 24.0);

}
function setShaders(){

    //CREANDO LOS SHADERS
    vsHandle = gl.createShader(gl.VERTEX_SHADER);
    fsHandle = gl.createShader (gl.FRAGMENT_SHADER);

    //CARGANDO LOS SHADERS
    var myVertexShaderSrc = document.getElementById("vertex-shader").text;
    gl.shaderSource(vsHandle, myVertexShaderSrc);

    var myFragmentShaderSrc = document.getElementById("fragment-shader").text;
    gl.shaderSource(fsHandle, myFragmentShaderSrc);

    //COMPILANDO LOS SHADERS
    gl.compileShader(vsHandle);
    gl.compileShader(fsHandle);

    programHandle = gl.createProgram();
    gl.attachShader(programHandle , fsHandle);
    gl.attachShader(programHandle , vsHandle);
    gl.linkProgram(programHandle);

    gl.useProgram(programHandle);

    //AHORA YA ESTAN TODOS LOS SHADER VINCULADOS
}






function crearArbolEjemplo(){
    console.log("Creando arbol de ejemplo")
    treeRoot.child[0] = crearTransformacion(treeRoot);
    treeRoot.child[0].child[0] = crearMalla(treeRoot.child[0], "silla.json");

    treeRoot.child[1] = crearTransformacion(treeRoot);
    treeRoot.child[1].child[0] = crearMalla(treeRoot.child[1], "icosphereMaterial.json");

}