import * as THREE from "three";

// get glsl code for fresnel shader
var vs = await fetch('../utilities/glsl/fresnel.vs.glsl').then((response) => response.text());
var fs = await fetch('../utilities/glsl/fresnel.fs.glsl').then((response) => response.text());

function getFresnelMat({rimHex = 0x20c7fa, facingHex = 0x000000} = {}) {
  const uniforms = {
    color1: { value: new THREE.Color(rimHex) },
    color2: { value: new THREE.Color(facingHex) },
    fresnelBias: { value: 0.1 },
    fresnelScale: { value: 1.0 },
    fresnelPower: { value: 4.0 },
  };

  const fresnelMat = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vs,
    fragmentShader: fs,
    transparent: true,
    blending: THREE.AdditiveBlending,
    // wireframe: true,
  });
  return fresnelMat;
}
export { getFresnelMat };