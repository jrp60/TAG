
	precision mediump float;

	uniform float uShininess;       //
	uniform vec3 uLightAmbient;     //ambient color
	uniform vec3 uMaterialDiffuse;      //diffuse color
	uniform vec3 uMaterialSpecular;       //specular color
	uniform sampler2D uSampler;

	varying vec3 vNormal;
	varying vec3 vLightRay;
	varying vec3 vEyeVec;

	varying vec2 vTextureCoord;
	
	void main(void)
	{

		vec4 texel = texture2D(uSampler, vTextureCoord);

		vec3 L = normalize(vLightRay);
		vec3 N = normalize(vNormal);


		float lambertTerm = dot(N,-L);

		vec3 finalColor = uLightAmbient;

		if(lambertTerm > 0.0)
		{
			finalColor += uMaterialDiffuse * lambertTerm;

			vec3 E = normalize(vEyeVec);
			vec3 R = reflect(L, N);
			float specular = pow( max(dot(R, E), 0.0), uShininess);
			finalColor += uMaterialSpecular * specular;
		}	
			
			//gl_FragColor =  finalColor * texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
			//gl_FragColor = texture2D(uSampler, vTextureCoord);
			gl_FragColor = vec4(texel.rgb * finalColor, texel.a);
		

	}