import * as THREE from 'three';
import { setup } from '../utilities/setup.js';
import { earthBuilder } from '../utilities/planet_builder/earthBuilder.js';
import { moonBuilder } from '../utilities/planet_builder/moonBuilder.js';
import { getOrbitalAcceleration } from '../utilities/getOrbitalAcceleration.js';

// Constants
const M = 5.972; // mass of earth (scaled down)
const m = 7.342; // mass of moon (scaled down)
const r = 0.5; // distance between earth and moon (not to scale)

// calculate acceleration and velocity of moon
const { ax, ay, v } = getOrbitalAcceleration(r, M, m);


// Setup and return the scene and related objects.
const {
  renderer,
  scene,
  camera,
  stars
} = setup();

// Create a earth Group model and add elements of the earth to it
let earth = earthBuilder();
scene.add(earth);

// earthGroup.add(earthMesh);            // earthGroup.children[0] 
// earthGroup.add(lightsMesh);           // earthGroup.children[1]
// earthGroup.add(cloudsMesh);           // earthGroup.children[2]
// earthGroup.add(glowMesh);             // earthGroup.children[3]

// ambience 
const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-5, 0.5, 1.5);
scene.add(sunLight);

// const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444);
// scene.add(hemisphereLight);



// add moon
const moon = moonBuilder();
earth.add(moon);              // earthGroup.children[4]

// have moon orbit around the earth
earth.children[4].position.x = 0.5;
scene.add(moon);

function updateMoonPosition() {

}




// Animation loop
function animate() {
    requestAnimationFrame(animate);

    earth.children[0].rotation.y += 0.002;
    earth.children[1].rotation.y += 0.002;
    earth.children[2].rotation.y += 0.0025;
    earth.children[3].rotation.y += 0.002;
    stars.rotation.y -= 0.0002;
    updateMoonPosition();

    // Render the scene
    renderer.render(scene, camera);
}

// Start the animation loop
animate();