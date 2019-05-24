#version 300 es
precision mediump float;

// Passed in from vertex shader.
in vec2 v_texcoord;
in vec3 Normal;
in vec3 surfaceToLight;

uniform vec4 u_color;

out vec4 outColor;
void main(void) {
    vec3 normal2 = normalize(Normal);
    vec3 surfaceToLightDirection = normalize(surfaceToLight);

    float light = dot(normal2, surfaceToLightDirection);

    outColor = u_color;

    // Asi tenemos colores aleatorios en cada cara.
    outColor = vec4(v_texcoord, 1.0, 1.0);

    outColor.rgb *= light;
}
