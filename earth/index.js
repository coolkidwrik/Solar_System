import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

import getStarfield from "../utilities/getStars.js";
import { getFresnelMat } from "../utilities/getFresnelMat.js";

// Create a scene
const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

// // Create a geometry
// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);


// Create a earth
const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);
new OrbitControls(camera, renderer.domElement);
const detail = 12; // changes number of edges on the sphere
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, detail);
const material = new THREE.MeshPhongMaterial({
  map: loader.load("../textures/earthlights1k.jpg"),
//   specularMap: loader.load("./textures/02_earthspec1k.jpg"),
//   bumpMap: loader.load("./textures/01_earthbump1k.jpg"),
//   bumpScale: 0.04,
});
const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(hemisphereLight);

// const lightsMat = new THREE.MeshBasicMaterial({
//   map: loader.load("../textures/earthlights1k.jpg"),
//   blending: THREE.AdditiveBlending,
// });
// const lightsMesh = new THREE.Mesh(geometry, lightsMat);
// earthGroup.add(lightsMesh);

// const cloudsMat = new THREE.MeshStandardMaterial({
//   map: loader.load("../textures/earthcloudmap.jpg"),
//   transparent: true,
//   opacity: 0.8,
//   blending: THREE.AdditiveBlending,
// //   alphaMap: loader.load('./textures/05_earthcloudmaptrans.jpg'),
//   // alphaTest: 0.3,
// });

// const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
// cloudsMesh.scale.setScalar(1.004);
// earthGroup.add(cloudsMesh);

// const fresnelMat = getFresnelMat();
// const glowMesh = new THREE.Mesh(geometry, fresnelMat);
// glowMesh.scale.setScalar(1.01);
// earthGroup.add(glowMesh);

const stars = getStarfield({numStars: 2000});
scene.add(stars);

// const sunLight = new THREE.DirectionalLight(0xffffff);
// sunLight.position.set(-2, 0.5, 1.5);
// scene.add(sunLight);



// Animation loop
function animate() {
    requestAnimationFrame(animate);

    earthMesh.rotation.y += 0.002;
    // lightsMesh.rotation.y += 0.002;
    // cloudsMesh.rotation.y += 0.0023;
    // glowMesh.rotation.y += 0.002;
    stars.rotation.y -= 0.0002;

    // Render the scene
    renderer.render(scene, camera);
}

// Start the animation loop
animate();


// handle window resize
function handleWindowResize () {
    let w = window.innerWidth;
    let h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', handleWindowResize, false);