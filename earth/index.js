import * as THREE from 'three';
import { setup } from '../utilities/setup.js';
import { earthBuilder } from '../utilities/planet_builder/earthBuilder.js';
import { moonBuilder } from '../utilities/planet_builder/moonBuilder.js';
// import { getOrbitalAcceleration } from '../utilities/getOrbitalAcceleration.js';

// Constants
const G = 6.67430 * Math.pow(10, -11); // gravitational constant
const AU = 149.6 * Math.pow(10, 6); // astronomical unit
const SCALE = 1/AU; // scale of the model
const TIMESTEP = 1/(60*60*24*125); // time step (1 earthday = 125 second in the model)
// const M = mass1; // mass of earth (scaled down)
// const m = mass2; // mass of moon (scaled down)
// const r = orbitalRadius; // distance between earth and moon (not to scale)



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
  const moonOrbitRadius = 384400 * 1000*(0.125*SCALE); // meters

  // Calculate gravitational force between earth and moon
  // is given by the formula Fg = (G * M * m) / (r * r)
  const distance = moon.position.distanceTo(earth.position); // Distance in meters, scaled
  const force = SCALE*(G * earthMass * moonMass) / Math.pow(distance, 2);

  // Calculate acceleration of the moon
  // to get the acceleration of the moon, we divide Fg by the mass of the moon
  const acceleration = force / moonMass;

  // calculate tangential velocity of moon
  // the centripetal force acting on the moon is given by the 
  // formula Fc = (m * v * v) / r
  // this also equals the force of gravity acting on the moon
  // if we solve for v, we get v = sqrt((G * M) / r)
  const velocity = -1*Math.sqrt(2 * acceleration * moonOrbitRadius);

  // Calculate angle increment for orbit
  const angleIncrement = (velocity * TIMESTEP) / moonOrbitRadius;

  // Update moon's position
  // the angle between the current position vector and the x-axis
  const angle = Math.atan2(moon.position.z, moon.position.x);
  const newX = Math.cos(angle + angleIncrement) * moonOrbitRadius;
  const newZ = Math.sin(angle + angleIncrement) * moonOrbitRadius;
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
// TODO: work in progress
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
    earth.children[2].rotation.y += 0.0025;
    earth.children[3].rotation.y += 0.002;
    moon.children[0].rotation.y += 0.002; // moon rotates at same speed as earth
    stars.rotation.y -= 0.0002;
    updateMoonPosition();

    // Render the scene
    renderer.render(scene, camera);
}

// Start the animation loop
animate();