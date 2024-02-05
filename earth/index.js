import * as THREE from 'three';
import { setup } from '../utilities/setup.js';
import { getFresnelMat } from "../utilities/getFresnelMat.js";

// Setup and return the scene and related objects.
const {
  renderer,
  scene,
  camera,
  stars
} = setup();

// Create a earth
const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);
const detail = 12; // changes number of edges on the sphere
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, detail);
const material = new THREE.MeshPhongMaterial({
  map: loader.load("../textures/earthmap1k.jpg"),
});
const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

// const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444);
// scene.add(hemisphereLight);

// merge with map of earth to create lights in the night
const lightsMat = new THREE.MeshBasicMaterial({
  map: loader.load("../textures/earthlights1k.jpg"),
  blending: THREE.AdditiveBlending,
});
const lightsMesh = new THREE.Mesh(geometry, lightsMat);
earthGroup.add(lightsMesh);

// create clouds
const cloudsMat = new THREE.MeshStandardMaterial({
  map: loader.load("../textures/earthcloudmap.jpg"),
  transparent: true,
  opacity: 0.7,
  blending: THREE.AdditiveBlending
});

const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
cloudsMesh.scale.setScalar(1.004);
earthGroup.add(cloudsMesh);


// // create atmospheric glow
// const fresnelMat = getFresnelMat();
// const glowMesh = new THREE.Mesh(geometry, fresnelMat);
// glowMesh.scale.setScalar(1.01);
// earthGroup.add(glowMesh);

const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-5, 0.5, 1.5);
scene.add(sunLight);



// Animation loop
function animate() {
    requestAnimationFrame(animate);

    earthMesh.rotation.y += 0.002;
    lightsMesh.rotation.y += 0.002;
    cloudsMesh.rotation.y += 0.0023;
    // glowMesh.rotation.y += 0.002;
    stars.rotation.y -= 0.0002;

    // Render the scene
    renderer.render(scene, camera);
}

// Start the animation loop
animate();