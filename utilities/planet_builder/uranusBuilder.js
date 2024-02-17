import * as THREE from 'three';
import { getFresnelMat } from '../getFresnelMat.js';

function uranusBuilder() {

    // Create a uranus Group model and add elements of the uranus to it
    const uranusGroup = new THREE.Group();
    const axial_tilt = -98 * Math.PI / 180;
    uranusGroup.rotation.z = axial_tilt;
    const detail = 12; // changes number of edges on the sphere
    const loader = new THREE.TextureLoader();

    // create the uranus geometry
    const geometry = new THREE.IcosahedronGeometry(1, detail);

    // uranus ring geometry
    const ringGeometry = new THREE.RingGeometry(1.6, 2, 64);


    // describe materials to make up the uranus

    // uranus texture
    const material = new THREE.MeshPhongMaterial({
    map: loader.load("../textures/uranusmap.jpg"),
    });

    // uranus ring texture
    const ringMaterial = new THREE.MeshBasicMaterial({
        map: loader.load("../textures/uranus_ring.png"),
        side: THREE.DoubleSide,
        transparent: true,
    });

    // // create atmospheric glow
    const fresnelMat = getFresnelMat(0x324c5c, 0x000000);


    // create meshes for each material
    const uranusMesh = new THREE.Mesh(geometry, material);

    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 2; // Rotate the ring to be parallel to the x-z plane of the model
    
    const glowMesh = new THREE.Mesh(geometry, fresnelMat);
    glowMesh.scale.setScalar(1.01);



    // add elements to earthGroup in order
    uranusGroup.add(uranusMesh);           // uranusGroup.children[0] 
    uranusGroup.add(ringMesh);             // uranusGroup.children[1]
    uranusGroup.add(glowMesh);             // uranusGroup.children[2]


    // scale earth group
    uranusGroup.scale.setScalar(0.67);

    return uranusGroup;
}

export { uranusBuilder };