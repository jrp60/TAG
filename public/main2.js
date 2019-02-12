import { Vertex, Fragment } from './js/Shaders2.js';

window.onload = function () {
    const mat4 = glMatrix.mat4;
    const vec3 = glMatrix.vec3;
    var gl = document.querySelector("canvas").getContext("experimental-webgl");

    var vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, Vertex);
    gl.compileShader(vs);

    var fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, Fragment);
    gl.compileShader(fs);

    var program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    var colorLoc = gl.getAttribLocation(program, "color");
    gl.enableVertexAttribArray(colorLoc);
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    var colors = [
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
        1.0, 0.0, 1.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);

    var posLoc = gl.getAttribLocation(program, "pos");
    gl.enableVertexAttribArray(posLoc);
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var vertices = [
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
        1.0, 0.0, 1.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);

    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    var indices = [0, 1, 2, 0, 1, 3, 1, 2, 3, 0, 2, 3];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);

    var mmatrix = mat4.create();
    mat4.scale(mmatrix, mmatrix, vec3.fromValues(0.4, 0.8, 0.7));
    var mmLoc = gl.getUniformLocation(program, "MMatrix");

    var vmatrix = mat4.create();
    mat4.translate(vmatrix, vmatrix, vec3.fromValues(0, 0, -2));
    var vmLoc = gl.getUniformLocation(program, "VMatrix");
    gl.uniformMatrix4fv(vmLoc, false, vmatrix);

    var pmatrix = mat4.create();
    mat4.perspective(pmatrix, Math.PI / 3, 2, 0.1, 100);
    var pmLoc = gl.getUniformLocation(program, "GLMatrix");
    gl.uniformMatrix4fv(pmLoc, false, pmatrix);

    gl.enable(gl.DEPTH_TEST);
    var render = function () {
        mat4.rotateX(mmatrix, mmatrix, 0.01);
        mat4.rotateY(mmatrix, mmatrix, 0.01);
        gl.uniformMatrix4fv(mmLoc, false, mmatrix);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_BYTE, 0);
        requestAnimationFrame(render);
    }
    window.requestAnimationFrame = window.requestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.webkitRequestAnimationFrame
        || function (cb) { setTimeout(cb, 1000 / 60); };

    render();
}