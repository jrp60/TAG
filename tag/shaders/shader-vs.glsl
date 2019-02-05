
	precision mediump float;

	attribute vec3 aVertexPosition;
	attribute vec3 aVertexNormal;
	attribute vec2 aVertexTextureCoords;

	uniform mat4 uMVMatrix;
	uniform mat4 uPMatrix;
	uniform mat4 uNMatrix;

	uniform vec3 uLightPosition;

	varying vec3 vNormal;
	varying vec3 vLightRay;
	varying  vec3 vEyeVec;

	varying vec2 vTextureCoord;

	void main(void) {

		vTextureCoord = aVertexTextureCoords;

		vec4 vertex = uMVMatrix * vec4(aVertexPosition, 1.0);

		vNormal = vec3(uNMatrix * vec4(aVertexNormal, 1.0));

		vec4 light = vec4(uLightPosition,1.0);

		vLightRay = vertex.xyz - light.xyz;

		vEyeVec = -vec3(vertex.xyz);

		gl_Position = uPMatrix * vertex;

		

	}