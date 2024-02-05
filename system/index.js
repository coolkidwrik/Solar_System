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

// Create a sun
const sunGroup = new THREE.Group();
scene.add(sunGroup);
new OrbitControls(camera, renderer.domElement);
const detail = 12; // changes number of edges on the sphere
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, detail);
const material = new THREE.MeshPhongMaterial({
  map: loader.load("../textures/sunmap.jpg"),
});
const sunMesh = new THREE.Mesh(geometry, material);
sunGroup.add(sunMesh);

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff);
scene.add(hemisphereLight);

const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geometry, fresnelMat);
glowMesh.scale.setScalar(1.01);
sunGroup.add(glowMesh);

const stars = getStarfield({numStars: 2000});
scene.add(stars);

const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);



// Animation loop
function animate() {
    requestAnimationFrame(animate);

    sunMesh.rotation.y += 0.002;
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