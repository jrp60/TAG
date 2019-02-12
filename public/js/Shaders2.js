export const Vertex =
`
attribute vec3 pos;
attribute vec3 color;
varying vec3 varyingColor;
uniform mat4 MMatrix;
uniform mat4 VMatrix;
uniform mat4 GLMatrix;
void main(void) {
        gl_Position = GLMatrix * VMatrix * MMatrix * vec4(pos, 1.0);
        varyingColor = color;
}

`;

export const Fragment = 

`
precision mediump float;
varying vec3 varyingColor;
void main(void) {
        gl_FragColor = vec4(varyingColor, 1.0);
}

`;