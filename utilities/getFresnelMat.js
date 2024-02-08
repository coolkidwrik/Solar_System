import * as THREE from 'three';


async function getShaderSource(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch shader source: ${path}`);
  }
  return await response.text();
}

async function getFresnelMat({rimHex = 0x0088ff, facingHex = 0x000000} = {}) {
  const uniforms = {
    color1: { value: new THREE.Color(rimHex) },
    color2: { value: new THREE.Color(facingHex) },
    fresnelBias: { value: 0.1 },
    fresnelScale: { value: 1.0 },
    fresnelPower: { value: 4.0 },
  };

  // Load shader files
  const vertexShaderPath = './glsl_utilities/fresnel.vs.glsl';
  const fragmentShaderPath = './glsl_utilities/fresnel.fs.glsl';

  const [vs, fs] = await Promise.all([
    getShaderSource(vertexShaderPath),
    getShaderSource(fragmentShaderPath),
  ]);

  const fresnelMat = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vs,
    fragmentShader: fs,
    transparent: true,
    blending: THREE.AdditiveBlending,
    // wireframe: true,
  });

  // retrieve glsl files
// // Load shaders.
// const shaderFiles = [
//   'glsl_utilities/fresnel.vs.glsl',
//   'glsl_utilities/fresnel.fs.glsl',
// ];

// new SourceLoader().load(shaderFiles, function (shaders) {
//   fresnelMat.vertexShader = shaders['glsl/sphere.vs.glsl'];
//   fresnelMat.fragmentShader = shaders['glsl/sphere.fs.glsl'];
// });

  return fresnelMat;
}
export { getFresnelMat };