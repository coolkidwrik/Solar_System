import * as THREE from 'three';
import { getFresnelMat } from '../getFresnelMat.js';

function saturnBuilder() { // TODO: work in progress

    // Create a saturn Group model and add elements of the saturn to it
    const saturnGroup = new THREE.Group();
    const axial_tilt = 26.73 * Math.PI / 180;
    saturnGroup.rotation.z = axial_tilt;
    const detail = 12; // changes number of edges on the sphere
    const loader = new THREE.TextureLoader();

    // create the saturn geometry
    const geometry = new THREE.IcosahedronGeometry(1, detail);

    // Saturn ring geometry
    const ringGeometry = new THREE.RingGeometry(1.2, 2.2, 64);


    // describe materials to make up the saturn

    // saturn texture
    const material = new THREE.MeshPhongMaterial({
    map: loader.load("../textures/saturnmap.jpg"),
    });

    // Saturn ring texture
    const ringMaterial = new THREE.MeshPhongMaterial({
        map: loader.load("../textures/saturn_ring.png"),
        side: THREE.DoubleSide,
        emissive: new THREE.Color(0x888888), // Set the emissive color to white or any other bright color
        emissiveIntensity: 0.2, // Increase the emissive intensity to make the rings brighter
    });

    // // create atmospheric glow
    const fresnelMat = getFresnelMat(0xf0d795, 0x000000);




    // create meshes for each material
    const saturnMesh = new THREE.Mesh(geometry, material);

    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 2; // Rotate the ring to be parallel to the x-z plane
    
    const glowMesh = new THREE.Mesh(geometry, fresnelMat);
    glowMesh.scale.setScalar(1.01);



    // add elements to earthGroup in order
    saturnGroup.add(saturnMesh);           // earthGroup.children[0] 
    saturnGroup.add(ringMesh);             // earthGroup.children[1]
    saturnGroup.add(glowMesh);             // earthGroup.children[2]


    // scale earth group
    saturnGroup.scale.setScalar(1.1);

    return saturnGroup;
}

export { saturnBuilder };