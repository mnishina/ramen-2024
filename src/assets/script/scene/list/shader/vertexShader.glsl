uniform float uAlpha;
uniform float uTime;
uniform float uPI;
uniform float uRandom;
uniform sampler2D uNoiseTextureA;
uniform sampler2D uNoiseTextureB;

varying vec2 vUv;
varying float vWave;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float waveFrequency1 = 2.4; // 波の周波数
  float waveFrequency2 = 0.2; // 波の周波数
  float waveAmplitude = 60.0; // 波の振幅
  
  float uRandomHalf = uRandom - 0.5;
  float samplingPosition = 0.5 * uRandomHalf;

  float textureNoiseA = texture(
    uNoiseTextureA,
    vec2(samplingPosition, uv.x * 0.6 + uTime * 0.15)
  ).r;
  
  float textureNoiseB = texture(
    uNoiseTextureB,
    vec2(samplingPosition, uv.x * -0.2 - uTime * 0.04)
  ).r;

  float rawWave = sin(uv.y * waveFrequency1 + uTime * 1.6 + uRandom);
  float smoothWave = smoothstep(-1.0, 1.0, rawWave) * 2.0 - 1.0;
  // 50% raw, 50% smooth
  float wave1 = mix(rawWave, smoothWave, 0.5) * waveAmplitude * (0.5 + textureNoiseA);
  float wave2 = sin(uv.y * waveFrequency2 + uTime * 2.8 + uRandom) * (waveAmplitude * 0.3) * (0.6 + textureNoiseB);
  float wave3 = cos(uv.x * 1.5 + uTime) * (waveAmplitude * 0.15) * textureNoiseA;
  float wave = wave1 + wave2 + wave3;
  wave *= (1.0 - uv.y); // 上部ほど動きを抑制
  
  // 不規則な動きを強調
  float irregularFactor = mix(0.6, 1.5, textureNoiseB);
  
  modelPosition.x += wave * 0.3 * (1.8 + textureNoiseA * 0.2) * irregularFactor;
  // // modelPosition.z += wave * 0.35 * (0.8 + textureNoiseB * 0.3) * irregularFactor + 30.0;
  modelPosition.z += 30.0 + wave * 0.35 * (0.8 + textureNoiseB * 0.3) * irregularFactor;

  // z軸は常に波の絶対値分だけ、カメラから奥側へ動かす（30.0から減算）
  // modelPosition.z += 30.0 - abs(wave) * 0.35 * (0.8 + textureNoiseB * 0.3) * irregularFactor;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  
  gl_Position = projectedPosition;


  // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

  //varying
  vUv = uv;
  // xWave = modelPosition.x;

  // vec4 newPosition = modelViewMatrix * vec4(position, 1.0);
  
  // newPosition.x += sin(newPosition.y / 270.0 * uPI + uPI / 3.0) * -20.0;
  
  // vec4 projectedPosition = projectionMatrix * newPosition;
  
  // gl_Position = projectedPosition;

  // //varying
  // vUv = uv;
  // vWave = newPosition.z;
}
