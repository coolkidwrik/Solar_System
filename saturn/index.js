import * as THREE from 'three';
import { setup } from '../utilities/setup.js';
import { saturnBuilder } from '../utilities/planet_builder/saturnBuilder.js';

// Setup and return the scene and related objects.
const {
  renderer,
  scene,
  camera,
  stars
} = setup();

// Create a earth Group model and add elements of the earth to it
let saturn = saturnBuilder();
scene.add(saturn);

// saturnGroup.add(saturnMesh);         // saturnGroup.children[0] 
// saturnGroup.add(ringsMesh);          // saturnGroup.children[1]
// saturnGroup.add(glowMesh);           // saturnGroup.children[2]

// ambience 
const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-5, 0.5, 1.5);
sunLight.castShadow = true; // Enable shadow casting
sunLight.shadow.mapSize.width = 2048; // Shadow map size
sunLight.shadow.mapSize.height = 2048;
sunLight.shadow.camera.near = 0.5;
sunLight.shadow.camera.far = 500;
scene.add(sunLight);


// Enable shadows on both saturn and rings
saturn.children[0].castShadow = true; 
saturn.children[0].receiveShadow = true; 
// Enable shadow casting for rings
saturn.children[1].castShadow = true; 
saturn.children[1].receiveShadow = true; 




// Animation loop
function animate() {
    requestAnimationFrame(animate);

    saturn.children[0].rotation.y += 0.002;
    saturn.children[1].rotation.z -= 0.0003;
    saturn.children[2].rotation.y += 0.002;
    stars.rotation.y -= 0.0002;

    // Render the scene
    renderer.render(scene, camera);
}

// Start the animation loop
animate();