import * as THREE from 'three';
import { getFresnelMat } from '../getFresnelMat.js';

function jupiterBuilder() {
    // Create a jupiter Group model and add elements of the jupiter to it
    const jupiterGroup = new THREE.Group();
    const axial_tilt = -3 * Math.PI / 180;
    jupiterGroup.rotation.z = axial_tilt;
    const detail = 12; // changes number of edges on the sphere
    const loader = new THREE.TextureLoader();

    // create the venus geometry
    const geometry = new THREE.IcosahedronGeometry(1, detail);


    // describe materials to make up the venus

    // jupiter texture
    const material = new THREE.MeshPhongMaterial({
    map: loader.load("../textures/jupitermap.jpg"),
    });

    // create atmospheric glow
    const fresnelMat = getFresnelMat(0x634200, 0x000000);

    // create meshes for each material
    const jupiterMesh = new THREE.Mesh(geometry, material);
    const glowMesh = new THREE.Mesh(geometry, fresnelMat);
    glowMesh.scale.setScalar(1.01);


    // add elements to jupiterGroup in order
    jupiterGroup.add(jupiterMesh);          // jupiterGroup.children[0] 
    jupiterGroup.add(glowMesh);          // jupiterGroup.children[1]


    // scale jupiter group
    jupiterGroup.scale.setScalar(1.02);

    return jupiterGroup;
}

export { jupiterBuilder };