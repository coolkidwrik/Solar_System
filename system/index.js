import * as THREE from 'three';
import { setup } from '../utilities/setup.js';
import { getOrbitalPosition } from '../utilities/getOrbitalPosition.js';

// Import planet builders
import { sunBuilder } from '../utilities/planet_builder/sunBuilder.js';
import { earthBuilder } from '../utilities/planet_builder/earthBuilder.js';
import { moonBuilder } from '../utilities/planet_builder/moonBuilder.js';
import { saturnBuilder } from '../utilities/planet_builder/saturnBuilder.js';

// Setup and return the scene and related objects.
const {
  renderer,
  scene,
  camera,
  stars
} = setup();


// // // create solar system
// let system = new THREE.Group();

// create elements of the solar system
let sun = sunBuilder();
let earth = earthBuilder();
let moon = moonBuilder();
let saturn = saturnBuilder();

// add elements to the solar system
sun.add(earth);


// set initial positions of the elements
earth.position.set(-5, 0, 0);

// add elements to the scene
scene.add(sun);
scene.add(earth);






// sunGroup.add(sunMesh);         // sunGroup.children[0] 
// sunGroup.add(glowMesh);        // sunGroup.children[1]

// ambience 
addSunLight();




// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update planet positions
    updatePlanetPositions();
    stars.rotation.y -= 0.0002;

    // Render the scene
    renderer.render(scene, camera);
}

// Start the animation loop
animate();






// helpers

function addSunLight() {
  const sunWorldRadius = sun.scale.x;
  const sunLight1 = new THREE.PointLight(0xaaaaaa, 0.5, 0, 5);
  const sunLight2 = new THREE.PointLight(0xaaaaaa, 0.5, 0, 5);
  const sunLight3 = new THREE.PointLight(0xaaaaaa, 0.5, 0, 5);
  const sunLight4 = new THREE.PointLight(0xaaaaaa, 0.5, 0, 5);
  const sunLight5 = new THREE.PointLight(0xaaaaaa, 0.5, 0, 5);
  const sunLight6 = new THREE.PointLight(0xaaaaaa, 0.5, 0, 5);
  sunLight1.position.set(-sunWorldRadius, 0, 0);
  sunLight2.position.set(sunWorldRadius, 0, 0);
  sunLight3.position.set(0, 0, sunWorldRadius);
  sunLight4.position.set(0, 0, -sunWorldRadius);
  sunLight5.position.set(0, -sunWorldRadius, 0);
  sunLight6.position.set(0, sunWorldRadius, 0);
  enableShadows(sunLight1);
  enableShadows(sunLight2);
  enableShadows(sunLight3);
  enableShadows(sunLight4);
  enableShadows(sunLight5);
  enableShadows(sunLight6);
}

function enableShadows(sunLight) {
  sunLight.castShadow = true; // Enable shadow casting
  sunLight.shadow.mapSize.width = 2048; // Shadow map size
  sunLight.shadow.mapSize.height = 2048;
  sunLight.shadow.camera.near = 0.5;
  sunLight.shadow.camera.far = 500;
  scene.add(sunLight);
}


// update planet positions
function updatePlanetPositions() {
  updateSunPosition();
  // updateEarthAndMoonPosition();
  updateEarthPosition();
}

// Update sun positions
function updateSunPosition() {
  sun.children[0].rotation.y += 0.002;
  sun.children[1].rotation.y += 0.002;
}


// // Update earth and moon position
// function updateEarthAndMoonPosition() {
//   // Update earth and moon rotations
//   earth.children[0].rotation.y += 0.002; // 1/500 (1 day = 500 seconds in the model)
//   earth.children[1].rotation.y += 0.002;
//   earth.children[2].rotation.y += 0.0026;
//   earth.children[3].rotation.y += 0.002;
//   moon.children[0].rotation.y += 0.002; // moon rotates at same speed as earth

//   // Constants
//   const sunMass = 1.989 * Math.pow(10, 30); // kg
//   const earthMass = 5.972 * Math.pow(10, 24); // kg
//   const moonMass = 7.342 * Math.pow(10, 22); // kg
//   const moonOrbitRadius = 384400 * 1000; // meters
//   const earthOrbitRadius = 149.6 * Math.pow(10, 6) * 1000; // meters

//   // Update earth position
//   const { newEarthX, newEarthZ } = getOrbitalPosition(earthOrbitRadius, sunMass, earthMass, earth, sun);
//   earth.position.set(newEarthX, 0, newEarthZ);

//   // Update moon position
//   const { newMoonX, newMoonZ } = getOrbitalPosition(moonOrbitRadius, earthMass, moonMass, moon, earth);
//   moon.position.set(newMoonX, 0, newMoonZ);
// }

// // Update earth position
function updateEarthPosition() { 
  const earthOrbitRadius = 149.6 * Math.pow(10, 6) * 1000; // meters
  const sunMass = 1.989 * Math.pow(10, 30); // kg
  const earthMass = 5.972 * Math.pow(10, 24); // kg
  const { newEarthX, newEarthZ } = getOrbitalPosition(earthOrbitRadius, sunMass, earthMass, earth, sun);
  earth.position.set(newEarthX, 0, newEarthZ);
}