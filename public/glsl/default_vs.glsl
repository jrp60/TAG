#version 300 es
precision highp float;
in vec4 a_position;
in vec2 a_texcoord;
in vec3 a_normal;

uniform vec3 lightposition;
uniform mat4 modelmatrix;
uniform mat4 mvp;
uniform mat4 normalmatrix;

// Pass to fragment shader
out vec2 v_texcoord;
out vec3 Normal;
out vec3 surfaceToLight;

void main(void) {
v_texcoord = a_texcoord;
vec3 surfaceWorldPosition = (modelmatrix * a_position).xyz; 

// Pass the normal to the fragment shader
Normal = mat3(normalmatrix) * a_normal;

surfaceToLight = vec3(lightposition) - surfaceWorldPosition;
gl_Position = mvp * a_position;
}