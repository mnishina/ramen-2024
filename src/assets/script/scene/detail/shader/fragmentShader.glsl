uniform float uTime;
uniform sampler2D uTexture;
uniform float uPI;
uniform float uAlpha;
uniform float uProgress;

varying vec2 vUv;
varying float vWave;

void main() {
  vec2 uv = vec2(vUv.x, 1.0 - vUv.y);

  vec2 newUV = uv;
  float xWave = vWave * 0.; // ぐちゃぐちゃになるので数値をかけてる
  float yWave = vWave * 0.; // ぐちゃぐちゃになるので数値をかけてる
  newUV.x += xWave;
  newUV.y -= yWave;

  vec3 tex = texture(uTexture, newUV).rgb;
  gl_FragColor = vec4(tex.rgb, uAlpha);

  // float curveStrength = 3.0;
  // float waveStrength = 1.0;
  // float uProgress175 = uProgress * 1.75;
  // float xWave =  vWaveX * 0.00001;
  // float zWave =  vWaveZ * 0.00001;
  
  // float texOffset = 0.3 * (1.0 - uProgress); 
  // vec2 texUV = vec2(newUV.x, newUV.y + texOffset);

  // float bottom = 1.0 - uProgress;
  // float wave = sin(newUV.x * uPI * waveStrength) * uProgress - uProgress175;
  // float curve = uProgress + wave * bottom * curveStrength;
  
  // vec4 tex = texture2D(uTextureA, texUV + xWave + zWave);
  // vec4 final = mix(tex, vec4(0.0), step(curve, newUV.y));
  
  // gl_FragColor = final;
  

  #include <tonemapping_fragment>
  // #include <colorspace_fragment>
}
