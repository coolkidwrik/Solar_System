import * as THREE from 'three';
import { setup } from '../utilities/setup.js';
import { getOrbitalPosition } from '../utilities/getOrbitalPosition.js';

// Import planet builders
import { sunBuilder } from '../utilities/planet_builder/sunBuilder.js';
import { mercuryBuilder } from '../utilities/planet_builder/mercuryBuilder.js';
import { venusBuilder } from '../utilities/planet_builder/venusBuilder.js';
import { earthBuilder } from '../utilities/planet_builder/earthBuilder.js';
import { moonBuilder } from '../utilities/planet_builder/moonBuilder.js';
import { marsBuilder } from '../utilities/planet_builder/marsBuilder.js';
import { jupiterBuilder } from '../utilities/planet_builder/jupiterBuilder.js';
import { saturnBuilder } from '../utilities/planet_builder/saturnBuilder.js';
import { uranusBuilder } from '../utilities/planet_builder/uranusBuilder.js';
import { neptuneBuilder } from '../utilities/planet_builder/neptuneBuilder.js';
import { plutoBuilder } from '../utilities/planet_builder/plutoBuilder.js';

// Setup and return the scene and related objects.
const {
  renderer,
  scene,
  camera,
  stars
} = setup();

// // create background
// const spaceTexture = new THREE.TextureLoader().load('../textures/Milky_way.jpg');
// scene.background = spaceTexture;


// // // create solar system
// let system = new THREE.Group();

// create elements of the solar system
const sun = sunBuilder();
const mercury = mercuryBuilder();
const venus = venusBuilder();
const earth = earthBuilder();
const moon = moonBuilder();
const mars = marsBuilder();
const jupiter = jupiterBuilder();
const saturn = saturnBuilder();
const uranus = uranusBuilder();
const neptune = neptuneBuilder();
const pluto = plutoBuilder();

// add elements to the solar system
// sun.add(earth);


// set initial positions of the elements
sun.position.set(0, 0, 0);
mercury.position.set(2.2, 0, 0);
venus.position.set(3, 0, 0);
earth.position.set(4, 0, 0);
mars.position.set(5, 0, 0);
jupiter.position.set(10, 0, 0);
saturn.position.set(18, 0, 0);
uranus.position.set(23, 0, 0);
neptune.position.set(28, 0, 0);
pluto.position.set(30, 0, 0);

// add elements to the scene
scene.add(sun);
scene.add(mercury);
scene.add(venus);
scene.add(earth);
scene.add(mars);
scene.add(jupiter);
scene.add(saturn);
scene.add(uranus);
scene.add(neptune);
scene.add(pluto);



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
  updateMercuryPosition();
  updateVenusPosition();
  // updateEarthAndMoonPosition();
  updateEarthPosition();
  updateMarsPosition();
  updateJupiterPosition();
  updateSaturnPosition();
  updateUranusPosition();
  updateNeptunePosition();
  updatePlutoPosition();
}

// Update sun position
function updateSunPosition() {
  sun.children[0].rotation.y += 0.002;
  sun.children[1].rotation.y += 0.002;
}

// Update mercury position
function updateMercuryPosition() {
  // rotation info
  mercury.children[0].rotation.y += 0.0007;
  // revolution info
  // TODO
  updateOrbit(-0.0001, mercury, 2.2);
}

// Update venus position
function updateVenusPosition() {
  // rotation info
  venus.children[0].rotation.y += 0.0009;
  venus.children[1].rotation.y += 0.0001;
  // revolution info
  // TODO
  updateOrbit(0.00009, venus, 3);
}

// Update earth position
function updateEarthPosition() {
  // rotation info
  earth.children[0].rotation.y += 0.002;
  earth.children[1].rotation.y += 0.002;
  earth.children[2].rotation.y += 0.0026;
  earth.children[3].rotation.y += 0.002;
  // revolution info
  // TODO
  updateOrbit(-0.0004, earth, 4);}

// Update mars position
function updateMarsPosition() {
  // rotation info
  mars.children[0].rotation.y += 0.002;
  mars.children[1].rotation.y += 0.002;
  // revolution info
  // TODO
  updateOrbit(-0.0003, mars, 5);
}

// Update jupiter position
function updateJupiterPosition() {
  // rotation info
  jupiter.children[0].rotation.y += 0.004;
  jupiter.children[1].rotation.y += 0.004;
  // revolution info
  // TODO
  updateOrbit(-0.0005, jupiter, 10);
}

// Update saturn position
function updateSaturnPosition() {
  // rotation info
  saturn.children[0].rotation.y += 0.004;
  saturn.children[1].rotation.z += 0.0043;
  saturn.children[2].rotation.y += 0.004;
  // revolution info
  // TODO
  updateOrbit(-0.0004, saturn, 18);
}

// Update uranus position
function updateUranusPosition() {
  // rotation info
  uranus.children[0].rotation.y += 0.003;
  uranus.children[1].rotation.z += 0.0038;
  uranus.children[2].rotation.y += 0.003;
  // revolution info
  // TODO
  updateOrbit(-0.0003, uranus, 23);
}

// Update neptune position
function updateNeptunePosition() {
  // rotation info
  neptune.children[0].rotation.y += 0.003;
  neptune.children[1].rotation.y += 0.003;
  // revolution info
  // TODO
  updateOrbit(-0.00025, neptune, 28);
}

// Update pluto position 
function updatePlutoPosition() {
  // rotation info
  pluto.children[0].rotation.y += 0.001;
  pluto.children[1].rotation.y += 0.001;
  // revolution info
  // TODO
  updateOrbit(-0.0001, pluto, 30);
}


function updateOrbit(speed, planet, orbitRadius) {
  const angleIncrement = speed;
  const angle = Math.atan2(planet.position.z, planet.position.x);
  const newX = Math.cos(angle + angleIncrement)* orbitRadius;
  const newZ = Math.sin(angle + angleIncrement)* orbitRadius;
  planet.position.set(newX, 0, newZ);
}