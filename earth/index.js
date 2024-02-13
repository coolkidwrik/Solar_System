import * as THREE from 'three';
import { setup } from '../utilities/setup.js';
import { earthBuilder } from '../utilities/planet_builder/earthBuilder.js';
import { moonBuilder } from '../utilities/planet_builder/moonBuilder.js';
import { getOrbitalPosition } from '../utilities/getOrbitalPosition.js';


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



// add moon
const moon = moonBuilder();
earth.add(moon);              // earthGroup.children[4]

// have moon orbit around the earth
earth.children[4].position.x = 0.5;
scene.add(moon);

function updateMoonPosition() {
  // Constants
  const earthMass = 5.972 * Math.pow(10, 24); // kg
  const moonMass = 7.342 * Math.pow(10, 22); // kg
  const moonOrbitRadius = 384400 * 1000; // meters
  const { newX, newZ } = getOrbitalPosition(moonOrbitRadius, earthMass, moonMass, moon, earth);
  moon.position.set(newX, 0, newZ);
}




// ambience 
const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-5, 0.5, 1.5);
sunLight.castShadow = true; // Enable shadow casting
sunLight.shadow.mapSize.width = 2048; // Shadow map size
sunLight.shadow.mapSize.height = 2048;
sunLight.shadow.camera.near = 0.5;
sunLight.shadow.camera.far = 500;
scene.add(sunLight);

// Enable shadows on both earth and moon
earth.children[0].castShadow = true; // Assuming earth's mesh is the first child
earth.children[0].receiveShadow = true; // Enable receiving shadows on earth
// Enable shadow casting for moon
moon.children[0].castShadow = true; // Assuming moon's mesh is the first child
moon.children[0].receiveShadow = true; // Enable receiving shadows on moon



// Animation loop
function animate() {
    requestAnimationFrame(animate);

    earth.children[0].rotation.y += 0.002; // 1/500 (1 day = 500 seconds in the model)
    earth.children[1].rotation.y += 0.002;
    earth.children[2].rotation.y += 0.0026;
    earth.children[3].rotation.y += 0.002;
    moon.children[0].rotation.y += 0.002; // moon rotates at same speed as earth
    stars.rotation.y -= 0.0002;
    updateMoonPosition();

    // Render the scene
    renderer.render(scene, camera);
}

// Start the animation loop
animate();