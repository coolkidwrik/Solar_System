import * as THREE from 'three';
import { setup } from '../utilities/setup.js';
import { getOrbitalPosition } from '../utilities/getOrbitalPosition.js';

// Import planet builders
// can use each import to test creation of each planet
import { sunBuilder } from '../utilities/planet_builder/sunBuilder.js';
import { mercuryBuilder } from '../utilities/planet_builder/mercuryBuilder.js';
import { venusBuilder } from '../utilities/planet_builder/venusBuilder.js';
import { earthBuilder } from '../utilities/planet_builder/earthBuilder.js';
import { marsBuilder } from '../utilities/planet_builder/marsBuilder.js';
import { jupiterBuilder } from '../utilities/planet_builder/jupiterBuilder.js';
import { moonBuilder } from '../utilities/planet_builder/moonBuilder.js';
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

// create test planet demonstration
let test = uranusBuilder();

// add elements to the scene
scene.add(test);

// ambience 
const sunLight = new THREE.DirectionalLight(0xffffff, 0.8);
enableShadows(sunLight);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update planet positions
    updatePlanetPositions();
    stars.rotation.y -= 0.0002;
    test.children[0].rotation.y += 0.002;
    test.children[1].rotation.z += 0.004;

    // Render the scene
    renderer.render(scene, camera);
}

// Start the animation loop
animate();






// helpers

function enableShadows(sunLight) {
    sunLight.position.set(-5, 0.5, 1.5);
    sunLight.castShadow = true; // Enable shadow casting
    sunLight.shadow.mapSize.width = 2048; // Shadow map size
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 500;
    scene.add(sunLight);
}


// update planet positions
function updatePlanetPositions() {
  // TODO: Update planet positions
}