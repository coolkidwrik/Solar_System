import * as THREE from 'three';
import { getFresnelMat } from '../getFresnelMat.js';

function marsBuilder() {
    // Create a mars Group model and add elements of the mars to it
    const marsGroup = new THREE.Group();
    const axial_tilt = -25 * Math.PI / 180;
    marsGroup.rotation.z = axial_tilt;
    const detail = 12; // changes number of edges on the sphere
    const loader = new THREE.TextureLoader();

    // create the venus geometry
    const geometry = new THREE.IcosahedronGeometry(1, detail);


    // describe materials to make up the venus

    // mars texture
    const material = new THREE.MeshPhongMaterial({
    map: loader.load("../textures/mars_1k_color.jpg"),
    });

    // create atmospheric glow
    const fresnelMat = getFresnelMat(0x6e2618, 0x000000);

    // create meshes for each material
    const marsMesh = new THREE.Mesh(geometry, material);
    const glowMesh = new THREE.Mesh(geometry, fresnelMat);
    glowMesh.scale.setScalar(1.01);

    // add shadows to marsMesh
    marsMesh.castShadow = true;
    marsMesh.receiveShadow = true;

    // add elements to marsGroup in order
    marsGroup.add(marsMesh);          // marsGroup.children[0] 
    marsGroup.add(glowMesh);           // marsGroup.children[1]


    // scale mars group
    marsGroup.scale.setScalar(0.27);

    return marsGroup;
}

export { marsBuilder };