export const Vertex =
`
precision mediump float;
 
attribute vec3 pos;

varying vec3 col;

uniform mat4 projectionMatrix, viewMatrix, modelMatrix;

void main() {
  gl_Position = projectionMatrix * viewMatrix * modelMatrix *  vec4(pos, 1.0); 
}
`;

export const Fragment = 

`
precision mediump float;

varying vec3 col;

void main() {
  gl_FragColor = vec4(col, 1.0);
}

`;