import * as THREE from 'three';
import { setup } from '../utilities/setup.js';
import { sunBuilder } from '../utilities/planet_builder/sunBuilder.js';

// Setup and return the scene and related objects.
const {
  renderer,
  scene,
  camera,
  stars
} = setup();

// Create a earth Group model and add elements of the earth to it
let sun = sunBuilder();
scene.add(sun);

// sunGroup.add(sunMesh);         // sunGroup.children[0] 
// sunGroup.add(glowMesh);        // sunGroup.children[1]

// ambience 
const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(0, 0, 0); // Sun is at the center
sunLight.castShadow = true; // Enable shadow casting
sunLight.shadow.mapSize.width = 2048; // Shadow map size
sunLight.shadow.mapSize.height = 2048;
sunLight.shadow.camera.near = 0.5;
sunLight.shadow.camera.far = 500;
scene.add(sunLight);




// Animation loop
function animate() {
    requestAnimationFrame(animate);

    sun.children[0].rotation.y += 0.002;
    // sun.children[1].rotation.y += 0.002;
    stars.rotation.y -= 0.0002;

    // Render the scene
    renderer.render(scene, camera);
}

// Start the animation loop
animate();