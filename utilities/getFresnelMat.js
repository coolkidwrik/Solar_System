import * as THREE from "three";

export default function getFresnelMat({rimHex = 0x0088ff, facingHex = 0x000000} = {}) {
  const uniforms = {
    color1: { value: new THREE.Color(rimHex) },
    color2: { value: new THREE.Color(facingHex) },
    fresnelBias: { value: 0.1 },
    fresnelScale: { value: 1.0 },
    fresnelPower: { value: 4.0 },
  };

  const fresnelMat = new THREE.ShaderMaterial({
    uniforms: uniforms,
    // vertexShader: vs,
    // fragmentShader: fs,
    transparent: true,
    blending: THREE.AdditiveBlending,
    // wireframe: true,
  });

  // Load shaders.
const shaderFiles = [
  'glsl_utilities/fresnel.vs.glsl',
  'glsl_utilities/fresnel.fs.glsl',
];

new THREE.SourceLoader().load(shaderFiles, function (shaders) {
  fresnelMat.vertexShader = shaders['glsl_utilities/fresnel.vs.glsl'];
  fresnelMat.fragmentShader = shaders['glsl_utilities/fresnel.fs.glsl'];
})
  return fresnelMat;
}
export { getFresnelMat };