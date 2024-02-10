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

// saturnGroup.add(saturnMesh);            // earthGroup.children[0] 
// saturnGroup.add(ringsMesh);           // earthGroup.children[1]
// saturnGroup.add(glowMesh);           // earthGroup.children[2]

// ambience 
const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-5, 0.5, 1.5);
scene.add(sunLight);

// const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444);
// scene.add(hemisphereLight);



// Animation loop
function animate() {
    requestAnimationFrame(animate);

    saturn.children[0].rotation.y += 0.002;
    // saturn.children[1].rotation.y += 0.0025;
    saturn.children[2].rotation.y += 0.002;
    stars.rotation.y -= 0.0002;

    // Render the scene
    renderer.render(scene, camera);
}

// Start the animation loop
animate();